const express = require('express');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');

const router = express.Router();

// Create a new product image
router.post('/products/:productId/images', async (req, res) => {
  try {
    const { productId } = req.params;
    const { image_url, alt_text } = req.body;
    const productImage = await ProductImage.create({ product_id: productId, image_url, alt_text });
    res.status(201).json(productImage);
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ error: 'Failed to create product image' });
  }
});

// Get all images for a product
router.get('/products/:productId/images', async (req, res) => {
  try {
    const { productId } = req.params;
    const images = await ProductImage.findAll({ where: { product_id: productId } });
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching product images:', error);
    res.status(500).json({ error: 'Failed to fetch product images' });
  }
});

// Update a product image by ID
router.put('/images/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const { image_url, alt_text } = req.body;
    const productImage = await ProductImage.findByPk(imageId);

    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    productImage.image_url = image_url || productImage.image_url;
    productImage.alt_text = alt_text || productImage.alt_text;

    await productImage.save();
    res.status(200).json(productImage);
  } catch (error) {
    console.error('Error updating product image:', error);
    res.status(500).json({ error: 'Failed to update product image' });
  }
});

// Delete a product image
router.delete('/images/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const productImage = await ProductImage.findByPk(imageId);

    if (!productImage) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    await productImage.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product image:', error);
    res.status(500).json({ error: 'Failed to delete product image' });
  }
});

module.exports = router;
