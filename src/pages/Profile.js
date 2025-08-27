import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { User, Edit, Save, X, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import PasswordVerificationModal from '../components/PasswordVerificationModal';
import PasswordChangeModal from '../components/PasswordChangeModal';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 16px;
`;

const ProfileCard = styled(motion.div)`
  background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.25)' : 'white'};
  backdrop-filter: ${props => props.theme?.name === 'glassmorphism' ? 'blur(20px) saturate(180%)' : 'none'};
  border: ${props => props.theme?.name === 'glassmorphism' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #e2e8f0'};
  border-radius: 16px;
  padding: 32px;
  box-shadow: ${props => props.theme?.name === 'glassmorphism' ? '0 8px 32px rgba(31, 38, 135, 0.37)' : '0 4px 20px rgba(0, 0, 0, 0.08)'};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme?.name === 'glassmorphism' ? '#1a237e' : '#1e293b'};
  margin-bottom: 4px;
`;

const ProfileRole = styled.p`
  color: ${props => props.theme?.name === 'glassmorphism' ? '#283593' : '#64748b'};
  font-size: 16px;
  margin-bottom: 8px;
`;

const EditButton = styled.button`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
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

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CancelButton = styled.button`
  background: #f1f5f9;
  color: #64748b;
  border: 2px solid #e2e8f0;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    specialty: '',
    experience: '',
    bio: ''
  });

  // Modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Initialize form data with user information
  useEffect(() => {
    if (user) {
      console.log('User data updated in Profile component:', user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        specialty: user.role || 'Music Producer',
        experience: user.experience || '',
        bio: user.bio || `Professional ${user.role || 'music producer'} passionate about creating amazing music.`
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setModalError(null);
    setShowPasswordModal(true);
  };

  const handlePasswordVerification = async (password) => {
    setModalLoading(true);
    setModalError(null);

    try {
      console.log('Form data before update:', formData);
      
      const profileData = {
        name: formData.name,
        email: formData.email, // Add email field
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        bio: formData.bio,
        role: formData.specialty, // Map specialty to role
        currentPassword: password
      };
      
      console.log('Profile data being sent:', profileData);
      
      const result = await updateProfile(profileData);
      
      console.log('Profile update result:', result);
      
      if (result.success) {
        setShowPasswordModal(false);
        setModalLoading(false);
        setIsEditing(false);
        
        // Update the form data with the new values to reflect changes immediately
        setFormData({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          location: profileData.location,
          specialty: profileData.role,
          experience: profileData.experience,
          bio: profileData.bio
        });
        
        // Force a re-render by updating the user context
        // This ensures the UI reflects the changes immediately
        console.log('Profile updated successfully, forcing re-render');
        
        toast.success('Profile updated successfully!', {
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
      const response = await fetch('http://localhost:5000/api/users/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('monexa_token')}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const result = await response.json();

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
      console.error('Password change error:', error);
      setModalError('An error occurred while changing password');
      setModalLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Header>
        <Title>
          <User size={28} />
          Producer Profile
        </Title>
        <Subtitle>Manage your professional information and studio details</Subtitle>
      </Header>

      <ProfileCard
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProfileHeader>
          <Avatar>{user?.avatar || user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</Avatar>
          <ProfileInfo>
            <ProfileName theme={theme}>{formData.name || user?.name || 'User'}</ProfileName>
            <ProfileRole theme={theme}>{formData.specialty || user?.role || 'Music Producer'}</ProfileRole>
          </ProfileInfo>
          {!isEditing && (
            <>
              <EditButton onClick={handleEdit}>
                <Edit size={16} />
                Edit Profile
              </EditButton>
              <EditButton 
                onClick={() => setShowPasswordChangeModal(true)}
                style={{ marginLeft: '12px', background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                <Key size={16} />
                Change Password
              </EditButton>
            </>
          )}
        </ProfileHeader>

        <FormGrid>
                     <FormGroup>
             <Label>Full Name</Label>
             <Input
               key={`name-${formData.name}`}
               name="name"
               value={formData.name}
               onChange={handleInputChange}
               disabled={!isEditing}
             />
           </FormGroup>

           <FormGroup>
             <Label>Email</Label>
             <Input
               key={`email-${formData.email}`}
               name="email"
               value={formData.email}
               onChange={handleInputChange}
               disabled={!isEditing}
             />
           </FormGroup>

                     <FormGroup>
             <Label>Phone</Label>
             <Input
               key={`phone-${formData.phone}`}
               name="phone"
               value={formData.phone}
               onChange={handleInputChange}
               disabled={!isEditing}
             />
           </FormGroup>

           <FormGroup>
             <Label>Location</Label>
             <Input
               key={`location-${formData.location}`}
               name="location"
               value={formData.location}
               onChange={handleInputChange}
               disabled={!isEditing}
             />
           </FormGroup>

           <FormGroup>
             <Label>Specialty</Label>
             <Input
               key={`specialty-${formData.specialty}`}
               name="specialty"
               value={formData.specialty}
               onChange={handleInputChange}
               disabled={!isEditing}
             />
           </FormGroup>

           <FormGroup>
             <Label>Experience</Label>
             <Input
               key={`experience-${formData.experience}`}
               name="experience"
               value={formData.experience}
               onChange={handleInputChange}
               disabled={!isEditing}
             />
           </FormGroup>
        </FormGrid>

                 <FormGroup>
           <Label>Bio</Label>
           <TextArea
             key={`bio-${formData.bio}`}
             name="bio"
             value={formData.bio}
             onChange={handleInputChange}
             disabled={!isEditing}
           />
         </FormGroup>

        {isEditing && (
          <ButtonGroup>
            <CancelButton onClick={handleCancel}>
              <X size={16} />
              Cancel
            </CancelButton>
            <SaveButton onClick={handleSave}>
              <Save size={16} />
              Save Changes
            </SaveButton>
          </ButtonGroup>
        )}
      </ProfileCard>

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

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={showPasswordChangeModal}
        onClose={() => setShowPasswordChangeModal(false)}
        onPasswordChange={handlePasswordChange}
        loading={modalLoading}
        error={modalError}
      />
    </Container>
  );
};

export default Profile; 