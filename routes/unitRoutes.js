const express = require('express');
const router = express.Router();
const { Unit } = require('../models/unit');

router.get('/', async (req, res) => {
    try {
        const units = await Unit.findAll();
        res.json(units);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const unit = await Unit.findByPk(req.params.id);
        if (unit) {
            res.json(unit);
        } else {
            res.status(404).json({ error: 'Unit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUnit = await Unit.create(req.body);
        res.status(201).json(newUnit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const unit = await Unit.findByPk(req.params.id);
        if (unit) {
            await unit.update(req.body);
            res.json(unit);
        } else {
            res.status(404).json({ error: 'Unit not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const rowsDeleted = await Unit.destroy({ where: { unit_id: req.params.id } });
        if (rowsDeleted) {
            res.json({ message: 'Unit deleted' });
        } else {
            res.status(404).json({ error: 'Unit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
