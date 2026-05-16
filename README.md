# TrippersApp - TripTide

A comprehensive trip planning application that helps users discover tourist destinations, plan itineraries, and manage their travel journeys.

## Overview

TrippersApp (TripTide) is a full-stack web application designed to simplify travel planning. The platform enables users to search for tourist locations along their routes, create customized itineraries, and manage their trips with an intuitive interface. Built with a modern tech stack, the application provides geospatial search capabilities, user authentication, and personalized trip management.

## Purpose

The application addresses the common challenge of discovering attractions and planning stops during road trips. By leveraging geospatial data and intelligent route planning, users can:

- Discover tourist attractions along their travel routes
- Filter destinations by activities and interests
- Create, save, and manage detailed trip itineraries
- Track ongoing trips and upcoming journeys
- Connect with other travelers

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Native Driver)
- **Authentication**: JWT (JSON Web Tokens) with refresh token mechanism
- **Email Service**: Nodemailer for email verification and password reset
- **Security**: bcrypt for password hashing
- **Development Tools**: 
  - ts-node for TypeScript execution
  - nodemon for hot-reloading
  - morgan for HTTP request logging

### Frontend
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM v6
- **Maps Integration**: 
  - Mapbox GL JS
  - React Map GL
  - Mapbox Directions & Geocoder
- **UI Libraries**:
  - FontAwesome for icons
  - Lucide React for additional icons
  - Framer Motion for animations
  - AOS (Animate On Scroll)
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (v6 or higher)
- Git

### Environment Setup

#### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/TripTide

# JWT Secrets
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here

# Password Hashing
SALT_ROUNDS=10

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Client URL
CLIENT_URL=http://localhost:5173
```

#### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=your_mapbox_access_token_here
```

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd TrippersApp
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Running the Application

#### Start MongoDB

Ensure MongoDB is running on your local machine:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

#### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend application will be available at `http://localhost:5173`

## Project Structure

```
TrippersApp/
├── backend/
│   ├── config/           # Configuration files (DB, JWT, collections)
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware (auth)
│   ├── routes/           # API route definitions
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── server.ts         # Application entry point
├── frontend/
│   ├── src/
│   │   ├── Components/   # React components
│   │   ├── Pages/        # Page components
│   │   └── App.tsx       # Root component
│   └── package.json
├── docs/                 # Documentation (see docs folder)
└── README.md
```

## Key Features

### User Authentication
- Email-based registration with verification
- Secure login with JWT tokens
- Password reset via OTP
- Token refresh mechanism for extended sessions

### Trip Planning
- Geospatial search for tourist locations
- Activity-based filtering
- Route-based destination discovery
- Custom itinerary creation

### Itinerary Management
- Save and organize trip plans
- Edit existing itineraries
- Delete unwanted trips
- Track ongoing journeys

### Social Features
- User search functionality
- Profile management with image upload
- Contact messaging system

## API Documentation

For detailed API documentation, see:
- [API Reference](./docs/API_REFERENCE.md)
- [Authentication Flow](./docs/AUTHENTICATION.md)

## Architecture

For detailed architecture documentation, see:
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)

## Development Guide

For onboarding and contribution guidelines, see:
- [Onboarding Guide](./docs/ONBOARDING.md)

## Scripts

### Backend
```bash
npm run dev     # Start development server with hot-reload
npm start       # Start production server
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Security Considerations

- Passwords are hashed using bcrypt with configurable salt rounds
- JWT tokens have short expiration times (30 minutes for access tokens)
- Refresh tokens enable secure session management
- Email verification required before account activation
- OTP-based password reset with time expiration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Support

For issues and questions, please use the contact form in the application or open an issue in the repository.
