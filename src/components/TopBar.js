import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBarContainer = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

       const AppName = styled.h1`
         font-size: 24px;
         font-weight: 700;
         color: #1e293b;
         margin: 0;
       `;

       const AppSubtitle = styled.p`
         font-size: 12px;
         color: #64748b;
         margin: 0;
         font-weight: 400;
       `;

const SearchContainer = styled.div`
  position: relative;
  margin-left: 48px;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 12px 16px 12px 48px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  font-size: 14px;
  color: #1e293b;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  width: 20px;
  height: 20px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid #ffffff;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

const UserRole = styled.span`
  font-size: 12px;
  color: #64748b;
`;

function TopBar() {
  const navigate = useNavigate();
  
  return (
    <TopBarContainer>
                   <LeftSection>
               <AppName>Monexa</AppName>
               <AppSubtitle>Russell's Music Studio</AppSubtitle>
               <SearchContainer>
          <SearchIcon />
                           <SearchInput placeholder="Search beats, clients, sales..." />
        </SearchContainer>
      </LeftSection>

      <RightSection>
        <IconButton
          onClick={() => navigate('/notifications')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={20} />
          <NotificationBadge />
        </IconButton>

        <IconButton
          onClick={() => navigate('/settings')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings size={20} />
        </IconButton>

        <UserInfo>
                         <Avatar>RM</Avatar>
                           <UserDetails>
                   <UserName>Russell Mwaura</UserName>
                   <UserRole>Music Producer</UserRole>
                 </UserDetails>
          <ChevronDown size={16} color="#64748b" />
        </UserInfo>
      </RightSection>
    </TopBarContainer>
  );
}

export default TopBar; 