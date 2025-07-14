// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function () {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically send to server
            console.log('Login attempt with:', email, password);

            // For demo, redirect to account page
            window.location.href = 'account.html';
        });
    }

    // Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            // Validation
            if (!username || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }

            // Here you would typically send to server
            console.log('Registration with:', username, email, password);

            // For demo, redirect to login page
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });

        // Password strength indicator
        const passwordInput = document.getElementById('reg-password');
        const strengthIndicator = document.querySelector('.password-strength');

        if (passwordInput && strengthIndicator) {
            passwordInput.addEventListener('input', function () {
                const strength = calculatePasswordStrength(this.value);
                strengthIndicator.style.width = strength + '%';
                strengthIndicator.style.backgroundColor = getStrengthColor(strength);
            });
        }
    }
});

function calculatePasswordStrength(password) {
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 30;
    if (password.length >= 12) strength += 20;

    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    return Math.min(strength, 100);
}

function getStrengthColor(strength) {
    if (strength < 40) return '#ff4d4d';
    if (strength < 70) return '#ffa64d';
    return '#4CAF50';
}
// In registerForm submit handler (replace the demo redirect)
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // ... (existing validation code)

        // Simulate successful registration
        alert('Registration successful! Redirecting to login...');

        // Store registration data in localStorage (temporarily)
        const userData = {
            username,
            email,
            password // Note: In real app, never store raw passwords
        };
        localStorage.setItem('tempUserData', JSON.stringify(userData));

        // Redirect to login
        window.location.href = 'login.html';
    });
}