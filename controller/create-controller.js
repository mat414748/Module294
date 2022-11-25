//Create table to view
function createList(tableType = 0) {
    var mainWindow = document.createElement("div");
    var namePanel = document.createElement("div");
    var tableName = document.createElement("div");
    var createButton = document.createElement("button");

    mainWindow.className = "table-window";
    namePanel.id = "name-panel";
    tableName.className = "window-name";

    //TableType means what kind of table (1 products or 0 categories)
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
    //Start of the first line creation
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
    //End of creation of the first line
    
    //Filling tables with elements from the database
    if (Array.isArray(getResult) || typeof getResult === 'object') {
        if (Array.isArray(getResult)) {
            var length = getResult.length;
        } else {
            //Only one time fill 
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
    
    //TableType means what kind of table (1 products or 0 categories)
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

    //Action - which button should appear in the item creation = 0 / update window = 1
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
            if (getResult.active == "0") {
                active.checked = false;
            } else {
                active.checked = true;
            }
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
