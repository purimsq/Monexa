import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';
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
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.25)' : 'white'};
  backdrop-filter: ${props => props.theme?.name === 'glassmorphism' ? 'blur(20px) saturate(180%)' : 'none'};
  border: ${props => props.theme?.name === 'glassmorphism' ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'};
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${props => props.theme?.name === 'glassmorphism' ? '0 8px 32px rgba(31, 38, 135, 0.37)' : 'none'};
`;

const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme?.name === 'glassmorphism' ? '#1a237e' : '#1f2937'};
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
  display: grid;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme?.name === 'glassmorphism' ? '#283593' : '#374151'};
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${props => props.theme?.name === 'glassmorphism' ? 'rgba(156, 204, 101, 0.4)' : '#d1d5db'};
  border-radius: 8px;
  font-size: 1rem;
  background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.2)' : 'white'};
  color: ${props => props.theme?.name === 'glassmorphism' ? '#1a237e' : 'inherit'};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme?.name === 'glassmorphism' ? '#4caf50' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${props => props.theme?.name === 'glassmorphism' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
    background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.3)' : 'white'};
  }

  &::placeholder {
    color: ${props => props.theme?.name === 'glassmorphism' ? '#3949ab' : '#9ca3af'};
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid ${props => props.theme?.name === 'glassmorphism' ? 'rgba(156, 204, 101, 0.4)' : '#d1d5db'};
  border-radius: 8px;
  font-size: 1rem;
  background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.2)' : 'white'};
  color: ${props => props.theme?.name === 'glassmorphism' ? '#1a237e' : 'inherit'};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme?.name === 'glassmorphism' ? '#4caf50' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${props => props.theme?.name === 'glassmorphism' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
    background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.3)' : 'white'};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
`;

const CardPreview = styled.div`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardNumber = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin: 16px 0;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardHolder = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const CardExpiry = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const CardType = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
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

const AddCardModal = ({ isOpen, onClose, onCardAdded }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'visa',
    number: '',
    holder_name: '',
    expiry: '',
    cvv: '',
    nickname: ''
  });

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, '').length > 16) return;
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 4) return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.number || !formData.holder_name || !formData.expiry || !formData.cvv) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.number.replace(/\s/g, '').length < 16) {
      toast.error('Please enter a valid 16-digit card number');
      return;
    }

    if (formData.expiry.length !== 5) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return;
    }

    if (formData.cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data for API
      const [expiry_month, expiry_year] = formData.expiry.split('/');
      const cardData = {
        type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1), // Capitalize first letter
        number: formData.number.replace(/\s/g, ''), // Remove spaces for storage
        holder_name: formData.holder_name,
        expiry_month: parseInt(expiry_month, 10),
        expiry_year: parseInt('20' + expiry_year, 10), // Convert YY to YYYY
        cvv: formData.cvv,
        is_default: false
      };

      const response = await apiService.addCard(cardData);
      
      if (response.success) {
        toast.success('Card added successfully!');
        setFormData({
          type: 'visa',
          number: '',
          holder_name: '',
          expiry: '',
          cvv: '',
          nickname: ''
        });
        onCardAdded && onCardAdded();
        onClose();
      }
    } catch (error) {
      console.error('Failed to add card:', error);
      toast.error('Failed to add card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCardBrand = () => {
    const number = formData.number.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    return formData.type;
  };

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
            theme={theme}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                <CreditCard size={24} />
                Add New Card
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <CardPreview>
                <div>
                  <CardType>{getCardBrand()}</CardType>
                  <CardNumber>
                    {formData.number || '•••• •••• •••• ••••'}
                  </CardNumber>
                </div>
                <CardBottom>
                  <CardHolder>
                    {formData.holder_name || 'CARD HOLDER'}
                  </CardHolder>
                  <CardExpiry>
                    {formData.expiry || 'MM/YY'}
                  </CardExpiry>
                </CardBottom>
              </CardPreview>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Card Type *</Label>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="american_express">American Express</option>
                    <option value="discover">Discover</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Card Number *</Label>
                  <Input
                    type="text"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Card Holder Name *</Label>
                  <Input
                    type="text"
                    value={formData.holder_name}
                    onChange={(e) => setFormData({...formData, holder_name: e.target.value.toUpperCase()})}
                    placeholder="JOHN DOE"
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label>Expiry Date *</Label>
                    <Input
                      type="text"
                      value={formData.expiry}
                      onChange={(e) => handleInputChange('expiry', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>CVV *</Label>
                    <Input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>Nickname (Optional)</Label>
                  <Input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    placeholder="e.g., Personal Card, Business Card"
                  />
                </FormGroup>

                <FormActions>
                  <Button 
                    type="button" 
                    className="secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="primary"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Card'}
                  </Button>
                </FormActions>
              </Form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default AddCardModal;
