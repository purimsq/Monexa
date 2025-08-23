# Monexa - Financial Management App

A modern financial management application with glassmorphism UI design.

## Features
- Glassmorphism theme with dynamic accent colors
- Secure data export functionality
- Two-step account deletion process
- PayPal and M-Pesa payment integrations
- Real-time notifications

## Deployment
This app is deployed on GitHub Pages at: https://purimsq.github.io/Monexa

# 🎵 Monexa - Music Production Finance Platform

A comprehensive financial management platform designed specifically for music producers, featuring advanced media playback capabilities and integrated financial tools.

## ✨ Features

### 🎬 Advanced Media Player
- **YouTube Music Style Interface** - Minimized player with hover controls
- **Multi-format Support** - MP3, WAV, MP4 video playback
- **Seekable Progress Bar** - Click to jump to any position
- **Window States** - Windowed, minimized (bottom-right), and fullscreen modes
- **Authenticated Streaming** - Secure file access with JWT tokens

### 💰 Financial Management
- **Goal Setting** - Set and track financial objectives
- **Card Management** - Add and manage credit/debit cards
- **Transaction History** - Complete transaction tracking
- **Beneficiary Management** - Client and payment recipient management
- **Data Export** - Export financial data via email

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure session management
- **Session Persistence** - Stay logged in until app closure
- **Password Hashing** - bcrypt security
- **Rate Limiting** - API protection

### 🖥️ Cross-Platform
- **Electron Desktop App** - Native desktop experience
- **Web Browser Support** - Full browser compatibility
- **Responsive Design** - Mobile-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monexa
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Initialize the database**
   ```bash
   npm run init-db
   ```

5. **Create demo user** (optional)
   ```bash
   node create-demo-user.js
   ```

### Running the Application

#### Option 1: Browser Only
```bash
# Terminal 1 - Start backend
cd backend
npm start

# Terminal 2 - Start frontend
npm start
```

#### Option 2: Electron + Browser
```bash
# Terminal 1 - Start backend
.\start-backend.bat

# Terminal 2 - Start both frontend and Electron
npm run electron-dev
```

### Default Credentials
- **Email**: `demo@monexa.com`
- **Password**: `password123`

## 📁 Project Structure

```
monexa/
├── src/                     # Frontend React application
│   ├── components/          # Reusable React components
│   │   ├── MediaPlayer.js   # Advanced media player component
│   │   ├── Auth*.js         # Authentication components
│   │   └── *Modal.js        # Modal components
│   ├── pages/               # Application pages
│   ├── contexts/            # React contexts
│   └── services/            # API services
├── backend/                 # Node.js/Express backend
│   ├── routes/              # API route handlers
│   ├── middleware/          # Express middleware
│   ├── config/              # Configuration files
│   ├── scripts/             # Database scripts
│   └── services/            # External services (email)
├── public/                  # Static files and Electron main process
│   ├── electron.js          # Electron main process
│   └── preload.js           # Electron preload script
└── backend/uploads/         # User uploaded files (gitignored)
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - User interface library
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animations and transitions
- **React Router** - Client-side routing
- **React Toastify** - Toast notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **SQLite3** - Lightweight database
- **JWT** - Authentication tokens
- **bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security headers

### Desktop
- **Electron** - Cross-platform desktop app framework

## 🎵 Media Player Features

The Monexa media player is designed with YouTube Music inspiration:

### Window States
- **Windowed** (800x600px) - Default centered view with full controls
- **Minimized** (300x230px) - Bottom-right compact view with hover controls
- **Maximized** - Fullscreen playback

### Controls
- Play/Pause, Skip Forward/Backward
- Volume control with mute
- Seekable progress bar
- Download and delete options
- Windows-style title bar (minimize, maximize, close)

### Hover Behavior (Minimized Mode)
- Clean view showing only media content
- Controls appear on hover with smooth animations
- YouTube-style red progress bar
- Floating round buttons for maximize/close

## 📊 Database Schema

The application uses SQLite with the following main tables:
- `users` - User accounts and profiles
- `cards` - User payment cards
- `transactions` - Financial transactions
- `beneficiaries` - Payment recipients
- `documents` - Uploaded media files
- `goals` - Financial goals
- `applications` - User applications
- `notifications` - System notifications

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Media
- `GET /api/documents` - List user documents
- `POST /api/documents/upload` - Upload new media
- `GET /api/documents/:id/stream` - Stream media file
- `GET /api/documents/:id/download` - Download media file

### Financial
- `GET /api/cards` - List user cards
- `POST /api/cards` - Add new card
- `GET /api/transactions` - Transaction history
- `GET /api/goals` - Financial goals
- `POST /api/goals` - Create new goal

## 🚦 Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-restart
```

### Frontend Development
```bash
npm start  # Start React development server
```

### Linting
```bash
npm run lint      # Frontend linting
cd backend && npm run lint  # Backend linting
```

## 📱 Electron Features

- Native desktop application
- System tray integration
- File system access for media files
- Native window controls
- Auto-updater ready structure

## 🔒 Security Features

- JWT-based authentication
- CORS configuration
- Rate limiting on API endpoints
- File upload validation
- SQL injection protection
- Password strength requirements

## 🌟 Recent Updates

### YouTube Music Style Player
- Redesigned minimized player interface
- Hover-activated controls
- Improved positioning (bottom-right)
- Enhanced visual feedback
- Taller minimized view (230px height)

### Backend Integration
- Full API integration replacing localStorage
- Real-time data synchronization
- Secure file streaming
- Session management
- Complete CRUD operations

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ for music producers worldwide** 🎵