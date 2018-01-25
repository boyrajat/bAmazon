CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
item_id INTEGER(5) NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER (10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY(id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("4578", "Apple iPhone X", "CellPhones", "999.00", "3000");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("4579", "Samsung J7", "CellPhones", "769.00", "3500");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("4580", "Huawei Mate 9", "CellPhones", "499.00", "2000");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("5578", "Ring Doorbell Pro", "Electronics", "249.00", "1500");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("5579", "Honeywell WiFi Thermostat", "Electronics", "149.00", "500");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("5580", "GE Smart LED Light", "Electronics", "99.00", "2000");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("6578", "Kelloggs Corn Flakes", "Pantry", "3.00", "2000");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("6579", "Nature Valley Oatmeal", "Pantry", "2.00", "1000");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("6580", "Sharwood Tikka Masala Sauce", "Pantry", "4.00", "5000");

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("5581", "Sharwood Mango Chutney", "Pantry", "4.00", "1500");

SELECT * FROM products;