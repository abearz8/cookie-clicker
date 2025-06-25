import styles from './OfflineEarningsPopup.module.css';

interface OfflineEarningsPopupProps {
  offlineCookies: number;
  secondsOffline: number;
  onClose: () => void;
}

export default function OfflineEarningsPopup({ 
  offlineCookies, 
  secondsOffline, 
  onClose 
}: OfflineEarningsPopupProps) {
  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  };

  const formatCookies = (cookies: number): string => {
    if (cookies >= 1000000) {
      return `${(cookies / 1000000).toFixed(1)}M`;
    } else if (cookies >= 1000) {
      return `${(cookies / 1000).toFixed(1)}K`;
    }
    return Math.floor(cookies).toString();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Welcome Back! 🍪</h2>
        <p>You were away for <strong>{formatTime(secondsOffline)}</strong></p>
        <div className={styles.earnings}>
          <span className={styles.cookieIcon}>🍪</span>
          <span className={styles.amount}>+{formatCookies(offlineCookies)} cookies</span>
        </div>
        <p className={styles.subtitle}>Your automatic upgrades worked while you were gone!</p>
        <button className={styles.closeButton} onClick={onClose}>
          Awesome!
        </button>
      </div>
    </div>
  );
} 