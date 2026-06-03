# 🚌 NeoYatra – Real-Time Bus Booking Platform

A full-stack **MERN-based bus ticket booking system** designed with real-world software engineering practices including secure authentication, real-time seat locking, responsive UI, and scalable backend architecture.

🚀 **Live Demo:** Add Frontend Deployment Link Here
🔗 **Backend API:** Add Backend Deployment Link Here

---

## 📌 Project Overview

NeoYatra is a modern bus reservation platform that allows users to search routes, book seats, and manage bookings seamlessly.

The project focuses on implementing industry-standard concepts such as:

* Real-time seat synchronization
* Secure JWT authentication
* RESTful API architecture
* Pessimistic concurrency control
* Responsive user experience
* Scalable MERN architecture

---

## ✨ Features

### 🎫 User Features

* User Registration & Login
* Secure JWT Authentication
* Search Buses by Source & Destination
* View Bus Details
* Real-Time Seat Selection
* Booking Confirmation
* Booking History
* Responsive Mobile-Friendly UI
* Dark & Light Mode Support

### ⚡ Real-Time Features

* Live Seat Availability Updates
* Instant Seat Locking During Checkout
* Multi-user Synchronization using Socket.io
* Prevention of Double Booking

### 🛠️ Admin Features

* Manage Bus Schedules
* Monitor Bookings
* Revenue Tracking Dashboard
* Route Management

---

## 🏗️ System Architecture

```text
┌─────────────────┐
│   React (Vite) │
│    Frontend    │
└────────┬────────┘
         │
         │ REST API + WebSockets
         ▼
┌─────────────────┐
│ Express.js API │
│    Backend     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ MongoDB Atlas  │
│    Database    │
└─────────────────┘
```

### Data Flow

Frontend → REST API / Socket.io → Express Server → MongoDB Atlas

---

## 📸 Screenshots

Create a `screenshots/` folder and add project images.

```text
screenshots/
├── home-page.png
├── search-results.png
├── bus-details.png
├── seat-selection.png
├── booking-confirmation.png
└── admin-dashboard.png
```

### Recommended Screenshots

1. Home Page
2. Bus Search Results
3. Bus Details Page
4. Seat Selection Interface
5. Booking Confirmation
6. Admin Dashboard

Example:

```md
## Home Page

![Home Page](./screenshots/home-page.png)

## Seat Selection

![Seat Selection](./screenshots/seat-selection.png)
```

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Context API
* Socket.io Client
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST API
* Socket.io

### Database

* MongoDB Atlas
* Mongoose

### Authentication & Security

* JWT Authentication
* HttpOnly Cookies
* bcryptjs

### Validation

* Zod

### Deployment

* Vercel (Frontend)
* Render / Railway (Backend)
* MongoDB Atlas

---

## 📂 Project Structure

```text
NeoYatra/
│
├── neoyatra-backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── validators/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── services/
│
├── public/
├── screenshots/
└── .env.example
```

---

## ⚙️ Environment Setup

### Frontend

```bash
cp .env.example .env
```

### Backend

```bash
cd neoyatra-backend
cp .env.example .env
```

Configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/NeoYatra.git

cd NeoYatra
```

### Install Backend Dependencies

```bash
cd neoyatra-backend

npm install
```

### Install Frontend Dependencies

```bash
cd ..

npm install
```

---

## 🗄 Database Seeding

Populate sample bus routes and admin data.

```bash
cd neoyatra-backend

node seed.js
```

---

## ▶️ Running Locally

### Start Backend

```bash
cd neoyatra-backend

npm run dev
```

Backend:

```text
http://localhost:5000
```

### Start Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔒 Security Features

* JWT Authentication
* HttpOnly Cookies
* Password Hashing with bcryptjs
* Protected Routes
* Request Validation using Zod
* Secure Environment Variables

---

## 📈 Future Enhancements

* Online Payments Integration
* Email Notifications
* Live Bus Tracking
* AI-Based Route Recommendations
* Passenger Reviews & Ratings
* Docker & Kubernetes Deployment
* CI/CD Pipeline Integration

---

## 👨‍💻 Author

**Ayush Ranjan Ojha**

* MERN Stack Developer
* Full-Stack Engineering Enthusiast
* Cloud & AI Learner

---

## 📜 License

This project is licensed for educational and portfolio purposes.
