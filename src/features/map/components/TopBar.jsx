import React from 'react'
import styles from './TopBar.module.css'

function TopBar({ onSearchChange, onSearchSubmit }) {
  const [query, setQuery] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearchSubmit?.(query)
  }

  return (
    <header className={styles.mapTopbar}>
      <div className={styles.mapTopbarInner}>


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

        <div className={styles.mapFilters}>
          <div className={styles.filterRow}>
            <button className={`${styles.chip} ${styles.chipMuted}`}>Incluir mis propiedades</button>
          </div>
          <div className={styles.filterRow}>
            <button className={styles.chip}>Tipo de operación <span className={styles.chev}>▾</span></button>
            <button className={styles.chip}>Tipo de propiedad <span className={styles.chev}>▾</span></button>
            <button className={styles.chip}>Precio <span className={styles.chev}>▾</span></button>
            <button className={styles.chip}>Ubicación <span className={styles.chev}>▾</span></button>
            <button className={styles.chip}>Ambientes <span className={styles.chev}>▾</span></button>
            <button className={styles.chip}>Dormitorios <span className={styles.chev}>▾</span></button>
            <button className={styles.chip}>Inmobiliarias <span className={styles.chev}>▾</span></button>
            <button className={styles.chip}>Comisión <span className={styles.chev}>▾</span></button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
