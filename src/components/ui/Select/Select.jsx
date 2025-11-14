import React from 'react';
import { Select, ConfigProvider } from 'antd';
import styles from './Select.module.css';

const CustomSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Seleccionar...',
  disabled = false,
  className = '',
  wrapperClassName = '',
  ...props
}) => {
  const handleChange = (selectedValue) => {
    if (onChange) {
      onChange({
        target: {
          name: props.name,
          value: selectedValue
        }
      });
    }
  };

  // Configuración del tema personalizado para Urbany
  const themeConfig = {
    components: {
      Select: {
        // Colores principales
        colorPrimary: '#38e47a',
        colorPrimaryHover: '#22c55e',
        colorPrimaryActive: '#16a34a',

        // Bordes
        colorBorder: '#e5e7eb',
        colorBorderSecondary: '#d1d5db',

        // Fondos
        colorBgContainer: '#fff',
        colorBgElevated: '#fff',
        colorBgContainerDisabled: '#f9fafb',

        // Texto
        colorText: '#111827',
        colorTextPlaceholder: '#9ca3af',
        colorTextDisabled: '#9ca3af',

        // Tamaños
        controlHeight: 40,
        borderRadius: 8,

        // Padding
        paddingContentHorizontal: 16,
        paddingContentVertical: 12,

        // Fuente
        fontFamily: 'Poppins, sans-serif',
        fontSize: 14,

        // Sombras
        boxShadowSecondary: '0 20px 40px rgb(0 0 0 / 20%), 0 8px 16px rgb(0 0 0 / 15%)',

        // Z-index para dropdown
        zIndexPopup: 999999,

        // Opciones del dropdown
        optionPadding: '10px 14px',
        optionHeight: 36,
        optionSelectedBg: '#ecfdf5',
        optionSelectedColor: '#22c55e',
        optionActiveBg: '#f1f5f9',

        // Hover states
        colorPrimaryBorder: '#38e47a',
        colorPrimaryBorderHover: '#22c55e',
      }
    }
  };

  return (
    <div className={`${styles.selectWrapper} ${wrapperClassName}`}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}

      <ConfigProvider theme={themeConfig}>
        <Select
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          style={{ width: '100%' }}
          dropdownStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 20px 40px rgb(0 0 0 / 20%), 0 8px 16px rgb(0 0 0 / 15%)',
            zIndex: 999999,
            maxHeight: 240,
            fontFamily: 'Poppins, sans-serif',
          }}
          optionFilterProp="children"
          showSearch={false}
          {...props}
        >
          {options.map((option) => (
            <Select.Option
              key={option.value}
              value={option.value}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.875rem',
                padding: '10px 14px',
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </ConfigProvider>
    </div>
  );
};

export default CustomSelect;