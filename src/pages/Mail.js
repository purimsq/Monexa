import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Mail as MailIcon,
  Send,
  Trash2,
  Archive,
  Star,
  Search,
  Filter,
  Plus,
  Reply,
  Forward,
  MoreVertical,
  Paperclip,
  Calendar,
  User,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textPrimary};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
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

const ActionButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.accentHover};
    transform: translateY(-2px);
  }
`;

const MailContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  height: calc(100vh - 200px);
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 1px solid ${props => props.theme.colors.borderSecondary};
  ${props => props.theme.name === 'glassmorphism' && `
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  `}
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textPrimary};
  }

  &.active {
    background: ${props => props.theme.colors.accent};
    color: white;
  }
`;

const MainContent = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 1px solid ${props => props.theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  ${props => props.theme.name === 'glassmorphism' && `
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  `}
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.borderSecondary};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${props => props.theme.colors.tertiary};
  border-radius: 12px;
  padding: 8px 16px;
  flex: 1;
  max-width: 400px;
  margin-right: 16px;

  input {
    background: none;
    border: none;
    outline: none;
    color: ${props => props.theme.colors.textPrimary};
    font-size: 14px;
    width: 100%;

    &::placeholder {
      color: ${props => props.theme.colors.textSecondary};
    }
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToolbarButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textPrimary};
  }
`;

const EmailList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const EmailItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.borderSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
  }

  &.unread {
    background: ${props => props.theme.colors.accent}10;
    font-weight: 600;
  }

  &.selected {
    background: ${props => props.theme.colors.accent}20;
    border-left: 4px solid ${props => props.theme.colors.accent};
  }
`;

const EmailAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;

const EmailContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const EmailSender = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 4px;
  font-size: 14px;
`;

const EmailSubject = styled.div`
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 4px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmailPreview = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmailMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
`;

const EmailTime = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmailActions = styled.div`
  display: flex;
  gap: 4px;
`;

const EmailActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textPrimary};
  }
`;

// Mock email data
const mockEmails = [
  {
    id: 1,
    sender: 'John Producer',
    subject: 'New Beat Collaboration Request',
    preview: 'Hey! I loved your latest track and would love to collaborate on a new project...',
    time: '2 hours ago',
    unread: true,
    starred: true,
    avatar: 'JP'
  },
  {
    id: 2,
    sender: 'Music Label Inc.',
    subject: 'Contract Update - Track Licensing',
    preview: 'We are pleased to inform you that your track has been approved for licensing...',
    time: '1 day ago',
    unread: false,
    starred: false,
    avatar: 'ML'
  },
  {
    id: 3,
    sender: 'Studio Manager',
    subject: 'Equipment Maintenance Schedule',
    preview: 'Please note that we have scheduled maintenance for the studio equipment...',
    time: '2 days ago',
    unread: false,
    starred: true,
    avatar: 'SM'
  },
  {
    id: 4,
    sender: 'Client - Sarah Artist',
    subject: 'Feedback on Custom Beat',
    preview: 'Thank you for the custom beat! I have some feedback and would like to discuss...',
    time: '3 days ago',
    unread: false,
    starred: false,
    avatar: 'SA'
  },
  {
    id: 5,
    sender: 'Payment System',
    subject: 'Payment Received - $500',
    preview: 'Your payment of $500 has been successfully processed and credited to your account...',
    time: '1 week ago',
    unread: false,
    starred: false,
    avatar: 'PS'
  }
];

const Mail = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [emails, setEmails] = useState(mockEmails);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const folders = [
    { id: 'inbox', label: 'Inbox', count: emails.filter(e => e.unread).length },
    { id: 'sent', label: 'Sent', count: 0 },
    { id: 'drafts', label: 'Drafts', count: 0 },
    { id: 'archive', label: 'Archive', count: 0 },
    { id: 'trash', label: 'Trash', count: 0 }
  ];

  const filteredEmails = emails.filter(email => 
    email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    if (email.unread) {
      setEmails(prev => prev.map(e => 
        e.id === email.id ? { ...e, unread: false } : e
      ));
    }
  };

  const handleStarEmail = (emailId, e) => {
    e.stopPropagation();
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, starred: !email.starred } : email
    ));
  };

  const handleDeleteEmail = (emailId, e) => {
    e.stopPropagation();
    setEmails(prev => prev.filter(email => email.id !== emailId));
    toast.success('Email moved to trash');
  };

  return (
    <Container theme={theme}>
      <Header>
        <Title theme={theme}>
          <MailIcon size={28} />
          Mail
        </Title>
        <ActionButton
          theme={theme}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          Compose
        </ActionButton>
      </Header>

      <MailContainer>
        <Sidebar theme={theme}>
          {folders.map(folder => (
            <SidebarItem
              key={folder.id}
              theme={theme}
              className={selectedFolder === folder.id ? 'active' : ''}
              onClick={() => setSelectedFolder(folder.id)}
            >
              <MailIcon size={16} />
              {folder.label}
              {folder.count > 0 && (
                <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.7 }}>
                  {folder.count}
                </span>
              )}
            </SidebarItem>
          ))}
        </Sidebar>

        <MainContent theme={theme}>
          <Toolbar theme={theme}>
            <SearchBar theme={theme}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBar>
            <ToolbarActions>
              <ToolbarButton theme={theme}>
                <Filter size={16} />
              </ToolbarButton>
              <ToolbarButton theme={theme}>
                <MoreVertical size={16} />
              </ToolbarButton>
            </ToolbarActions>
          </Toolbar>

          <EmailList>
            {filteredEmails.map((email) => (
              <EmailItem
                key={email.id}
                theme={theme}
                className={`${email.unread ? 'unread' : ''} ${selectedEmail?.id === email.id ? 'selected' : ''}`}
                onClick={() => handleEmailClick(email)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <EmailAvatar theme={theme}>
                  {email.avatar}
                </EmailAvatar>
                
                <EmailContent>
                  <EmailSender theme={theme}>
                    {email.sender}
                  </EmailSender>
                  <EmailSubject theme={theme}>
                    {email.subject}
                  </EmailSubject>
                  <EmailPreview theme={theme}>
                    {email.preview}
                  </EmailPreview>
                </EmailContent>

                <EmailMeta>
                  <EmailTime theme={theme}>
                    {email.time}
                  </EmailTime>
                  <EmailActions>
                    <EmailActionButton
                      theme={theme}
                      onClick={(e) => handleStarEmail(email.id, e)}
                    >
                      <Star size={14} fill={email.starred ? '#fbbf24' : 'none'} />
                    </EmailActionButton>
                    <EmailActionButton
                      theme={theme}
                      onClick={(e) => handleDeleteEmail(email.id, e)}
                    >
                      <Trash2 size={14} />
                    </EmailActionButton>
                  </EmailActions>
                </EmailMeta>
              </EmailItem>
            ))}
          </EmailList>
        </MainContent>
      </MailContainer>
    </Container>
  );
};

export default Mail;

