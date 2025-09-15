import React from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <div className={styles.toggleTrack}>
        <div className={styles.toggleThumb}>
          {theme === 'dark' ? (
            <Moon size={16} />
          ) : (
            <div className={styles.sunWithClouds}>
              <Sun size={14} />
              <Cloud size={10} className={styles.cloudIcon} />
            </div>
          )}
        </div>
      </div>
      <span className={styles.themeLabel}>
        {theme === 'dark' ? 'Dark' : 'Rainy'}
      </span>
    </button>
  );
};

export default ThemeToggle;
