// routes/orderRoutes.js

const express = require('express');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

const router = express.Router();

// Create a new order for a user
router.post('/users/:userId/orders', async (req, res) => {
  try {
    const { userId } = req.params;
    const { total, items } = req.body;

    // Create the order
    const order = await Order.create({ user_id: userId, total });

    // Add items to the order
    const orderItems = items.map(item => ({
      order_id: order.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders for a user
router.get('/users/:userId/orders', async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: {
        model: OrderItem,
        include: [Product],
      },
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get details of a specific order
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId, {
      include: {
        model: OrderItem,
        include: [Product],
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update the status of an order
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
