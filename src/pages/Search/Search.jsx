import React, { useState } from 'react';
import { Search as SearchIcon, X, Clock, TrendingUp } from 'lucide-react';
import styles from './Search.module.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const recentSearches = [
    'Pasta recipes',
    'Chocolate cake',
    'Healthy salads',
    'Quick breakfast'
  ];
  
  const trendingSearches = [
    'Air fryer recipes',
    'Keto dinner',
    'Vegan desserts',
    'One pot meals',
    'Gluten free bread'
  ];

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <h1 className={`${styles.pageTitle} ${styles.shimmer}`}>
          Search Recipes
        </h1>
        <p className={styles.pageSubtitle}>
          Find exactly what you're craving
        </p>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchInputWrapper}>
          <SearchIcon className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search for recipes, ingredients, or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button onClick={clearSearch} className={styles.clearButton}>
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {!searchQuery && (
        <div className={styles.searchSuggestions}>
          <div className={styles.suggestionsSection}>
            <h3 className={styles.sectionTitle}>
              <Clock size={18} />
              Recent Searches
            </h3>
            <div className={styles.searchTags}>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className={styles.searchTag}
                  onClick={() => handleSearch(search)}
                >
                  <Clock size={14} />
                  {search}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.suggestionsSection}>
            <h3 className={styles.sectionTitle}>
              <TrendingUp size={18} />
              Trending Now
            </h3>
            <div className={styles.searchTags}>
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  className={`${styles.searchTag} ${styles.trendingTag}`}
                  onClick={() => handleSearch(search)}
                >
                  <TrendingUp size={14} />
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {searchQuery && (
        <div className={styles.searchResults}>
          <div className={styles.resultsHeader}>
            <h3>Search Results for "{searchQuery}"</h3>
            {isSearching && <div className={styles.loadingSpinner}></div>}
          </div>
          <div className={styles.resultsContent}>
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <p>Search functionality will be implemented here...</p>
              <p>Try searching for popular items like "pasta", "cake", or "salad"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
