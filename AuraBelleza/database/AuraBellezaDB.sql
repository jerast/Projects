DROP DATABASE IF EXISTS AuraBellezaDB;

CREATE DATABASE IF NOT EXISTS AuraBellezaDB;

USE AuraBellezaDB;

-- USERS tables

	CREATE TABLE users (
		id VARCHAR(50) NOT NULL,
		name VARCHAR(45) NOT NULL,
		email VARCHAR(50) NOT NULL,
		phone BIGINT(10),
		role_id INT(1) DEFAULT 1,
		state_id INT(1) DEFAULT 1,
		UNIQUE ( phone ),
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
		description TEXT DEFAULT NULL,
		category_id INT(4) NOT NULL,
		retail_prize INT(11) NOT NULL DEFAULT 0,
		wholesale_prize INT(11) NOT NULL DEFAULT 0,
		state_id INT(1) DEFAULT 1,
		image TEXT DEFAULT NULL,
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
		description TEXT DEFAULT NULL,
		PRIMARY KEY ( id )
	);

-- ORDERS tables

	CREATE TABLE orders ( -- PT
		id INT(11) NOT NULL AUTO_INCREMENT,
		user_id VARCHAR(50) NOT NULL,
		date DATETIME NOT NULL,
		total_prize INT(11) NOT NULL,
		state_id INT(1) NOT NULL,
		wholesale BOOLEAN NOT NULL,
		PRIMARY KEY ( id )
	);

	CREATE TABLE order_details (
		id INT(11) NOT NULL AUTO_INCREMENT,
		order_id INT(11) NOT NULL,
		product_id INT(11) NOT NULL,
		unit_prize INT(11) NOT NULL,
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
		stock INT(11) NOT NULL
	);

	CREATE TABLE resupplies ( -- PT
		id INT(11) NOT NULL AUTO_INCREMENT,
		reference VARCHAR(50) NOT NULL,
		date DATE NOT NULL,
		total_prize INT(11) NOT NULL,
		UNIQUE ( reference ),
		PRIMARY KEY ( id )
	);

	CREATE TABLE resupply_details (
		id INT(11) NOT NULL AUTO_INCREMENT,
		resupply_id INT(11) NOT NULL,
		product_id INT(11) NOT NULL,
		unit_prize INT(11) NOT NULL,
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
	ALTER TABLE resupply_details ADD FOREIGN KEY ( resupply_id ) REFERENCES resupplies ( id ); 	-- resupply_details <- resupplies
	ALTER TABLE resupply_details ADD FOREIGN KEY ( product_id ) REFERENCES products ( id ); 		-- resupply_details <- products

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

	INSERT INTO users (id, name, email, phone) VALUES
		("ABC1", "USER 1", "user1@gmail.com", 3108145791),
		("ABC2", "USER 2", "user2@gmail.com", 3225786478),
		("ABC3", "USER 3", "user3@gmail.com", 3156779809);
	
	INSERT INTO products (name, reference, description, category_id, retail_prize, wholesale_prize, image) VALUES
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

	INSERT INTO orders (user_id, date, total_prize, state_id, wholesale) VALUES
		("ABC1", "2022-06-17 19:57:14", 8500, 1, false),
		("ABC3", "2023-01-12 12:30:00", 11100, 1, true),
		("ABC1", "2023-02-01 11:00:00", 36500, 3, false);

	INSERT INTO order_details (order_id, product_id, unit_prize, count) VALUES
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

	INSERT INTO inventory (product_id, stock) VALUES
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
		(13, 10), 
		(14, 10),
		(15, 10);  

	INSERT INTO resupplies (reference, date, total_prize) VALUES 
		("REF-1", "2022-06-17", 542375);

	INSERT INTO resupply_details (resupply_id, product_id, unit_prize, count) VALUES
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
		(1, 15, 2100, 2);
	
-- JOINS

	/* SELECT 
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
		products.name AS product, 
		categories.name AS category,
		products.retail_prize,
		products.wholesale_prize,
		product_states.name AS state 
	FROM products 
	INNER JOIN categories ON products.category_id = categories.id 
	INNER JOIN product_states ON products.state_id = product_states.id;

	SELECT 
		users.name AS customer,
		orders.date,
		orders.total_prize AS total_prize,
		orders.wholesale,
		order_states.name AS state
	FROM orders
	INNER JOIN users ON orders.user_id = users.id 
	INNER JOIN order_states ON orders.state_id = order_states.id;

	SELECT 
		order_details.order_id, 
		products.name AS product, 
		order_details.unit_prize, 
		order_details.count, 
		order_details.unit_prize * order_details.count AS total_prize
	FROM order_details 
	INNER JOIN products ON order_details.product_id = products.id
	WHERE order_details.order_id = 2;

	SELECT 
		products.reference,
		products.name AS product,
		inventory.stock
	FROM inventory
	INNER JOIN products ON inventory.product_id = products.id;

	SELECT 
		resupplies.reference AS resupply_ref,
		products.reference AS product_ref,
		products.name AS product_name,
		resupply_details.unit_prize, 
		resupply_details.count, 
		resupply_details.unit_prize * resupply_details.count AS total_prize
	FROM resupply_details 
	INNER JOIN resupplies ON resupply_details.resupply_id = resupplies.id
	INNER JOIN products ON resupply_details.product_id = products.id
	WHERE resupply_details.resupply_id = 1; */

-- STORED PROCEDURE

	DELIMITER $$
	CREATE PROCEDURE get_users ()
		BEGIN
			SELECT 
				users.id,
				users.name, 
				users.email, 
				user_roles.name AS role,
				user_states.name AS state
			FROM users 
			INNER JOIN user_roles ON users.role_id = user_roles.id 
			INNER JOIN user_states ON users.state_id = user_states.id;
		END $$

	CREATE PROCEDURE get_products ( IN id_product INT(11) )
		BEGIN
			IF id_product IS NULL THEN 
				SELECT 
					products.reference,
					products.name AS product, 
					categories.name AS category,
					products.retail_prize,
					products.wholesale_prize,
					product_states.name AS state 
				FROM products 
				INNER JOIN categories ON products.category_id = categories.id 
				INNER JOIN product_states ON products.state_id = product_states.id
				ORDER BY products.id;
			ELSE
				SELECT 
					products.reference,
					products.name AS product, 
					categories.name AS category,
					products.retail_prize,
					products.wholesale_prize,
					product_states.name AS state 
				FROM products 
				INNER JOIN categories ON products.category_id = categories.id 
				INNER JOIN product_states ON products.state_id = product_states.id
				WHERE products.id = id_product
				ORDER BY products.id;
			END IF;
		END $$ 

	CREATE PROCEDURE get_category_products ( IN id_category INT(4) )
		BEGIN
			SELECT 
				products.reference,
				products.name AS product, 
				categories.name AS category,
				products.retail_prize,
				products.wholesale_prize,
				product_states.name AS state 
			FROM products 
			INNER JOIN categories ON products.category_id = categories.id 
			INNER JOIN product_states ON products.state_id = product_states.id
			WHERE products.category_id = id_category;
		END $$ 

	CREATE PROCEDURE get_user_orders ( IN id_user VARCHAR(50) )
		BEGIN
			SELECT 
				orders.id AS order_id,
				users.name AS customer,
				orders.date,
				orders.total_prize AS total_prize,
				orders.wholesale,
				order_states.name AS state
			FROM orders
			INNER JOIN users ON orders.user_id = users.id 
			INNER JOIN order_states ON orders.state_id = order_states.id
			WHERE orders.user_id = id_user;
		END $$ 

	CREATE PROCEDURE get_order_details ( IN id_order INT(11) )
		BEGIN
			SELECT 
				products.reference AS reference,
				products.name AS product, 
				order_details.unit_prize, 
				order_details.count, 
				order_details.unit_prize * order_details.count AS total_prize
			FROM order_details 
			INNER JOIN products ON order_details.product_id = products.id
			WHERE order_details.order_id = id_order;
		END $$ 

	CREATE PROCEDURE get_resupply_details ( IN id_resupply INT(11) )
		BEGIN
			SELECT 
				resupplies.reference AS resupply_ref,
				products.reference AS product_ref,
				products.name AS product_name,
				resupply_details.unit_prize, 
				resupply_details.count, 
				resupply_details.unit_prize * resupply_details.count AS total_prize
			FROM resupply_details 
			INNER JOIN resupplies ON resupply_details.resupply_id = resupplies.id
			INNER JOIN products ON resupply_details.product_id = products.id
			WHERE resupply_details.resupply_id = id_resupply;
		END $$ 

	CREATE PROCEDURE get_inventory_stock ()
		BEGIN
			SELECT 
				products.reference,
				products.name AS product,
				inventory.stock
			FROM inventory
			INNER JOIN products ON inventory.product_id = products.id;
		END $$ 

	CREATE PROCEDURE sell_products ( 
			IN id_order VARCHAR(50),
			IN id_product INT(11),
			IN product_prize INT(11),
			IN product_count INT(11)
		)
		BEGIN
			INSERT INTO order_details (order_id, product_id, unit_prize, count) 
			VALUES ( id_order, id_product, product_prize, product_count );

			UPDATE inventory 
			SET stock = stock - product_count
			WHERE product_id = id_product;
		END $$

	CREATE PROCEDURE buy_products ( 
			IN id_resupply INT(11),
			IN id_product INT(11),
			IN product_prize INT(11),
			IN product_count INT(11)
		)
		BEGIN
			INSERT INTO resupply_details (resupply_id, product_id, unit_prize, count) 
			VALUES ( id_resupply, id_product, product_prize, product_count );

			UPDATE inventory 
			SET stock = stock + product_count
			WHERE product_id = id_product;
		END $$

	CREATE PROCEDURE create_product (
			IN product_name VARCHAR(50),
			IN product_reference VARCHAR(50),
			IN product_description VARCHAR(150),
			IN product_category_id INT(4),
			IN product_retail_prize INT(11),
			IN product_wholesale_prize INT(11),
			IN product_image TEXT,
		)
		BEGIN
			INSERT INTO products (name, reference, description, category_id, retail_prize, wholesale_prize, image)
			VALUES (product_name, product_reference, product_description, product_category_id, product_retail_prize, product_wholesale_prize, product_image)
		END $$

	DELIMITER ;

-- TRIGGERS

	--
