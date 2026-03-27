// ===== CART FUNCTIONS =====
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + ' added to cart! 🛒');
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.qty, 0);
    let countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = total;
}

function subscribeNewsletter() {
    let email = document.getElementById('newsletter-email').value;
    if (email) {
        alert('Thank you for subscribing! 🎉');
        document.getElementById('newsletter-email').value = '';
    } else {
        alert('Please enter your email address!');
    }
}

// Run when page loads
updateCartCount();