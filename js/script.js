import products from './data/products.js';

// DOM Elements
const productsContainer = document.getElementById('products-container');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

// Pagination variables
let currentPage = 1;
const productsPerPage = 6; // Show 6 products per page (2 rows of 3)

// Product rendering functions
function renderProducts(productsToRender, page = 1) {
    if (!productsContainer) return;

    const startIndex = (page - 1) * productsPerPage;
    const paginatedProducts = productsToRender.slice(startIndex, startIndex + productsPerPage);

    productsContainer.innerHTML = '';

    paginatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });

    // Update pagination controls if they exist
    if (pageInfo && prevButton && nextButton) {
        updatePagination(productsToRender.length, page);
    }

}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.title}">
            <div class="product-actions">
                <button class="quick-view" data-id="${product.id}">Quick View</button>
                <button class="add-to-wishlist" aria-label="Add to wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-meta">
                <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span>(${product.reviewCount})</span>
                </div>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    return card;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Full stars
    stars += '<i class="fas fa-star"></i>'.repeat(fullStars);

    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    // Empty stars
    stars += '<i class="far fa-star"></i>'.repeat(emptyStars);

    return stars;
}

function updatePagination(totalProducts, currentPage) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

// Product interaction handlers
function initializeProductInteractions() {
    // Quick View Modal
    document.addEventListener('click', function (e) {
        if (e.target.closest('.quick-view')) {
            const button = e.target.closest('.quick-view');
            const productId = parseInt(button.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            showQuickView(product);
        }

        if (e.target.closest('.add-to-wishlist')) {
            const button = e.target.closest('.add-to-wishlist');
            toggleWishlist(button);
        }

        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId, button);
        }
    });

    // Pagination event listeners
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                const featuredProducts = products.filter(product => product.featured);
                renderProducts(featuredProducts, currentPage);
            }
        });

        nextButton.addEventListener('click', () => {
            const featuredProducts = products.filter(product => product.featured);
            const totalPages = Math.ceil(featuredProducts.length / productsPerPage);

            if (currentPage < totalPages) {
                currentPage++;
                renderProducts(featuredProducts, currentPage);
            }
        });
    }
}

function showQuickView(product) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    modalOverlay.innerHTML = `
        <div class="quick-view-modal">
            <button class="close-modal">&times;</button>
            <div class="quick-view-content">
                <div class="quick-view-images">
                    <div class="main-image">
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                    <div class="thumbnails">
                        ${product.images.map((image, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}">
                                <img src="${image}" alt="${product.title} thumbnail ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="quick-view-details">
                    <h3>${product.title}</h3>
                    <div class="quick-view-meta">
                        <span class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        <div class="rating">
                            ${generateStarRating(product.rating)}
                            <span>(${product.reviewCount} reviews)</span>
                        </div>
                    </div>
                    <div class="price">
                        <span class="current">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <p class="description">${product.description}</p>
                    
                    ${product.sizes ? `
                    <div class="size-selector">
                        <label>Size:</label>
                        <select>
                            ${product.sizes.map(size => `
                                <option value="${size.name}">${size.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    ` : ''}
                    
                    <div class="quantity-selector">
                        <label>Quantity:</label>
                        <div class="quantity-controls">
                            <button class="quantity-minus">-</button>
                            <input type="number" value="1" min="1">
                            <button class="quantity-plus">+</button>
                        </div>
                    </div>
                    
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';

    // Thumbnail click handler
    const thumbnails = modalOverlay.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.querySelector('img').src;
            modalOverlay.querySelector('.main-image img').src = imgSrc;

            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Close modal handler
    const closeModal = modalOverlay.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
        document.body.style.overflow = '';
    });

    // Quantity controls
    const minusBtn = modalOverlay.querySelector('.quantity-minus');
    const plusBtn = modalOverlay.querySelector('.quantity-plus');
    const quantityInput = modalOverlay.querySelector('.quantity-controls input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
}

function toggleWishlist(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        // Add to wishlist functionality
    } else {
        icon.classList.replace('fas', 'far');
        // Remove from wishlist functionality
    }
}

function addToCart(productId, button) {
    if (window.shoppingCart) {
        const product = products.find(p => p.id === productId);
        window.shoppingCart.addItem(productId);

        // Visual feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#6c63ff';
        }, 2000);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load featured products
    const featuredProducts = products.filter(product => product.featured);
    renderProducts(featuredProducts, currentPage);

    // Initialize other functionality (cart, quick view, etc.)
    initializeProductInteractions();

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

// Simulate login state
let user = JSON.parse(localStorage.getItem("enpixels_user")) || null;

document.addEventListener("DOMContentLoaded", () => {
    const accountMenu = document.querySelector(".account-menu");

    if (user) {
        accountMenu.innerHTML = `
            <a href="account.html">My Account</a>
            <a href="#" id="logout-link">Logout</a>
        `;

        document.getElementById("logout-link").addEventListener("click", () => {
            localStorage.removeItem("enpixels_user");
            window.location.href = "index.html";
        });
    }
});
