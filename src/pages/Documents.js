import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Music, Upload, Play, Download, Trash2, Video, Music2,
  Volume2
} from 'lucide-react';
import apiService from '../services/api';
import MediaPlayer from '../components/MediaPlayer';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

// Clean white and black theme
const Container = styled.div`
  padding: 32px;
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  color: #666666;
  font-size: 1.125rem;
  margin-bottom: 32px;
  font-weight: 400;
  line-height: 1.6;
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
  padding: 24px;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 16px 20px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 1rem;
  background: #ffffff;
  color: #000000;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: #999999;
  }
  
  &:focus {
    outline: none;
    border-color: #000000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;



const UploadButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #333333;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const CategoryChip = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 2px solid ${props => props.active ? '#000000' : '#e5e5e5'};
  border-radius: 25px;
  background: ${props => props.active ? '#000000' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#000000'};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#000000' : '#f5f5f5'};
    border-color: ${props => props.active ? '#000000' : '#000000'};
  }
`;



// Table Components
const BeatsTable = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  border: 2px solid #f0f0f0;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.div`
  background: #fafafa;
  border-bottom: 2px solid #f0f0f0;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
`;

const HeaderCell = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: ${props => props.width || 'auto'};
  flex-shrink: 0;
`;

const TableBody = styled.div`
  background: #ffffff;
`;

const TableRow = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fafafa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PlayCell = styled.div`
  width: 60px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #000000;
  border: none;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #333333;
    transform: scale(1.05);
  }
  
  &.playing {
    background: #000000;
  }
`;

const TrackCell = styled.div`
  width: 400px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TrackIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #f5f5f5;
  border: 2px solid #e5e5e5;
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
  font-weight: 700;
  color: #000000;
  font-size: 1rem;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrackSubtitle = styled.div`
  color: #666666;
  font-size: 0.875rem;
  font-weight: 500;
`;

const FormatCell = styled.div`
  width: 120px;
  flex-shrink: 0;
`;

const FormatBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  background: #f0f0f0;
  color: #000000;
  text-transform: uppercase;
  border: 1px solid #e5e5e5;
`;

const SizeCell = styled.div`
  width: 120px;
  flex-shrink: 0;
  color: #666666;
  font-size: 0.875rem;
  font-weight: 500;
`;

const DateCell = styled.div`
  width: 160px;
  flex-shrink: 0;
  color: #666666;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ActionsCell = styled.div`
  width: 180px;
  flex-shrink: 0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  background: #ffffff;
  color: #666666;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    border-color: #000000;
    color: #000000;
  }
  
  &.primary {
    background: #000000;
    border-color: #000000;
    color: #ffffff;
    
    &:hover {
      background: #333333;
      border-color: #333333;
    }
  }
  
  &.danger {
    &:hover {
      background: #f5f5f5;
      border-color: #ff0000;
      color: #ff0000;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: #666666;
`;

const EmptyIcon = styled.div`
  margin: 0 auto 24px;
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 8px;
`;

const EmptySubtitle = styled.p`
  font-size: 1rem;
  color: #666666;
  font-weight: 400;
`;

const Documents = () => {
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDocument, setCurrentDocument] = useState(null);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [beatToDelete, setBeatToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });


  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDocuments();
      if (response && response.success) {
        setDocuments(response.documents || []);
      } else {
        console.error('Failed to load beats:', response?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Convert FileList to Array for easier handling
    const fileArray = Array.from(files);
    
    // Validate all files first
    const allowedTypes = [
      // Audio formats
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/flac', 'audio/aac', 'audio/x-wav', 'audio/x-mpeg',
      // Video formats
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'
    ];

    const validFiles = [];
    const invalidFiles = [];

    fileArray.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        invalidFiles.push(file.name);
      } else {
        // Validate file size (max 200MB for video, 50MB for audio)
        const maxSize = file.type.startsWith('video/') ? 200 * 1024 * 1024 : 50 * 1024 * 1024;
        if (file.size > maxSize) {
          const maxSizeMB = file.type.startsWith('video/') ? '200MB' : '50MB';
          invalidFiles.push(`${file.name} (too large - max ${maxSizeMB})`);
        } else {
          validFiles.push(file);
        }
      }
    });

    // Show error for invalid files
    if (invalidFiles.length > 0) {
      toast.error(`Invalid files: ${invalidFiles.join(', ')}`);
      if (validFiles.length === 0) {
        event.target.value = ''; // Reset file input
        return;
      }
    }

    if (validFiles.length === 0) {
      event.target.value = ''; // Reset file input
      return;
    }

    try {
      setUploading(true);
      
      // Show upload progress
      if (validFiles.length > 1) {
        toast.info(`Uploading ${validFiles.length} files...`, { autoClose: 2000 });
      }

      let successCount = 0;
      let errorCount = 0;

      // Upload files sequentially to avoid overwhelming the server
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress({ current: i + 1, total: validFiles.length });
        
        try {
          const formData = new FormData();
          formData.append('document', file);
          formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Remove extension
          
          // Determine category based on file type
          const category = file.type.startsWith('video/') ? 'video' : 'beat';
          formData.append('category', category);

          const response = await apiService.uploadDocument(formData);

          if (response && response.success) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Failed to upload ${file.name}:`, response?.error || 'Unknown error');
          }
        } catch (error) {
          errorCount++;
          console.error(`Error uploading ${file.name}:`, error);
        }
      }

      // Show results
      if (successCount > 0) {
        if (validFiles.length === 1) {
          toast.success('File uploaded successfully!');
        } else {
          toast.success(`${successCount} files uploaded successfully!`);
        }
        loadDocuments(); // Reload documents list
      }

      if (errorCount > 0) {
        toast.error(`${errorCount} files failed to upload`);
      }

    } catch (error) {
      console.error('Bulk upload error:', error);
      toast.error('Failed to upload files: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress({ current: 0, total: 0 });
      event.target.value = ''; // Reset file input
    }
  };

  const handleUpload = () => {
    document.getElementById('file-upload').click();
  };

  const handlePlay = (document) => {
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
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleDelete = (document) => {
    setBeatToDelete(document);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async (beat) => {
    try {
      setIsDeleting(true);
      // Call API to delete the beat
      const response = await apiService.deleteDocument(beat.id);
      
      if (response && response.success) {
        toast.success('Beat deleted successfully!');
        setDocuments(prev => prev.filter(doc => doc.id !== beat.id));
        setShowDeleteModal(false);
        setBeatToDelete(null);
      } else {
        toast.error('Failed to delete beat');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete beat');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setBeatToDelete(null);
  };

  const handleClosePlayer = () => {
    setCurrentDocument(null);
  };

  const handleTogglePlayerSize = () => {
    setIsPlayerMinimized(!isPlayerMinimized);
  };

  const handleDeleteFromPlayer = async (document) => {
    setBeatToDelete(document);
    setShowDeleteModal(true);
    setCurrentDocument(null);
  };

  const handleDownloadFromPlayer = async (document) => {
    await handleDownload(document);
  };

  // Enhanced filtering with categories and search
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.file_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(documents.map(doc => doc.category).filter(Boolean))];







  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

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
      <Content>
        <Header>
          <Title>
            <Music size={32} />
            Beat Library
          </Title>
          <Subtitle>Manage your music collection with precision and style. Upload multiple files at once.</Subtitle>
          
          <Controls>
            <SearchInput 
              placeholder="Search beats by title or filename..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <UploadButton
              onClick={handleUpload}
              disabled={uploading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
                           <Upload size={20} />
             {uploading 
               ? uploadProgress.total > 1 
                 ? `Uploading ${uploadProgress.current}/${uploadProgress.total}...` 
                 : 'Uploading...'
               : 'Upload Files'
             }
            </UploadButton>
                       <input
             id="file-upload"
             type="file"
             multiple
             style={{ display: 'none' }}
             onChange={handleFileUpload}
             accept="audio/*,video/*,.mp3,.wav,.ogg,.flac,.aac,.m4a,.mp4,.mov,.avi,.webm"
           />
          </Controls>

          {/* Category Filter */}
          <CategoryFilter>
            {categories.map(category => (
              <CategoryChip
                key={category}
                active={selectedCategory === category}
                onClick={() => handleCategoryFilter(category)}
              >
                {category === 'all' ? 'All Beats' : category.charAt(0).toUpperCase() + category.slice(1)}
              </CategoryChip>
            ))}
          </CategoryFilter>
        </Header>

        {loading ? (
          <EmptyState>
            <EmptyIcon>
              <Volume2 size={32} />
            </EmptyIcon>
            <EmptyTitle>Loading beats...</EmptyTitle>
          </EmptyState>
        ) : filteredDocuments.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Music size={32} />
            </EmptyIcon>
            <EmptyTitle>No beats found</EmptyTitle>
            <EmptySubtitle>Upload your first beat to get started!</EmptySubtitle>
          </EmptyState>
        ) : (
          <BeatsTable
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TableHeader>
              <HeaderRow>
                <HeaderCell width="60px"></HeaderCell>
                <HeaderCell width="400px">Track</HeaderCell>
                <HeaderCell width="120px">Format</HeaderCell>
                <HeaderCell width="120px">Size</HeaderCell>
                <HeaderCell width="160px">Upload Date</HeaderCell>
                <HeaderCell width="180px">Actions</HeaderCell>
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
                      <Play size={20} />
                    </PlayButton>
                  </PlayCell>
                  
                  <TrackCell>
                    <TrackIcon>
                      {document.file_type?.startsWith('video/') || document.file_name?.toLowerCase().includes('.mp4') ? (
                        <Video size={24} color="#000000" />
                      ) : (
                        <Music2 size={24} color="#000000" />
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
                    <ActionButton onClick={() => handleDownload(document)}>
                      <Download size={18} />
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(document)} className="danger">
                      <Trash2 size={18} />
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

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          beat={beatToDelete}
          isDeleting={isDeleting}
        />
      </Content>
    </Container>
  );
};

export default Documents;