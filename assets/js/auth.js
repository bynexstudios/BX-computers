// Auth & Admin Access Logic

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    if (email === 'bynexstudios@gmail.com' && password === 'admin123') {
        // Admin Login Success
        localStorage.setItem('bynex_admin_auth', 'true');
        localStorage.setItem('bynex_user', JSON.stringify({ email: email, role: 'admin' }));
        window.location.href = 'admin/dashboard.html';
    } else {
        // Mock User Login
        if (email && password) {
            localStorage.setItem('bynex_user', JSON.stringify({ email: email, role: 'user' }));
            window.location.href = 'index.html';
        } else {
            errorMsg.classList.remove('hidden');
            errorMsg.textContent = 'Please enter both email and password.';
        }
    }
}

function handleLogout() {
    localStorage.removeItem('bynex_admin_auth');
    localStorage.removeItem('bynex_user');
    window.location.href = '../login.html'; // Adjust path based on where logout is clicked
}

// Check admin auth status for admin pages
function checkAdminAuth() {
    const isAuth = localStorage.getItem('bynex_admin_auth');
    if (isAuth !== 'true') {
        window.location.href = '../login.html';
    }
}

// Check if user is logged in to show correct nav items
document.addEventListener('DOMContentLoaded', () => {
    const userStr = localStorage.getItem('bynex_user');
    const authLinks = document.getElementById('auth-links');
    const userMenu = document.getElementById('user-menu');
    
    if (userStr) {
        const user = JSON.parse(userStr);
        if (authLinks) authLinks.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            const userNameSpan = document.getElementById('user-name');
            if(userNameSpan) userNameSpan.textContent = user.role === 'admin' ? 'Admin' : user.email.split('@')[0];
            
            if(user.role === 'admin') {
                const adminLink = document.getElementById('admin-link');
                if(adminLink) adminLink.classList.remove('hidden');
            }
        }
    }
});
