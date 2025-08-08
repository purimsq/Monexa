import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Music, 
  Upload, 
  Download, 
  Play, 
  Filter,
  Heart,
  Share2,
  Tag,
  FileAudio,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';

const Container = styled.div`
  width: 95%;
  margin: 0;
  padding: 0;
`;

const Header = styled.div`
  margin-bottom: 32px;
  padding: 24px 24px 0 24px;
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
  margin-bottom: 24px;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  min-width: 300px;
  background: white;
  color: #1e293b;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterButton = styled.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: #64748b;

  &:hover {
    background: #f1f5f9;
    border-color: #3b82f6;
    color: #1e293b;
  }
`;

const UploadButton = styled(motion.button)`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
  }
`;

const BeatsListContainer = styled.div`
  background: white;
  border-radius: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
`;

const BeatsTable = styled.div`
  width: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const TableRowsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 120px 120px 120px 120px 200px;
  gap: 32px;
  padding: 20px 40px;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 1fr 120px 120px 120px 120px 200px;
  gap: 32px;
  padding: 10px 40px;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const BeatInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BeatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const BeatDetails = styled.div`
  flex: 1;
`;

const BeatTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 13px;
  margin-bottom: 2px;
`;

const BeatGenre = styled.div`
  font-size: 11px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FileFormat = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const BeatStatus = styled.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => props.status === 'Sold' ? '#d1fae5' : '#dbeafe'};
  color: ${props => props.status === 'Sold' ? '#065f46' : '#1e40af'};
  text-align: center;
`;

const BeatPrice = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 13px;
`;

const BeatDuration = styled.div`
  color: #64748b;
  font-size: 13px;
`;

const BeatBPM = styled.div`
  color: #64748b;
  font-size: 13px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f5f9;
    color: #3b82f6;
    transform: scale(1.1);
  }

  &.primary {
    background: #3b82f6;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      background: #1d4ed8;
      color: white;
    }
  }

  &.danger:hover {
    color: #ef4444;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  min-width: 160px;
  z-index: 1000;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #1e293b;
  }

  &.danger:hover {
    background: #fef2f2;
    color: #ef4444;
  }
`;

const beats = [
  {
    id: 1,
    title: 'Midnight Vibes',
    genre: 'Hip-Hop',
    status: 'Sold',
    price: '$150',
    duration: '3:24',
    bpm: '140',
    date: 'Dec 15, 2024',
    fileSize: '8.2 MB',
    fileType: 'MP3'
  },
  {
    id: 2,
    title: 'Summer Heat',
    genre: 'Trap',
    status: 'Sold',
    price: '$200',
    duration: '2:58',
    bpm: '145',
    date: 'Dec 12, 2024',
    fileSize: '7.8 MB',
    fileType: 'MP3'
  },
  {
    id: 3,
    title: 'Urban Flow',
    genre: 'R&B',
    status: 'Sold',
    price: '$180',
    duration: '3:42',
    bpm: '85',
    date: 'Dec 10, 2024',
    fileSize: '9.1 MB',
    fileType: 'MP4'
  },
  {
    id: 4,
    title: 'Chill Mode',
    genre: 'Lo-Fi',
    status: 'Sold',
    price: '$120',
    duration: '4:15',
    bpm: '75',
    date: 'Dec 08, 2024',
    fileSize: '10.5 MB',
    fileType: 'MP3'
  },
  {
    id: 5,
    title: 'Bass Drop',
    genre: 'EDM',
    status: 'Sold',
    price: '$250',
    duration: '3:08',
    bpm: '128',
    date: 'Dec 05, 2024',
    fileSize: '8.9 MB',
    fileType: 'MP4'
  },
  {
    id: 6,
    title: 'Neon Dreams',
    genre: 'Synthwave',
    status: 'Available',
    price: '$175',
    duration: '3:56',
    bpm: '120',
    date: 'Dec 01, 2024',
    fileSize: '9.3 MB',
    fileType: 'MP3'
  },
  {
    id: 7,
    title: 'Street Beat',
    genre: 'Hip-Hop',
    status: 'Available',
    price: '$160',
    duration: '3:12',
    bpm: '135',
    date: 'Nov 28, 2024',
    fileSize: '7.6 MB',
    fileType: 'MP3'
  },
  {
    id: 8,
    title: 'Ocean Waves',
    genre: 'Ambient',
    status: 'Available',
    price: '$140',
    duration: '5:20',
    bpm: '60',
    date: 'Nov 25, 2024',
    fileSize: '12.1 MB',
    fileType: 'MP4'
  }
];

const Documents = () => {
  const [uploading, setUploading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success('Beat uploaded successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    }, 2000);
  };

  const handlePlay = (beatName) => {
    toast.info(`Playing ${beatName}...`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleDownload = (beatName) => {
    toast.success(`${beatName} downloaded successfully!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleFavorite = (beatName) => {
    toast.success(`${beatName} added to favorites!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleShare = (beatName) => {
    toast.info(`Sharing ${beatName}...`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleEdit = (beatName) => {
    toast.info(`Editing ${beatName}...`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleDelete = (beatName) => {
    toast.error(`${beatName} deleted!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <Container>
      <Header>
        <Title>
          <Music size={28} />
          Beat Library
        </Title>
        <Subtitle>Manage your music collection and track your creative portfolio</Subtitle>
        
        <Controls>
          <SearchInput placeholder="Search beats by title, genre, or key..." />
          <FilterButton>
            <Filter size={16} />
            Filter
          </FilterButton>
          <UploadButton
            onClick={handleUpload}
            disabled={uploading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload size={16} />
            {uploading ? 'Uploading...' : 'Upload Beat'}
          </UploadButton>
        </Controls>
      </Header>

      <BeatsListContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
                 <BeatsTable>
           <TableHeader>
             <div>#</div>
             <div>Beat</div>
             <div>Status</div>
             <div>Price</div>
             <div>Duration</div>
             <div>BPM</div>
             <div>Actions</div>
           </TableHeader>
           
           <TableRowsContainer>
             {beats.map((beat, index) => (
               <TableRow 
                 key={beat.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.4, delay: index * 0.05 }}
               >
                 <div>{beat.id}</div>
                 
                 <BeatInfo>
                   <BeatIcon>
                     <FileAudio size={20} />
                   </BeatIcon>
                   <BeatDetails>
                     <BeatTitle>{beat.title}</BeatTitle>
                     <BeatGenre>
                       <Tag size={12} />
                       {beat.genre} • {beat.fileSize}
                       <FileFormat>{beat.fileType}</FileFormat>
                     </BeatGenre>
                   </BeatDetails>
                 </BeatInfo>
                 
                 <BeatStatus status={beat.status}>
                   {beat.status}
                 </BeatStatus>
                 
                 <BeatPrice>{beat.price}</BeatPrice>
                 
                 <BeatDuration>{beat.duration}</BeatDuration>
                 
                 <BeatBPM>{beat.bpm}</BeatBPM>
                 
                 <ActionButtons>
                   <ActionButton onClick={() => handlePlay(beat.title)}>
                     <Play size={16} />
                   </ActionButton>
                   
                   {beat.status === 'Available' ? (
                     <ActionButton 
                       className="primary"
                       onClick={() => handleDownload(beat.title)}
                     >
                       <Download size={16} />
                     </ActionButton>
                   ) : (
                     <ActionButton onClick={() => handleDownload(beat.title)}>
                       <Download size={16} />
                     </ActionButton>
                   )}
                   
                   <DropdownMenu>
                     <ActionButton onClick={() => toggleDropdown(beat.id)}>
                       <MoreVertical size={16} />
                     </ActionButton>
                     
                     {openDropdown === beat.id && (
                       <DropdownContent>
                         <DropdownItem onClick={() => handleFavorite(beat.title)}>
                           <Heart size={14} />
                           Add to Favorites
                         </DropdownItem>
                         <DropdownItem onClick={() => handleShare(beat.title)}>
                           <Share2 size={14} />
                           Share Beat
                         </DropdownItem>
                         <DropdownItem onClick={() => handleEdit(beat.title)}>
                           <Edit size={14} />
                           Edit Details
                         </DropdownItem>
                         <DropdownItem 
                           className="danger"
                           onClick={() => handleDelete(beat.title)}
                         >
                           <Trash2 size={14} />
                           Delete Beat
                         </DropdownItem>
                       </DropdownContent>
                     )}
                   </DropdownMenu>
                 </ActionButtons>
               </TableRow>
             ))}
           </TableRowsContainer>
         </BeatsTable>
      </BeatsListContainer>
    </Container>
  );
};

export default Documents; 