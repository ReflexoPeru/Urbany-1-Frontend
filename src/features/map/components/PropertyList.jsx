import React from 'react'
import { propertiesMock } from '../../../mock/properties'
import styles from './PropertyList.module.css'

function RowActions() {
  return (
    <div className={styles['row-actions']} aria-label="acciones de lista">
      <button className="icon-btn" title="Configurar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.2l.06.06c.48.48 1.18.62 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .65.38 1.24.97 1.51.64.29 1.34.15 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.48.48-.62 1.18-.33 1.82.27.59.86.97 1.51.97H21a2 2 0 1 1 0 4h-.09c-.65 0-1.24.38-1.51.97z"/>
        </svg>
      </button>
      <button className="icon-btn" title="Eliminar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
        </svg>
      </button>
    </div>
  )
}

function PropertyList({ items = propertiesMock }) {
  return (
    <section className={styles['property-list']}>
      <RowActions />
      <ul className={styles['property-list__ul']}>
        {items.map((item) => (
          <li className={styles['property-item']} key={item.id}>
            <img className={styles['property-item__thumb']} src={item.image} alt={item.title} />
            <div className={styles['property-item__info']}>
              <div className={styles['property-item__title']}>{item.title} - <span className={styles['price']}>{item.price}</span></div>
              <div className={styles['property-item__address']}>{item.address}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PropertyList
