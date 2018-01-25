var inquire = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazonDB"
});

connection.connect(function(err) {
	if(err) throw err;
	console.log("Connected as ID: " + connection.threadId + "\n");
	displayGoods();
	
});

function displayGoods() {
	console.log("<----------- WELCOME TO BAMAZON.COM - where shopping is a please  ------------->\n");
	console.log("<------------------------------ Available Goods ------------------------------>\n");
	connection.query("SELECT * FROM products", function(err, res) {
		if(err) throw err;

		var table = new Table({
			head: ['ITEMS', 'ITEM ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY'],
		});

		for (var i=0; i<res.length; i++) {
			table.push(
				[res[i].id, res[i].item_id, res[i].product_name, res[i].department_name, "$ " + res[i].price.toFixed(2), res[i].stock_quantity]
				);
		};
		console.log(table.toString());
		start();

	})
}

function start() {
		inquire.prompt([
		{
			type: "input",
			message: "PLEASE TYPE THE ITEM NUMBER OF THE PRODUCTION YOU WISH TO BUY -> ",
			name: "item"
		},
		{
			type: "input",
			message: "PLEASE ENTER QUANTITY YOUR WOULD LIKE TO BUY -> ",
			name: "quantity"
		}


			])
		.then(function(inquirerResponse) {
			var productId = inquirerResponse.item.toString();
			var prodQuantity = inquirerResponse.quantity;
connection.query("SELECT * FROM products", function(err, res) {
	if (err) throw err;
	var itemsArr = [];
	
	for (var i = 0; i < res.length; i++) {
		itemsArr.push(res[i].item_id.toString());


	}
//console.log(itemsArr);

	if (itemsArr.includes(productId)) {

		purchase(productId,prodQuantity);

	} else {

		console.log("\nITEM DOESNT EXIST - PLEASE ENTER CORRECT INFORMATION\n");
		start();
	}
	})
})
			
		
}

function purchase(item,quantity) {
	connection.query("SELECT * FROM products WHERE item_id=?", item, function(err, res) {
		if(err) throw err;
		//console.log(item);
		//console.log(res);
		//console.log("YOU WISH TO PURCHASE " + quantity + " " + res[0].product_name + " at $ " + res[0].price + " each\n");


		if(quantity > res[0].stock_quantity) {
			console.log("SORRY, WE ONLY HAVE " + res[0].stock_quantity + " of " + res[0].product_name + " available..");
			connection.end();
		} else {
		var totalPrice = quantity * res[0].price;
		console.log("\n\nYOUR TOTAL FOR THIS PURCHASE IS -> $" + totalPrice + "\nTHANK YOU FOR SHOPPING AT BAMAZON.COM\n\n");
		connection.end();
	}
	})

}