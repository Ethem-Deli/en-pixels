window.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('/api/session');
    const data = await res.json();
    const userBox = document.getElementById('userBox');
    if (data.loggedIn) {
        userBox.innerHTML = `Logged in as ${data.user.username} <button id='logoutBtn'>Logout</button>`;
        document.getElementById('logoutBtn').onclick = async () => {
            await fetch('/api/logout', { method: 'POST' });
            window.location.href = '/login.html';
        };
    } else {
        userBox.innerHTML = '<a href="/login.html">Login</a>';
    }
});