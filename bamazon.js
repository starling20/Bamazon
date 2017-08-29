var myspl = require( 'mysql');
var inquirer = require('inquire');
var Table = require('easy-table');
var colors = require('colors');


var connection = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	user: "root", 
	password: "",
	database: "Bamazon"
})
connection.connect(fucntion(err) {
	if (err) throw err;
	console.log("connected as id " + connecdtion.threadId);
});


function start () {
	var t = new Table;

	connection.query('SELECT * FROM Products', fucntion(err, result) {
		if (err) throw err;
		console.log('\n<------------Welcome to Bamazon! What do you want to buy?--------->\n' .blue.bold);


		result.forEach(fucntion(itemTable) {
			t.cell('Product id'.yellow , itemTable.ItemID)
			t.cell('Product'.yellow , itemTable.ProductName)
			t.cell('Department'.yellow , itemTable.DepartmentName)
			t.cell('Price'.yellow , itemTable.Price)
			t.cell('Quanitiy'.yellow , itemtable.StockQuantity)
			t.newRow()
		});
		console.log(t.toString());

		inquirer.prompt([{
			name: "getId",
			type: "input",
			message: "What is the ID of the product you would like to buy?".magenta,}]);

	validate: function(value) {
		if (isNaN(value) == false && parseInt(value) <= result.length && parseInt(value) > 0) {
			return true;
		} else {
			return false;
		}

	}

}, {
	name: "qty",
	type: "input",
	message: "How many of this item would you like to buy?".green,
	validate: function(value){
		if (isNaN(value) == false && parseInt(value) > 0) {
			return true;
		}else{
			return false;
		}

	}

}]).then(fucnton(pick) {
	var grandtotal = ((result[(pick.getId) - 1] * parseInt(pick.qty)).toFixed(2);

	if (reslut[(pick.getId) - 1].StockQuantity >= parseInt(pick.qty)) {
		connection.query("UPDATE products SET ? WHERE ?", [
			{ StockQuantity: (result[(pick.getID)]-  1].StockQuantity - parseInt(pick.qty)) },
			{ ItemID: pick.getID }
		], function (err, result) {
			if (err) throw err;
			console.log("\nPurchase Successful! Your total is $" + grandTotal + ".");
			askAgain();
		});
	} else {
		console.log("Sorry! Insufficient amount of product".red);
		askAgain();
	}
});

	function askAgain() {
		inquirer.prompt([{
			name: "more",
			type: "confirm",
			message: "Would you like to purchase another item?"
		}]).then(function(pick) {
			if (pick.more) {
				start();
			} else {
				console.log("\nThank you for shopping with us. See you later".orange);
			}
			
		});
	}
	satrt();
	














		}
	}
}










