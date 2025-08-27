import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Lock, Mail, AlertCircle, Loader } from 'lucide-react';

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

const PayPalLogo = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  .logo {
    font-size: 32px;
    font-weight: 700;
    color: #0070ba;
    margin-bottom: 8px;
  }
  
  .subtitle {
    color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
    font-size: 16px;
  }
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

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme?.colors?.textPrimary || '#1f2937'};
    background: ${props => props.theme?.colors?.tertiary || '#f3f4f6'};
  }
`;

const LoginButton = styled(motion.button)`
  background: linear-gradient(135deg, #0070ba, #005ea6);
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

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: #0070ba;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.2s ease;
  
  &:hover {
    color: #005ea6;
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme?.colors?.borderSecondary || '#e5e7eb'};
  }
  
  span {
    padding: 0 16px;
    color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
    font-size: 14px;
  }
`;

const PayPalOAuthButton = styled(motion.button)`
  width: 100%;
  background: #0070ba;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 112, 186, 0.4);
    background: #005ea6;
  }
`;

const PayPalLoginModal = ({ isOpen, onClose, onSuccess, theme }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [useOAuth, setUseOAuth] = useState(false);

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
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      // Call PayPal API to validate credentials
      const response = await fetch('http://localhost:5000/api/paypal/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('monexa_token')}`
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('PayPal account connected successfully!');
        setTimeout(() => {
          onSuccess(data);
          onClose();
        }, 1500);
      } else {
        setError(data.message || 'Invalid PayPal credentials');
      }
    } catch (error) {
      console.error('PayPal login error:', error);
      setError('Failed to connect PayPal account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = () => {
    setUseOAuth(true);
    // Redirect to PayPal OAuth
    const clientId = 'ARwhHhZI251Rzf-pfyfP7jJPf0cKgZC3EskfOUSdz4aXufA9SStx3oCDjEspCr6SiY8Ok3OznjH_qL-V';
    const redirectUri = encodeURIComponent(`${window.location.origin}/paypal/callback`);
    const scope = encodeURIComponent('openid email profile');
    const responseType = 'code';
    
    const paypalAuthUrl = `https://www.paypal.com/signin/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
    
    window.location.href = paypalAuthUrl;
  };

  const handleForgotPassword = () => {
    // Open PayPal forgot password page
    window.open('https://www.paypal.com/signin/forgot-password', '_blank');
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

          <PayPalLogo theme={theme}>
            <div className="logo">PayPal</div>
            <div className="subtitle">Connect your PayPal account to Monexa</div>
          </PayPalLogo>

          {error && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {error}
            </ErrorMessage>
          )}

          {success && (
            <SuccessMessage>
              <AlertCircle size={16} />
              {success}
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label theme={theme}>PayPal Email</Label>
              <InputWrapper>
                <InputIcon theme={theme}>
                  <Mail size={20} />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your PayPal email"
                  theme={theme}
                  error={error}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>PayPal Password</Label>
              <InputWrapper>
                <InputIcon theme={theme}>
                  <Lock size={20} />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your PayPal password"
                  theme={theme}
                  error={error}
                  required
                />
                <PasswordToggle
                  theme={theme}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </PasswordToggle>
              </InputWrapper>
            </FormGroup>

            <ForgotPasswordLink onClick={handleForgotPassword}>
              Forgot your password?
            </ForgotPasswordLink>

            <LoginButton
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Connect PayPal Account
                </>
              )}
            </LoginButton>
          </Form>

          <Divider theme={theme}>
            <span>or</span>
          </Divider>

          <PayPalOAuthButton
            onClick={handleOAuthLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%' }}></div>
            Continue with PayPal
          </PayPalOAuthButton>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default PayPalLoginModal;

