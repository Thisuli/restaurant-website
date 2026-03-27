// ===== FILTER MENU =====
function filterMenu(category, clickedBtn) {
    const cards = document.querySelectorAll(".menu-card");
    const buttons = document.querySelectorAll(".filter-btn");
    const sections = document.querySelectorAll(".menu-section");

    // remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove("active"));

    // add active class to clicked button
    if (clickedBtn) {
        clickedBtn.classList.add("active");
    }

    // show/hide cards
    cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory.includes(category)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

    // hide whole sections if no visible cards inside
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll(".menu-card:not(.hidden)");
        if (visibleCards.length === 0) {
            section.classList.add("hidden");
        } else {
            section.classList.remove("hidden");
        }
    });
}

// ===== SEARCH DISHES =====
function searchDishes() {
    const input = document.getElementById("search-input").value.toLowerCase().trim();
    const cards = document.querySelectorAll(".menu-card");
    const sections = document.querySelectorAll(".menu-section");

    cards.forEach(card => {
        const dishName = card.querySelector(".menu-name").textContent.toLowerCase();
        const dishCategory = card.getAttribute("data-category").toLowerCase();

        if (dishName.includes(input) || dishCategory.includes(input)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

    // hide empty sections
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll(".menu-card:not(.hidden)");
        if (visibleCards.length === 0) {
            section.classList.add("hidden");
        } else {
            section.classList.remove("hidden");
        }
    });

    // if search box is empty, reset all cards and sections
    if (input === "") {
        cards.forEach(card => card.classList.remove("hidden"));
        sections.forEach(section => section.classList.remove("hidden"));
    }
}

// ===== GO TO FOOD DETAIL PAGE =====
function goToFood(foodName, category) {
    localStorage.setItem("selectedFood", foodName);
    localStorage.setItem("selectedCategory", category);
    window.location.href = "food-detail.html";
}