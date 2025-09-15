import React, { useState } from 'react';
import { Search, Filter, Heart, Star, Clock, User } from 'lucide-react';
import styles from './Explore.module.css';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const recipes = [
    { id: 1, title: 'Spicy Pasta Arrabbiata', chef: 'Chef Maria', rating: 4.8, time: '25 min', image: '🍝' },
    { id: 2, title: 'Chocolate Lava Cake', chef: 'Chef David', rating: 4.9, time: '35 min', image: '🍰' },
    { id: 3, title: 'Thai Green Curry', chef: 'Chef Lin', rating: 4.7, time: '40 min', image: '🍛' },
    { id: 4, title: 'Mediterranean Salad', chef: 'Chef Sofia', rating: 4.6, time: '15 min', image: '🥗' },
    { id: 5, title: 'BBQ Pulled Pork', chef: 'Chef Mike', rating: 4.8, time: '3 hours', image: '🍖' },
    { id: 6, title: 'Fresh Sushi Rolls', chef: 'Chef Yuki', rating: 4.9, time: '45 min', image: '🍣' }
  ];

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.searchSection}>
        <h1 className={`${styles.pageTitle} ${styles.shimmer}`}>
          Explore Recipes
        </h1>
        <p className={styles.pageSubtitle}>
          Browse through our collection of amazing recipes
        </p>
        
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search recipes, ingredients, or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.filterButton}>
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
        
        <div className={styles.categoryTags}>
          <button className={styles.categoryTag}>All</button>
          <button className={styles.categoryTag}>Breakfast</button>
          <button className={styles.categoryTag}>Lunch</button>
          <button className={styles.categoryTag}>Dinner</button>
          <button className={styles.categoryTag}>Desserts</button>
          <button className={styles.categoryTag}>Quick & Easy</button>
        </div>
      </div>

      <div className={styles.recipesGrid}>
        {recipes.map(recipe => (
          <div key={recipe.id} className={styles.recipeCard}>
            <div className={styles.recipeImage}>
              <div className={styles.recipeImagePlaceholder}>
                {recipe.image}
              </div>
              <button className={styles.favoriteButton}>
                <Heart size={18} />
              </button>
            </div>
            <div className={styles.recipeInfo}>
              <h3 className={styles.recipeTitle}>{recipe.title}</h3>
              <div className={styles.recipeStats}>
                <div className={styles.statItem}>
                  <Star size={16} />
                  <span>{recipe.rating}</span>
                </div>
                <div className={styles.statItem}>
                  <User size={16} />
                  <span>{recipe.chef}</span>
                </div>
                <div className={styles.statItem}>
                  <Clock size={16} />
                  <span>{recipe.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
