import { createBook, updateBook } from './api.js';
import { getAll } from './index.js';

// Get modal elements
const modal = document.getElementById('myModal');
const addBtn = document.getElementById('myBtn');
const closeBtn = document.getElementsByClassName('close')[0];
const form = document.getElementById('createBookForm');
const modalTitle = document.getElementById('modalTitle');
const submitBtn = document.getElementById('submitBtn');

// Open modal when clicking "Add" button (Create mode)
addBtn.onclick = function () {
    form.reset(); // Clear form
    delete form.dataset.bookId; // Remove bookId (create mode)
    modalTitle.textContent = 'Create New Book';
    submitBtn.textContent = 'Create Book';
    modal.style.display = 'block';
}

// open modal when clicking "Edit" button (Update mode)
export function openEditModal() {
    modalTitle.textContent = 'Edit Book';
    submitBtn.textContent = 'Update Book';
    modal.style.display = 'block';
}

// Close modal
closeBtn.onclick = function () {
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Handle form submit (Create or Update)
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Get form data
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        summary: document.getElementById('summary').value || undefined,
        publicationYear: parseInt(document.getElementById('publicationYear').value)
    };
    // Check if editing or creating
    const bookId = form.dataset.bookId;
    const isEditing = !!bookId;
    try {
        if (isEditing) {
            await updateBook(bookId, bookData);
            alert('Book updated successfully!');
        } else {
            await createBook(bookData);
            alert('Book created successfully!');
        }
        modal.style.display = 'none';
        form.reset();
        delete form.dataset.bookId; // Clear bookId after submit
        // Reload book list - stay on current page
        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = parseInt(urlParams.get('page')) || 1;
        getAll(currentPage);
    } catch (error) {
        alert('Error: ' + error.message);
    }
});