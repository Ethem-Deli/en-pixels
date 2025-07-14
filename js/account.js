document.addEventListener('DOMContentLoaded', function () {
    // Tab switching
    const navLinks = document.querySelectorAll('.account-nav a');
    const sections = document.querySelectorAll('.account-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active');
        });
    });

    // Load sample order data (in real app, this would come from API)
    loadOrderHistory();
});

function loadOrderHistory() {
    const orderList = document.querySelector('.order-list');
    if (!orderList) return;

    // Sample data - replace with real API call
    const orders = [
        {
            id: 'ENP1001',
            date: '2023-05-15',
            total: 49.99,
            status: 'Completed',
            items: ['Cosmic Harmony', 'Ocean Dreams']
        },
        {
            id: 'ENP0987',
            date: '2023-04-22',
            total: 99.98,
            status: 'Completed',
            items: ['Mountain Serenity', 'Urban Portrait']
        }
    ];

    // Clear loading state
    orderList.innerHTML = '';

    if (orders.length === 0) {
        orderList.innerHTML = '<p>No orders found</p>';
        return;
    }

    // Create order cards
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-date">${order.date}</span>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-body">
                <div class="order-items">
                    ${order.items.map(item => `<span>${item}</span>`).join('')}
                </div>
                <div class="order-total">
                    $${order.total.toFixed(2)}
                </div>
            </div>
        `;
        orderList.appendChild(orderCard);
    });
}
// Logout functionality
function setupLogout() {
    const logoutBtn = document.querySelector('.logout-link');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'logout.html';
        });
    }
}

// Call this in DOMContentLoaded
setupLogout();