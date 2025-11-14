import React, { useState, useRef, useEffect } from 'react'
import { CaretDown } from 'phosphor-react'
import styles from './FilterDropdown.module.css'

const FilterDropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  multiple = false,
  placeholder = "Seleccionar..."
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value]
      onChange(newValues)
    } else {
      onChange(option.value)
      setIsOpen(false)
    }
  }

  const getDisplayValue = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0])
        return option ? option.label : placeholder
      }
      return `${value.length} seleccionados`
    }
    
    const option = options.find(opt => opt.value === value)
    return option ? option.label : placeholder
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {getDisplayValue()}
        <CaretDown size={14} weight="bold" className={styles.icon} />
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.option} ${
                (multiple ? value?.includes(option.value) : value === option.value) 
                  ? styles.selected 
                  : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown

