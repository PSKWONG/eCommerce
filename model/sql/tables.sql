-- Create User Table 
create table users (
    user_id Serial Primary Key,
    userName varchar(20),
    email varchar(50) Unique,
    password varchar(100)
);

-- Create Session Table 
Create table sessions (
    sid varchar(100) Primary Key,
    sess json not null,
    expire timestamp not null
);

-- Create products Table 
Create table products (
    product_id Serial Primary Key,
    product_name varchar(100) not null,
    description varchar(500),
    image bytea not null,
    unit_price money not null
);

-- Create categories Table 
Create table categories (
    id Serial Primary Key,
    category_name varchar(50) not null
);

-- Create order Table 
Create table orders (
    order_id Serial Primary Key,
    order_date TIMESTAMP,
    delivery_date date,
    total_price money,
    user_id integer,
    CONSTRAINT fk_user
  	FOREIGN KEY (user_id)
  	REFERENCES users(user_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


--- Create a relationship table user_cart
CREATE TABLE users_carts(
	user_id INTEGER, 
  product_id INTEGER,
  quantity INTEGER,
  CONSTRAINT fk_user
  	FOREIGN KEY (user_id)
  	REFERENCES users(user_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
  CONSTRAINT fk_products
  	FOREIGN KEY (product_id)
  	REFERENCES products(product_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
); 



--- Create a relationship order_product
Create table orders_products (
    order_id integer ,
    product_id integer ,
    quantity integer,
    unit_price money,
    CONSTRAINT fk_order
  	FOREIGN KEY (order_id)
  	REFERENCES orders(order_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    CONSTRAINT fk_products
    FOREIGN KEY (product_id)
    REFERENCES products(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

--- Create a relationship products_categories
Create table products_categories (
    product_id integer,
    categories_id integer,
    CONSTRAINT fk_categories
  	FOREIGN KEY (categories_id)
  	REFERENCES categories(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    CONSTRAINT fk_products
  	FOREIGN KEY (product_id)
  	REFERENCES products(product_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);