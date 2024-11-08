// routes.js

const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');

const router = express.Router();

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const { category_id, name, description, price, sku, stock } = req.body;
    const product = await Product.create({ category_id, name, description, price, sku, stock });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const { category_id, name, description, price, sku, stock } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.category_id = category_id;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.sku = sku || product.sku;
    product.stock = stock !== undefined ? stock : product.stock;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
