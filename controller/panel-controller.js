var request;
var getResult = 0;
var helloWorld = document.createElement("div");
helloWorld.innerText = "Welcome";
helloWorld.id = "hi";
document.body.appendChild(helloWorld);

function getAllProducts() {
    request = new XMLHttpRequest();
    request.open("GET", "/levantsou-matvej/API/V1/Product");
    request.onreadystatechange = requestAnswer; 
    request.send();
}

function getAllCategories() {
    request = new XMLHttpRequest();
    request.open("GET", "/levantsou-matvej/API/V1/Category");
    request.onreadystatechange = requestAnswer; 
    request.send();
}

function requestAnswer(event) { 
    if (request.readyState < 4) {
        return;
    } 
    if (JSON.parse(request.responseText).message == "Unauthorised") {
        alert(JSON.parse(request.responseText).message);
    } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Category")) {
        getResult = JSON.parse(request.responseText).message;
        createList();
    } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Product")) {
        getResult = JSON.parse(request.responseText).message;
        createList(1);
    }
}

function authentication(event, name, password) {
    var data = [
        {
            username: name.value
        },
        {
            password: password.value
        }
    ];
    request = new XMLHttpRequest();
    request.open("POST", "https://campus.csbe.ch/levantsou-matvej/API/V1/Authentication");
    request.onreadystatechange = requestAuthentication; 
    request.send(JSON.stringify(data));
}
function requestAuthentication() { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText).message.split(";");
    if (answer[0] == "Token created") {
        document.cookie = "token=" + answer[1] +  "; max-age=60; path=/;";
    }
    alert(answer[0]);  
}

function createList(tableType = 0) {
    var mainWindow = document.createElement("div");
    var namePanel = document.createElement("div");
    var tableName = document.createElement("div");
    var createButton = document.createElement("button");

    mainWindow.className = "table-window";
    namePanel.id = "name-panel";
    tableName.className = "window-name";
    if (tableType == 0) {
        tableName.id = "category-name";
    } else {
        tableName.id = "product-name";
    }    
    createButton.className = "create-element";
    createButton.id = "pre-create-element";

    createButton.innerText = "Create";
    if (tableType == 0) {
        tableName.innerText = "Categories list";
    } else {
        tableName.innerText = "Products list";
    }

    namePanel.appendChild(tableName);
    namePanel.appendChild(createButton);
    mainWindow.appendChild(namePanel);

    var table = document.createElement("table");
    var tableLine = document.createElement("tr");

    table.id = "main-table";

    if (tableType == 1) {
        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = "SKU";
        tableLine.appendChild(tableCell); 
    }

    var tableCell = document.createElement("td");
    tableCell.id = "toc";
    tableCell.innerText = "Active";
    tableLine.appendChild(tableCell);

    var tableCell = document.createElement("td");
    tableCell.id = "toc";
    tableCell.innerText = "Name";
    tableLine.appendChild(tableCell);

    if (tableType == 1) {
        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = "Image";
        tableLine.appendChild(tableCell); 

        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = "Description";
        tableLine.appendChild(tableCell); 

        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = "Price";
        tableLine.appendChild(tableCell); 

        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = "Stock";
        tableLine.appendChild(tableCell); 
    }

    var tableCell = document.createElement("td");
    tableCell.id = "toc";
    tableLine.appendChild(tableCell);
    table.appendChild(tableLine);

    for (var i = 0; i < getResult.length; i++) {
        var tableObject = getResult[i];
    
        var tableLine = document.createElement("tr");

        if (tableType == 1) {
        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = tableObject.sku;
        tableLine.appendChild(tableCell);
        }

        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = tableObject.active;
        tableLine.appendChild(tableCell);

        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = tableObject.name;
        tableLine.appendChild(tableCell);

        if (tableType == 1) {
            var tableCell = document.createElement("td");
            tableCell.id = "toc";
            tableCell.innerText = tableObject.image;
            tableLine.appendChild(tableCell);

            var tableCell = document.createElement("td");
            tableCell.id = "toc";
            tableCell.innerText = tableObject.description;
            tableLine.appendChild(tableCell);

            var tableCell = document.createElement("td");
            tableCell.id = "toc";
            tableCell.innerText = tableObject.price;
            tableLine.appendChild(tableCell);

            var tableCell = document.createElement("td");
            tableCell.id = "toc";
            tableCell.innerText = tableObject.stock;
            tableLine.appendChild(tableCell);
        }
        
        var tableCell = document.createElement("td");
        var update = document.createElement("button");
        var drop = document.createElement("button");

        tableCell.id = "toc";
        
        tableCell.appendChild(drop);
        tableCell.appendChild(update);
        tableLine.appendChild(tableCell);


        table.appendChild(tableLine);
    }

    mainWindow.appendChild(table);
    document.body.appendChild(mainWindow);

    createButton.style.cursor = 'pointer';
    createButton.addEventListener("click", function() {
        createElement(tableType)
    });
}

function createElement(tableType) {
    if (document.getElementsByClassName("table-window")[0]) {
        document.getElementsByClassName("table-window")[0].remove();
    }
    var mainWindow = document.createElement("div"); 
    var table = document.createElement("table");
    mainWindow.className = "table-window";
    
    if (tableType == 1) {
        createLine("SKU:", table);
    }
    createLine("Active:", table, 1);
    createLine("Name:", table);
    if (tableType == 1) {
        createLine("Image:", table);
        createLine("Description:", table);
        createLine("Price:", table, 2);
        createLine("Stock:", table, 3);
    } 

    mainWindow.appendChild(table);
    var create = document.createElement("button");
    var cancel = document.createElement("button");

    create.className = "create-element";
    cancel.id = "cancel-create";

    create.innerText = "Create";
    cancel.innerText = "Cancel";

    create.style.cursor = 'pointer';
    cancel.style.cursor = 'pointer';

    mainWindow.appendChild(create);
    mainWindow.appendChild(cancel);    
    document.body.appendChild(mainWindow);

    cancel.addEventListener("click", function() {
        if (document.getElementsByClassName("table-window")[0]) {
            document.getElementsByClassName("table-window")[0].remove();
        }
        createList(tableType);
    });
}

function createLine(text, table, type = 0) {
    var tableLine = document.createElement("tr");
    var tableCell = document.createElement("td");
    tableCell.innerText = text;
    tableLine.appendChild(tableCell);
    var tableCell = document.createElement("td");
    var inputField = document.createElement("input");

    if (type == 0) { 
        inputField.setAttribute("type", "text");
    } else if (type == 1) { 
        inputField.setAttribute("type", "checkbox");
    } else if (type == 2) { 
        Object.assign(inputField, {
            type: "number",
            step: "0.01"
        });
    } else if (type == 3) { 
        Object.assign(inputField, {
            type: "number",
            step: "1" 
        });
    }
    
    tableCell.appendChild(inputField);
    tableLine.appendChild(tableCell);
    table.appendChild(tableLine);
}



var login = document.getElementById("login");
login.style.cursor = 'pointer';
login.onclick = function() {
    if (document.getElementById("hi")) {
    document.body.removeChild(helloWorld);
    }
    if (document.getElementsByClassName("table-window")[0]) {
        document.getElementsByClassName("table-window")[0].remove();
    }
    if (!document.getElementById("log-win")) {
        var loginWindow = document.createElement("div");
        var name = document.createElement("input");
        var password = document.createElement("input");
        var loginButton = document.createElement("button");
    
        loginWindow.id = "log-win";
        loginButton.id = "log-but";
        password.id = "password";
        name.id = "name";
    
        name.setAttribute("placeholder","name");
        password.setAttribute("placeholder","password");
        loginButton.innerText = "Login";
    
        loginWindow.appendChild(name);
        loginWindow.appendChild(password);
        loginWindow.appendChild(loginButton);
        document.body.appendChild(loginWindow);  
        loginButton.addEventListener("click", function(event, name = document.getElementById("name"), password = document.getElementById("password")) {
            authentication(event, name, password)
        });
    }
};

var mainPage = document.getElementById("main-page"); 
mainPage.style.cursor = 'pointer';
mainPage.onclick = function() {
    if (!document.getElementById("hi")) {
        document.body.appendChild(helloWorld);
    }
    if (document.getElementById("log-win")) {
        document.getElementById("log-win").remove();
    }
    if (document.getElementsByClassName("table-window")[0]) {
        document.getElementsByClassName("table-window")[0].remove();
    }
};

var productList = document.getElementById("products-list"); 
productList.style.cursor = 'pointer';
productList.onclick = function() {
    if (document.getElementById("hi")) {
        document.body.removeChild(helloWorld);
    }
    if (document.getElementById("log-win")) {
        document.getElementById("log-win").remove();
    }
    if (document.getElementsByClassName("table-window")[0]) {
        document.getElementsByClassName("table-window")[0].remove();
    }
    if (!document.getElementsByClassName("table-window")[0]) {
        getAllProducts();
        
    }
};

var categoriesList = document.getElementById("categories-list"); 
categoriesList.style.cursor = 'pointer';
categoriesList.onclick = function() {
    if (document.getElementById("hi")) {
        document.body.removeChild(helloWorld);
    }
    if (document.getElementById("log-win")) {
        document.getElementById("log-win").remove();
    }
    if (document.getElementsByClassName("table-window")[0]) {
        document.getElementsByClassName("table-window")[0].remove();
    }
    if (!document.getElementsByClassName("table-window")[0]) {
        getAllCategories();
    }
};

