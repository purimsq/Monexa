import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Mail as MailIcon,
  Trash2,
  Search,
  Plus,
  Calendar,
  Paperclip,
  DollarSign,
  Music,
  FileText,
  X,
  Send,
  FolderOpen,
  Video,
  Music2,
  Users
} from 'lucide-react';
import apiService from '../services/api';

// We'll fetch actual clients from the database instead of using hardcoded data

// Utility function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Utility function to calculate total size of attachments
const calculateTotalSize = (attachments) => {
  return attachments.reduce((total, attachment) => total + attachment.size, 0);
};


const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
  background-color: #ffffff;
  color: #1a1a1a;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: #666666;
  margin: 8px 0 0 0;
  font-size: 16px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 12px 16px;
  flex: 1;
  max-width: 400px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #1a1a1a;
    background: #ffffff;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #1a1a1a;
  font-size: 14px;
  width: 100%;

  &::placeholder {
    color: #999999;
  }
`;

const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #1a1a1a;
    background: #ffffff;
  }
`;

const DateInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #1a1a1a;
  font-size: 14px;
  width: 120px;

  &::placeholder {
    color: #999999;
  }
`;

const ComposeButton = styled(motion.button)`
  background: #1a1a1a;
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
    background: #333333;
    transform: translateY(-2px);
  }
`;

const EmailTable = styled.div`
  background: #ffffff;
  border: 2px solid #f0f0f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 200px 120px 100px 80px;
  gap: 16px;
  padding: 16px 24px;
  background: #f8f9fa;
  border-bottom: 2px solid #f0f0f0;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 60px 1fr 200px 120px 100px 80px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.status === 'sent' ? '#10b981' : props.status === 'pending' ? '#f59e0b' : '#ef4444'};
`;

const RecipientEmail = styled.div`
  font-weight: 500;
  color: #1a1a1a;
  font-size: 14px;
`;

const Subject = styled.div`
  color: #1a1a1a;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled.div`
  color: #666666;
  font-size: 13px;
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${props => {
    switch (props.type) {
      case 'payment': return '#dcfce7';
      case 'beat': return '#dbeafe';
      case 'custom': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'payment': return '#166534';
      case 'beat': return '#1e40af';
      case 'custom': return '#92400e';
      default: return '#374151';
    }
  }};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  color: #666666;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    color: #1a1a1a;
  }
`;

// Compose Modal Components
const ModalOverlay = styled(motion.div)`
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
`;

const Modal = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #666666;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    color: #1a1a1a;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #1a1a1a;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }

  &::placeholder {
    color: #999999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: #ffffff;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }

  &::placeholder {
    color: #999999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  color: #666666;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }
`;

const ModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &.primary {
    background: #1a1a1a;
    color: white;

    &:hover {
      background: #333333;
    }
  }

  &.secondary {
    background: #f0f0f0;
    color: #1a1a1a;

    &:hover {
      background: #e0e0e0;
    }
  }
`;

// Beat Library Modal Components
const BeatLibraryModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const BeatLibraryModal = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const BeatLibraryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

const BeatLibraryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BeatLibraryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const BeatCard = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1a1a;
    background: #ffffff;
    transform: translateY(-2px);
  }
`;

const BeatCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const BeatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const BeatInfo = styled.div`
  flex: 1;
`;

const BeatTitle = styled.div`
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
  margin-bottom: 4px;
`;

const BeatType = styled.div`
  font-size: 12px;
  color: #666666;
`;

const BeatDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666666;
`;

const BeatFormat = styled.span`
  background: #e9ecef;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
`;

const BeatSize = styled.span`
  color: #666666;
`;

const AttachmentPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  margin-top: 12px;
`;

const AttachmentIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const AttachmentInfo = styled.div`
  flex: 1;
`;

const AttachmentName = styled.div`
  font-weight: 500;
  color: #1a1a1a;
  font-size: 14px;
`;

const AttachmentSource = styled.div`
  font-size: 12px;
  color: #666666;
`;

const AttachmentActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &.secondary {
    background: #f0f0f0;
    color: #1a1a1a;

    &:hover {
      background: #e0e0e0;
    }
  }

  &.danger {
    background: #fee2e2;
    color: #dc2626;

    &:hover {
      background: #fecaca;
    }
  }
`;

const ClientSelectorModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ClientSelectorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

const ClientSelectorTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const ClientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1a1a;
    background: #f8f9fa;
  }
`;

const ClientAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a1a1a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
`;

const ClientInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.div`
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const ClientEmail = styled.div`
  font-size: 14px;
  color: #666666;
`;

const AttachmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
`;

const AttachmentItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const AttachmentItemIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #1a1a1a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const AttachmentDetails = styled.div`
  flex: 1;
`;

const AttachmentItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
`;

const AttachmentSize = styled.div`
  font-size: 12px;
  color: #666666;
`;

const TotalSize = styled.div`
  font-size: 12px;
  color: #666666;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e9ecef;
`;

const ClientButton = styled.button`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #333333;
  }
`;



const emailTemplates = {
  payment: {
    subject: 'Payment Request - Beat Production',
    body: `Dear [Recipient Name],

I hope this email finds you well. I'm writing to request payment for the beat production services I've provided.

Payment Details:
- Service: Beat Production
- Amount: [Amount]
- Due Date: [Due Date]

Please process the payment at your earliest convenience. If you have any questions or need additional information, please don't hesitate to reach out.

Thank you for your business.

Best regards,
[Your Name]
Monexa`
  },
  beat: {
    subject: 'New Beat - [Beat Name]',
    body: `Dear [Recipient Name],

I'm excited to share a new beat with you! I've attached the audio file for your review.

Beat Details:
- Title: [Beat Name]
- BPM: [BPM]
- Key: [Key]
- Genre: [Genre]

Please let me know your thoughts and if you'd like to proceed with any modifications or licensing.

Best regards,
[Your Name]
Monexa`
  },
  custom: {
    subject: '',
    body: ''
  }
};

const Mail = () => {
  const [emails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('payment');
  const [composeData, setComposeData] = useState({
    recipient: '',
    subject: '',
    body: '',
    attachments: []
  });
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showBeatLibraryModal, setShowBeatLibraryModal] = useState(false);
  const [beatLibraryDocuments, setBeatLibraryDocuments] = useState([]);
  const [selectedBeatFromLibrary, setSelectedBeatFromLibrary] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);


  // Load email history and beneficiaries on component mount
  useEffect(() => {
    loadEmailHistory();
    loadBeneficiaries();
  }, []);

  const loadBeneficiaries = async () => {
    try {
      const response = await apiService.getBeneficiaries();
      if (response.success) {
        setBeneficiaries(response.beneficiaries || []);
      } else {
        console.error('Failed to load beneficiaries:', response.error);
      }
    } catch (error) {
      console.error('Error loading beneficiaries:', error);
    }
  };

  const loadBeatLibraryDocuments = async () => {
    try {
      // Check if we already have documents loaded
      if (beatLibraryDocuments.length > 0) {
        return; // Use cached data
      }
      
      const response = await apiService.getDocuments();
      if (response.success) {
        setBeatLibraryDocuments(response.documents || []);
      }
    } catch (error) {
      console.error('Error loading beat library documents:', error);
      toast.error('Failed to load beat library');
    }
  };

  const loadEmailHistory = async () => {
    try {
      setLoading(true);
      const response = await apiService.getEmailHistory();
      if (response.success) {
        setEmails(response.emails);
      } else {
        toast.error('Failed to load email history');
      }
    } catch (error) {
      console.error('Error loading email history:', error);
      toast.error('Failed to load email history');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search to reduce API calls
  const debouncedSearch = React.useCallback(
    React.useMemo(() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSearchQuery(query);
        }, 300);
      };
    }, []),
    []
  );

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !dateFilter || email.sent_at?.split(' ')[0] === dateFilter;
    return matchesSearch && matchesDate;
  });

  const handleCompose = (template) => {
    setSelectedTemplate(template);
    setComposeData({
      recipient: '',
      subject: emailTemplates[template].subject,
      body: emailTemplates[template].body,
      attachments: []
    });
    setSelectedClient(null);
    setSelectedBeatFromLibrary(null);
    setShowComposeModal(true);
  };

    const handleSendEmail = async () => {
    if (!composeData.recipient || !composeData.subject || !composeData.body) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSending(true);
      
      // Show progress for attachment processing
      if (composeData.attachments.length > 0) {
        toast.info(`Processing ${composeData.attachments.length} attachment(s)...`);
      }

      // Prepare email data
      const emailData = {
        recipient: composeData.recipient,
        subject: composeData.subject,
        body: composeData.body,
        template: selectedTemplate
      };

      // Add attachments if present
      if (composeData.attachments.length > 0 && selectedTemplate === 'beat') {
        // Process attachments in parallel for faster loading
        const attachmentPromises = composeData.attachments.map(async (attachment) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                name: attachment.name,
                data: reader.result.split(',')[1], // Remove data URL prefix
                type: attachment.type
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(attachment.file);
          });
        });

        const attachments = await Promise.all(attachmentPromises);
        
        // Check total size
        const totalSize = attachments.reduce((total, attachment) => {
          return total + (attachment.data ? attachment.data.length * 0.75 : 0);
        }, 0);
        
        const maxSize = 25 * 1024 * 1024; // 25MB
        
        if (totalSize > maxSize) {
          // Files are too large, show error and don't send
          toast.error('Total attachment size exceeds 25MB. Please reduce file sizes or send fewer files.');
          setSending(false);
          return;
        }
        
        emailData.attachments = attachments;
      }

      const response = await apiService.sendEmail(emailData);

      if (response.success) {
        toast.success('Email sent successfully!');
        setShowComposeModal(false);
        setComposeData({ recipient: '', subject: '', body: '', attachments: [] });
        
        // Reload email history to show the new email
        await loadEmailHistory();
      } else {
        toast.error(response.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email: ' + error.message);
    } finally {
      setSending(false);
    }
  };



  const handleDeleteEmail = async (emailId) => {
    try {
      const response = await apiService.deleteEmail(emailId);
      
      if (response.success) {
        setEmails(prev => prev.filter(email => email.id !== emailId));
        toast.success('Email deleted successfully');
      } else {
        toast.error(response.error || 'Failed to delete email');
      }
    } catch (error) {
      console.error('Error deleting email:', error);
      toast.error('Failed to delete email');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 25 * 1024 * 1024; // 25MB in bytes
      const currentTotalSize = calculateTotalSize(composeData.attachments);
      
      if (currentTotalSize + file.size > maxSize) {
        toast.error('Total attachment size cannot exceed 25MB');
        return;
      }

      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        const newAttachment = {
          file,
          name: file.name,
          size: file.size,
          type: file.type
        };

        setComposeData(prev => ({ 
          ...prev, 
          attachments: [...prev.attachments, newAttachment] 
        }));
        setSelectedBeatFromLibrary(null); // Clear Beat Library selection
      } else {
        toast.warning('Only audio and video files are allowed');
      }
    }
  };

  const handleOpenBeatLibrary = async () => {
    setShowBeatLibraryModal(true);
    await loadBeatLibraryDocuments();
  };

  const handleSelectBeatFromLibrary = async (document) => {
    try {
      // Download the file from the server
      const blob = await apiService.downloadDocument(document.id);
      const file = new File([blob], document.file_name || document.filename, {
        type: document.file_type || 'application/octet-stream'
      });
      
      const maxSize = 25 * 1024 * 1024; // 25MB in bytes
      const currentTotalSize = calculateTotalSize(composeData.attachments);
      
      if (currentTotalSize + file.size > maxSize) {
        toast.error('Total attachment size cannot exceed 25MB');
        return;
      }

      const newAttachment = {
        file,
        name: document.file_name || document.filename,
        size: file.size,
        type: document.file_type || 'application/octet-stream'
      };
      
      setComposeData(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, newAttachment] 
      }));
      setSelectedBeatFromLibrary(document);
      setShowBeatLibraryModal(false);
      toast.success(`Selected: ${document.title || document.file_name}`);
    } catch (error) {
      console.error('Error selecting beat from library:', error);
      toast.error('Failed to select beat from library');
    }
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setComposeData(prev => ({ ...prev, recipient: client.email }));
    setShowClientSelector(false);
    toast.success(`Selected client: ${client.name}`);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
    const currentTotalSize = calculateTotalSize(composeData.attachments);
    
    // Quick size check first
    const newFilesSize = files.reduce((total, file) => total + file.size, 0);
    if (currentTotalSize + newFilesSize > maxSize) {
      toast.error('Total attachment size cannot exceed 25MB');
      return;
    }

    // Filter for audio/video files only (optimized)
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('audio/') || file.type.startsWith('video/');
      const isValidSize = file.size > 0 && file.size <= maxSize;
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast.warning(`${files.length - validFiles.length} file(s) were skipped (invalid type or size)`);
    }

    if (validFiles.length > 0) {
      const newAttachments = validFiles.map(file => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }));

      setComposeData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newAttachments]
      }));
      
      toast.success(`Added ${validFiles.length} file(s) successfully`);
    }
  };

  const handleRemoveAttachment = (index) => {
    setComposeData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleClearAttachments = () => {
    setComposeData(prev => ({ ...prev, attachments: [] }));
    setSelectedBeatFromLibrary(null);
  };

  const handleClearClient = () => {
    setSelectedClient(null);
    setComposeData(prev => ({ ...prev, recipient: '' }));
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>
            <MailIcon size={28} />
            Mail
          </Title>
          <Subtitle>Manage your email communications with clients and collaborators</Subtitle>
        </div>
      </Header>

      <Controls>
        <SearchContainer>
          <Search size={16} />
                     <SearchInput
             type="text"
             placeholder="Search by email address or subject..."
             defaultValue={searchQuery}
             onChange={(e) => debouncedSearch(e.target.value)}
           />
        </SearchContainer>

        <DateFilterContainer>
          <Calendar size={16} />
          <DateInput
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </DateFilterContainer>

        <ComposeButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCompose('payment')}
        >
          <Plus size={16} />
          Compose
        </ComposeButton>
      </Controls>

      <EmailTable>
        <TableHeader>
          <div>Status</div>
          <div>Recipient</div>
          <div>Subject</div>
          <div>Date</div>
          <div>Type</div>
          <div>Actions</div>
        </TableHeader>

        {filteredEmails.map((email) => (
          <TableRow
            key={email.id}
            whileHover={{ backgroundColor: '#f8f9fa' }}
            transition={{ duration: 0.2 }}
          >
            <StatusIndicator status={email.status} />
            <RecipientEmail>{email.recipient}</RecipientEmail>
            <Subject>{email.subject}</Subject>
            <DateText>{email.sent_at ? new Date(email.sent_at).toLocaleDateString() : 'N/A'}</DateText>
            <Type type={email.template}>
              {email.template === 'payment' && <DollarSign size={12} />}
              {email.template === 'beat' && <Music size={12} />}
              {email.template === 'custom' && <FileText size={12} />}
              {email.template}
            </Type>
            <Actions>
              <ActionButton onClick={() => handleDeleteEmail(email.id)}>
                <Trash2 size={14} />
              </ActionButton>
            </Actions>
          </TableRow>
        ))}
      </EmailTable>

      {/* Compose Modal */}
      {showComposeModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowComposeModal(false)}
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>Compose Email</ModalTitle>
              <CloseButton onClick={() => setShowComposeModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <FormGroup>
              <Label>Template Type</Label>
              <Select
                value={selectedTemplate}
                                 onChange={(e) => {
                   setSelectedTemplate(e.target.value);
                   setComposeData({
                     recipient: composeData.recipient,
                     subject: emailTemplates[e.target.value].subject,
                     body: emailTemplates[e.target.value].body,
                     attachments: []
                   });
                   setSelectedBeatFromLibrary(null);
                 }}
              >
                <option value="payment">Payment Request</option>
                <option value="beat">Beat Attachment</option>
                <option value="custom">Custom Message</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Recipient Email *</Label>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <Input
                  type="email"
                  placeholder="Enter recipient email address"
                  value={composeData.recipient}
                  onChange={(e) => setComposeData(prev => ({ ...prev, recipient: e.target.value }))}
                  style={{ flex: 1 }}
                />
                <ClientButton 
                  type="button" 
                  onClick={() => setShowClientSelector(true)}
                >
                  Choose Client
                </ClientButton>
              </div>
                             {selectedClient && (
                 <div style={{ 
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'space-between',
                   padding: '8px 12px', 
                   background: '#f8f9fa', 
                   border: '1px solid #e9ecef', 
                   borderRadius: '8px',
                   fontSize: '14px',
                   color: '#666666'
                 }}>
                   <span>Selected: {selectedClient.name} ({selectedClient.email})</span>
                   <SmallButton 
                     className="danger" 
                     onClick={handleClearClient}
                   >
                     Remove
                   </SmallButton>
                 </div>
               )}
            </FormGroup>

            <FormGroup>
              <Label>Subject</Label>
              <Input
                type="text"
                placeholder="Enter email subject"
                value={composeData.subject}
                onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
              />
            </FormGroup>

            {selectedTemplate === 'beat' && (
              <FormGroup>
                <Label>Attach Beat Files (Max 25MB total)</Label>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <FileUploadButton style={{ flex: 1 }}>
                    <Paperclip size={16} />
                    Upload New Files
                    <FileInput
                      type="file"
                      multiple
                      accept=".mp3,.mp4,.wav,.ogg,.flac,.aac,.m4a,.mov,.avi,.webm"
                      onChange={handleFileUpload}
                    />
                  </FileUploadButton>
                  <Button 
                    type="button" 
                    className="secondary" 
                    onClick={handleOpenBeatLibrary}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FolderOpen size={16} />
                    From Beat Library
                  </Button>
                </div>
                
                {/* Multiple Attachments Preview */}
                {composeData.attachments.length > 0 && (
                  <AttachmentList>
                    {composeData.attachments.map((attachment, index) => (
                      <AttachmentItem key={index}>
                        <AttachmentItemInfo>
                          <AttachmentItemIcon>
                            {attachment.type.startsWith('video/') ? (
                              <Video size={16} />
                            ) : (
                              <Music2 size={16} />
                            )}
                          </AttachmentItemIcon>
                          <AttachmentDetails>
                            <AttachmentItemName>{attachment.name}</AttachmentItemName>
                            <AttachmentSize>{formatFileSize(attachment.size)}</AttachmentSize>
                          </AttachmentDetails>
                        </AttachmentItemInfo>
                        <SmallButton 
                          className="danger" 
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          Remove
                        </SmallButton>
                      </AttachmentItem>
                    ))}
                    <TotalSize>
                      Total Size: {formatFileSize(calculateTotalSize(composeData.attachments))}
                    </TotalSize>
                    <SmallButton 
                      className="secondary" 
                      onClick={handleClearAttachments}
                      style={{ alignSelf: 'flex-start', marginTop: '8px' }}
                    >
                      Clear All
                    </SmallButton>
                  </AttachmentList>
                )}
              </FormGroup>
            )}

            <FormGroup>
              <Label>Message</Label>
              <TextArea
                placeholder="Enter your message"
                value={composeData.body}
                onChange={(e) => setComposeData(prev => ({ ...prev, body: e.target.value }))}
              />
            </FormGroup>

            <ModalActions>
              <Button className="secondary" onClick={() => setShowComposeModal(false)}>
                Cancel
              </Button>
              <Button className="primary" onClick={handleSendEmail} disabled={sending}>
                <Send size={16} />
                {sending ? 'Sending...' : 'Send Email'}
              </Button>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}

      {/* Client Selector Modal */}
      {showClientSelector && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowClientSelector(false)}
        >
          <ClientSelectorModal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ClientSelectorHeader>
              <ClientSelectorTitle>Choose Client</ClientSelectorTitle>
              <CloseButton onClick={() => setShowClientSelector(false)}>
                <X size={20} />
              </CloseButton>
            </ClientSelectorHeader>

            <ClientList>
              {beneficiaries.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#666666' 
                }}>
                  <Users size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>No clients found</p>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>
                    You need to create clients first in the Clients page
                  </p>
                  <button
                    onClick={() => {
                      setShowClientSelector(false);
                      // Navigate to clients page
                      window.location.href = '/beneficiaries';
                    }}
                    style={{
                      marginTop: '16px',
                      padding: '8px 16px',
                      backgroundColor: '#1a1a1a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Go to Clients Page
                  </button>
                </div>
              ) : (
                beneficiaries.map((client) => (
                  <ClientItem
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                  >
                    <ClientAvatar>
                      {client.name ? client.name.charAt(0).toUpperCase() : '?'}
                    </ClientAvatar>
                    <ClientInfo>
                      <ClientName>{client.name}</ClientName>
                      <ClientEmail>{client.email}</ClientEmail>
                    </ClientInfo>
                  </ClientItem>
                ))
              )}
            </ClientList>
          </ClientSelectorModal>
        </ModalOverlay>
      )}

      {/* Beat Library Modal */}
      {showBeatLibraryModal && (
        <BeatLibraryModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowBeatLibraryModal(false)}
        >
          <BeatLibraryModal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <BeatLibraryHeader>
              <BeatLibraryTitle>
                <FolderOpen size={24} />
                Select from Beat Library
              </BeatLibraryTitle>
              <CloseButton onClick={() => setShowBeatLibraryModal(false)}>
                <X size={20} />
              </CloseButton>
            </BeatLibraryHeader>

            {beatLibraryDocuments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
                <Music size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>No beats found in your library</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>
                  Upload some beats to your Beat Library first
                </p>
              </div>
            ) : (
              <BeatLibraryGrid>
                {beatLibraryDocuments.map((document) => (
                  <BeatCard
                    key={document.id}
                    onClick={() => handleSelectBeatFromLibrary(document)}
                  >
                    <BeatCardHeader>
                      <BeatIcon>
                        {document.file_type?.startsWith('video/') || 
                         document.file_name?.toLowerCase().includes('.mp4') ? (
                          <Video size={20} />
                        ) : (
                          <Music2 size={20} />
                        )}
                      </BeatIcon>
                      <BeatInfo>
                        <BeatTitle>
                          {document.title || document.file_name}
                        </BeatTitle>
                        <BeatType>
                          {document.file_type?.startsWith('video/') || 
                           document.file_name?.toLowerCase().includes('.mp4') 
                            ? 'Video Track' 
                            : 'Audio Track'
                          }
                        </BeatType>
                      </BeatInfo>
                    </BeatCardHeader>
                    <BeatDetails>
                      <BeatFormat>
                        {document.file_name?.split('.').pop()?.toUpperCase() || 'FILE'}
                      </BeatFormat>
                      <BeatSize>
                        {formatFileSize ? formatFileSize(document.file_size || 0) : 'Unknown size'}
                      </BeatSize>
                    </BeatDetails>
                  </BeatCard>
                ))}
              </BeatLibraryGrid>
            )}
          </BeatLibraryModal>
                 </BeatLibraryModalOverlay>
       )}

       
     </Container>
   );
 };

export default Mail;

