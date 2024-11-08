const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust path if needed


class Size extends Model {}

Size.init(
    {
        size_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        size_name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'Size',
        tableName: 'sizes',
        timestamps: false,
    }
);

module.exports = Size;
