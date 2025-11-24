import { CaretDown, XCircle } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import styles from './NetworkFilterDropdown.module.css'

const getDisplayValue = ({ value, options, placeholder, multiple }) => {
    if (multiple) {
        if (!Array.isArray(value) || value.length === 0) {
            return placeholder
        }
        if (value.length === 1) {
            const option = options.find((item) => item.value === value[0])
            return option?.label ?? placeholder
        }
        return `${value.length} seleccionados`
    }

    if (!value) {
        return placeholder
    }

    const option = options.find((item) => item.value === value)
    return option?.label ?? placeholder
}

const NetworkFilterDropdown = ({
    label,
    value,
    options = [],
    placeholder = 'Seleccionar',
    onChange,
    multiple = false,
    disabled = false
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

    const handleToggle = () => {
        if (disabled) {
            return
        }
        setIsOpen((previous) => !previous)
    }

    const handleOptionClick = (optionValue) => {
        if (disabled) {
            return
        }

        if (multiple) {
            const current = Array.isArray(value) ? value : []
            const next = current.includes(optionValue)
                ? current.filter((item) => item !== optionValue)
                : [...current, optionValue]
            onChange?.(next)
            return
        }

        onChange?.(optionValue)
        setIsOpen(false)
    }

    const handleClear = () => {
        if (disabled) {
            return
        }

        onChange?.(multiple ? [] : null)
        setIsOpen(false)
    }

    const isActive = multiple ? (Array.isArray(value) && value.length > 0) : Boolean(value)
    const displayValue = getDisplayValue({ value, options, placeholder: placeholder || label, multiple })

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button
                type="button"
                className={`${styles.trigger} ${isOpen ? styles.open : ''} ${isActive ? styles.active : ''}`}
                onClick={handleToggle}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{displayValue}</span>
                <CaretDown size={14} weight="bold" className={styles.icon} />
            </button>

            {isOpen && (
                <div className={styles.menu} role="listbox">
                    <div className={styles.menuHeader}>
                        <span className={styles.menuTitle}>{label}</span>
                        {isActive && (
                            <button type="button" className={styles.clearButton} onClick={handleClear}>
                                <XCircle size={16} weight="bold" />
                                Limpiar
                            </button>
                        )}
                    </div>
                    <div className={styles.options}>
                        {options.length === 0 ? (
                            <p className={styles.emptyMessage}>Sin opciones disponibles</p>
                        ) : (
                            options.map((option) => {
                                const selected = multiple
                                    ? value?.includes?.(option.value)
                                    : option.value === value
                                return (
                                    <button
                                        type="button"
                                        key={option.value}
                                        className={`${styles.option} ${selected ? styles.selected : ''}`}
                                        onClick={() => handleOptionClick(option.value)}
                                    >
                                        {option.label}
                                    </button>
                                )
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NetworkFilterDropdown













