import React from 'react';
import { Plus, BookOpen, Heart, TrendingUp, Clock, Users } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = ({ userInfo, setCurrentView }) => {
  const stats = [
    { icon: BookOpen, label: 'My Recipes', value: '12', color: '#667eea' },
    { icon: Heart, label: 'Favorites', value: '34', color: '#e74c3c' },
    { icon: TrendingUp, label: 'Views', value: '1.2K', color: '#2ecc71' },
    { icon: Users, label: 'Followers', value: '89', color: '#f39c12' }
  ];

  const recentRecipes = [
    { id: 1, title: 'Spicy Pasta Arrabbiata', views: '234', time: '2 hours ago', status: 'published' },
    { id: 2, title: 'Chocolate Lava Cake', views: '456', time: '1 day ago', status: 'published' },
    { id: 3, title: 'Thai Green Curry', views: '123', time: '3 days ago', status: 'draft' }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.welcomeSection}>
        <h1 className={`${styles.welcomeTitle} ${styles.shimmer}`}>
          Welcome back, {userInfo?.name?.split(' ') || 'Chef'}!
        </h1>
        <p className={styles.welcomeSubtitle}>
          Ready to create something delicious today?
        </p>
        <button 
          className={styles.createButton}
          onClick={() => setCurrentView('createRecipe')}
        >
          <Plus size={20} />
          Create New Recipe
        </button>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div 
              className={styles.statIcon}
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              <stat.icon size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.recentRecipes}>
          <div className={styles.sectionHeader}>
            <h2>Recent Recipes</h2>
            <button 
              className={styles.viewAllButton}
              onClick={() => setCurrentView('explore')}
            >
              View All
            </button>
          </div>
          <div className={styles.recipesList}>
            {recentRecipes.map(recipe => (
              <div key={recipe.id} className={styles.recipeItem}>
                <div className={styles.recipeInfo}>
                  <h4>{recipe.title}</h4>
                  <div className={styles.recipeMeta}>
                    <span className={styles.views}>{recipe.views} views</span>
                    <span className={styles.time}>{recipe.time}</span>
                  </div>
                </div>
                <div className={styles.recipeActions}>
                  <span className={`${styles.status} ${styles[recipe.status]}`}>
                    {recipe.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionsList}>
            <button 
              className={styles.actionButton}
              onClick={() => setCurrentView('explore')}
            >
              <BookOpen size={18} />
              Browse Recipes
            </button>
            <button 
              className={styles.actionButton}
              onClick={() => setCurrentView('search')}
            >
              <TrendingUp size={18} />
              Trending Now
            </button>
            <button 
              className={styles.actionButton}
              onClick={() => setCurrentView('profile')}
            >
              <Users size={18} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className={styles.activityFeed}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📝</div>
            <div className={styles.activityContent}>
              <p>You created "Spicy Pasta Arrabbiata"</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>❤️</div>
            <div className={styles.activityContent}>
              <p>Sarah liked your "Chocolate Lava Cake"</p>
              <span>5 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>👀</div>
            <div className={styles.activityContent}>
              <p>Your "Thai Green Curry" reached 100 views</p>
              <span>1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
