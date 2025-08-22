import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  LayoutDashboard, 
  User, 
  CreditCard, 
  History, 
  Users, 
  FileText, 
  FileCheck,
  ExternalLink
} from 'lucide-react';

const SidebarContainer = styled(motion.div)`
  width: 280px;
  background: ${props => props.theme.colors.card};
  color: ${props => props.theme.colors.textPrimary};
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.medium};
  border-radius: 0 24px 24px 0;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
`;

const LogoSection = styled.div`
  padding: 0 24px 32px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.borderPrimary};
  margin-bottom: 24px;
`;

const LogoText = styled.h2`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent} 0%, ${props => props.theme.colors.accentHover} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const LogoSubtitle = styled.p`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 4px 0 0 0;
  font-weight: 400;
`;

const NavSection = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 8px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 12px;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textPrimary};
    transform: translateX(4px);
  }

  &.active {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textPrimary};
    border-left: 3px solid ${props => props.theme.colors.accent};
    padding-left: 13px;
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const QuickLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 12px;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textPrimary};
    transform: translateX(4px);
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'Producer Profile', icon: User },
  { path: '/my-account', label: 'Finances', icon: CreditCard },
  { path: '/payment-history', label: 'Sales History', icon: History },
  { path: '/beneficiaries', label: 'Clients', icon: Users },
  { path: '/documents', label: 'Beat Library', icon: FileText },
  { path: '/applications', label: 'Analytics', icon: FileCheck },
];

const quickLinks = [
  { href: '#', label: 'Spotify', icon: ExternalLink },
  { href: '#', label: 'SoundCloud', icon: ExternalLink },
  { href: '#', label: 'YouTube', icon: ExternalLink },
];

function Sidebar() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const firstName = user?.name?.split(' ')[0] || 'User';
  
  return (
    <SidebarContainer
      theme={theme}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <LogoSection theme={theme}>
        <LogoText theme={theme}>Monexa</LogoText>
        <LogoSubtitle theme={theme}>{firstName}'s Music Studio</LogoSubtitle>
      </LogoSection>

                         <NavSection>
        <SectionTitle theme={theme}>Studio Menu</SectionTitle>
        {navigationItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            theme={theme}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <item.icon />
            {item.label}
          </NavItem>
        ))}
      </NavSection>

                         <NavSection>
        <SectionTitle theme={theme}>Music Platforms</SectionTitle>
        {quickLinks.map((link) => (
          <QuickLink key={link.label} href={link.href} theme={theme}>
            <link.icon />
            {link.label}
          </QuickLink>
        ))}
      </NavSection>
    </SidebarContainer>
  );
}

export default Sidebar; 