const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  cart_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carts',
      key: 'cart_id',
    },
    onDelete: 'CASCADE', // Delete cart items if cart is deleted
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'product_id',
    },
    onDelete: 'CASCADE', // Delete cart items if product is deleted
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  tableName: 'cart_items',
  timestamps: false,
});

// Define associations
CartItem.belongsTo(Cart, {
  foreignKey: 'cart_id',
  onDelete: 'CASCADE',
});
CartItem.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

module.exports = CartItem;
