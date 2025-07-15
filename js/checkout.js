// js/checkout.js

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem('currentUser');
    const cartContainer = document.getElementById('cartContainer');
    const totalPriceEl = document.getElementById('totalPrice');

    if (!currentUser) {
        cartContainer.innerHTML = '<p>Please <a href="login.html">login</a> to view your cart.</p>';
        return;
    }

    const cartKey = `cart_${currentUser}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    function updateCartDisplay() {
        if (!cart.length) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceEl.textContent = '';
            return;
        }

        cartContainer.innerHTML = cart.map((item, index) => `
      <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: 
          <button onclick="updateQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `).join("");

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
    }

    window.updateQuantity = (index, change) => {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart[index].quantity = 1;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartDisplay();
    };

    window.removeItem = index => {
        cart.splice(index, 1);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartDisplay();
    };

    updateCartDisplay();
});

// Handle Place Order
document.addEventListener("DOMContentLoaded", () => {
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    const orderConfirmation = document.getElementById("orderConfirmation");

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", () => {
            if (!cart.length) {
                alert("Cart is empty.");
                return;
            }

            // Log to bestsellers
            let bestsellers = JSON.parse(localStorage.getItem("bestsellers") || "{}");
            cart.forEach(item => {
                if (!bestsellers[item.name]) bestsellers[item.name] = 0;
                bestsellers[item.name] += item.quantity;
            });
            localStorage.setItem("bestsellers", JSON.stringify(bestsellers));

            // Clear cart
            cart = [];
            localStorage.setItem(cartKey, JSON.stringify(cart));
            updateCartDisplay();

            // Show confirmation
            document.getElementById("reviewOrder").style.display = "none";
            orderConfirmation.style.display = "block";
        });
    }
});

