import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Users, Plus, Edit, Trash2, Search, Filter, Mail, Music, Link, CreditCard } from 'lucide-react';
import apiService from '../services/api';
import AddBeneficiaryModal from '../components/AddBeneficiaryModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ClientDetailsModal from '../components/ClientDetailsModal';
import PasswordVerificationModal from '../components/PasswordVerificationModal';
import EditClientModal from '../components/EditClientModal';

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
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
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

const ClientDetails = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
`;

const DetailIcon = styled.div`
  color: #94a3b8;
  display: flex;
  align-items: center;
`;

const DetailText = styled.span`
  color: #374151;
  font-weight: 500;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const LinkTag = styled.div`
  background: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
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
  {
    id: 7,
    name: 'Beatmaker PQR',
    email: 'beatmaker.pqr@email.com',
    beatsPurchased: 3,
    totalSpent: '$450',
    lastPurchase: 'Nov 28, 2024',
    avatar: '🎛️'
  },
  {
    id: 8,
    name: 'Vocalist STU',
    email: 'vocalist.stu@email.com',
    beatsPurchased: 2,
    totalSpent: '$320',
    lastPurchase: 'Nov 25, 2024',
    avatar: '🎙️'
  },
  {
    id: 9,
    name: 'DJ VWX',
    email: 'dj.vwx@email.com',
    beatsPurchased: 4,
    totalSpent: '$680',
    lastPurchase: 'Nov 22, 2024',
    avatar: '💿'
  },
  {
    id: 10,
    name: 'Composer YZ',
    email: 'composer.yz@email.com',
    beatsPurchased: 1,
    totalSpent: '$180',
    lastPurchase: 'Nov 20, 2024',
    avatar: '🎼'
  },
  {
    id: 11,
    name: 'Musician AA',
    email: 'musician.aa@email.com',
    beatsPurchased: 5,
    totalSpent: '$820',
    lastPurchase: 'Nov 18, 2024',
    avatar: '🎸'
  },
  {
    id: 12,
    name: 'Producer BB',
    email: 'producer.bb@email.com',
    beatsPurchased: 3,
    totalSpent: '$540',
    lastPurchase: 'Nov 15, 2024',
    avatar: '🎚️'
  },
  {
    id: 13,
    name: 'Sound Engineer CC',
    email: 'engineer.cc@email.com',
    beatsPurchased: 2,
    totalSpent: '$380',
    lastPurchase: 'Nov 12, 2024',
    avatar: '🎛️'
  },
  {
    id: 14,
    name: 'Studio Manager DD',
    email: 'manager.dd@email.com',
    beatsPurchased: 4,
    totalSpent: '$720',
    lastPurchase: 'Nov 10, 2024',
    avatar: '🎧'
  }
];

const Beneficiaries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBeneficiaryModal, setShowAddBeneficiaryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Load beneficiaries on component mount
  useEffect(() => {
    loadBeneficiaries();
  }, []);

  const loadBeneficiaries = async () => {
    try {
      setLoading(true);
      const response = await apiService.getBeneficiaries();
      if (response.success) {
        setBeneficiaries(response.beneficiaries);
      }
    } catch (error) {
      console.error('Failed to load beneficiaries:', error);
      toast.error('Failed to load beneficiaries');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = () => {
    setShowAddBeneficiaryModal(true);
  };

  const handleBeneficiaryAdded = () => {
    loadBeneficiaries(); // Reload beneficiaries when a new one is added
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleEditClient = (client) => {
    setClientToEdit(client);
    setShowPasswordModal(true);
  };

  const handlePasswordVerify = async (password) => {
    try {
      setPasswordLoading(true);
      
      // Verify password with backend
      const response = await apiService.verifyPassword(password);
      
      if (response.success) {
        setShowPasswordModal(false);
        setPasswordLoading(false);
        
        // Open edit modal with client data
        setShowEditModal(true);
      } else {
        toast.error('Incorrect password');
      }
    } catch (error) {
      console.error('Password verification failed:', error);
      toast.error('Password verification failed');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleClientUpdated = (updatedClient) => {
    setBeneficiaries(prev => 
      prev.map(b => b.id === updatedClient.id ? updatedClient : b)
    );
    setShowEditModal(false);
    setClientToEdit(null);
  };

  const handleDeleteClient = (client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!clientToDelete) return;
    
    try {
      setDeleteLoading(true);
      const response = await apiService.deleteBeneficiary(clientToDelete.id);
      
      if (response.success) {
        toast.success('Client deleted successfully!');
        setBeneficiaries(prev => prev.filter(b => b.id !== clientToDelete.id));
        setShowDeleteModal(false);
        setClientToDelete(null);
      } else {
        toast.error(response.error || 'Failed to delete client');
      }
    } catch (error) {
      console.error('Failed to delete client:', error);
      toast.error('Failed to delete client. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredClients = beneficiaries.filter(beneficiary =>
    beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        {filteredClients.map((beneficiary, index) => (
          <ClientCard
            key={beneficiary.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => handleClientClick(beneficiary)}
            style={{ cursor: 'pointer' }}
          >
            <ClientHeader>
              <ClientAvatar>{beneficiary.name?.charAt(0) || 'C'}</ClientAvatar>
              <ClientInfo>
                <ClientName>{beneficiary.name}</ClientName>
                <ClientEmail>{beneficiary.email}</ClientEmail>
              </ClientInfo>
            </ClientHeader>

            <ClientDetails>
              {beneficiary.artist_name && (
                <DetailItem>
                  <DetailIcon>
                    <Music size={14} />
                  </DetailIcon>
                  <span>Artist:</span>
                  <DetailText>{beneficiary.artist_name}</DetailText>
                </DetailItem>
              )}
              
              <DetailItem>
                <DetailIcon>
                  <Mail size={14} />
                </DetailIcon>
                <span>Email:</span>
                <DetailText>{beneficiary.email}</DetailText>
              </DetailItem>

              {beneficiary.paypal_email && (
                <DetailItem>
                  <DetailIcon>
                    <CreditCard size={14} />
                  </DetailIcon>
                  <span>PayPal:</span>
                  <DetailText>{beneficiary.paypal_email}</DetailText>
                </DetailItem>
              )}
            </ClientDetails>

            {beneficiary.links && beneficiary.links.length > 0 && (
              <LinksContainer>
                {beneficiary.links.map((link, index) => (
                  <LinkTag key={index}>
                    <Link size={12} />
                    {link.name}
                  </LinkTag>
                ))}
              </LinksContainer>
            )}

            <ClientActions>
              <ActionButton 
                className="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClient(beneficiary);
                }}
              >
                <Trash2 size={16} />
              </ActionButton>
            </ClientActions>
          </ClientCard>
        ))}
      </ClientsGrid>

      <AddBeneficiaryModal 
        isOpen={showAddBeneficiaryModal}
        onClose={() => setShowAddBeneficiaryModal(false)}
        onBeneficiaryAdded={handleBeneficiaryAdded}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setClientToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={clientToDelete?.name || 'Client'}
        itemType="Client"
        loading={deleteLoading}
      />

      <ClientDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
        onEdit={handleEditClient}
        onDelete={(client) => {
          setShowDetailsModal(false);
          setSelectedClient(null);
          handleDeleteClient(client);
        }}
      />

      <PasswordVerificationModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setClientToEdit(null);
        }}
        onVerify={handlePasswordVerify}
        loading={passwordLoading}
      />

      <EditClientModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setClientToEdit(null);
        }}
        client={clientToEdit}
        onClientUpdated={handleClientUpdated}
      />
    </Container>
  );
};

export default Beneficiaries; 