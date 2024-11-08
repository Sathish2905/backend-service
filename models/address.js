const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path if necessary
const User = require('./user'); // Adjust path if necessary

class Address extends Model {}

Address.init({
  address_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address_type: {
    type: DataTypes.ENUM('Billing', 'Shipping'),
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
  },
  postal_code: {
    type: DataTypes.STRING(20),
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Address',
  tableName: 'addresses',
  timestamps: false,
});

// Set up associations
Address.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Address;
