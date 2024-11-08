
   CREATE TABLE users (
       user_id INT AUTO_INCREMENT PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       first_name VARCHAR(100),
       last_name VARCHAR(100),
       phone VARCHAR(15),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   
   CREATE TABLE roles (
       role_id INT AUTO_INCREMENT PRIMARY KEY,
       role_name VARCHAR(50) UNIQUE NOT NULL
   );
   
   CREATE TABLE user_roles (
       user_id INT,
       role_id INT,
       PRIMARY KEY (user_id, role_id),
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
       FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
   );
   
   CREATE TABLE categories (
       category_id INT AUTO_INCREMENT PRIMARY KEY,
       category_name VARCHAR(100) NOT NULL,
       parent_category_id INT,
       FOREIGN KEY (parent_category_id) REFERENCES categories(category_id) ON DELETE SET NULL
   );
   
   CREATE TABLE products (
       product_id INT AUTO_INCREMENT PRIMARY KEY,
       category_id INT,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL,
       sku VARCHAR(50) UNIQUE NOT NULL,
       stock INT DEFAULT 0,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
   );
   
   CREATE TABLE product_images (
       image_id INT AUTO_INCREMENT PRIMARY KEY,
       product_id INT,
       image_url VARCHAR(255) NOT NULL,
       alt_text VARCHAR(255),
       FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
   );
   
   CREATE TABLE inventory (
       inventory_id INT AUTO_INCREMENT PRIMARY KEY,
       product_id INT,
       quantity INT NOT NULL,
       location VARCHAR(100),
       last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
   );
   
   CREATE TABLE carts (
       cart_id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
   );
   
   CREATE TABLE cart_items (
       cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
       cart_id INT,
       product_id INT,
       quantity INT DEFAULT 1,
       FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
       FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
   );

   CREATE TABLE orders (
       order_id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       total DECIMAL(10, 2) NOT NULL,
       status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
   );

   CREATE TABLE order_items (
       order_item_id INT AUTO_INCREMENT PRIMARY KEY,
       order_id INT,
       product_id INT,
       quantity INT NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
       FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE SET NULL
   );
   
   CREATE TABLE payments (
       payment_id INT AUTO_INCREMENT PRIMARY KEY,
       order_id INT,
       payment_method ENUM('Credit Card', 'UPI', 'Bank Transfer') NOT NULL,
       amount DECIMAL(10, 2) NOT NULL,
       status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
       payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
   );
   
   CREATE TABLE addresses (
       address_id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       address_type ENUM('Billing', 'Shipping') NOT NULL,
       street VARCHAR(255) NOT NULL,
       city VARCHAR(100) NOT NULL,
       state VARCHAR(100),
       postal_code VARCHAR(20),
       country VARCHAR(100) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
   );
   
   CREATE TABLE shipping (
       shipping_id INT AUTO_INCREMENT PRIMARY KEY,
       order_id INT,
       carrier VARCHAR(100) NOT NULL,
       tracking_number VARCHAR(100),
       status ENUM('Preparing', 'Shipped', 'In Transit', 'Delivered') DEFAULT 'Preparing',
       shipped_date TIMESTAMP,
       estimated_delivery_date TIMESTAMP,
       FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
   );

   CREATE TABLE reviews (
       review_id INT AUTO_INCREMENT PRIMARY KEY,
       product_id INT,
       user_id INT,
       rating INT CHECK (rating >= 1 AND rating <= 5),
       review_text TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
   );

   CREATE TABLE unit_types (
       unit_type_id INT AUTO_INCREMENT PRIMARY KEY,
       type_name VARCHAR(50) NOT NULL UNIQUE
   );
   
   CREATE TABLE units (
       unit_id INT AUTO_INCREMENT PRIMARY KEY,
       unit_type_id INT,
       unit_name VARCHAR(50) NOT NULL,
       abbreviation VARCHAR(10) NOT NULL,
       conversion_to_base DECIMAL(10, 4) NOT NULL, -- Conversion factor to a base unit within the type
       FOREIGN KEY (unit_type_id) REFERENCES unit_types(unit_type_id) ON DELETE CASCADE
   );
   
   CREATE TABLE product_units (
       product_unit_id INT AUTO_INCREMENT PRIMARY KEY,
       product_id INT,
       unit_id INT,
       quantity DECIMAL(10, 2) NOT NULL, -- e.g., 500 for 500 grams
       FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
       FOREIGN KEY (unit_id) REFERENCES units(unit_id) ON DELETE SET NULL
   );
   
   CREATE TABLE sizes (
       size_id INT AUTO_INCREMENT PRIMARY KEY,
       size_name VARCHAR(10) NOT NULL UNIQUE
   );
   
   CREATE TABLE product_variants (
       variant_id INT AUTO_INCREMENT PRIMARY KEY,
       product_id INT,
       size_id INT,
       color VARCHAR(50),  -- Optional: useful if product comes in different colors
       sku VARCHAR(50) UNIQUE,  -- Stock Keeping Unit, unique for each variant
       price DECIMAL(10, 2) NOT NULL,
       stock INT DEFAULT 0,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
       FOREIGN KEY (size_id) REFERENCES sizes(size_id) ON DELETE SET NULL
   );
   
   
CREATE TABLE site_properties (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    property_key VARCHAR(50) UNIQUE NOT NULL,
    property_value TEXT,
    description VARCHAR(255),  -- Optional: for describing the property’s purpose
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    property_key VARCHAR(50),
    old_value TEXT,
    new_value TEXT,
    changed_by VARCHAR(50),  -- Can be the username or ID of the admin
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
