import React from 'react';
import Select from 'react-select';
import styles from './Select.module.css';

const CustomSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Seleccionar...",
    isSearchable = true,
    isClearable = true,
    isDisabled = false,
    isLoading = false,
    className = "",
    error = false,
    errorMessage = "",
    label = "",
    required = false,
    ...props
}) => {
    // Estilos personalizados para React Select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '44px',
            border: error
                ? '2px solid #ef4444'
                : state.isFocused
                    ? '2px solid #38E47A'
                    : '2px solid #e2e8f0',
            borderRadius: '10px',
            boxShadow: state.isFocused
                ? '0 0 0 3px rgba(56, 228, 122, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)'
                : '0 2px 4px rgba(0, 0, 0, 0.05)',
            backgroundColor: isDisabled ? '#f8fafc' : '#ffffff',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                borderColor: error ? '#ef4444' : '#cbd5e1',
                transform: 'translateY(-1px)',
            }
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 12px',
        }),
        input: (provided) => ({
            ...provided,
            margin: '0',
            padding: '0',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#334155',
        }),
        placeholder: (provided) => ({
            ...provided,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#94a3b8',
            margin: '0',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#334155',
            margin: '0',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#d1fae5',
            borderRadius: '6px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            color: '#065f46',
            fontWeight: '600',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#065f46',
            '&:hover': {
                backgroundColor: '#a7f3d0',
                color: '#064e3b',
            }
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#64748b',
            padding: '0 12px',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            '&:hover': {
                color: '#38E47A',
            }
        }),
        clearIndicator: (provided) => ({
            ...provided,
            color: '#64748b',
            padding: '0 8px',
            '&:hover': {
                color: '#ef4444',
            }
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e2e8f0',
            marginTop: '4px',
            zIndex: 1000,
        }),
        menuList: (provided) => ({
            ...provided,
            padding: '8px',
            maxHeight: '200px',
        }),
        option: (provided, state) => ({
            ...provided,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: state.isSelected ? '#ffffff' : '#334155',
            backgroundColor: state.isSelected
                ? '#38E47A'
                : state.isFocused
                    ? '#f0fdf4'
                    : 'transparent',
            borderRadius: '6px',
            padding: '8px 12px',
            margin: '2px 0',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
                backgroundColor: state.isSelected ? '#2BC85A' : '#f0fdf4',
            }
        }),
        noOptionsMessage: (provided) => ({
            ...provided,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#64748b',
            textAlign: 'center',
            padding: '16px',
        }),
        loadingMessage: (provided) => ({
            ...provided,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#64748b',
            textAlign: 'center',
            padding: '16px',
        }),
    };

    return (
        <div className={`${styles.selectContainer} ${className}`}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <Select
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isSearchable={isSearchable}
                isClearable={isClearable}
                isDisabled={isDisabled}
                isLoading={isLoading}
                styles={customStyles}
                className={styles.select}
                classNamePrefix="react-select"
                {...props}
            />
            {error && errorMessage && (
                <span className={styles.errorMessage}>{errorMessage}</span>
            )}
        </div>
    );
};

export default CustomSelect;

