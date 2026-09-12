<img width="1254" height="1254" alt="E682D550-F330-4AD4-B5D2-D49C94628765" src="https://github.com/user-attachments/assets/6646794d-f556-4a3f-891f-117e994c8a22" />

# Velo Rides

Velo Rides is a ride-hailing mobile application developed using React Native and Expo. The application allows users to create an account, log in, select a ride type, enter pickup and destination information, review the estimated fare, select a payment method, and track the status of a ride.

The project contains both a frontend mobile application and a backend API.

## Main Features

- User registration
- User login
- Secure password hashing
- MongoDB user database
- Moto and car ride selection
- Pickup and destination entry
- Ride fare estimation
- Ride confirmation
- Ride history
- User profile
- Wallet page
- Cash payment option
- Mobile Money sandbox/demo payment
- Ride status screen
- Dark purple and gold user interface

## Technologies Used

### Frontend

- React Native
- Expo
- Expo Router
- TypeScript
- Ionicons

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- CORS
- dotenv

## Project Structure

```text
velo-app/
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── home.tsx
│   │   ├── rides.tsx
│   │   ├── wallet.tsx
│   │   ├── profile.tsx
│   │   ├── ride-confirmation.tsx
│   │   ├── payment.tsx
│   │   └── ride-status.tsx
│   │
│   └── components/
│       └── BottomNav.tsx
│
├── assets/
│
├── velo-backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── payments.js
│   │
│   └── middleware/
│
├── package.json
├── app.json
├── tsconfig.json
└── README.md
```

## Application Flow

The main application flow is:

```text
Welcome
   ↓
Login / Sign Up
   ↓
Home
   ↓
Enter Pickup & Destination
   ↓
Choose Moto or Car
   ↓
Ride Confirmation
   ↓
Choose Payment Method
   ↓
Payment / Cash
   ↓
Find Driver
   ↓
Ride Status
```

The bottom navigation also allows the user to access:

```text
Home | Rides | Wallet | Profile
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/SoniaN12/velo-rides.git
```

Enter the project:

```bash
cd velo-rides
```

---

# Frontend Setup

## 2. Install Frontend Dependencies

From the main project directory:

```bash
npm install
```

## 3. Start the Expo Application

Run:

```bash
npx expo start
```

The Expo development server will start.

For the web version, press:

```text
w
```

The application can also be tested using Expo Go on a compatible mobile device.

---

# Backend Setup

Open another terminal and enter the backend directory:

```bash
cd velo-backend
```

Install the backend dependencies:

```bash
npm install
```

The backend uses Express.js and MongoDB Atlas.

---

# Environment Variables

For security reasons, the real `.env` file is not included in this repository.

Create a new `.env` file inside:

```text
velo-backend/
```

You can use `.env.example` as a template.

Example:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
```

Replace:

```text
YOUR_MONGODB_ATLAS_CONNECTION_STRING
```

with a valid MongoDB Atlas connection string.

Replace:

```text
YOUR_JWT_SECRET
```

with a private random secret used to sign authentication tokens.

Never commit the real `.env` file to GitHub.

---

# Starting the Backend

From the `velo-backend` directory, run:

```bash
node server.js
```

When MongoDB connects successfully, the terminal should display:

```text
MongoDB connected successfully
Velo backend running on port 5000
```

The API will then be available locally at:

```text
http://localhost:5000
```

Opening this address should return a response similar to:

```json
{
  "message": "Velo API is running",
  "database": "connected"
}
```

---

# MongoDB Database

Velo uses MongoDB Atlas to store registered users.

The user model stores information such as:

- Name
- Email
- Phone number
- Hashed password
- Wallet balance
- Account creation date

Passwords are not stored as plain text. The backend hashes passwords using `bcryptjs` before storing them in MongoDB.

---

# Authentication

The backend provides registration and login endpoints.

## Register User

```text
POST /api/auth/register
```

Example request:

```json
{
  "name": "Test User",
  "phone": "+250780000001",
  "email": "test@velo.com",
  "password": "Test1234"
}
```

## Login

```text
POST /api/auth/login
```

Example:

```json
{
  "email": "test@velo.com",
  "password": "Test1234"
}
```

When the login information is correct, the backend generates a JSON Web Token (JWT).

---

# Payment System

Velo currently supports:

### Cash

The passenger can select cash and continue directly to the ride-search process.

### Mobile Money

The project contains a sandbox/demo Mobile Money payment endpoint.

```text
POST /api/payments/momo/request
```

This allows the payment workflow to be demonstrated without charging a real Mobile Money account.

The current implementation is intended for development and demonstration purposes and does not process real financial transactions.

A production version could later integrate an official Mobile Money provider API.

---

# Testing the Backend

After starting the backend, test it using:

```bash
curl http://localhost:5000
```

A successful response should show:

```json
{
  "message": "Velo API is running",
  "database": "connected"
}
```

A registration request can be tested using:

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name":"Test User",
  "phone":"+250780000001",
  "email":"test@velo.com",
  "password":"Test1234"
}'
```

A successful registration confirms that the Express API can communicate with MongoDB.

---

# Running Frontend and Backend Together

The project requires two terminal windows.

### Terminal 1 — Backend

```bash
cd velo-backend
node server.js
```

### Terminal 2 — Frontend

From the project root:

```bash
npm install
npx expo start
```

For browser testing, press:

```text
w
```

When testing through the browser on the same computer, the frontend can communicate with:

```text
http://localhost:5000
```

When testing on a physical phone with Expo Go, `localhost` refers to the phone itself. Therefore, the frontend should instead use the development computer's local network IP address, and both devices should be connected to the same network.

---

# Security

The project uses several basic security practices:

- Passwords are hashed before database storage.
- Authentication uses JSON Web Tokens.
- Database credentials are stored in environment variables.
- `.env` is excluded from Git.
- MongoDB credentials are not stored in frontend source code.
- Payment credentials should only be stored on the backend.
- The Mobile Money implementation currently uses sandbox/demo transactions rather than real financial transactions.

---

# Current Project Status

The current version demonstrates the main Velo ride-booking workflow, including authentication, MongoDB integration, ride selection, ride confirmation, payment selection, and ride status.

Some features remain demonstration features and would require additional services for a production deployment, including:

- Real-time GPS tracking
- Driver location services
- Driver/passenger matching
- Production Mobile Money processing
- Push notifications
- Production authentication/session management

---

# Author

**Mutavu Sonia Nyagatare**

App and web development studio project.

Velo Rides
