# NeoYatra - Enterprise MERN Monorepo

## Project Overview
NeoYatra is a modern, responsive, and real-time bus booking application built using the MERN stack (MongoDB, Express, React, Node.js). It demonstrates core full-stack capabilities including real-time bi-directional data flow, secure authentication, and pessimistic concurrency control to prevent double-booking.

## Features
- **Real-Time Seat Locking:** Utilizes WebSockets (`Socket.io`) to instantly lock seats across all clients during checkout.
- **Secure Authentication:** Uses `HttpOnly` secure cookies for JWT tokens to prevent Cross-Site Scripting (XSS) attacks.
- **Dynamic Theming:** Responsive Dark/Light mode using custom CSS variables.
- **Robust Search:** Filter buses by route, date, and price.
- **Admin Dashboard:** Secure analytics dashboard to manage schedules and track revenue.

## Tech Stack
- **Frontend:** React (Vite), React Router, Context API, Socket.io-client, Vanilla CSS (Tailwind/PostCSS config ready)
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.io, JWT, bcryptjs, Zod
- **Architecture:** Client-Server Monorepo

## Project Structure
```
NeoYatra/
├── neoyatra-backend/     # Express & MongoDB Backend
│   ├── config/           # DB connection & setup
│   ├── controllers/      # Route logic handlers
│   ├── middleware/       # Express middlewares (Auth, etc.)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routing definitions
│   ├── sockets/          # Socket.io event handling
│   └── validators/       # Zod validation schemas
├── src/                  # React Frontend
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context (Auth, Theme)
│   ├── pages/            # Application views
│   └── services/         # API integration
├── public/               # Static assets
└── .env.example          # Frontend environment placeholders
```

## Environment Setup
Environment variables are managed securely and should not be committed to version control.

1. Create a `.env` file in the root directory (for frontend):
   ```bash
   cp .env.example .env
   ```
2. Create a `.env` file in the `neoyatra-backend` directory (for backend):
   ```bash
   cd neoyatra-backend
   cp .env.example .env
   ```
3. Open `neoyatra-backend/.env` and replace the placeholder values with your actual secrets:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure, randomly generated string for JWT signing
   - Other configs as required.

## Installation Steps
From the root of the repository, follow these steps to install all dependencies for both the frontend and the backend.

1. **Install Backend Dependencies:**
   ```bash
   cd neoyatra-backend
   npm install
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd ..
   npm install
   ```

## Database Setup
To populate the database with mock bus data and an admin user, you can run the seed script:
```bash
cd neoyatra-backend
node seed.js
```

## Running the Application

**Running Backend:**
```bash
cd neoyatra-backend
npm run dev
```
The backend server will start at `http://localhost:5000`.

**Running Frontend:**
```bash
# From the root directory
npm run dev
```
The Vite development server will start at `http://localhost:5173`.
