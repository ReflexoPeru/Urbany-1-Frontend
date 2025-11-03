import React from 'react'
import { propertiesMock } from '../../../mock/properties_prueba'
import styles from './PropertyList.module.css'



function PropertyList({ items = propertiesMock, searchQuery = '' }) {
  return (
    <section className={styles['property-list']}>
      {items.length === 0 && searchQuery ? (
        <div className={styles['no-results']}>
          <p>No se encontraron propiedades para "{searchQuery}"</p>
          <p className={styles['no-results-suggestion']}>Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
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
      )}
    </section>
  )
}

export default PropertyList
