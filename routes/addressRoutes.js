const express = require('express');
const router = express.Router();
const { Address } = require('../models/address');
const { User } = require('../models/user');

// Get all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get address by ID
router.get('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new address
router.post('/', async (req, res) => {
  try {
    const { user_id, address_type, street, city, state, postal_code, country } = req.body;
    
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const address = await Address.create({
      user_id,
      address_type,
      street,
      city,
      state,
      postal_code,
      country
    });
    
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an address
router.put('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    
    const { address_type, street, city, state, postal_code, country } = req.body;
    await address.update({ address_type, street, city, state, postal_code, country });
    
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an address
router.delete('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    
    await address.destroy();
    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
