// routes.js

const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Create a new category
router.post('/categories', async (req, res) => {
  try {
    const { category_name, parent_category_id } = req.body;
    const category = await Category.create({ category_name, parent_category_id });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Get all categories, with their subcategories if any
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Category,
        as: 'Subcategories',
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get a category by ID, including its parent category
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'ParentCategory' },
        { model: Category, as: 'Subcategories' },
      ],
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Update a category
router.put('/categories/:id', async (req, res) => {
  try {
    const { category_name, parent_category_id } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.category_name = category_name || category.category_name;
    category.parent_category_id = parent_category_id !== undefined ? parent_category_id : category.parent_category_id;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete a category
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
