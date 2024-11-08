const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Size = require('./size');

class ProductVariant extends Model {}

ProductVariant.init({
    variant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        },
        onDelete: 'CASCADE',
    },
    size_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Size,
            key: 'size_id',
        },
        onDelete: 'SET NULL',
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
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
    sequelize,
    modelName: 'ProductVariant',
    tableName: 'product_variants',
    timestamps: false,
});

ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });
ProductVariant.belongsTo(Size, { foreignKey: 'size_id' });

module.exports = ProductVariant;
