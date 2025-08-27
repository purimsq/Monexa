import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, DollarSign, Send, Download, AlertCircle, Loader, CheckCircle } from 'lucide-react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme?.colors?.card || '#ffffff'};
  border-radius: 24px;
  padding: 32px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme?.colors?.borderSecondary || '#e5e7eb'};
  position: relative;
  ${props => props.theme?.name === 'glassmorphism' && `
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.tertiary || '#f3f4f6'};
    color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  font-size: 14px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid ${props => props.error ? '#ef4444' : (props.theme?.colors?.borderSecondary || '#e5e7eb')};
  border-radius: 12px;
  font-size: 16px;
  background: ${props => props.theme?.colors?.tertiary || '#f9fafb'};
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #0070ba;
    background: ${props => props.theme?.colors?.card || '#ffffff'};
    box-shadow: 0 0 0 3px rgba(0, 112, 186, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 2px solid ${props => props.error ? '#ef4444' : (props.theme?.colors?.borderSecondary || '#e5e7eb')};
  border-radius: 12px;
  font-size: 16px;
  background: ${props => props.theme?.colors?.tertiary || '#f9fafb'};
  color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #0070ba;
    background: ${props => props.theme?.colors?.card || '#ffffff'};
    box-shadow: 0 0 0 3px rgba(0, 112, 186, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.type === 'send' ? 'linear-gradient(135deg, #0070ba, #005ea6)' : 'linear-gradient(135deg, #10b981, #059669)'};
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 112, 186, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 112, 186, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ef4444;
  font-size: 14px;
  padding: 12px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
  font-size: 14px;
  padding: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
`;

const PayPalTransferModal = ({ isOpen, onClose, type = 'send', onSuccess, theme }) => {
  const [formData, setFormData] = useState({
    email: '',
    amount: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate inputs
      if (!formData.email || !formData.amount) {
        setError('Please fill in all required fields');
        return;
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid amount');
        return;
      }

      // Call PayPal API
      const apiMethod = type === 'send' ? 'sendPayPalMoney' : 'requestPayPalMoney';
      const response = await fetch(`http://localhost:5000/api/paypal/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('monexa_token')}`
        },
        body: JSON.stringify({
          [type === 'send' ? 'toEmail' : 'fromEmail']: formData.email,
          amount: amount,
          note: formData.note
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(type === 'send' 
          ? `Successfully sent $${amount} to ${formData.email}`
          : `Payment request sent to ${formData.email} for $${amount}`
        );
        setTimeout(() => {
          onSuccess(data);
          onClose();
        }, 2000);
      } else {
        setError(data.message || `Failed to ${type} money`);
      }
    } catch (error) {
      console.error('PayPal transfer error:', error);
      setError(`Failed to ${type} money. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    return type === 'send' ? 'Send Money' : 'Request Money';
  };

  const getSubtitle = () => {
    return type === 'send' 
      ? 'Send money to someone via PayPal'
      : 'Request money from someone via PayPal';
  };

  const getButtonText = () => {
    if (loading) return 'Processing...';
    return type === 'send' ? 'Send Money' : 'Request Money';
  };

  const getIcon = () => {
    return type === 'send' ? <Send size={20} /> : <Download size={20} />;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton theme={theme} onClick={onClose}>
            <X size={20} />
          </CloseButton>

          <Header>
            <Title theme={theme}>
              {getIcon()}
              {getTitle()}
            </Title>
            <Subtitle theme={theme}>{getSubtitle()}</Subtitle>
          </Header>

          {error && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {error}
            </ErrorMessage>
          )}

          {success && (
            <SuccessMessage>
              <CheckCircle size={16} />
              {success}
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label theme={theme}>
                {type === 'send' ? 'Recipient Email' : 'Sender Email'}
              </Label>
              <InputWrapper>
                <InputIcon theme={theme}>
                  <Mail size={20} />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={type === 'send' ? 'Enter recipient email' : 'Enter sender email'}
                  theme={theme}
                  error={error}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>Amount (USD)</Label>
              <InputWrapper>
                <InputIcon theme={theme}>
                  <DollarSign size={20} />
                </InputIcon>
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  theme={theme}
                  error={error}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>Note (Optional)</Label>
              <TextArea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder={type === 'send' ? 'Add a note for the recipient' : 'Add a note for the sender'}
                theme={theme}
                error={error}
              />
            </FormGroup>

            <ActionButton
              type="submit"
              type={type}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spin" />
                  {getButtonText()}
                </>
              ) : (
                <>
                  {getIcon()}
                  {getButtonText()}
                </>
              )}
            </ActionButton>
          </Form>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default PayPalTransferModal;

