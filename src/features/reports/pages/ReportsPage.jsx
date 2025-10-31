import React from 'react'
import styles from './ReportsPage.module.css'
import ReportsTable from '../components/ReportsTable'
import CategoryTabs from '../components/CategoryTabs'
import SearchBar from '../components/SearchBar'
import { reportsPropertiesData, reportsAgentsData } from '../../../mock/reports'

function ReportsPage() {
  const [activeCategory, setActiveCategory] = React.useState('propiedades')
  const [searchQuery, setSearchQuery] = React.useState('')
  const propertiesCount = reportsPropertiesData.length
  const agentsCount = reportsAgentsData.length

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setSearchQuery('') 
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleRowClick = (item) => {
    console.log('Clicked item:', item)
  }

  return (
    <div className={styles.reportsContainer}>
      <div className={styles.reportsHeader}>
        <h1 className={styles.reportsTitle}>Reportes</h1>
        <p className={styles.reportsSubtitle}>
          Encuentre las estadísticas de su negocio para facilitar sus próximas decisiones
        </p>
      </div>

      <div className={styles.reportsContent}>
        <div className={styles.categoriesSection}>
          <h2 className={styles.sectionTitle}>CATEGORÍAS</h2>
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            propertiesCount={propertiesCount}
            agentsCount={agentsCount}
          />
        </div>

        <div className={styles.tableSection}>
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            category={activeCategory}
          />
          <ReportsTable 
            category={activeCategory}
            searchQuery={searchQuery}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  )
}

export default ReportsPage