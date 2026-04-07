const express = require('express');
const router = express.Router();
const db = require('../database/db');

// ===== SAVE CONTACT MESSAGE =====
router.post('/', (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    if (!firstName || !email || !message) {
        return res.status(400).json({ error: 'Please fill required fields!' });
    }

    db.run(
        'INSERT INTO contacts (firstName, lastName, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, subject, message],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Message sent successfully!' });
        }
    );
});

// ===== GET ALL MESSAGES =====
router.get('/', (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY createdAt DESC', (err, messages) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(messages);
    });
});

module.exports = router;