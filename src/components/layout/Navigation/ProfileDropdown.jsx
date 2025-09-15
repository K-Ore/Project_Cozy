import React, { memo } from 'react';
import styles from './Navigation.module.css';

const ProfileDropdown = memo(({ userInfo, onProfileClick, onLogout, icons }) => (
  <div className={styles.profileDropdown}>
    <div className={styles.dropdownHeader}>
      <div className={styles.userAvatar}>
        {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
      </div>
      <div className={styles.userDetails}>
        <span className={styles.userName}>
          {userInfo?.name || 'User'}
        </span>
        <span className={styles.userEmail}>
          {userInfo?.email || 'user@example.com'}
        </span>
      </div>
    </div>
    <div className={styles.dropdownDivider}></div>
    <button onClick={onProfileClick} className={styles.dropdownItem}>
      {icons.user}
      <span>View Profile</span>
    </button>
    <button
      onClick={onLogout}
      className={`${styles.dropdownItem} ${styles.logoutItem}`}
    >
      {icons.logout}
      <span>Logout</span>
    </button>
  </div>
));

ProfileDropdown.displayName = 'ProfileDropdown';
export default ProfileDropdown;
