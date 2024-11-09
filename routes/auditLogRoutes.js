const express = require('express');
const router = express.Router();
const AuditLog = require('../models/auditLog');

// Get all audit logs
router.get('/auditLog', async (req, res) => {
    try {
        const logs = await AuditLog.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch audit logs.' });
    }
});

// Get audit logs by property key
router.get('/auditLog/property/:property_key', async (req, res) => {
    const { property_key } = req.params;
    try {
        const logs = await AuditLog.findAll({ where: { property_key } });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch audit logs for property key: ${property_key}` });
    }
});

// Get audit logs by user who made the change
router.get('/auditLog/changedBy/:changed_by', async (req, res) => {
    const { changed_by } = req.params;
    try {
        const logs = await AuditLog.findAll({ where: { changed_by } });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch audit logs changed by: ${changed_by}` });
    }
});

// Create an audit log entry (this would generally be called internally, not exposed via API)
router.post('/auditLog', async (req, res) => {
    const { property_key, old_value, new_value, changed_by } = req.body;
    try {
        const log = await AuditLog.create({
            property_key,
            old_value,
            new_value,
            changed_by,
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create audit log entry.' });
    }
});

module.exports = router;
