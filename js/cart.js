const API_URL = 'http://localhost:3000/api';

// ===== ADD TO CART =====
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + ' added to cart! 🛒');
}

// ===== UPDATE CART COUNT IN NAVBAR =====
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.qty, 0);
    let countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = total;
}

// ===== PLACE ORDER — Saves to Database =====
async function placeOrder() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let user = JSON.parse(localStorage.getItem('lamaison_loggedIn'));

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const orderData = {
        userId: user ? user.id : null,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        items: cart.map(item => ({
            menuItemId: 1,
            name: item.name,
            price: item.price,
            quantity: item.qty
        }))
    };

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(`✅ Order placed successfully! Order ID: ${data.orderId}`);
            localStorage.removeItem('cart');
            updateCartCount();
        } else {
            alert('Error placing order: ' + data.error);
        }
    } catch (error) {
        alert('Cannot connect to server!');
    }
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
    let email = document.getElementById('newsletter-email').value;
    if (email) {
        alert('Thank you for subscribing! 🎉');
        document.getElementById('newsletter-email').value = '';
    } else {
        alert('Please enter your email address!');
    }
}

// Run on every page load
updateCartCount();