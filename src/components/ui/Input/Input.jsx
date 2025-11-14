import React from 'react';
import { Input as AntInput, ConfigProvider } from 'antd';
const { Password } = AntInput;
import styles from './Input.module.css';

const Input = ({
    label,
    placeholder,
    type = 'text',
    value,
    onChange,
    error,
    helperText,
    disabled = false,
    required = false,
    icon,
    iconPosition = 'left',
    size = 'medium',
    variant = 'default',
    className = '',
    wrapperClassName = '',
    name,
    prefix,
    style,
    ...props
}) => {
    // Configuración del tema personalizado para Urbany
    const themeConfig = {
        components: {
            Input: {
                // Colores principales
                colorPrimary: '#38e47a',
                colorPrimaryHover: '#22c55e',
                colorPrimaryActive: '#16a34a',

                // Bordes
                colorBorder: '#e5e7eb',
                colorBorderSecondary: '#d1d5db',
                colorBorderHover: '#d1d5db',

                // Fondos
                colorBgContainer: '#fff',
                colorBgContainerDisabled: '#f9fafb',

                // Texto
                colorText: '#111827',
                colorTextPlaceholder: '#9ca3af',
                colorTextDisabled: '#9ca3af',

                // Tamaños
                controlHeight: 40,
                controlHeightSM: 32,
                controlHeightLG: 48,
                borderRadius: 8,

                // Padding
                paddingContentHorizontal: 16,
                paddingContentVertical: 12,

                // Fuente
                fontFamily: 'Poppins, sans-serif',
                fontSize: 14,

                // Sombras
                boxShadow: 'none',

                // Hover states
                colorPrimaryBorder: '#38e47a',
                colorPrimaryBorderHover: '#22c55e',

                // Password specific styles
                addonBg: '#fff',
                activeBg: '#fff',
            }
        }
    };

    const getAntInputSize = () => {
        switch (size) {
            case 'small':
                return 'small';
            case 'large':
                return 'large';
            default:
                return 'middle';
        }
    };

    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <ConfigProvider theme={themeConfig}>
            <div className={`${styles.wrapper} ${wrapperClassName}`}>
                {label && (
                    <label className={styles.label}>
                        {label}
                        {required && <span className={styles.required}>*</span>}
                    </label>
                )}

                {type === 'password' ? (
                    <Password
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        size={getAntInputSize()}
                        className={`${styles.antInput} ${className}`}
                        status={error ? 'error' : ''}
                        name={name}
                        prefix={prefix}
                        style={style}
                        {...props}
                    />
                ) : (
                    <AntInput
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        size={getAntInputSize()}
                        className={`${styles.antInput} ${className}`}
                        status={error ? 'error' : ''}
                        name={name}
                        prefix={prefix}
                        style={style}
                        {...props}
                    />
                )}

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                {helperText && !error && (
                    <div className={styles.helperText}>
                        {helperText}
                    </div>
                )}
            </div>
        </ConfigProvider>
    );
};

export default Input;