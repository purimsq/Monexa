import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { User, Edit, Save, X } from 'lucide-react';

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
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
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
  color: #1e293b;
  margin-bottom: 4px;
`;

const ProfileRole = styled.p`
  color: #64748b;
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Russell Mwaura',
    email: 'russell@monexa.com',
    phone: '+254 700 123 456',
    location: 'Nairobi, Kenya',
    specialty: 'Hip-Hop & Trap Production',
    experience: '5+ years',
    bio: 'Professional music producer specializing in Hip-Hop and Trap beats. Creating unique sounds that resonate with artists worldwide.'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    });
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProfileHeader>
          <Avatar>RM</Avatar>
          <ProfileInfo>
            <ProfileName>{formData.name}</ProfileName>
            <ProfileRole>{formData.specialty}</ProfileRole>
          </ProfileInfo>
          {!isEditing && (
            <EditButton onClick={handleEdit}>
              <Edit size={16} />
              Edit Profile
            </EditButton>
          )}
        </ProfileHeader>

        <FormGrid>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <Label>Location</Label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <Label>Specialty</Label>
            <Input
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <Label>Experience</Label>
            <Input
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
    </Container>
  );
};

export default Profile; 