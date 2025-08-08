import React, { useState } from 'react';
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
  Edit,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1600px;
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
  gap: 32px;
  
  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const SettingsCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;

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
  margin-bottom: 4px;
`;

const SettingDescription = styled.div`
  font-size: 14px;
  color: #64748b;
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
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
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
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
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

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: 'Russell',
    lastName: 'Mwaura',
    email: 'russell.mwaura@email.com',
    phone: '+254 700 123 456',
    bio: 'Professional music producer and beatmaker',
    
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

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Setting updated', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully', {
      position: "bottom-right",
      autoClose: 3000,
    });
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
             <ProfileAvatar>RM</ProfileAvatar>
             <ProfileInfo>
               <ProfileName>Russell Mwaura</ProfileName>
               <ProfileEmail>russell.mwaura@email.com</ProfileEmail>
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

         {/* Security Settings - Top Right */}
         <SettingsCard
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
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

         {/* Payment Settings - Bottom Left */}
         <SettingsCard
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
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

         {/* Notifications - Bottom Right */}
         <SettingsCard
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
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

         {/* Appearance Settings - Third Row Left */}
         <SettingsCard
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
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

         {/* Privacy & Data - Third Row Right */}
         <SettingsCard
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.5 }}
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
    </Container>
  );
};

export default Settings;
