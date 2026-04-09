# 🍽️ LaMaison Restaurant Website

A full-stack restaurant website built with HTML, CSS, JavaScript and Node.js + SQLite backend.

## 🚀 Pages
- Home Page
- Menu Page (with filter and search)
- Login & Sign Up (with JWT authentication)
- About Page
- Contact Page
- Individual Food Page
- Services Page

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Local Storage

### Backend
- Node.js + Express
- SQLite Database
- REST API
- bcryptjs (password hashing)
- JWT (authentication tokens)

## ▶️ How to Run

### 1. Start the Backend Server
cd backend
node server.js

### 2. Open the Frontend
Open `index.html` with VS Code Live Server

### 3. API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/menu | Get all menu items |
| GET | /api/menu/category/:cat | Filter by category |
| GET | /api/menu/search/:query | Search menu |
| POST | /api/orders | Place an order |
| GET | /api/orders | Get all orders |
| POST | /api/contact | Send contact message |

## 👩‍💻 Developer
Thisuli — 2026