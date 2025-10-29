import React from 'react'
import styles from './FilterSidebar.module.css'

const FilterSidebar = React.forwardRef(({ isOpen, onClose, onApplyFilters }, ref) => {
  const [bathrooms, setBathrooms] = React.useState([])
  const [garages, setGarages] = React.useState([])
  const [age, setAge] = React.useState([])
  const [surfaceType, setSurfaceType] = React.useState('descubierta')
  const [minSurface, setMinSurface] = React.useState('')
  const [maxSurface, setMaxSurface] = React.useState('')
  const [acceptsExchange, setAcceptsExchange] = React.useState(false)
  const [furnished, setFurnished] = React.useState(false)
  const [disposition, setDisposition] = React.useState('')
  const [orientation, setOrientation] = React.useState('')
  const [exclusiveProperties, setExclusiveProperties] = React.useState('no')
  const [services, setServices] = React.useState(false)
  const [environments, setEnvironments] = React.useState(false)
  const [propertyQuality, setPropertyQuality] = React.useState('')
  const [sortBy, setSortBy] = React.useState('newest')

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
    setSurfaceType('descubierta')
    setMinSurface('')
    setMaxSurface('')
    setAcceptsExchange(false)
    setFurnished(false)
    setDisposition('')
    setOrientation('')
    setExclusiveProperties('no')
    setServices(false)
    setEnvironments(false)
    setPropertyQuality('')
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
            <input
              type="text"
              placeholder="Filtrar por disposición"
              value={disposition}
              onChange={(e) => setDisposition(e.target.value)}
              className={styles.input}
            />
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Orientación</h3>
            <input
              type="text"
              placeholder="Filtrar por orientación"
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
              className={styles.input}
            />
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
            <select
              value={propertyQuality}
              onChange={(e) => setPropertyQuality(e.target.value)}
              className={styles.select}
            >
              <option value="">Seleccionar calidad</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="basica">Básica</option>
            </select>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Ordenar por</h3>
            <div className={styles.sortButtons}>
              <button
                className={`${styles.sortBtn} ${sortBy === 'newest' ? styles.sortBtnActive : ''}`}
                onClick={() => setSortBy('newest')}
              >
                Más nuevas
              </button>
              <button
                className={`${styles.sortBtn} ${sortBy === 'oldest' ? styles.sortBtnActive : ''}`}
                onClick={() => setSortBy('oldest')}
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