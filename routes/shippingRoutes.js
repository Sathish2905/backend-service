const express = require('express');
const router = express.Router();
const { Shipping } = require('../models/Shipping');
const { Order } = require('../models/Order');  

// Get all shipping records
router.get('/shippings', async (req, res) => {
  try {
    const shippings = await Shipping.findAll();
    res.json(shippings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get shipping record by ID
router.get('/shippings/:id', async (req, res) => {
  try {
    const shipping = await Shipping.findByPk(req.params.id);
    if (!shipping) return res.status(404).json({ message: 'Shipping record not found' });
    res.json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new shipping record
router.post('/shippings', async (req, res) => {
  try {
    const { order_id, carrier, tracking_number, status, shipped_date, estimated_delivery_date } = req.body;
    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const shipping = await Shipping.create({
      order_id,
      carrier,
      tracking_number,
      status,
      shipped_date,
      estimated_delivery_date
    });
    res.status(201).json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update shipping record
router.put('/shippings/:id', async (req, res) => {
  try {
    const shipping = await Shipping.findByPk(req.params.id);
    if (!shipping) return res.status(404).json({ message: 'Shipping record not found' });

    const { carrier, tracking_number, status, shipped_date, estimated_delivery_date } = req.body;
    await shipping.update({ carrier, tracking_number, status, shipped_date, estimated_delivery_date });
    
    res.json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete shipping record
router.delete('/shippings/:id', async (req, res) => {
  try {
    const shipping = await Shipping.findByPk(req.params.id);
    if (!shipping) return res.status(404).json({ message: 'Shipping record not found' });
    
    await shipping.destroy();
    res.json({ message: 'Shipping record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
