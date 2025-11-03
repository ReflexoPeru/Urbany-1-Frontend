import React from 'react';
import { IconPlus, IconEdit, IconTrash, IconSearch, IconDownload, IconUpload, IconShare, IconBell, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import styles from './Button.module.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'left',
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
        loading ? styles.loading : '',
        className
    ].filter(Boolean).join(' ');

    const iconSize = size === 'small' ? 16 : size === 'large' ? 20 : 18;

    const renderIcon = () => {
        if (!icon) return null;

        const IconComponent = {
            plus: IconPlus,
            edit: IconEdit,
            trash: IconTrash,
            search: IconSearch,
            download: IconDownload,
            upload: IconUpload,
            share: IconShare,
            bell: IconBell,
            lock: IconLock,
            eye: IconEye,
            'eye-off': IconEyeOff
        }[icon];

        if (!IconComponent) return null;

        return <IconComponent size={iconSize} className={styles.icon} />;
    };

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <div className={styles.spinner} />}
            {icon && iconPosition === 'left' && renderIcon()}
            {children && <span className={styles.content}>{children}</span>}
            {icon && iconPosition === 'right' && renderIcon()}
        </button>
    );
};

export default Button;

