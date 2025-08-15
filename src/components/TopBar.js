import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, ChevronDown, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

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
  position: relative;

  &:hover {
    background: #f1f5f9;
  }
`;

const UserDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;

  &:hover {
    background: #f1f5f9;
    color: #1a1a1a;
  }

  &.danger {
    color: #ef4444;
    
    &:hover {
      background: #fef2f2;
      color: #dc2626;
    }
  }
`;

const UserHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 8px;
`;

const UserHeaderName = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 2px;
`;

const UserHeaderEmail = styled.div`
  font-size: 12px;
  color: #64748b;
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
  const { user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    toast.success('Logged out successfully', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserDropdown(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setShowUserDropdown(false);
  };
  
  return (
    <TopBarContainer>
      <LeftSection>
        <AppName>Monexa</AppName>
        <AppSubtitle>{user?.name || 'User'}'s Music Studio</AppSubtitle>
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

        <UserInfo ref={dropdownRef} onClick={() => setShowUserDropdown(!showUserDropdown)}>
          <Avatar>{user?.avatar || user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</Avatar>
          <UserDetails>
            <UserName>{user?.name || 'User'}</UserName>
            <UserRole>{user?.role || 'Music Producer'}</UserRole>
          </UserDetails>
          <ChevronDown size={16} color="#64748b" />
          
          {showUserDropdown && (
            <UserDropdown
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <UserHeader>
                <UserHeaderName>{user?.name || 'User'}</UserHeaderName>
                <UserHeaderEmail>{user?.email || 'user@monexa.com'}</UserHeaderEmail>
              </UserHeader>
              
              <DropdownItem onClick={handleProfileClick}>
                <User size={16} />
                View Profile
              </DropdownItem>
              
              <DropdownItem onClick={handleSettingsClick}>
                <Settings size={16} />
                Settings
              </DropdownItem>
              
              <DropdownItem className="danger" onClick={handleLogout}>
                <LogOut size={16} />
                Sign Out
              </DropdownItem>
            </UserDropdown>
          )}
        </UserInfo>
      </RightSection>
    </TopBarContainer>
  );
}

export default TopBar; 