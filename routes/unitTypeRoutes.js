const express = require('express');
const router = express.Router();
const { UnitType } = require('../models/unitType');

// Get all unit types
router.get('/unitType/', async (req, res) => {
    try {
        const unitTypes = await UnitType.findAll();
        res.json(unitTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific unit type by ID
router.get('/unitType/:id', async (req, res) => {
    try {
        const unitType = await UnitType.findByPk(req.params.id);
        if (unitType) {
            res.json(unitType);
        } else {
            res.status(404).json({ error: 'Unit type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new unit type
router.post('/unitType', async (req, res) => {
    try {
        const newUnitType = await UnitType.create(req.body);
        res.status(201).json(newUnitType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an existing unit type
router.put('/unitType/:id', async (req, res) => {
    try {
        const unitType = await UnitType.findByPk(req.params.id);
        if (unitType) {
            await unitType.update(req.body);
            res.json(unitType);
        } else {
            res.status(404).json({ error: 'Unit type not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a unit type
router.delete('/unitType/:id', async (req, res) => {
    try {
        const rowsDeleted = await UnitType.destroy({ where: { unit_type_id: req.params.id } });
        if (rowsDeleted) {
            res.json({ message: 'Unit type deleted' });
        } else {
            res.status(404).json({ error: 'Unit type not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
