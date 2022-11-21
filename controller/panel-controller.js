var request;
var helloWorld = document.createElement("div");
helloWorld.innerText = "Welcome";
helloWorld.id = "hi";
document.body.appendChild(helloWorld);

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
    request.onreadystatechange = requestAnswer; 
    request.send(JSON.stringify(data));
}

function requestAnswer(event) {
    if (request.readyState < 4) {
        return;
    }
    // console.log(JSON.parse(request.responseText).message); //Response body
    // console.log(request.status); // Status Code
    // console.log(request.statusText); // Status defenition 
    alert(JSON.parse(request.responseText).message);
}

var login = document.getElementById("login");
login.style.cursor = 'pointer';
login.onclick = function() {
    if (document.getElementById("hi")) {
    document.body.removeChild(helloWorld);
    }
    if (document.getElementById("productTableWindow")) {
        document.getElementById("productTableWindow").remove();
    }
    if (document.getElementById("categoryTableWindow")) {
        document.getElementById("categoryTableWindow").remove();
    }
    if (!document.getElementById("logWin")) {
        var loginWindow = document.createElement("div");
        var name = document.createElement("input");
        var password = document.createElement("input");
        var loginButton = document.createElement("button");
    
        loginWindow.id = "logWin";
        loginButton.id = "logBut";
        password.id = "password";
        name.id = "name";
    
        name.setAttribute("placeholder","name");
        password.setAttribute("placeholder","password");
        loginButton.innerText = "Login";
    
        loginWindow.appendChild(name);
        loginWindow.appendChild(password);
        loginWindow.appendChild(loginButton);
        document.body.appendChild(loginWindow);  
        loginButton.addEventListener("click", function(event, name = document.getElementById("name"), password = document.getElementById("password")) 
        {
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
    if (document.getElementById("logWin")) {
        document.getElementById("logWin").remove();
    }
    if (document.getElementById("productTableWindow")) {
        document.getElementById("productTableWindow").remove();
    }
    if (document.getElementById("categoryTableWindow")) {
        document.getElementById("categoryTableWindow").remove();
    }
};

var productList = document.getElementById("products-list"); 
productList.style.cursor = 'pointer';
productList.onclick = function() {
    if (document.getElementById("hi")) {
        document.body.removeChild(helloWorld);
    }
    if (document.getElementById("logWin")) {
        document.getElementById("logWin").remove();
    }
    if (document.getElementById("categoryTableWindow")) {
        document.getElementById("categoryTableWindow").remove();
    }
    if (!document.getElementById("productTableWindow")) {
        var productWindow = document.createElement("div");
        var productListPanel = document.createElement("div");
        var createProductButton = document.createElement("button");
        
        productWindow.className = "tableWindow";
        productWindow.id = "productTableWindow";
        productListPanel.className = "windowPanel";
        productListPanel.id = "productPanel";
        createProductButton.id = "createElement";

        createProductButton.innerText = "Create";
        productListPanel.innerText = "Products list";

        productWindow.appendChild(productListPanel);
        productWindow.appendChild(createProductButton);
        document.body.appendChild(productWindow);
    }
};

var categoriesList = document.getElementById("categories-list"); 
categoriesList.style.cursor = 'pointer';
categoriesList.onclick = function() {
    if (document.getElementById("hi")) {
        document.body.removeChild(helloWorld);
    }
    if (document.getElementById("logWin")) {
        document.getElementById("logWin").remove();
    }
    if (document.getElementById("productTableWindow")) {
        document.getElementById("productTableWindow").remove();
    }
    if (!document.getElementById("categoryTableWindow")) {
        var categoryWindow = document.createElement("div");
        var categoryListPanel = document.createElement("div");
        var createcategoryButton = document.createElement("button");
        
        categoryWindow.className = "tableWindow";
        categoryWindow.id = "categoryTableWindow";
        categoryListPanel.className = "windowPanel";
        categoryListPanel.id = "categoryPanel";
        createcategoryButton.id = "createElement";
        
        createcategoryButton.innerText = "Create";
        categoryListPanel.innerText = "Categories list";

        categoryWindow.appendChild(categoryListPanel);
        categoryWindow.appendChild(createcategoryButton);
        document.body.appendChild(categoryWindow);
    }
};

