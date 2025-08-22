import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Bell, 
  ArrowLeft, 
  Check, 
  X, 
  Trash2, 
  Filter,
  DollarSign,
  Music,
  MessageCircle,
  AlertCircle,
  Download,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background-color: ${props => props.theme?.colors?.primary || 'transparent'};
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
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

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: #64748b;
  font-size: 14px;

  &:hover {
    background: #f1f5f9;
    border-color: #1a1a1a;
    color: #1e293b;
  }

  &.active {
    background: #1a1a1a;
    border-color: #1a1a1a;
    color: white;
  }
`;

const MarkAllReadButton = styled(motion.button)`
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  border: none;
  padding: 8px 16px;
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
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NotificationItem = styled(motion.div)`
  background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.4)' : 'white'};
  backdrop-filter: ${props => props.theme?.name === 'glassmorphism' ? 'blur(25px) saturate(200%)' : 'none'};
  border: ${props => props.theme?.name === 'glassmorphism' ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid #e2e8f0'};
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${props => props.theme?.name === 'glassmorphism' ? '0 10px 40px rgba(31, 38, 135, 0.45)' : '0 2px 8px rgba(0, 0, 0, 0.06)'};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    box-shadow: ${props => props.theme?.name === 'glassmorphism' ? '0 15px 50px rgba(31, 38, 135, 0.55)' : '0 4px 16px rgba(0, 0, 0, 0.1)'};
    transform: translateY(-2px);
    background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.5)' : 'white'};
  }

  &.unread {
    border-left: 4px solid ${props => props.theme?.name === 'glassmorphism' ? '#4caf50' : '#1a1a1a'};
    background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.45)' : '#fefefe'};
    box-shadow: ${props => props.theme?.name === 'glassmorphism' ? '0 12px 45px rgba(31, 38, 135, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.06)'};
  }

  &.read {
    opacity: 0.7;
    background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.25)' : 'white'};
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  font-size: 18px;

  &.sale {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  &.message {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  }

  &.system {
    background: linear-gradient(135deg, #f59e0b, #d97706);
  }

  &.payment {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  }

  &.download {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
  }

  &.review {
    background: linear-gradient(135deg, #f97316, #ea580c);
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme?.name === 'glassmorphism' ? '#1a237e' : '#1e293b'};
  margin: 0 0 4px 0;
`;

const NotificationMessage = styled.p`
  font-size: 14px;
  color: ${props => props.theme?.name === 'glassmorphism' ? '#283593' : '#64748b'};
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &.primary {
    background: #1a1a1a;
    color: white;

    &:hover {
      background: #333333;
    }
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
    background: #fef2f2;
    color: #ef4444;

    &:hover {
      background: #fee2e2;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  color: #64748b;
`;

// Dummy notifications data
const notifications = [
  {
    id: 1,
    type: 'sale',
    title: 'New Beat Sale!',
    message: 'Your beat "Midnight Vibes" was purchased by Artist XYZ for $150',
    time: '2 minutes ago',
    read: false,
    icon: <DollarSign size={20} />
  },
  {
    id: 2,
    type: 'message',
    title: 'Client Message',
    message: 'Producer ABC sent you a message about custom beat requirements',
    time: '15 minutes ago',
    read: false,
    icon: <MessageCircle size={20} />
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of $450 received for 3 beats sold to Rapper DEF',
    time: '1 hour ago',
    read: false,
    icon: <DollarSign size={20} />
  },
  {
    id: 4,
    type: 'download',
    title: 'Beat Downloaded',
    message: 'Your beat "Summer Heat" was downloaded by Singer GHI',
    time: '2 hours ago',
    read: true,
    icon: <Download size={20} />
  },
  {
    id: 5,
    type: 'review',
    title: 'New Review',
    message: 'You received a 5-star review from Artist JKL for "Urban Flow"',
    time: '3 hours ago',
    read: true,
    icon: <Star size={20} />
  },
  {
    id: 6,
    type: 'system',
    title: 'System Update',
    message: 'New features available: Advanced analytics and client management tools',
    time: '5 hours ago',
    read: true,
    icon: <AlertCircle size={20} />
  },
  {
    id: 7,
    type: 'sale',
    title: 'Bundle Sale!',
    message: 'Producer MNO purchased your "Hip Hop Essentials" bundle for $300',
    time: '1 day ago',
    read: true,
    icon: <Music size={20} />
  },
  {
    id: 8,
    type: 'message',
    title: 'Collaboration Request',
    message: 'Beatmaker PQR wants to collaborate on a new project',
    time: '1 day ago',
    read: true,
    icon: <MessageCircle size={20} />
  }
];

const Notifications = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [notificationsList, setNotificationsList] = useState(notifications);

  const handleMarkAsRead = (id) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    toast.success('Marked as read', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleMarkAllRead = () => {
    setNotificationsList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success('All notifications marked as read', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleDeleteNotification = (id) => {
    setNotificationsList(prev => prev.filter(notification => notification.id !== id));
    toast.error('Notification deleted', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredNotifications = notificationsList.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'sales') return notification.type === 'sale';
    if (filter === 'messages') return notification.type === 'message';
    if (filter === 'payments') return notification.type === 'payment';
    return true;
  });

  const unreadCount = notificationsList.filter(n => !n.read).length;

  return (
    <Container theme={theme}>
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
          <Bell size={28} />
          Notifications
          {unreadCount > 0 && (
            <span style={{ 
              background: '#ef4444', 
              color: 'white', 
              borderRadius: '50%', 
              width: '20px', 
              height: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '12px',
              marginLeft: '8px'
            }}>
              {unreadCount}
            </span>
          )}
        </Title>
      </Header>

      <Controls>
        <FilterButton 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          className={filter === 'unread' ? 'active' : ''}
          onClick={() => handleFilterChange('unread')}
        >
          Unread ({unreadCount})
        </FilterButton>
        <FilterButton 
          className={filter === 'sales' ? 'active' : ''}
          onClick={() => handleFilterChange('sales')}
        >
          Sales
        </FilterButton>
        <FilterButton 
          className={filter === 'messages' ? 'active' : ''}
          onClick={() => handleFilterChange('messages')}
        >
          Messages
        </FilterButton>
        <FilterButton 
          className={filter === 'payments' ? 'active' : ''}
          onClick={() => handleFilterChange('payments')}
        >
          Payments
        </FilterButton>
        <MarkAllReadButton
          onClick={handleMarkAllRead}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Check size={16} />
          Mark All Read
        </MarkAllReadButton>
      </Controls>

      <NotificationsList>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              theme={theme}
              className={notification.read ? 'read' : 'unread'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NotificationHeader>
                <NotificationIcon className={notification.type}>
                  {notification.icon}
                </NotificationIcon>
                <NotificationContent>
                  <NotificationTitle theme={theme}>{notification.title}</NotificationTitle>
                  <NotificationMessage theme={theme}>{notification.message}</NotificationMessage>
                  <NotificationTime>{notification.time}</NotificationTime>
                </NotificationContent>
              </NotificationHeader>
              
              <NotificationActions>
                {!notification.read && (
                  <ActionButton 
                    className="primary"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <Check size={14} />
                    Mark Read
                  </ActionButton>
                )}
                <ActionButton 
                  className="secondary"
                  onClick={() => toast.info('Action coming soon!')}
                >
                  View Details
                </ActionButton>
                <ActionButton 
                  className="danger"
                  onClick={() => handleDeleteNotification(notification.id)}
                >
                  <Trash2 size={14} />
                  Delete
                </ActionButton>
              </NotificationActions>
            </NotificationItem>
          ))
        ) : (
          <EmptyState>
            <EmptyIcon>🔔</EmptyIcon>
            <EmptyTitle>No notifications</EmptyTitle>
            <EmptyMessage>
              {filter === 'all' 
                ? "You're all caught up! No notifications at the moment."
                : `No ${filter} notifications found.`
              }
            </EmptyMessage>
          </EmptyState>
        )}
      </NotificationsList>
    </Container>
  );
};

export default Notifications;
