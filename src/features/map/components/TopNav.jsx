import React from 'react'
import styles from '../styles/TopNav.module.css'

function TopNav() {
  return (
    <div className={styles['map-nav']}>
      <div className={styles['map-nav__inner']}>
        <div className={styles['map-nav__left']}>
          <div className={styles['brand']}>
            <span className={styles['brand__crm']}>CRM</span>
            <span className={styles['brand__urbany']}>URBANY</span>
          </div>
        </div>
        <div className={styles['map-nav__right']}>
          <div className={styles['nav-search']}>
            <svg className={styles['nav-search__icon']} viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input className={styles['nav-search__input']} placeholder="Search" />
          </div>
          <button className={styles['badge-premium']}>PREMIUM</button>
          <button className={styles['icon-btn']} aria-label="Notificaciones">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
          <div className={styles['avatar']} title="Perfil">FM</div>
        </div>
      </div>
    </div>
  )
}

export default TopNav
