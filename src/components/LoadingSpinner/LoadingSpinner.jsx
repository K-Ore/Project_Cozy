import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <div className={styles.raindrops}>
          <div className={styles.drop}></div>
          <div className={styles.drop}></div>
          <div className={styles.drop}></div>
        </div>
        <span className={styles.loadingText}>Preparing your recipes...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
