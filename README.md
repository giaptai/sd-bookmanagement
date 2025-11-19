# Book Management System

A simple book management application built with NestJS (Backend) and Vanilla JavaScript (Frontend).

## Features

- **User Authentication**: Register and Login with JWT-based authentication
- **Role-based Access Control**:
  - ADMIN: Full CRUD operations on books
  - STUDENT: View-only access to book list
- **Book Management**: Create, Read, Update, Delete books with pagination
- **Form Validation**:
  - Password must be at least 8 characters with 1 letter and 1 number
  - Age validation (minimum 13 years old)
  - Publication year validation (4-digit number, not in the future)
- **Responsive UI**: Clean and modern interface with HTML/CSS/JavaScript

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** with Mongoose - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **class-validator** - DTO validation

### Frontend
- **Vanilla JavaScript (ES6 Modules)**
- **HTML5 & CSS3**
- **Fetch API** - HTTP requests

## Project Structure

```
book-management/
├── src/                    # NestJS Backend
│   ├── auth/              # Authentication module
│   ├── books/             # Books module
│   ├── dto/               # Data Transfer Objects
│   ├── schemas/           # Mongoose schemas
│   └── main.ts            # Application entry point
├── frontend/              # Frontend
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript modules
│   │   ├── api.js        # API layer
│   │   ├── auth.js       # Authentication UI
│   │   ├── index.js      # Books list page
│   │   └── modal.js      # Create/Edit modal
│   ├── index.html        # Main page
│   └── login.html        # Login/Register page
├── test/                  # Tests
└── package.json
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/giaptai/sd-bookmanagement
cd book-management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3001
DATABASE_URL=mongodb://localhost:27017/book-management
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=time-expire
```

### 4. Start MongoDB
Make sure MongoDB is running on your local machine or update `MONGODB_URI` with your MongoDB connection string.

## Running the Application

### Backend (NestJS)
```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm run start:prod
```
Backend runs on `http://localhost:3001`

### Frontend

**Option 1: Using Live Server (VSCode)**
- Install "Live Server" extension
- Right-click `frontend/login.html` → "Open with Live Server"
- Opens at `http://127.0.0.1:5500/frontend/login.html`

**Option 2: Using http-server**
```bash
# Install globally (one time)
npm install -g http-server

# Run from frontend folder
cd frontend
http-server -p 5500
```
Frontend runs on `http://localhost:5500`

**Option 3: Using Python**
```bash
cd frontend
python -m http.server 5500
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books (Protected routes - require JWT token)
- `GET /api/books?page=1&limit=10` - Get all books with pagination
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book (ADMIN only)
- `PATCH /api/books/:id` - Update book (ADMIN only)
- `DELETE /api/books/:id` - Delete book (ADMIN only)

## Getting Started

### Create Users

There are no default users in the database. You need to register users first:

**1. Register ADMIN user:**
- Go to `http://127.0.0.1:5500/login.html`
- Click "Register" tab
- Fill in the form and select Role: ADMIN
- Password must be at least 8 characters with 1 letter and 1 number
- User must be at least 13 years old

**2. Register STUDENT user:**
- Follow the same steps but select Role: STUDENT

**Example test accounts you can create:**
- ADMIN: admin@example.com / Admin123
- STUDENT: student@example.com / Student123

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Features Demo

### STUDENT View
- ✅ View books list with pagination
- ✅ See book details
- ❌ No Add/Edit/Delete buttons
- ❌ Read-only access

### ADMIN View
- ✅ View books list with pagination
- ✅ Create new books
- ✅ Edit existing books
- ✅ Delete books
- ✅ Full CRUD operations

## Validation Rules

### User Registration
- Firstname & Lastname: Required
- Email: Valid email format
- Password: Minimum 8 characters with at least 1 letter and 1 number
- Birthday: User must be at least 13 years old
- Role: ADMIN or STUDENT (default: STUDENT)

### Book Creation
- Title: Required
- Author: Required
- Summary: Optional
- Publication Year: Required, 4-digit number, not in the future

## License

[MIT licensed](LICENSE)

## Author

TaiG

## Support

For issues and questions, please open an issue on GitHub.
