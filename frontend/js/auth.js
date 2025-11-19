import { login, register } from './api.js';

// Get form elements
const loginFormWrapper = document.getElementById('loginForm');
const registerFormWrapper = document.getElementById('registerForm');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

// Switch between login and register forms
showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormWrapper.classList.add('hidden');
    registerFormWrapper.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerFormWrapper.classList.add('hidden');
    loginFormWrapper.classList.remove('hidden');
});

// Handle login
loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
        const result = await login(email, password);
        // Save token to localStorage
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('user', JSON.stringify(result.user));
        alert('Login successful!');
        // Redirect to index page
        window.location.href = 'index.html';
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});

// Handle register
registerFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const registerData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('registerEmail').value,
        phone: document.getElementById('phone').value || undefined,
        nationality: document.getElementById('nationality').value || undefined,
        birthday: document.getElementById('birthday').value,
        role: document.getElementById('role').value,
        password: document.getElementById('registerPassword').value
    };

    try {
        await register(registerData);
        alert('Registration successful! Please login.');
        // Switch to login form
        registerFormWrapper.classList.add('hidden');
        loginFormWrapper.classList.remove('hidden');
        registerFormElement.reset();

    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
});

// Check if already logged in
window.onload = function () {
    const token = localStorage.getItem('accessToken');
    if (token) {
        // Already logged in, redirect to index
        window.location.href = 'index.html';
    }
};
