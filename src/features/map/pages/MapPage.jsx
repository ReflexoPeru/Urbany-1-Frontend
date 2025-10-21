import React from 'react'
import TopBar from '../components/TopBar'
import PropertyList from '../components/PropertyList'
import styles from '../styles/map.module.css'

function MapPage() {
  const handleSearchChange = (value) => {
    // TODO: conectar a tu store o filtros
    // console.log('search change:', value)
  }

  const handleSearchSubmit = (query) => {
    // TODO: ejecutar búsqueda
    // console.log('search submit:', query)
  }

  return (
    <div className="map-page">
      <TopBar onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />
      <main className="map-content">
        <PropertyList />
      </main>
    </div>
  )
}

export default MapPage
