const express = require('express');
const router = express.Router();
const { ProductUnit } = require('../models/productUnit');

// Get all product units
router.get('/productUnit', async (req, res) => {
    try {
        const productUnits = await ProductUnit.findAll();
        res.json(productUnits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific product unit by ID
router.get('/productUnit/:id', async (req, res) => {
    try {
        const productUnit = await ProductUnit.findByPk(req.params.id);
        if (productUnit) {
            res.json(productUnit);
        } else {
            res.status(404).json({ error: 'Product unit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new product unit
router.post('/productUnit', async (req, res) => {
    try {
        const newProductUnit = await ProductUnit.create(req.body);
        res.status(201).json(newProductUnit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an existing product unit
router.put('/productUnit/:id', async (req, res) => {
    try {
        const productUnit = await ProductUnit.findByPk(req.params.id);
        if (productUnit) {
            await productUnit.update(req.body);
            res.json(productUnit);
        } else {
            res.status(404).json({ error: 'Product unit not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a product unit
router.delete('/productUnit/:id', async (req, res) => {
    try {
        const rowsDeleted = await ProductUnit.destroy({ where: { product_unit_id: req.params.id } });
        if (rowsDeleted) {
            res.json({ message: 'Product unit deleted' });
        } else {
            res.status(404).json({ error: 'Product unit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
