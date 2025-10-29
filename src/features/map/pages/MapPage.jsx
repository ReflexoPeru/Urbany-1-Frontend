import React from 'react'
import TopBar from '../components/TopBar'
import PropertyList from '../components/PropertyList'
import { propertiesMock, searchProperties } from '../../../mock/properties_prueba'
import styles from './MapPage.module.css'

function MapPage() {
  const [filteredProperties, setFilteredProperties] = React.useState(propertiesMock)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filters, setFilters] = React.useState({
    operation: '',
    propertyType: '',
    priceRange: '',
    location: '',
    rooms: '',
    bedrooms: '',
    realEstate: '',
    commission: '',
    includeMyProperties: false
  })

  const applyFilters = (properties, currentFilters, query = '') => {
    let result = properties

    if (query.trim() !== '') {
      result = searchProperties(query)
    }

    if (currentFilters.selectedOperations && currentFilters.selectedOperations.length > 0) {
      result = result.filter(prop => currentFilters.selectedOperations.includes(prop.operation))
    }
    
    if (currentFilters.propertyType && currentFilters.propertyTypeArray && currentFilters.propertyTypeArray.length > 0) {
      result = result.filter(prop => currentFilters.propertyTypeArray.includes(prop.type))
    }

    if (currentFilters.roomsArray && currentFilters.roomsArray.length > 0) {
      result = result.filter(prop => {
        return currentFilters.roomsArray.includes(prop.rooms) || 
               (currentFilters.roomsArray.includes(5) && prop.rooms >= 5)
      })
    }

    if (currentFilters.bedroomsArray && currentFilters.bedroomsArray.length > 0) {
      result = result.filter(prop => {
        return currentFilters.bedroomsArray.includes(prop.bedrooms) || 
               (currentFilters.bedroomsArray.includes(5) && prop.bedrooms >= 5)
      })
    }

    if (currentFilters.locationText && currentFilters.locationText.trim() !== '') {
      result = result.filter(prop => 
        prop.address.toLowerCase().includes(currentFilters.locationText.toLowerCase())
      )
    }

    if (currentFilters.realEstateText && currentFilters.realEstateText.trim() !== '') {
      result = result.filter(prop => {
        const searchText = currentFilters.realEstateText.toLowerCase()
        return prop.title.toLowerCase().includes(searchText) || 
               prop.description.toLowerCase().includes(searchText)
      })
    }

    if (currentFilters.commissionsArray && currentFilters.commissionsArray.length > 0) {
      result = result.filter(prop => {
        const commissionValues = currentFilters.commissionsArray.map(c => parseInt(c))
        return commissionValues.includes(prop.commission)
      })
    }

    // Filtro de precio
    if (currentFilters.priceRangeData && currentFilters.priceRangeData.currency === 'USD') {
      const minPrice = currentFilters.priceRangeData.min ? parseFloat(currentFilters.priceRangeData.min) : null
      const maxPrice = currentFilters.priceRangeData.max ? parseFloat(currentFilters.priceRangeData.max) : null
      
      result = result.filter(prop => {
        if (prop.currency !== 'USD') return false
        
        const propPrice = prop.priceValue
        
        if (minPrice && maxPrice) {
          return propPrice >= minPrice && propPrice <= maxPrice
        } else if (minPrice) {
          return propPrice >= minPrice
        } else if (maxPrice) {
          return propPrice <= maxPrice
        }
        
        return true
      })
    }

    // Filtro para incluir solo mis propiedades
    if (currentFilters.includeMyProperties) {
      result = result.filter(prop => prop.isMyProperty === true)
    }

    // Filtros del sidebar
    if (currentFilters.sidebarFiltersData) {
      const sidebarFilters = currentFilters.sidebarFiltersData

      // Filtro por baños
      if (sidebarFilters.bathrooms && sidebarFilters.bathrooms.length > 0) {
        result = result.filter(prop => {
          return sidebarFilters.bathrooms.some(bathroomFilter => {
            if (bathroomFilter === '5+') {
              return prop.bathrooms >= 5
            }
            return prop.bathrooms === parseInt(bathroomFilter)
          })
        })
      }

      // Filtro por garages
      if (sidebarFilters.garages && sidebarFilters.garages.length > 0) {
        result = result.filter(prop => {
          return sidebarFilters.garages.some(garageFilter => {
            if (garageFilter === '5+') {
              return prop.garages >= 5
            }
            return prop.garages === parseInt(garageFilter)
          })
        })
      }

      // Filtro por antigüedad
      if (sidebarFilters.age && sidebarFilters.age.length > 0) {
        result = result.filter(prop => sidebarFilters.age.includes(prop.age))
      }

      // Filtro por superficie
      if (sidebarFilters.minSurface || sidebarFilters.maxSurface) {
        result = result.filter(prop => {
          const minSurf = sidebarFilters.minSurface ? parseFloat(sidebarFilters.minSurface) : 0
          const maxSurf = sidebarFilters.maxSurface ? parseFloat(sidebarFilters.maxSurface) : Infinity
          return prop.surface >= minSurf && prop.surface <= maxSurf
        })
      }

      // Filtro por acepta permuta
      if (sidebarFilters.acceptsExchange) {
        result = result.filter(prop => prop.acceptsExchange === true)
      }

      // Filtro por amoblado
      if (sidebarFilters.furnished) {
        result = result.filter(prop => prop.furnished === true)
      }

      // Filtro por disposición
      if (sidebarFilters.disposition && sidebarFilters.disposition.trim() !== '') {
        result = result.filter(prop => 
          prop.disposition.toLowerCase().includes(sidebarFilters.disposition.toLowerCase())
        )
      }

      // Filtro por orientación
      if (sidebarFilters.orientation && sidebarFilters.orientation.trim() !== '') {
        result = result.filter(prop => 
          prop.orientation.toLowerCase().includes(sidebarFilters.orientation.toLowerCase())
        )
      }

      // Filtro por propiedades exclusivas
      if (sidebarFilters.exclusiveProperties === 'sí') {
        result = result.filter(prop => prop.exclusive === true)
      }

      // Filtro por servicios
      if (sidebarFilters.services) {
        result = result.filter(prop => prop.services === true)
      }

      // Filtro por ambientes
      if (sidebarFilters.environments) {
        result = result.filter(prop => prop.environments === true)
      }

      // Filtro por calidad
      if (sidebarFilters.propertyQuality && sidebarFilters.propertyQuality !== '') {
        result = result.filter(prop => prop.quality === sidebarFilters.propertyQuality)
      }
    }

    return result
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    const results = applyFilters(propertiesMock, filters, value)
    setFilteredProperties(results)
  }

  const handleSearchSubmit = (query) => {
    const results = applyFilters(propertiesMock, filters, query)
    setFilteredProperties(results)
  }

  const handleFilterChange = (filterType, value, selectedItems = null) => {
    const newFilters = { ...filters, [filterType]: value }
    
    if (selectedItems && filterType === 'operation') {
      newFilters.selectedOperations = selectedItems
    }
    
    if (selectedItems && filterType === 'propertyType') {
      newFilters.propertyTypeArray = selectedItems
    }
    
    if (selectedItems && filterType === 'rooms') {
      newFilters.roomsArray = selectedItems
    }
    
    if (selectedItems && filterType === 'bedrooms') {
      newFilters.bedroomsArray = selectedItems
    }
    
    if (filterType === 'location') {
      newFilters.locationText = selectedItems || ''
    }
    
    if (filterType === 'realEstate') {
      newFilters.realEstateText = selectedItems || ''
    }
    
    if (filterType === 'commission') {
      newFilters.commissionsArray = selectedItems || []
    }
    
    if (filterType === 'includeMyProperties') {
      newFilters.includeMyProperties = value
    }
    
    if (filterType === 'priceRange') {
      newFilters.priceRangeData = selectedItems || null
    }
    
    if (filterType === 'sidebarFilters') {
      newFilters.sidebarFiltersData = selectedItems || null
    }
    
    if (filterType === 'clearAll') {
      // Limpiar todos los filtros
      const clearedFilters = {
        operation: '',
        propertyType: '',
        priceRange: '',
        location: '',
        rooms: '',
        bedrooms: '',
        realEstate: '',
        commission: '',
        includeMyProperties: false,
        sidebarFiltersData: null
      }
      setFilters(clearedFilters)
      setSearchQuery('')
      setFilteredProperties(propertiesMock)
      return
    }
    
    setFilters(newFilters)
    const results = applyFilters(propertiesMock, newFilters, searchQuery)
    setFilteredProperties(results)
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapHeader}>
        <h1 className={styles.mapTitle}>Mapa</h1>
      </div>
      <TopBar 
        onSearchChange={handleSearchChange} 
        onSearchSubmit={handleSearchSubmit}
        onFilterChange={handleFilterChange}
        filters={filters}
      />
      <main className={styles.mapContent}>
        <PropertyList items={filteredProperties} searchQuery={searchQuery} />
      </main>
    </div>
  )
}

export default MapPage
