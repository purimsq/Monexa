import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Key, Check, AlertCircle } from 'lucide-react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`;

const ModalIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const ModalDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 8px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  padding-right: 45px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  &.success {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;



const PasswordStrength = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
`;

const StrengthBar = styled.div`
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-top: 4px;
  overflow: hidden;
`;

const StrengthFill = styled.div`
  height: 100%;
  background: ${props => {
    if (props.strength === 'weak') return '#ef4444';
    if (props.strength === 'medium') return '#f59e0b';
    if (props.strength === 'strong') return '#10b981';
    return '#e2e8f0';
  }};
  width: ${props => {
    if (props.strength === 'weak') return '33%';
    if (props.strength === 'medium') return '66%';
    if (props.strength === 'strong') return '100%';
    return '0%';
  }};
  transition: all 0.3s ease;
`;

const PasswordRequirements = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
`;

const Requirement = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  color: ${props => props.met ? '#10b981' : '#64748b'};
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.active ? '#1a1a1a' : '#64748b'};
`;

const StepNumber = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.active ? '#1a1a1a' : '#cbd5e1'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
`;

const PasswordChangeModal = ({ 
  isOpen, 
  onClose, 
  onPasswordChange,
  loading = false,
  error = null
}) => {
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [step, setStep] = useState(1); // 1: verify current, 2: enter new password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    strength: 'weak',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  // Check password strength
  useEffect(() => {
    const checkPasswordStrength = (password) => {
      const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      };

      const score = Object.values(requirements).filter(Boolean).length;
      let strength = 'weak';
      if (score >= 4) strength = 'strong';
      else if (score >= 3) strength = 'medium';

      setPasswordStrength({ score, strength, requirements });
    };

    if (newPassword) {
      checkPasswordStrength(newPassword);
    }
  }, [newPassword]);

  const handleVerifyCurrentPassword = async () => {
    if (!currentPassword.trim()) return;
    
    setVerificationLoading(true);
    setVerificationError(null);

    try {
      // Use the API service directly instead of dynamic import
      const response = await fetch('http://localhost:5000/api/users/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('monexa_token')}`
        },
        body: JSON.stringify({ password: currentPassword })
      });

      const result = await response.json();
      
      if (result.success) {
        setStep(2);
        setVerificationError(null);
      } else {
        setVerificationError(result.error || 'Current password is incorrect');
        setCurrentPassword('');
      }
    } catch (error) {
      console.error('Password verification error:', error);
      setVerificationError('An error occurred while verifying password');
      setCurrentPassword('');
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleChangePassword = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) return;
    
    if (newPassword !== confirmPassword) {
      // Show error
      return;
    }

    if (passwordStrength.score < 3) {
      // Show error
      return;
    }

    // Call the parent function to handle password change
    onPasswordChange(currentPassword, newPassword);
  };

  const handleClose = () => {
    setStep(1);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswords({ current: false, new: false, confirm: false });
    onClose();
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleClose}>
              <X size={20} />
            </CloseButton>

            <ModalHeader>
              <ModalIcon>
                <Key size={20} />
              </ModalIcon>
              <div>
                <ModalTitle>Change Password</ModalTitle>
                <ModalDescription>
                  {step === 1 
                    ? "First, verify your current password" 
                    : "Enter your new password"
                  }
                </ModalDescription>
              </div>
            </ModalHeader>

            <StepIndicator>
              <Step active={step === 1}>
                <StepNumber active={step === 1}>1</StepNumber>
                Verify Current
              </Step>
              <Step active={step === 2}>
                <StepNumber active={step === 2}>2</StepNumber>
                New Password
              </Step>
            </StepIndicator>

            {step === 1 ? (
              <form onSubmit={(e) => { e.preventDefault(); handleVerifyCurrentPassword(); }}>
                <FormGroup>
                  <Label>Current Password</Label>
                  <InputGroup>
                                         <Input
                       type={showPasswords.current ? 'text' : 'password'}
                       value={currentPassword}
                       onChange={(e) => setCurrentPassword(e.target.value)}
                       placeholder="Enter your current password"
                       disabled={verificationLoading}
                       autoFocus
                     />
                     <PasswordToggle
                       type="button"
                       onClick={() => togglePasswordVisibility('current')}
                       disabled={verificationLoading}
                     >
                       {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                     </PasswordToggle>
                   </InputGroup>
                   
                   {verificationError && (
                     <ErrorMessage>
                       <AlertCircle size={12} />
                       {verificationError}
                     </ErrorMessage>
                   )}
                 </FormGroup>

                 <ButtonGroup>
                   <Button
                     type="button"
                     className="secondary"
                     onClick={handleClose}
                     disabled={verificationLoading}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     Cancel
                   </Button>
                   <Button
                     type="submit"
                     disabled={!currentPassword.trim() || verificationLoading}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     {verificationLoading ? 'Verifying...' : 'Verify & Continue'}
                   </Button>
                 </ButtonGroup>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                <FormGroup>
                  <Label>New Password</Label>
                  <InputGroup>
                    <Input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className={newPassword ? (passwordStrength.score >= 3 ? 'success' : 'error') : ''}
                      disabled={loading}
                      autoFocus
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      disabled={loading}
                    >
                      {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                    </PasswordToggle>
                  </InputGroup>
                  
                  {newPassword && (
                    <>
                      <PasswordStrength>
                        Password Strength: {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                        <StrengthBar>
                          <StrengthFill strength={passwordStrength.strength} />
                        </StrengthBar>
                      </PasswordStrength>

                      <PasswordRequirements>
                        <Requirement met={passwordStrength.requirements.length}>
                          {passwordStrength.requirements.length ? <Check size={12} /> : <AlertCircle size={12} />}
                          At least 8 characters
                        </Requirement>
                        <Requirement met={passwordStrength.requirements.uppercase}>
                          {passwordStrength.requirements.uppercase ? <Check size={12} /> : <AlertCircle size={12} />}
                          One uppercase letter
                        </Requirement>
                        <Requirement met={passwordStrength.requirements.lowercase}>
                          {passwordStrength.requirements.lowercase ? <Check size={12} /> : <AlertCircle size={12} />}
                          One lowercase letter
                        </Requirement>
                        <Requirement met={passwordStrength.requirements.number}>
                          {passwordStrength.requirements.number ? <Check size={12} /> : <AlertCircle size={12} />}
                          One number
                        </Requirement>
                        <Requirement met={passwordStrength.requirements.special}>
                          {passwordStrength.requirements.special ? <Check size={12} /> : <AlertCircle size={12} />}
                          One special character
                        </Requirement>
                      </PasswordRequirements>
                    </>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Confirm New Password</Label>
                  <InputGroup>
                    <Input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className={confirmPassword ? (newPassword === confirmPassword ? 'success' : 'error') : ''}
                      disabled={loading}
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      disabled={loading}
                    >
                      {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </PasswordToggle>
                  </InputGroup>
                </FormGroup>

                {error && (
                  <ErrorMessage>
                    <AlertCircle size={12} />
                    {error}
                  </ErrorMessage>
                )}

                <ButtonGroup>
                  <Button
                    type="button"
                    className="secondary"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!newPassword.trim() || !confirmPassword.trim() || newPassword !== confirmPassword || passwordStrength.score < 3 || loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Changing Password...' : 'Change Password'}
                  </Button>
                </ButtonGroup>
              </form>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default PasswordChangeModal;
