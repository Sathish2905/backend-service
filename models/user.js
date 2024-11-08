const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
        onUpdate: sequelize.NOW,
    },
}, {
    tableName: 'users', // Optional if you want to define the table name explicitly
    timestamps: false,  // Disables Sequelize's automatic timestamp handling    
});

module.exports = User;
