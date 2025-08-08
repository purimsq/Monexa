import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Users, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

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

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const ClientCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const ClientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const ClientAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  flex-shrink: 0;
`;

const ClientInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const ClientEmail = styled.p`
  color: #64748b;
  font-size: 14px;
  margin-bottom: 4px;
`;

const ClientStats = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ClientActions = styled.div`
  display: flex;
  gap: 8px;
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

  &.danger:hover {
    background: #fef2f2;
    color: #ef4444;
  }
`;

const clients = [
  {
    id: 1,
    name: 'Artist XYZ',
    email: 'artist.xyz@email.com',
    beatsPurchased: 5,
    totalSpent: '$750',
    lastPurchase: 'Dec 15, 2024',
    avatar: '🎤'
  },
  {
    id: 2,
    name: 'Producer ABC',
    email: 'producer.abc@email.com',
    beatsPurchased: 3,
    totalSpent: '$600',
    lastPurchase: 'Dec 12, 2024',
    avatar: '🎹'
  },
  {
    id: 3,
    name: 'Rapper DEF',
    email: 'rapper.def@email.com',
    beatsPurchased: 2,
    totalSpent: '$360',
    lastPurchase: 'Dec 10, 2024',
    avatar: '🎧'
  },
  {
    id: 4,
    name: 'Singer GHI',
    email: 'singer.ghi@email.com',
    beatsPurchased: 4,
    totalSpent: '$480',
    lastPurchase: 'Dec 08, 2024',
    avatar: '🎵'
  },
  {
    id: 5,
    name: 'Artist JKL',
    email: 'artist.jkl@email.com',
    beatsPurchased: 1,
    totalSpent: '$250',
    lastPurchase: 'Dec 05, 2024',
    avatar: '🎤'
  },
  {
    id: 6,
    name: 'Producer MNO',
    email: 'producer.mno@email.com',
    beatsPurchased: 6,
    totalSpent: '$1,050',
    lastPurchase: 'Dec 01, 2024',
    avatar: '🎹'
  },
];

const Beneficiaries = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClient = () => {
    toast.success('Add client feature coming soon!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleEditClient = (clientId) => {
    toast.info(`Editing client ${clientId}...`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleDeleteClient = (clientId) => {
    toast.error(`Client ${clientId} deleted!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>
          <Users size={28} />
          Clients
        </Title>
        <Subtitle>Manage your music clients and track their purchases</Subtitle>
      </Header>

      <Controls>
        <SearchInput 
          placeholder="Search clients by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton>
          <Filter size={16} />
          Filter
        </FilterButton>
        <AddButton
          onClick={handleAddClient}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          Add Client
        </AddButton>
      </Controls>

      <ClientsGrid>
        {filteredClients.map((client, index) => (
          <ClientCard
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ClientHeader>
              <ClientAvatar>{client.avatar}</ClientAvatar>
              <ClientInfo>
                <ClientName>{client.name}</ClientName>
                <ClientEmail>{client.email}</ClientEmail>
              </ClientInfo>
            </ClientHeader>

            <ClientStats>
              <StatItem>
                <StatNumber>{client.beatsPurchased}</StatNumber>
                <StatLabel>Beats</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{client.totalSpent}</StatNumber>
                <StatLabel>Spent</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{client.lastPurchase}</StatNumber>
                <StatLabel>Last Purchase</StatLabel>
              </StatItem>
            </ClientStats>

            <ClientActions>
              <ActionButton onClick={() => handleEditClient(client.id)}>
                <Edit size={16} />
              </ActionButton>
              <ActionButton 
                className="danger"
                onClick={() => handleDeleteClient(client.id)}
              >
                <Trash2 size={16} />
              </ActionButton>
            </ClientActions>
          </ClientCard>
        ))}
      </ClientsGrid>
    </Container>
  );
};

export default Beneficiaries; 