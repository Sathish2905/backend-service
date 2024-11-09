const express = require('express');
const router = express.Router();
const { ProductVariant } = require('../models/productVariant');

// Get all product variants
router.get('/productVariant', async (req, res) => {
    try {
        const productVariants = await ProductVariant.findAll();
        res.json(productVariants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific product variant by ID
router.get('/productVariant/:id', async (req, res) => {
    try {
        const productVariant = await ProductVariant.findByPk(req.params.id);
        if (productVariant) {
            res.json(productVariant);
        } else {
            res.status(404).json({ error: 'Product variant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new product variant
router.post('/productVariant', async (req, res) => {
    try {
        const newProductVariant = await ProductVariant.create(req.body);
        res.status(201).json(newProductVariant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an existing product variant
router.put('/productVariant/:id', async (req, res) => {
    try {
        const productVariant = await ProductVariant.findByPk(req.params.id);
        if (productVariant) {
            await productVariant.update(req.body);
            res.json(productVariant);
        } else {
            res.status(404).json({ error: 'Product variant not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a product variant
router.delete('/productVariant/:id', async (req, res) => {
    try {
        const rowsDeleted = await ProductVariant.destroy({ where: { variant_id: req.params.id } });
        if (rowsDeleted) {
            res.json({ message: 'Product variant deleted' });
        } else {
            res.status(404).json({ error: 'Product variant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
