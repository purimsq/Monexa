# 🎵 Monexa - Russell's Music Studio

A modern desktop application for music producers to manage their beats, track sales, and monitor their music business. Built with React, Electron, and styled-components.

![Monexa Dashboard](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Electron](https://img.shields.io/badge/Electron-28.0.0-purple)
![Styled Components](https://img.shields.io/badge/Styled--Components-6.1.0-pink)

## ✨ Features

- 🎧 **Music Business Dashboard** - Track beats sold, revenue, and available inventory
- 📊 **Sales Analytics** - Monitor your music business performance
- 🎵 **Beat Library** - Organize and manage your music files (MP3/MP4)
- 👥 **Client Management** - Keep track of your music clients and collaborations
- 💰 **Financial Tracking** - Monitor income and expenses across multiple currencies
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🔔 **Toast Notifications** - Real-time feedback for user actions
- 📱 **Desktop App** - Cross-platform desktop application

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/monexa.git
   cd monexa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Package as desktop app**
   ```bash
   npm run electron-pack
   ```

## 📁 Project Structure

```
monexa/
├── public/
│   ├── images/                 # Image assets
│   ├── electron.js            # Main Electron process
│   ├── preload.js             # Preload script
│   └── index.html             # Main HTML file
├── src/
│   ├── components/            # Reusable components
│   │   ├── Sidebar.js         # Navigation sidebar
│   │   └── TopBar.js          # Top navigation bar
│   ├── pages/                 # Application pages
│   │   ├── Dashboard.js       # Main dashboard
│   │   ├── Profile.js         # Producer profile
│   │   ├── MyAccount.js       # Financial management
│   │   ├── PaymentHistory.js  # Sales history
│   │   ├── Beneficiaries.js   # Client management
│   │   ├── Documents.js       # Beat library
│   │   └── Applications.js    # Analytics
│   ├── styles/                # Global styles
│   │   └── GlobalStyles.css   # Global CSS
│   └── App.js                 # Main React component
├── package.json               # Project configuration
└── README.md                  # Project documentation
```

## 🎨 Design Features

- **Charcoal Black Theme** - Professional dark color scheme
- **Glassmorphism Effects** - Modern glass-like UI elements
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Layout** - Adapts to different screen sizes
- **Custom Illustrations** - Beautiful hand-drawn graphics

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Desktop**: Electron 28.0.0
- **Styling**: Styled Components 6.1.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Routing**: React Router DOM

## 📱 Pages Overview

### Dashboard
- Welcome card with custom illustration
- Producer profile summary
- Top clients overview
- Recent sales table
- Account balance display
- Beat library preview

### Beat Library
- Full-width table layout
- MP3/MP4 file format support
- Upload and download functionality
- Genre and status tracking
- Search and filter capabilities

### Financial Management
- Multi-currency support (USD, EUR, GBP)
- Transaction history
- Deposit/withdrawal tracking
- Sales analytics

### Client Management
- Client profiles and contact info
- Purchase history
- Revenue tracking per client
- Client statistics

## 🎯 Key Features

### For Music Producers
- **Beat Organization**: Upload, categorize, and manage your music files
- **Sales Tracking**: Monitor which beats are selling and to whom
- **Revenue Analytics**: Track your income across different platforms
- **Client Database**: Maintain relationships with artists and labels

### User Experience
- **Intuitive Navigation**: Clean sidebar with easy access to all features
- **Real-time Feedback**: Toast notifications for all user actions
- **Responsive Design**: Works perfectly on different screen sizes
- **Professional Look**: Modern UI that reflects the music industry

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run electron` - Start Electron app
- `npm run electron-pack` - Package as desktop application
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_NAME=Monexa
REACT_APP_VERSION=1.0.0
```

## 📦 Building for Distribution

### Windows (.exe)
```bash
npm run electron-pack
```

### macOS (.dmg)
```bash
npm run electron-pack
```

### Linux (.AppImage)
```bash
npm run electron-pack
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Russell Mwaura**
- Music Producer & Developer
- Nairobi, Kenya

## 🙏 Acknowledgments

- React team for the amazing framework
- Electron team for desktop app capabilities
- Styled Components for CSS-in-JS
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

**Monexa** - The best place for music producers to manage their beats and business! 🎵✨ 