const express = require('express');
const router = express.Router();
const { Payment } = require('../models/payment');
const { Order } = require('../models/Order'); 

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new payment
router.post('/', async (req, res) => {
  try {
    const { order_id, payment_method, amount, status } = req.body;
    
    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    const payment = await Payment.create({
      order_id,
      payment_method,
      amount,
      status
    });
    
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a payment
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    
    const { payment_method, amount, status } = req.body;
    await payment.update({ payment_method, amount, status });
    
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    
    await payment.destroy();
    res.json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
