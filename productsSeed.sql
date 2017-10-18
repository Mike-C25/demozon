DROP DATABASE IF EXISTS demozon;
CREATE DATABASE demozon;

USE demozon;

CREATE TABLE products(
  item_id INTEGER(255) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(255) NULL, 
  price DECIMAL(10,4) NULL, 
  stock_quantity INTEGER(255) NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price,stock_quantity)
VALUES ("rolex watch", "accessories", 46001.99 , 100),
("snowboard", "outdoor", 468.99 , 10),
("water bottle", "outdoor", 2.88 , 300),
("shoes", "outdoor", 35.99 , 400),
("mittens", "accessories", 8.99, 50),
("helmet", "outdoor", 14.99, 100),
("candy", "etc", .99 , 1000),
("socks", "accessories", 1.99, 100),
("laptops", "electronics", 899.99, 20),
("phone", "electronics", 589.99, 200)
