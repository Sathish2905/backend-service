const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import Sequelize instance
const Product = require('./Product');            // Import Product model

const Inventory = sequelize.define('Inventory', {
  inventory_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',   // Reference to Product model
      key: 'product_id',
    },
    onDelete: 'CASCADE',   // Delete inventory items if associated product is deleted
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  last_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'inventory',  // Explicitly set table name
  timestamps: false,       // Disable automatic timestamps
});

// Define the association with Product
Inventory.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

module.exports = Inventory;
