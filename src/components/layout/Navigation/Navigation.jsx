import React, {
  useMemo,
  memo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Home,
  User,
  LogOut,
  Presentation,
  Unplug,
  ArrowLeft,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';
import styles from './Navigation.module.css';

const createIcons = () => ({
  explore: <Presentation size={18} />,
  home: <Home size={18} />,
  search: <Search size={18} />,
  dashboard: <LayoutDashboard size={18} />,
  user: <User size={18} />,
  logout: <LogOut size={16} />,
  connect: <Unplug size={18} />,
  back: <ArrowLeft size={18} />,
  menu: <Menu size={22} />,
  close: <X size={22} />,
});

const Navigation = memo(
  ({
    currentView,
    setCurrentView,
    isLoggedIn = false,
    onConnect,
    onLogout,
    userInfo = null,
  }) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const overlayRef = useRef(null);
    const location = useLocation();

    const icons = useMemo(() => createIcons(), []);

    const getCurrentView = useMemo(() => {
      const path = location.pathname.slice(1);
      return path || currentView || 'home';
    }, [location.pathname, currentView]);

    const guestNavLinks = useMemo(
      () => [
        { id: 'explore', text: 'Explore', icon: icons.explore },
        { id: 'home', text: 'Home', icon: icons.home },
        { id: 'search', text: 'Search', icon: icons.search },
      ],
      [icons]
    );

    const userNavLinks = useMemo(
      () => [
        { id: 'explore', text: 'Explore', icon: icons.explore },
        { id: 'home', text: 'Home', icon: icons.home },
        { id: 'search', text: 'Search', icon: icons.search },
        { id: 'dashboard', text: 'Dashboard', icon: icons.dashboard },
      ],
      [icons]
    );

    const currentNavLinks = useMemo(
      () => (isLoggedIn ? userNavLinks : guestNavLinks),
      [isLoggedIn, userNavLinks, guestNavLinks]
    );

    const handleNavClick = useCallback(
      (viewId) => {
        setCurrentView(viewId);
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
      },
      [setCurrentView]
    );

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
        setIsProfileDropdownOpen((p) => !p);
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
      setIsMenuOpen((p) => !p);
      setIsProfileDropdownOpen(false);
    }, []);

    useEffect(() => {
      const handleClickOutside = (event) => {
        const t = event.target;
        if (dropdownRef.current && !dropdownRef.current.contains(t)) {
          setIsProfileDropdownOpen(false);
        }
        if (overlayRef.current && !overlayRef.current.contains(t)) {
        }
      };
      document.addEventListener('mousedown', handleClickOutside, {
        passive: true,
      });
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
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

    const isOnAuthPage = getCurrentView === 'auth';

    return (
      <>
        <div className={styles.navigationContainer} aria-hidden={false}>
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
              <nav
                className={styles.navLinks}
                role="navigation"
                aria-label="Main navigation"
              >
                {currentNavLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`${styles.navLink} ${styles.navLinkWithLine} ${
                      getCurrentView === link.id ? styles.active : ''
                    } ${styles.navLinkWithIcon}`}
                    aria-current={
                      getCurrentView === link.id ? 'page' : undefined
                    }
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
                        {userInfo?.name
                          ? `Hi, ${userInfo.name.split(' ')[0]}`
                          : 'Profile'}
                      </span>
                      <div className={styles.navHoverLine}></div>
                    </button>

                    {isProfileDropdownOpen && (
                      <div className={styles.profileDropdown}>
                        <div className={styles.dropdownHeader}>
                          <div className={styles.userAvatar}>
                            {userInfo?.name
                              ? userInfo.name.charAt(0).toUpperCase()
                              : 'U'}
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
                <div className={styles.themeToggleContainer}>
                  <ThemeToggle />
                </div>
                <div className={styles.navFooterCopyright}>
                  <span className={styles.shimmer}>
                    Enjoy your culinary adventures with{' '}
                    <span style={{ fontWeight: 'bold' }}>"MonsoonRecipes"</span>
                    {isLoggedIn && userInfo?.name && (
                      <span className={styles.welcomeText}>
                        {' '}
                        • Welcome back!
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mobileNavigationContainer}>
          <div className={styles.mobileLogo} onClick={handleLogoClick}>
            <div className={`${styles.logoText} ${styles.shimmer}`}>
              MonsoonRecipes
            </div>
          </div>

          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? icons.close : icons.menu}
          </button>
        </div>

        {isMenuOpen && (
          <div className={styles.mobileMenuOverlay}>
            <div className={styles.mobileMenuContent} ref={overlayRef}>
              <nav
                className={styles.mobileNavLinks}
                role="navigation"
                aria-label="Mobile navigation"
              >
                {currentNavLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`${styles.mobileNavLink} ${
                      getCurrentView === link.id ? styles.active : ''
                    }`}
                    aria-current={
                      getCurrentView === link.id ? 'page' : undefined
                    }
                  >
                    <span className={styles.mobileLinkIcon}>{link.icon}</span>
                    <span className={styles.shimmer}>{link.text}</span>
                  </button>
                ))}
              </nav>

              <div className={styles.mobileProfileSection}>
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
                      <span className={styles.mobileLinkIcon}>
                        {icons.user}
                      </span>
                      <span className={styles.shimmer}>
                        {userInfo?.name
                          ? `Hi, ${userInfo.name.split(' ')[0]}`
                          : 'Profile'}
                      </span>
                    </button>

                    {isProfileDropdownOpen && (
                      <div className={styles.mobileProfileDropdown}>
                        <div className={styles.mobileDropdownHeader}>
                          <div className={styles.mobileUserAvatar}>
                            {userInfo?.name
                              ? userInfo.name.charAt(0).toUpperCase()
                              : 'U'}
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
                      isOnAuthPage
                        ? styles.mobileBackButton
                        : styles.mobileConnectButton
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

              <div className={styles.themeToggleContainer}>
                <ThemeToggle />
              </div>

              <div className={styles.mobileFooter}>
                <div className={styles.mobileCopyright}>
                  <span className={`${styles.shimmer}`}>
                    © 2025 MonsoonRecipes
                    {isLoggedIn && userInfo?.name && (
                      <span className={styles.mobileWelcomeText}>
                        {' '}
                        • Welcome back!
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

Navigation.displayName = 'Navigation';
export default Navigation;
