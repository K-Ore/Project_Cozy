import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from 'lucide-react';
import styles from './Profile.module.css';

const Profile = ({ userInfo, setCurrentView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    phone: '+91 98703 74204',
    location: 'New Delhi, India',
    bio: 'Passionate home chef who loves experimenting with flavors from around the world.',
    joinDate: 'March 2024'
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Profile updated:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: userInfo?.name || '',
      email: userInfo?.email || '',
      phone: '+91 98703 74204',
      location: 'New Delhi, India',
      bio: 'Passionate home chef who loves experimenting with flavors from around the world.',
      joinDate: 'March 2024'
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => setCurrentView('dashboard')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className={`${styles.title} ${styles.shimmer}`}>
          Profile Settings
        </h1>
        <button 
          className={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <X size={18} /> : <Edit3 size={18} />}
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className={styles.avatarInfo}>
            <h2>{profileData.name || 'User Name'}</h2>
            <p>Recipe Enthusiast</p>
          </div>
          {isEditing && (
            <button className={styles.changeAvatarButton}>
              Change Photo
            </button>
          )}
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>
                <User size={18} />
                Full Name
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <div className={styles.detailValue}>{profileData.name}</div>
              )}
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>
                <Mail size={18} />
                Email Address
              </div>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <div className={styles.detailValue}>{profileData.email}</div>
              )}
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>
                <Phone size={18} />
                Phone Number
              </div>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <div className={styles.detailValue}>{profileData.phone}</div>
              )}
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>
                <MapPin size={18} />
                Location
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <div className={styles.detailValue}>{profileData.location}</div>
              )}
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailLabel}>
                <Calendar size={18} />
                Member Since
              </div>
              <div className={styles.detailValue}>{profileData.joinDate}</div>
            </div>
          </div>

          <div className={styles.bioSection}>
            <div className={styles.detailLabel}>About Me</div>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className={styles.textarea}
                rows={4}
                placeholder="Tell us about yourself and your cooking journey..."
              />
            ) : (
              <div className={styles.detailValue}>{profileData.bio}</div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className={styles.editActions}>
            <button 
              className={styles.cancelEditButton}
              onClick={handleCancel}
            >
              Cancel Changes
            </button>
            <button 
              className={styles.saveButton}
              onClick={handleSave}
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        )}

        <div className={styles.statsSection}>
          <h3>My Recipe Stats</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>12</div>
              <div className={styles.statLabel}>Recipes Created</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>89</div>
              <div className={styles.statLabel}>Followers</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>156</div>
              <div className={styles.statLabel}>Following</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>1.2K</div>
              <div className={styles.statLabel}>Total Views</div>
            </div>
          </div>
        </div>

        <div className={styles.preferencesSection}>
          <h3>Preferences</h3>
          <div className={styles.preferencesList}>
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceLabel}>Email Notifications</div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceLabel}>Recipe Recommendations</div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceLabel}>Public Profile</div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
