const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const SECRET_KEY = 'lamaison_secret_key_2026';

// ===== SIGN UP =====
router.post('/signup', (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check all fields
    if (!firstName || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all required fields!' });
    }

    // Check if email already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], (err, user) => {
        if (user) {
            return res.status(400).json({ error: 'This email is already registered!' });
        }

        // Hash the password for security
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Save user to database
        db.run(
            'INSERT INTO users (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, email, phone, hashedPassword],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Error creating account!' });
                }
                res.status(201).json({
                    message: 'Account created successfully!',
                    userId: this.lastID
                });
            }
        );
    });
});

// ===== LOGIN =====
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter email and password!' });
    }

    // Find user by email
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (!user) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }

        // Check password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }

        // Create a token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    });
});

// ===== GET ALL USERS (for testing) =====
router.get('/users', (req, res) => {
    db.all('SELECT id, firstName, lastName, email, phone, createdAt FROM users', (err, users) => {
        res.json(users);
    });
});

module.exports = router;