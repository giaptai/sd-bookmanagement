import { openEditModal } from './modal.js';
import { getBooks, getBookById, deleteBook } from './api.js';

window.onload = function () {
    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    if (!token) {
        // Not logged in, redirect to login page
        window.location.href = 'login.html';
        return;
    }

    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.firstname) {
        document.querySelector('main span').textContent = `Welcome: ${user.firstname} ${user.lastname} (${user.role})`;
    }

    // Hide Add button for STUDENT role
    if (user.role === 'STUDENT') {
        const addButton = document.getElementById('myBtn');
        if (addButton) {
            addButton.style.display = 'none';
        }
    }

    // Get page from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    getAll(page);

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function () {
        const confirmed = confirm('Are you sure you want to logout?');
        if (confirmed) {
            // Clear localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');

            // Redirect to login page
            window.location.href = 'login.html';
        }
    });
};

// Handle browser back/forward buttons
window.onpopstate = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;

    // Don't push state when going back/forward
    loadPageWithoutPush(page);
};

// Load page without pushing to history (for back/forward)
async function loadPageWithoutPush(page) {
    try {
        const result = await getBooks(page);
        renderBookList(result, page);
    } catch (e) {
        console.error(e.message);
        alert('Error loading books');
    }
}

function formatDateVN(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}

// Helper function to render book list and pagination
function renderBookList(result, page) {
    let data = ``;

    // Get user role from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'ADMIN';

    if (result) {
        const totalPages = result.meta.totalPages;

        // Build pagination
        let p = '';

        // Previous button
        if (page > 1) {
            p += `<li><a href="javascript:void(0)" onClick="getAll(${page - 1})">&laquo;</a></li>`;
        } else {
            p += `<li class="disabled"><a href="javascript:void(0)">&laquo;</a></li>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (page === i) {
                p += `<li><a href="javascript:void(0)" class="active">${i}</a></li>`;
            } else {
                p += `<li><a href="javascript:void(0)" onClick="getAll(${i})">${i}</a></li>`;
            }
        }

        // Next button
        if (page < totalPages) {
            p += `<li><a href="javascript:void(0)" onClick="getAll(${page + 1})">&raquo;</a></li>`;
        } else {
            p += `<li class="disabled"><a href="javascript:void(0)">&raquo;</a></li>`;
        }

        document.getElementById('pagination').innerHTML = p;

        let ord = (page - 1) * 10 + 1;
        if (result.data && result.data.length > 0) {
            for (let book of result.data) {
                // Build actions column based on role
                let actionsColumn = '';
                if (isAdmin) {
                    actionsColumn = `<td>
                        <div style="display: flex; flex-wrap: wrap; gap:12px;">
                            <button type="button" onClick="getById('${book._id}')">Edit</button>
                            <button type="button" onClick="remove('${book._id}')">Remove</button>
                        </div>
                    </td>`;
                } else {
                    actionsColumn = `<td>View only</td>`;
                }

                data += `<tr>
                <td>${ord++}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publicationYear}</td>
                <td>${formatDateVN(book.createdAt)}</td>
                <td>${formatDateVN(book.updatedAt)}</td>
                ${actionsColumn}
            </tr>`;
            }
        } else {
            data = `<tr>
                <td colspan="7">No Data</td>
            </tr>`;
        }
    } else {
        data = `<tr>
                <td colspan="7">No Data</td>
            </tr>`;
    }

    document.querySelector('tbody').innerHTML = data;
}

window.getById = getById;
window.getAll = getAll;
window.remove = remove;

export async function getAll(page = 1) {
    // Update URL with page parameter
    const newUrl = `${window.location.pathname}?page=${page}`;

    // Use replaceState for initial load, pushState for navigation
    if (window.history.state === null) {
        window.history.replaceState({ page }, '', newUrl);
    } else {
        window.history.pushState({ page }, '', newUrl);
    }

    try {
        const result = await getBooks(page);
        renderBookList(result, page);
    } catch (e) {
        console.error(e.message);
        alert('Error loading books');
    }
}

async function getById(id) {
    try {
        const result = await getBookById(id);

        // Fill data into form
        document.getElementById('title').value = result.title;
        document.getElementById('author').value = result.author;
        document.getElementById('summary').value = result.summary || '';
        document.getElementById('publicationYear').value = result.publicationYear;

        // Store book ID for update
        document.getElementById('createBookForm').dataset.bookId = id;

        // Open modal
        openEditModal();
    } catch (e) {
        console.error(e.message);
        alert('Error loading book data');
    }
}

async function remove(id) {
    // Confirm before delete
    const confirmed = confirm('Are you sure you want to delete this book?');
    if (!confirmed) return;

    try {
        await deleteBook(id);
        alert('Book deleted successfully!');
        // Reload book list - stay on current page
        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = parseInt(urlParams.get('page')) || 1;
        getAll(currentPage);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
