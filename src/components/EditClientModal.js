import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Mail, Music, CreditCard, Link, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../services/api';

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
  z-index: 1002;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LinksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddLinkButton = styled.button`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #333333;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const LinkItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
`;

const LinkInputs = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RemoveLinkButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
  }
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
    background: #1a1a1a;
    color: white;

    &:hover {
      background: #333333;
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }
`;

const EditClientModal = ({ 
  isOpen, 
  onClose, 
  client, 
  onClientUpdated 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    artist_name: '',
    email: '',
    paypal_email: '',
    links: []
  });
  const [loading, setLoading] = useState(false);

  // Initialize form data when client changes
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        artist_name: client.artist_name || '',
        email: client.email || '',
        paypal_email: client.paypal_email || '',
        links: client.links ? [...client.links] : []
      });
    }
  }, [client]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLink = () => {
    if (formData.links.length >= 2) {
      toast.warning('Maximum 2 links allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { name: '', url: '' }]
    }));
  };

  const removeLink = (index) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate PayPal email if provided
    if (formData.paypal_email && !emailRegex.test(formData.paypal_email)) {
      toast.error('Please enter a valid PayPal email address');
      return;
    }

    // Validate links
    const validLinks = formData.links.filter(link => link.name && link.url);
    if (formData.links.length > 0 && validLinks.length !== formData.links.length) {
      toast.error('Please fill in both name and URL for all links');
      return;
    }

    try {
      setLoading(true);
      
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        ...(formData.artist_name.trim() && { artist_name: formData.artist_name.trim() }),
        ...(formData.paypal_email.trim() && { paypal_email: formData.paypal_email.trim() }),
        ...(validLinks.length > 0 && { links: validLinks })
      };
      
      console.log('Sending update data:', updateData);
      console.log('Client ID:', client.id);
      
      const response = await apiService.updateBeneficiary(client.id, updateData);
      
      if (response.success) {
        toast.success('Client updated successfully!');
        onClientUpdated && onClientUpdated(response.beneficiary);
        onClose();
      } else {
        toast.error(response.error || 'Failed to update client');
      }
    } catch (error) {
      console.error('Failed to update client:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to update client. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
                Edit Client
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <Form onSubmit={handleSubmit}>
                {/* Basic Information Section */}
                <FormSection>
                  <SectionTitle>
                    <Users size={18} />
                    Basic Information
                  </SectionTitle>
                  
                  <FormGroup>
                    <Label>
                      <Users size={16} />
                      Full Name *
                    </Label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <Music size={16} />
                      Artist Name (Optional)
                    </Label>
                    <Input
                      type="text"
                      value={formData.artist_name}
                      onChange={(e) => handleInputChange('artist_name', e.target.value)}
                      placeholder="Artist Name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <Mail size={16} />
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </FormGroup>
                </FormSection>

                {/* Payment Information Section */}
                <FormSection>
                  <SectionTitle>
                    <CreditCard size={18} />
                    Payment Information
                  </SectionTitle>
                  
                  <FormGroup>
                    <Label>
                      <CreditCard size={16} />
                      PayPal Email (Optional)
                    </Label>
                    <Input
                      type="email"
                      value={formData.paypal_email}
                      onChange={(e) => handleInputChange('paypal_email', e.target.value)}
                      placeholder="paypal@example.com"
                    />
                  </FormGroup>
                </FormSection>

                {/* Social Links Section */}
                <FormSection>
                  <LinksSection>
                    <LinksHeader>
                      <SectionTitle>
                        <Link size={18} />
                        Social Links (Optional)
                      </SectionTitle>
                      <AddLinkButton
                        type="button"
                        onClick={addLink}
                        disabled={formData.links.length >= 2}
                      >
                        <Plus size={14} />
                        {formData.links.length >= 2 ? 'Max Reached' : 'Add Link'}
                      </AddLinkButton>
                    </LinksHeader>

                    {formData.links.map((link, index) => (
                      <LinkItem key={index}>
                        <LinkInputs>
                          <Input
                            type="text"
                            value={link.name}
                            onChange={(e) => updateLink(index, 'name', e.target.value)}
                            placeholder="Link Name (e.g., YouTube, Instagram)"
                          />
                          <Input
                            type="url"
                            value={link.url}
                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                            placeholder="https://example.com"
                          />
                        </LinkInputs>
                        <RemoveLinkButton
                          type="button"
                          onClick={() => removeLink(index)}
                        >
                          <Trash2 size={14} />
                        </RemoveLinkButton>
                      </LinkItem>
                    ))}

                    {formData.links.length === 0 && (
                      <div style={{ 
                        textAlign: 'center', 
                        color: '#6b7280', 
                        fontSize: '14px',
                        padding: '20px',
                        border: '1px dashed #d1d5db',
                        borderRadius: '8px'
                      }}>
                        No social links added yet
                      </div>
                    )}
                  </LinksSection>
                </FormSection>

                <ModalActions>
                  <Button 
                    type="button" 
                    className="secondary"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Client'}
                  </Button>
                </ModalActions>
              </Form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default EditClientModal;
