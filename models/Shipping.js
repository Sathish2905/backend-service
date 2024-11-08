const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust path if needed
const Order = require('./Order');  // Import Order model for association

class Shipping extends Model {}

Shipping.init({
  shipping_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'order_id'
    },
    onDelete: 'CASCADE'
  },
  carrier: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tracking_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Preparing', 'Shipped', 'In Transit', 'Delivered'),
    defaultValue: 'Preparing'
  },
  shipped_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  estimated_delivery_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, { sequelize, modelName: 'Shipping' });

module.exports = Shipping;
