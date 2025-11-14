import React from 'react'
import TopBar from '../components/TopBar'
import PropertyList from '../components/PropertyList'
import { propertiesMock } from '../../../mock/properties_prueba'
import styles from './MapPage.module.css'
import { useConfirmModal } from '../../../contexts/ConfirmModalContext'

function MapPage() {
  const { confirmModal } = useConfirmModal()
  const [properties, setProperties] = React.useState(propertiesMock)
  const [filteredProperties, setFilteredProperties] = React.useState(propertiesMock)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedPropertyIds, setSelectedPropertyIds] = React.useState([])
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

  const applyFilters = React.useCallback((baseProperties, currentFilters, query = '') => {
    let result = [...baseProperties]

    const trimmedQuery = query.trim().toLowerCase()
    if (trimmedQuery !== '') {
      result = result.filter((property) =>
        property.title.toLowerCase().includes(trimmedQuery) ||
        property.address.toLowerCase().includes(trimmedQuery) ||
        property.description.toLowerCase().includes(trimmedQuery)
      )
    }

    if (currentFilters.selectedOperations && currentFilters.selectedOperations.length > 0) {
      result = result.filter((property) => currentFilters.selectedOperations.includes(property.operation))
    }

    if (currentFilters.propertyTypeArray && currentFilters.propertyTypeArray.length > 0) {
      result = result.filter((property) => currentFilters.propertyTypeArray.includes(property.type))
    }

    if (currentFilters.roomsArray && currentFilters.roomsArray.length > 0) {
      result = result.filter((property) =>
        currentFilters.roomsArray.includes(property.rooms) ||
        (currentFilters.roomsArray.includes(5) && property.rooms >= 5)
      )
    }

    if (currentFilters.bedroomsArray && currentFilters.bedroomsArray.length > 0) {
      result = result.filter((property) =>
        currentFilters.bedroomsArray.includes(property.bedrooms) ||
        (currentFilters.bedroomsArray.includes(5) && property.bedrooms >= 5)
      )
    }

    if (currentFilters.locationText && currentFilters.locationText.trim() !== '') {
      const locationQuery = currentFilters.locationText.toLowerCase()
      result = result.filter((property) => property.address.toLowerCase().includes(locationQuery))
    }

    if (currentFilters.realEstateText && currentFilters.realEstateText.trim() !== '') {
      const realEstateQuery = currentFilters.realEstateText.toLowerCase()
      result = result.filter((property) =>
        property.title.toLowerCase().includes(realEstateQuery) ||
        property.description.toLowerCase().includes(realEstateQuery)
      )
    }

    if (currentFilters.commissionsArray && currentFilters.commissionsArray.length > 0) {
      const commissionValues = currentFilters.commissionsArray.map((value) => parseInt(value, 10))
      result = result.filter((property) => commissionValues.includes(property.commission))
    }

    if (currentFilters.priceRangeData && currentFilters.priceRangeData.currency === 'USD') {
      const minPrice = currentFilters.priceRangeData.min ? Number.parseFloat(currentFilters.priceRangeData.min) : null
      const maxPrice = currentFilters.priceRangeData.max ? Number.parseFloat(currentFilters.priceRangeData.max) : null

      result = result.filter((property) => {
        if (property.currency !== 'USD') {
          return false
        }

        const price = property.priceValue

        if (minPrice !== null && maxPrice !== null) {
          return price >= minPrice && price <= maxPrice
        }
        if (minPrice !== null) {
          return price >= minPrice
        }
        if (maxPrice !== null) {
          return price <= maxPrice
        }
        return true
      })
    }

    if (currentFilters.includeMyProperties) {
      result = result.filter((property) => property.isMyProperty)
    }

    if (currentFilters.sidebarFiltersData) {
      const sidebarFilters = currentFilters.sidebarFiltersData

      if (sidebarFilters.bathrooms && sidebarFilters.bathrooms.length > 0) {
        result = result.filter((property) =>
          sidebarFilters.bathrooms.some((filterValue) =>
            filterValue === '5+' ? property.bathrooms >= 5 : property.bathrooms === Number.parseInt(filterValue, 10)
          )
        )
      }

      if (sidebarFilters.garages && sidebarFilters.garages.length > 0) {
        result = result.filter((property) =>
          sidebarFilters.garages.some((filterValue) =>
            filterValue === '5+' ? property.garages >= 5 : property.garages === Number.parseInt(filterValue, 10)
          )
        )
      }

      if (sidebarFilters.age && sidebarFilters.age.length > 0) {
        result = result.filter((property) => sidebarFilters.age.includes(property.age))
      }

      if (sidebarFilters.minSurface || sidebarFilters.maxSurface) {
        const minSurface = sidebarFilters.minSurface ? Number.parseFloat(sidebarFilters.minSurface) : 0
        const maxSurface = sidebarFilters.maxSurface ? Number.parseFloat(sidebarFilters.maxSurface) : Number.POSITIVE_INFINITY

        result = result.filter((property) => {
          let surface = property.surface ?? 0
          if (sidebarFilters.surfaceType === 'cubierta') {
            surface = property.surfaceCovered ?? property.surface ?? 0
          } else if (sidebarFilters.surfaceType === 'descubierta') {
            surface = property.surfaceUncovered ?? 0
          } else if (sidebarFilters.surfaceType === 'total') {
            surface = property.surfaceTotal ?? property.surface ?? 0
          }
          return surface >= minSurface && surface <= maxSurface
        })
      }

      if (
        sidebarFilters.surfaceType === 'descubierta' &&
        !sidebarFilters.minSurface &&
        !sidebarFilters.maxSurface
      ) {
        result = result.filter((property) => (property.surfaceUncovered ?? 0) > 0)
      }

      if (sidebarFilters.acceptsExchange) {
        result = result.filter((property) => property.acceptsExchange)
      }

      if (sidebarFilters.furnished) {
        result = result.filter((property) => property.furnished)
      }

      if (sidebarFilters.disposition && Array.isArray(sidebarFilters.disposition) && sidebarFilters.disposition.length > 0) {
        result = result.filter((property) => sidebarFilters.disposition.includes(property.disposition))
      }

      if (sidebarFilters.orientation && Array.isArray(sidebarFilters.orientation) && sidebarFilters.orientation.length > 0) {
        result = result.filter((property) => sidebarFilters.orientation.includes(property.orientation))
      }

      if (sidebarFilters.exclusiveProperties === 'sí') {
        result = result.filter((property) => property.exclusive)
      }

      if (sidebarFilters.services) {
        result = result.filter((property) => property.services)
      }

      if (sidebarFilters.environments) {
        result = result.filter((property) => property.environments)
      }

      if (sidebarFilters.propertyQuality && sidebarFilters.propertyQuality !== '') {
        result = result.filter((property) => property.quality === sidebarFilters.propertyQuality)
      }

      if (sidebarFilters.sortBy) {
        result = [...result].sort((a, b) => {
          const dateA = new Date(a.createdDate ?? '2024-01-01')
          const dateB = new Date(b.createdDate ?? '2024-01-01')

          if (sidebarFilters.sortBy === 'newest') {
            return dateB.getTime() - dateA.getTime()
          }
          if (sidebarFilters.sortBy === 'oldest') {
            return dateA.getTime() - dateB.getTime()
          }
          return 0
        })
      }
    }

    return result
  }, [])

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    const results = applyFilters(properties, filters, value)
    setFilteredProperties(results)
  }

  const handleSearchSubmit = (query) => {
    const results = applyFilters(properties, filters, query)
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
      setFilteredProperties(properties)
      return
    }

    setFilters(newFilters)
    const results = applyFilters(properties, newFilters, searchQuery)
    setFilteredProperties(results)
  }

  React.useEffect(() => {
    setSelectedPropertyIds((previous) =>
      previous.filter((id) => filteredProperties.some((property) => property.id === id))
    )
  }, [filteredProperties])

  const handleToggleSelection = (propertyId) => {
    setSelectedPropertyIds((previous) =>
      previous.includes(propertyId)
        ? previous.filter((id) => id !== propertyId)
        : [...previous, propertyId]
    )
  }

  const handleSelectAllVisible = () => {
    setSelectedPropertyIds(filteredProperties.map((property) => property.id))
  }

  const handleClearSelection = () => {
    setSelectedPropertyIds([])
  }

  const handleDeleteProperty = (propertyId) => {
    const property = properties.find((item) => item.id === propertyId)
    confirmModal.danger(
      'Eliminar propiedad',
      `Esta acción removerá ${property?.title ?? 'la propiedad seleccionada'} del listado de mapa.`,
      () => {
        setProperties((previous) => {
          const updated = previous.filter((item) => item.id !== propertyId)
          const nextFiltered = applyFilters(updated, filters, searchQuery)
          setFilteredProperties(nextFiltered)
          return updated
        })
        setSelectedPropertyIds((previous) => previous.filter((id) => id !== propertyId))
      },
      {
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    )
  }

  const handleDeleteSelected = () => {
    if (selectedPropertyIds.length === 0) {
      return
    }

    const total = selectedPropertyIds.length
    confirmModal.danger(
      total === 1 ? 'Eliminar propiedad seleccionada' : 'Eliminar propiedades seleccionadas',
      total === 1
        ? 'Se eliminará la propiedad seleccionada del listado.'
        : `Se eliminarán ${total} propiedades del listado.`,
      () => {
        setProperties((previous) => {
          const updated = previous.filter((property) => !selectedPropertyIds.includes(property.id))
          const nextFiltered = applyFilters(updated, filters, searchQuery)
          setFilteredProperties(nextFiltered)
          return updated
        })
        setSelectedPropertyIds([])
      },
      {
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    )
  }

  return (
    <div className={styles.mapContainer}>
      <TopBar
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onFilterChange={handleFilterChange}
        filters={filters}
      />
      <main className={styles.mapContent}>
        <PropertyList
          items={filteredProperties}
          searchQuery={searchQuery}
          selectedIds={selectedPropertyIds}
          onToggleSelect={handleToggleSelection}
          onSelectAll={handleSelectAllVisible}
          onClearSelection={handleClearSelection}
          onDeleteSelected={handleDeleteSelected}
          onDelete={handleDeleteProperty}
        />
      </main>
    </div>
  )
}

export default MapPage
