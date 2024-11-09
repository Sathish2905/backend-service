const express = require('express');
const router = express.Router();
const SiteProperty = require('../models/siteProperty');

// Get all site properties
router.get('/siteProperty', async (req, res) => {
    try {
        const properties = await SiteProperty.findAll();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch site properties.' });
    }
});

// Create or update a site property
router.post('/siteProperty', async (req, res) => {
    const { property_key, property_value, description } = req.body;
    try {
        let property = await SiteProperty.findOne({ where: { property_key } });
        if (property) {
            // Log the update in audit_log
            await AuditLog.create({
                property_key: property.property_key,
                old_value: property.property_value,
                new_value: property_value,
                changed_by: req.user.user_id,  
            });
            property.property_value = property_value;
            property.description = description;
            await property.save();
        } else {
            property = await SiteProperty.create({ property_key, property_value, description });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create or update site property.' });
    }
});

module.exports = router;
