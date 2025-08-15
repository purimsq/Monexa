import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Building, CreditCard, Phone, MapPin } from 'lucide-react';
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
  border-bottom: 1px solid #e5e7eb;
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
  display: grid;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
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

const Select = styled.select`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
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

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

const AddBeneficiaryModal = ({ isOpen, onClose, onBeneficiaryAdded }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    account_number: '',
    bank_name: '',
    bank_code: '',
    account_type: 'checking',
    relationship: 'friend',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.account_number || !formData.bank_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      
      const response = await apiService.createBeneficiary(formData);
      
      if (response.success) {
        toast.success('Beneficiary added successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          account_number: '',
          bank_name: '',
          bank_code: '',
          account_type: 'checking',
          relationship: 'friend',
          notes: ''
        });
        onBeneficiaryAdded && onBeneficiaryAdded();
        onClose();
      }
    } catch (error) {
      console.error('Failed to add beneficiary:', error);
      toast.error('Failed to add beneficiary. Please try again.');
    } finally {
      setLoading(false);
    }
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                <Users size={24} />
                Add New Beneficiary
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <SectionTitle>Personal Information</SectionTitle>
                
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

                <FormRow>
                  <FormGroup>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <Phone size={16} />
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>
                    <MapPin size={16} />
                    Address
                  </Label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                  />
                </FormGroup>

                <SectionTitle>Banking Information</SectionTitle>

                <FormGroup>
                  <Label>
                    <CreditCard size={16} />
                    Account Number *
                  </Label>
                  <Input
                    type="text"
                    value={formData.account_number}
                    onChange={(e) => handleInputChange('account_number', e.target.value)}
                    placeholder="1234567890"
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label>
                      <Building size={16} />
                      Bank Name *
                    </Label>
                    <Input
                      type="text"
                      value={formData.bank_name}
                      onChange={(e) => handleInputChange('bank_name', e.target.value)}
                      placeholder="Bank of America"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Bank Code / Routing Number</Label>
                    <Input
                      type="text"
                      value={formData.bank_code}
                      onChange={(e) => handleInputChange('bank_code', e.target.value)}
                      placeholder="123456789"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Account Type</Label>
                    <Select
                      value={formData.account_type}
                      onChange={(e) => handleInputChange('account_type', e.target.value)}
                    >
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                      <option value="business">Business</option>
                      <option value="money_market">Money Market</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Relationship</Label>
                    <Select
                      value={formData.relationship}
                      onChange={(e) => handleInputChange('relationship', e.target.value)}
                    >
                      <option value="family">Family</option>
                      <option value="friend">Friend</option>
                      <option value="business">Business</option>
                      <option value="vendor">Vendor</option>
                      <option value="employee">Employee</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>Notes (Optional)</Label>
                  <Input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Additional notes about this beneficiary..."
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
                    {loading ? 'Adding...' : 'Add Beneficiary'}
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

export default AddBeneficiaryModal;
