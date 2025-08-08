import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { CreditCard, DollarSign, Euro, PoundSterling, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
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
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
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

const BalanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const BalanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CurrencyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const CurrencyInfo = styled.div`
  flex: 1;
`;

const CurrencyName = styled.div`
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
`;

const CurrencyAmount = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const TransactionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.type === 'deposit' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
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
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.type === 'deposit' ? '#10b981' : '#ef4444'};
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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

const transactions = [
  { id: 1, title: 'Beat Sale - Midnight Vibes', amount: '+$150', type: 'deposit', date: 'Dec 15, 2024' },
  { id: 2, title: 'Studio Equipment', amount: '-$200', type: 'withdrawal', date: 'Dec 12, 2024' },
  { id: 3, title: 'Beat Sale - Summer Heat', amount: '+$200', type: 'deposit', date: 'Dec 10, 2024' },
  { id: 4, title: 'Software License', amount: '-$80', type: 'withdrawal', date: 'Dec 08, 2024' },
  { id: 5, title: 'Beat Sale - Urban Flow', amount: '+$180', type: 'deposit', date: 'Dec 05, 2024' },
];

const MyAccount = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const handleDeposit = () => {
    toast.success('Deposit initiated successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    });
    setShowDepositModal(false);
  };

  const handleWithdrawal = () => {
    toast.success('Withdrawal initiated successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    });
    setShowWithdrawalModal(false);
  };

  return (
    <Container>
      <Header>
        <Title>
          <CreditCard size={28} />
          Finances
        </Title>
        <Subtitle>Manage your music business finances and transactions</Subtitle>
      </Header>

      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle>
            <DollarSign size={20} />
            Account Balances
          </CardTitle>
          <BalanceGrid>
            <BalanceItem>
              <CurrencyIcon>
                <DollarSign size={16} />
              </CurrencyIcon>
              <CurrencyInfo>
                <CurrencyName>Dollar</CurrencyName>
                <CurrencyAmount>$20,000.00</CurrencyAmount>
              </CurrencyInfo>
            </BalanceItem>
            <BalanceItem>
              <CurrencyIcon>
                <Euro size={16} />
              </CurrencyIcon>
              <CurrencyInfo>
                <CurrencyName>Euro</CurrencyName>
                <CurrencyAmount>€ 20,000.00</CurrencyAmount>
              </CurrencyInfo>
            </BalanceItem>
            <BalanceItem>
              <CurrencyIcon>
                <PoundSterling size={16} />
              </CurrencyIcon>
              <CurrencyInfo>
                <CurrencyName>Pound</CurrencyName>
                <CurrencyAmount>£ 20,000.00</CurrencyAmount>
              </CurrencyInfo>
            </BalanceItem>
          </BalanceGrid>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CardTitle>
            <TrendingUp size={20} />
            Quick Actions
          </CardTitle>
          <ActionButtons>
            <ActionButton
              onClick={() => setShowDepositModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              Deposit
            </ActionButton>
            <ActionButton
              onClick={() => setShowWithdrawalModal(true)}
              className="secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Minus size={16} />
              Withdraw
            </ActionButton>
          </ActionButtons>
        </Card>
      </Grid>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CardTitle>
          <TrendingUp size={20} />
          Recent Transactions
        </CardTitle>
        <TransactionList>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id}>
              <TransactionIcon type={transaction.type}>
                {transaction.type === 'deposit' ? <Plus size={16} /> : <Minus size={16} />}
              </TransactionIcon>
              <TransactionInfo>
                <TransactionTitle>{transaction.title}</TransactionTitle>
                <TransactionDate>{transaction.date}</TransactionDate>
              </TransactionInfo>
              <TransactionAmount type={transaction.type}>
                {transaction.amount}
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      </Card>
    </Container>
  );
};

export default MyAccount; 