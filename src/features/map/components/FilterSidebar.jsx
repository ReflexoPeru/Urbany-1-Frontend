import React from 'react'
import styles from './FilterSidebar.module.css'

const FilterSidebar = React.forwardRef(({ isOpen, onClose, onApplyFilters }, ref) => {
  const [bathrooms, setBathrooms] = React.useState([])
  const [garages, setGarages] = React.useState([])
  const [age, setAge] = React.useState([])
  const [surfaceType, setSurfaceType] = React.useState('')
  const [minSurface, setMinSurface] = React.useState('')
  const [maxSurface, setMaxSurface] = React.useState('')
  const [acceptsExchange, setAcceptsExchange] = React.useState(false)
  const [furnished, setFurnished] = React.useState(false)
  const [disposition, setDisposition] = React.useState([])
  const [dispositionInput, setDispositionInput] = React.useState('')
  const [dispositionSuggestions, setDispositionSuggestions] = React.useState([])
  const [showDispositionSuggestions, setShowDispositionSuggestions] = React.useState(false)
  const [orientation, setOrientation] = React.useState([])
  const [orientationInput, setOrientationInput] = React.useState('')
  const [orientationSuggestions, setOrientationSuggestions] = React.useState([])
  const [showOrientationSuggestions, setShowOrientationSuggestions] = React.useState(false)
  const [exclusiveProperties, setExclusiveProperties] = React.useState('')
  const [services, setServices] = React.useState(false)
  const [environments, setEnvironments] = React.useState(false)
  const [propertyQuality, setPropertyQuality] = React.useState('')
  const [propertyQualityInput, setPropertyQualityInput] = React.useState('')
  const [propertyQualitySuggestions, setPropertyQualitySuggestions] = React.useState([])
  const [showPropertyQualitySuggestions, setShowPropertyQualitySuggestions] = React.useState(false)
  const [sortBy, setSortBy] = React.useState('newest')

  const dispositionOptions = [
    'Contrafrente',
    'Frente',
    'Interno',
    'Lateral'
  ]

  const orientationOptions = [
    'Norte',
    'Sur',
    'Este',
    'Oeste',
    'Noreste',
    'Noroeste',
    'Sureste',
    'Suroeste'
  ]

  const propertyQualityOptions = [
    'Menos de 80%',
    'De 80% a 90%',
    'De 90% a 99%',
    '100%'
  ]

  const handleAgeToggle = (ageRange) => {
    const newAge = age.includes(ageRange)
      ? age.filter(a => a !== ageRange)
      : [...age, ageRange]
    setAge(newAge)
  }

  const clearAllFilters = () => {
    setBathrooms([])
    setGarages([])
    setAge([])
    setSurfaceType('')
    setMinSurface('')
    setMaxSurface('')
    setAcceptsExchange(false)
    setFurnished(false)
    setDisposition([])
    setDispositionInput('')
    setDispositionSuggestions([])
    setShowDispositionSuggestions(false)
    setOrientation([])
    setOrientationInput('')
    setOrientationSuggestions([])
    setShowOrientationSuggestions(false)
    setExclusiveProperties('')
    setServices(false)
    setEnvironments(false)
    setPropertyQuality('')
    setPropertyQualityInput('')
    setPropertyQualitySuggestions([])
    setShowPropertyQualitySuggestions(false)
    setSortBy('newest')
  }

  const handleBathroomsToggle = (num) => {
    const newBathrooms = bathrooms.includes(num)
      ? bathrooms.filter(b => b !== num)
      : [...bathrooms, num]
    setBathrooms(newBathrooms)
  }

  const handleGaragesToggle = (num) => {
    const newGarages = garages.includes(num)
      ? garages.filter(g => g !== num)
      : [...garages, num]
    setGarages(newGarages)
  }

  const handleDispositionInputChange = (value) => {
    setDispositionInput(value)

    if (value.trim() === '') {
      setDispositionSuggestions(dispositionOptions)
      setShowDispositionSuggestions(true)
      return
    }

    const filtered = dispositionOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    )
    setDispositionSuggestions(filtered)
    setShowDispositionSuggestions(filtered.length > 0)
  }

  const handleDispositionToggle = (selectedDisposition) => {
    if (disposition.includes(selectedDisposition)) {
      setDisposition(disposition.filter(d => d !== selectedDisposition))
    } else {
      setDisposition([...disposition, selectedDisposition])
    }
  }

  const handleDispositionRemove = (dispositionToRemove) => {
    setDisposition(disposition.filter(d => d !== dispositionToRemove))
  }

  const handleDispositionFocus = () => {
    setDispositionSuggestions(dispositionOptions)
    setShowDispositionSuggestions(true)
  }

  const handleDispositionBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(`.${styles.suggestionsList}`)) {
      setTimeout(() => {
        setShowDispositionSuggestions(false)
      }, 150)
    }
  }

  const handleOrientationInputChange = (value) => {
    setOrientationInput(value)

    if (value.trim() === '') {
      setOrientationSuggestions(orientationOptions)
      setShowOrientationSuggestions(true)
      return
    }

    const filtered = orientationOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    )
    setOrientationSuggestions(filtered)
    setShowOrientationSuggestions(filtered.length > 0)
  }

  const handleOrientationToggle = (selectedOrientation) => {
    if (orientation.includes(selectedOrientation)) {
      setOrientation(orientation.filter(o => o !== selectedOrientation))
    } else {
      setOrientation([...orientation, selectedOrientation])
    }
  }

  const handleOrientationRemove = (orientationToRemove) => {
    setOrientation(orientation.filter(o => o !== orientationToRemove))
  }

  const handleOrientationFocus = () => {
    setOrientationSuggestions(orientationOptions)
    setShowOrientationSuggestions(true)
  }

  const handleOrientationBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(`.${styles.suggestionsList}`)) {
      setTimeout(() => {
        setShowOrientationSuggestions(false)
      }, 150)
    }
  }

  const handlePropertyQualityInputChange = (value) => {
    setPropertyQualityInput(value)

    if (value.trim() === '') {
      setPropertyQualitySuggestions(propertyQualityOptions)
      setShowPropertyQualitySuggestions(true)
      return
    }

    const filtered = propertyQualityOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    )
    setPropertyQualitySuggestions(filtered)
    setShowPropertyQualitySuggestions(filtered.length > 0)
  }

  const handlePropertyQualitySelect = (selectedQuality) => {
    setPropertyQuality(selectedQuality)
    setPropertyQualityInput(selectedQuality)
    setShowPropertyQualitySuggestions(false)
    setPropertyQualitySuggestions([])
  }

  const handlePropertyQualityClick = () => {
    if (showPropertyQualitySuggestions) {
      setShowPropertyQualitySuggestions(false)
      setPropertyQualitySuggestions([])
    } else {
      setPropertyQualitySuggestions(propertyQualityOptions)
      setShowPropertyQualitySuggestions(true)
    }
  }

  const handlePropertyQualityBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(`.${styles.suggestionsList}`)) {
      setTimeout(() => {
        setShowPropertyQualitySuggestions(false)
      }, 150)
    }
  }

  const handleSortByChange = (newSortBy) => {
    setSortBy(newSortBy)

    const currentFilters = {
      bathrooms,
      garages,
      age,
      surfaceType,
      minSurface,
      maxSurface,
      acceptsExchange,
      furnished,
      disposition,
      orientation,
      exclusiveProperties,
      services,
      environments,
      propertyQuality,
      sortBy: newSortBy
    }

    onApplyFilters?.('sidebarFilters', currentFilters, currentFilters)
  }

  const handleClearAll = () => {
    clearAllFilters()
  }

  const handleApplyFilters = () => {
    const sidebarFilters = {
      bathrooms,
      garages,
      age,
      surfaceType,
      minSurface,
      maxSurface,
      acceptsExchange,
      furnished,
      disposition,
      orientation,
      exclusiveProperties,
      services,
      environments,
      propertyQuality,
      sortBy
    }

    onApplyFilters?.('sidebarFilters', sidebarFilters, sidebarFilters)
    onClose()
  }

  React.useImperativeHandle(ref, () => ({
    clearAllFilters
  }))

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Más filtros</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Cantidad de ambientes</h3>

            <div className={styles.subsection}>
              <label className={styles.label}>Baños</label>
              <div className={styles.numberButtons}>
                {[1, 2, 3, 4, '5+'].map((num) => (
                  <button
                    key={num}
                    className={`${styles.numberBtn} ${bathrooms.includes(num) ? styles.numberBtnActive : ''}`}
                    onClick={() => handleBathroomsToggle(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.subsection}>
              <label className={styles.label}>Garages</label>
              <div className={styles.numberButtons}>
                {[1, 2, 3, 4, '5+'].map((num) => (
                  <button
                    key={num}
                    className={`${styles.numberBtn} ${garages.includes(num) ? styles.numberBtnActive : ''}`}
                    onClick={() => handleGaragesToggle(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Antigüedad</h3>
            <div className={styles.checkboxGrid}>
              {[
                'A estrenar',
                '1 a 10 años',
                '10 a 20 años',
                '20 a 30 años',
                '30 a 40 años',
                '40 a 50 años',
                'Más de 50 años',
                'En construcción'
              ].map((ageRange) => (
                <div key={ageRange} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id={ageRange}
                    checked={age.includes(ageRange)}
                    onChange={() => handleAgeToggle(ageRange)}
                    className={styles.checkbox}
                  />
                  <label htmlFor={ageRange} className={styles.checkboxLabel}>
                    {ageRange}
                  </label>
                </div>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Superficie</h3>
            <div className={styles.radioGroup}>
              {['Cubierta', 'Descubierta', 'Total'].map((type) => (
                <label key={type} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="surfaceType"
                    value={type.toLowerCase()}
                    checked={surfaceType === type.toLowerCase()}
                    onChange={(e) => setSurfaceType(e.target.value)}
                    className={styles.radio}
                  />
                  <span className={styles.radioLabel}>{type}</span>
                </label>
              ))}
            </div>
            <div className={styles.inputRow}>
              <input
                type="text"
                placeholder="Superficie mínima..."
                value={minSurface}
                onChange={(e) => setMinSurface(e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Superficie máxima..."
                value={maxSurface}
                onChange={(e) => setMaxSurface(e.target.value)}
                className={styles.input}
              />
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.toggleItem}>
              <span className={styles.toggleLabel}>Acepta permuta</span>
              <button
                className={`${styles.toggle} ${acceptsExchange ? styles.toggleActive : ''}`}
                onClick={() => setAcceptsExchange(!acceptsExchange)}
              >
                <div className={styles.toggleSlider}></div>
              </button>
            </div>

            <div className={styles.toggleItem}>
              <span className={styles.toggleLabel}>Amoblado</span>
              <button
                className={`${styles.toggle} ${furnished ? styles.toggleActive : ''}`}
                onClick={() => setFurnished(!furnished)}
              >
                <div className={styles.toggleSlider}></div>
              </button>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Disposición</h3>
            <div className={styles.autocompleteContainer}>
              <div className={styles.multiSelectInput}>
                {disposition.map((item, index) => (
                  <div key={index} className={styles.tag}>
                    <span>{item}</span>
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() => handleDispositionRemove(item)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder={disposition.length === 0 ? "Filtrar por disposición" : ""}
                  value={dispositionInput}
                  onChange={(e) => handleDispositionInputChange(e.target.value)}
                  onFocus={handleDispositionFocus}
                  onBlur={handleDispositionBlur}
                  className={styles.tagInput}
                />
              </div>
              {showDispositionSuggestions && dispositionSuggestions.length > 0 && (
                <div className={styles.suggestionsList}>
                  {dispositionSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`${styles.suggestionItem} ${disposition.includes(suggestion) ? styles.suggestionItemSelected : ''}`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleDispositionToggle(suggestion)
                      }}
                    >
                      <span>{suggestion}</span>
                      {disposition.includes(suggestion) && (
                        <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Orientación</h3>
            <div className={styles.autocompleteContainer}>
              <div className={styles.multiSelectInput}>
                {orientation.map((item, index) => (
                  <div key={index} className={styles.tag}>
                    <span>{item}</span>
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() => handleOrientationRemove(item)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder={orientation.length === 0 ? "Filtrar por orientación" : ""}
                  value={orientationInput}
                  onChange={(e) => handleOrientationInputChange(e.target.value)}
                  onFocus={handleOrientationFocus}
                  onBlur={handleOrientationBlur}
                  className={styles.tagInput}
                />
              </div>
              {showOrientationSuggestions && orientationSuggestions.length > 0 && (
                <div className={styles.suggestionsList}>
                  {orientationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`${styles.suggestionItem} ${orientation.includes(suggestion) ? styles.suggestionItemSelected : ''}`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleOrientationToggle(suggestion)
                      }}
                    >
                      <span>{suggestion}</span>
                      {orientation.includes(suggestion) && (
                        <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Más opciones</h3>
            <div className={styles.subsection}>
              <label className={styles.label}>Propiedades exclusivas</label>
              <div className={styles.radioGroup}>
                {['No', 'Sí'].map((option) => (
                  <label key={option} className={styles.radioItem}>
                    <input
                      type="radio"
                      name="exclusiveProperties"
                      value={option.toLowerCase()}
                      checked={exclusiveProperties === option.toLowerCase()}
                      onChange={(e) => setExclusiveProperties(e.target.value)}
                      className={styles.radio}
                    />
                    <span className={styles.radioLabel}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Amenities</h3>
            <div className={styles.toggleItem}>
              <span className={styles.toggleLabel}>Servicios</span>
              <button
                className={`${styles.toggle} ${services ? styles.toggleActive : ''}`}
                onClick={() => setServices(!services)}
              >
                <div className={styles.toggleSlider}></div>
              </button>
            </div>

            <div className={styles.toggleItem}>
              <span className={styles.toggleLabel}>Ambientes</span>
              <button
                className={`${styles.toggle} ${environments ? styles.toggleActive : ''}`}
                onClick={() => setEnvironments(!environments)}
              >
                <div className={styles.toggleSlider}></div>
              </button>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Calidad de las propiedades</h3>
            <div className={styles.autocompleteContainer}>
              <div className={`${styles.qualityInputContainer} ${showPropertyQualitySuggestions ? styles.open : ''}`}>
                <input
                  type="text"
                  placeholder="Seleccionar calidad"
                  value={propertyQualityInput}
                  onChange={(e) => handlePropertyQualityInputChange(e.target.value)}
                  onClick={handlePropertyQualityClick}
                  onBlur={handlePropertyQualityBlur}
                  className={styles.qualityInput}
                  readOnly
                />
                <svg
                  className={styles.qualityChevron}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  onClick={handlePropertyQualityClick}
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              {showPropertyQualitySuggestions && propertyQualitySuggestions.length > 0 && (
                <div className={styles.suggestionsList}>
                  {propertyQualitySuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`${styles.suggestionItem} ${propertyQuality === suggestion ? styles.suggestionItemSelected : ''}`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handlePropertyQualitySelect(suggestion)
                      }}
                    >
                      <span>{suggestion}</span>
                      {propertyQuality === suggestion && (
                        <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Ordenar por</h3>
            <div className={styles.sortButtons}>
              <button
                className={`${styles.sortBtn} ${sortBy === 'newest' ? styles.sortBtnActive : ''}`}
                onClick={() => handleSortByChange('newest')}
              >
                Más nuevas
              </button>
              <button
                className={`${styles.sortBtn} ${sortBy === 'oldest' ? styles.sortBtnActive : ''}`}
                onClick={() => handleSortByChange('oldest')}
              >
                Más antiguas
              </button>
            </div>
          </section>
        </div>

        <div className={styles.footer}>
          <button className={styles.clearAllBtn} onClick={handleClearAll}>
            Borrar todo
          </button>
          <button className={styles.applyBtn} onClick={handleApplyFilters}>
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  )
})

FilterSidebar.displayName = 'FilterSidebar'

export default FilterSidebar