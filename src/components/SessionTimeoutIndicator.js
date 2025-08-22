import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const IndicatorContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 1px solid #f59e0b;
  border-radius: 12px;
  padding: 16px;
  max-width: 300px;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #92400e;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #92400e;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(146, 64, 14, 0.1);
  }
`;

const Message = styled.div`
  font-size: 13px;
  color: #92400e;
  line-height: 1.4;
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(146, 64, 14, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #d97706);
  border-radius: 2px;
`;

const TimeLeft = styled.div`
  font-size: 12px;
  color: #92400e;
  font-weight: 500;
  text-align: center;
`;

const ExtendButton = styled(motion.button)`
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }
`;

const SessionTimeoutIndicator = () => {
  const { lastActivity, sessionTimeout, updateActivity } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkSessionTimeout = () => {
      const now = Date.now();
      const timeoutMs = sessionTimeout * 60 * 1000; // Convert minutes to milliseconds
      const timeSinceActivity = now - lastActivity;
      const remainingTime = timeoutMs - timeSinceActivity;
      
      // Show warning when 30 seconds or less remaining (or 10% of timeout, whichever is less)
      const warningThreshold = Math.min(30000, timeoutMs * 0.1); // 30 seconds or 10% of timeout
      if (remainingTime <= warningThreshold && remainingTime > 0 && !dismissed) {
        setShowWarning(true);
        setTimeLeft(Math.ceil(remainingTime / 1000));
      } else if (remainingTime <= 0) {
        setShowWarning(false);
      } else {
        setShowWarning(false);
      }
    };

    const interval = setInterval(checkSessionTimeout, 1000);
    return () => clearInterval(interval);
  }, [lastActivity, sessionTimeout, dismissed]);

  useEffect(() => {
    if (showWarning) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowWarning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showWarning]);

  const handleExtendSession = () => {
    updateActivity();
    setShowWarning(false);
    setDismissed(true);
    
    // Reset dismissed state after 30 seconds
    setTimeout(() => {
      setDismissed(false);
    }, 30000);
  };

  const handleDismiss = () => {
    setShowWarning(false);
    setDismissed(true);
    
    // Reset dismissed state after 30 seconds
    setTimeout(() => {
      setDismissed(false);
    }, 30000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = showWarning ? (timeLeft / (sessionTimeout * 60)) * 100 : 0;

  return (
    <AnimatePresence>
      {showWarning && (
        <IndicatorContainer
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Header>
            <Title>
              <Clock size={16} />
              Session Timeout Warning
            </Title>
            <CloseButton onClick={handleDismiss}>
              <X size={16} />
            </CloseButton>
          </Header>
          
          <Message>
            Your session will expire soon due to inactivity. 
            Click "Extend Session" to continue working.
          </Message>
          
          <ProgressBar>
            <ProgressFill
              initial={{ width: "100%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </ProgressBar>
          
          <TimeLeft>
            Time remaining: {formatTime(timeLeft)}
          </TimeLeft>
          
          <ExtendButton
            onClick={handleExtendSession}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Extend Session
          </ExtendButton>
        </IndicatorContainer>
      )}
    </AnimatePresence>
  );
};

export default SessionTimeoutIndicator;
