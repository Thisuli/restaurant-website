// ===== LOGIN FUNCTION =====
function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMsg = document.getElementById('login-error');
    const successMsg = document.getElementById('login-success');

    // Hide messages first
    errorMsg.classList.remove('show');
    successMsg.classList.remove('show');

    // Check empty fields
    if (!email || !password) {
        errorMsg.textContent = '❌ Please fill in all fields!';
        errorMsg.classList.add('show');
        return;
    }

    // Get saved users from local storage
    const users = JSON.parse(localStorage.getItem('lamaison_users')) || [];

    // Find matching user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Save logged in user
        localStorage.setItem('lamaison_loggedIn', JSON.stringify(user));
        successMsg.classList.add('show');
        // Redirect to home after 1.5 seconds
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    } else {
        errorMsg.textContent = '❌ Incorrect email or password. Please try again.';
        errorMsg.classList.add('show');
    }
}

// ===== SIGNUP FUNCTION =====
function handleSignup() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const terms = document.getElementById('terms').checked;

    const errorMsg = document.getElementById('signup-error');
    const successMsg = document.getElementById('signup-success');

    // Hide messages
    errorMsg.classList.remove('show');
    successMsg.classList.remove('show');

    // Validate fields
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

    // Get existing users
    const users = JSON.parse(localStorage.getItem('lamaison_users')) || [];

    // Check if email already exists
    const existing = users.find(u => u.email === email);
    if (existing) {
        errorMsg.textContent = '❌ This email is already registered! Please login instead.';
        errorMsg.classList.add('show');
        return;
    }

    // Save new user
    const newUser = {
        firstName,
        lastName,
        email,
        phone,
        password
    };

    users.push(newUser);
    localStorage.setItem('lamaison_users', JSON.stringify(users));

    // Show success
    successMsg.classList.add('show');

    // Redirect to login after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}