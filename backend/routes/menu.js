const express = require('express');
const router = express.Router();
const db = require('../database/db');

// ===== GET ALL MENU ITEMS =====
router.get('/', (req, res) => {
    db.all('SELECT * FROM menu WHERE isAvailable = 1', (err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(items);
    });
});

// ===== GET MENU BY CATEGORY =====
router.get('/category/:category', (req, res) => {
    const { category } = req.params;
    db.all(
        'SELECT * FROM menu WHERE category = ? AND isAvailable = 1',
        [category],
        (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(items);
        }
    );
});

// ===== GET SINGLE FOOD ITEM =====
router.get('/:id', (req, res) => {
    db.get(
        'SELECT * FROM menu WHERE id = ?',
        [req.params.id],
        (err, item) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!item) return res.status(404).json({ error: 'Food item not found!' });
            res.json(item);
        }
    );
});

// ===== SEARCH MENU =====
router.get('/search/:query', (req, res) => {
    const query = `%${req.params.query}%`;
    db.all(
        'SELECT * FROM menu WHERE name LIKE ? AND isAvailable = 1',
        [query],
        (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(items);
        }
    );
});

module.exports = router;