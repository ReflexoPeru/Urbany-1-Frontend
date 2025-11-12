import React from 'react'
import { MapPin, Bed, Bathtub, Ruler, TagSimple } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import { propertiesMock } from '../../../mock/properties_prueba'
import styles from './PropertyList.module.css'

const formatValue = (value, fallback = 'Sin dato') => {
  if (value === null || value === undefined) {
    return fallback
  }
  return value
}

function PropertyList({
  items = propertiesMock,
  searchQuery = '',
  selectedIds = [],
  onToggleSelect = () => {},
  onSelectAll = () => {},
  onClearSelection = () => {},
  onDeleteSelected = () => {},
  onDelete = () => {}
}) {
  const hasItems = items.length > 0
  const areaLabel = (property) => property.area || `${property.surface ?? 0} m²`
  const selectAllRef = React.useRef(null)
  const selectedInView = items.filter((property) => selectedIds.includes(property.id)).length
  const isAllSelected = hasItems && selectedInView === items.length
  const isIndeterminate = selectedInView > 0 && !isAllSelected
  const selectionText = selectedIds.length > 0
    ? `${selectedIds.length} seleccionada${selectedIds.length === 1 ? '' : 's'}`
    : 'Seleccionar visibles'
  const rows = React.useMemo(() => {
    const grouped = []
    for (let index = 0; index < items.length; index += 2) {
      grouped.push(items.slice(index, index + 2))
    }
    return grouped
  }, [items])

  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

  if (!hasItems) {
    return (
      <section className={styles.emptyContainer}>
        <div className={styles.noResults}>
          <h3 className={styles.noResultsTitle}>
            {searchQuery ? `No encontramos resultados para "${searchQuery}"` : 'Aún no hay propiedades en el mapa'}
          </h3>
          <p className={styles.noResultsDescription}>
            Ajusta los filtros o limpia la búsqueda para ver otras propiedades disponibles.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.propertyList}>
      <div className={styles.listHeader}>
        <div className={styles.selectionGroup}>
          <input
            ref={selectAllRef}
            type="checkbox"
            className={styles.checkboxInput}
            checked={isAllSelected}
            onChange={() => {
              if (isAllSelected) {
                onClearSelection()
              } else {
                onSelectAll()
              }
            }}
          />
          <span className={styles.selectionText}>{selectionText}</span>
        </div>
        <div className={styles.bulkActions}>
          <Button
            variant="dangerSoft"
            size="small"
            icon="trash"
            className={styles.bulkDeleteButton}
            disabled={selectedIds.length === 0}
            onClick={onDeleteSelected}
          >
            Eliminar seleccionadas
          </Button>
        </div>
      </div>

      <div className={styles.table}>
        {rows.map((group, rowIndex) => (
          <div className={styles.row} key={`row-${rowIndex}`}>
            {group.map((property) => {
              const isSelected = selectedIds.includes(property.id)
              return (
                <div
                  key={property.id}
                  className={`${styles.cell} ${isSelected ? styles.cellSelected : ''}`}
                >
                  <div className={styles.mediaWrapper}>
                    <img src={property.image} alt={property.title} loading="lazy" />
                    <span className={styles.operationBadge}>{formatValue(property.operation, 'Sin operación')}</span>
                  </div>

                  <div className={styles.cellContent}>
                    <header className={styles.cellHeader}>
                      <div className={styles.headerLeft}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={isSelected}
                          onChange={() => onToggleSelect(property.id)}
                        />
                        <div className={styles.titleGroup}>
                          <h4 className={styles.title}>{formatValue(property.title, 'Propiedad sin título')}</h4>
                          <p className={styles.location}>
                            <MapPin size={16} weight="bold" />
                            <span>{formatValue(property.address, 'Dirección no disponible')}</span>
                          </p>
                        </div>
                      </div>
                      <span className={styles.price}>{formatValue(property.price, 'Sin precio')}</span>
                    </header>

                    <div className={styles.meta}>
                      <span>
                        <Bed size={18} weight="bold" />
                        {`${formatValue(property.bedrooms, 0)} dorm.`}
                      </span>
                      <span>
                        <Bathtub size={18} weight="bold" />
                        {`${formatValue(property.bathrooms, 0)} baños`}
                      </span>
                      <span>
                        <Ruler size={18} weight="bold" />
                        {areaLabel(property)}
                      </span>
                    </div>

                    <div className={styles.tags}>
                      <span className={styles.tag}>
                        <TagSimple size={15} weight="bold" />
                        {formatValue(property.type, 'Tipo no definido')}
                      </span>
                      {property.commission !== undefined && (
                        <span className={styles.tag}>
                          Comisión {property.commission}%
                        </span>
                      )}
                      {property.isMyProperty && (
                        <span className={`${styles.tag} ${styles.tagHighlight}`}>Mi inventario</span>
                      )}
                      {property.exclusive && (
                        <span className={`${styles.tag} ${styles.tagExclusive}`}>Exclusiva</span>
                      )}
                    </div>

                    <footer className={styles.actions}>
                      <Button
                        variant="dangerSoft"
                        size="small"
                        icon="trash"
                        className={styles.cardDeleteButton}
                        onClick={() => onDelete(property.id)}
                      >
                        Eliminar
                      </Button>
                    </footer>
                  </div>
                </div>
              )
            })}
            {group.length < 2 && <div className={styles.cellPlaceholder} />}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PropertyList
