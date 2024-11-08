const express = require('express');
const router = express.Router();
const { Review } = require('../models/Review');
const { Product } = require('../models/Product');
const { User } = require('../models/user');

// Get all reviews
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get review by ID
router.get('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new review
router.post('/reviews', async (req, res) => {
    try {
        const { product_id, user_id, rating, review_text } = req.body;

        const product = await Product.findByPk(product_id);
        const user = await User.findByPk(user_id);

        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const review = await Review.create({
            product_id,
            user_id,
            rating,
            review_text
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a review
router.put('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        const { rating, review_text } = req.body;
        await review.update({ rating, review_text });

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        await review.destroy();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
