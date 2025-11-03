import React from 'react'
import { House, Users } from 'phosphor-react'
import styles from './CategoryTabs.module.css'

function CategoryTabs({ activeCategory, onCategoryChange, propertiesCount = 5, agentsCount = 3 }) {
  const categories = [
    { 
      id: 'propiedades', 
      label: 'Propiedades',
      icon: House,
      count: propertiesCount
    },
    { 
      id: 'agentes', 
      label: 'Agentes',
      icon: Users,
      count: agentsCount
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {categories.map((category) => {
          const IconComponent = category.icon
          const isActive = activeCategory === category.id

          return (
            <button
              key={category.id}
              className={`${styles.tab} ${isActive ? styles.activo : ''}`}
              onClick={() => onCategoryChange(category.id)}
              type="button"
            >
              {IconComponent && (
                <IconComponent
                  size={20}
                  weight={isActive ? "fill" : "regular"}
                  className={styles.tabIcon}
                />
              )}
              <span className={styles.tabLabel}>{category.label}</span>
              {category.count !== undefined && (
                <span className={`${styles.badge} ${isActive ? styles.badgeActive : ''}`}>
                  {category.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryTabs