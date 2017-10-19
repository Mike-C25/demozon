var mysql = require('mysql');
var inquirer = require('inquirer');

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
        initPrompt();
    });
};
startConnection();


function initPrompt() {
    inquirer
        .prompt([{
            type: "list",
            message: "Select One:",
            name: "userSelect",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(function(res) {
            console.log(res.userSelect);

            switch (res.userSelect) {

                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                	viewLowInventory();
                    break;
                case "Add to Inventory":
                	addToInventory();
                    break;
                case "Add New Product":
                	addNewProduct();
                    break;
                default:
                    console.log("error");

            }

        });
};

function viewProducts(){
	console.log("\nInitializing DB for viewing...");
}

function viewLowInventory(){
	console.log("\nLoading up low inventory");
}

function addToInventory(){
	console.log("\nAdding to inventory...")
}

function addNewProduct(){
	console.log("\nAdding new product...")
}


// View Products for Sale

// View Low Inventory

// Add to Inventory

// Add New Product

// inquirer.prompt([{},{}]).then(function(res){

// })