# Monexa Backend API

## Overview
Backend API server for the Monexa Music Studio Platform.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
cd backend
npm install
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Authentication (Coming Soon)
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### User Management (Coming Soon)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Project Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── routes/            # API route handlers (future)
├── models/            # Database models (future)
├── middleware/        # Custom middleware (future)
└── controllers/       # Business logic (future)
```

## Environment Variables
Create a `.env` file in the backend directory:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Future Features
- User authentication with JWT
- Database integration
- Payment processing
- File upload handling
- Real-time features with WebSockets
