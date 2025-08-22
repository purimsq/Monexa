import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Shield, Check, AlertCircle, Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../services/api';

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
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
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
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
`;

const StepNumber = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.active ? '#3b82f6' : '#cbd5e1'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
`;

const SecretKeyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f1f5f9;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #1e293b;
  letter-spacing: 1px;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    background: #eff6ff;
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

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;
  text-align: center;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
    letter-spacing: normal;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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

  &.danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
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

const SuccessMessage = styled.div`
  color: #10b981;
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoBox = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoText = styled.div`
  color: #1e40af;
  font-size: 14px;
  line-height: 1.5;
`;

const TwoFactorSetupModal = ({ 
  isOpen, 
  onClose, 
  current2FAStatus = false,
  onStatusChange 
}) => {
  const [step, setStep] = useState(1); // 1: setup, 2: verify, 3: success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [verificationToken, setVerificationToken] = useState('');
  const [isDisabling, setIsDisabling] = useState(false);

  useEffect(() => {
    if (isOpen && !current2FAStatus) {
      generateSecret();
    }
  }, [isOpen, current2FAStatus]);

  const generateSecret = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.generate2FASecret();
      if (result.success) {
        setQrCode(result.qrCode);
        setSecretKey(result.secret);
        setStep(1);
      } else {
        setError(result.error || 'Failed to generate 2FA secret');
      }
    } catch (error) {
      setError('Failed to generate 2FA secret');
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    if (!verificationToken.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.enable2FA(verificationToken);
      if (result.success) {
        setSuccess('Two-factor authentication enabled successfully!');
        setStep(3);
        if (onStatusChange) {
          onStatusChange(true);
        }
      } else {
        setError(result.error || 'Failed to enable 2FA');
        setVerificationToken('');
      }
    } catch (error) {
      setError('Failed to enable 2FA');
      setVerificationToken('');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!verificationToken.trim()) return;
    
    setIsDisabling(true);
    setError(null);
    
    try {
      const result = await apiService.disable2FA(verificationToken);
      if (result.success) {
        setSuccess('Two-factor authentication disabled successfully!');
        if (onStatusChange) {
          onStatusChange(false);
        }
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.error || 'Failed to disable 2FA');
        setVerificationToken('');
      }
    } catch (error) {
      setError('Failed to disable 2FA');
      setVerificationToken('');
    } finally {
      setIsDisabling(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleClose = () => {
    setStep(1);
    setVerificationToken('');
    setError(null);
    setSuccess(null);
    setQrCode(null);
    setSecretKey(null);
    onClose();
  };

  const renderSetupStep = () => (
    <>
      <InfoBox>
        <InfoTitle>
          <Shield size={16} />
          Enhanced Security
        </InfoTitle>
        <InfoText>
          Two-factor authentication adds an extra layer of security to your account. 
          You'll need to enter a code from your authenticator app in addition to your password.
        </InfoText>
      </InfoBox>

      <StepIndicator>
        <Step active={step === 1}>
          <StepNumber active={step === 1}>1</StepNumber>
          Setup
        </Step>
        <Step active={step === 2}>
          <StepNumber active={step === 2}>2</StepNumber>
          Verify
        </Step>
        <Step active={step === 3}>
          <StepNumber active={step === 3}>3</StepNumber>
          Complete
        </Step>
      </StepIndicator>

      <div>
        <h4 style={{ marginBottom: '16px', color: '#1e293b' }}>Step 1: Scan QR Code</h4>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>
          Open your authenticator app (Google Authenticator, Authy, etc.) and scan this QR code:
        </p>
        
        {qrCode && (
          <QRCodeContainer>
            <QRCodeImage src={qrCode} alt="2FA QR Code" />
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#64748b', marginBottom: '8px' }}>Or enter this code manually:</p>
              <SecretKeyContainer>
                <span>{secretKey}</span>
                <CopyButton onClick={() => copyToClipboard(secretKey)}>
                  <Copy size={16} />
                </CopyButton>
              </SecretKeyContainer>
            </div>
          </QRCodeContainer>
        )}

        <ButtonGroup>
          <Button
            className="secondary"
            onClick={handleClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setStep(2)}
            disabled={!qrCode}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Next: Verify Code
          </Button>
        </ButtonGroup>
      </div>
    </>
  );

  const renderVerifyStep = () => (
    <>
      <StepIndicator>
        <Step active={false}>
          <StepNumber active={false}>1</StepNumber>
          Setup
        </Step>
        <Step active={step === 2}>
          <StepNumber active={step === 2}>2</StepNumber>
          Verify
        </Step>
        <Step active={false}>
          <StepNumber active={false}>3</StepNumber>
          Complete
        </Step>
      </StepIndicator>

      <div>
        <h4 style={{ marginBottom: '16px', color: '#1e293b' }}>Step 2: Verify Code</h4>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>
          Enter the 6-digit code from your authenticator app to complete setup:
        </p>
        
        <FormGroup>
          <Label>Verification Code</Label>
          <Input
            type="text"
            value={verificationToken}
            onChange={(e) => setVerificationToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            autoFocus
          />
        </FormGroup>

        {error && (
          <ErrorMessage>
            <AlertCircle size={12} />
            {error}
          </ErrorMessage>
        )}

        <ButtonGroup>
          <Button
            className="secondary"
            onClick={() => setStep(1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </Button>
          <Button
            onClick={handleEnable2FA}
            disabled={!verificationToken.trim() || verificationToken.length !== 6 || loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Enabling...' : 'Enable 2FA'}
          </Button>
        </ButtonGroup>
      </div>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <StepIndicator>
        <Step active={false}>
          <StepNumber active={false}>1</StepNumber>
          Setup
        </Step>
        <Step active={false}>
          <StepNumber active={false}>2</StepNumber>
          Verify
        </Step>
        <Step active={step === 3}>
          <StepNumber active={step === 3}>3</StepNumber>
          Complete
        </Step>
      </StepIndicator>

      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: '#10b981', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 24px',
          color: 'white',
          fontSize: '32px'
        }}>
          <Check size={40} />
        </div>
        
        <h3 style={{ color: '#1e293b', marginBottom: '12px' }}>Setup Complete!</h3>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          Two-factor authentication is now enabled for your account. 
          You'll need to enter a verification code when logging in.
        </p>

        <InfoBox>
          <InfoTitle>
            <AlertCircle size={16} />
            Important
          </InfoTitle>
          <InfoText>
            Keep your authenticator app secure and don't share your backup codes. 
            If you lose access to your authenticator app, you may need to contact support.
          </InfoText>
        </InfoBox>

        <ButtonGroup style={{ justifyContent: 'center', marginTop: '24px' }}>
          <Button
            onClick={handleClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Done
          </Button>
        </ButtonGroup>
      </div>
    </>
  );

  const renderDisableStep = () => (
    <>
      <InfoBox>
        <InfoTitle>
          <AlertCircle size={16} />
          Disable 2FA
        </InfoTitle>
        <InfoText>
          Disabling two-factor authentication will reduce the security of your account. 
          Make sure this is what you want to do.
        </InfoText>
      </InfoBox>

      <div>
        <h4 style={{ marginBottom: '16px', color: '#1e293b' }}>Enter Verification Code</h4>
        <p style={{ color: '#64748b', marginBottom: '16px' }}>
          To disable 2FA, enter the current verification code from your authenticator app:
        </p>
        
        <FormGroup>
          <Label>Verification Code</Label>
          <Input
            type="text"
            value={verificationToken}
            onChange={(e) => setVerificationToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            autoFocus
          />
        </FormGroup>

        {error && (
          <ErrorMessage>
            <AlertCircle size={12} />
            {error}
          </ErrorMessage>
        )}

        {success && (
          <SuccessMessage>
            <Check size={12} />
            {success}
          </SuccessMessage>
        )}

        <ButtonGroup>
          <Button
            className="secondary"
            onClick={handleClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </Button>
          <Button
            className="danger"
            onClick={handleDisable2FA}
            disabled={!verificationToken.trim() || verificationToken.length !== 6 || isDisabling}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isDisabling ? 'Disabling...' : 'Disable 2FA'}
          </Button>
        </ButtonGroup>
      </div>
    </>
  );

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
                <Smartphone size={20} />
              </ModalIcon>
              <div>
                <ModalTitle>
                  {current2FAStatus ? 'Disable Two-Factor Authentication' : 'Set Up Two-Factor Authentication'}
                </ModalTitle>
                <ModalDescription>
                  {current2FAStatus 
                    ? 'Remove the extra security layer from your account'
                    : 'Add an extra layer of security to your account'
                  }
                </ModalDescription>
              </div>
            </ModalHeader>

            {current2FAStatus ? renderDisableStep() : (
              <>
                {step === 1 && renderSetupStep()}
                {step === 2 && renderVerifyStep()}
                {step === 3 && renderSuccessStep()}
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default TwoFactorSetupModal;
