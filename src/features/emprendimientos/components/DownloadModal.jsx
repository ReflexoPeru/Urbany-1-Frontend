import React, { useState } from 'react'
import { X, Download, FileText, Table } from 'lucide-react'
import styles from './DownloadModal.module.css'

const DownloadModal = ({ isOpen, onClose, onDownload }) => {
  const [selectedFormat, setSelectedFormat] = useState('csv')
  const [selectedDateRange, setSelectedDateRange] = useState('all')

  const formats = [
    { value: 'csv', label: 'CSV', icon: FileText, description: 'Archivo de texto separado por comas' },
    { value: 'excel', label: 'Excel', icon: Table, description: 'Archivo de Microsoft Excel' },
    { value: 'pdf', label: 'PDF', icon: FileText, description: 'Documento PDF' }
  ]

  const dateRanges = [
    { value: 'all', label: 'Todos los datos' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' }
  ]

  const handleDownload = () => {
    onDownload(selectedFormat, selectedDateRange)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Download className={styles.icon} size={24} />
            <h2 className={styles.title}>Descargar Datos</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Formato de archivo</h3>
            <div className={styles.formatGrid}>
              {formats.map(format => {
                const IconComponent = format.icon
                return (
                  <div
                    key={format.value}
                    className={`${styles.formatOption} ${selectedFormat === format.value ? styles.selected : ''}`}
                    onClick={() => setSelectedFormat(format.value)}
                  >
                    <div className={styles.formatIcon}>
                      <IconComponent size={24} />
                    </div>
                    <div className={styles.formatInfo}>
                      <div className={styles.formatLabel}>{format.label}</div>
                      <div className={styles.formatDescription}>{format.description}</div>
                    </div>
                    <div className={styles.radioButton}>
                      <div className={styles.radioInner}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Rango de fechas</h3>
            <div className={styles.dateRangeGrid}>
              {dateRanges.map(range => (
                <label key={range.value} className={styles.dateRangeOption}>
                  <input
                    type="radio"
                    name="dateRange"
                    value={range.value}
                    checked={selectedDateRange === range.value}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                  />
                  <span className={styles.dateRangeLabel}>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.downloadButton} onClick={handleDownload}>
            <Download size={16} />
            Descargar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadModal

