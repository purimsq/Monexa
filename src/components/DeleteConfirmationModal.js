import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Modal = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  border: 2px solid #f0f0f0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc2626;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

const CloseButton = styled.button`
  margin-left: auto;
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666666;
  
  &:hover {
    background: #e5e5e5;
    color: #000000;
  }
`;

const Content = styled.div`
  margin-bottom: 32px;
`;

const Message = styled.p`
  color: #666666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const BeatInfo = styled.div`
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const BeatName = styled.div`
  font-weight: 600;
  color: #000000;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const BeatDetails = styled.div`
  color: #666666;
  font-size: 0.875rem;
`;

const Warning = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid;
  
  &.cancel {
    background: #ffffff;
    border-color: #e5e5e5;
    color: #666666;
    
    &:hover {
      background: #f5f5f5;
      border-color: #000000;
      color: #000000;
    }
  }
  
  &.delete {
    background: #dc2626;
    border-color: #dc2626;
    color: #ffffff;
    
    &:hover {
      background: #b91c1c;
      border-color: #b91c1c;
    }
    
    &:disabled {
      background: #cccccc;
      border-color: #cccccc;
      cursor: not-allowed;
    }
  }
`;

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  beat, 
  isDeleting = false 
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(beat);
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>
            <IconContainer>
              <AlertTriangle size={24} />
            </IconContainer>
            <Title>Delete Beat</Title>
            <CloseButton onClick={onClose}>
              <X size={16} />
            </CloseButton>
          </Header>
          
          <Content>
            <Message>
              Are you sure you want to delete this beat? This action cannot be undone.
            </Message>
            
            {beat && (
              <BeatInfo>
                <BeatName>{beat.title || beat.file_name || beat.filename}</BeatName>
                <BeatDetails>
                  {beat.file_type?.startsWith('video/') ? 'Video File' : 'Audio File'} • 
                  {beat.file_size ? ` ${(beat.file_size / (1024 * 1024)).toFixed(1)} MB` : ''}
                </BeatDetails>
              </BeatInfo>
            )}
            
            <Warning>
              <AlertTriangle size={16} />
              This will permanently remove the file from your library
            </Warning>
          </Content>
          
          <Actions>
            <Button 
              className="cancel" 
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              className="delete" 
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Trash2 size={16} />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete Beat
                </>
              )}
            </Button>
          </Actions>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
