import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import AddCardModal from '../components/AddCardModal';
import { 
  CreditCard, 
  Lock, 
  CheckCircle,
  Search,
  Filter,
  ArrowLeft,
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Trash2,
  Edit
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

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 16px;

  &:hover {
    background: #f1f5f9;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 300px;
  padding: 12px 16px;
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

const FilterButton = styled(motion.button)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  padding: 12px 20px;
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
`;

const AddButton = styled(motion.button)`
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardItem = styled(motion.div)`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 28px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 180px;
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
  margin-bottom: 16px;
`;

const CardType = styled.div`
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const CardNumber = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 12px;
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

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 2px;
`;

const InfoValue = styled.div`
  font-weight: 600;
`;

const DefaultBadge = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: absolute;
  top: 16px;
  right: 16px;
`;

// Dynamic card data based on current user
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

const Cards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCardDetails, setShowCardDetails] = useState({});
  const [filterType, setFilterType] = useState('all');
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  // Load cards on component mount
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCards();
      if (response.success) {
        setCards(response.cards);
      }
    } catch (error) {
      console.error('Failed to load cards:', error);
      toast.error('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card) => {
    setShowCardDetails(prev => ({ ...prev, [card.id]: !prev[card.id] }));
    toast.success(showCardDetails[card.id] ? 'Card details hidden!' : 'Card details revealed!', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleAddCard = () => {
    setShowAddCardModal(true);
  };

  const handleCardAdded = () => {
    loadCards(); // Reload cards when a new card is added
  };

  const handleEditCard = (card) => {
    toast.info(`Edit ${card.type} card functionality coming soon!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleSetDefaultCard = async (card) => {
    try {
      const response = await apiService.setDefaultCard(card.id);
      if (response.success) {
        toast.success('Default card updated successfully!');
        loadCards(); // Reload cards to reflect changes
      }
    } catch (error) {
      console.error('Failed to set default card:', error);
      toast.error('Failed to update default card');
    }
  };

  const handleDeleteCard = async (card) => {
    try {
      const response = await apiService.deleteCard(card.id);
      if (response.success) {
        toast.success('Card deleted successfully!');
        loadCards(); // Reload cards
      }
    } catch (error) {
      console.error('Failed to delete card:', error);
      toast.error('Failed to delete card');
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.holder.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || card.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <Container>
      <BackButton
        onClick={() => navigate('/my-account')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft size={20} />
        Back to Finances
      </BackButton>

      <Header>
        <Title>
          <CreditCard size={28} />
          Payment Cards
        </Title>
        <Subtitle>Manage all your payment cards and their details</Subtitle>
      </Header>

      <Controls>
        <SearchInput
          type="text"
          placeholder="Search cards by type or holder..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton
          onClick={() => setFilterType(filterType === 'all' ? 'visa' : filterType === 'visa' ? 'mastercard' : 'all')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter size={16} />
          {filterType === 'all' ? 'All Cards' : filterType === 'visa' ? 'Visa Only' : 'Mastercard Only'}
        </FilterButton>
        <AddButton
          onClick={handleAddCard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          Add Card
        </AddButton>
      </Controls>

      <CardsGrid>
        {filteredCards.map((card) => (
          <CardItem
            key={card.id}
            onClick={() => handleCardClick(card)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${card.isDefault ? 'active' : ''} ${card.type.toLowerCase()}`}
          >
            {card.isDefault && <DefaultBadge>Default</DefaultBadge>}
            
            <CardHeader>
              <CardType>
                <CreditCard size={20} />
                {card.type}
                {card.isDefault && <CheckCircle size={16} />}
              </CardType>
              <CardActions>
                <ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCard(card);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit size={14} />
                </ActionButton>
                <ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCard(card);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={14} />
                </ActionButton>
              </CardActions>
            </CardHeader>
            
            <CardNumber>
              {showCardDetails[card.id] ? card.number : '**** **** **** ****'}
            </CardNumber>
            
            <CardDetails>
              <CardInfo>
                <div>
                  <InfoLabel>Card Holder</InfoLabel>
                  <InfoValue>{card.holder}</InfoValue>
                </div>
                <div>
                  <InfoLabel>Expires</InfoLabel>
                  <InfoValue>{showCardDetails[card.id] ? card.expiry : '**/**'}</InfoValue>
                </div>
              </CardInfo>
              <CardInfo>
                <div>
                  <InfoLabel>CVV</InfoLabel>
                  <InfoValue>{card.cvv}</InfoValue>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  {showCardDetails[card.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                  <span style={{ fontSize: '10px', opacity: 0.8 }}>
                    {showCardDetails[card.id] ? 'Hide' : 'Show'} Details
                  </span>
                </div>
              </CardInfo>
            </CardDetails>
          </CardItem>
        ))}
      </CardsGrid>

      {filteredCards.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#64748b',
          fontSize: '16px'
        }}>
          No cards found matching your search criteria.
        </div>
      )}

      <AddCardModal 
        isOpen={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
        onCardAdded={handleCardAdded}
      />
    </Container>
  );
};

export default Cards;
