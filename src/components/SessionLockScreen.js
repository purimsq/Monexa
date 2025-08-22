import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Lock, Eye, EyeOff, Shield, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LockOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const LockCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #ef4444, #f59e0b);
  }
`;

const LockIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: white;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  position: relative;
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

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecurityNotice = styled.div`
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 10px;
  padding: 16px;
  margin-top: 24px;
  text-align: left;
`;

const SecurityNoticeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const SecurityNoticeTitle = styled.div`
  font-weight: 600;
  color: #92400e;
  font-size: 14px;
`;

const SecurityNoticeText = styled.div`
  font-size: 12px;
  color: #92400e;
  line-height: 1.4;
`;

const SessionLockScreen = () => {
  const { isSessionLocked, unlockSession, complete2FALogin, requires2FA, tempCredentials } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (requires2FA) {
        const result = await complete2FALogin(twoFactorToken);
        if (result.success) {
          toast.success('Session restored successfully!');
        } else {
          setError(result.error || 'Invalid 2FA token');
        }
      } else {
        const result = await unlockSession(email, password, twoFactorToken);
        if (result.success) {
          toast.success('Session restored successfully!');
        } else if (result.requires2FA) {
          // 2FA required, form will update automatically
        } else {
          setError(result.error || 'Invalid credentials');
        }
      }
    } catch (error) {
      setError('An error occurred while restoring session');
    } finally {
      setLoading(false);
    }
  };

  if (!isSessionLocked) return null;

  return (
    <LockOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LockCard
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <LockIcon>
          <Lock size={32} />
        </LockIcon>
        
        <Title>Session Locked</Title>
        <Description>
          Your session has been locked due to inactivity. 
          Please enter your credentials to continue where you left off.
        </Description>

        <Form onSubmit={handleSubmit}>
          {!requires2FA ? (
            <>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={error ? 'error' : ''}
                  autoComplete="off"
                />
              </InputGroup>

              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={error ? 'error' : ''}
                  autoComplete="off"
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </PasswordToggle>
              </InputGroup>
            </>
          ) : (
            <InputGroup>
              <Input
                type="text"
                placeholder="Enter 2FA code"
                value={twoFactorToken}
                onChange={(e) => setTwoFactorToken(e.target.value)}
                required
                className={error ? 'error' : ''}
                maxLength={6}
                autoComplete="off"
              />
            </InputGroup>
          )}

          {error && (
            <div style={{ color: '#ef4444', fontSize: '14px', textAlign: 'left' }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Shield size={16} />
            {loading ? 'Restoring Session...' : 'Unlock Session'}
          </Button>
        </Form>

        <SecurityNotice>
          <SecurityNoticeHeader>
            <Clock size={16} color="#f59e0b" />
            <SecurityNoticeTitle>Security Notice</SecurityNoticeTitle>
          </SecurityNoticeHeader>
          <SecurityNoticeText>
            Your session was automatically locked for security. 
            This helps protect your account from unauthorized access.
          </SecurityNoticeText>
        </SecurityNotice>
      </LockCard>
    </LockOverlay>
  );
};

export default SessionLockScreen;
