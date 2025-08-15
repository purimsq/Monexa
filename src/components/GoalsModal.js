import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Calendar, DollarSign, Plus, Trash2, TrendingUp } from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../services/api';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const ModalBody = styled.div`
  padding: 0 24px 24px 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: none;
  font-weight: 500;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  border-bottom: 2px solid ${props => props.active ? '#3b82f6' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #3b82f6;
  }
`;

const GoalsList = styled.div`
  display: grid;
  gap: 16px;
`;

const GoalCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #f8fafc;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const GoalInfo = styled.div`
  flex: 1;
`;

const GoalTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

const GoalDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const GoalMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #6b7280;
`;

const GoalActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &.delete {
    background: #fef2f2;
    color: #dc2626;

    &:hover {
      background: #fee2e2;
    }
  }

  &.progress {
    background: #f0f9ff;
    color: #3b82f6;

    &:hover {
      background: #e0f2fe;
    }
  }
`;

const ProgressBar = styled.div`
  background: #e5e7eb;
  border-radius: 8px;
  height: 8px;
  margin: 12px 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  height: 100%;
  width: ${props => Math.min(props.percentage, 100)}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &.primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
`;

const GoalsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('view');
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_amount: '',
    target_date: '',
    category: 'general'
  });

  useEffect(() => {
    if (isOpen) {
      loadGoals();
    }
  }, [isOpen]);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const response = await apiService.getGoals();
      if (response.success) {
        setGoals(response.goals);
      }
    } catch (error) {
      console.error('Failed to load goals:', error);
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiService.createGoal(formData);
      if (response.success) {
        toast.success('Goal created successfully!');
        setFormData({
          title: '',
          description: '',
          target_amount: '',
          target_date: '',
          category: 'general'
        });
        setActiveTab('view');
        loadGoals();
      }
    } catch (error) {
      console.error('Failed to create goal:', error);
      toast.error('Failed to create goal');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    
    try {
      const response = await apiService.deleteGoal(goalId);
      if (response.success) {
        toast.success('Goal deleted successfully!');
        loadGoals();
      }
    } catch (error) {
      console.error('Failed to delete goal:', error);
      toast.error('Failed to delete goal');
    }
  };

  const handleUpdateProgress = async (goalId) => {
    const amount = prompt('Enter amount to add to goal progress:');
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

    try {
      const response = await apiService.updateGoalProgress(goalId, parseFloat(amount));
      if (response.success) {
        toast.success('Goal progress updated!');
        loadGoals();
      }
    } catch (error) {
      console.error('Failed to update goal progress:', error);
      toast.error('Failed to update goal progress');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                <Target size={24} />
                Financial Goals
              </ModalTitle>
              <CloseButton onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <TabsContainer>
                <Tab 
                  active={activeTab === 'view'} 
                  onClick={() => setActiveTab('view')}
                >
                  My Goals
                </Tab>
                <Tab 
                  active={activeTab === 'create'} 
                  onClick={() => setActiveTab('create')}
                >
                  Create Goal
                </Tab>
              </TabsContainer>

              {activeTab === 'view' && (
                <>
                  {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      Loading goals...
                    </div>
                  ) : goals.length > 0 ? (
                    <GoalsList>
                      {goals.map(goal => (
                        <GoalCard key={goal.id}>
                          <GoalHeader>
                            <GoalInfo>
                              <GoalTitle>{goal.title}</GoalTitle>
                              {goal.description && (
                                <GoalDescription>{goal.description}</GoalDescription>
                              )}
                              <GoalMeta>
                                <span>Target: {formatDate(goal.target_date)}</span>
                                <span>Category: {goal.category}</span>
                                <span>Status: {goal.status}</span>
                              </GoalMeta>
                            </GoalInfo>
                            <GoalActions>
                              <ActionButton 
                                className="progress"
                                onClick={() => handleUpdateProgress(goal.id)}
                                title="Add Progress"
                              >
                                <TrendingUp size={16} />
                              </ActionButton>
                              <ActionButton 
                                className="delete"
                                onClick={() => handleDeleteGoal(goal.id)}
                                title="Delete Goal"
                              >
                                <Trash2 size={16} />
                              </ActionButton>
                            </GoalActions>
                          </GoalHeader>
                          
                          <ProgressBar>
                            <ProgressFill 
                              percentage={calculateProgress(goal.current_amount, goal.target_amount)} 
                            />
                          </ProgressBar>
                          
                          <ProgressText>
                            <span>{formatCurrency(goal.current_amount)} saved</span>
                            <span>{formatCurrency(goal.target_amount)} target</span>
                          </ProgressText>
                        </GoalCard>
                      ))}
                    </GoalsList>
                  ) : (
                    <EmptyState>
                      <EmptyIcon>
                        <Target size={32} color="#9ca3af" />
                      </EmptyIcon>
                      <h3>No goals yet</h3>
                      <p>Create your first financial goal to start tracking your progress!</p>
                    </EmptyState>
                  )}
                </>
              )}

              {activeTab === 'create' && (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Goal Title *</Label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Emergency Fund, Vacation, New Car"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Optional description of your goal..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Target Amount *</Label>
                    <Input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={formData.target_amount}
                      onChange={(e) => setFormData({...formData, target_amount: e.target.value})}
                      placeholder="0.00"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Target Date *</Label>
                    <Input
                      type="date"
                      value={formData.target_date}
                      onChange={(e) => setFormData({...formData, target_date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="general">General</option>
                      <option value="emergency">Emergency Fund</option>
                      <option value="vacation">Vacation</option>
                      <option value="house">House/Property</option>
                      <option value="car">Car/Vehicle</option>
                      <option value="education">Education</option>
                      <option value="retirement">Retirement</option>
                      <option value="health">Health</option>
                      <option value="business">Business</option>
                    </Select>
                  </FormGroup>

                  <FormActions>
                    <Button 
                      type="button" 
                      className="secondary"
                      onClick={() => setActiveTab('view')}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="primary"
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create Goal'}
                    </Button>
                  </FormActions>
                </Form>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default GoalsModal;
