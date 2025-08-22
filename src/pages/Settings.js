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
  Eye,
  EyeOff,
  Check,
  X,
  Lock,
  Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import PasswordVerificationModal from '../components/PasswordVerificationModal';

const Container = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 32px;
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
  color: #64748b;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
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
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
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
    background: linear-gradient(135deg, #1a1a1a, #333333);
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.2s ease;

  &.active {
    border-color: #1a1a1a;
    transform: scale(1.1);
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(26,26,26,0.03) 0%, transparent 70%);
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
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 28px;
  position: relative;
  box-shadow: 0 8px 24px rgba(26, 26, 26, 0.2);

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: linear-gradient(45deg, #1a1a1a, #333333, #1a1a1a);
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
  color: #1e293b;
  font-size: 16px;
  margin-bottom: 4px;
`;

const ProfileEmail = styled.div`
  color: #64748b;
  font-size: 14px;
`;

// Add shimmer animation
const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const PasswordSection = styled.div`
  margin-top: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
  border-radius: 16px;
  border: 1px solid #fecaca;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(239,68,68,0.03) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
`;

const PasswordHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #fecaca;
`;

const PasswordIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

const PasswordTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const PasswordDescription = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
`;

const PasswordInput = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
`;

const PasswordStrength = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
`;

const StrengthBar = styled.div`
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-top: 4px;
  overflow: hidden;
`;

const StrengthFill = styled.div`
  height: 100%;
  background: ${props => {
    if (props.strength === 'weak') return '#ef4444';
    if (props.strength === 'medium') return '#f59e0b';
    if (props.strength === 'strong') return '#10b981';
    return '#e2e8f0';
  }};
  width: ${props => {
    if (props.strength === 'weak') return '33%';
    if (props.strength === 'medium') return '66%';
    if (props.strength === 'strong') return '100%';
    return '0%';
  }};
  transition: all 0.3s ease;
`;

const PasswordRequirements = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
`;

const Requirement = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  color: ${props => props.met ? '#10b981' : '#64748b'};
`;

const Settings = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  
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

  // Password management state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // Modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    strength: 'weak',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  // Initialize settings with user data
  useEffect(() => {
    loadUserSettings();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check password strength
  useEffect(() => {
    const checkPasswordStrength = (password) => {
      const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      };

      const score = Object.values(requirements).filter(Boolean).length;
      let strength = 'weak';
      if (score >= 4) strength = 'strong';
      else if (score >= 3) strength = 'medium';

      setPasswordStrength({ score, strength, requirements });
    };

    if (passwordData.newPassword) {
      checkPasswordStrength(passwordData.newPassword);
    }
  }, [passwordData.newPassword]);

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
      
      toast.success('Setting updated', {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Failed to update setting:', error);
      toast.error('Failed to update setting');
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
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

  const handleChangePassword = async () => {
    // Validate password requirements
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match', {
        position: "bottom-right",
        autoClose: 4000,
      });
      return;
    }

    if (passwordStrength.score < 3) {
      toast.error('Password does not meet security requirements', {
        position: "bottom-right",
        autoClose: 4000,
      });
      return;
    }

    try {
      const result = await apiService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (result.success) {
        // Clear password fields
        setPasswordData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));

        toast.success('Password changed successfully. Please log in again with your new password.', {
          position: "bottom-right",
          autoClose: 5000,
        });

        // Optionally logout user to force re-login with new password
        setTimeout(() => {
          // You can add logout logic here if needed
        }, 2000);
      } else {
        toast.error(result.error || 'Failed to change password', {
          position: "bottom-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.error('An error occurred while changing password', {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

  const handleExportData = () => {
    toast.info('Data export feature coming soon!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion feature coming soon!', {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const accentColors = [
    '#1a1a1a', '#3b82f6', '#10b981', '#f59e0b', 
    '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'
  ];

  return (
    <Container>
      <Header>
        <BackButton
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={20} />
          Back
        </BackButton>
        <Title>
          <SettingsIcon size={28} />
          Settings
        </Title>
      </Header>

      <style>{shimmerAnimation}</style>
      <SettingsGrid>
        {/* Profile Settings - Top Left */}
        <SettingsCard
          className="featured"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader>
            <CardIcon>
              <User size={24} />
            </CardIcon>
            <CardTitle>Profile & Identity</CardTitle>
          </CardHeader>

          <ProfileSection>
            <ProfileAvatar>{user?.avatar || user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</ProfileAvatar>
            <ProfileInfo>
              <ProfileName>{user?.name || 'User'}</ProfileName>
              <ProfileEmail>{user?.email || 'user@email.com'}</ProfileEmail>
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
              <SettingLabel>Current Password</SettingLabel>
              <SettingDescription>Enter your current password</SettingDescription>
            </SettingInfo>
            <PasswordInput>
              <Input
                type={showPasswords.currentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                placeholder="Current password"
              />
              <PasswordToggle
                onClick={() => togglePasswordVisibility('currentPassword')}
                type="button"
              >
                {showPasswords.currentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </PasswordToggle>
            </PasswordInput>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>New Password</SettingLabel>
              <SettingDescription>Enter your new password</SettingDescription>
            </SettingInfo>
            <PasswordInput>
              <Input
                type={showPasswords.newPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                placeholder="New password"
                className={passwordData.newPassword ? (passwordStrength.score >= 3 ? 'success' : 'error') : ''}
              />
              <PasswordToggle
                onClick={() => togglePasswordVisibility('newPassword')}
                type="button"
              >
                {showPasswords.newPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </PasswordToggle>
            </PasswordInput>
          </SettingItem>

          {passwordData.newPassword && (
            <>
              <PasswordStrength>
                Password Strength: {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                <StrengthBar>
                  <StrengthFill strength={passwordStrength.strength} />
                </StrengthBar>
              </PasswordStrength>

              <PasswordRequirements>
                <Requirement met={passwordStrength.requirements.length}>
                  {passwordStrength.requirements.length ? <Check size={12} /> : <X size={12} />}
                  At least 8 characters
                </Requirement>
                <Requirement met={passwordStrength.requirements.uppercase}>
                  {passwordStrength.requirements.uppercase ? <Check size={12} /> : <X size={12} />}
                  One uppercase letter
                </Requirement>
                <Requirement met={passwordStrength.requirements.lowercase}>
                  {passwordStrength.requirements.lowercase ? <Check size={12} /> : <X size={12} />}
                  One lowercase letter
                </Requirement>
                <Requirement met={passwordStrength.requirements.number}>
                  {passwordStrength.requirements.number ? <Check size={12} /> : <X size={12} />}
                  One number
                </Requirement>
                <Requirement met={passwordStrength.requirements.special}>
                  {passwordStrength.requirements.special ? <Check size={12} /> : <X size={12} />}
                  One special character
                </Requirement>
              </PasswordRequirements>
            </>
          )}

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Confirm New Password</SettingLabel>
              <SettingDescription>Confirm your new password</SettingDescription>
            </SettingInfo>
            <PasswordInput>
              <Input
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
                className={passwordData.confirmPassword ? (passwordData.newPassword === passwordData.confirmPassword ? 'success' : 'error') : ''}
              />
              <PasswordToggle
                onClick={() => togglePasswordVisibility('confirmPassword')}
                type="button"
              >
                {showPasswords.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </PasswordToggle>
            </PasswordInput>
          </SettingItem>

          <ButtonGroup>
            <Button
              onClick={handleChangePassword}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword || passwordStrength.score < 3}
            >
              <Key size={16} />
              Change Password
            </Button>
          </ButtonGroup>
        </SettingsCard>

        {/* Security Settings - Bottom Left */}
        <SettingsCard
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
              <SettingDescription>Add an extra layer of security</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
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
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </Select>
          </SettingItem>
        </SettingsCard>

        {/* Payment Settings - Bottom Right */}
        <SettingsCard
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
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Accent Color</SettingLabel>
              <SettingDescription>Choose your accent color</SettingDescription>
            </SettingInfo>
            <ColorOptions>
              {accentColors.map((color) => (
                <ColorOption
                  key={color}
                  style={{ backgroundColor: color }}
                  className={settings.accentColor === color ? 'active' : ''}
                  onClick={() => handleSettingChange('accentColor', color)}
                />
              ))}
            </ColorOptions>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Compact Mode</SettingLabel>
              <SettingDescription>Use compact layout</SettingDescription>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={settings.compactMode}
                onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </SettingsCard>

        {/* Privacy & Data - Fourth Row Left */}
        <SettingsCard
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
     </Container>
   );
 };

export default Settings;
