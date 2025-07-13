document.addEventListener('DOMContentLoaded', function () {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;

    // Load product data
    loadProduct(productId);

    // Load related products
    loadRelatedProducts(productId);

    // Load reviews
    loadReviews(productId);

    // Set up quantity controls
    setupQuantityControls();
});

function loadProduct(productId) {
    // In a real app, this would be an API call
    const products = {
        1: {
            id: 1,
            title: "Cosmic Harmony",
            price: 49.99,
            description: "A stunning abstract representation of cosmic energy and universal harmony. This digital artwork features vibrant colors and dynamic shapes that evoke a sense of wonder and connection to the cosmos. Perfect for meditation spaces or as a focal point in any room.",
            images: [
                "images/products/cosmic-harmony.jpg",
                "images/products/cosmic-harmony-2.jpg",
                "images/products/cosmic-harmony-3.jpg"
            ],
            sizes: [
                { value: "small", label: "Small (12\" x 12\")", priceAdjustment: -10 },
                { value: "medium", label: "Medium (18\" x 18\")", priceAdjustment: 0 },
                { value: "large", label: "Large (24\" x 24\")", priceAdjustment: 15 },
                { value: "xlarge", label: "Extra Large (36\" x 36\")", priceAdjustment: 25 }
            ]
        },
        2: {
            id: 2,
            title: "Mountain Serenity",
            price: 39.99,
            description: "Breathtaking digital landscape capturing the majestic beauty of mountain ranges at dawn. The soft morning light creates a serene atmosphere that brings peace and tranquility to any space. Ideal for offices or living rooms where you want to create a calming environment.",
            images: [
                "images/products/mountain-serenity.jpg",
                "images/products/mountain-serenity-2.jpg",
                "images/products/mountain-serenity-3.jpg"
            ],
            sizes: [
                { value: "small", label: "Small (12\" x 12\")", priceAdjustment: -10 },
                { value: "medium", label: "Medium (18\" x 18\")", priceAdjustment: 0 },
                { value: "large", label: "Large (24\" x 24\")", priceAdjustment: 15 },
                { value: "xlarge", label: "Extra Large (36\" x 36\")", priceAdjustment: 25 }
            ]
        },
        3: {
            id: 3,
            title: "Urban Vibes",
            price: 59.99,
            description: "A vibrant digital painting that captures the energy and rhythm of city life. Bold colors and dynamic brush strokes create a sense of movement and excitement. Perfect for modern apartments or creative workspaces that need a pop of urban energy.",
            images: [
                "images/products/urban-vibes.jpg",
                "images/products/urban-vibes-2.jpg",
                "images/products/urban-vibes-3.jpg"
            ],
            sizes: [
                { value: "small", label: "Small (12\" x 12\")", priceAdjustment: -10 },
                { value: "medium", label: "Medium (18\" x 18\")", priceAdjustment: 0 },
                { value: "large", label: "Large (24\" x 24\")", priceAdjustment: 15 },
                { value: "xlarge", label: "Extra Large (36\" x 36\")", priceAdjustment: 25 }
            ]
        },
        4: {
            id: 4,
            title: "Ocean Dreams",
            price: 45.99,
            description: "A mesmerizing digital seascape that captures the endless beauty and power of the ocean. The play of light on water creates a hypnotic effect that brings a sense of calm and wonder. Excellent for bathrooms, bedrooms, or any space where you want to create a peaceful retreat.",
            images: [
                "images/products/ocean-dreams.jpg",
                "images/products/ocean-dreams-2.jpg",
                "images/products/ocean-dreams-3.jpg"
            ],
            sizes: [
                { value: "small", label: "Small (12\" x 12\")", priceAdjustment: -10 },
                { value: "medium", label: "Medium (18\" x 18\")", priceAdjustment: 0 },
                { value: "large", label: "Large (24\" x 24\")", priceAdjustment: 15 },
                { value: "xlarge", label: "Extra Large (36\" x 36\")", priceAdjustment: 25 }
            ]
        }
    };

    const product = products[productId];
    if (!product) return;

    // Update page title
    document.title = `${product.title} - En Pixels`;

    // Update product info
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('add-to-cart').setAttribute('data-id', product.id);

    // Update main image
    const mainImage = document.getElementById('product-main-image');
    mainImage.src = product.images[0];
    mainImage.alt = product.title;

    // Create thumbnails
    const thumbnailsContainer = document.querySelector('.thumbnails');
    thumbnailsContainer.innerHTML = '';

    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumbnail.innerHTML = `<img src="${image}" alt="${product.title} thumbnail">`;
        thumbnail.addEventListener('click', () => {
            // Update main image
            mainImage.src = image;

            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Update size options
    const sizeSelect = document.getElementById('size-select');
    sizeSelect.innerHTML = '';
    product.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size.value;
        option.textContent = size.label;
        sizeSelect.appendChild(option);
    });

    // Handle size selection changes
    sizeSelect.addEventListener('change', function () {
        const selectedSize = product.sizes.find(size => size.value === this.value);
        const newPrice = product.price + (selectedSize?.priceAdjustment || 0);
        document.getElementById('product-price').textContent = `$${newPrice.toFixed(2)}`;
    });
}

function loadRelatedProducts(currentProductId) {
    // In a real app, this would be an API call
    const allProducts = [
        {
            id: 1,
            title: "Cosmic Harmony",
            price: 49.99,
            image: "images/products/cosmic-harmony.jpg"
        },
        {
            id: 2,
            title: "Mountain Serenity",
            price: 39.99,
            image: "images/products/mountain-serenity.jpg"
        },
        {
            id: 3,
            title: "Urban Vibes",
            price: 59.99,
            image: "images/products/urban-vibes.jpg"
        },
        {
            id: 4,
            title: "Ocean Dreams",
            price: 45.99,
            image: "images/products/ocean-dreams.jpg"
        }
    ];

    const relatedProducts = allProducts.filter(product => product.id !== currentProductId);
    const productGrid = document.querySelector('.related-products .product-grid');

    if (!productGrid) return;

    productGrid.innerHTML = '';

    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img" style="background-image: url('${product.image}')"></div>
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

function loadReviews(productId) {
    // In a real app, this would be an API call
    const reviews = [
        {
            id: 1,
            author: "Sarah J.",
            date: "2023-05-15",
            rating: 5,
            text: "Absolutely stunning artwork! The colors are even more vibrant in person. It's become the focal point of my living room."
        },
        {
            id: 2,
            author: "Michael T.",
            date: "2023-04-22",
            rating: 4,
            text: "Beautiful piece, arrived quickly and well-packaged. The quality is excellent, though I wish it came in even larger sizes."
        },
        {
            id: 3,
            author: "Emily R.",
            date: "2023-03-10",
            rating: 5,
            text: "I've purchased several digital artworks before, but this one is by far my favorite. The attention to detail is incredible."
        }
    ];

    const reviewsContainer = document.querySelector('.reviews-container');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = '';

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.author}</span>
                <span class="review-date">${formatDate(review.date)}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="review-text">${review.text}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function setupQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-minus');
    const plusBtn = document.querySelector('.quantity-plus');

    if (!quantityInput || !minusBtn || !plusBtn) return;

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
}