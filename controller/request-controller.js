
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
        name: name.value
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
    var answer = JSON.parse(request.responseText).message;
    if (answer.includes("Please provide a") || answer.includes("Cannot add or update a child row") || answer.includes("The product is not found or an identical")) {
        if (answer.includes("Cannot add or update a child row")) {
            alert(answer + "\n Maybe there is no category with this id.");
        } else {
            alert(answer);
        }
    } else {
        if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Category")) {
            document.getElementsByClassName("table-window")[0].remove();
            getAllCategories();
            alert(answer);
        } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Product")) {
            document.getElementsByClassName("table-window")[0].remove();
            getAllProducts();
            alert(answer);
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
    request.onreadystatechange = function() {
        requestOne(event, id, forPermalink)
    }; 
    request.send();
}
function getCategory(id, forPermalink = 0) {
    request = new XMLHttpRequest();
    request.open("GET", "/levantsou-matvej/API/V1/Category/" + id);
    request.onreadystatechange = function() {
        requestOne(event, id, forPermalink)
    }; 
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
        logout();
    }
    alert(answer[0]);  
}