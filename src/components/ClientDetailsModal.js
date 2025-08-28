import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Mail, Music, CreditCard, Link, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const ModalBody = styled.div`
  padding: 0 24px 24px 24px;
`;

const ClientAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
  margin: 0 auto 24px auto;
`;

const ClientName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 8px;
`;

const ClientEmail = styled.p`
  color: #64748b;
  font-size: 16px;
  text-align: center;
  margin-bottom: 32px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailIcon = styled.div`
  color: #6b7280;
  display: flex;
  align-items: center;
  width: 20px;
`;

const DetailLabel = styled.span`
  color: #6b7280;
  font-size: 14px;
  min-width: 80px;
`;

const DetailValue = styled.span`
  color: #1f2937;
  font-weight: 500;
  flex: 1;
`;

const LinksGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const LinkCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: #f1f5f9;
    border-color: #1a1a1a;
    transform: translateY(-1px);
  }
`;

const LinkInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const LinkIcon = styled.div`
  color: #6b7280;
  display: flex;
  align-items: center;
`;

const LinkDetails = styled.div`
  flex: 1;
`;

const LinkName = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

const LinkUrl = styled.div`
  font-size: 12px;
  color: #6b7280;
  word-break: break-all;
`;

const ExternalLinkIcon = styled.div`
  color: #6b7280;
  display: flex;
  align-items: center;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }

  &.danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }
`;

const ClientDetailsModal = ({ 
  isOpen, 
  onClose, 
  client, 
  onEdit, 
  onDelete 
}) => {
  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!client) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                <Users size={24} />
                Client Details
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <ClientAvatar>
                {client.name?.charAt(0) || 'C'}
              </ClientAvatar>

              <ClientName>{client.name}</ClientName>
              <ClientEmail>{client.email}</ClientEmail>

              {/* Basic Information */}
              <Section>
                <SectionTitle>
                  <Users size={18} />
                  Basic Information
                </SectionTitle>
                
                <DetailItem>
                  <DetailIcon>
                    <Mail size={16} />
                  </DetailIcon>
                  <DetailLabel>Email:</DetailLabel>
                  <DetailValue>{client.email}</DetailValue>
                </DetailItem>

                {client.artist_name && (
                  <DetailItem>
                    <DetailIcon>
                      <Music size={16} />
                    </DetailIcon>
                    <DetailLabel>Artist Name:</DetailLabel>
                    <DetailValue>{client.artist_name}</DetailValue>
                  </DetailItem>
                )}
              </Section>

              {/* Payment Information */}
              {client.paypal_email && (
                <Section>
                  <SectionTitle>
                    <CreditCard size={18} />
                    Payment Information
                  </SectionTitle>
                  
                  <DetailItem>
                    <DetailIcon>
                      <CreditCard size={16} />
                    </DetailIcon>
                    <DetailLabel>PayPal:</DetailLabel>
                    <DetailValue>{client.paypal_email}</DetailValue>
                  </DetailItem>
                </Section>
              )}

              {/* Social Links */}
              {client.links && client.links.length > 0 && (
                <Section>
                  <SectionTitle>
                    <Link size={18} />
                    Social Links
                  </SectionTitle>
                  
                  <LinksGrid>
                    {client.links.map((link, index) => (
                      <LinkCard
                        key={index}
                        onClick={() => handleLinkClick(link.url)}
                      >
                        <LinkInfo>
                          <LinkIcon>
                            <Link size={16} />
                          </LinkIcon>
                          <LinkDetails>
                            <LinkName>{link.name}</LinkName>
                            <LinkUrl>{link.url}</LinkUrl>
                          </LinkDetails>
                        </LinkInfo>
                        <ExternalLinkIcon>
                          <ExternalLink size={16} />
                        </ExternalLinkIcon>
                      </LinkCard>
                    ))}
                  </LinksGrid>
                </Section>
              )}

              <ModalActions>
                <Button 
                  type="button" 
                  className="secondary"
                  onClick={onClose}
                >
                  Close
                </Button>
                {onEdit && (
                  <Button 
                    type="button" 
                    className="primary"
                    onClick={() => onEdit(client)}
                  >
                    <Edit size={16} />
                    Edit Client
                  </Button>
                )}
                {onDelete && (
                  <Button 
                    type="button" 
                    className="danger"
                    onClick={() => onDelete(client)}
                  >
                    <Trash2 size={16} />
                    Delete Client
                  </Button>
                )}
              </ModalActions>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ClientDetailsModal;
