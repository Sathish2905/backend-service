// models/Product.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const Category = require('./Category');          // Import Category model

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories', // Foreign key to Category model
      key: 'category_id',
    },
    onDelete: 'SET NULL', // Set category_id to NULL if category is deleted
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'products', // Explicitly set table name
  timestamps: false,     // Disable automatic timestamps
});

// Define the association with Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
});

module.exports = Product;
