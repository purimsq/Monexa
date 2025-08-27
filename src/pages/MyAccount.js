import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import apiService from '../services/api';
import GoalsModal from '../components/GoalsModal';
import PayPalLoginModal from '../components/PayPalLoginModal';
import PayPalTransferModal from '../components/PayPalTransferModal';
import { 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Minus, 
  Lock, 
  Calendar,
  Eye,
  EyeOff,
  Send,
  Download,
  Upload,
  CreditCard,
  Shield,
  CheckCircle,
  Zap,
  Target,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
  Download as DownloadIcon,
  User,
  Mail,
  AlertCircle,
  RefreshCw,
  LogOut,
  LogIn
} from 'lucide-react';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background-color: ${props => props.theme?.colors?.primary || '#ffffff'};
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  font-size: 16px;
`;

const PayPalContainer = styled.div`
  background: ${props => props.theme?.colors?.card || '#ffffff'};
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${props => props.theme?.shadows?.medium || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${props => props.theme?.colors?.borderSecondary || '#e5e7eb'};
  margin-bottom: 24px;
  ${props => props.theme?.name === 'glassmorphism' && `
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  `}
`;

const PayPalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme?.colors?.borderSecondary || '#e5e7eb'};
`;

const PayPalLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #0070ba;
`;

const PayPalStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  background: ${props => props.connected ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)'};
  color: white;
`;

const BalanceSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const BalanceLabel = styled.div`
  font-size: 16px;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  margin-bottom: 8px;
`;

const BalanceAmount = styled.div`
  font-size: ${props => props.blurred ? '32px' : '48px'};
  font-weight: 700;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  filter: ${props => props.blurred ? 'blur(4px)' : 'none'};
  transition: all 0.3s ease;
  cursor: ${props => props.blurred ? 'pointer' : 'default'};
  
  &:hover {
    filter: ${props => props.blurred ? 'blur(2px)' : 'none'};
  }
`;

const BalanceToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme?.colors?.tertiary || '#f3f4f6'};
    color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.primary ? 'linear-gradient(135deg, #0070ba, #005ea6)' : (props.theme?.colors?.tertiary || '#f3f4f6')};
  color: ${props => props.primary ? 'white' : (props.theme?.colors?.textPrimary || '#1f2937')};
  border: none;
  padding: 16px 24px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s ease;
  box-shadow: ${props => props.primary ? '0 4px 12px rgba(0, 112, 186, 0.3)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? '0 6px 20px rgba(0, 112, 186, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoginSection = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
`;

const LoginButton = styled(motion.button)`
  background: linear-gradient(135deg, #0070ba, #005ea6);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 auto;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 112, 186, 0.3);

    &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 112, 186, 0.4);
  }
`;

const TransactionsSection = styled.div`
  background: ${props => props.theme?.colors?.card || '#ffffff'};
  border-radius: 20px;
  padding: 24px;
  box-shadow: ${props => props.theme?.shadows?.medium || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${props => props.theme?.colors?.borderSecondary || '#e5e7eb'};
  ${props => props.theme?.name === 'glassmorphism' && `
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  `}
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TransactionItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: ${props => props.theme?.colors?.tertiary || '#f9fafb'};
  border: 1px solid ${props => props.theme?.colors?.borderSecondary || '#e5e7eb'};
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.type === 'send' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #10b981, #059669)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  margin-bottom: 4px;
`;

const TransactionDate = styled.div`
  font-size: 14px;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TransactionAmount = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.type === 'send' ? '#ef4444' : '#10b981'};
`;

const StatusBadge = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.status === 'completed' ? '#10b981' : props.status === 'pending' ? '#f59e0b' : '#ef4444'};
  color: white;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const QuickActionButton = styled(motion.button)`
  background: ${props => props.theme?.colors?.card || '#ffffff'};
  border: 1px solid ${props => props.theme?.colors?.borderSecondary || '#e5e7eb'};
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  ${props => props.theme?.name === 'glassmorphism' && `
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme?.shadows?.large || '0 10px 25px rgba(0, 0, 0, 0.1)'};
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0070ba, #005ea6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

// Mock PayPal data
const mockPayPalData = {
  connected: false,
  balance: 2547.89,
  currency: 'USD',
  email: 'user@example.com',
  transactions: [
  {
    id: 1,
      type: 'receive',
      title: 'Payment from John Producer',
    amount: '+$150.00', 
    date: 'Dec 15, 2024',
    time: '14:30',
    status: 'completed',
      email: 'john@producer.com'
  },
  { 
    id: 2, 
      type: 'send',
      title: 'Payment to Studio Equipment',
    amount: '-$200.00', 
    date: 'Dec 12, 2024',
    time: '09:15',
    status: 'completed',
      email: 'studio@equipment.com'
  },
  { 
    id: 3, 
      type: 'receive',
      title: 'Payment from Music Label',
      amount: '+$500.00',
    date: 'Dec 10, 2024',
    time: '16:45',
    status: 'completed',
      email: 'label@music.com'
  },
  { 
    id: 4, 
      type: 'send',
      title: 'Payment to Software License',
    amount: '-$80.00', 
    date: 'Dec 08, 2024',
    time: '11:20',
    status: 'pending',
      email: 'software@license.com'
    }
  ]
};

const MyAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [paypalData, setPaypalData] = useState(mockPayPalData);
  const [balanceBlurred, setBalanceBlurred] = useState(true);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showPayPalLoginModal, setShowPayPalLoginModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferType, setTransferType] = useState('send');
  const [loading, setLoading] = useState(false);

  // Load real PayPal data
  const loadPayPalData = async () => {
    try {
      // Check PayPal connection status
      const statusResponse = await apiService.getPayPalStatus();
      
      if (statusResponse.success && statusResponse.connected) {
        // Get real balance
        const balanceResponse = await apiService.getPayPalBalance();
        
        // Get real transactions
        const transactionsResponse = await apiService.getPayPalTransactions(10, 0);
        
        setPaypalData(prev => ({
          ...prev,
          connected: true,
          balance: balanceResponse.success ? balanceResponse.balance : prev.balance,
          transactions: transactionsResponse.success ? transactionsResponse.transactions : prev.transactions
        }));
      }
    } catch (error) {
      console.error('Error loading PayPal data:', error);
    }
  };

  // Load PayPal data on component mount
  useEffect(() => {
    loadPayPalData();
  }, []);

  const handlePayPalLogin = () => {
    setShowPayPalLoginModal(true);
  };

  const handlePayPalLoginSuccess = (data) => {
    setPaypalData(prev => ({ 
      ...prev, 
      connected: true,
      email: data.account?.email || 'Connected',
      account: data.account
    }));
    loadPayPalData(); // Refresh data
  };

  const handlePayPalLogout = async () => {
    try {
      const response = await apiService.disconnectPayPal();
      
      if (response.success) {
        setPaypalData(prev => ({ ...prev, connected: false }));
        toast.success('PayPal account disconnected successfully', {
      position: "bottom-right",
      autoClose: 3000,
    });
      } else {
        toast.error(response.message || 'Failed to disconnect PayPal account', {
      position: "bottom-right",
      autoClose: 3000,
    });
      }
    } catch (error) {
      console.error('PayPal logout error:', error);
      toast.error('Failed to disconnect PayPal account', {
      position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleSendMoney = () => {
    if (!paypalData.connected) {
      toast.error('Please connect your PayPal account first', {
          position: "bottom-right",
          autoClose: 3000,
        });
      return;
    }
    setTransferType('send');
    setShowTransferModal(true);
  };

  const handleRequestMoney = () => {
    if (!paypalData.connected) {
      toast.error('Please connect your PayPal account first', {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    setTransferType('request');
    setShowTransferModal(true);
  };

  const handleTransferSuccess = () => {
    loadPayPalData(); // Refresh data after transfer
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'setGoal':
        setShowGoalsModal(true);
        break;
      case 'exportData':
        toast.success('PayPal transaction data exported successfully!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        toast.info('PayPal integration help coming soon!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        break;
      default:
        break;
    }
  };

  const getTransactionIcon = (type) => {
    return type === 'send' ? <Send size={16} /> : <Download size={16} />;
  };

  return (
    <Container theme={theme}>
      <Header>
        <Title theme={theme}>
          <DollarSign size={28} />
          PayPal Finance Hub
        </Title>
        <Subtitle theme={theme}>
          Manage your PayPal account, send and receive money securely
        </Subtitle>
      </Header>

      {/* PayPal Integration Section */}
      <PayPalContainer theme={theme}>
        <PayPalHeader theme={theme}>
          <PayPalLogo>
            <div style={{ color: '#0070ba', fontSize: '28px' }}>PayPal</div>
            {paypalData.connected && <CheckCircle size={20} color="#10b981" />}
          </PayPalLogo>
          <PayPalStatus connected={paypalData.connected}>
            {paypalData.connected ? (
              <>
                <CheckCircle size={16} />
                Connected
              </>
            ) : (
              <>
                <AlertCircle size={16} />
                Not Connected
              </>
            )}
          </PayPalStatus>
        </PayPalHeader>

        {paypalData.connected ? (
          <>
            <BalanceSection>
              <BalanceLabel theme={theme}>Available Balance</BalanceLabel>
              <BalanceAmount 
                theme={theme} 
                blurred={balanceBlurred}
                onClick={() => setBalanceBlurred(!balanceBlurred)}
              >
                <DollarSign size={balanceBlurred ? 24 : 32} />
                ${paypalData.balance.toLocaleString()}
                <BalanceToggle theme={theme}>
                  {balanceBlurred ? <Eye size={20} /> : <EyeOff size={20} />}
                </BalanceToggle>
              </BalanceAmount>
              <div style={{ marginTop: '12px' }}>
                <ActionButton
                  onClick={loadPayPalData}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
                  <RefreshCw size={16} />
                  Refresh Balance
                </ActionButton>
            </div>
            </BalanceSection>

            <ActionButtons>
              <ActionButton
                primary
                onClick={handleSendMoney}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                Send Money
              </ActionButton>
              <ActionButton
                onClick={handleRequestMoney}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
                <Download size={20} />
                Request Money
              </ActionButton>
            </ActionButtons>

            <div style={{ textAlign: 'center' }}>
              <ActionButton
                onClick={handlePayPalLogout}
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white' }}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
              >
                <LogOut size={16} />
                Disconnect PayPal
              </ActionButton>
                   </div>
          </>
        ) : (
                  <LoginSection theme={theme}>
          <div style={{ marginBottom: '24px', color: theme?.colors?.textSecondary || '#6b7280' }}>
            Connect your PayPal account to start managing your finances
                   </div>
            <LoginButton
              onClick={handlePayPalLogin}
              disabled={loading}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
            >
              {loading ? <RefreshCw size={20} className="spin" /> : <LogIn size={20} />}
              {loading ? 'Connecting...' : 'Connect PayPal Account'}
            </LoginButton>
          </LoginSection>
        )}
      </PayPalContainer>

      {/* Quick Actions */}
      <QuickActionsGrid>
        {[
          { title: 'Set Financial Goal', icon: <Target size={20} />, action: 'setGoal' },
          { title: 'Export Data', icon: <DownloadIcon size={20} />, action: 'exportData' },
          { title: 'Notifications', icon: <Bell size={20} />, action: 'notifications' },
          { title: 'Settings', icon: <Settings size={20} />, action: 'settings' },
          { title: 'Help & Support', icon: <HelpCircle size={20} />, action: 'help' }
        ].map((action) => (
          <QuickActionButton
            key={action.action}
            theme={theme}
            onClick={() => handleQuickAction(action.action)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="icon">
              {action.icon}
            </div>
            {action.title}
          </QuickActionButton>
        ))}
      </QuickActionsGrid>

      {/* Recent Transactions */}
      <TransactionsSection theme={theme}>
          <SectionHeader>
          <SectionTitle theme={theme}>
              <TrendingUp size={22} />
            Recent PayPal Transactions
          </SectionTitle>
          <ActionButton
            onClick={() => navigate('/transaction-history')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              View All
              <ChevronRight size={16} />
          </ActionButton>
          </SectionHeader>
          
          <TransactionList>
          {paypalData.transactions && paypalData.transactions.length > 0 ? (
            paypalData.transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id || transaction.transaction_id}
                theme={theme}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <TransactionIcon type={transaction.type}>
                  {getTransactionIcon(transaction.type)}
                </TransactionIcon>
                <TransactionInfo>
                  <TransactionTitle theme={theme}>
                    {transaction.note || `${transaction.type} transaction`}
                  </TransactionTitle>
                  <TransactionDate theme={theme}>
                    <Calendar size={12} />
                    {new Date(transaction.created_at).toLocaleDateString()} at {new Date(transaction.created_at).toLocaleTimeString()}
                  </TransactionDate>
                </TransactionInfo>
                <div style={{ textAlign: 'right' }}>
                  <TransactionAmount type={transaction.type}>
                    {transaction.type === 'send' ? '-' : '+'}${transaction.amount}
                  </TransactionAmount>
                  <StatusBadge status={transaction.status}>
                    {transaction.status}
                  </StatusBadge>
                </div>
              </TransactionItem>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: theme?.colors?.textSecondary || '#6b7280' }}>
              No transactions yet. Connect your PayPal account to see your transaction history.
              </div>
          )}
        </TransactionList>
      </TransactionsSection>

      <GoalsModal 
        isOpen={showGoalsModal} 
        onClose={() => setShowGoalsModal(false)} 
      />

      <PayPalLoginModal
        isOpen={showPayPalLoginModal}
        onClose={() => setShowPayPalLoginModal(false)}
        onSuccess={handlePayPalLoginSuccess}
        theme={theme}
      />

      <PayPalTransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        type={transferType}
        onSuccess={handleTransferSuccess}
        theme={theme}
      />
    </Container>
  );
};

export default MyAccount;
