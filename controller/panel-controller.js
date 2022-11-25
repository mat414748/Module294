var request;
var getResult = 0;
var helloWorld = document.createElement("div");
helloWorld.innerText = "Welcome";
helloWorld.id = "hi";
document.body.appendChild(helloWorld);

//Permalinks
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

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

