const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file in backend/database folder
const DB_PATH = path.join(__dirname, 'lamaison.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database!');
    }
});

// Create all tables
db.serialize(() => {

    // USERS TABLE — stores registered users
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // MENU TABLE — stores all food items
    db.run(`
        CREATE TABLE IF NOT EXISTS menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            image TEXT,
            rating REAL DEFAULT 4.5,
            badge TEXT,
            isAvailable INTEGER DEFAULT 1
        )
    `);

    // ORDERS TABLE — stores customer orders
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            totalAmount REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `);

    // ORDER ITEMS TABLE — stores items inside each order
    db.run(`
        CREATE TABLE IF NOT EXISTS orderItems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            orderId INTEGER NOT NULL,
            menuItemId INTEGER NOT NULL,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (orderId) REFERENCES orders(id),
            FOREIGN KEY (menuItemId) REFERENCES menu(id)
        )
    `);

    // CONTACTS TABLE — stores contact form messages
    db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Insert demo menu data if table is empty
    db.get("SELECT COUNT(*) as count FROM menu", (err, row) => {
        if (row && row.count === 0) {
            const menuItems = [
                // Starters
                ['Garden Salad', 'starter', 9.99, 'Fresh garden vegetables with house dressing', 'Garden Salad.jpg', 4.7, 'NEW'],
                ['Tomato Soup', 'starter', 7.99, 'Rich creamy tomato soup with fresh basil', 'Tomato Soup.jpg', 4.8, 'HOT'],
                ['Cheese Bruschetta', 'starter', 8.99, 'Toasted bread with fresh tomatoes and cheese', 'Cheese Bruschetta.jpg', 4.9, null],
                ['Garlic Prawns', 'starter', 13.99, 'Juicy prawns cooked in garlic butter sauce', 'Garlic Prawns.jpg', 4.9, null],
                // Main Course
                ['Truffle Pasta', 'main', 18.99, 'Handmade tagliatelle with black truffle cream sauce', 'Truffle Pasta.jpg', 4.9, 'HOT'],
                ['Ribeye Steak', 'main', 34.99, 'Premium ribeye cooked to perfection', 'Ribeye Steak.jpg', 4.8, 'NEW'],
                ['Margherita Pizza', 'main', 14.99, 'Classic Italian pizza with fresh mozzarella', 'Margherita Pizza.jpg', 4.9, 'HOT'],
                ['Ramen Bowl', 'main', 16.99, 'Japanese ramen with rich pork broth', 'Ramen Bowl.jpg', 4.9, null],
                ['Chicken Tagine', 'main', 18.99, 'Moroccan style slow-cooked chicken', 'Chicken Tagine.jpg', 4.8, null],
                ['Lamb Stew', 'main', 26.99, 'Slow-cooked lamb with root vegetables', 'Lamb Stew.jpg', 4.7, null],
                ['Grilled Salmon', 'main', 28.99, 'Fresh Atlantic salmon with lemon butter', 'Grilled Salmon.jpg', 4.9, null],
                ['Wagyu Burger', 'main', 20.99, 'Premium wagyu beef burger with truffle fries', 'Wagyu Burger.jpg', 4.8, null],
                // Desserts
                ['Choc Fondant', 'dessert', 9.99, 'Warm chocolate fondant with vanilla ice cream', 'Choc Fondant.jpg', 4.9, 'HOT'],
                ['Vanilla Cupcake', 'dessert', 6.99, 'Light vanilla cupcake with buttercream frosting', 'Vanilla Cupcake.jpg', 4.7, null],
                ['Creme Brulee', 'dessert', 9.99, 'Classic French creme brulee with caramelised sugar', 'Choc Fondant.jpg', 4.8, 'NEW'],
                ['Gelato Trio', 'dessert', 18.99, 'Three scoops of artisan Italian gelato', 'Gelato Trio.jpg', 4.9, null],
                // Drinks
                ['Fresh Lemonade', 'drink', 4.99, 'Freshly squeezed lemonade with mint', 'Fresh Lemonade.jpg', 4.8, null],
                ['Cappuccino', 'drink', 3.99, 'Italian espresso with steamed milk foam', 'Cappuccino.jpg', 4.9, null],
                ['Mango Smoothie', 'drink', 5.99, 'Fresh mango blended with yogurt', 'Mango Smoothie.jpg', 4.7, null],
                ['Matcha Latte', 'drink', 4.99, 'Premium matcha with steamed oat milk', 'Matcha Latte.jpg', 4.8, null],
            ];

            const stmt = db.prepare(`
                INSERT INTO menu (name, category, price, description, image, rating, badge)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);

            menuItems.forEach(item => stmt.run(item));
            stmt.finalize();
            console.log('✅ Demo menu data inserted!');
        }
    });

    console.log('✅ All database tables created!');
});

module.exports = db;