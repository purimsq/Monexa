import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Download, Upload, Printer, DollarSign, Euro, PoundSterling } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  height: 100%;
  padding: 16px;
  max-width: 1400px;
  margin: 0 auto;
`;

const MainColumn = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 24px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const WelcomeCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 18px;
  padding: 36px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  min-height: 200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(80px, -80px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50px, 50px);
  }

  /* Floating particles */
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 60%;
    right: 15%;
    width: 6px;
    height: 6px;
    background: rgba(59, 130, 246, 0.8);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const FloatingParticle = styled.div`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  width: ${props => props.size || '4px'};
  height: ${props => props.size || '4px'};
  background: ${props => props.color || 'rgba(255, 255, 255, 0.6)'};
  border-radius: 50%;
  animation: float ${props => props.duration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const WelcomeContent = styled.div`
  flex: 1;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.3px;
`;

const WelcomeSubtitle = styled.p`
  font-size: 16px;
  color: #cbd5e1;
  margin: 0 0 24px 0;
  font-weight: 400;
  line-height: 1.5;
`;

const WelcomeStats = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LearnMoreButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const MusicStudioIllustration = styled.div`
  width: 160px;
  height: 200px;
  position: relative;
  margin-left: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`;



const PrintIcon = styled(Printer)`
  position: absolute;
  top: 16px;
  right: 16px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;

const Card = styled(motion.div)`
  background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.25)' : 'white'};
  backdrop-filter: ${props => props.theme?.name === 'glassmorphism' ? 'blur(20px) saturate(180%)' : 'none'};
  border: ${props => props.theme?.name === 'glassmorphism' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #e2e8f0'};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${props => props.theme?.name === 'glassmorphism' ? '0 8px 32px rgba(31, 38, 135, 0.37)' : '0 4px 12px rgba(0, 0, 0, 0.05)'};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => props.theme?.name === 'glassmorphism' ? '0 12px 40px rgba(31, 38, 135, 0.45)' : '0 8px 20px rgba(0, 0, 0, 0.08)'};
    transform: translateY(-2px);
    background: ${props => props.theme?.name === 'glassmorphism' ? 'rgba(255, 255, 255, 0.35)' : 'white'};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const CardAction = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    color: #1d4ed8;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileLabel = styled.span`
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
`;

const ProfileValue = styled.span`
  font-size: 13px;
  color: #1e293b;
  font-weight: 600;
`;

const ProfileAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-bottom: 12px;
`;

const BeneficiariesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BeneficiaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #f8fafc;
`;

const BeneficiaryAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.gender === 'male' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #ec4899, #be185d)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`;

const BeneficiaryInfo = styled.div`
  flex: 1;
`;

const BeneficiaryName = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 13px;
`;

const BeneficiaryDetails = styled.div`
  font-size: 11px;
  color: #64748b;
`;

const AccountBalanceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BalanceTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BalanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CurrencyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const CurrencyInfo = styled.div`
  flex: 1;
`;

const CurrencyName = styled.div`
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
`;

const CurrencyAmount = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Table = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '50px 1fr 1fr 1fr 100px'};
  gap: 12px;
  padding: 12px 0;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #64748b;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f8fafc;
  border-radius: 8px 8px 0 0;
  margin: 0 -24px;
  padding: 12px 24px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '50px 1fr 1fr 1fr 100px'};
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;
  font-size: 13px;
  color: #1e293b;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-radius: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  font-weight: ${props => props.bold ? '600' : '400'};
`;

const DownloadButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1d4ed8;
  }
`;

const UploadButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
`;

const Footer = styled.div`
  text-align: center;
  font-size: 12px;
  color: #64748b;
  margin-top: auto;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-weight: 500;
`;

const beatSalesData = [
  { id: 1, date: 'Dec 15, 2024', beat: 'Midnight Vibes', client: 'Artist XYZ', amount: '$150' },
  { id: 2, date: 'Dec 12, 2024', beat: 'Summer Heat', client: 'Producer ABC', amount: '$200' },
  { id: 3, date: 'Dec 10, 2024', beat: 'Urban Flow', client: 'Rapper DEF', amount: '$180' },
  { id: 4, date: 'Dec 08, 2024', beat: 'Chill Mode', client: 'Singer GHI', amount: '$120' },
  { id: 5, date: 'Dec 05, 2024', beat: 'Bass Drop', client: 'Artist JKL', amount: '$250' },
];

const beatsLibraryData = [
  { id: 1, title: 'Midnight Vibes', date: 'Dec 15, 2024', genre: 'Hip-Hop', status: 'Sold' },
  { id: 2, title: 'Summer Heat', date: 'Dec 12, 2024', genre: 'Trap', status: 'Sold' },
  { id: 3, title: 'Urban Flow', date: 'Dec 10, 2024', genre: 'R&B', status: 'Sold' },
  { id: 4, title: 'Chill Mode', date: 'Dec 08, 2024', genre: 'Lo-Fi', status: 'Sold' },
  { id: 5, title: 'Bass Drop', date: 'Dec 05, 2024', genre: 'EDM', status: 'Sold' },
  { id: 6, title: 'Neon Dreams', date: 'Dec 01, 2024', genre: 'Synthwave', status: 'Available' },
  { id: 7, title: 'Street Beat', date: 'Nov 28, 2024', genre: 'Hip-Hop', status: 'Available' },
  { id: 8, title: 'Ocean Waves', date: 'Nov 25, 2024', genre: 'Ambient', status: 'Available' },
];

const handleUpload = () => {
  toast.success('Beat uploaded successfully!', {
    position: 'bottom-right',
    autoClose: 3000,
  });
};

const handleDownload = () => {
  toast.success('Beat downloaded successfully!', {
    position: 'bottom-right',
    autoClose: 3000,
  });
};

function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'User';
  
  return (
    <DashboardContainer>
      <MainColumn>
         <WelcomeCard
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
         >
           <FloatingParticle size="3px" color="rgba(255, 255, 255, 0.4)" top="15%" left="20%" duration="7s" delay="1s" />
           <FloatingParticle size="5px" color="rgba(59, 130, 246, 0.6)" top="70%" left="80%" duration="9s" delay="2s" />
           <FloatingParticle size="2px" color="rgba(255, 255, 255, 0.3)" top="40%" left="85%" duration="5s" delay="0.5s" />
           <WelcomeContent>
              <WelcomeTitle>Welcome back, {firstName}!</WelcomeTitle>
              <WelcomeSubtitle>Your music empire dashboard - track sales, manage beats, and monitor your success</WelcomeSubtitle>
              <WelcomeStats>
                <StatItem>
                  <StatNumber>47</StatNumber>
                  <StatLabel>Beats Sold</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>$8,420</StatNumber>
                  <StatLabel>Total Revenue</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>12</StatNumber>
                  <StatLabel>Available</StatLabel>
                </StatItem>
              </WelcomeStats>
              <LearnMoreButton>View Analytics</LearnMoreButton>
            </WelcomeContent>
            <MusicStudioIllustration>
              <img 
                src="/images/young-man-headphones.png.png" 
                alt="Young man with headphones" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))'
                }}
              />
            </MusicStudioIllustration>
                     <PrintIcon size={16} />
        </WelcomeCard>

                 <CardsGrid>
                       <Card
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CardHeader>
                <CardTitle>🎵 Producer Profile</CardTitle>
              </CardHeader>
              <ProfileAvatar>🎧</ProfileAvatar>
              <ProfileGrid>
                <ProfileItem>
                  <ProfileLabel>Producer Name</ProfileLabel>
                  <ProfileValue>{user?.name || 'User'}</ProfileValue>
                </ProfileItem>
                <ProfileItem>
                  <ProfileLabel>Studio Since</ProfileLabel>
                  <ProfileValue>January 2020</ProfileValue>
                </ProfileItem>
                <ProfileItem>
                  <ProfileLabel>Specialty</ProfileLabel>
                  <ProfileValue>{user?.role || 'Music Producer'}</ProfileValue>
                </ProfileItem>
                <ProfileItem>
                  <ProfileLabel>Location</ProfileLabel>
                  <ProfileValue>Nairobi, Kenya</ProfileValue>
                </ProfileItem>
              </ProfileGrid>
            </Card>

                       <Card
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardHeader>
                <CardTitle>🎯 Top Clients</CardTitle>
              </CardHeader>
              <BeneficiariesGrid>
                <BeneficiaryItem>
                  <BeneficiaryAvatar gender="male">🎤</BeneficiaryAvatar>
                  <BeneficiaryInfo>
                    <BeneficiaryName>Artist XYZ</BeneficiaryName>
                    <BeneficiaryDetails>5 beats • $750 total</BeneficiaryDetails>
                  </BeneficiaryInfo>
                </BeneficiaryItem>
                <BeneficiaryItem>
                  <BeneficiaryAvatar gender="female">🎹</BeneficiaryAvatar>
                  <BeneficiaryInfo>
                    <BeneficiaryName>Producer ABC</BeneficiaryName>
                    <BeneficiaryDetails>3 beats • $600 total</BeneficiaryDetails>
                  </BeneficiaryInfo>
                </BeneficiaryItem>
              </BeneficiariesGrid>
            </Card>
         </CardsGrid>

                 <Card
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
         >
           <CardHeader>
             <CardTitle>💰 Recent Sales</CardTitle>
             <CardAction>View All</CardAction>
           </CardHeader>
           <Table>
             <TableHeader>
               <div>#</div>
               <div>Date</div>
               <div>Beat</div>
               <div>Client</div>
               <div>Amount</div>
             </TableHeader>
             {beatSalesData.map((item) => (
               <TableRow key={item.id}>
                 <TableCell>{item.id}</TableCell>
                 <TableCell>{item.date}</TableCell>
                 <TableCell>{item.beat}</TableCell>
                 <TableCell>{item.client}</TableCell>
                 <TableCell bold>{item.amount}</TableCell>
               </TableRow>
             ))}
           </Table>
         </Card>

                 <Footer>Last updated: December 15, 2024 • Monexa - {user?.name || 'User'}'s Music Studio</Footer>
      </MainColumn>

      <RightColumn>
                 <Card
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
         >
           <BalanceTitle>
             💰 Account Balance
           </BalanceTitle>
          <AccountBalanceSection>
            <BalanceItem>
                             <CurrencyIcon>
                 <DollarSign size={16} />
               </CurrencyIcon>
              <CurrencyInfo>
                <CurrencyName>Dollar</CurrencyName>
                <CurrencyAmount>$20,000.00</CurrencyAmount>
              </CurrencyInfo>
            </BalanceItem>
            <BalanceItem>
                             <CurrencyIcon>
                 <Euro size={16} />
               </CurrencyIcon>
              <CurrencyInfo>
                <CurrencyName>Euro</CurrencyName>
                <CurrencyAmount>€ 20,000.00</CurrencyAmount>
              </CurrencyInfo>
            </BalanceItem>
            <BalanceItem>
                             <CurrencyIcon>
                 <PoundSterling size={16} />
               </CurrencyIcon>
              <CurrencyInfo>
                <CurrencyName>Pound</CurrencyName>
                <CurrencyAmount>£ 20,000.00</CurrencyAmount>
              </CurrencyInfo>
            </BalanceItem>
          </AccountBalanceSection>
        </Card>

                            <Card
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.5 }}
           >
             <CardHeader>
               <CardTitle>🎵 Beat Library</CardTitle>
               <UploadButton onClick={handleUpload}>
                 <Upload size={14} />
                 Upload Beat
               </UploadButton>
             </CardHeader>
             <Table>
               <TableHeader columns="50px 1fr 1fr 1fr 80px">
                 <div>#</div>
                 <div>Title</div>
                 <div>Genre</div>
                 <div>Status</div>
                 <div>Action</div>
               </TableHeader>
               {beatsLibraryData.map((beat) => (
                 <TableRow key={beat.id} columns="50px 1fr 1fr 1fr 80px">
                   <TableCell>{beat.id}</TableCell>
                   <TableCell>{beat.title}</TableCell>
                   <TableCell>{beat.genre}</TableCell>
                   <TableCell>
                     <span style={{ 
                       color: beat.status === 'Sold' ? '#10b981' : '#3b82f6',
                       fontWeight: '600',
                       fontSize: '11px',
                       padding: '2px 8px',
                       borderRadius: '12px',
                       background: beat.status === 'Sold' ? '#d1fae5' : '#dbeafe'
                     }}>
                       {beat.status}
                     </span>
                   </TableCell>
                   <TableCell>
                     <DownloadButton onClick={handleDownload}>
                       <Download size={14} />
                     </DownloadButton>
                   </TableCell>
                 </TableRow>
               ))}
             </Table>
           </Card>
      </RightColumn>
    </DashboardContainer>
  );
}

export default Dashboard; 