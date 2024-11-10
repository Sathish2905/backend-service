const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./user');
const Role = require('./role');
const UserRole = require('./UserRole');
const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const Inventory = require('./Inventory');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./payment');
const Address = require('./address');
const Shipping = require('./Shipping');
const Review = require('./Review');
const UnitType = require('./unitType');
const Unit = require('./unit');
const ProductUnit = require('./productUnit');
const Size = require('./size');
const ProductVariant = require('./productVariant');
const SiteProperty = require('./siteProperty');
const AuditLog = require('./auditLog');

// Initialize models with sequelize
User.init(sequelize, DataTypes);
Role.init(sequelize, DataTypes);
UserRole.init(sequelize, DataTypes);
Category.init(sequelize, DataTypes);
Product.init(sequelize, DataTypes);
ProductImage.init(sequelize, DataTypes);
Inventory.init(sequelize, DataTypes);
Cart.init(sequelize, DataTypes);
CartItem.init(sequelize, DataTypes);
Order.init(sequelize, DataTypes);
OrderItem.init(sequelize, DataTypes);
Payment.init(sequelize, DataTypes);
Address.init(sequelize, DataTypes);
Shipping.init(sequelize, DataTypes);
Review.init(sequelize, DataTypes);
UnitType.init(sequelize, DataTypes);
Unit.init(sequelize, DataTypes);
ProductUnit.init(sequelize, DataTypes);
Size.init(sequelize, DataTypes);
ProductVariant.init(sequelize, DataTypes);
SiteProperty.init(sequelize, DataTypes);
AuditLog.init(sequelize, DataTypes);

// Set up associations
User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'user_id' });
Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'role_id' });

User.hasMany(Address, { foreignKey: 'user_id' });
Address.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

Product.belongsToMany(Size, { through: ProductVariant, foreignKey: 'product_id' });
Size.belongsToMany(Product, { through: ProductVariant, foreignKey: 'size_id' });

Product.hasMany(ProductVariant, { foreignKey: 'product_id' });
ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });

UnitType.hasMany(Unit, { foreignKey: 'unit_type_id' });
Unit.belongsTo(UnitType, { foreignKey: 'unit_type_id' });

Product.belongsToMany(Unit, { through: ProductUnit, foreignKey: 'product_id' });
Unit.belongsToMany(Product, { through: ProductUnit, foreignKey: 'unit_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Order.hasOne(Payment, { foreignKey: 'order_id' });
Payment.belongsTo(Order, { foreignKey: 'order_id' });

Order.hasOne(Shipping, { foreignKey: 'order_id' });
Shipping.belongsTo(Order, { foreignKey: 'order_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Cart.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Cart, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// Export initialized models and Sequelize instance
module.exports = {
    sequelize,
    User,
    Role,
    UserRole,
    Category,
    Product,
    ProductImage,
    Inventory,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Payment,
    Address,
    Shipping,
    Review,
    UnitType,
    Unit,
    ProductUnit,
    Size,
    ProductVariant
};
