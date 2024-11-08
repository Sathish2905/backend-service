const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const Product = require('./Product');           // Import Product model

const ProductImage = sequelize.define('ProductImage', {
  image_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // Foreign key to Product model
      key: 'product_id',
    },
    onDelete: 'CASCADE', // Cascade delete if the product is deleted
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  alt_text: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'product_images', // Explicitly set table name
  timestamps: false,           // Disable automatic timestamps
});

// Define the association with Product
ProductImage.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

module.exports = ProductImage;
