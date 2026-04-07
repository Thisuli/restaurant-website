const express = require('express');
const router = express.Router();
const db = require('../database/db');

// ===== PLACE AN ORDER =====
router.post('/', (req, res) => {
    const { userId, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items in order!' });
    }

    // Create the order
    db.run(
        'INSERT INTO orders (userId, totalAmount) VALUES (?, ?)',
        [userId || null, totalAmount],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });

            const orderId = this.lastID;

            // Add each item to the order
            const stmt = db.prepare(
                'INSERT INTO orderItems (orderId, menuItemId, name, price, quantity) VALUES (?, ?, ?, ?, ?)'
            );

            items.forEach(item => {
                stmt.run([orderId, item.menuItemId, item.name, item.price, item.quantity]);
            });

            stmt.finalize();

            res.status(201).json({
                message: 'Order placed successfully!',
                orderId
            });
        }
    );
});

// ===== GET ALL ORDERS =====
router.get('/', (req, res) => {
    db.all(`
        SELECT orders.*, 
               GROUP_CONCAT(orderItems.name) as itemNames
        FROM orders
        LEFT JOIN orderItems ON orders.id = orderItems.orderId
        GROUP BY orders.id
        ORDER BY orders.createdAt DESC
    `, (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(orders);
    });
});

// ===== GET SINGLE ORDER =====
router.get('/:id', (req, res) => {
    db.all(
        'SELECT * FROM orderItems WHERE orderId = ?',
        [req.params.id],
        (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(items);
        }
    );
});

module.exports = router;