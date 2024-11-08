const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust path if needed


class ProductUnit extends Model {}

ProductUnit.init(
    {
        product_unit_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'product_id',
            },
            onDelete: 'CASCADE',
        },
        unit_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'units',
                key: 'unit_id',
            },
            onDelete: 'SET NULL',
        },
        quantity: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ProductUnit',
        tableName: 'product_units',
        timestamps: false,
    }
);

module.exports = ProductUnit;
