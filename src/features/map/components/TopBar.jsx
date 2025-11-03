import React from 'react'
import styles from './TopBar.module.css'
import FilterSidebar from './FilterSidebar'

function FilterDropdown({ label, options, value, onChange, filterKey, isOpen, onToggle }) {
  const handleSelect = (optionValue) => {
    onChange(filterKey, optionValue)
    onToggle(null)
  }

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button 
            className={styles.dropdownItem}
            onClick={() => handleSelect('')}
          >
            Todos
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MultiSelectFilterDropdown({ label, options, value, onChange, filterKey, isOpen, onToggle, selectedItems, onSelectedItemsChange }) {
  const [localSelected, setLocalSelected] = React.useState(selectedItems || [])

  const handleToggleItem = (itemValue) => {
    const newSelected = localSelected.includes(itemValue)
      ? localSelected.filter(item => item !== itemValue)
      : [...localSelected, itemValue]
    setLocalSelected(newSelected)
  }

  const handleSave = () => {
    onSelectedItemsChange(localSelected)

    let displayText = ''
    if (localSelected.length > 0) {
      displayText = `${label} • ${localSelected.length}`
    }
    
    onChange(filterKey, displayText, localSelected)
    onToggle(null)
  }

  const handleClear = () => {
    setLocalSelected([])
    onSelectedItemsChange([])
    onChange(filterKey, '', [])
    onToggle(null)
  }

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.multiSelectDropdownMenu}>
          <div className={styles.multiSelectSection}>
            <div className={styles.checkboxList}>
              {options.map((option) => (
                <div key={option.value} className={styles.checkboxItem}>
                  <div 
                    className={`${styles.checkbox} ${localSelected.includes(option.value) ? styles.checkboxChecked : ''}`}
                    onClick={() => handleToggleItem(option.value)}
                  >
                    {localSelected.includes(option.value) && (
                      <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    )}
                  </div>
                  <span className={styles.checkboxLabel}>{option.label}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.multiSelectActions}>
              <button className={styles.clearBtn} onClick={handleClear}>
                Borrar
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PropertyTypeFilterDropdown({ label, value, onChange, filterKey, isOpen, onToggle, selectedTypes, onSelectedTypesChange }) {
  const [localSelectedTypes, setLocalSelectedTypes] = React.useState(selectedTypes || [])

  const propertyTypes = [
    'Apartamento', 'Bodega', 'Casa', 'Consultorio', 
    'Finca', 'Habitación', 'Hotel', 'Local', 
    'Lote', 'Negocio'
  ]

  const handleTypeToggle = (type) => {
    const newSelected = localSelectedTypes.includes(type)
      ? localSelectedTypes.filter(t => t !== type)
      : [...localSelectedTypes, type]
    
    setLocalSelectedTypes(newSelected)
  }

  const handleSave = () => {
    onSelectedTypesChange(localSelectedTypes)
    
    // Crear texto para mostrar en el botón
    let displayText = ''
    if (localSelectedTypes.length > 0) {
      displayText = `Tipo de propiedad • ${localSelectedTypes.length}`
    }
    
    // Pasar los tipos seleccionados al filtro
    onChange(filterKey, displayText, localSelectedTypes)
    onToggle(null)
  }

  const handleClear = () => {
    setLocalSelectedTypes([])
    onSelectedTypesChange([])
    onChange(filterKey, '')
    onToggle(null)
  }

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.propertyTypeDropdownMenu}>
          <div className={styles.propertyTypeSection}>
            <div className={styles.propertyTypeGrid}>
              {propertyTypes.map((type) => (
                <div key={type} className={styles.checkboxItem}>
                  <div 
                    className={`${styles.checkbox} ${localSelectedTypes.includes(type) ? styles.checkboxChecked : ''}`}
                    onClick={() => handleTypeToggle(type)}
                  >
                    {localSelectedTypes.includes(type) && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    )}
                  </div>
                  <span className={styles.checkboxLabel}>{type}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.propertyTypeActions}>
              <button className={styles.clearBtn} onClick={handleClear}>
                Borrar
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RangeFilterDropdown({ label, value, onChange, filterKey, isOpen, onToggle, selectedRange, onSelectedRangeChange, maxValue = 5 }) {
  const [localSelectedRange, setLocalSelectedRange] = React.useState(selectedRange || [])

  const handleNumberToggle = (number) => {
    let newRange = [...localSelectedRange]
    
    if (newRange.includes(number)) {
      // Si el número ya está seleccionado, lo removemos
      newRange = newRange.filter(n => n !== number)
    } else {
      // Si no está seleccionado, lo agregamos
      newRange.push(number)
    }
    
    // Ordenar el array
    newRange.sort((a, b) => a - b)
    setLocalSelectedRange(newRange)
  }

  const handleSave = () => {
    onSelectedRangeChange(localSelectedRange)
    
    // Crear texto para mostrar en el botón
    let displayText = ''
    if (localSelectedRange.length > 0) {
      displayText = `${label} • ${localSelectedRange.length}`
    }
    
    onChange(filterKey, displayText, localSelectedRange)
    onToggle(null)
  }

  const handleClear = () => {
    setLocalSelectedRange([])
    onSelectedRangeChange([])
    onChange(filterKey, '', [])
    onToggle(null)
  }

  const numbers = Array.from({ length: maxValue + 1 }, (_, i) => i)

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.rangeDropdownMenu}>
          <div className={styles.rangeSection}>
            <div className={styles.numberRange}>
              {numbers.map((number) => (
                <button
                  key={number}
                  className={`${styles.numberBtn} ${localSelectedRange.includes(number) ? styles.numberBtnActive : ''}`}
                  onClick={() => handleNumberToggle(number)}
                >
                  {number === maxValue ? `${number}+` : number}
                </button>
              ))}
            </div>
            
            <div className={styles.rangeActions}>
              <button className={styles.clearBtn} onClick={handleClear}>
                Borrar
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LocationFilterDropdown({ label, value, onChange, filterKey, isOpen, onToggle, location, onLocationChange }) {
  const [localLocation, setLocalLocation] = React.useState(location || '')

  const handleSave = () => {
    onLocationChange(localLocation)
    
    // Crear texto para mostrar en el botón
    let displayText = ''
    if (localLocation.trim() !== '') {
      displayText = localLocation.length > 20 ? `${localLocation.substring(0, 20)}...` : localLocation
    }
    
    // Pasar el texto completo como tercer parámetro para el filtrado
    onChange(filterKey, displayText, localLocation)
    onToggle(null)
  }

  const handleClear = () => {
    setLocalLocation('')
    onLocationChange('')
    onChange(filterKey, '')
    onToggle(null)
  }

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.locationDropdownMenu}>
          <div className={styles.locationSection}>
            <div className={styles.locationInputGroup}>
              <div className={styles.locationIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Escribe un lugar para buscar"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className={styles.locationInput}
              />
            </div>
            
            <div className={styles.locationActions}>
              <button className={styles.clearAllBtn} onClick={handleClear}>
                Borrar todo
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RealEstateFilterDropdown({ label, value, onChange, filterKey, isOpen, onToggle, realEstate, onRealEstateChange }) {
  const [localRealEstate, setLocalRealEstate] = React.useState(realEstate || '')

  const handleSave = () => {
    onRealEstateChange(localRealEstate)
    
    // Crear texto para mostrar en el botón
    let displayText = ''
    if (localRealEstate.trim() !== '') {
      displayText = localRealEstate.length > 20 ? `${localRealEstate.substring(0, 20)}...` : localRealEstate
    }
    
    // Pasar el texto completo como tercer parámetro para el filtrado
    onChange(filterKey, displayText, localRealEstate)
    onToggle(null)
  }

  const handleClear = () => {
    setLocalRealEstate('')
    onRealEstateChange('')
    onChange(filterKey, '', '')
    onToggle(null)
  }

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.realEstateDropdownMenu}>
          <div className={styles.realEstateSection}>
            <div className={styles.realEstateInputGroup}>
              <div className={styles.realEstateIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Escribe un nombre para buscar"
                value={localRealEstate}
                onChange={(e) => setLocalRealEstate(e.target.value)}
                className={styles.realEstateInput}
              />
            </div>
            
            <div className={styles.realEstateActions}>
              <button className={styles.clearAllBtn} onClick={handleClear}>
                Borrar todo
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CommissionFilterDropdown({ label, value, onChange, filterKey, isOpen, onToggle, selectedCommissions, onSelectedCommissionsChange }) {
  const [localSelectedCommissions, setLocalSelectedCommissions] = React.useState(selectedCommissions || [])

  const commissionOptions = [
    { value: '30', label: '30%', color: '#fef3c7' }, // amarillo claro
    { value: '50', label: '50%', color: '#d1fae5' }  // verde claro
  ]

  const handleCommissionToggle = (commissionValue) => {
    const newSelected = localSelectedCommissions.includes(commissionValue)
      ? localSelectedCommissions.filter(c => c !== commissionValue)
      : [...localSelectedCommissions, commissionValue]
    
    setLocalSelectedCommissions(newSelected)
    onSelectedCommissionsChange(newSelected)
    
    // Actualizar el texto del botón inmediatamente
    let displayText = ''
    if (newSelected.length > 0) {
      displayText = `Comisión • ${newSelected.length}`
    }
    
    onChange(filterKey, displayText, newSelected)
  }

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.commissionDropdownMenu}>
          <div className={styles.commissionSection}>
            <div className={styles.commissionOptions}>
              {commissionOptions.map((option) => (
                <div key={option.value} className={styles.commissionOption}>
                  <div 
                    className={`${styles.commissionBadge} ${localSelectedCommissions.includes(option.value) ? styles.commissionBadgeSelected : ''}`}
                    style={{ backgroundColor: option.color }}
                    onClick={() => handleCommissionToggle(option.value)}
                  >
                    <span className={styles.commissionText}>{option.label}</span>
                  </div>
                  {localSelectedCommissions.includes(option.value) && (
                    <div className={styles.commissionCheck}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PriceFilterDropdown({ label, value, onChange, filterKey, isOpen, onToggle, priceRange, onPriceRangeChange }) {
  const [localMinPrice, setLocalMinPrice] = React.useState(priceRange?.min || '')
  const [localMaxPrice, setLocalMaxPrice] = React.useState(priceRange?.max || '')
  const [currency, setCurrency] = React.useState('USD')

  const handleSave = () => {
    const newPriceRange = {
      min: localMinPrice,
      max: localMaxPrice,
      currency: currency
    }
    onPriceRangeChange(newPriceRange)
    
    // Crear texto para mostrar en el botón
    let displayText = ''
    if (localMinPrice && localMaxPrice) {
      displayText = `${currency} ${localMinPrice} - ${localMaxPrice}`
    } else if (localMinPrice) {
      displayText = `Desde ${currency} ${localMinPrice}`
    } else if (localMaxPrice) {
      displayText = `Hasta ${currency} ${localMaxPrice}`
    }
    
    onChange(filterKey, displayText, newPriceRange)
    onToggle(null)
  }

  const handleClear = () => {
    setLocalMinPrice('')
    setLocalMaxPrice('')
    setCurrency('USD')
    onPriceRangeChange({ min: '', max: '', currency: 'USD' })
    onChange(filterKey, '')
    onToggle(null)
  }

  return (
    <div className={styles.filterDropdown} onClick={(e) => e.stopPropagation()}>
      <button 
        className={`${styles.chip} ${value ? styles.chipActive : ''}`}
        onClick={() => onToggle(isOpen ? null : filterKey)}
      >
        {value || label} <span className={styles.chev}>▾</span>
      </button>
      {isOpen && (
        <div className={styles.priceDropdownMenu}>
          <div className={styles.priceSection}>
            <div className={styles.currencySection}>
              <span className={styles.currencyLabel}>Moneda:</span>
              <div className={styles.currencyButtons}>
                <button 
                  className={`${styles.currencyBtn} ${currency === 'COP' ? styles.currencyBtnActive : ''}`}
                  onClick={() => setCurrency('COP')}
                >
                  COP
                </button>
                <button 
                  className={`${styles.currencyBtn} ${currency === 'USD' ? styles.currencyBtnActive : ''}`}
                  onClick={() => setCurrency('USD')}
                >
                  USD
                </button>
              </div>
            </div>
            
            <div className={styles.priceInputs}>
              <div className={styles.priceInputGroup}>
                <div className={styles.priceInputPrefix}>{currency}</div>
                <input
                  type="number"
                  placeholder="Precio mínimo"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  className={styles.priceInput}
                />
              </div>
              
              <div className={styles.priceInputGroup}>
                <div className={styles.priceInputPrefix}>{currency}</div>
                <input
                  type="number"
                  placeholder="Precio máximo"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  className={styles.priceInput}
                />
              </div>
            </div>
            
            <div className={styles.priceActions}>
              <button className={styles.clearBtn} onClick={handleClear}>
                Borrar
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TopBar({ onSearchChange, onSearchSubmit, onFilterChange, filters }) {
  const [query, setQuery] = React.useState('')
  const [openDropdown, setOpenDropdown] = React.useState(null)
  const [priceRange, setPriceRange] = React.useState({ min: '', max: '', currency: 'USD' })
  const [selectedOperations, setSelectedOperations] = React.useState([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = React.useState([])
  const [selectedRoomsRange, setSelectedRoomsRange] = React.useState([])
  const [selectedBedroomsRange, setSelectedBedroomsRange] = React.useState([])
  const [location, setLocation] = React.useState('')
  const [realEstate, setRealEstate] = React.useState('')
  const [selectedCommissions, setSelectedCommissions] = React.useState([])
  const [includeMyProperties, setIncludeMyProperties] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const sidebarRef = React.useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault()
    onSearchSubmit?.(query)
  }

  const handleDropdownToggle = (filterKey) => {
    setOpenDropdown(filterKey)
  }

  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange)
  }

  const handleSelectedOperationsChange = (newSelected) => {
    setSelectedOperations(newSelected)
  }

  const handleSelectedPropertyTypesChange = (newSelected) => {
    setSelectedPropertyTypes(newSelected)
  }

  const handleSelectedRoomsRangeChange = (newRange) => {
    setSelectedRoomsRange(newRange)
  }

  const handleSelectedBedroomsRangeChange = (newRange) => {
    setSelectedBedroomsRange(newRange)
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  const handleRealEstateChange = (newRealEstate) => {
    setRealEstate(newRealEstate)
  }

  const handleSelectedCommissionsChange = (newSelected) => {
    setSelectedCommissions(newSelected)
  }

  const handleIncludeMyPropertiesToggle = () => {
    const newValue = !includeMyProperties
    setIncludeMyProperties(newValue)
    onFilterChange?.('includeMyProperties', newValue)
  }

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleClearAllFilters = () => {
    // Limpiar todos los estados locales
    setQuery('')
    setPriceRange({ min: '', max: '', currency: 'USD' })
    setSelectedOperations([])
    setSelectedPropertyTypes([])
    setSelectedRoomsRange([])
    setSelectedBedroomsRange([])
    setLocation('')
    setRealEstate('')
    setSelectedCommissions([])
    setIncludeMyProperties(false)
    
    // Limpiar filtros del sidebar
    if (sidebarRef.current) {
      sidebarRef.current.clearAllFilters()
    }
    
    // Notificar al componente padre para limpiar los filtros
    onFilterChange?.('clearAll', null)
  }



  // Cerrar dropdowns al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null)
    }

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdown])

  const operationOptions = [
    { value: 'Venta', label: 'Venta' },
    { value: 'Arriendo', label: 'Arriendo' },
    { value: 'Vacacional', label: 'Vacacional' }
  ]

  const propertyTypeOptions = [
    { value: 'Casa', label: 'Casa' },
    { value: 'Apartamento', label: 'Apartamento' },
    { value: 'Terreno', label: 'Terreno' },
    { value: 'Local Comercial', label: 'Local Comercial' },
    { value: 'Oficina', label: 'Oficina' },
    { value: 'Depósito', label: 'Depósito' }
  ]

  const roomOptions = [
    { value: '1', label: '1+ Ambiente' },
    { value: '2', label: '2+ Ambientes' },
    { value: '3', label: '3+ Ambientes' },
    { value: '4', label: '4+ Ambientes' }
  ]

  const bedroomOptions = [
    { value: '1', label: '1+ Dormitorio' },
    { value: '2', label: '2+ Dormitorios' },
    { value: '3', label: '3+ Dormitorios' }
  ]

  return (
    <header className={styles.mapTopbar}>
      <div className={styles.mapTopbarInner}>


        <div className={styles.searchAndIncludeRow}>
          <form className={styles.mapSearchbar} onSubmit={handleSubmit}>
            <div className={styles.mapSearchbarField}>
              <svg className={styles.mapSearchbarIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                className={styles.mapSearchbarInput}
                placeholder="Dirección o código de la propiedad..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  onSearchChange?.(e.target.value)
                }}
              />
            </div>
          </form>
          <button 
            className={`${styles.chip} ${includeMyProperties ? styles.chipActive : styles.chipMuted}`}
            onClick={handleIncludeMyPropertiesToggle}
          >
            Incluir mis propiedades
          </button>
        </div>

        <div className={styles.mapFilters}>
          <div className={styles.filterRow}>
            <MultiSelectFilterDropdown 
              label="Tipo de operación"
              options={operationOptions}
              value={filters?.operation}
              onChange={onFilterChange}
              filterKey="operation"
              isOpen={openDropdown === 'operation'}
              onToggle={handleDropdownToggle}
              selectedItems={selectedOperations}
              onSelectedItemsChange={handleSelectedOperationsChange}
            />
            <PropertyTypeFilterDropdown 
              label="Tipo de propiedad"
              value={filters?.propertyType}
              onChange={onFilterChange}
              filterKey="propertyType"
              isOpen={openDropdown === 'propertyType'}
              onToggle={handleDropdownToggle}
              selectedTypes={selectedPropertyTypes}
              onSelectedTypesChange={handleSelectedPropertyTypesChange}
            />
            <PriceFilterDropdown 
              label="Precio"
              value={filters?.priceRange}
              onChange={onFilterChange}
              filterKey="priceRange"
              isOpen={openDropdown === 'priceRange'}
              onToggle={handleDropdownToggle}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
            />
            <LocationFilterDropdown 
              label="Ubicación"
              value={filters?.location}
              onChange={onFilterChange}
              filterKey="location"
              isOpen={openDropdown === 'location'}
              onToggle={handleDropdownToggle}
              location={location}
              onLocationChange={handleLocationChange}
            />
            <RangeFilterDropdown 
              label="Ambientes"
              value={filters?.rooms}
              onChange={onFilterChange}
              filterKey="rooms"
              isOpen={openDropdown === 'rooms'}
              onToggle={handleDropdownToggle}
              selectedRange={selectedRoomsRange}
              onSelectedRangeChange={handleSelectedRoomsRangeChange}
              maxValue={5}
            />
            <RangeFilterDropdown 
              label="Dormitorios"
              value={filters?.bedrooms}
              onChange={onFilterChange}
              filterKey="bedrooms"
              isOpen={openDropdown === 'bedrooms'}
              onToggle={handleDropdownToggle}
              selectedRange={selectedBedroomsRange}
              onSelectedRangeChange={handleSelectedBedroomsRangeChange}
              maxValue={5}
            />
            <RealEstateFilterDropdown 
              label="Inmobiliarias"
              value={filters?.realEstate}
              onChange={onFilterChange}
              filterKey="realEstate"
              isOpen={openDropdown === 'realEstate'}
              onToggle={handleDropdownToggle}
              realEstate={realEstate}
              onRealEstateChange={handleRealEstateChange}
            />
            <CommissionFilterDropdown 
              label="Comisión"
              value={filters?.commission}
              onChange={onFilterChange}
              filterKey="commission"
              isOpen={openDropdown === 'commission'}
              onToggle={handleDropdownToggle}
              selectedCommissions={selectedCommissions}
              onSelectedCommissionsChange={handleSelectedCommissionsChange}
            />
            <div className={styles.actionIcons}>
              <button className={styles.iconBtn} title="Configurar" onClick={handleOpenSidebar}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.2l.06.06c.48.48 1.18.62 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .65.38 1.24.97 1.51.64.29 1.34.15 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.48.48-.62 1.18-.33 1.82.27.59.86.97 1.51.97H21a2 2 0 1 1 0 4h-.09c-.65 0-1.24.38-1.51.97z" />
                </svg>
              </button>
              <button className={styles.iconBtn} title="Borrar todos los filtros" onClick={handleClearAllFilters}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <FilterSidebar 
        ref={sidebarRef}
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar}
        onApplyFilters={onFilterChange}
      />
    </header>
  )
}

export default TopBar
