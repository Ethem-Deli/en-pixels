// Navbar and Footer Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile Dropdown Toggle
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });

    // Search Toggle
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.querySelector('.search-container');
    const searchClose = document.querySelector('.search-close');

    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
        });

        searchClose.addEventListener('click', function () {
            searchContainer.classList.remove('active');
        });
    }

    // Update current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Sticky Header on Scroll
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
});
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    // Filter featured products or use all products
    const displayProducts = products.filter(product => product.featured);

    displayProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
      <div class="product-img" style="background-image: url('${product.images[0]}')"></div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <a href="product.html?id=${product.id}" class="view-details">View Details</a>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
        productGrid.appendChild(productCard);
    });
}

const products = [
    {
        id: 1,
        title: "Cosmic Harmony",
        price: 49.99,
        description: "A stunning abstract representation of cosmic energy and universal harmony.",
        category: "abstract",
        images: [
            "images/products/cosmic-harmony-1.jpg",
            "images/products/cosmic-harmony-2.jpg",
            "images/products/cosmic-harmony-3.jpg"
        ],
        sizes: [
            { name: "Small (12\" x 12\")", priceAdjustment: -10 },
            { name: "Medium (18\" x 18\")", priceAdjustment: 0 },
            { name: "Large (24\" x 24\")", priceAdjustment: 15 },
            { name: "Extra Large (36\" x 36\")", priceAdjustment: 25 }
        ],
        featured: true,
        inStock: true
    },
    {
        id: 2,
        title: "Mountain Serenity",
        price: 39.99,
        description: "Breathtaking digital landscape capturing majestic mountain ranges at dawn.",
        category: "landscape",
        images: [
            "images/products/mountain-serenity-1.jpg",
            "images/products/mountain-serenity-2.jpg"
        ],
        sizes: [
            { name: "Small (12\" x 12\")", priceAdjustment: -10 },
            { name: "Medium (18\" x 18\")", priceAdjustment: 0 }
        ],
        featured: true,
        inStock: true
    }
    // Add more products as needed
];