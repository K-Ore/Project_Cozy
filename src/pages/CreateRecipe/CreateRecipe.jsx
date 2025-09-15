import React, { useState } from 'react';
import { ArrowLeft, Camera, Plus, X, Clock, Users } from 'lucide-react';
import styles from './CreateRecipe.module.css';

const CreateRecipe = ({ setCurrentView }) => {
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'easy',
    category: 'main-course'
  });

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recipe Data:', { ...formData, ingredients, steps });
    setCurrentView('dashboard');
  };

  return (
    <div className={styles.createRecipeContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => setCurrentView('dashboard')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className={`${styles.title} ${styles.shimmer}`}>
          Create New Recipe
        </h1>
      </div>

      <form className={styles.recipeForm} onSubmit={handleSubmit}>
        <div className={styles.imageUpload}>
          <div className={styles.uploadArea}>
            <Camera size={32} />
            <p>Add Recipe Photo</p>
            <span>Click to upload an image (JPG, PNG)</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Recipe Title *</label>
          <input 
            type="text" 
            placeholder="Enter a delicious recipe title..."
            className={styles.input}
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea 
            placeholder="Describe your recipe, its origin, or what makes it special..."
            className={styles.textarea}
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Clock size={16} />
              Prep Time
            </label>
            <input 
              type="text" 
              placeholder="15 mins"
              className={styles.input}
              value={formData.prepTime}
              onChange={(e) => handleInputChange('prepTime', e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Clock size={16} />
              Cook Time
            </label>
            <input 
              type="text" 
              placeholder="30 mins"
              className={styles.input}
              value={formData.cookTime}
              onChange={(e) => handleInputChange('cookTime', e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Users size={16} />
              Servings
            </label>
            <input 
              type="number" 
              placeholder="4"
              className={styles.input}
              value={formData.servings}
              onChange={(e) => handleInputChange('servings', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Difficulty Level</label>
            <select 
              className={styles.select}
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select 
              className={styles.select}
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="appetizer">Appetizer</option>
              <option value="main-course">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.sectionHeader}>
            <label className={styles.label}>Ingredients *</label>
            <button 
              type="button"
              onClick={addIngredient}
              className={styles.addButton}
            >
              <Plus size={16} />
              Add Ingredient
            </button>
          </div>
          <div className={styles.listContainer}>
            {ingredients.map((ingredient, index) => (
              <div key={index} className={styles.listItem}>
                <input 
                  type="text"
                  placeholder="e.g., 1 cup flour"
                  className={styles.input}
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                />
                {ingredients.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className={styles.removeButton}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.sectionHeader}>
            <label className={styles.label}>Instructions *</label>
            <button 
              type="button"
              onClick={addStep}
              className={styles.addButton}
            >
              <Plus size={16} />
              Add Step
            </button>
          </div>
          <div className={styles.listContainer}>
            {steps.map((step, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.stepNumber}>{index + 1}</div>
                <textarea 
                  placeholder="Describe this step in detail..."
                  className={styles.textarea}
                  rows={2}
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                />
                {steps.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removeStep(index)}
                    className={styles.removeButton}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button"
            className={styles.cancelButton}
            onClick={() => setCurrentView('dashboard')}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className={styles.submitButton}
          >
            Publish Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
