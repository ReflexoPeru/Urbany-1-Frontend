import React from 'react';
import styles from './FilterGroup.module.css';

const FilterGroup = ({ 
  title, 
  options, 
  selectedValues, 
  onSelectionChange, 
  multiple = false 
}) => {
  const handleOptionClick = (option) => {
    if (multiple) {
      const newSelection = selectedValues.includes(option)
        ? selectedValues.filter(val => val !== option)
        : [...selectedValues, option];
      onSelectionChange(newSelection);
    } else {
      onSelectionChange(selectedValues.includes(option) ? [] : [option]);
    }
  };

  return (
    <div className={styles.filterGroup}>
      <span className={styles.label}>{title}:</span>
      <div className={styles.options}>
        {options.map((option) => (
          <button
            key={option}
            className={`${styles.filterButton} ${
              selectedValues.includes(option) ? styles.active : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
