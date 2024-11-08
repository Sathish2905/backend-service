const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path if necessary
const Order = require('./Order'); // Adjust path if necessary

class Payment extends Model {}

Payment.init({
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM('Credit Card', 'UPI', 'Bank Transfer'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
    defaultValue: 'Pending',
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  timestamps: false,
});

// Set up associations
Payment.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });

module.exports = Payment;
