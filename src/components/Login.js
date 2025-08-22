import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from './AuthLayout';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }

  &:invalid {
    border-color: #ef4444;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: #94a3b8;
  z-index: 2;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    color: #1a1a1a;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const LoginButton = styled(motion.button)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`;

const DividerText = styled.span`
  padding: 0 16px;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 8px;
`;

const SignupText = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0;
`;

const SignupButton = styled.button`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.2s ease;

  &:hover {
    color: #333333;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ef4444;
`;

const TwoFactorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`;

const TwoFactorTitle = styled.h2`
  color: #1e293b;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const TwoFactorDescription = styled.p`
  color: #64748b;
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
`;

const TwoFactorInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
    letter-spacing: 2px;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const BackButton = styled(motion.button)`
  background: none;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }
`;

const Login = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempCredentials, setTempCredentials] = useState(null);
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handle2FAInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only allow digits, max 6
    setTwoFactorToken(value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validate2FA = () => {
    if (!twoFactorToken || twoFactorToken.length !== 6) {
      setErrors(prev => ({ ...prev, twoFactor: 'Please enter a valid 6-digit code' }));
      return false;
    }
    setErrors(prev => ({ ...prev, twoFactor: '' }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Welcome back to Monexa!', {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else if (result.requires2FA) {
        // Store credentials temporarily and show 2FA input
        setTempCredentials({ email: formData.email, password: formData.password });
        setRequires2FA(true);
        toast.info('Please enter your 2FA code', {
          position: "bottom-right",
          autoClose: 4000,
        });
      } else {
        toast.error(result.error || 'Login failed. Please try again.', {
          position: "bottom-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.', {
        position: "bottom-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    
    if (!validate2FA()) return;

    setIsLoading(true);
    
    try {
      const result = await login(tempCredentials.email, tempCredentials.password, twoFactorToken);
      
      if (result.success) {
        toast.success('Welcome back to Monexa!', {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error(result.error || 'Invalid 2FA code. Please try again.', {
          position: "bottom-right",
          autoClose: 4000,
        });
        setTwoFactorToken('');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.', {
        position: "bottom-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setRequires2FA(false);
    setTwoFactorToken('');
    setTempCredentials(null);
    setErrors({});
  };

  if (requires2FA) {
    return (
      <AuthLayout>
        <TwoFactorContainer>
          <div>
            <TwoFactorTitle>Two-Factor Authentication</TwoFactorTitle>
            <TwoFactorDescription>
              Enter the 6-digit code from your authenticator app
            </TwoFactorDescription>
          </div>

          <Form onSubmit={handle2FASubmit}>
            <FormGroup>
              <InputContainer>
                <InputIcon>
                  <Shield size={20} />
                </InputIcon>
                <TwoFactorInput
                  type="text"
                  placeholder="000000"
                  value={twoFactorToken}
                  onChange={handle2FAInputChange}
                  maxLength={6}
                  autoFocus
                />
              </InputContainer>
              {errors.twoFactor && <ErrorMessage>{errors.twoFactor}</ErrorMessage>}
            </FormGroup>

            <LoginButton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              {!isLoading && <ArrowRight size={20} />}
            </LoginButton>

            <BackButton
              type="button"
              onClick={handleBackToLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={16} />
              Back to Login
            </BackButton>
          </Form>
        </TwoFactorContainer>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email Address</Label>
          <InputContainer>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputContainer>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <InputContainer>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputContainer>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>

        <LoginButton
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
          {!isLoading && <ArrowRight size={20} />}
        </LoginButton>

        <DividerContainer>
          <Divider />
          <DividerText>or</DividerText>
          <Divider />
        </DividerContainer>

        <SignupLink>
          <SignupText>
            Don't have an account?{' '}
            <SignupButton type="button" onClick={onSwitchToSignup}>
              Create Account
            </SignupButton>
          </SignupText>
        </SignupLink>
      </Form>
    </AuthLayout>
  );
};

export default Login;
