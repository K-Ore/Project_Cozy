import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, Clock, User, Heart, ChefHat } from 'lucide-react';
import styles from './Home.module.css';

const Home = ({ setCurrentView }) => {
  const [recipes, setRecipes] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollSpeedRef = useRef(0.5);
  const isPausedRef = useRef(false);

  const generateRecipes = useCallback(() => {
    const recipeNames = [
      'Spicy Thai Basil Stir Fry', 'Creamy Mushroom Risotto', 'BBQ Glazed Salmon',
      'Mediterranean Quinoa Salad', 'Chocolate Lava Cake', 'Classic Caesar Salad',
      'Beef Bourguignon', 'Vegetarian Tacos', 'Lemon Herb Chicken', 'Pasta Carbonara',
      'Indian Butter Chicken', 'Fresh Caprese Salad', 'Korean Bibimbap', 'Chicken Tikka Masala',
      'Greek Moussaka', 'Japanese Ramen', 'Italian Margherita Pizza', 'French Onion Soup',
      'Mexican Enchiladas', 'Chinese Kung Pao Chicken', 'Thai Green Curry', 'Spanish Paella',
      'Moroccan Tagine', 'Vietnamese Pho', 'Turkish Kebabs', 'Lebanese Hummus Bowl'
    ];

    const chefNames = [
      'Chef Maria', 'Chef David', 'Chef Lin', 'Chef Sofia', 'Chef Mike', 'Chef Yuki',
      'Chef Antonio', 'Chef Priya', 'Chef Carlos', 'Chef Emma', 'Chef Hassan', 'Chef Anna'
    ];

    const cookTimes = ['15 mins', '20 mins', '25 mins', '30 mins', '35 mins', '45 mins'];
    const categories = ['🍝', '🍰', '🍛', '🥗', '🍖', '🍣', '🍕', '🍜', '🌮', '🍲'];
    const descriptions = [
      'A delicious and aromatic dish', 'Perfect for family dinners', 'Quick and easy to make',
      'Traditional recipe with modern twist', 'Healthy and nutritious meal', 'Restaurant-style cooking at home'
    ];

    return Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      title: recipeNames[Math.floor(Math.random() * recipeNames.length)],
      chef: chefNames[Math.floor(Math.random() * chefNames.length)],
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      time: cookTimes[Math.floor(Math.random() * cookTimes.length)],
      image: categories[Math.floor(Math.random() * categories.length)],
      likes: Math.floor(Math.random() * 500) + 50,
      views: Math.floor(Math.random() * 2000) + 100,
      description: descriptions[Math.floor(Math.random() * descriptions.length)]
    }));
  }, []);

  useEffect(() => {
    const initialRecipes = generateRecipes();
    const extendedRecipes = [
      ...initialRecipes,
      ...initialRecipes.map(recipe => ({ ...recipe, id: recipe.id + 100 })),
      ...initialRecipes.map(recipe => ({ ...recipe, id: recipe.id + 200 })),
      ...initialRecipes.map(recipe => ({ ...recipe, id: recipe.id + 300 }))
    ];
    setRecipes(extendedRecipes);
  }, [generateRecipes]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || recipes.length === 0) return;

    const cardWidth = 320;
    const totalOriginalWidth = cardWidth * (recipes.length / 4);
    
    const animate = () => {
      if (!isPausedRef.current && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeedRef.current;
        
        if (scrollContainer.scrollLeft >= totalOriginalWidth * 2) {
          scrollContainer.scrollLeft = totalOriginalWidth;
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    scrollContainer.scrollLeft = totalOriginalWidth;
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [recipes]);

  const handleMouseEnter = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
    setHoveredCard(null);
  }, []);

  const handleCardHover = useCallback((cardId, isHovering) => {
    setHoveredCard(isHovering ? cardId : null);
    scrollSpeedRef.current = isHovering ? 0.1 : 0.5;
  }, []);

  const handleRecipeClick = (recipe) => {
    console.log('Recipe clicked:', recipe);
    setCurrentView('explore');
  };

  const handleLikeRecipe = (recipeId, e) => {
    e.stopPropagation();
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likes: recipe.likes + 1, isLiked: !recipe.isLiked }
          : recipe
      )
    );
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <h1 className={`${styles.heroTitle} ${styles.shimmer}`}>
          Welcome to MonsoonRecipes
        </h1>
        <p className={styles.heroSubtitle}>
          Discover cinematic culinary experiences from around the world
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
            Like old film reels, our recipes flow endlessly
          </p>
        </div>

        <div className={styles.filmCarouselContainer}>
          <div 
            ref={scrollContainerRef}
            className={styles.filmStrip}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.filmFrames}>
              {recipes.map((recipe, index) => (
                <div 
                  key={`${recipe.id}-${index}`}
                  className={`${styles.filmFrame} ${
                    hoveredCard === `${recipe.id}-${index}` ? styles.expanded : ''
                  } ${
                    hoveredCard && hoveredCard !== `${recipe.id}-${index}` ? styles.shrunk : ''
                  }`}
                  onClick={() => handleRecipeClick(recipe)}
                  onMouseEnter={() => handleCardHover(`${recipe.id}-${index}`, true)}
                  onMouseLeave={() => handleCardHover(`${recipe.id}-${index}`, false)}
                >
                  <div className={styles.frameNumber}>{String(index + 1).padStart(3, '0')}</div>
                  
                  <div className={styles.recipeImage}>
                    <div className={styles.recipeImagePlaceholder}>
                      {recipe.image}
                    </div>
                    <button 
                      className={`${styles.likeButton} ${recipe.isLiked ? styles.liked : ''}`}
                      onClick={(e) => handleLikeRecipe(recipe.id, e)}
                    >
                      <Heart size={14} />
                    </button>
                    <div className={styles.filmOverlay}></div>
                  </div>
                  
                  <div className={styles.recipeContent}>
                    <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                    
                    <div className={styles.recipeStats}>
                      <div className={styles.statItem}>
                        <Star size={12} />
                        <span>{recipe.rating}</span>
                      </div>
                      <div className={styles.statItem}>
                        <Clock size={12} />
                        <span>{recipe.time}</span>
                      </div>
                    </div>
                    
                    <div className={styles.chefInfo}>
                      <User size={12} />
                      <span>{recipe.chef}</span>
                    </div>

                    <div className={styles.expandedContent}>
                      <p className={styles.recipeDescription}>{recipe.description}</p>
                      <div className={styles.recipeFooter}>
                        <span className={styles.views}>{recipe.views} views</span>
                        <span className={styles.likes}>
                          <Heart size={12} />
                          {recipe.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.filmSprockets}>
                    <div className={styles.sprocket}></div>
                    <div className={styles.sprocket}></div>
                    <div className={styles.sprocket}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.filmControls}>
          <div className={styles.filmSpeed}>
            <span>🎬</span>
            <div className={styles.speedIndicator}>
              <div className={styles.speedBar}></div>
            </div>
            <span>Continuous Play</span>
          </div>
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
