import React, { useState, useCallback, useMemo } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import styles from './AuthPage.module.css';

const AuthPage = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password) => {
    return password.length >= 6;
  }, []);

  const validationRules = useMemo(() => ({
    name: (value) => {
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return null;
    },
    email: (value) => {
      if (!value.trim()) return 'Email is required';
      if (!validateEmail(value)) return 'Please enter a valid email address';
      return null;
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (!validatePassword(value)) return 'Password must be at least 6 characters';
      return null;
    },
    confirmPassword: (value) => {
      if (!isLogin && !value) return 'Please confirm your password';
      if (!isLogin && value !== formData.password) return 'Passwords do not match';
      return null;
    }
  }), [validateEmail, validatePassword, isLogin, formData.password]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = validationRules[field]?.(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [touched, validationRules]);

  const handleInputBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validationRules[field]?.(formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  }, [validationRules, formData]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const fieldsToValidate = isLogin 
      ? ['email', 'password'] 
      : ['name', 'email', 'password', 'confirmPassword'];

    fieldsToValidate.forEach(field => {
      const error = validationRules[field]?.(formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return Object.keys(newErrors).length === 0;
  }, [isLogin, validationRules, formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (isLogin) {
        onLogin?.(formData);
      } else {
        onRegister?.(formData);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  }, [validateForm, isLogin, onLogin, onRegister, formData]);

  const switchMode = useCallback(() => {
    setIsLogin(prev => !prev);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setTouched({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return (
    <div className={styles.authContent}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={styles.authTitle}>
            <h2 className={`${styles.title} ${styles.shimmer}`}>
              {isLogin ? 'Welcome Back' : 'Join MonsoonRecipes'}
            </h2>
            <p className={styles.subtitle}>
              {isLogin 
                ? 'Sign in to your account to continue' 
                : 'Create an account to start sharing recipes'
              }
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleInputBlur('name')}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  disabled={loading}
                />
              </div>
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleInputBlur('email')}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                disabled={loading}
              />
            </div>
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => handleInputBlur('password')}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggle}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onBlur={() => handleInputBlur('confirmPassword')}
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={styles.passwordToggle}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
            </div>
          )}

          <button 
            type="submit" 
            className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className={styles.spinner}></div>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p className={styles.switchText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={switchMode} 
              className={styles.switchButton}
              disabled={loading}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
