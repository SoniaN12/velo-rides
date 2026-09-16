<img width="819" height="817" alt="IMG_0117" src="https://github.com/user-attachments/assets/06e09a6b-ef3d-456e-830d-a5841d02355e" />

# 🏍️ Velo Rides

**Velo Rides** is a mobile ride-hailing application designed to make motorcycle and car transportation simple, fast, and accessible.

The application was developed using **React Native with Expo** for the mobile frontend and **Node.js, Express, and MongoDB Atlas** for the backend. It includes user authentication, ride booking, payment selection, ride tracking, and ride history.

---

## 📱 About the Project

Velo Rides allows users to create an account, securely log in, enter their pickup location and destination, select a ride type, choose a payment method, and confirm their ride.

The application connects to a backend API that manages users and rides. MongoDB Atlas is used to store application data.

The project currently supports **Moto** and **Car** ride options and includes a simulated Mobile Money payment system for development and testing.

---

## ✨ Main Features

- User registration
- Secure user login
- Persistent login sessions
- Password hashing
- JWT authentication
- Pickup and destination selection
- Moto and Car ride options
- Ride fare information
- Ride confirmation
- Cash payment option
- Mobile Money payment simulation
- Ride status tracking
- Ride history
- User-specific ride records
- Wallet screen
- User profile
- Bottom navigation
- Dark purple and gold interface

---

## 🛠️ Technologies Used

### Frontend

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- Expo Vector Icons

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- CORS
- dotenv

---

## 📂 Project Structure

```text
velo-app/
│
├── src/
│   ├── app/
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── home.tsx
│   │   ├── rides.tsx
│   │   ├── wallet.tsx
│   │   ├── profile.tsx
│   │   ├── ride-confirmation.tsx
│   │   ├── payment.tsx
│   │   ├── ride-status.tsx
│   │   └── _layout.tsx
│   │
│   ├── components/
│   │   └── BottomNav.tsx
│   │
│   └── utils/
│       └── authStorage.ts
│
├── velo-backend/
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   └── Ride.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── rides.js
│   │   └── payments.js
│   │
│   └── middleware/
│       └── auth.js
│
├── package.json
└── README.md
```

---

## 🔐 User Authentication

Velo Rides uses secure authentication to identify users.

When a new user registers, their password is hashed using **bcryptjs** before being stored in MongoDB.

When the user logs in, the backend checks the entered password against the hashed password stored in the database.

After successful authentication, the backend creates a **JSON Web Token (JWT)**.

The mobile application stores the login session locally so that the user does not need to sign in again every time they book a ride.

Protected API requests use the token in the following format:

```text
Authorization: Bearer <token>
```

This also allows rides to be associated with the correct user account.

---

## 🚕 Ride Booking Process

The main application flow is:

```text
Create Account / Login
          ↓
        Home
          ↓
Enter Pickup Location
          ↓
Enter Destination
          ↓
Choose Moto or Car
          ↓
 Ride Confirmation
          ↓
Choose Payment Method
          ↓
   Confirm Ride
          ↓
    Ride Status
          ↓
    Ride History
```

Users can later view their previous rides from the **Rides** section.

---

## 💳 Payment

Velo currently provides two payment options:

### Cash

The user can choose to pay the driver using cash.

### Mobile Money

The application also contains a **Mobile Money payment simulation** for development and demonstration purposes.

The current implementation does not process real Mobile Money transactions.

A future version of Velo can integrate the official **MTN MoMo API** to support real payments.

---

## 🗄️ Database

The application uses **MongoDB Atlas** as its cloud database.

MongoDB stores information such as:

- User accounts
- Hashed passwords
- User email addresses
- Ride information
- Pickup locations
- Destinations
- Ride types
- Fares
- Payment methods
- Payment status
- Ride status

Each authenticated ride is connected to the user who created it.

---

## 🔒 Security

Several security measures are included in the application:

- Password hashing using bcryptjs
- JWT-based authentication
- Protected backend routes
- User-specific ride information
- Environment variables for sensitive information
- Persistent authenticated sessions
- MongoDB credentials kept outside the application source code

Sensitive information such as MongoDB credentials and JWT secrets should never be uploaded to GitHub.

---

## ⚙️ Environment Variables

The backend requires a `.env` file.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

The real `.env` file should be included in `.gitignore` and should **never be committed to GitHub**.

---


## 📲 Running the Velo Mobile App

From the main Velo project directory, install the dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Open **Expo Go** on an Android device and scan the QR code displayed in the terminal.

For local development, the Android phone and development computer should be connected to the same network so that the mobile application can communicate with the backend.

---

## 🎨 User Interface

Velo uses a consistent **dark purple and gold** design.

The interface includes:

- Dark purple backgrounds
- Gold buttons and highlights
- Simple navigation
- Ride selection cards
- Payment options
- Ride status information
- Profile and wallet screens

The design is intended to provide a simple and modern mobile experience.

---

## 🚀 Future Improvements

The application can be expanded with:

- Official MTN MoMo integration
- Live GPS location
- Google Maps or another mapping service
- Automatic pickup detection
- Distance-based fare calculation
- Driver registration and authentication
- Automatic driver matching
- Real-time driver location
- Real-time ride tracking
- Push notifications
- Ride cancellation
- Driver and passenger ratings
- Reviews
- Emergency/SOS features
- Production backend deployment
- iOS support and further Android optimization

---

## 🎯 Project Goal

The goal of Velo Rides is to demonstrate how modern mobile and backend technologies can be combined to create a practical ride-hailing platform.

The project focuses on secure authentication, database integration, ride management, payment selection, and a simple mobile user experience.

---

## 👩‍💻 Author

**Mutavu Sonia Nyagatare**

Software Engineering Project
