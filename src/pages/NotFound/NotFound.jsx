import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound = ({ setCurrentView }) => {
  const generateRaindrops = () => {
    const drops = [];
    for (let i = 0; i < 150; i++) {
      drops.push(
        <div
          key={i}
          className={styles.raindrop}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 1.5}s`,
            opacity: 0.3 + Math.random() * 0.4
          }}
        />
      );
    }
    return drops;
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.rainfallContainer}>
        {generateRaindrops()}
      </div>

      <div className={styles.cloudsContainer}>
        <div className={styles.cloud} style={{ top: '5%', left: '5%' }}>
          <svg width="60" height="35" viewBox="0 0 60 35" fill="none">
            <path d="M45 20c5 0 9-4 9-9s-4-9-9-9c-1 0-2 0-3 1C40 1 38 0 35 0c-5 0-9 4-9 9 0 1 0 2 1 3-3 1-5 4-5 7 0 4 3 7 7 7h16z" fill="rgba(0,0,0,0.3)"/>
          </svg>
        </div>
        <div className={styles.cloud} style={{ top: '8%', right: '10%' }}>
          <svg width="80" height="45" viewBox="0 0 80 45" fill="none">
            <path d="M60 25c6 0 11-5 11-11s-5-11-11-11c-1 0-3 0-4 1C53 2 50 0 46 0c-6 0-11 5-11 11 0 1 0 3 1 4-4 1-7 5-7 9 0 5 4 9 9 9h22z" fill="rgba(0,0,0,0.25)"/>
          </svg>
        </div>
        <div className={styles.cloud} style={{ top: '12%', left: '60%' }}>
          <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
            <path d="M37 16c4 0 7-3 7-7s-3-7-7-7c-1 0-2 0-3 1C33 1 31 0 28 0c-4 0-7 3-7 7 0 1 0 2 1 2-2 1-4 3-4 6 0 3 3 6 6 6h13z" fill="rgba(0,0,0,0.35)"/>
          </svg>
        </div>
        <div className={styles.cloud} style={{ top: '15%', left: '15%' }}>
          <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
            <path d="M52 22c5 0 9-4 9-9s-4-9-9-9c-1 0-2 0-3 1C47 3 44 1 41 1c-5 0-9 4-9 9 0 1 0 2 1 3-3 1-6 4-6 8 0 4 4 8 8 8h17z" fill="rgba(0,0,0,0.28)"/>
          </svg>
        </div>
      </div>

      <div className={styles.notFoundContent}>
        <div className={styles.weatherIcon}>
          <div className={styles.umbrella}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M40 15C58 15 70 35 70 50H10C10 35 22 15 40 15Z" fill="url(#umbrellaGradient)"/>
              <rect x="38" y="52" width="4" height="18" rx="2" fill="#2d3748"/>
              <path d="M42 70c0 4-4 4-4 0" stroke="#2d3748" strokeWidth="2" fill="none"/>
              <defs>
                <linearGradient id="umbrellaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4299e1" />
                  <stop offset="100%" stopColor="#2b6cb0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Lost in the Monsoon</h1>
        <p className={styles.message}>
          Looks like this recipe got washed away by the rain! 
          Don't worry, we'll help you find your way back to delicious discoveries.
        </p>
        
        <div className={styles.suggestions}>
          <h3>🌧️ Weather the storm with these options:</h3>
          <div className={styles.suggestionGrid}>
            <div className={styles.suggestionItem}>
              <span className={styles.suggestionIcon}>🔍</span>
              <span>Double-check the URL for typos</span>
            </div>
            <div className={styles.suggestionItem}>
              <span className={styles.suggestionIcon}>⏰</span>
              <span>Try again in a moment</span>
            </div>
            <div className={styles.suggestionItem}>
              <span className={styles.suggestionIcon}>🏠</span>
              <span>Return to our cozy home</span>
            </div>
            <div className={styles.suggestionItem}>
              <span className={styles.suggestionIcon}>🍳</span>
              <span>Explore our recipe collection</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.actionButton} ${styles.homeButton}`}
            onClick={() => setCurrentView('home')}
          >
            <Home size={18} />
            <span>Back to Home</span>
          </button>
          
          <button 
            className={`${styles.actionButton} ${styles.backButton}`}
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
          
          <button 
            className={`${styles.actionButton} ${styles.searchButton}`}
            onClick={() => setCurrentView('search')}
          >
            <Search size={18} />
            <span>Search Recipes</span>
          </button>
        </div>

        <div className={styles.helpSection}>
          <p className={styles.helpText}>
            ☔ Still caught in the rain? Let's find shelter together!
          </p>
          <div className={styles.quickLinks}>
            <button 
              className={styles.quickLink}
              onClick={() => setCurrentView('explore')}
            >
              🌟 Popular Recipes
            </button>
            <button 
              className={styles.quickLink}
              onClick={() => setCurrentView('home')}
            >
              🔥 Featured Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
