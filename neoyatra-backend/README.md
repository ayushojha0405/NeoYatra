# NeoYatra Backend

A complete Node.js + Express + MongoDB backend API for the NeoYatra bus booking application.

## 🚀 Features

- User authentication (JWT-based)
- Bus search and filtering
- Seat availability checking
- Booking management
- RESTful API design

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Navigate to the backend directory:**
   ```bash
   cd neoyatra-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `neoyatra-backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_secret_key_here
   ```

   **For MongoDB Atlas:**
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/neoyatra?retryWrites=true&w=majority`

   **For local MongoDB:**
   - Install MongoDB locally
   - Use: `mongodb://localhost:27017/neoyatra`

   **JWT Secret:**
   - Use any random string (e.g., `your_super_secret_jwt_key_here`)

4. **Seed the database (optional but recommended):**
   ```bash
   node seed.js
   ```
   This will populate your database with sample bus data.

5. **Start the server:**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Returns:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Buses

- `GET /api/buses` - Search buses
  - Query params: `source`, `destination`, `date`, `maxPrice`
  - Example: `/api/buses?source=Delhi&destination=Lucknow&maxPrice=1500`

- `GET /api/buses/:id` - Get a single bus by ID

### Bookings

- `POST /api/bookings` - Create a new booking (Protected)
  - Requires `x-auth-token` header
  ```json
  {
    "busId": "bus_id_here",
    "seats": ["1A", "2B"],
    "passengers": [
      { "name": "John Doe", "age": "25", "gender": "Male" }
    ]
  }
  ```

- `GET /api/bookings/my` - Get user's bookings (Protected)
  - Requires `x-auth-token` header
  - Returns bookings with populated bus details

## 🔒 Authentication

Protected endpoints require the `x-auth-token` header with a valid JWT token.

Example:
```javascript
axios.get('/api/bookings/my', {
  headers: {
    'x-auth-token': 'your_jwt_token_here'
  }
})
```

## 📁 Project Structure

```
neoyatra-backend/
├── models/
│   ├── User.js       # User model
│   ├── Bus.js        # Bus model
│   ├── Booking.js    # Booking model
├── routes/
│   ├── auth.js       # Authentication routes
│   ├── buses.js      # Bus routes
│   ├── bookings.js   # Booking routes
├── controllers/
│   ├── authController.js
│   ├── busController.js
│   └── bookingController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── config/
│   └── db.js
├── server.js         # Express server setup
├── seed.js           # Database seeder
├── package.json
└── .env              # Environment variables (not in git)
```

## 🧪 Testing the API

You can use tools like Postman or Thunder Client (VS Code extension) to test the API endpoints.

Example with curl:

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

1. **MongoDB connection error:**
   - Check your `MONGO_URI` in `.env`
   - Ensure MongoDB is running (if local)
   - Verify network access (if using Atlas)

2. **Port already in use:**
   - Change `PORT` in `.env` to a different port
   - Or kill the process using port 5000

3. **JWT secret error:**
   - Ensure `JWT_SECRET` is set in `.env`
   - The secret should be a random string

## 📝 License

ISC

## 👤 Author

NeoYatra Team

