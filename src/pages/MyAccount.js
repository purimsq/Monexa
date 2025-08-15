import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import GoalsModal from '../components/GoalsModal';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Minus, 
  Lock, 
  Wallet,
  Calendar,
  Shield,
  CheckCircle,
  Zap,
  Target,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
  Download
} from 'lucide-react';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  min-height: 280px;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WalletCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  border-radius: 24px;
  padding: 40px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const WalletTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WalletBalance = styled.div`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const WalletSubtitle = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
`;

const WalletActions = styled.div`
  display: flex;
  gap: 12px;
`;

const WalletButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }

  &.primary {
    background: linear-gradient(135deg, #10b981, #059669);
    border: none;

    &:hover {
      background: linear-gradient(135deg, #059669, #047857);
    }
  }
`;

const CardManagement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const CardItem = styled(motion.div)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 32px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 200px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    border-color: #1a1a1a;
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }

  &.active {
    border-color: #1a1a1a;
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
    color: white;
  }

  &.visa {
    background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
    color: white;
    border-color: #1a1a1a;
  }

  &.mastercard {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    color: white;
    border-color: #ff6b35;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CardType = styled.div`
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardNumber = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 16px;
  text-align: center;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  opacity: 0.9;
  margin-top: auto;
`;

const AuthenticationModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled(motion.button)`
  flex: 1;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &.primary {
    background: linear-gradient(135deg, #1a1a1a, #333333);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;
    border: 2px solid #e2e8f0;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }
`;

const TransactionSection = styled.div`
  margin-top: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ViewAllButton = styled(motion.button)`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TransactionItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => {
    if (props.type === 'deposit') return 'linear-gradient(135deg, #10b981, #059669)';
    if (props.type === 'withdrawal') return 'linear-gradient(135deg, #ef4444, #dc2626)';
    if (props.type === 'payment') return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
    return 'linear-gradient(135deg, #1a1a1a, #333333)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 4px;
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TransactionAmount = styled.div`
  font-weight: 700;
  color: ${props => {
    if (props.type === 'deposit') return '#10b981';
    if (props.type === 'withdrawal') return '#ef4444';
    if (props.type === 'payment') return '#3b82f6';
    return '#1e293b';
  }};
  font-size: 16px;
`;

const StatusBadge = styled.div`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    if (props.status === 'completed') return '#dcfce7';
    if (props.status === 'pending') return '#fef3c7';
    if (props.status === 'failed') return '#fee2e2';
    return '#f1f5f9';
  }};
  color: ${props => {
    if (props.status === 'completed') return '#166534';
    if (props.status === 'pending') return '#92400e';
    if (props.status === 'failed') return '#991b1b';
    return '#64748b';
  }};
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

const QuickActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;

  &:hover {
    border-color: #1a1a1a;
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    background: linear-gradient(135deg, #1a1a1a, #333333);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

// Dummy data
const walletData = {
  balance: 25450.75,
  currency: 'USD',
  lastUpdated: '2024-12-15'
};

const getMockCards = (userName) => [
  {
    id: 1,
    type: 'Visa',
    number: '4532 **** **** 1234',
    holder: userName || 'User',
    expiry: '12/26',
    cvv: '***',
    isDefault: true
  },
  {
    id: 2,
    type: 'Mastercard',
    number: '5425 **** **** 5678',
    holder: userName || 'User',
    expiry: '08/25',
    cvv: '***',
    isDefault: false
  },
  {
    id: 3,
    type: 'Visa',
    number: '4111 **** **** 9999',
    holder: userName || 'User',
    expiry: '03/27',
    cvv: '***',
    isDefault: false
  },
  {
    id: 4,
    type: 'Mastercard',
    number: '5555 **** **** 4444',
    holder: userName || 'User',
    expiry: '11/26',
    cvv: '***',
    isDefault: false
  }
];

const transactions = [
  { 
    id: 1, 
    title: 'Beat Sale - Midnight Vibes', 
    amount: '+$150.00', 
    type: 'deposit', 
    date: 'Dec 15, 2024',
    time: '14:30',
    status: 'completed',
    reference: 'TXN-001'
  },
  { 
    id: 2, 
    title: 'Studio Equipment Purchase', 
    amount: '-$200.00', 
    type: 'withdrawal', 
    date: 'Dec 12, 2024',
    time: '09:15',
    status: 'completed',
    reference: 'TXN-002'
  },
  { 
    id: 3, 
    title: 'Beat Sale - Summer Heat', 
    amount: '+$200.00', 
    type: 'deposit', 
    date: 'Dec 10, 2024',
    time: '16:45',
    status: 'completed',
    reference: 'TXN-003'
  },
  { 
    id: 4, 
    title: 'Software License Renewal', 
    amount: '-$80.00', 
    type: 'payment', 
    date: 'Dec 08, 2024',
    time: '11:20',
    status: 'pending',
    reference: 'TXN-004'
  },
  { 
    id: 5, 
    title: 'Beat Sale - Urban Flow', 
    amount: '+$180.00', 
    type: 'deposit', 
    date: 'Dec 05, 2024',
    time: '13:10',
    status: 'completed',
    reference: 'TXN-005'
  },
];

const MyAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('');
  const [pin, setPin] = useState('');
  const [showCardDetails, setShowCardDetails] = useState({});
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cardsResponse, transactionsResponse] = await Promise.all([
        apiService.getCards(),
        apiService.getTransactions({ limit: 5 })
      ]);

      if (cardsResponse.success) {
        setCards(cardsResponse.cards);
      }

      if (transactionsResponse.success) {
        setTransactions(transactionsResponse.transactions);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setAuthType('view');
    setShowAuthModal(true);
  };

  const handleDeposit = () => {
    toast.info('Deposit functionality coming soon - will integrate with payment gateway!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleWithdraw = () => {
    toast.info('Withdraw functionality coming soon - will integrate with bank APIs!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handlePayment = () => {
    navigate('/beneficiaries');
    toast.success('Redirecting to beneficiaries for payments...', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleAuthSubmit = () => {
    if (pin === '1234') { // Dummy PIN
      if (authType === 'view') {
        setShowCardDetails(prev => ({ ...prev, [selectedCard.id]: true }));
        toast.success('Card details revealed!', {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        toast.success(`${authType.charAt(0).toUpperCase() + authType.slice(1)} initiated successfully!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      setShowAuthModal(false);
      setPin('');
    } else {
      toast.error('Incorrect PIN!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleViewAllTransactions = () => {
    toast.info('Redirecting to full transaction history...', {
      position: "bottom-right",
      autoClose: 2000,
    });
    navigate('/transaction-history');
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'addCard':
        navigate('/cards');
        toast.success('Redirecting to card management...', {
          position: "bottom-right",
          autoClose: 2000,
        });
        break;
      case 'setGoal':
        // Open financial goals modal
        console.log('Opening Goals Modal...'); // Debug line
        setShowGoalsModal(true);
        break;
      case 'exportData':
        toast.success('Financial data exported successfully!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        break;
      case 'notifications':
        navigate('/notifications');
        toast.success('Redirecting to notifications...', {
          position: "bottom-right",
          autoClose: 2000,
        });
        break;
      case 'settings':
        navigate('/settings');
        toast.success('Redirecting to settings...', {
          position: "bottom-right",
          autoClose: 2000,
        });
        break;
      case 'help':
        toast.info('Help and support coming soon!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        break;
      default:
        break;
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return <Plus size={16} />;
      case 'withdrawal': return <Minus size={16} />;
      case 'payment': return <CreditCard size={16} />;
      default: return <DollarSign size={16} />;
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <Wallet size={28} />
          Finances
        </Title>
        <Subtitle>Manage your wallet, cards, and financial transactions</Subtitle>
      </Header>

      {/* Quick Actions */}
      <QuickActionsGrid>
        {[
          { title: 'Add Card', icon: <CreditCard size={20} />, action: 'addCard' },
          { title: 'Set Goal', icon: <Target size={20} />, action: 'setGoal' },
          { title: 'Export Data', icon: <Download size={20} />, action: 'exportData' },
          { title: 'Notifications', icon: <Bell size={20} />, action: 'notifications' },
          { title: 'Settings', icon: <Settings size={20} />, action: 'settings' },
          { title: 'Help', icon: <HelpCircle size={20} />, action: 'help' }
        ].map((action) => (
          <QuickActionButton
            key={action.action}
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

      {/* Main Wallet and Cards Section */}
      <Grid>
        <WalletCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WalletHeader>
            <WalletTitle>
              <Wallet size={24} />
              Digital Wallet
            </WalletTitle>
            <Shield size={24} color="rgba(255, 255, 255, 0.7)" />
          </WalletHeader>
          
          <WalletBalance>
            <DollarSign size={36} />
            ${walletData.balance.toLocaleString()}
          </WalletBalance>
          
          <WalletSubtitle>
            Last updated: {walletData.lastUpdated}
          </WalletSubtitle>
          
          <WalletActions>
            <WalletButton
              onClick={handleDeposit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="primary"
            >
              <Plus size={18} />
              Deposit
            </WalletButton>
            <WalletButton
              onClick={handleWithdraw}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Minus size={18} />
              Withdraw
            </WalletButton>
            <WalletButton
              onClick={handlePayment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap size={18} />
              Pay
            </WalletButton>
          </WalletActions>
        </WalletCard>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CardTitle>
            <CreditCard size={22} />
            Payment Cards
          </CardTitle>
                     <CardManagement style={{ flex: 1 }}>
             {cards.slice(0, 2).map((card) => (
               <CardItem
                 key={card.id}
                 onClick={() => handleCardClick(card)}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className={`${card.isDefault ? 'active' : ''} ${card.type.toLowerCase()}`}
               >
                 <CardHeader>
                   <CardType>
                     <CreditCard size={20} />
                     {card.type}
                     {card.isDefault && <CheckCircle size={16} />}
                   </CardType>
                   <Lock size={18} />
                 </CardHeader>
                 
                 <CardNumber>
                   {showCardDetails[card.id] ? card.number : '**** **** **** ****'}
                 </CardNumber>
                 
                 <CardDetails>
                   <div>
                     <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Card Holder</div>
                     <div style={{ fontWeight: '600' }}>{card.holder}</div>
                   </div>
                   <div>
                     <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Expires</div>
                     <div style={{ fontWeight: '600' }}>{showCardDetails[card.id] ? card.expiry : '**/**'}</div>
                   </div>
                   <div>
                     <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>CVV</div>
                     <div style={{ fontWeight: '600' }}>{card.cvv}</div>
                   </div>
                 </CardDetails>
               </CardItem>
             ))}
             
             {cards.length > 2 && (
               <ViewAllButton
                 onClick={() => navigate('/cards')}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 style={{ 
                   marginTop: '16px', 
                   padding: '12px 20px',
                   background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                   border: '2px solid #e2e8f0',
                   borderRadius: '12px',
                   width: '100%',
                   justifyContent: 'center'
                 }}
               >
                 View All Cards ({cards.length})
                 <ChevronRight size={16} />
               </ViewAllButton>
             )}
           </CardManagement>
        </Card>
      </Grid>

      {/* Transactions Section */}
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ minHeight: 'auto' }}
      >
        <TransactionSection>
          <SectionHeader>
            <CardTitle>
              <TrendingUp size={22} />
              Recent Transactions
            </CardTitle>
            <ViewAllButton
              onClick={handleViewAllTransactions}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All
              <ChevronRight size={16} />
            </ViewAllButton>
          </SectionHeader>
          
          <TransactionList>
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <TransactionIcon type={transaction.type}>
                  {getTransactionIcon(transaction.type)}
                </TransactionIcon>
                <TransactionInfo>
                  <TransactionTitle>{transaction.title}</TransactionTitle>
                  <TransactionDate>
                    <Calendar size={12} />
                    {transaction.date} at {transaction.time}
                  </TransactionDate>
                </TransactionInfo>
                <div style={{ textAlign: 'right' }}>
                  <TransactionAmount type={transaction.type}>
                    {transaction.amount}
                  </TransactionAmount>
                  <StatusBadge status={transaction.status}>
                    {transaction.status}
                  </StatusBadge>
                </div>
              </TransactionItem>
            ))}
          </TransactionList>
        </TransactionSection>
      </Card>

      <AnimatePresence>
        {showAuthModal && (
          <AuthenticationModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <ModalTitle>
                <Lock size={20} />
                {authType === 'view' ? 'View Card Details' : 
                 authType === 'deposit' ? 'Deposit Funds' :
                 authType === 'withdraw' ? 'Withdraw Funds' : 'Make Payment'}
              </ModalTitle>
              
              <div style={{ marginBottom: '16px', color: '#64748b', fontSize: '14px' }}>
                Enter your 4-digit PIN to continue
              </div>
              
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '18px' }}
              />
              
              <ModalButtons>
                <Button
                  className="secondary"
                  onClick={() => {
                    setShowAuthModal(false);
                    setPin('');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </Button>
                <Button
                  className="primary"
                  onClick={handleAuthSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </Button>
              </ModalButtons>
            </ModalContent>
          </AuthenticationModal>
        )}
      </AnimatePresence>

      <GoalsModal 
        isOpen={showGoalsModal} 
        onClose={() => setShowGoalsModal(false)} 
      />
    </Container>
  );
};

export default MyAccount;
