// models/UserRole.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const UserRole = sequelize.define('UserRole', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users', // Table name being referenced
      key: 'user_id',
    },
    onDelete: 'CASCADE', // Set ON DELETE CASCADE for user_id
  },
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'roles', // Table name being referenced
      key: 'role_id',
    },
    onDelete: 'CASCADE', // Set ON DELETE CASCADE for role_id
  },
}, {
  tableName: 'user_roles',  // Explicitly set the table name to 'user_roles'
  timestamps: false,       // Disable automatic timestamp fields (createdAt, updatedAt)
  freezeTableName: true,   // Prevent Sequelize from pluralizing the table name
});

module.exports = UserRole;
