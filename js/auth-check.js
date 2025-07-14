// Check authentication state
document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Protect account page
    if (window.location.pathname.includes('account.html')) {
        if (!currentUser) {
            window.location.href = 'login.html';
        } else {
            // Show user info
            document.querySelector('.welcome-message').textContent =
                `Welcome, ${currentUser.username || currentUser.email}!`;
        }
    }

    // Redirect if already logged in
    if (window.location.pathname.includes('login.html') ||
        window.location.pathname.includes('register.html')) {
        if (currentUser) {
            window.location.href = 'account.html';
        }
    }
});