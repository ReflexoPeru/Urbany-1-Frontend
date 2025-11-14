import React from 'react'
import styles from './SearchBar.module.css'

function SearchBar({ searchQuery, onSearchChange, category }) {
  const getPlaceholder = () => {
    switch (category) {
      case 'agentes':
        return 'Nombre del agente'
      case 'propiedades':
      default:
        return 'Dirección de la propiedad'
    }
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchField}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={getPlaceholder()}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar