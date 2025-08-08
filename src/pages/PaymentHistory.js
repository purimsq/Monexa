import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { History, Search, Filter, Download, Eye } from 'lucide-react';

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

const Controls = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  min-width: 300px;
  background: white;
  color: #1e293b;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`;

const FilterButton = styled.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: #64748b;

  &:hover {
    background: #f1f5f9;
    border-color: #1a1a1a;
    color: #1e293b;
  }
`;

const ExportButton = styled(motion.button)`
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
`;

const HistoryCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const HistoryTable = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 60px 2fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px 24px;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

const TransactionClient = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

const TransactionDate = styled.div`
  color: #64748b;
  font-size: 14px;
`;

const TransactionStatus = styled.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => props.status === 'Completed' ? '#d1fae5' : props.status === 'Pending' ? '#fef3c7' : '#fee2e2'};
  color: ${props => props.status === 'Completed' ? '#065f46' : props.status === 'Pending' ? '#92400e' : '#991b1b'};
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f5f9;
    color: #1a1a1a;
    transform: scale(1.1);
  }
`;

const transactions = [
  { id: 1, title: 'Midnight Vibes', client: 'Artist XYZ', amount: '$150', date: 'Dec 15, 2024', status: 'Completed' },
  { id: 2, title: 'Summer Heat', client: 'Producer ABC', amount: '$200', date: 'Dec 12, 2024', status: 'Completed' },
  { id: 3, title: 'Urban Flow', client: 'Rapper DEF', amount: '$180', date: 'Dec 10, 2024', status: 'Pending' },
  { id: 4, title: 'Chill Mode', client: 'Singer GHI', amount: '$120', date: 'Dec 08, 2024', status: 'Completed' },
  { id: 5, title: 'Bass Drop', client: 'Artist JKL', amount: '$250', date: 'Dec 05, 2024', status: 'Completed' },
  { id: 6, title: 'Neon Dreams', client: 'Producer MNO', amount: '$175', date: 'Dec 01, 2024', status: 'Failed' },
  { id: 7, title: 'Street Beat', client: 'Rapper PQR', amount: '$160', date: 'Nov 28, 2024', status: 'Completed' },
  { id: 8, title: 'Ocean Waves', client: 'Artist STU', amount: '$140', date: 'Nov 25, 2024', status: 'Completed' },
];

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleView = (transactionId) => {
    toast.info(`Viewing transaction ${transactionId}...`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleDownload = (transactionId) => {
    toast.success(`Downloading receipt for transaction ${transactionId}...`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleExport = () => {
    toast.success('Payment history exported successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>
          <History size={28} />
          Sales History
        </Title>
        <Subtitle>Track all your beat sales and payment transactions</Subtitle>
      </Header>

      <Controls>
        <SearchInput 
          placeholder="Search by beat title or client..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton>
          <Filter size={16} />
          Filter
        </FilterButton>
        <ExportButton
          onClick={handleExport}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={16} />
          Export
        </ExportButton>
      </Controls>

      <HistoryCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HistoryTable>
          <TableHeader>
            <div>#</div>
            <div>Transaction</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
            <div>Actions</div>
          </TableHeader>
          
          {filteredTransactions.map((transaction, index) => (
            <TableRow 
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div>{transaction.id}</div>
              
              <TransactionInfo>
                <TransactionTitle>{transaction.title}</TransactionTitle>
                <TransactionClient>{transaction.client}</TransactionClient>
              </TransactionInfo>
              
              <TransactionAmount>{transaction.amount}</TransactionAmount>
              
              <TransactionDate>{transaction.date}</TransactionDate>
              
              <TransactionStatus status={transaction.status}>
                {transaction.status}
              </TransactionStatus>
              
              <ActionButtons>
                <ActionButton onClick={() => handleView(transaction.id)}>
                  <Eye size={16} />
                </ActionButton>
                <ActionButton onClick={() => handleDownload(transaction.id)}>
                  <Download size={16} />
                </ActionButton>
              </ActionButtons>
            </TableRow>
          ))}
        </HistoryTable>
      </HistoryCard>
    </Container>
  );
};

export default PaymentHistory; 