import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  Filter,
  Search,
  Download,
  MoreVertical,
  Plus,
  Minus,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Header = styled.div`
  margin-bottom: 32px;
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 16px;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 0 24px 24px 24px;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchField = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
`;

const FilterButton = styled(motion.button)`
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }

  &.active {
    background: #1a1a1a;
    color: white;
    border-color: #1a1a1a;
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

const FilterDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 200px;
  margin-top: 8px;
`;

const FilterSection = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  font-size: 14px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    color: #1a1a1a;
  }

  input[type="checkbox"] {
    accent-color: #1a1a1a;
  }
`;

const DateRange = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 12px;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }
`;

const TransactionTable = styled.div`
  background: white;
  border-radius: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 120px 120px 120px 120px 100px;
  gap: 24px;
  padding: 20px 40px;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
`;

const TableRowsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 60px 1fr 120px 120px 120px 120px 100px;
  gap: 24px;
  padding: 16px 40px;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
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
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

const TransactionReference = styled.div`
  font-size: 12px;
  color: #64748b;
  font-family: 'Courier New', monospace;
`;

const TransactionDate = styled.div`
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
`;

const TransactionTime = styled.div`
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
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
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

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1a1a1a;
  }
`;

// Extended dummy data for transaction history
const allTransactions = [
  { 
    id: 1, 
    title: 'Beat Sale - Midnight Vibes', 
    amount: '+$150.00', 
    type: 'deposit', 
    date: 'Dec 15, 2024',
    time: '14:30',
    status: 'completed',
    reference: 'TXN-001',
    description: 'Sold to Client: John Doe'
  },
  { 
    id: 2, 
    title: 'Studio Equipment Purchase', 
    amount: '-$200.00', 
    type: 'withdrawal', 
    date: 'Dec 12, 2024',
    time: '09:15',
    status: 'completed',
    reference: 'TXN-002',
    description: 'Audio Interface - Focusrite'
  },
  { 
    id: 3, 
    title: 'Beat Sale - Summer Heat', 
    amount: '+$200.00', 
    type: 'deposit', 
    date: 'Dec 10, 2024',
    time: '16:45',
    status: 'completed',
    reference: 'TXN-003',
    description: 'Sold to Client: Sarah Wilson'
  },
  { 
    id: 4, 
    title: 'Software License Renewal', 
    amount: '-$80.00', 
    type: 'payment', 
    date: 'Dec 08, 2024',
    time: '11:20',
    status: 'pending',
    reference: 'TXN-004',
    description: 'FL Studio Annual License'
  },
  { 
    id: 5, 
    title: 'Beat Sale - Urban Flow', 
    amount: '+$180.00', 
    type: 'deposit', 
    date: 'Dec 05, 2024',
    time: '13:10',
    status: 'completed',
    reference: 'TXN-005',
    description: 'Sold to Client: Mike Johnson'
  },
  { 
    id: 6, 
    title: 'Microphone Purchase', 
    amount: '-$350.00', 
    type: 'withdrawal', 
    date: 'Dec 03, 2024',
    time: '10:30',
    status: 'completed',
    reference: 'TXN-006',
    description: 'Shure SM7B Microphone'
  },
  { 
    id: 7, 
    title: 'Beat Sale - Night Rider', 
    amount: '+$120.00', 
    type: 'deposit', 
    date: 'Dec 01, 2024',
    time: '15:20',
    status: 'completed',
    reference: 'TXN-007',
    description: 'Sold to Client: Alex Brown'
  },
  { 
    id: 8, 
    title: 'Website Hosting', 
    amount: '-$45.00', 
    type: 'payment', 
    date: 'Nov 28, 2024',
    time: '08:45',
    status: 'completed',
    reference: 'TXN-008',
    description: 'Monthly hosting fee'
  },
  { 
    id: 9, 
    title: 'Beat Sale - Golden Hour', 
    amount: '+$250.00', 
    type: 'deposit', 
    date: 'Nov 25, 2024',
    time: '17:30',
    status: 'completed',
    reference: 'TXN-009',
    description: 'Sold to Client: David Lee'
  },
  { 
    id: 10, 
    title: 'Studio Rent Payment', 
    amount: '-$500.00', 
    type: 'withdrawal', 
    date: 'Nov 20, 2024',
    time: '12:00',
    status: 'completed',
    reference: 'TXN-010',
    description: 'Monthly studio rent'
  },
];

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(['deposit', 'withdrawal', 'payment']);
  const [selectedStatuses, setSelectedStatuses] = useState(['completed', 'pending', 'failed']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleBack = () => {
    toast.info('Returning to Finances...', {
      position: "bottom-right",
      autoClose: 2000,
    });
    navigate('/my-account');
  };

  const handleExport = () => {
    toast.success('Transaction history exported successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleTypeFilter = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleStatusFilter = (status) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return <Plus size={16} />;
      case 'withdrawal': return <Minus size={16} />;
      case 'payment': return <CreditCard size={16} />;
      default: return <DollarSign size={16} />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={12} />;
      case 'pending': return <Clock size={12} />;
      case 'failed': return <XCircle size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.includes(transaction.type);
    const matchesStatus = selectedStatuses.includes(transaction.status);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={20} />
            Back to Finances
          </BackButton>
          <div>
            <Title>Transaction History</Title>
            <Subtitle>Complete financial activity and transaction records</Subtitle>
          </div>
        </HeaderLeft>
      </Header>

      <Controls>
        <SearchInput>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchField
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>

        <div style={{ position: 'relative' }}>
          <FilterButton
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'active' : ''}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={16} />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </FilterButton>

          {showFilters && (
            <FilterDropdown
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FilterSection>
                <FilterLabel>Transaction Type</FilterLabel>
                <FilterOptions>
                  {['deposit', 'withdrawal', 'payment'].map(type => (
                    <FilterOption key={type}>
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeFilter(type)}
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterSection>

              <FilterSection>
                <FilterLabel>Status</FilterLabel>
                <FilterOptions>
                  {['completed', 'pending', 'failed'].map(status => (
                    <FilterOption key={status}>
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => handleStatusFilter(status)}
                      />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </FilterOption>
                  ))}
                </FilterOptions>
              </FilterSection>

              <FilterSection>
                <FilterLabel>Date Range</FilterLabel>
                <DateRange>
                  <DateInput
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start date"
                  />
                  <span style={{ color: '#64748b' }}>to</span>
                  <DateInput
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End date"
                  />
                </DateRange>
              </FilterSection>
            </FilterDropdown>
          )}
        </div>

        <ExportButton
          onClick={handleExport}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={16} />
          Export
        </ExportButton>
      </Controls>

      <TransactionTable>
        <TableHeader>
          <div>Type</div>
          <div>Transaction</div>
          <div>Date</div>
          <div>Time</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </TableHeader>
        
        <TableRowsContainer>
          {filteredTransactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <TransactionIcon type={transaction.type}>
                {getTransactionIcon(transaction.type)}
              </TransactionIcon>
              
              <TransactionInfo>
                <TransactionTitle>{transaction.title}</TransactionTitle>
                <TransactionReference>{transaction.reference}</TransactionReference>
              </TransactionInfo>
              
              <TransactionDate>{transaction.date}</TransactionDate>
              
              <TransactionTime>
                <Clock size={12} />
                {transaction.time}
              </TransactionTime>
              
              <TransactionAmount type={transaction.type}>
                {transaction.amount}
              </TransactionAmount>
              
              <StatusBadge status={transaction.status}>
                {getStatusIcon(transaction.status)}
                {transaction.status}
              </StatusBadge>
              
              <ActionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreVertical size={16} />
              </ActionButton>
            </TableRow>
          ))}
        </TableRowsContainer>
      </TransactionTable>
    </Container>
  );
};

export default TransactionHistory;
