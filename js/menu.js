const API_URL = 'http://localhost:3000/api';

// Store all items globally so filter works without re-fetching
let allMenuItems = [];

// ===== LOAD ALL MENU FROM DATABASE WHEN PAGE OPENS =====
async function loadMenu() {
    try {
        const response = await fetch(`${API_URL}/menu`);
        const items = await response.json();
        allMenuItems = items;
        displayMenuItems(items, 'all');
    } catch (error) {
        console.error('Error loading menu from backend:', error);
        // If backend not running — show a message
        document.querySelector('.menu-content').innerHTML = `
            <div style="text-align:center; padding:60px; color:#888;">
                <div style="font-size:48px; margin-bottom:16px;">⚠️</div>
                <h3 style="color:#1A1A2E; margin-bottom:8px;">Server not running</h3>
                <p>Please start the backend server first:</p>
                <code style="background:#f0f0f0; padding:8px 16px; border-radius:8px; display:inline-block; margin-top:8px;">node server.js</code>
            </div>
        `;
    }
}

// ===== DISPLAY MENU ITEMS =====
function displayMenuItems(items, activeCategory) {

    // Get all section grids
    const grids = {
        starter: document.querySelector('#section-starter .menu-grid'),
        main:    document.querySelector('#section-main .menu-grid'),
        dessert: document.querySelector('#section-dessert .menu-grid'),
        drink:   document.querySelector('#section-drink .menu-grid')
    };

    // Clear all grids first
    Object.values(grids).forEach(grid => {
        if (grid) grid.innerHTML = '';
    });

    // Show or hide sections based on active category
    const sections = {
        starter: document.getElementById('section-starter'),
        main:    document.getElementById('section-main'),
        dessert: document.getElementById('section-dessert'),
        drink:   document.getElementById('section-drink')
    };

    if (activeCategory === 'all') {
        // Show all sections
        Object.values(sections).forEach(sec => {
            if (sec) sec.style.display = 'block';
        });
    } else {
        // Hide all sections first
        Object.values(sections).forEach(sec => {
            if (sec) sec.style.display = 'none';
        });
        // Show only the matching section
        if (sections[activeCategory]) {
            sections[activeCategory].style.display = 'block';
        }
    }

    // If no items found
    if (items.length === 0) {
        Object.values(sections).forEach(sec => {
            if (sec) sec.style.display = 'block';
        });
        const firstGrid = document.querySelector('.menu-grid');
        if (firstGrid) {
            firstGrid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:40px; color:#888;">
                    <div style="font-size:40px; margin-bottom:12px;">🔍</div>
                    <p>No dishes found. Try a different search!</p>
                </div>
            `;
        }
        return;
    }

    // Add each item card to the correct section grid
    items.forEach(item => {
        const grid = grids[item.category];
        if (!grid) return;

        // Build badge HTML
        let badgeHTML = '';
        if (item.badge === 'HOT') {
            badgeHTML = `<span class="badge-hot">HOT</span>`;
        } else if (item.badge === 'NEW') {
            badgeHTML = `<span class="badge-new">NEW</span>`;
        }

        // Build image path
        const imgSrc = `../images/${item.image}`;

        // Create card element
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.setAttribute('data-category', item.category);

        card.innerHTML = `
            <div class="menu-card-img">
                <img
                    src="${imgSrc}"
                    alt="${item.name}"
                    onerror="this.parentElement.style.background='#F9F5F0'; this.style.display='none';"
                />
                ${badgeHTML}
            </div>
            <div class="menu-card-body">
                <div class="menu-cat">${capitalize(item.category)}</div>
                <div class="menu-name">${item.name}</div>
                <div class="menu-row">
                    <div class="menu-price">$${Number(item.price).toFixed(2)}</div>
                    <div class="menu-rating">★ ${item.rating}</div>
                </div>
                <button class="menu-cart-btn"
                    onclick="event.stopPropagation(); addToCart('${item.name}', ${item.price})">
                    + Add to Cart
                </button>
            </div>
        `;

        // Click card to go to food detail page
        card.addEventListener('click', () => {
            localStorage.setItem('selectedFoodId', item.id);
            localStorage.setItem('selectedFoodName', item.name);
            window.location.href = 'food-detail.html';
        });

        grid.appendChild(card);
    });
}

// ===== FILTER BUTTONS =====
function filterMenu(category, btn) {

    // Update active button style
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (category === 'all') {
        // Show all items
        displayMenuItems(allMenuItems, 'all');
    } else {
        // Filter items by category from the stored list
        const filtered = allMenuItems.filter(item => item.category === category);
        displayMenuItems(filtered, category);
    }
}

// ===== SEARCH BOX =====
function searchDishes() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();

    if (query === '') {
        // Empty search — show everything
        displayMenuItems(allMenuItems, 'all');

        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn').classList.add('active');
        return;
    }

    // Filter by name
    const filtered = allMenuItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    displayMenuItems(filtered, 'all');
}

// ===== HELPER — Capitalize first letter =====
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== RUN WHEN PAGE LOADS =====
loadMenu();