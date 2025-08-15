import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AuthContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 50%);
  backdrop-filter: blur(100px);
`;

const BlurredOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const AuthCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 100%;
  max-width: ${props => props.$isWide ? '520px' : '420px'};
  position: relative;
  z-index: 10;
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Logo = styled.div`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #000000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

const Tagline = styled.p`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  margin: 0;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  border-radius: 50%;
  background: ${props => props.color || 'rgba(59, 130, 246, 0.6)'};
  filter: blur(${props => props.blur || '2px'});
  z-index: 1;
`;

const AuthLayout = ({ children, title, subtitle, isWide = false }) => {
  return (
    <AuthContainer>
      <BackgroundPattern />
      <BlurredOverlay />
      
      {/* Floating elements for ambiance */}
      <FloatingElement
        size="60px"
        color="rgba(59, 130, 246, 0.4)"
        blur="4px"
        style={{ top: '15%', left: '10%' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <FloatingElement
        size="40px"
        color="rgba(168, 85, 247, 0.3)"
        blur="3px"
        style={{ top: '60%', right: '15%' }}
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <FloatingElement
        size="80px"
        color="rgba(34, 197, 94, 0.2)"
        blur="5px"
        style={{ bottom: '20%', left: '20%' }}
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      <AuthCard
        $isWide={isWide}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      >
        <AuthHeader>
          <Logo>Monexa</Logo>
          <Tagline>Music Studio Management Platform</Tagline>
        </AuthHeader>
        
        {children}
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthLayout;
