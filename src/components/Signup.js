import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from './AuthLayout';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;



const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }

  &:invalid {
    border-color: #ef4444;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: #94a3b8;
  z-index: 2;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    color: #1a1a1a;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const SignupButton = styled(motion.button)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`;

const DividerText = styled.span`
  padding: 0 16px;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 8px;
`;

const LoginText = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.2s ease;

  &:hover {
    color: #333333;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 13px;
  margin-top: -4px;
  margin-bottom: 4px;
  padding: 6px 10px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  border-left: 3px solid #ef4444;
`;

const PasswordStrength = styled.div`
  margin-top: 8px;
  font-size: 12px;
`;

const StrengthBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 4px;
  overflow: hidden;
`;

const StrengthFill = styled.div`
  height: 100%;
  transition: all 0.3s ease;
  background: ${props => 
    props.$strength === 'weak' ? '#ef4444' :
    props.$strength === 'medium' ? '#f59e0b' :
    props.$strength === 'strong' ? '#10b981' : '#e2e8f0'
  };
  width: ${props => 
    props.$strength === 'weak' ? '33%' :
    props.$strength === 'medium' ? '66%' :
    props.$strength === 'strong' ? '100%' : '0%'
  };
`;

const StrengthText = styled.span`
  color: ${props => 
    props.$strength === 'weak' ? '#ef4444' :
    props.$strength === 'medium' ? '#f59e0b' :
    props.$strength === 'strong' ? '#10b981' : '#64748b'
  };
  font-weight: 500;
`;

const roles = [
  'Music Producer',
  'Beat Maker',
  'Sound Engineer',
  'Artist',
  'DJ',
  'Composer',
  'Studio Manager',
  'Other'
];

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'strong';
    return 'medium';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await signup(formData);
      
      if (result.success) {
        toast.success('Welcome to Monexa! Your account has been created.', {
          position: "bottom-right",
          autoClose: 4000,
        });
      } else {
        toast.error(result.error || 'Signup failed. Please try again.', {
          position: "bottom-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.', {
        position: "bottom-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
          <AuthLayout isWide={true}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <InputContainer>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </InputContainer>
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Email Address</Label>
          <InputContainer>
            <InputIcon>
              <Mail size={18} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputContainer>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Role</Label>
          <InputContainer>
            <InputIcon>
              <Briefcase size={18} />
            </InputIcon>
            <Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Select>
          </InputContainer>
          {errors.role && <ErrorMessage>{errors.role}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <InputContainer>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          </InputContainer>
          {formData.password && (
            <PasswordStrength>
              <StrengthBar>
                <StrengthFill $strength={passwordStrength} />
              </StrengthBar>
              <StrengthText $strength={passwordStrength}>
                Password strength: {passwordStrength}
              </StrengthText>
            </PasswordStrength>
          )}
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Confirm Password</Label>
          <InputContainer>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          </InputContainer>
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </FormGroup>

        <SignupButton
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
          {!isLoading && <ArrowRight size={18} />}
        </SignupButton>

        <DividerContainer>
          <Divider />
          <DividerText>or</DividerText>
          <Divider />
        </DividerContainer>

        <LoginLink>
          <LoginText>
            Already have an account?{' '}
            <LoginButton type="button" onClick={onSwitchToLogin}>
              Sign In
            </LoginButton>
          </LoginText>
        </LoginLink>
      </Form>
    </AuthLayout>
  );
};

export default Signup;
