import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Music, Upload, Filter, Play, Download,
  FileAudio, Volume2, Trash2, Video
} from 'lucide-react';
import apiService from '../services/api';
import MediaPlayer from '../components/MediaPlayer';

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
  margin-bottom: 24px;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const UploadButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

// eslint-disable-next-line no-unused-vars
const BeatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

// eslint-disable-next-line no-unused-vars
const BeatCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

// eslint-disable-next-line no-unused-vars
const BeatImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// eslint-disable-next-line no-unused-vars
const BeatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  backdrop-filter: blur(10px);
`;

// eslint-disable-next-line no-unused-vars
const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s;
  cursor: pointer;
  
  ${BeatCard}:hover & {
    opacity: 1;
  }
`;

// Table play button (reusing name but different styling)
const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #3b82f6;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }
  
  &.playing {
    background: #059669;
  }
`;

// eslint-disable-next-line no-unused-vars
const BeatContent = styled.div`
  padding: 20px;
`;

// eslint-disable-next-line no-unused-vars
const BeatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

// eslint-disable-next-line no-unused-vars
const BeatInfo = styled.div`
  flex: 1;
`;

// eslint-disable-next-line no-unused-vars
const BeatTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  line-height: 1.3;
`;

// eslint-disable-next-line no-unused-vars
const BeatGenre = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 0.875rem;
`;

// eslint-disable-next-line no-unused-vars
const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background: #dcfce7;
  color: #166534;
`;

// eslint-disable-next-line no-unused-vars
const BeatMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #6b7280;
`;

// eslint-disable-next-line no-unused-vars
const BeatActions = styled.div`
  display: flex;
  gap: 8px;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
`;

const ActionButton = styled.button`
  ${props => props.size === 'sm' ? `
    padding: 8px 10px;
    gap: 4px;
    font-size: 0.75rem;
  ` : `
    flex: 1;
    padding: 8px 12px;
    gap: 6px;
    font-size: 0.875rem;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  &.primary {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  }
  
  &.danger {
    background: #ef4444;
    border-color: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
`;

const EmptyIcon = styled.div`
  margin: 0 auto 16px;
  width: 64px;
  height: 64px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;

// eslint-disable-next-line no-unused-vars
const AudioPlayer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  z-index: 1000;
`;

// eslint-disable-next-line no-unused-vars
const PlayerInfo = styled.div`
  flex: 1;
`;

// eslint-disable-next-line no-unused-vars
const PlayerTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
`;

// eslint-disable-next-line no-unused-vars
const PlayerControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

// eslint-disable-next-line no-unused-vars
const PlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

// eslint-disable-next-line no-unused-vars
const VolumeSlider = styled.input`
  width: 80px;
`;

// Table Components
const BeatsTable = styled(motion.div)`
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
`;

const HeaderCell = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: ${props => props.width || 'auto'};
  flex-shrink: 0;
`;

const TableBody = styled.div`
  background: white;
`;

const TableRow = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PlayCell = styled.div`
  width: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

const TrackCell = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TrackIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrackSubtitle = styled.div`
  color: #6b7280;
  font-size: 0.75rem;
`;

const FormatCell = styled.div`
  width: 100px;
  flex-shrink: 0;
`;

const FormatBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  background: #dbeafe;
  color: #1e40af;
  text-transform: uppercase;
`;

const SizeCell = styled.div`
  width: 100px;
  flex-shrink: 0;
  color: #6b7280;
  font-size: 0.875rem;
`;

const DateCell = styled.div`
  width: 140px;
  flex-shrink: 0;
  color: #6b7280;
  font-size: 0.875rem;
`;

const ActionsCell = styled.div`
  width: 160px;
  flex-shrink: 0;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Documents = () => {
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDocument, setCurrentDocument] = useState(null);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);



  const loadDocuments = async () => {
    try {
      setLoading(true);
      console.log('Loading documents...');
      const response = await apiService.getDocuments();
      console.log('Documents API response:', response);
      if (response && response.success) {
        console.log('Documents found:', response.documents?.length || 0, 'documents');
        setDocuments(response.documents || []);
        if (response.documents && response.documents.length > 0) {
          toast.success(`Loaded ${response.documents.length} beats!`);
        }
      } else {
        console.log('API call failed or no documents:', response);
        toast.error('Failed to load beats: ' + (response?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
      toast.error('Failed to load documents: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type (audio and video files)
    console.log('Selected file:', file.name, 'Type:', file.type, 'Size:', file.size);
    const allowedTypes = [
      // Audio formats
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/flac', 'audio/aac', 'audio/x-wav', 'audio/x-mpeg',
      // Video formats
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      console.error('File type not allowed:', file.type, 'Allowed types:', allowedTypes);
      toast.error(`File type "${file.type}" not supported. Please upload audio files (MP3, WAV, OGG, FLAC, AAC) or video files (MP4, MOV, AVI, WebM)`);
      return;
    }

    // Validate file size (max 200MB for video, 50MB for audio)
    const maxSize = file.type.startsWith('video/') ? 200 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxSizeMB = file.type.startsWith('video/') ? '200MB' : '50MB';
      toast.error(`File size too large. Maximum size is ${maxSizeMB}.`);
      return;
    }

    try {
      setUploading(true);
      console.log('Starting upload process...');

      const formData = new FormData();
      formData.append('document', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Remove extension
      
      // Determine category based on file type
      const category = file.type.startsWith('video/') ? 'video' : 'beat';
      formData.append('category', category);
      
      console.log('FormData created with:');
      console.log('- File:', file.name, file.type, file.size);
      console.log('- Title:', file.name.replace(/\.[^/.]+$/, ''));
      console.log('- Category:', category);

      const mediaType = file.type.startsWith('video/') ? 'video' : 'beat';
      toast.info(`Uploading ${mediaType}...`, { autoClose: 1000 });

      const response = await apiService.uploadDocument(formData);
      console.log('Upload response:', response);

      if (response && response.success) {
        toast.success(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} uploaded successfully!`);
        loadDocuments(); // Reload documents list
      } else {
        console.log('Upload failed:', response);
        const errorMessage = response?.error || response?.message || 'Unknown error';
        toast.error('Upload failed: ' + errorMessage);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload beat: ' + error.message);
    } finally {
      setUploading(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleUpload = () => {
    document.getElementById('file-upload').click();
  };

  const handlePlay = (document) => {
    console.log('Opening media player for document:', document.id);
    setCurrentDocument(document);
    setIsPlayerMinimized(false);
  };

  const handleDownload = async (document) => {
    try {
      // Use the download endpoint with authentication
      const response = await fetch(`http://localhost:5000/api/documents/${document.id}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('monexa_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.title || document.file_name || document.filename;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Download started!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleDelete = async (document) => {
    if (window.confirm('Are you sure you want to delete this beat?')) {
      try {
        // Would call API to delete, but we'll just show toast for now
        toast.success('Beat deleted successfully!');
        loadDocuments();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete beat');
      }
    }
  };

  const handleClosePlayer = () => {
    setCurrentDocument(null);
  };

  const handleTogglePlayerSize = () => {
    setIsPlayerMinimized(!isPlayerMinimized);
  };

  const handleDeleteFromPlayer = async (document) => {
    await handleDelete(document);
    setCurrentDocument(null);
  };

  const handleDownloadFromPlayer = async (document) => {
    await handleDownload(document);
  };

  const filteredDocuments = documents.filter(doc => 
    (doc.category === 'beat' || doc.category === 'video') && 
    (doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     doc.filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.file_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (filename) => {
    return filename ? filename.split('.').pop().toUpperCase() : '';
  };

  return (
    <Container>
      <Header>
        <Title>
          <Music size={28} />
          Media Library
        </Title>
        <Subtitle>Manage your music and video collection, track your creative portfolio</Subtitle>
        
        <Controls>
          <SearchInput 
            placeholder="Search media by title or filename..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            {uploading ? 'Uploading...' : 'Upload Media'}
          </UploadButton>
          <input
            id="file-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept="audio/*,video/*,.mp3,.wav,.ogg,.flac,.aac,.m4a,.mp4,.mov,.avi,.webm"
          />
        </Controls>
      </Header>

      {loading ? (
        <EmptyState>
          <EmptyIcon>
            <Volume2 size={24} />
          </EmptyIcon>
          <h3>Loading beats...</h3>
        </EmptyState>
      ) : filteredDocuments.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <Music size={24} />
          </EmptyIcon>
          <h3>No media found</h3>
          <p>Upload your first audio or video file to get started!</p>
        </EmptyState>
      ) : (
        <BeatsTable
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TableHeader>
            <HeaderRow>
              <HeaderCell width="50px"></HeaderCell>
              <HeaderCell width="300px">Track</HeaderCell>
              <HeaderCell width="100px">Format</HeaderCell>
              <HeaderCell width="100px">Size</HeaderCell>
              <HeaderCell width="140px">Upload Date</HeaderCell>
              <HeaderCell width="160px">Actions</HeaderCell>
            </HeaderRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((document, index) => (
              <TableRow 
                key={document.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <PlayCell>
                  <PlayButton 
                    onClick={() => handlePlay(document)}
                    className={currentDocument?.id === document.id ? "playing" : ""}
                  >
                    <Play size={16} />
                  </PlayButton>
                </PlayCell>
                
                <TrackCell>
                  <TrackIcon>
                    {document.file_type?.startsWith('video/') || document.file_name?.toLowerCase().includes('.mp4') ? (
                      <Video size={20} color="#FF6B35" />
                    ) : (
                      <FileAudio size={20} color="#FF6B35" />
                    )}
                  </TrackIcon>
                  <TrackInfo>
                    <TrackTitle>{document.title || document.file_name}</TrackTitle>
                    <TrackSubtitle>
                      {document.file_type?.startsWith('video/') || document.file_name?.toLowerCase().includes('.mp4') 
                        ? 'Video Track' 
                        : 'Audio Track'
                      }
                    </TrackSubtitle>
                  </TrackInfo>
                </TrackCell>
                
                <FormatCell>
                  <FormatBadge>
                    {getFileExtension(document.file_name || document.filename)}
                  </FormatBadge>
                </FormatCell>
                
                <SizeCell>
                  {formatFileSize(document.file_size || 0)}
                </SizeCell>
                
                <DateCell>
                  {new Date(document.uploaded_at || document.created_at).toLocaleDateString()}
                </DateCell>
                
                <ActionsCell>
                  <ActionButton onClick={() => handleDownload(document)} size="sm">
                    <Download size={14} />
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(document)} className="danger" size="sm">
                    <Trash2 size={14} />
                  </ActionButton>
                </ActionsCell>
              </TableRow>
            ))}
          </TableBody>
        </BeatsTable>
      )}

      {/* Media Player */}
      <AnimatePresence>
        {currentDocument && (
          <MediaPlayer
            document={currentDocument}
            onClose={handleClosePlayer}
            onDelete={handleDeleteFromPlayer}
            onDownload={handleDownloadFromPlayer}
            isMinimized={isPlayerMinimized}
            onToggleSize={handleTogglePlayerSize}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Documents;