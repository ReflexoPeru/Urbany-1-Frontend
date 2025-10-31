import React, { useMemo, useState, useEffect } from 'react'
import styles from './ReportsTable.module.css'
import Pagination from '../../../components/common/Pagination'
import { reportsPropertiesData, reportsAgentsData } from '../../../mock/reports'

const normalizeData = (data) =>
  data.map((item, index) => ({
    ...item,
    __rowId: item?.id ?? `item-${index}`
  }))

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

const ReportsTable = ({
  category,
  searchQuery,
  onRowClick,
  itemsPerPage = 10
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const rawData = category === 'agentes' ? reportsAgentsData : reportsPropertiesData

  const filteredData = useMemo(() => {
    if (!searchQuery) return rawData

    if (category === 'agentes') {
      return rawData.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return rawData.filter(item =>
      item.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, rawData, category])

  useEffect(() => {
    setCurrentPage(1)
  }, [category, searchQuery])

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const rows = useMemo(() => normalizeData(paginatedData), [paginatedData])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (category === 'agentes') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.tableContainer}>
          <div className={styles.table} role="table">
            <div className={styles.headerRow} role="row">
              <div className={styles.headerCell} role="columnheader">
                Nombre
              </div>
              <div className={styles.headerCell} role="columnheader">
                Email
              </div>
              <div className={styles.headerCell} role="columnheader">
                Propiedades
              </div>
              <div className={styles.headerCell} role="columnheader">
                Ventas
              </div>
              <div className={styles.headerCell} role="columnheader">
                Ingresos
              </div>
              <div className={styles.headerCell} role="columnheader">
                Comisión
              </div>
            </div>

            <div className={styles.body} role="rowgroup">
              {rows.length === 0 ? (
                <div className={styles.emptyRow} role="row">
                  No se encontraron agentes.
                </div>
              ) : (
                rows.map((agent) => {
                  const rowId = agent.__rowId

                  return (
                    <div
                      key={rowId}
                      className={styles.bodyRow}
                      role="row"
                      onClick={() => onRowClick?.(agent)}
                    >
                      <div className={`${styles.cell} ${styles.agentCell}`} role="cell">
                        <div className={styles.avatarWrapper}>
                          <div className={styles.avatarFallback}>
                            {getInitials(agent.name)}
                          </div>
                        </div>
                        <div className={styles.agentInfo}>
                          <span className={styles.agentName}>{agent.name}</span>
                          <span className={styles.agentPhone}>{agent.phone}</span>
                        </div>
                      </div>

                      <div className={`${styles.cell} ${styles.emailCell}`} role="cell">
                        <span>{agent.email}</span>
                      </div>

                      <div className={`${styles.cell} ${styles.statCell}`} role="cell">
                        <span>{agent.properties}</span>
                      </div>

                      <div className={`${styles.cell} ${styles.statCell}`} role="cell">
                        <span>{agent.sales}</span>
                      </div>

                      <div className={`${styles.cell} ${styles.priceCell}`} role="cell">
                        <div className={styles.priceTag}>
                          {agent.revenue}
                        </div>
                      </div>

                      <div className={`${styles.cell} ${styles.priceCell}`} role="cell">
                        <div className={styles.priceTag}>
                          {agent.commission}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            showInfo={true}
            showPageNumbers={true}
            maxVisiblePages={5}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <div className={styles.table} role="table">
          <div className={styles.headerRow} role="row">
            <div className={styles.headerCell} role="columnheader">
              Foto
            </div>
            <div className={styles.headerCell} role="columnheader">
              Dirección
            </div>
            <div className={styles.headerCell} role="columnheader">
              Tipo
            </div>
            <div className={styles.headerCell} role="columnheader">
              Precio
            </div>
            <div className={styles.headerCell} role="columnheader">
              Portales
            </div>
          </div>

          <div className={styles.body} role="rowgroup">
            {rows.length === 0 ? (
              <div className={styles.emptyRow} role="row">
                No se encontraron propiedades.
              </div>
            ) : (
              rows.map((property) => {
                const rowId = property.__rowId

                return (
                  <div
                    key={rowId}
                    className={styles.bodyRow}
                    role="row"
                    onClick={() => onRowClick?.(property)}
                  >
                    <div className={`${styles.cell} ${styles.photoCell}`} role="cell">
                      <div className={styles.photoContainer}>
                        {property.image ? (
                          <img
                            src={property.image}
                            alt={property.code}
                            className={styles.propertyPhoto}
                          />
                        ) : (
                          <div className={styles.photoPlaceholder}>
                            C1
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`${styles.cell} ${styles.addressCell}`} role="cell">
                      <div className={styles.addressContainer}>
                        <span className={styles.propertyCode}>{property.code}</span>
                        <span className={styles.propertyAddress}>{property.address}</span>
                        <span className={styles.propertyRef}>{property.ref}</span>
                      </div>
                    </div>

                    <div className={`${styles.cell} ${styles.typeCell}`} role="cell">
                      <div className={styles.typeContainer}>
                        <span className={styles.propertyType}>{property.type}</span>
                        <span className={styles.propertyDetails}>
                          {property.bedrooms > 0 ? `${property.bedrooms} dormitorios` : 'Sin dormitorios'}
                        </span>
                      </div>
                    </div>

                    <div className={`${styles.cell} ${styles.priceCell}`} role="cell">
                      <div className={styles.priceTag}>
                        {property.price}
                      </div>
                    </div>

                    <div className={`${styles.cell} ${styles.portalsCell}`} role="cell">
                      <div className={styles.portalsContainer}>
                        {Array.isArray(property.portals) ? (
                          property.portals.map((portal, index) => (
                            <div key={index} className={styles.portalBadge} style={{ color: portal.color }}>
                              {portal.name}
                            </div>
                          ))
                        ) : (
                          <div className={styles.portalBadge} style={{ color: property.portals.color }}>
                            {property.portals.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          showInfo={true}
          showPageNumbers={true}
          maxVisiblePages={5}
        />
      </div>
    </div>
  )
}

export default ReportsTable