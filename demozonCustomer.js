var inquirer = require('inquirer');
var mysql = require('mysql');
var currentID;
var currentAmount;
var userCart;
var cartTotal;


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "demozon"
});

function startConnection() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        // createSong();
        initialPrompt();
    });
};
startConnection();


function initialPrompt() {
    inquirer.prompt([{
            type: "text",
            message: "What is the ID of the product you wish to buy?",
            name: "userItemID"
        },
        {
            type: "text",
            message: "How many would you like to purchase?",
            name: "userAmount"
        }
    ]).then(function(res) {
        currentID = parseInt(res.userItemID);
        currentAmount = parseInt(res.userAmount);

        // console.log(currentID, currentAmount);
        if (currentID && currentAmount) {
            console.log("Connecting to database...");
            //check
            dataCheck();
        } else {
            console.log("\n" + "Please put the proper type for your answers" + "\n");
            initialPrompt();
        }
    });
};


function dataCheck() {
    var checkID = false;
    var checkAmount = false;
    var qID = "SELECT * FROM products";
    //check if ID exists
    connection.query(qID, function(err, res) {
        if (err) console.log(err);

        // console.log(res.length);
        for (id in res) {
            if (currentID === res[id].item_id) {
                checkID = true;
            }
        }
        if (checkID) {
            console.log(`\nSelecting ID: ${currentID} from database...\nProduct: ${res[currentID-1].product_name}\nchecking for available stock...\n`);
            if (res[currentID - 1].stock_quantity - currentAmount >= 0) {

                var rItems = res[currentID - 1].stock_quantity - currentAmount;
                console.log(`Item available! Placing order in your shopping cart`);

                if (userCart === undefined) {
                    console.log("Cart Empty....making new cart");
                    userCart = [];
                    userCart.push({
                        item: res[currentID - 1].product_name,
                        quantity: currentAmount,
                        price: res[currentID - 1].price,
                        combinedPrice: (res[currentID - 1].price * currentAmount)
                    });

                } else {
                    for (item in userCart) {
                        if (userCart[items].item === res[currentID - 1].product_name) {
                            userCart[items].quantity = currentAmount;
                            console.log("1:1");
                        } else {
                            console.log("1:2");
                            userCart.push({
                                item: res[currentID - 1].product_name,
                                quantity: currentAmount
                            });
                        }
                    }

                }

                updateItem(rItems);
            } else {
                console.log(`Sorry,looks like we've run out of stock on that item. Returning to start`);
                initialPrompt();
            }
        }
        //check if item is in stock

        // console.log(checkID);

        // res[i].item_id

    });
    // var qA = SELECT
}

function updateItem(rItem) {
    console.log(rItem, currentID);
    var qItem = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
    connection.query(qItem, [rItem, currentID], function(err, res) {
        if (err) console.log(err);
        // console.log(res);
        // viewInventory();
        viewCart();
    })
}

function viewCart() {
    cartTotal = 0;
    for (items in userCart) {
        console.log("|---------------------------------------------|");
        console.log(`Item: ${userCart[items].item}\nQuantity: ${userCart[items].quantity}\nPrice: ${userCart[items].combinedPrice}`)
        console.log("|---------------------------------------------|");
        cartTotal += userCart[items].combinedPrice; 
    }
    console.log(`\nTotal: $${cartTotal}`);
    inquirer.prompt([{
            type: "confirm",
            message: "Would you like to place another item?",
            name: "order"
        }
    ]).then(function(res) {
        if(res.order){
            initialPrompt();
        }else{
            console.log(`Closing application!`)
            connection.end()
        }
    });
}

function viewInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log(res);
    })
}


// connection.end();