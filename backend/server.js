const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const ordersRoutes = require('./routes/orders');
const contactRoutes = require('./routes/contact');

// Create the server
const app = express();
const PORT = 3000;

// ===== MIDDLEWARE =====
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Read JSON data from requests
app.use(express.static(path.join(__dirname, '..'))); // Serve frontend files

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/contact', contactRoutes);

// ===== TEST ROUTE =====
app.get('/api', (req, res) => {
    res.json({
        message: '🍽️ Welcome to LaMaison Restaurant API!',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth/signup, /api/auth/login',
            menu: '/api/menu, /api/menu/category/:category',
            orders: '/api/orders',
            contact: '/api/contact'
        }
    });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log('');
    console.log('🍽️  LaMaison Restaurant Server Started!');
    console.log(`✅  Server running at: http://localhost:${PORT}`);
    console.log(`✅  API available at:  http://localhost:${PORT}/api`);
    console.log('');
});