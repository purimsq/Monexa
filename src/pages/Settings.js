import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Settings as SettingsIcon,
  ArrowLeft,
  User,
  Bell,
  CreditCard,
  Shield,
  Palette,
  Download,
  Globe,
  Save,
  X,
  Key,
  Monitor,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, fonts, accentThemes } from '../contexts/ThemeContext';
import apiService from '../services/api';
import PasswordVerificationModal from '../components/PasswordVerificationModal';
import PasswordChangeModal from '../components/PasswordChangeModal';
import TwoFactorSetupModal from '../components/TwoFactorSetupModal';

const Container = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 32px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textPrimary};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textPrimary};
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 1600px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const SettingsCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border-radius: 20px;
  padding: 40px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 1px solid ${props => props.theme.colors.borderSecondary};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 500px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentHover});
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    border-color: #e2e8f0;
    
    &::before {
      opacity: 1;
    }
  }

  &.featured {
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border: 2px solid #e2e8f0;
    
    &::before {
      opacity: 1;
      background: linear-gradient(135deg, #1a1a1a, #333333, #1a1a1a);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
  }
  
  ${props => props.theme.name === 'glassmorphism' && `
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    
    &:hover {
      background: rgba(255, 255, 255, 0.35);
      box-shadow: 0 12px 40px rgba(31, 38, 135, 0.45);
      transform: translateY(-4px);
    }
    
    &::before {
      background: linear-gradient(135deg, #4caf50, #66bb6a);
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::after {
    transform: translateX(100%);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #f1f5f9;
  gap: 24px;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
  font-size: 15px;
`;

const SettingDescription = styled.div`
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: #1a1a1a;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #cbd5e1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  min-width: 280px;
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

const Select = styled.select`
  min-width: 280px;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &.active {
    transform: scale(1.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ColorOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 16px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 24px;
  background: ${props => {
    if (props.theme?.name === 'glassmorphism') {
      return 'rgba(255, 255, 255, 0.4)';
    } else if (props.theme?.name === 'dark') {
      return 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
    } else {
      return 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)';
    }
  }};
  backdrop-filter: ${props => props.theme?.name === 'glassmorphism' ? 'blur(20px) saturate(180%)' : 'none'};
  border-radius: 16px;
  border: ${props => {
    if (props.theme?.name === 'glassmorphism') {
      return props.theme?.colors?.borderPrimary || '1px solid rgba(255, 255, 255, 0.5)';
    } else if (props.theme?.name === 'dark') {
      return '1px solid #475569';
    } else {
      return '1px solid #e2e8f0';
    }
  }};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => {
    if (props.theme?.name === 'glassmorphism') {
      return props.theme?.shadows?.medium || '0 8px 32px rgba(31, 38, 135, 0.4)';
    } else if (props.theme?.name === 'dark') {
      return '0 8px 32px rgba(0, 0, 0, 0.3)';
    } else {
      return '0 4px 16px rgba(0, 0, 0, 0.04)';
    }
  }};

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: ${props => {
      if (props.theme?.name === 'glassmorphism') {
        const accentColor = props.theme?.colors?.accent || '#4caf50';
        // Extract RGB from hex color for rgba
        const hexToRgb = (hex) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '76, 175, 80';
        };
        const rgb = hexToRgb(accentColor);
        return `radial-gradient(circle, rgba(${rgb}, 0.1) 0%, transparent 70%)`;
      } else if (props.theme?.name === 'dark') {
        return 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)';
      } else {
        return 'radial-gradient(circle, rgba(26,26,26,0.03) 0%, transparent 70%)';
      }
    }};
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }
`;

const ProfileAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: ${props => {
    if (props.theme?.name === 'glassmorphism') {
      const accentColor = props.theme?.colors?.accent || '#4caf50';
      const accentHover = props.theme?.colors?.accentHover || '#2e7d32';
      return `linear-gradient(135deg, ${accentColor}, ${accentHover})`;
    } else if (props.theme?.name === 'dark') {
      return 'linear-gradient(135deg, #475569, #64748b)';
    } else {
      return 'linear-gradient(135deg, #1a1a1a, #333333)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 28px;
  position: relative;
  box-shadow: ${props => {
    if (props.theme?.name === 'glassmorphism') {
      return props.theme?.shadows?.small || '0 8px 24px rgba(76, 175, 80, 0.3)';
    } else if (props.theme?.name === 'dark') {
      return '0 8px 24px rgba(0, 0, 0, 0.4)';
    } else {
      return '0 8px 24px rgba(26, 26, 26, 0.2)';
    }
  }};

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: ${props => {
      if (props.theme?.name === 'glassmorphism') {
        const accentColor = props.theme?.colors?.accent || '#4caf50';
        const accentHover = props.theme?.colors?.accentHover || '#2e7d32';
        return `linear-gradient(45deg, ${accentColor}, ${accentHover}, ${accentColor})`;
      } else if (props.theme?.name === 'dark') {
        return 'linear-gradient(45deg, #475569, #64748b, #475569)';
      } else {
        return 'linear-gradient(45deg, #1a1a1a, #333333, #1a1a1a)';
      }
    }};
    background-size: 200% 200%;
    animation: borderGlow 3s ease-in-out infinite;
    z-index: -1;
  }

  @keyframes borderGlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.div`
  font-weight: 600;
  color: ${props => {
    if (props.theme?.name === 'glassmorphism') {
      return '#1a237e';
    } else if (props.theme?.name === 'dark') {
      return '#f8fafc';
    } else {
      return '#1e293b';
    }
  }};
  font-size: 16px;
  margin-bottom: 4px;
`;

const ProfileEmail = styled.div`
  color: ${props => {
    if (props.theme?.name === 'glassmorphism') {
      return '#283593';
    } else if (props.theme?.name === 'dark') {
      return '#cbd5e1';
    } else {
      return '#64748b';
    }
  }};
  font-size: 14px;
`;

// Add shimmer animation
const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// Modal styled components
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
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-right: 40px;
`;

const ModalIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin: 0 0 8px 0;
`;

const ModalDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;





const Settings = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { theme, themeName, toggleTheme, selectedFont, setSelectedFont, selectedAccent, setSelectedAccent } = useTheme();
  
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    salesNotifications: true,
    messageNotifications: true,
    systemNotifications: false,
    
    // Payment Settings
    defaultCurrency: 'USD',
    autoWithdraw: false,
    paymentReminders: true,
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    
    // Appearance Settings
    theme: 'light',
    accentColor: '#1a1a1a',
    compactMode: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessages: true
  });

  // Modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showExportPasswordModal, setShowExportPasswordModal] = useState(false);
  const [showDeletePasswordModal, setShowDeletePasswordModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Initialize settings with user data
  useEffect(() => {
    loadUserSettings();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadUserSettings = async () => {
    if (user) {
      try {
        const nameParts = user.name ? user.name.split(' ') : ['', ''];
        
        // Load user settings from API
        const settingsResponse = await apiService.getUserSettings();
        const userSettings = settingsResponse.success ? settingsResponse.settings : {};

        setSettings(prev => ({
          ...prev,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: user.bio || `Professional ${user.role || 'music producer'} passionate about creating amazing music.`,
          
          // Merge with user settings from API
          emailNotifications: userSettings.email_notifications ?? prev.emailNotifications,
          pushNotifications: userSettings.push_notifications ?? prev.pushNotifications,
          salesNotifications: userSettings.sales_notifications ?? prev.salesNotifications,
          messageNotifications: userSettings.message_notifications ?? prev.messageNotifications,
          systemNotifications: userSettings.system_notifications ?? prev.systemNotifications,
          defaultCurrency: userSettings.default_currency ?? prev.defaultCurrency,
          autoWithdraw: userSettings.auto_withdraw ?? prev.autoWithdraw,
          paymentReminders: userSettings.payment_reminders ?? prev.paymentReminders,
          twoFactorAuth: userSettings.two_factor_auth ?? prev.twoFactorAuth,
          loginAlerts: userSettings.login_alerts ?? prev.loginAlerts,
          sessionTimeout: userSettings.session_timeout ?? prev.sessionTimeout,
          theme: userSettings.theme ?? prev.theme,
          accentColor: userSettings.accent_color ?? prev.accentColor,
          compactMode: userSettings.compact_mode ?? prev.compactMode,
          profileVisibility: userSettings.profile_visibility ?? prev.profileVisibility,
          showOnlineStatus: userSettings.show_online_status ?? prev.showOnlineStatus,
          allowMessages: userSettings.allow_messages ?? prev.allowMessages
        }));
      } catch (error) {
        console.error('Failed to load user settings:', error);
      }
    }
  };

  const handleSettingChange = async (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Update setting in backend
    try {
      const settingData = {};
      
      // Map frontend setting names to backend names
      const settingMap = {
        emailNotifications: 'email_notifications',
        pushNotifications: 'push_notifications',
        salesNotifications: 'sales_notifications',
        messageNotifications: 'message_notifications',
        systemNotifications: 'system_notifications',
        defaultCurrency: 'default_currency',
        autoWithdraw: 'auto_withdraw',
        paymentReminders: 'payment_reminders',
        twoFactorAuth: 'two_factor_auth',
        loginAlerts: 'login_alerts',
        sessionTimeout: 'session_timeout',
        theme: 'theme',
        accentColor: 'accent_color',
        compactMode: 'compact_mode',
        profileVisibility: 'profile_visibility',
        showOnlineStatus: 'show_online_status',
        allowMessages: 'allow_messages'
      };

      const backendKey = settingMap[key] || key;
      settingData[backendKey] = value;

      await apiService.updateUserSettings(settingData);
      
      // If session timeout was updated, show a special message and trigger custom event
      if (key === 'sessionTimeout') {
        // Trigger custom event to notify AuthContext
        const event = new CustomEvent('sessionTimeoutChanged', {
          detail: value
        });
        window.dispatchEvent(event);
        
        toast.success(`Session timeout updated to ${value} minutes`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.success('Setting updated', {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Failed to update setting:', error);
      toast.error('Failed to update setting');
    }
  };



  const handleSaveProfile = () => {
    setModalError(null);
    setShowPasswordModal(true);
  };

  const handlePasswordVerification = async (password) => {
    setModalLoading(true);
    setModalError(null);

    try {
      const profileData = {
        name: `${settings.firstName} ${settings.lastName}`.trim(),
        email: settings.email,
        phone: settings.phone,
        bio: settings.bio,
        role: user?.role || 'Music Producer', // Add role field
        currentPassword: password
      };
      
      const result = await updateProfile(profileData);
      
      if (result.success) {
        setShowPasswordModal(false);
        setModalLoading(false);
        
        toast.success('Profile updated successfully', {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        setModalError(result.error || 'Failed to update profile');
        setModalLoading(false);
      }
    } catch (error) {
      setModalError('An error occurred while updating profile');
      setModalLoading(false);
    }
  };

  const handlePasswordChange = async (currentPassword, newPassword) => {
    setModalLoading(true);
    setModalError(null);

    try {
      const result = await apiService.changePassword(currentPassword, newPassword);

      if (result.success) {
        setShowPasswordChangeModal(false);
        setModalLoading(false);
        
        toast.success('Password changed successfully! Please log in again with your new password.', {
          position: "bottom-right",
          autoClose: 5000,
        });

        // Optionally logout user to force re-login with new password
        setTimeout(() => {
          // You can add logout logic here if needed
        }, 2000);
      } else {
        setModalError(result.error || 'Failed to change password');
        setModalLoading(false);
      }
    } catch (error) {
      setModalError('An error occurred while changing password');
      setModalLoading(false);
    }
  };

  const handleExportData = () => {
    setShowExportPasswordModal(true);
  };

  const handleExportPasswordVerification = async (password) => {
    try {
      setModalLoading(true);
      setModalError(null);

      // Show loading toast
      const loadingToast = toast.loading('Preparing your data export...', {
        position: "bottom-right",
      });

      const result = await apiService.exportData(password);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success(`Data export completed! Check your email (${result.email}) for the exported files.`, {
          position: "bottom-right",
          autoClose: 5000,
        });
        setShowExportPasswordModal(false);
      } else {
        setModalError(result.error || 'Failed to export data');
      }
    } catch (error) {
      console.error('Export data error:', error);
      setModalError('Failed to export data. Please try again later.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeletePasswordModal(true);
  };

  const handleDeletePasswordVerification = async (password) => {
    try {
      setModalLoading(true);
      setModalError(null);

      // Verify password first
      const verifyResult = await apiService.verifyPassword(password);
      
      if (verifyResult.success) {
        // Password is correct, show final confirmation
        setShowDeletePasswordModal(false);
        setShowDeleteConfirmationModal(true);
      } else {
        setModalError('Password is incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Password verification error:', error);
      setModalError('Failed to verify password. Please try again.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteAccountConfirmation = async () => {
    try {
      setModalLoading(true);
      setModalError(null);

      const result = await apiService.deleteAccount();
      
      if (result.success) {
        toast.success('Account deleted successfully. You will be logged out.', {
          position: "bottom-right",
          autoClose: 3000,
        });
        
        // Clear local storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setModalError(result.error || 'Failed to delete account. Please try again.');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      setModalError('Failed to delete account. Please try again later.');
    } finally {
      setModalLoading(false);
    }
  };

  // Remove the old accentColors array since we're using accentThemes now

  return (
          <Container theme={theme}>
              <Header>
          <BackButton
            theme={theme}
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={20} />
            Back
          </BackButton>
          <Title theme={theme}>
            <SettingsIcon size={28} />
            Settings
          </Title>
        </Header>

      <style>{shimmerAnimation}</style>
      <SettingsGrid>
        {/* Profile Settings - Top Left */}
        <SettingsCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          theme={theme}
        >
          <CardHeader>
            <CardIcon>
              <User size={24} />
            </CardIcon>
            <CardTitle>Profile & Identity</CardTitle>
          </CardHeader>

          <ProfileSection theme={theme}>
            <ProfileAvatar theme={theme}>{user?.avatar || user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</ProfileAvatar>
            <ProfileInfo>
              <ProfileName theme={theme}>{user?.name || 'User'}</ProfileName>
              <ProfileEmail theme={theme}>{user?.email || 'user@email.com'}</ProfileEmail>
            </ProfileInfo>
          </ProfileSection>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>First Name</SettingLabel>
            </SettingInfo>
            <Input
              value={settings.firstName}
              onChange={(e) => handleSettingChange('firstName', e.target.value)}
              placeholder="Enter first name"
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Last Name</SettingLabel>
            </SettingInfo>
            <Input
              value={settings.lastName}
              onChange={(e) => handleSettingChange('lastName', e.target.value)}
              placeholder="Enter last name"
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Email</SettingLabel>
            </SettingInfo>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange('email', e.target.value)}
              placeholder="Enter email"
            />
          </SettingItem>

                     <SettingItem>
             <SettingInfo>
               <SettingLabel>Phone</SettingLabel>
             </SettingInfo>
             <Input
               value={settings.phone}
               onChange={(e) => handleSettingChange('phone', e.target.value)}
               placeholder="Enter phone number"
             />
           </SettingItem>

           <ButtonGroup>
             <Button
               onClick={handleSaveProfile}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
             >
               <Save size={16} />
               Save Changes
             </Button>
           </ButtonGroup>
        </SettingsCard>

                 {/* Password Management - Top Right */}
                 <SettingsCard
          theme={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
           <CardHeader>
             <CardIcon>
               <Key size={20} />
             </CardIcon>
             <CardTitle>Password Management</CardTitle>
           </CardHeader>

           <SettingItem>
             <SettingInfo>
               <SettingLabel>Change Password</SettingLabel>
               <SettingDescription>Update your password securely with current password verification</SettingDescription>
             </SettingInfo>
             <Button
               onClick={() => setShowPasswordChangeModal(true)}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
             >
               <Key size={16} />
               Change Password
             </Button>
           </SettingItem>

           <SettingItem>
             <SettingInfo>
               <SettingLabel>Password Security</SettingLabel>
               <SettingDescription>Your password must meet security requirements</SettingDescription>
             </SettingInfo>
             <div style={{ fontSize: '12px', color: '#64748b' }}>
               • At least 8 characters<br/>
               • One uppercase letter<br/>
               • One lowercase letter<br/>
               • One number<br/>
               • One special character
             </div>
           </SettingItem>
         </SettingsCard>

        {/* Security Settings - Bottom Left */}
        <SettingsCard
          theme={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <CardIcon>
              <Shield size={20} />
            </CardIcon>
            <CardTitle>Security</CardTitle>
          </CardHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Two-Factor Authentication</SettingLabel>
              <SettingDescription>Add an extra layer of security with authenticator app</SettingDescription>
            </SettingInfo>
            <Button
              onClick={() => setShow2FAModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shield size={16} />
              {settings.twoFactorAuth ? 'Manage 2FA' : 'Enable 2FA'}
            </Button>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Login Alerts</SettingLabel>
              <SettingDescription>Get notified of new login attempts</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.loginAlerts}
                onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Session Timeout</SettingLabel>
              <SettingDescription>Auto-logout after inactivity</SettingDescription>
            </SettingInfo>
            <Select
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
            >
                             <option value="2">2 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Active Sessions</SettingLabel>
              <SettingDescription>Manage your logged-in devices</SettingDescription>
            </SettingInfo>
            <Button
              onClick={() => setShowSessionModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Monitor size={16} />
              Manage Sessions
            </Button>
          </SettingItem>
        </SettingsCard>

        {/* Payment Settings - Bottom Right */}
        <SettingsCard
          theme={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader>
            <CardIcon>
              <CreditCard size={20} />
            </CardIcon>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Default Currency</SettingLabel>
              <SettingDescription>Choose your preferred currency</SettingDescription>
            </SettingInfo>
            <Select
              value={settings.defaultCurrency}
              onChange={(e) => handleSettingChange('defaultCurrency', e.target.value)}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="KES">KES (KSh)</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Auto Withdraw</SettingLabel>
              <SettingDescription>Automatically withdraw earnings</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.autoWithdraw}
                onChange={(e) => handleSettingChange('autoWithdraw', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Payment Reminders</SettingLabel>
              <SettingDescription>Send payment reminders to clients</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.paymentReminders}
                onChange={(e) => handleSettingChange('paymentReminders', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </SettingsCard>

        {/* Notifications - Third Row Left */}
        <SettingsCard
          theme={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardHeader>
            <CardIcon>
              <Bell size={20} />
            </CardIcon>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Email Notifications</SettingLabel>
              <SettingDescription>Receive notifications via email</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Push Notifications</SettingLabel>
              <SettingDescription>Receive push notifications</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Sales Notifications</SettingLabel>
              <SettingDescription>Notify when beats are sold</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.salesNotifications}
                onChange={(e) => handleSettingChange('salesNotifications', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Message Notifications</SettingLabel>
              <SettingDescription>Notify when receiving messages</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.messageNotifications}
                onChange={(e) => handleSettingChange('messageNotifications', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </SettingsCard>

        {/* Appearance Settings - Third Row Right */}
        <SettingsCard
          theme={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CardHeader>
            <CardIcon>
              <Palette size={20} />
            </CardIcon>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Theme</SettingLabel>
              <SettingDescription>Choose your preferred theme</SettingDescription>
            </SettingInfo>
            <Select
              value={themeName}
              onChange={(e) => {
                const newTheme = e.target.value;
                if (newTheme === 'dark' && themeName !== 'dark') {
                  toggleTheme();
                } else if (newTheme === 'light' && themeName !== 'light') {
                  toggleTheme();
                } else if (newTheme === 'glassmorphism' && themeName !== 'glassmorphism') {
                  toggleTheme();
                }
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="glassmorphism">Glassmorphism</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Accent Theme</SettingLabel>
              <SettingDescription>
                Choose your color theme
                {selectedAccent === 'default' && (
                  <span style={{ 
                    color: theme.colors.textTertiary, 
                    fontSize: '11px',
                    display: 'block',
                    marginTop: '2px'
                  }}>
                    • Currently using default neutral theme
                  </span>
                )}
              </SettingDescription>
            </SettingInfo>
            <ColorOptions>
              {Object.entries(accentThemes)
                .filter(([key]) => key !== 'default') // Hide default theme from selection
                .map(([key, accentTheme]) => (
                <div key={key} style={{ textAlign: 'center' }}>
                  <ColorOption
                    style={{ 
                      background: accentTheme.gradient,
                      border: selectedAccent === key ? `3px solid ${theme.colors.textPrimary}` : '3px solid transparent'
                    }}
                    className={selectedAccent === key ? 'active' : ''}
                    onClick={() => {
                      // Toggle functionality: if already selected, go back to default
                      if (selectedAccent === key) {
                        setSelectedAccent('default');
                      } else {
                        setSelectedAccent(key);
                      }
                    }}
                    title={`${accentTheme.name} - ${accentTheme.description}${selectedAccent === key ? ' (Click again to reset to default)' : ''}`}
                  />
                  <div style={{ 
                    fontSize: '11px', 
                    marginTop: '6px',
                    color: theme.colors.textSecondary,
                    fontWeight: selectedAccent === key ? '600' : '400',
                    transition: 'all 0.2s ease'
                  }}>
                    {accentTheme.name}
                  </div>
                </div>
              ))}
            </ColorOptions>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Font Family</SettingLabel>
              <SettingDescription>Choose your preferred font style</SettingDescription>
            </SettingInfo>
            <div style={{ width: '100%' }}>
              <Select
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                style={{ marginBottom: '12px' }}
              >
                <optgroup label="Professional Fonts">
                  {Object.entries(fonts)
                    .filter(([key, font]) => font.category === 'Professional')
                    .map(([key, font]) => (
                      <option key={key} value={key}>
                        {font.name} - {font.description}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Fun & Curvy Fonts">
                  {Object.entries(fonts)
                    .filter(([key, font]) => font.category === 'Fun')
                    .map(([key, font]) => (
                      <option key={key} value={key}>
                        {font.name} - {font.description}
                      </option>
                    ))}
                </optgroup>
              </Select>
              <div style={{ 
                padding: '16px', 
                border: `1px solid ${theme.colors.borderPrimary}`, 
                borderRadius: '12px',
                backgroundColor: theme.colors.secondary,
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <div style={{ 
                  fontFamily: fonts[selectedFont].family,
                  fontWeight: '600',
                  fontSize: '16px',
                  marginBottom: '8px',
                  color: theme.colors.textPrimary
                }}>
                  Sample Heading
                </div>
                <div style={{ 
                  fontFamily: fonts[selectedFont].family,
                  color: theme.colors.textSecondary,
                  marginBottom: '8px'
                }}>
                  This is how your text will look with {fonts[selectedFont].name}. {fonts[selectedFont].description}.
                </div>
                <div style={{ 
                  fontFamily: fonts[selectedFont].family,
                  fontSize: '12px',
                  color: theme.colors.textTertiary,
                  padding: '8px',
                  backgroundColor: theme.colors.tertiary,
                  borderRadius: '6px',
                  border: `1px solid ${theme.colors.borderSecondary}`
                }}>
                  <strong>Category:</strong> {fonts[selectedFont].category}
                </div>
              </div>
            </div>
          </SettingItem>
        </SettingsCard>

        {/* Privacy & Data - Fourth Row Left */}
        <SettingsCard
          theme={theme}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CardHeader>
            <CardIcon>
              <Globe size={20} />
            </CardIcon>
            <CardTitle>Privacy & Data</CardTitle>
          </CardHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Profile Visibility</SettingLabel>
              <SettingDescription>Control who can see your profile</SettingDescription>
            </SettingInfo>
            <Select
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="clients">Clients Only</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Show Online Status</SettingLabel>
              <SettingDescription>Let others see when you're online</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.showOnlineStatus}
                onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Allow Messages</SettingLabel>
              <SettingDescription>Allow clients to send messages</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.allowMessages}
                onChange={(e) => handleSettingChange('allowMessages', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <ButtonGroup>
            <Button
              onClick={handleExportData}
              className="secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
              Export Data
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="danger"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X size={16} />
              Delete Account
            </Button>
          </ButtonGroup>
                 </SettingsCard>
       </SettingsGrid>

       {/* Password Verification Modal */}
       <PasswordVerificationModal
         isOpen={showPasswordModal}
         onClose={() => setShowPasswordModal(false)}
         onVerify={handlePasswordVerification}
         title="Verify Password"
         description="Enter your current password to save profile changes"
         loading={modalLoading}
         error={modalError}
       />

       {/* Export Data Password Modal */}
       <PasswordVerificationModal
         isOpen={showExportPasswordModal}
         onClose={() => setShowExportPasswordModal(false)}
         onVerify={handleExportPasswordVerification}
         title="Export Data"
         description="Enter your password to export your data securely"
         loading={modalLoading}
         error={modalError}
       />

       {/* Delete Account Password Modal */}
       <PasswordVerificationModal
         isOpen={showDeletePasswordModal}
         onClose={() => setShowDeletePasswordModal(false)}
         onVerify={handleDeletePasswordVerification}
         title="Delete Account"
         description="Enter your password to proceed with account deletion"
         loading={modalLoading}
         error={modalError}
       />

       {/* Delete Account Confirmation Modal */}
       <DeleteConfirmationModal
         isOpen={showDeleteConfirmationModal}
         onClose={() => setShowDeleteConfirmationModal(false)}
         onConfirm={handleDeleteAccountConfirmation}
         loading={modalLoading}
         error={modalError}
         theme={theme}
       />

               {/* Password Change Modal */}
        <PasswordChangeModal
          isOpen={showPasswordChangeModal}
          onClose={() => setShowPasswordChangeModal(false)}
          onPasswordChange={handlePasswordChange}
          loading={modalLoading}
          error={modalError}
        />

        {/* Two-Factor Authentication Modal */}
        <TwoFactorSetupModal
          isOpen={show2FAModal}
          onClose={() => setShow2FAModal(false)}
          current2FAStatus={settings.twoFactorAuth}
          onStatusChange={(enabled) => {
            setSettings(prev => ({ ...prev, twoFactorAuth: enabled }));
            toast.success(
              enabled ? 'Two-factor authentication enabled!' : 'Two-factor authentication disabled!',
              { position: "bottom-right", autoClose: 3000 }
            );
          }}
        />

        {/* Session Management Modal */}
        <SessionManagementModal
          isOpen={showSessionModal}
          onClose={() => setShowSessionModal(false)}
          theme={theme}
        />
      </Container>
    );
  };

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, loading, error, theme }) => {
  if (!isOpen) return null;

  return (
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
        <ModalHeader theme={theme}>
          <ModalIcon theme={theme} style={{ backgroundColor: '#fee2e2' }}>
            <AlertTriangle size={24} color="#dc2626" />
          </ModalIcon>
          <div>
            <ModalTitle theme={theme}>Final Confirmation</ModalTitle>
            <ModalDescription theme={theme}>
              This action cannot be undone. All your data will be permanently deleted.
            </ModalDescription>
          </div>
        </ModalHeader>

        <div style={{ padding: '24px' }}>
          <div style={{ 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <AlertTriangle size={16} color="#dc2626" />
              <div style={{ fontWeight: '600', color: '#991b1b' }}>Warning: Permanent Deletion</div>
            </div>
            <div style={{ fontSize: '14px', color: '#991b1b', lineHeight: '1.5' }}>
              <strong>This will permanently delete:</strong>
              <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                <li>Your account and profile information</li>
                <li>All your settings and preferences</li>
                <li>Your transaction history</li>
                <li>All your sessions and login data</li>
                <li>Any saved payment methods</li>
                <li>All associated data and records</li>
              </ul>
            </div>
          </div>

          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#dc2626',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <ButtonGroup>
            <Button
              className="secondary"
              onClick={onClose}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </Button>
            <Button
              className="danger"
              onClick={onConfirm}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Deleting Account...' : 'Yes, Delete My Account'}
            </Button>
          </ButtonGroup>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

// Session Management Modal Component
const SessionManagementModal = ({ isOpen, onClose, theme }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [revokingSessionId, setRevokingSessionId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadSessions();
    }
  }, [isOpen]);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAllSessions();
      if (response.success) {
        // Ensure we only show real sessions, filter out any null/undefined entries
        const validSessions = (response.sessions || []).filter(session => 
          session && session.id && session.createdAt
        );
        setSessions(validSessions);
      } else {
        console.error('Failed to load sessions:', response.error);
        setSessions([]);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
      setSessions([]);
      // Don't show error toast for empty sessions - this is normal
      if (error.message && !error.message.includes('No active sessions')) {
        toast.error('Failed to load session information');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId) => {
    setRevokingSessionId(sessionId);
    try {
      const response = await apiService.revokeSession(sessionId);
      if (response.success) {
        toast.success('Session revoked successfully!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        // Reload sessions to update the list
        await loadSessions();
      } else {
        toast.error(response.error || 'Failed to revoke session');
      }
    } catch (error) {
      console.error('Failed to revoke session:', error);
      toast.error('Failed to revoke session');
    } finally {
      setRevokingSessionId(null);
    }
  };

  const handleRevokeOtherSessions = async () => {
    setRevoking(true);
    try {
      const response = await apiService.revokeOtherSessions();
      if (response.success) {
        toast.success('All other sessions revoked successfully!', {
          position: "bottom-right",
          autoClose: 3000,
        });
        // Reload sessions to update the list
        await loadSessions();
      } else {
        toast.error(response.error || 'Failed to revoke sessions');
      }
    } catch (error) {
      console.error('Failed to revoke sessions:', error);
      toast.error('Failed to revoke other sessions');
    } finally {
      setRevoking(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getDeviceInfo = (userAgent) => {
    // Handle null, undefined, or empty userAgent
    if (!userAgent || typeof userAgent !== 'string') return 'Unknown Device';
    
    const ua = userAgent.toLowerCase();
    
    // Simple device detection
    if (ua.includes('mobile')) return 'Mobile Device';
    if (ua.includes('tablet')) return 'Tablet';
    if (ua.includes('windows')) return 'Windows PC';
    if (ua.includes('mac')) return 'Mac';
    if (ua.includes('linux')) return 'Linux PC';
    if (ua.includes('android')) return 'Android Device';
    if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS Device';
    
    return 'Unknown Device';
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>

        <ModalHeader>
          <ModalIcon>
            <Monitor size={20} />
          </ModalIcon>
          <div>
            <ModalTitle theme={theme}>Session Management</ModalTitle>
            <ModalDescription theme={theme}>
              Manage your logged-in devices and sessions
            </ModalDescription>
          </div>
        </ModalHeader>

                 {loading ? (
           <div style={{ textAlign: 'center', padding: '40px' }}>
             <div style={{ fontSize: '16px', color: '#64748b' }}>Loading sessions...</div>
           </div>
         ) : (
           <div>
             <div style={{ marginBottom: '24px' }}>
               <h4 style={{ marginBottom: '16px', color: '#1e293b' }}>Active Sessions ({sessions.length})</h4>
                               {sessions.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#64748b',
                    fontSize: '14px'
                  }}>
                    No active sessions found
                  </div>
                ) : (
                  sessions.map((session, index) => (
                    <div
                      key={session.id}
                      style={{
                        padding: '16px',
                        border: session.isCurrent ? '2px solid #10b981' : '2px solid #e2e8f0',
                        borderRadius: '12px',
                        backgroundColor: session.isCurrent ? '#f0fdf4' : '#ffffff',
                        marginBottom: '12px',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ fontWeight: '600', color: '#1e293b' }}>
                              {session.userAgent ? getDeviceInfo(session.userAgent) : 'Unknown Device'}
                            </div>
                            {session.isCurrent && (
                              <div style={{ 
                                padding: '4px 8px', 
                                backgroundColor: '#10b981', 
                                color: 'white', 
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                Current
                              </div>
                            )}
                          </div>
                          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                            IP: {session.ipAddress || 'Unknown'}
                          </div>
                          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                            Logged in: {formatDate(session.createdAt)}
                          </div>
                          <div style={{ fontSize: '14px', color: '#64748b' }}>
                            Expires: {formatDate(session.expiresAt)}
                          </div>
                        </div>
                        {!session.isCurrent && (
                          <Button
                            className="danger"
                            onClick={() => handleRevokeSession(session.id)}
                            disabled={revokingSessionId === session.id}
                            style={{ 
                              padding: '8px 12px', 
                              fontSize: '12px',
                              minWidth: 'auto'
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {revokingSessionId === session.id ? 'Revoking...' : 'Logout'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
             </div>

            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fef3c7', 
              border: '1px solid #f59e0b',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Shield size={16} color="#f59e0b" />
                <div style={{ fontWeight: '600', color: '#92400e' }}>Security Notice</div>
              </div>
              <div style={{ fontSize: '14px', color: '#92400e', lineHeight: '1.5' }}>
                If you suspect unauthorized access to your account, you can force logout from all other devices. 
                This will keep you logged in on this device but log out all other sessions.
              </div>
            </div>

            <ButtonGroup>
              <Button
                className="secondary"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </Button>
              <Button
                className="danger"
                onClick={handleRevokeOtherSessions}
                disabled={revoking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {revoking ? 'Revoking...' : 'Force Logout Other Devices'}
              </Button>
            </ButtonGroup>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Settings;
