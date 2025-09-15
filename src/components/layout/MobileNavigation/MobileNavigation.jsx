import React, { 
  useMemo, 
  memo, 
  useCallback, 
  useState, 
  useRef, 
  useEffect
} from 'react';
import { Search, Home, User, LogOut, Presentation, Unplug, ArrowLeft, LayoutDashboard, Menu, X } from 'lucide-react';
import styles from './MobileNavigation.module.css';

const createIcons = () => ({
  explore: <Presentation size={20} />,
  home: <Home size={20} />,
  search: <Search size={20} />,
  dashboard: <LayoutDashboard size={20} />,
  user: <User size={20} />,
  logout: <LogOut size={18} />,
  connect: <Unplug size={20} />,
  back: <ArrowLeft size={20} />,
  menu: <Menu size={22} />,
  close: <X size={22} />
});

const MobileNavigation = memo(({ 
  currentView, 
  setCurrentView, 
  isLoggedIn = false, 
  onConnect,
  onLogout,
  userInfo = null
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const icons = useMemo(() => createIcons(), []);

  const guestNavLinks = useMemo(() => [
    { id: "explore", text: "Explore", icon: icons.explore },
    { id: "home", text: "Home", icon: icons.home },
    { id: "search", text: "Search", icon: icons.search }
  ], [icons]);

  const userNavLinks = useMemo(() => [
    { id: "explore", text: "Explore", icon: icons.explore },
    { id: "home", text: "Home", icon: icons.home },
    { id: "search", text: "Search", icon: icons.search },
    { id: "dashboard", text: "Dashboard", icon: icons.dashboard }
  ], [icons]);

  const handleNavClick = useCallback((viewId) => {
    setCurrentView(viewId);
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [setCurrentView]);

  const handleConnectClick = useCallback(() => {
    if (onConnect) {
      onConnect();
    }
    setIsMenuOpen(false);
  }, [onConnect]);

  const handleBackClick = useCallback(() => {
    setCurrentView('home');
    setIsMenuOpen(false);
  }, [setCurrentView]);

  const handleProfileClick = useCallback(() => {
    if (isLoggedIn) {
      setIsProfileDropdownOpen(prev => !prev);
    }
    setIsMenuOpen(false);
  }, [isLoggedIn]);

  const handleLogout = useCallback(() => {
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  }, [onLogout]);

  const handleLogoClick = useCallback(() => {
    handleNavClick('home');
  }, [handleNavClick]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setIsProfileDropdownOpen(false);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const currentNavLinks = useMemo(() => {
    return isLoggedIn ? userNavLinks : guestNavLinks;
  }, [isLoggedIn, userNavLinks, guestNavLinks]);

  const isOnAuthPage = currentView === 'auth';

  return (
    <>
      <div className={styles.mobileNavigationContainer}>
        {/* Logo */}
        <div className={styles.mobileLogo} onClick={handleLogoClick}>
          <div className={`${styles.logoText} ${styles.shimmer}`}>
            MonsoonRecipes
          </div>
        </div>

        {/* Menu Toggle Button */}
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? icons.close : icons.menu}
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay} ref={menuRef}>
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileNavLinks} role="navigation" aria-label="Mobile navigation">
              {currentNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`${styles.mobileNavLink} ${
                    currentView === link.id ? styles.active : ''
                  }`}
                  aria-current={currentView === link.id ? 'page' : undefined}
                >
                  <span className={styles.mobileLinkIcon}>{link.icon}</span>
                  <span className={styles.shimmer}>{link.text}</span>
                </button>
              ))}
            </nav>

            <div className={styles.mobileProfileSection} ref={dropdownRef}>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleProfileClick}
                    className={`${styles.mobileProfileButton} ${
                      isProfileDropdownOpen ? styles.active : ''
                    }`}
                    aria-expanded={isProfileDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className={styles.mobileLinkIcon}>{icons.user}</span>
                    <span className={styles.shimmer}>
                      {userInfo?.name ? `Hi, ${userInfo.name.split(' ')[0]}` : 'Profile'}
                    </span>
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className={styles.mobileProfileDropdown}>
                      <div className={styles.mobileDropdownHeader}>
                        <div className={styles.mobileUserAvatar}>
                          {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className={styles.mobileUserDetails}>
                          <span className={styles.mobileUserName}>
                            {userInfo?.name || 'User'}
                          </span>
                          <span className={styles.mobileUserEmail}>
                            {userInfo?.email || 'user@example.com'}
                          </span>
                        </div>
                      </div>
                      <div className={styles.mobileDropdownDivider}></div>
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          handleNavClick('profile');
                        }}
                        className={styles.mobileDropdownItem}
                      >
                        {icons.user}
                        <span>View Profile</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className={`${styles.mobileDropdownItem} ${styles.mobileLogoutItem}`}
                      >
                        {icons.logout}
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={isOnAuthPage ? handleBackClick : handleConnectClick}
                  className={`${styles.mobileProfileButton} ${
                    isOnAuthPage ? styles.mobileBackButton : styles.mobileConnectButton
                  }`}
                >
                  <span className={styles.mobileLinkIcon}>
                    {isOnAuthPage ? icons.back : icons.connect}
                  </span>
                  <span className={styles.shimmer}>
                    {isOnAuthPage ? 'Back' : 'Connect'}
                  </span>
                </button>
              )}
            </div>

            <div className={styles.mobileFooter}>
              <div className={styles.mobileCopyright}>
                <span className={styles.shimmer}>
                  © 2025 MonsoonRecipes
                  {isLoggedIn && userInfo?.name && (
                    <span className={styles.mobileWelcomeText}> • Welcome back!</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

MobileNavigation.displayName = 'MobileNavigation';
export default MobileNavigation;
