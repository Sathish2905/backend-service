const express = require('express');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

const router = express.Router();

// Create or update inventory for a product
router.post('/products/:productId/inventory', async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity, location } = req.body;

    const [inventory, created] = await Inventory.upsert({
      product_id: productId,
      quantity,
      location,
    }, { returning: true });

    res.status(created ? 201 : 200).json(inventory);
  } catch (error) {
    console.error('Error managing inventory:', error);
    res.status(500).json({ error: 'Failed to manage inventory' });
  }
});

// Get inventory for a product
router.get('/products/:productId/inventory', async (req, res) => {
  try {
    const { productId } = req.params;
    const inventory = await Inventory.findOne({ where: { product_id: productId } });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Update inventory quantity
router.put('/inventory/:inventoryId', async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const { quantity, location } = req.body;

    const inventory = await Inventory.findByPk(inventoryId);
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });

    inventory.quantity = quantity || inventory.quantity;
    inventory.location = location || inventory.location;
    inventory.last_updated = new Date();

    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

// Delete inventory
router.delete('/inventory/:inventoryId', async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const inventory = await Inventory.findByPk(inventoryId);

    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });

    await inventory.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting inventory:', error);
    res.status(500).json({ error: 'Failed to delete inventory' });
  }
});

module.exports = router;
