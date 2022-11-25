var request;
var getResult = 0;
var helloWorld = document.createElement("div");
helloWorld.innerText = "Welcome";
helloWorld.id = "hi";
document.body.appendChild(helloWorld);


//Permalinks
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//PUT
function updateProduct(id, sku, active, idCategory, name, image, description, price, stock) {
    if (active.checked) {
        var act = true;
    } else {
        var act = false;
    }
    if (idCategory.value == "") {
        var nulich = "NULL";
    } else {
        var nulich = idCategory.value;
    }
    var data = {
        sku: sku.value,
        active: act,
        id_category: nulich,
        name: name.value,
        image: image.value,
        description: description.value,
        price: price.value,
        stock: stock.value
    };
    request = new XMLHttpRequest();
    request.open("PUT", "/levantsou-matvej/API/V1/Product/" + id);
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
function updateCategory(id, active, name) {
    if (active.checked) {
        var act = true;
    } else {
        var act = false;
    }
    var data = {
        active: act,
        name: name.value
    };
    request = new XMLHttpRequest();
    request.open("PUT", "/levantsou-matvej/API/V1/Category/" + id);
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//POST
function createProduct(sku, active, idCategory, name, image, description, price, stock) {
    if (active.checked) {
        var act = true;
    } else {
        var act = false;
    }
    if (idCategory.value == "") {
        var nulich = "NULL";
    } else {
        var nulich = idCategory.value;
    }
    var data = {
        sku: sku.value,
        active: act,
        id_category: nulich,
        name: name.value,
        image: image.value,
        description: description.value,
        price: price.value,
        stock: stock.value
    };
    request = new XMLHttpRequest();
    request.open("POST", "/levantsou-matvej/API/V1/Product");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
function createCategory(active, name) {
    if (active.checked) {
        var act = true;
    } else {
        var act = false;
    }
    var data = {
        active: act,
        name: name.value,
    };
    request = new XMLHttpRequest();
    request.open("POST", "/levantsou-matvej/API/V1/Category");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
function requestCreateAndUpdate(event) {
    if (request.readyState < 4) {
        return;
    } 
    if (JSON.parse(request.responseText).message.includes("Please provide a") || JSON.parse(request.responseText).message.includes("Cannot add or update a child row")) {
        if (JSON.parse(request.responseText).message.includes("Cannot add or update a child row")) {
            alert(JSON.parse(request.responseText).message + "\n Maybe there is no category with this id.");
        } else {
            alert(JSON.parse(request.responseText).message);
        }
    } else {
        if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Category")) {
            document.getElementsByClassName("table-window")[0].remove();
            getAllCategories();
            alert(JSON.parse(request.responseText).message);
        } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Product")) {
            document.getElementsByClassName("table-window")[0].remove();
            getAllProducts();
            alert(JSON.parse(request.responseText).message);
        }
    }   
}
//DELETE
function deleteProduct(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/levantsou-matvej/API/V1/Product/" + id);
    request.onreadystatechange = requestDelete; 
    request.send();
}
function deleteCategory(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/levantsou-matvej/API/V1/Category/" + id);
    request.onreadystatechange = requestDelete; 
    request.send();
}
function requestDelete(event) { 
    if (request.readyState < 4) {
        return;
    } 
    alert(JSON.parse(request.responseText).message);
    if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Category")) {
        document.getElementsByClassName("table-window")[0].remove();
        getAllCategories();
    } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Product")) {
        document.getElementsByClassName("table-window")[0].remove();
        getAllProducts();
    }
}
//GET ALL
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
        document.body.appendChild(helloWorld);
    } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Category")) {
        getResult = JSON.parse(request.responseText).message;
        if (getResult == "No categories found") {
            alert(getResult);
        }
        createList();
    } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Product")) {
        getResult = JSON.parse(request.responseText).message;
        if (getResult == "No products found") {
            alert(getResult);
        }
        createList(1);
    }
}
//GET ONE
function getProduct(id, forPermalink = 0) {
    request = new XMLHttpRequest();
    request.open("GET", "/levantsou-matvej/API/V1/Product/" + id);
    request.onreadystatechange = function(){requestOne(event, id, forPermalink)}; 
    request.send();
}
function getCategory(id, forPermalink = 0) {
    request = new XMLHttpRequest();
    request.open("GET", "/levantsou-matvej/API/V1/Category/" + id);
    request.onreadystatechange = function(){requestOne(event, id, forPermalink)}; 
    request.send();
}
function requestOne(event, id, forPermalink) {
    if (request.readyState < 4) {
        return;
    } 
    if (JSON.parse(request.responseText).message == "Unauthorised") {
        alert(JSON.parse(request.responseText).message);
        document.body.appendChild(helloWorld);
    } else {
        if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Category")) {
            if (forPermalink == 0) {
                getResult = JSON.parse(request.responseText).message;
                createOrUpdateTableElement(0, 1, id);
                if (getResult == "No category found") {
                    alert(getResult);
                }
            } else {
                getResult = JSON.parse(request.responseText).message;
                if (getResult == "No category found") {
                    alert(getResult);
                    document.body.appendChild(helloWorld);
                } else {
                    createList();
                }
            }      
        } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Product")) {
            if (forPermalink == 0) {
                getResult = JSON.parse(request.responseText).message;
                createOrUpdateTableElement(1, 1, id);
                if (getResult == "No product found") {
                    alert(getResult);
                }
            } else {
                getResult = JSON.parse(request.responseText).message;
                if (getResult == "No product found") {
                    alert(getResult);
                    document.body.appendChild(helloWorld);
                } else {
                    createList(1);
                }     
            }
        }
    }
}
//AUTHENTICATION
function authentication(name, password) {
    var data = [
        {
            username: name.value
        },
        {
            password: password.value
        }
    ];
    request = new XMLHttpRequest();
    request.open("POST", "/levantsou-matvej/API/V1/Authentication");
    request.onreadystatechange = requestAuthentication; 
    request.send(JSON.stringify(data));
}
function requestAuthentication() { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText).message.split(";");
    if (answer[0] == "Token created") {
        if (document.getElementById("log-win")) {
            document.getElementById("log-win").remove();
        }
        document.body.appendChild(helloWorld);
        logoutOut();
    }
    alert(answer[0]);  
}
//Create table to view
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

    if (tableType == 0) {
        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = "Category_id";
        tableLine.appendChild(tableCell); 
    }

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

    if (tableType == 1) {
        var tableCell = document.createElement("td");
        tableCell.id = "toc";
        tableCell.innerText = "Id_category";
        tableLine.appendChild(tableCell); 
    }

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
    tableLine.appendChild(tableCell);

    table.appendChild(tableLine);
    if (Array.isArray(getResult) || typeof getResult === 'object') {
        if (Array.isArray(getResult)) {
            var length = getResult.length;
        } else {
            var length = 1;
        }
        for (let i = 0; i < length; i++) {
            if (Array.isArray(getResult)) {
                var tableObject = getResult[i];
            } else {
                var tableObject = getResult;
            }
            
            var tableLine = document.createElement("tr");

            if (tableType == 0) {
                var tableCell = document.createElement("td");
                tableCell.id = "toc";
                tableCell.innerText = tableObject.category_id;
                tableLine.appendChild(tableCell); 
            }

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

            if (tableType == 1) {
                var tableCell = document.createElement("td");
                tableCell.id = "toc";
                tableCell.innerText = tableObject.id_category;
                tableLine.appendChild(tableCell);
            }

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
            let update = document.createElement("button");
            let drop = document.createElement("button");

            update.innerText = "UPD";
            drop.innerText = "X";

            tableCell.id = "interactive-panel"
            update.className = "upd";
            drop.className = "drop";

            if (tableType == 1) {
                drop.setAttribute("target-id", tableObject.product_id);
            } else if (tableType == 0) {
                drop.setAttribute("target-id", tableObject.category_id);
            }

            drop.style.cursor = 'pointer';
            drop.addEventListener("click", function(event) {   
                if (tableType == 1) {
                    deleteProduct(event.currentTarget.getAttribute("target-id"));
                } else if (tableType == 0) {
                    deleteCategory(event.currentTarget.getAttribute("target-id"));
                }
            });

            if (tableType == 1) {
                update.setAttribute("target-id", tableObject.product_id);
            } else if (tableType == 0) {
                update.setAttribute("target-id", tableObject.category_id);
            }

            update.style.cursor = 'pointer';
            update.addEventListener("click", function(event) {
                if (tableType == 1) {
                    getProduct(event.currentTarget.getAttribute("target-id"));
                } else if (tableType == 0) {
                    getCategory(event.currentTarget.getAttribute("target-id"));
                }
            });

            tableCell.appendChild(drop);
            tableCell.appendChild(update);
            tableLine.appendChild(tableCell);


            table.appendChild(tableLine);
        }   
    }

    mainWindow.appendChild(table);
    document.body.appendChild(mainWindow);

    createButton.style.cursor = 'pointer';
    createButton.addEventListener("click", function() {
        createOrUpdateTableElement(tableType);
    });
}
//Create/Update menu
function createOrUpdateTableElement(tableType, action = 0, elementId = 0) {
    if (document.getElementsByClassName("table-window")[0]) {
        document.getElementsByClassName("table-window")[0].remove();
    }
    var mainWindow = document.createElement("div"); 
    var table = document.createElement("table");
    mainWindow.className = "table-window";
    
    if (tableType == 1) {
        var sku = createLine("SKU:", table);
    }
    var active = createLine("Active:", table, 1);
    if (tableType == 1) {
        var id = createLine("Id_category:", table, 3);
    }
    var name = createLine("Name:", table);
    if (tableType == 1) {
        var image = createLine("Image:", table);
        var desc = createLine("Description:", table);
        var price = createLine("Price:", table, 2);
        var stock = createLine("Stock:", table, 3);
    } 

    mainWindow.appendChild(table);

    if (action == 0) {
        var create = document.createElement("button");
        create.className = "create-element";
        create.innerText = "Create";
        create.style.cursor = 'pointer';
        mainWindow.appendChild(create);  
    } else {
        var update = document.createElement("button");
        update.id = "update-element";
        update.innerText = "Update";
        update.style.cursor = 'pointer';
        mainWindow.appendChild(update); 

        if (tableType == 1) {
            sku.value = getResult.sku;
            if (getResult.active == "0") {
                active.checked = false;
            } else {
                active.checked = true;
            }
            id.value = getResult.id_category;
            name.value = getResult.name;
            image.value = getResult.image;
            desc.value = getResult.description;
            price.value = getResult.price;
            stock.value = getResult.stock;
        } else {
            active.value = getResult.active;
            name.value = getResult.name;
        }
    }

    var cancel = document.createElement("button");
    cancel.id = "cancel-create";
    cancel.innerText = "Cancel";
    cancel.style.cursor = 'pointer';

    mainWindow.appendChild(cancel);    
    document.body.appendChild(mainWindow);

    cancel.addEventListener("click", function() {
        if (document.getElementsByClassName("table-window")[0]) {
            document.getElementsByClassName("table-window")[0].remove();
        }
        if (tableType == 1) {
            getAllProducts();
        } else {
            getAllCategories();
        }
    });

    if (action == 0) {
        create.addEventListener("click", function() {
            if (tableType == 1) {
                createProduct(sku, active, id, name, image, desc, price, stock);
            } else {
                createCategory(active, name);
            }
        });
    } else {
        update.addEventListener("click", function() {
            if (tableType == 1) {
                updateProduct(elementId, sku, active, id, name, image, desc, price, stock);
            } else {
                updateCategory(elementId, active, name);
            }
        });
    }
}
//Create/Update field
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
    return inputField;
}

//Login function
function loginIn() {
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
        loginButton.addEventListener("click", function() {
            authentication(name, password)
        });
    }
}
//Logout function
function logoutOut() {
    login.innerText = "Logout";
    login.onclick = function() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        login.innerText = "Login";
        alert("Successfully logout");
        login.onclick = function() {
            loginIn();
        };
    }
} 

//Login 
var login = document.getElementById("login");
login.style.cursor = 'pointer';
if (document.cookie.indexOf('token=')) {
    login.onclick = function() {
        loginIn();
    };
} else {
    logoutOut();
}


//Main page
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

//Products list
var productList = document.getElementById("products-list"); 
productList.style.cursor = 'pointer';
if (urlParams.get('prodId')) {
    if (document.getElementById("hi")) {
        document.body.removeChild(helloWorld);
    }
    getProduct(urlParams.get('prodId'), 1);
}
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

//Categories list
var categoriesList = document.getElementById("categories-list"); 
categoriesList.style.cursor = 'pointer';
if (urlParams.get('catId')) {
    if (document.getElementById("hi")) {
        document.body.removeChild(helloWorld);
    }
    getCategory(urlParams.get('catId'), 1);
}
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

