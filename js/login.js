// In loginForm submit handler
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Check against temp storage (for demo)
        const tempUser = JSON.parse(localStorage.getItem('tempUserData'));

        if (tempUser && tempUser.email === email && tempUser.password === password) {
            // Successful login
            localStorage.setItem('currentUser', JSON.stringify({
                username: tempUser.username,
                email: tempUser.email
            }));
            localStorage.removeItem('tempUserData');

            // Redirect to account page
            window.location.href = 'account.html';
        } else {
            alert('Invalid credentials or no account found');
        }
    });
}
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) {
        window.location.href = '/index.html';
    }
});