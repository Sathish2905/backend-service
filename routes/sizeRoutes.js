const express = require('express');
const router = express.Router();
const { Size } = require('../models/size');

// Get all sizes
router.get('/size', async (req, res) => {
    try {
        const sizes = await Size.findAll();
        res.json(sizes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific size by ID
router.get('/size/:id', async (req, res) => {
    try {
        const size = await Size.findByPk(req.params.id);
        if (size) {
            res.json(size);
        } else {
            res.status(404).json({ error: 'Size not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new size
router.post('/size', async (req, res) => {
    try {
        const newSize = await Size.create(req.body);
        res.status(201).json(newSize);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an existing size
router.put('/size/:id', async (req, res) => {
    try {
        const size = await Size.findByPk(req.params.id);
        if (size) {
            await size.update(req.body);
            res.json(size);
        } else {
            res.status(404).json({ error: 'Size not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a size
router.delete('/size/:id', async (req, res) => {
    try {
        const rowsDeleted = await Size.destroy({ where: { size_id: req.params.id } });
        if (rowsDeleted) {
            res.json({ message: 'Size deleted' });
        } else {
            res.status(404).json({ error: 'Size not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
