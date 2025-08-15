import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize2,
  SkipBack, SkipForward, X, Download, Trash2, Minus, Square, Copy
} from 'lucide-react';

const MediaPlayer = ({ 
  document, 
  onClose, 
  onDelete, 
  onDownload,
  isMinimized = false,
  onToggleSize 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [showMinimizedControls, setShowMinimizedControls] = useState(false);

  const mediaRef = useRef(null);
  const progressRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const isVideo = document?.file_type?.startsWith('video/') || 
                  document?.file_name?.toLowerCase().includes('.mp4') ||
                  document?.filename?.toLowerCase().includes('.mp4');

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
  }, [volume]);

  // Load media file with authentication
  useEffect(() => {
    const loadMediaFile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Loading media file for document:', document.id);
        
        const response = await fetch(`http://localhost:5000/api/documents/${document.id}/stream`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('monexa_token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to load media: ${response.status} ${response.statusText}`);
        }

        const mediaBlob = await response.blob();
        const url = URL.createObjectURL(mediaBlob);
        
        console.log('Media blob created, size:', mediaBlob.size, 'type:', mediaBlob.type);
        setMediaUrl(url);
        
      } catch (error) {
        console.error('Failed to load media:', error);
        setError(`Failed to load media: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (document?.id) {
      loadMediaFile();
    }

    // Cleanup function to revoke object URL
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.id]); // Re-run when document changes

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleLoadedMetadata = () => {
      setDuration(media.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setError('Failed to load media file');
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    media.addEventListener('loadedmetadata', handleLoadedMetadata);
    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('error', handleError);
    media.addEventListener('canplay', handleCanPlay);

    return () => {
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('error', handleError);
      media.removeEventListener('canplay', handleCanPlay);
    };
  }, [document]);

  useEffect(() => {
    if (isVideo && !isMinimized) {
      // Auto-hide controls for video
      const showControlsTemporarily = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }, 3000);
      };

      showControlsTemporarily();
      return () => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }
  }, [isPlaying, isVideo, isMinimized]);

  const togglePlayPause = async () => {
    if (!mediaRef.current) return;

    try {
      if (isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
      } else {
        await mediaRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
      setError('Playback failed');
    }
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !mediaRef.current || !duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    mediaRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.7);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleMinimize = () => {
    onToggleSize(); // This will set isMinimized to true
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    // Don't call onToggleSize here as we handle maximize internally
  };

  const handleRestore = () => {
    if (isMinimized) {
      onToggleSize(); // Restore from minimized
    }
    setIsMaximized(false); // Return to windowed mode
  };

  const skipTime = (seconds) => {
    if (!mediaRef.current) return;
    
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    mediaRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };



  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
      </ErrorContainer>
    );
  }

  return (
    <PlayerContainer
      className={isMinimized ? 'minimized' : isMaximized ? 'maximized' : 'windowed'}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={isMinimized ? () => setShowMinimizedControls(true) : undefined}
      onMouseLeave={isMinimized ? () => setShowMinimizedControls(false) : undefined}
      onMouseMove={() => {
        if (isVideo && !isMinimized) {
          setShowControls(true);
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
          }
          controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
              setShowControls(false);
            }
          }, 3000);
        }
      }}
    >
      {/* Title Bar - only show when not minimized */}
      {!isMinimized && (
        <WindowTitleBar>
          <TitleBarLeft>
            <MediaIcon>
              {isVideo ? "🎬" : "🎵"}
            </MediaIcon>
            <TitleBarText>{document.title || document.file_name}</TitleBarText>
          </TitleBarLeft>
          <TitleBarRight>
            <WindowButton onClick={handleMinimize} className="minimize">
              <Minus size={14} />
            </WindowButton>
            <WindowButton onClick={handleMaximize} className="maximize">
              {isMaximized ? <Copy size={12} /> : <Square size={12} />}
            </WindowButton>
            <WindowButton onClick={onClose} className="close">
              <X size={14} />
            </WindowButton>
          </TitleBarRight>
        </WindowTitleBar>
      )}
      <MediaContainer className={isMinimized ? 'minimized' : ''}>
        {isVideo ? (
          <VideoElement
            ref={mediaRef}
            src={mediaUrl}
            poster={document.thumbnail}
            className={isMinimized ? 'minimized' : ''}
            onClick={togglePlayPause}
          />
        ) : (
          <AudioContainer className={isMinimized ? 'minimized' : ''}>
            <audio
              ref={mediaRef}
              src={mediaUrl}
            />
            <AudioVisualization>
              <WaveformContainer>
                {Array.from({ length: 50 }, (_, i) => (
                  <WaveBar
                    key={i}
                    style={{
                      height: `${Math.random() * (isPlaying ? 80 : 20) + 10}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                    className={isPlaying ? 'playing' : ''}
                  />
                ))}
              </WaveformContainer>
              <AudioInfo>
                <TrackTitle>{document.title || document.file_name}</TrackTitle>
                <TrackArtist>Audio Track</TrackArtist>
              </AudioInfo>
            </AudioVisualization>
          </AudioContainer>
        )}

        {isLoading && (
          <LoadingOverlay>
            <LoadingSpinner />
            <LoadingText>Loading media...</LoadingText>
          </LoadingOverlay>
        )}

        {/* YouTube Music Style Minimized Controls */}
        {isMinimized && (
          <MinimizedOverlay $show={showMinimizedControls}>
            <MinimizedProgressBar>
              <MinimizedProgress style={{ width: `${progress}%` }} />
            </MinimizedProgressBar>
            <MinimizedControls>
              <MinimizedButton onClick={handleRestore}>
                <Maximize2 size={16} />
              </MinimizedButton>
              <MinimizedButton onClick={onClose}>
                <X size={16} />
              </MinimizedButton>
            </MinimizedControls>
          </MinimizedOverlay>
        )}
      </MediaContainer>

      <AnimatePresence>
        {(showControls || !isVideo) && !isMinimized && (
          <ControlsContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={isMinimized ? 'minimized' : ''}
          >
            {/* Progress Bar */}
            <ProgressContainer>
              <ProgressBar
                ref={progressRef}
                onClick={handleProgressClick}
              >
                <ProgressFill style={{ width: `${progress}%` }} />
                <ProgressHandle style={{ left: `${progress}%` }} />
              </ProgressBar>
              <TimeDisplay>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </TimeDisplay>
            </ProgressContainer>

            {/* Main Controls */}
            <MainControls>
              <ControlsLeft>
                <ControlButton onClick={() => skipTime(-10)}>
                  <SkipBack size={isMinimized ? 16 : 20} />
                </ControlButton>
                
                <PlayPauseButton onClick={togglePlayPause} className={isPlaying ? 'playing' : ''}>
                  {isPlaying ? 
                    <Pause size={isMinimized ? 18 : 24} /> : 
                    <Play size={isMinimized ? 18 : 24} />
                  }
                </PlayPauseButton>
                
                <ControlButton onClick={() => skipTime(10)}>
                  <SkipForward size={isMinimized ? 16 : 20} />
                </ControlButton>
              </ControlsLeft>

              <ControlsCenter>
                {isMinimized && <MediaTitle>{document.title || document.file_name}</MediaTitle>}
              </ControlsCenter>

              <ControlsRight>
                <VolumeContainer>
                  <ControlButton onClick={toggleMute}>
                    {isMuted || volume === 0 ? 
                      <VolumeX size={isMinimized ? 16 : 18} /> : 
                      <Volume2 size={isMinimized ? 16 : 18} />
                    }
                  </ControlButton>
                  <VolumeSlider
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                  />
                </VolumeContainer>

                <ControlButton onClick={onDownload}>
                  <Download size={isMinimized ? 16 : 18} />
                </ControlButton>

                <ControlButton onClick={onDelete} className="danger">
                  <Trash2 size={isMinimized ? 16 : 18} />
                </ControlButton>


              </ControlsRight>
            </MainControls>
          </ControlsContainer>
        )}
      </AnimatePresence>
    </PlayerContainer>
  );
};

// Styled Components
const PlayerContainer = styled(motion.div)`
  position: fixed;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  
  /* Minimized state - like YouTube mini player */
  &.minimized {
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 230px;
    top: unset;
    left: unset;
    transform: none;
    border-radius: 8px;
  }
  
  /* Default windowed state - starts here */
  &.windowed {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 800px;
    height: 600px;
    bottom: unset;
    right: unset;
  }
  
  /* Maximized state - full screen */
  &.maximized {
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-width: none !important;
    max-height: none !important;
    transform: none !important;
    border-radius: 0;
  }
`;

// Windows-style Title Bar Components
const WindowTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 0 8px 0 12px;
  user-select: none;
  cursor: move;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &.minimized {
    height: 28px;
    padding: 0 6px 0 8px;
    border-bottom: none;
  }
`;

const TitleBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const MediaIcon = styled.span`
  font-size: 14px;
  flex-shrink: 0;
`;

const TitleBarText = styled.span`
  color: white;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  
  .minimized & {
    font-size: 11px;
    max-width: 150px;
  }
`;

const TitleBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`;

const WindowButton = styled.button`
  width: 46px;
  height: 32px;
  border: none;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.minimize:hover {
    background: rgba(255, 193, 7, 0.8);
  }
  
  &.maximize:hover {
    background: rgba(40, 167, 69, 0.8);
  }
  
  &.close:hover {
    background: rgba(220, 53, 69, 0.9);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// YouTube Music Style Minimized Controls
const MinimizedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
`;

const MinimizedProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  margin-top: auto;
  margin-bottom: 8px;
`;

const MinimizedProgress = styled.div`
  height: 100%;
  background: #ff0000;
  border-radius: 2px;
  transition: width 0.1s ease;
`;

const MinimizedControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

const MinimizedButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  &.minimized {
    height: calc(100% - 60px);
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
  
  &.minimized {
    height: 60px;
    object-fit: cover;
  }
`;

const AudioContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.minimized {
    height: 60px;
  }
`;

const AudioVisualization = styled.div`
  text-align: center;
  color: white;
`;

const WaveformContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 2px;
  height: 60px;
  margin-bottom: 20px;
`;

const WaveBar = styled.div`
  width: 3px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  transition: height 0.3s ease;
  
  &.playing {
    animation: pulse 1s ease-in-out infinite alternate;
  }
  
  @keyframes pulse {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
`;

const AudioInfo = styled.div`
  text-align: center;
`;

const TrackTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
`;

const TrackArtist = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ErrorContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #ef4444;
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ErrorMessage = styled.div`
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ControlsContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 16px;
  
  &.minimized {
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    padding: 8px 12px;
  }
`;

const ProgressContainer = styled.div`
  margin-bottom: 16px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  margin-bottom: 8px;
  
  &:hover {
    height: 8px;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.1s ease;
`;

const ProgressHandle = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`;

const MainControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlsCenter = styled.div`
  flex: 1;
  text-align: center;
  margin: 0 16px;
`;

const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.danger:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }
`;

const PlayPauseButton = styled.button`
  background: #3b82f6;
  border: none;
  color: white;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }
  
  &.playing {
    background: #059669;
  }
`;

const MediaTitle = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VolumeSlider = styled.input`
  width: 80px;
  appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

export default MediaPlayer;
