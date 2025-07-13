class ShoppingCart {
    constructor() {
        this.cart = [];
        this.cartCount = 0;
        this.cartTotal = 0;
        this.init();
    }

    init() {
        this.loadCart();
        this.updateCartCount();
        this.setupEventListeners();
    }

    loadCart() {
        const savedCart = localStorage.getItem('enPixelsCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
            this.calculateTotal();
        }
    }

    saveCart() {
        localStorage.setItem('enPixelsCart', JSON.stringify(this.cart));
    }

    addItem(productId, quantity = 1, size = 'medium') {
        const product = this.getProductById(productId);

        if (!product) {
            console.error('Product not found');
            return false;
        }

        const existingItemIndex = this.cart.findIndex(
            item => item.id === productId && item.size === size
        );

        if (existingItemIndex >= 0) {
            this.cart[existingItemIndex].quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                title: product.title,
                price: product.price,
                image: product.image,
                size,
                quantity
            });
        }

        this.cartCount += quantity;
        this.calculateTotal();
        this.updateCartCount();
        this.saveCart();
        this.showNotification(product.title);
        return true;
    }

    removeItem(index) {
        if (index >= 0 && index < this.cart.length) {
            this.cartCount -= this.cart[index].quantity;
            this.cart.splice(index, 1);
            this.calculateTotal();
            this.updateCartCount();
            this.saveCart();
            return true;
        }
        return false;
    }

    updateQuantity(index, newQuantity) {
        if (index >= 0 && index < this.cart.length) {
            const quantityDiff = newQuantity - this.cart[index].quantity;
            this.cart[index].quantity = newQuantity;
            this.cartCount += quantityDiff;
            this.calculateTotal();
            this.updateCartCount();
            this.saveCart();
            return true;
        }
        return false;
    }

    calculateTotal() {
        this.cartTotal = this.cart.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.textContent = this.cartCount;
        });
    }

    showNotification(productTitle) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <p>${productTitle} has been added to your cart!</p>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getProductById(productId) {
        // This should be replaced with your actual product data source
        const products = [
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

        return products.find(product => product.id === productId);
    }

    setupEventListeners() {
        // Cart button click
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCartModal();
            });
        }

        // Search button click
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.search-container').classList.toggle('active');
            });
        }
    }

    showCartModal() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'cart-modal';

        if (this.cart.length === 0) {
            modal.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Start shopping to add items to your cart</p>
                    <a href="index.html" class="continue-shopping">Continue Shopping</a>
                </div>
            `;
        } else {
            modal.innerHTML = `
                <div class="cart-header">
                    <h3>Your Cart (${this.cartCount})</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="cart-items">
                    ${this.cart.map((item, index) => `
                        <div class="cart-item">
                            <div class="item-image">
                                <img src="${item.image}" alt="${item.title}">
                            </div>
                            <div class="item-details">
                                <h4>${item.title}</h4>
                                <p>Size: ${item.size}</p>
                                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                            <div class="item-quantity">
                                <button class="quantity-minus" data-index="${index}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-plus" data-index="${index}">+</button>
                            </div>
                            <button class="remove-item" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary">
                    <div class="subtotal">
                        <span>Subtotal</span>
                        <span>$${this.cartTotal.toFixed(2)}</span>
                    </div>
                    <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
                    <a href="index.html" class="continue-shopping">Continue Shopping</a>
                </div>
            `;
        }

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Close modal when clicking overlay or close button
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('close-modal')) {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }
        });

        // Handle quantity changes and item removal
        if (this.cart.length > 0) {
            modal.querySelectorAll('.quantity-minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    const currentQuantity = this.cart[index].quantity;
                    if (currentQuantity > 1) {
                        this.updateQuantity(index, currentQuantity - 1);
                        this.showCartModal(); // Refresh modal
                    }
                });
            });

            modal.querySelectorAll('.quantity-plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    const currentQuantity = this.cart[index].quantity;
                    this.updateQuantity(index, currentQuantity + 1);
                    this.showCartModal(); // Refresh modal
                });
            });

            modal.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.closest('button').getAttribute('data-index'));
                    this.removeItem(index);
                    this.showCartModal(); // Refresh modal
                });
            });
        }
    }
}

// Initialize the shopping cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.shoppingCart = new ShoppingCart();

    // Handle add to cart buttons on product cards
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            window.shoppingCart.addItem(productId);
        });
    });

    // Handle add to cart on product detail page
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantity = parseInt(document.getElementById('quantity').value);
            const size = document.getElementById('size-select').value;
            window.shoppingCart.addItem(productId, quantity, size);
        });
    }
});