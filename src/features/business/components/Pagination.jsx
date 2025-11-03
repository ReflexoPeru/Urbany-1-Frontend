import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageBtn} ${!canGoPrevious ? styles.disabled : ''}`}
        onClick={handlePrevious}
        disabled={!canGoPrevious}
      >
        {'<'}
      </button>
      <div className={styles.pageCurrent}>{currentPage}</div>
      <button
        className={`${styles.pageBtn} ${!canGoNext ? styles.disabled : ''}`}
        onClick={handleNext}
        disabled={!canGoNext}
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination
