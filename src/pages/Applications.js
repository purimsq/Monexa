import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FileCheck, TrendingUp, BarChart3, PieChart, Activity, Calendar, DollarSign, Users } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-weight: 600;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
`;

const ChartCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 16px;
  border: 2px dashed #e2e8f0;
`;

const RecentActivity = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`;

const ActivityTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const Applications = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$8,420',
      change: '+12.5%',
      positive: true,
      icon: DollarSign
    },
    {
      id: 2,
      title: 'Beats Sold',
      value: '47',
      change: '+8.2%',
      positive: true,
      icon: TrendingUp
    },
    {
      id: 3,
      title: 'Active Clients',
      value: '23',
      change: '+5.1%',
      positive: true,
      icon: Users
    },
    {
      id: 4,
      title: 'Conversion Rate',
      value: '68%',
      change: '-2.3%',
      positive: false,
      icon: BarChart3
    }
  ];

  const activities = [
    {
      id: 1,
      text: 'New beat "Midnight Vibes" sold to Artist XYZ',
      time: '2 hours ago',
      icon: DollarSign
    },
    {
      id: 2,
      text: 'Client Producer ABC purchased "Summer Heat"',
      time: '4 hours ago',
      icon: TrendingUp
    },
    {
      id: 3,
      text: 'New client Rapper DEF registered',
      time: '6 hours ago',
      icon: Users
    },
    {
      id: 4,
      text: 'Beat "Urban Flow" uploaded to library',
      time: '1 day ago',
      icon: FileCheck
    },
    {
      id: 5,
      text: 'Monthly revenue target achieved',
      time: '2 days ago',
      icon: BarChart3
    }
  ];

  return (
    <Container>
      <Header>
        <Title>
          <FileCheck size={28} />
          Analytics
        </Title>
        <Subtitle>Track your music business performance and insights</Subtitle>
      </Header>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <StatHeader>
              <StatIcon>
                <stat.icon size={20} />
              </StatIcon>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.title}</StatLabel>
            <StatChange positive={stat.positive}>
              {stat.positive ? '↗' : '↘'} {stat.change}
            </StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <ChartsGrid>
        <ChartCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChartTitle>
            <BarChart3 size={20} />
            Sales Performance
          </ChartTitle>
          <ChartPlaceholder>
            Sales Chart - Revenue over time
          </ChartPlaceholder>
        </ChartCard>

        <ChartCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ChartTitle>
            <PieChart size={20} />
            Genre Distribution
          </ChartTitle>
          <ChartPlaceholder>
            Genre Chart - Beat sales by genre
          </ChartPlaceholder>
        </ChartCard>
      </ChartsGrid>

      <RecentActivity
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ActivityTitle>
          <Activity size={20} />
          Recent Activity
        </ActivityTitle>
        <ActivityList>
          {activities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <ActivityIcon>
                <activity.icon size={16} />
              </ActivityIcon>
              <ActivityInfo>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityInfo>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </Container>
  );
};

export default Applications; 