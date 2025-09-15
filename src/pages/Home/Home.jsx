import React, { useState, useEffect, useCallback } from 'react';
import { Star, Clock, User, Heart, ChefHat, TrendingUp, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Home.module.css';

const Home = ({ setCurrentView }) => {
  const [recipes, setRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const { theme } = useTheme();

  const generateRecipes = useCallback(() => {
    const recipeNames = [
      'Spicy Thai Basil Stir Fry', 'Creamy Mushroom Risotto', 'BBQ Glazed Salmon',
      'Mediterranean Quinoa Salad', 'Chocolate Lava Cake', 'Classic Caesar Salad',
      'Beef Bourguignon', 'Vegetarian Tacos', 'Lemon Herb Chicken', 'Pasta Carbonara',
      'Indian Butter Chicken', 'Fresh Caprese Salad', 'Korean Bibimbap', 'Chicken Tikka Masala'
    ];

    const chefNames = [
      'Chef Maria', 'Chef David', 'Chef Lin', 'Chef Sofia', 'Chef Mike', 'Chef Yuki',
      'Chef Antonio', 'Chef Priya', 'Chef Carlos', 'Chef Emma', 'Chef Hassan', 'Chef Anna'
    ];

    const categories = ['trending', 'popular', 'new', 'featured'];
    const cuisineTypes = ['🍝 Italian', '🍛 Asian', '🥗 Healthy', '🍖 Comfort', '🍰 Dessert', '🍣 Fusion'];
    const cookTimes = ['15 mins', '20 mins', '25 mins', '30 mins', '35 mins', '45 mins'];
    const difficulties = ['Easy', 'Medium', 'Hard'];

    return Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      title: recipeNames[Math.floor(Math.random() * recipeNames.length)],
      chef: chefNames[Math.floor(Math.random() * chefNames.length)],
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      time: cookTimes[Math.floor(Math.random() * cookTimes.length)],
      cuisine: cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)],
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      likes: Math.floor(Math.random() * 500) + 50,
      views: Math.floor(Math.random() * 2000) + 100,
      description: 'A delicious and flavorful recipe perfect for any occasion',
      isLiked: false
    }));
  }, []);

  useEffect(() => {
    setRecipes(generateRecipes());
  }, [generateRecipes]);

  const handleRecipeClick = (recipe) => {
    console.log('Recipe clicked:', recipe);
    setCurrentView('explore');
  };

  const handleLikeRecipe = (recipeId, e) => {
    e.stopPropagation();
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likes: recipe.likes + (recipe.isLiked ? -1 : 1), isLiked: !recipe.isLiked }
          : recipe
      )
    );
  };

  const filteredRecipes = recipes.filter(recipe => 
    activeFilter === 'all' || recipe.category === activeFilter
  );

  const getCategoryIcon = (category) => {
    const icons = {
      trending: <TrendingUp size={16} />,
      popular: <Star size={16} />,
      new: '✨',
      featured: <Award size={16} />
    };
    return icons[category] || <Star size={16} />;
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <h1 className={`${styles.heroTitle} ${styles.shimmer}`}>
          Welcome to MonsoonRecipes
        </h1>
        <p className={styles.heroSubtitle}>
          Discover amazing culinary experiences from around the world
        </p>
        <div className={styles.heroActions}>
          <button 
            className={styles.primaryButton}
            onClick={() => setCurrentView('explore')}
          >
            Start Exploring
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => setCurrentView('search')}
          >
            Search Recipes
          </button>
        </div>
      </div>

      <div className={styles.recipesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <ChefHat size={24} />
            Featured Recipes
          </h2>
          <p className={styles.sectionSubtitle}>
            Handpicked recipes from our community
          </p>
        </div>

        <div className={styles.filterTabs}>
          {['all', 'trending', 'popular', 'new', 'featured'].map(filter => (
            <button
              key={filter}
              className={`${styles.filterTab} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? '🍽️' : getCategoryIcon(filter)}
              <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
            </button>
          ))}
        </div>

        <div className={styles.recipeGrid}>
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              className={styles.recipeCard}
              onClick={() => handleRecipeClick(recipe)}
            >
              <div className={styles.recipeImageContainer}>
                <div className={styles.recipeImage}>
                  <span className={styles.cuisineEmoji}>
                    {recipe.cuisine.split(' ')[0]}
                  </span>
                </div>
                
                <div className={styles.categoryBadge}>
                  {getCategoryIcon(recipe.category)}
                  <span>{recipe.category}</span>
                </div>

                <button 
                  className={`${styles.likeButton} ${recipe.isLiked ? styles.liked : ''}`}
                  onClick={(e) => handleLikeRecipe(recipe.id, e)}
                >
                  <Heart size={16} />
                </button>
              </div>
              
              <div className={styles.recipeInfo}>
                <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                
                <div className={styles.recipeMetrics}>
                  <div className={styles.metric}>
                    <Star size={14} />
                    <span>{recipe.rating}</span>
                  </div>
                  <div className={styles.metric}>
                    <Clock size={14} />
                    <span>{recipe.time}</span>
                  </div>
                  <div className={styles.difficultyBadge}>
                    {recipe.difficulty}
                  </div>
                </div>
                
                <div className={styles.chefInfo}>
                  <User size={14} />
                  <span>by {recipe.chef}</span>
                </div>
                
                <div className={styles.recipeStats}>
                  <span className={styles.views}>{recipe.views} views</span>
                  <span className={styles.likes}>
                    <Heart size={12} />
                    {recipe.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🍳</div>
          <h3 className={styles.featureTitle}>Discover Recipes</h3>
          <p className={styles.featureDescription}>
            Browse through thousands of delicious recipes from home cooks worldwide
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📸</div>
          <h3 className={styles.featureTitle}>Share Your Creations</h3>
          <p className={styles.featureDescription}>
            Upload your favorite recipes and share them with our community
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>❤️</div>
          <h3 className={styles.featureTitle}>Save Favorites</h3>
          <p className={styles.featureDescription}>
            Keep track of recipes you love and organize them into collections
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
