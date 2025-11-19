const API_URL = 'http://localhost:3001/api';

function getToken() {
    return localStorage.getItem('accessToken');
}

async function handleResponse(res) {
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || `HTTP error! status: ${res.status}`);
    }
    return await res.json();
}

// login
export async function login(email, password) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return await handleResponse(res);
    } catch (e) {
        console.error('Login error:', e);
        throw e;
    }
}

// register
export async function register(userData) {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await handleResponse(res);
    } catch (e) {
        console.error('Register error:', e);
        throw e;
    }
}

// get books
export async function getBooks(page = 1, limit = 10) {
    try {
        const res = await fetch(`${API_URL}/books?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        return await handleResponse(res);
    } catch (e) {
        console.error('Get books error:', e);
        throw e;
    }
}

// detail
export async function getBookById(id) {
    try {
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
        });
        return await handleResponse(res);
    } catch (e) {
        console.error('Get book by ID error:', e);
        throw e;
    }
}

// create
export async function createBook(bookData) {
    try {
        const res = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        return await handleResponse(res);
    } catch (e) {
        console.error('Create book error:', e);
        throw e;
    }
}

// update
export async function updateBook(id, bookData) {
    try {
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        return await handleResponse(res);
    } catch (e) {
        console.error('Update book error:', e);
        throw e;
    }
}

// remove
export async function deleteBook(id) {
    try {
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return await handleResponse(res);
    } catch (e) {
        console.error('Delete book error:', e);
        throw e;
    }
}