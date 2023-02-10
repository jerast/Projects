DROP DATABASE AuraBellezaDB;

CREATE DATABASE IF NOT EXISTS AuraBellezaDB;

USE AuraBellezaDB;

-- USERS tables

	CREATE TABLE users (
		id VARCHAR(50) NOT NULL,
		name VARCHAR(45) NOT NULL,
		email VARCHAR(50) NOT NULL,
		role_id INT(1) DEFAULT 1,
		state_id INT(1) DEFAULT 1,
		UNIQUE ( email ),
		PRIMARY KEY ( id )
	);

	CREATE TABLE user_roles ( -- PT
		id INT(1) NOT NULL AUTO_INCREMENT,
		name VARCHAR(100),
		PRIMARY KEY ( id )
	);

	CREATE TABLE user_states ( -- PT
		id INT(1) NOT NULL AUTO_INCREMENT,
		name VARCHAR(100),
		PRIMARY KEY ( id )
	);

-- PRODUCTS tables

	CREATE TABLE products (
		id INT(11) NOT NULL AUTO_INCREMENT,
		name VARCHAR(50) NOT NULL,
		reference VARCHAR(50) NOT NULL,
		description VARCHAR(150) DEFAULT NULL,
		category_id INT(4) NOT NULL,
		state_id INT(1) DEFAULT 1,
		retail_price INT(11) DEFAULT 0,
		wholesale_price INT(11) DEFAULT 0,
		image VARCHAR(100) DEFAULT NULL,
		UNIQUE (reference),
		PRIMARY KEY ( id )
	);

	CREATE TABLE product_states ( -- PT
		id INT(1) NOT NULL AUTO_INCREMENT,
		name VARCHAR(100),
		PRIMARY KEY ( id )
	);

	CREATE TABLE categories ( -- PT
		id INT(4) NOT NULL AUTO_INCREMENT,
		name VARCHAR(50) NOT NULL,
		description VARCHAR(150) DEFAULT NULL,
		PRIMARY KEY ( id )
	);

-- ORDERS tables

	CREATE TABLE orders ( -- PT
		id INT(11) NOT NULL AUTO_INCREMENT,
		user_id VARCHAR(50) NOT NULL,
		date DATETIME NOT NULL,
		total_price INT(11) NOT NULL,
		state_id INT(1) NOT NULL,
		wholesale BOOLEAN NOT NULL,
		PRIMARY KEY ( id )
	);

	CREATE TABLE order_details (
		id INT(11) NOT NULL AUTO_INCREMENT,
		order_id INT(11) NOT NULL,
		product_id INT(11) NOT NULL,
		unit_price INT(11) NOT NULL,
		count INT(11) NOT NULL,
		PRIMARY KEY ( id )
	);

	CREATE TABLE order_states ( -- PT
		id INT(1) NOT NULL AUTO_INCREMENT,
		name VARCHAR(100),
		PRIMARY KEY ( id )
	);

-- INVENTORY tables

	CREATE TABLE inventory (
		product_id INT(11) NOT NULL,
		count INT(4) NOT NULL
	);

	CREATE TABLE resupplies ( -- PT
		id INT(11) NOT NULL AUTO_INCREMENT,
		reference VARCHAR(50) NOT NULL,
		date DATE NOT NULL,
		total_price INT(11) NOT NULL,
		UNIQUE ( reference ),
		PRIMARY KEY ( id )
	);

	CREATE TABLE resupplies_details (
		id INT(11) NOT NULL AUTO_INCREMENT,
		resupply_id INT(11) NOT NULL,
		product_id INT(11) NOT NULL,
		unit_price INT(11) NOT NULL,
		count INT(11) NOT NULL,
		PRIMARY KEY ( id )
	);

-- RELATIONS

	ALTER TABLE users ADD FOREIGN KEY ( role_id ) REFERENCES user_roles ( id ); 							-- users <- user_roles
	ALTER TABLE users ADD FOREIGN KEY ( state_id ) REFERENCES user_states ( id ); 						-- users <- user_states
	ALTER TABLE products ADD FOREIGN KEY ( category_id ) REFERENCES categories ( id ); 					-- products <- categories
	ALTER TABLE products ADD FOREIGN KEY ( state_id ) REFERENCES product_states ( id ); 				-- products <- product_states
	ALTER TABLE orders ADD FOREIGN KEY ( user_id ) REFERENCES users ( id ); 								-- orders <- users
	ALTER TABLE orders ADD FOREIGN KEY ( state_id ) REFERENCES order_states ( id ); 						-- orders <- order_states
	ALTER TABLE order_details ADD FOREIGN KEY ( order_id ) REFERENCES orders ( id ); 					-- order_details <- orders
	ALTER TABLE order_details ADD FOREIGN KEY ( product_id ) REFERENCES products ( id ); 				-- order_details <- products
	ALTER TABLE inventory ADD FOREIGN KEY ( product_id ) REFERENCES products ( id ); 					-- inventory <- products
	ALTER TABLE resupplies_details ADD FOREIGN KEY ( resupply_id ) REFERENCES resupplies ( id ); 	-- resupplies_details <- resupplies
	ALTER TABLE resupplies_details ADD FOREIGN KEY ( product_id ) REFERENCES products ( id ); 		-- resupplies_details <- products

-- STORED PROCEDURE

	--

-- TRIGGERS

	--

-- DEFAULT DATA

	INSERT INTO user_roles (name) VALUES 
		("Customer"),
		("Admin"),
		("SuperUser");

	INSERT INTO user_states (name) VALUES 
		("Active"),
		("Inactive"),
		("Banned");

	INSERT INTO categories (name) VALUES 
		("Sombras"),
		("Brillos"),
		("Labiales"),
		("Esmaltes");

	INSERT INTO product_states (name) VALUES 
		("Active"),
		("Inactive"),
		("Sold Out");

	INSERT INTO order_states (name) VALUES 
		("Success"),
		("Pending"),
		("Waiting");

-- TESTING DATA

	INSERT INTO users (id, name, email) VALUES
		("ABC1", "USER 1", "user1@gmail.com"),
		("ABC2", "USER 2", "user2@gmail.com"),
		("ABC3", "USER 3", "user3@gmail.com");
	
	INSERT INTO products (name, reference, description, category_id, retail_price, wholesale_price, image) VALUES
		("Paleta Polígono Regular", "9628-002", "Estuche sombra pequeño - cinco tonos pasteles - incluye aplicador doble punta", 1, 4500, 4000, "https://static.wixstatic.com/media/cd4fc5_64cf10cd0fb5401488bbba99bfa94594~mv2.jpg"),
		("Mini Paleta 4 Tonos", "9719-E2", "Estuche de sombra pequeño: 4 tonos satinados y matte - incluye aplicador", 1, 2500, 2000, "https://static.wixstatic.com/media/cd4fc5_64cf10cd0fb5401488bbba99bfa94594~mv2.jpg"),
		("Make p Kit", "BL523", "Kit paleta 48 tonos de sombra entre tonos fuerte y tierra tipo matte y satinados", 1, 30000, 27000, "https://static.wixstatic.com/media/cd4fc5_e24d940ebb314048b81c020dee208f29~mv2.jpg"),
		("PaletaU 12 tonos", "BR315-01", "Paleta de sombras pequeña: 12 tonos neutros satinado y matte - incluye aplicador", 1, 3500, 3000, "https://static.wixstatic.com/media/cd4fc5_7036035afd594dceb6fba9f5447d4ac6~mv2.jpeg"),
		("Lip Balm", "JBLLB0008", "Bálsamo de labios especial para proteger tus labios contra el frío, el viento y el clima seco", 2, 3500, 3000, "https://static.wixstatic.com/media/27b655_d34b95db265c472099826083d9254303~mv2.jpg"),
		("Strawberry Lip Balm", "JBLLB0004", "Bálsamo labial hidrata y suaviza - 2 tonos con aroma y sabor. Forma de fresa", 2, 2500, 2200, "https://static.wixstatic.com/media/cd4fc5_8bdd804e032240108c918f605d8ede5b~mv2.jpg"),
		("Kissing Smell Fruit Lip Gloss", "JBLLG0237", "Lip gloss en rolong de 6 tonos y aromas deliciosos diferentes", 2, 1800, 1500, "https://static.wixstatic.com/media/cd4fc5_ffdec78f7ec04f8eae657be29eb56a50~mv2.jpg"),
		("Lipstick Vitamin-E", "JBLLS0116", "Labial matte animal print surtido con nuestros 8 mejores tonos y con Vitamina E", 3, 1500, 1200, "https://static.wixstatic.com/media/cd4fc5_3a57ecf69caf4fd8bad67cdf814bf0f1~mv2.jpg"),
		("Matte Lip Gloss", "JBLLG0229", "Labial matte de larga duración - 12 tonos diferentes en empaque individual", 3, 1500, 1200, "https://static.wixstatic.com/media/cd4fc5_3085fcd4b096454f81c1be9e4aec83f7~mv2.jpeg"),
		("Fantastick Lipstick No. 29", "JBLLG0230", "Labial matte de larga duración - 12 tonos diferentes en empaque individual", 3, 3200, 2700, "https://static.wixstatic.com/media/cd4fc5_51ff47269053406c881f5b1c9d08bec7~mv2.jpeg"),
		("Charm Your Lips", "GD0067", "Labial mágico de tonos naturales dando un toque de ternura y sensualidad", 3, 2500, 2000, "https://static.wixstatic.com/media/cd4fc5_9e938d953b364d839cb4d93e733ee6b1~mv2.jpeg"),
		("Esmalte Unik-Colours Calcio", "NP167-1", "Esmalte base de calcio", 4, 5000, 4500, "https://static.wixstatic.com/media/27b655_2b69bc86f0de4f838b26645bb2efca7d~mv2.jpg"),
		("Esmalte Unik-Colours Keratina", "NP167-2", "Esmalte base de keratina", 4, 5000, 4500, "https://static.wixstatic.com/media/27b655_382247ef77114dd78686c916fc1a5510~mv2.jpg"),
		("Esmalte Unik-Colours Ajo-Limón", "NP167-3", "Esmalte base de Ajo-Limón", 4, 5000, 4500, "https://static.wixstatic.com/media/27b655_2b13b150ff244e93bbcb8d519f37ff45~mv2.jpg"),
		("Esmalte Unik-Colours Brillo Secante", "NP167-4", "Esmalte de brillo secante que ayuda a endurecer las uñas", 4, 4000, 3500, "https://static.wixstatic.com/media/27b655_160a38d553b94987a6fde81396ee75a9~mv2.jpg");

	INSERT INTO orders (user_id, date, total_price, state_id, wholesale) VALUES
		("ABC1", "2022-06-17 19:57:14", 8500, 1, false),
		("ABC3", "2023-01-12 12:30:00", 11100, 1, true),
		("ABC1", "2023-02-01 11:00:00", 36500, 3, false);

	INSERT INTO order_details (order_id, product_id, unit_price, count) VALUES
		(1, 4, 3500, 1),
		(1, 6, 2500, 1),
		(1, 11, 2500, 1),
		(2, 2, 2000, 2),
		(2, 9, 1200, 2),
		(2, 11, 2000, 1),
		(2, 13, 4500, 1),
		(3, 3, 30000, 1),
		(3, 8, 1500, 1),
		(3, 13, 5000, 2);

	INSERT INTO inventory (product_id, count) VALUES
		(1, 10),
		(2, 10),
		(3, 10),
		(4, 10),
		(5, 10),
		(6, 10),
		(7, 10),
		(8, 10),
		(9, 10),
		(10, 10),
		(11, 10),
		(12, 10),
		(13, 10);  

	INSERT INTO resupplies (reference, date, total_price) VALUES 
		("REF-1", "2022-06-17", 100000);

	INSERT INTO resupplies_details (resupply_id, product_id, unit_price, count) VALUES
		(1, 1, 2856, 10),
		(1, 2, 1666, 10),
		(1, 3, 24990, 10),
		(1, 4, 2856, 10),
		(1, 5, 2975, 10),
		(1, 6, 1904, 10),
		(1, 7, 1190, 10),
		(1, 8, 1190, 10),
		(1, 9, 952, 10),
		(1, 10, 2380, 10),
		(1, 11, 1785, 10),
		(1, 12, 3000, 10),
		(1, 13, 3000, 10),
		(1, 14, 3000, 10),
		(1, 15, 2100, 10);
	
-- JOINS

	SELECT 
		users.id,
		users.name, 
		users.email, 
		user_roles.name AS role,
		user_states.name AS state
	FROM users 
	INNER JOIN user_roles ON users.role_id = user_roles.id 
	INNER JOIN user_states ON users.state_id = user_states.id;

	SELECT 
		products.reference,
		products.name, 
		categories.name AS category, 
		product_states.name AS state 
	FROM products 
	INNER JOIN categories ON products.category_id = categories.id 
	INNER JOIN product_states ON products.state_id = product_states.id;

	SELECT 
		users.name AS customer,
		orders.date,
		orders.total_price,
		order_states.name AS state
	FROM orders
	INNER JOIN users ON orders.user_id = users.id 
	INNER JOIN order_states ON orders.state_id = order_states.id;

	SELECT order
		



