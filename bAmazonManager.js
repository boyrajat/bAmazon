var mysql = require("mysql");
var inquire = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "",
	database: "bamazonDB"
});

connection.connect(function(err) {
	if(err) throw err;
	console.log("Connected as ID: " + connection.threadId + "\n");
	managerOptions();
})

function managerOptions() {
	inquire.prompt(
{
	name: "managerMenu",
	type: "list",
	message: "HELLO MANAGER, PLEASE TELL ME WHAT WOULD YOU LIKE TO DO? \n\n",
	choices: ["View Products For Sale", "View Products With Inventory Lower Than 1001", "Add Inventory", "Add New Product", "EXIT"]
}
		)
	.then(function(response) {
		console.log("Since you would like to -- " + response.managerMenu + "\n");
		switch(response.managerMenu) {
			case "View Products For Sale":
				prodForSale();
				break;

			case "View Products With Inventory Lower Than 1001":
				prodLowInv();
				break;

			case "Add Inventory":
				prodInvAdd();
				break;

			case "Add New Product":
				prodAdd();
				break;

			case "EXIT":
			console.log("BYE BYE\n\n");
				connection.end();
				break;	

			default:
				console.log("Pease Chose an Option from the List..");

		}

	});
}



function prodForSale() {
	console.log("<----------- BAMAZON.COM - M.A.N.A.G.E.R  P.R.O.D.U.C.T  V.I.E.W  ------------->\n");
	connection.query("SELECT * FROM products", function(err,res) {
		if (err) throw err;
		var table = new Table({
			head: ['ITEMS', 'ITEM ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY']
		});

		for(var i=0; i<res.length; i++) {
			table.push(
				[res[i].id, res[i].item_id, res[i].product_name, res[i].department_name, "$ " + res[i].price.toFixed(2), res[i].stock_quantity]
				);
		};
		console.log(table.toString());
		managerOptions();

	});
}

function prodLowInv() {
	console.log("<----------- BAMAZON.COM - M.A.N.A.G.E.R  L.O.W. I.N.V.E.N.T.O.R.Y.  ------------->");
	console.log("<----------- These Product quatities are less than 1001  ------------->\n");
	connection.query("SELECT * FROM products WHERE stock_quantity < "+ 1001, function(err,res) {
		if (err) throw err;
		var tableLow = new Table({
			head: ['ITEMS', 'ITEM ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY']
		});
		for (var j=0; j<res.length; j++) {
			tableLow.push(
				[res[j].id, res[j].item_id, res[j].product_name, res[j].department_name, "$ " + res[j].price.toFixed(2), res[j].stock_quantity]
				);
		}
		console.log(tableLow.toString());
		managerOptions();
	});

}

function prodInvAdd() {
	inquire.prompt([

	{
		name: "product",
		type: "input",
		message: "Please Enter the ITEM ID for the product to add inventory: "
	},
	{
		name: "quantity",
		type: "input",
		message: "Please Enter the quantity you would like to add to this product: "
	}


		])
	.then(function(response) {
		var productId = response.product.toString();
		var prodQuantity = response.quantity;
		connection.query("SELECT * FROM products", function(err,res) {
			if (err) throw err;
			var itemsArr = [];
			for (var k = 0; k < res.length; k++) {
				itemsArr.push(res[k].item_id.toString());

			}
			if (itemsArr.includes(productId) && !isNaN(prodQuantity)) {
				addInventory(productId,prodQuantity);
			} else {
				console.log("\nINCORRECT ITEM ID OR QUANTITY VALUE. PLEASE TRY AGAIN\n");
				prodInvAdd();
			}
		});
	});
}

function addInventory(item,quantity) {
	connection.query("SELECT * FROM products WHERE item_id = " + item, function(err,res) {
		if (err) throw err;
		//console.log(res[0].stock_quantity);
		var newQuantity = parseInt(res[0].stock_quantity) + parseInt(quantity);
		//console.log(newQuantity);
		connection.query("UPDATE products SET stock_quantity = " + newQuantity + " WHERE item_id = " + item, function(err,res) {
			if (err) throw err;
			
		});
		console.log("\nYAY, We have successfully added " + quantity + " of " + res[0].product_name + " to inventory..\n");
		managerOptions();
	})

}

function prodAdd() {
	inquire.prompt([
	{
		name: "itemId",
		type: "input",
		message: "Please enter a unique 4 digit ITEM ID for the new Product: "
	},
	{
		name: "itemName",
		type: "input",
		message: "Please enter the NAME of the new Product: "
	},
	{
		name: "department",
		type: "input",
		message: "Please enter DEPARTMENT name for the new Product: "
	},
	{
		name: "price",
		type: "input",
		message: "Please enter the PRICE for the new Product: "
	},
	{
		name: "quantity",
		type: "input",
		message: "Please enter INITIAL INVENTORY for the new Product: "
	}
		])
	.then(function(response) {
		if (!isNaN(response.itemId) || !isNaN(response.price) || !isNaN(response.quantity) ) {
			connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) " +
				"VALUES (?,?,?,?,?);", [response.itemId,response.itemName,response.department,response.price,response.quantity], function(err,res) {
					if (err) throw err;
					console.log("\nNEW PRODUCT HAS BEEN ADDED...\n");
					managerOptions();
				});

			
		} else {
			console.log("\nPlease Provide appropriate information\n");
			prodAdd();
			
				
		}
	})
	
	
	
	
	
}