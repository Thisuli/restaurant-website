const API_URL = 'http://localhost:3000/api';

// ===== LOGIN — Now uses Backend API =====
async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMsg = document.getElementById('login-error');
    const successMsg = document.getElementById('login-success');

    errorMsg.classList.remove('show');
    successMsg.classList.remove('show');

    if (!email || !password) {
        errorMsg.textContent = '❌ Please fill in all fields!';
        errorMsg.classList.add('show');
        return;
    }

    try {
        // Send login request to backend
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMsg.textContent = '❌ ' + data.error;
            errorMsg.classList.add('show');
            return;
        }

        // Save token and user info to localStorage
        localStorage.setItem('lamaison_token', data.token);
        localStorage.setItem('lamaison_loggedIn', JSON.stringify(data.user));

        successMsg.textContent = '✅ Login successful! Redirecting...';
        successMsg.classList.add('show');

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);

    } catch (error) {
        errorMsg.textContent = '❌ Cannot connect to server. Make sure the server is running!';
        errorMsg.classList.add('show');
    }
}

// ===== SIGNUP — Now uses Backend API =====
async function handleSignup() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const terms = document.getElementById('terms').checked;

    const errorMsg = document.getElementById('signup-error');
    const successMsg = document.getElementById('signup-success');

    errorMsg.classList.remove('show');
    successMsg.classList.remove('show');

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        errorMsg.textContent = '❌ Please fill in all fields!';
        errorMsg.classList.add('show');
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = '❌ Passwords do not match!';
        errorMsg.classList.add('show');
        return;
    }

    if (password.length < 6) {
        errorMsg.textContent = '❌ Password must be at least 6 characters!';
        errorMsg.classList.add('show');
        return;
    }

    if (!terms) {
        errorMsg.textContent = '❌ Please agree to the Terms and Privacy Policy!';
        errorMsg.classList.add('show');
        return;
    }

    try {
        // Send signup request to backend
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, phone, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMsg.textContent = '❌ ' + data.error;
            errorMsg.classList.add('show');
            return;
        }

        successMsg.textContent = '✅ Account created successfully! Redirecting to login...';
        successMsg.classList.add('show');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    } catch (error) {
        errorMsg.textContent = '❌ Cannot connect to server. Make sure the server is running!';
        errorMsg.classList.add('show');
    }
}