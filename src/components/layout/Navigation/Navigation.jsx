import { 
  useMemo, 
  memo, 
  useCallback, 
  useState, 
  useRef, 
  useEffect
} from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Home, User, LogOut, Presentation, Unplug, ArrowLeft, LayoutDashboard } from 'lucide-react';
import styles from './Navigation.module.css';

const createIcons = () => ({
  explore: <Presentation size={18} />,
  home: <Home size={18} />,
  search: <Search size={18} />,
  dashboard: <LayoutDashboard size={18} />,
  user: <User size={18} />,
  logout: <LogOut size={16} />,
  connect: <Unplug size={18} />,
  back: <ArrowLeft size={18} />
});

const Navigation = memo(({ 
  currentView, 
  setCurrentView, 
  isLoggedIn = false, 
  onConnect,
  onLogout,
  userInfo = null
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  
  const icons = useMemo(() => createIcons(), []);

  const getCurrentView = useMemo(() => {
    const path = location.pathname.slice(1);
    return path || 'home';
  }, [location.pathname]);

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
    setIsProfileDropdownOpen(false);
  }, [setCurrentView]);

  const handleConnectClick = useCallback(() => {
    if (onConnect) {
      onConnect();
    }
  }, [onConnect]);

  const handleBackClick = useCallback(() => {
    setCurrentView('home');
  }, [setCurrentView]);

  const handleProfileClick = useCallback(() => {
    if (isLoggedIn) {
      setIsProfileDropdownOpen(prev => !prev);
    }
  }, [isLoggedIn]);

  const handleLogout = useCallback(() => {
    setIsProfileDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
  }, [onLogout]);

  const handleLogoClick = useCallback(() => {
    handleNavClick('home');
  }, [handleNavClick]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside, { passive: true });
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isProfileDropdownOpen]);

  const currentNavLinks = useMemo(() => {
    return isLoggedIn ? userNavLinks : guestNavLinks;
  }, [isLoggedIn, userNavLinks, guestNavLinks]);

  const isOnAuthPage = getCurrentView === 'auth';

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navLogoContainer}>
        <div className={styles.navLogo} onClick={handleLogoClick}>
          <div className={styles.logoContainer}>
            <div className={`${styles.logoText} ${styles.shimmer}`}>
              MonsoonRecipes
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.navLinksContainerWrapper}>
        <div className={styles.navLinksContainer}>
          <nav className={styles.navLinks} role="navigation" aria-label="Main navigation">
            {currentNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`${styles.navLink} ${styles.navLinkWithLine} ${
                  getCurrentView === link.id ? styles.active : ''
                } ${styles.navLinkWithIcon}`}
                aria-current={getCurrentView === link.id ? 'page' : undefined}
              >
                <span className={styles.linkIcon}>{link.icon}</span>
                <span className={styles.shimmer}>{link.text}</span>
                <div className={styles.navHoverLine}></div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.navFooterContainerWrapper}>
        <div className={styles.navFooterContainer}>
          <div className={styles.profileSection} ref={dropdownRef}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className={`${styles.profileButton} ${
                    isProfileDropdownOpen ? styles.active : ''
                  }`}
                  aria-expanded={isProfileDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className={styles.linkIcon}>{icons.user}</span>
                  <span className={styles.shimmer}>
                    {userInfo?.name ? `Hi, ${userInfo.name.split(' ')}` : 'Profile'}
                  </span>
                  <div className={styles.navHoverLine}></div>
                </button>
                
                {isProfileDropdownOpen && (
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
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleNavClick('profile');
                      }}
                      className={styles.dropdownItem}
                    >
                      {icons.user}
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className={`${styles.dropdownItem} ${styles.logoutItem}`}
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
                className={`${styles.profileButton} ${
                  isOnAuthPage ? styles.backButton : styles.connectButton
                }`}
              >
                <span className={styles.linkIcon}>
                  {isOnAuthPage ? icons.back : icons.connect}
                </span>
                <span className={styles.shimmer}>
                  {isOnAuthPage ? 'Back' : 'Connect'}
                </span>
                <div className={styles.navHoverLine}></div>
              </button>
            )}
          </div>

          <div className={styles.navFooterBottom}>
            <div className={styles.navFooterCopyright}>
              <span className={styles.shimmer}>
                Enjoy your culinary adventures with <span style={{ fontWeight: 'bold' }}>"MonsoonRecipes"</span>
                {isLoggedIn && userInfo?.name && (
                  <span className={styles.welcomeText}> • Welcome back!</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Navigation.displayName = 'Navigation';
export default Navigation;
