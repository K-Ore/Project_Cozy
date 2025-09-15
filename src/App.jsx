import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/layout/Navigation/Navigation';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { ThemeProvider } from './contexts/ThemeContext';
import { Menu, X } from 'lucide-react';
import styles from './App.module.css';

const Home = lazy(() => import('./pages/Home/Home'));
const Explore = lazy(() => import('./pages/Recipe/Explore'));
const Search = lazy(() => import('./pages/Search/Search'));
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const CreateRecipe = lazy(() => import('./pages/CreateRecipe/CreateRecipe'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const ClickSpark = lazy(() => import('./components/ui/libraries/ClickSpark/ClickSpark'));

const GlobalRainfall = () => {
  const generateRaindrops = () => {
    const drops = [];
    for (let i = 0; i < 120; i++) {
      drops.push(
        <div
          key={i}
          className={styles.globalRaindrop}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.8 + Math.random() * 1.2}s`,
            opacity: 0.2 + Math.random() * 0.3
          }}
        />
      );
    }
    return drops;
  };

  return (
    <div className={styles.globalRainfallContainer}>
      {generateRaindrops()}
    </div>
  );
};

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = location.pathname.slice(1) || 'home';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConnect = () => {
    navigate('/auth');
  };

  const handleLogin = (formData) => {
    setUserInfo({
      name: formData.name || 'Recipe Chef',
      email: formData.email
    });
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleRegister = (formData) => {
    setUserInfo({
      name: formData.name,
      email: formData.email
    });
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate('/');
  };

  const handleNavigation = (viewId) => {
    navigate(`/${viewId === 'home' ? '' : viewId}`);
  };

  const toggleNavigation = () => {
    setIsNavigationCollapsed(prev => !prev);
  };

  return (
    <div className={styles.appContainer}>
      <Suspense fallback={<div>Loading effects...</div>}>
        <ClickSpark
          sparkColor='#cbfff3ff'
          sparkSize={10}
          sparkRadius={25}
          sparkCount={8}
          duration={400}
        >
          <GlobalRainfall />
          
          <div className={styles.globalBackground}></div>

          <button 
            className={`${styles.navigationToggle} ${isNavigationCollapsed ? styles.collapsed : styles.expanded}`}
            onClick={toggleNavigation}
            aria-label={isNavigationCollapsed ? "Show navigation" : "Hide navigation"}
          >
            {isNavigationCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>

          {!isNavigationCollapsed && (
            <Navigation 
              currentView={currentView} 
              setCurrentView={handleNavigation}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              onConnect={handleConnect}
              onLogout={handleLogout}
            />
          )}
          
          <div className={`${styles.contentWrapper} ${
            isMobile ? styles.mobileContent : 
            (isNavigationCollapsed ? styles.fullWidth : styles.withNavigation)
          }`}>
            <div className={styles.pageContainer}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthLarge} ${styles.paddingDefault}`}>
                        <Home setCurrentView={handleNavigation} />
                      </div>
                    } 
                  />
                  <Route 
                    path="/explore" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthLarge} ${styles.paddingDefault}`}>
                        <Explore setCurrentView={handleNavigation} />
                      </div>
                    } 
                  />
                  <Route 
                    path="/search" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthMedium} ${styles.paddingDefault}`}>
                        <Search setCurrentView={handleNavigation} />
                      </div>
                    } 
                  />
                  <Route 
                    path="/auth" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthMedium} ${styles.paddingDefault}`}>
                        <AuthPage 
                          onLogin={handleLogin}
                          onRegister={handleRegister}
                        />
                      </div>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthLarge} ${styles.paddingDefault}`}>
                        <Dashboard userInfo={userInfo} setCurrentView={handleNavigation} />
                      </div>
                    } 
                  />
                  <Route 
                    path="/createRecipe" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthMedium} ${styles.paddingDefault}`}>
                        <CreateRecipe setCurrentView={handleNavigation} />
                      </div>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthMedium} ${styles.paddingDefault}`}>
                        <Profile userInfo={userInfo} setCurrentView={handleNavigation} />
                      </div>
                    } 
                  />
                  <Route 
                    path="*" 
                    element={
                      <div className={`${styles.pageWrapper} ${styles.maxWidthMedium} ${styles.paddingDefault}`}>
                        <NotFound setCurrentView={handleNavigation} />
                      </div>
                    } 
                  />
                </Routes>
              </Suspense>
            </div>
          </div>
        </ClickSpark>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
