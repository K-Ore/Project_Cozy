import React, { useState, useCallback, useMemo } from 'react';
import { Search, Filter, Heart, Star, Clock, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Explore.module.css';

const Explore = ({ setCurrentView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState(new Set());
  const { theme } = useTheme();

  const recipes = [
    { id: 1, title: 'Spicy Pasta Arrabbiata', chef: 'Chef Maria', rating: 4.8, time: '25 min', image: '🍝', category: 'Dinner' },
    { id: 2, title: 'Chocolate Lava Cake', chef: 'Chef David', rating: 4.9, time: '35 min', image: '🍰', category: 'Desserts' },
    { id: 3, title: 'Thai Green Curry', chef: 'Chef Lin', rating: 4.7, time: '40 min', image: '🍛', category: 'Dinner' },
    { id: 4, title: 'Mediterranean Salad', chef: 'Chef Sofia', rating: 4.6, time: '15 min', image: '🥗', category: 'Lunch' },
    { id: 5, title: 'BBQ Pulled Pork', chef: 'Chef Mike', rating: 4.8, time: '3 hours', image: '🍖', category: 'Dinner' },
    { id: 6, title: 'Fresh Sushi Rolls', chef: 'Chef Yuki', rating: 4.9, time: '45 min', image: '🍣', category: 'Lunch' },
    { id: 7, title: 'Pancakes Stack', chef: 'Chef Emma', rating: 4.5, time: '20 min', image: '🥞', category: 'Breakfast' },
    { id: 8, title: 'Quick Avocado Toast', chef: 'Chef Alex', rating: 4.3, time: '10 min', image: '🥑', category: 'Quick & Easy' },
    { id: 9, title: 'Berry Smoothie Bowl', chef: 'Chef Luna', rating: 4.7, time: '15 min', image: '🍓', category: 'Breakfast' }
  ];

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Quick & Easy'];

  // Memoized filtered recipes
  const filteredRecipes = useMemo(() => {
    console.log('Filtering recipes...', { searchTerm, activeCategory });
    
    return recipes.filter(recipe => {
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.chef.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory;
      
      console.log(`Recipe: ${recipe.title}, matches search: ${matchesSearch}, matches category: ${matchesCategory}`);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleCategoryChange = useCallback((category) => {
    console.log('Category changed to:', category);
    setActiveCategory(category);
  }, []);

  const handleSearchChange = useCallback((value) => {
    console.log('Search term changed to:', value);
    setSearchTerm(value);
  }, []);

  const handleRecipeClick = useCallback((recipe) => {
    console.log('Recipe clicked:', recipe);
    setCurrentView?.('explore');
  }, [setCurrentView]);

  const toggleFavorite = useCallback((recipeId, e) => {
    e.stopPropagation();
    console.log('Favorite toggled for recipe:', recipeId);
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  }, []);

  const handleFilterClick = useCallback(() => {
    console.log('Filter clicked - implement filter modal');
  }, []);

  const clearFilters = useCallback(() => {
    console.log('Clearing all filters');
    setSearchTerm('');
    setActiveCategory('All');
  }, []);

  console.log('Current state:', { searchTerm, activeCategory, filteredCount: filteredRecipes.length });

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
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.filterButton} onClick={handleFilterClick}>
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
        
        <div className={styles.categoryTags}>
          {categories.map(category => (
            <button 
              key={category}
              className={`${styles.categoryTag} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.resultsInfo}>
        <p className={styles.resultsText}>
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          {searchTerm && <span> for "{searchTerm}"</span>}
          {activeCategory !== 'All' && <span> in {activeCategory}</span>}
        </p>
      </div>

      <div className={styles.recipesGrid}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className={styles.recipeCard}
              onClick={() => handleRecipeClick(recipe)}
            >
              <div className={styles.recipeImage}>
                <div className={styles.recipeImagePlaceholder}>
                  {recipe.image}
                </div>
                <button 
                  className={`${styles.favoriteButton} ${favorites.has(recipe.id) ? styles.favorited : ''}`}
                  onClick={(e) => toggleFavorite(recipe.id, e)}
                >
                  <Heart size={18} />
                </button>
                <div className={styles.categoryBadge}>
                  {recipe.category}
                </div>
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
          ))
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3 className={styles.noResultsTitle}>No recipes found</h3>
            <p className={styles.noResultsText}>
              Try adjusting your search terms or category filter
            </p>
            <button 
              className={styles.clearFiltersButton}
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
