// models/Category.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  parent_category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories', // Self-referencing table
      key: 'category_id',
    },
    onDelete: 'SET NULL', // Set parent_category_id to NULL if parent category is deleted
  },
}, {
  tableName: 'categories',  // Explicitly set the table name to 'categories'
  timestamps: false,        // Disable automatic timestamp fields (createdAt, updatedAt)
});

module.exports = Category;
