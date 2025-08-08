import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

// Components
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyAccount from './pages/MyAccount';
import PaymentHistory from './pages/PaymentHistory';
import TransactionHistory from './pages/TransactionHistory';
import Cards from './pages/Cards';
import Beneficiaries from './pages/Beneficiaries';
import Documents from './pages/Documents';
import Applications from './pages/Applications';

// Global Styles
import './styles/GlobalStyles.css';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 280px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #f8fafc;
  display: flex;
  gap: 24px;
`;

const MainColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightColumn = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <ContentArea>
      <MainColumn>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/cards" element={<Cards />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </MainColumn>
      {!isDashboard && (
        <RightColumn>
          {/* Right column content for other pages can be added here */}
        </RightColumn>
      )}
    </ContentArea>
  );
}

function App() {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <TopBar />
          <AppContent />
        </MainContent>
      </AppContainer>

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: '#ffffff',
          color: '#1e293b',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}
      />
    </Router>
  );
}

export default App; 