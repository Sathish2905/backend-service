const express = require('express');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const User = require('../models/user');

const router = express.Router();

// Create a cart for a user
router.post('/users/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user already has a cart
    let cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await Cart.create({ user_id: userId });
    }

    res.status(201).json(cart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Failed to create cart' });
  }
});

// Get cart details for a user
router.get('/users/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: [
        {
          model: CartItem,
          include: [Product],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add a product to the cart
router.post('/carts/:cartId/items', async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product_id, quantity } = req.body;

    // Check if the product is already in the cart
    let cartItem = await CartItem.findOne({
      where: { cart_id: cartId, product_id },
    });

    if (cartItem) {
      // If it exists, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Otherwise, create a new cart item
      cartItem = await CartItem.create({
        cart_id: cartId,
        product_id,
        quantity,
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update quantity of a product in the cart
router.put('/carts/:cartId/items/:itemId', async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({
      where: { cart_item_id: itemId, cart_id: cartId },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Remove a product from the cart
router.delete('/carts/:cartId/items/:itemId', async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    const cartItem = await CartItem.findOne({
      where: { cart_item_id: itemId, cart_id: cartId },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

module.exports = router;
