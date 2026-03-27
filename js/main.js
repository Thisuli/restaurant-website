// ===== MENU FILTER =====
function filterMenu(category, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('.menu-card');
    const sections = document.querySelectorAll('.menu-section');

    if (category === 'all') {
        // Show everything
        cards.forEach(card => card.classList.remove('hidden'));
        sections.forEach(sec => sec.classList.remove('hidden'));
    } else {
        // Hide all sections first
        sections.forEach(sec => sec.classList.add('hidden'));

        cards.forEach(card => {
            const cats = card.getAttribute('data-category');
            if (cats && cats.includes(category)) {
                card.classList.remove('hidden');
                // Show the section this card belongs to
                card.closest('.menu-section').classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
}

// ===== SEARCH =====
function searchDishes() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.menu-card');
    const sections = document.querySelectorAll('.menu-section');

    sections.forEach(sec => sec.classList.add('hidden'));

    cards.forEach(card => {
        const name = card.querySelector('.menu-name').textContent.toLowerCase();
        if (name.includes(input)) {
            card.classList.remove('hidden');
            card.closest('.menu-section').classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    if (input === '') {
        cards.forEach(card => card.classList.remove('hidden'));
        sections.forEach(sec => sec.classList.remove('hidden'));
    }
}

// ===== GO TO FOOD DETAIL PAGE =====
function goToFood(foodName, category) {
    localStorage.setItem('selectedFood', foodName);
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'food-detail.html';
}