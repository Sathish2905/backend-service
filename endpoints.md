Here is a list of endpoints with explanations for each route. 

### 1. **Users Routes**

- **`GET /api/users`** - Fetches all users in the system.
- **`GET /api/users/:user_id`** - Fetches details of a specific user by their `user_id`.
- **`POST /api/users`** - Creates a new user with the provided details (email, password, etc.).
- **`PUT /api/users/:user_id`** - Updates an existing user’s details.
- **`DELETE /api/users/:user_id`** - Deletes a user by their `user_id`.

### 2. **Roles Routes**

- **`GET /api/roles`** - Fetches all roles.
- **`POST /api/roles`** - Creates a new role (e.g., Admin, Customer).
- **`DELETE /api/roles/:role_id`** - Deletes a role by its `role_id`.

### 3. **Products Routes**

- **`GET /api/products`** - Retrieves all products.
- **`GET /api/products/:product_id`** - Fetches details of a specific product.
- **`POST /api/products`** - Creates a new product.
- **`PUT /api/products/:product_id`** - Updates details of an existing product.
- **`DELETE /api/products/:product_id`** - Deletes a product by its `product_id`.

### 4. **Categories Routes**

- **`GET /api/categories`** - Fetches all categories.
- **`POST /api/categories`** - Creates a new category.
- **`DELETE /api/categories/:category_id`** - Deletes a category by its `category_id`.

### 5. **Product Images Routes**

- **`GET /api/product-images/:product_id`** - Fetches images for a specific product.
- **`POST /api/product-images`** - Adds a new image to a product.
- **`DELETE /api/product-images/:image_id`** - Deletes an image by its `image_id`.

### 6. **Carts Routes**

- **`GET /api/carts/:user_id`** - Fetches the cart for a specific user.
- **`POST /api/carts/:user_id`** - Creates or updates a cart for a user.
- **`DELETE /api/carts/:cart_id`** - Clears a specific cart by its `cart_id`.

### 7. **Cart Items Routes**

- **`POST /api/cart-items/:cart_id`** - Adds a new item to the cart.
- **`PUT /api/cart-items/:cart_item_id`** - Updates quantity for a cart item.
- **`DELETE /api/cart-items/:cart_item_id`** - Removes an item from the cart.

### 8. **Orders Routes**

- **`GET /api/orders/:user_id`** - Fetches all orders for a specific user.
- **`POST /api/orders`** - Creates a new order for a user.
- **`PUT /api/orders/:order_id`** - Updates the status of an existing order.
- **`DELETE /api/orders/:order_id`** - Cancels (or deletes) an order.

### 9. **Payments Routes**

- **`GET /api/payments/:order_id`** - Fetches payment details for a specific order.
- **`POST /api/payments`** - Processes a new payment for an order.

### 10. **Addresses Routes**

- **`GET /api/addresses/:user_id`** - Fetches all addresses for a specific user.
- **`POST /api/addresses`** - Adds a new address for a user.
- **`PUT /api/addresses/:address_id`** - Updates an existing address.
- **`DELETE /api/addresses/:address_id`** - Deletes an address.

### 11. **Shipping Routes**

- **`GET /api/shipping/:order_id`** - Fetches shipping details for a specific order.
- **`POST /api/shipping`** - Adds shipping information for an order.
- **`PUT /api/shipping/:shipping_id`** - Updates shipping status or details for a shipment.

### 12. **Reviews Routes**

- **`GET /api/reviews/:product_id`** - Fetches all reviews for a specific product.
- **`POST /api/reviews`** - Adds a new review for a product.
- **`DELETE /api/reviews/:review_id`** - Deletes a review by its `review_id`.

### 13. **Unit Types Routes**

- **`GET /api/unit-types`** - Fetches all unit types (e.g., weight, volume).
- **`POST /api/unit-types`** - Creates a new unit type.
- **`DELETE /api/unit-types/:unit_type_id`** - Deletes a unit type.

### 14. **Units Routes**

- **`GET /api/units/:unit_type_id`** - Fetches all units under a specific unit type.
- **`POST /api/units`** - Adds a new unit.
- **`DELETE /api/units/:unit_id`** - Deletes a unit.

### 15. **Product Units Routes**

- **`GET /api/product-units/:product_id`** - Fetches units associated with a specific product.
- **`POST /api/product-units`** - Adds a unit for a product.
- **`DELETE /api/product-units/:product_unit_id`** - Removes a unit from a product.

### 16. **Sizes Routes**

- **`GET /api/sizes`** - Fetches all available sizes.
- **`POST /api/sizes`** - Adds a new size.
- **`DELETE /api/sizes/:size_id`** - Deletes a size.

### 17. **Product Variants Routes**

- **`GET /api/product-variants/:product_id`** - Fetches all variants of a specific product.
- **`POST /api/product-variants`** - Adds a variant for a product.
- **`PUT /api/product-variants/:variant_id`** - Updates details for a variant.
- **`DELETE /api/product-variants/:variant_id`** - Deletes a variant.

### 18. **Site Properties Routes**

- **`GET /api/site-properties`** - Fetches all site properties.
- **`GET /api/site-properties/:property_key`** - Fetches a site property by key.
- **`POST /api/site-properties`** - Creates or updates a site property.
- **`DELETE /api/site-properties/:property_key`** - Deletes a site property by key.

### 19. **Audit Log Routes**

- **`GET /api/audit-log`** - Fetches all audit logs.
- **`GET /api/audit-log/property/:property_key`** - Fetches logs by property key.
- **`GET /api/audit-log/changedBy/:changed_by`** - Fetches logs by the user who made the change.
- **`POST /api/audit-log`** - Creates an audit log entry (used internally, generally).

---

Each endpoint has been designed following RESTful conventions and follows HTTP methods for `GET`, `POST`, `PUT`, and `DELETE`.