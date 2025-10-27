import React from 'react';
import { IconX, IconPlus } from '@tabler/icons-react';
import styles from './Tag.module.css';

const Tag = ({
  children,
  variant = 'default',
  size = 'medium',
  closable = false,
  onClose,
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const tagClasses = [
    styles.tag,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    onClick ? styles.clickable : '',
    className
  ].filter(Boolean).join(' ');

  const handleClose = (event) => {
    event.stopPropagation();
    onClose?.();
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <span 
      className={tagClasses} 
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      {...props}
    >
      <span className={styles.content}>{children}</span>
      {closable && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          tabIndex={-1}
          disabled={disabled}
        >
          <IconX size={size === 'small' ? 10 : size === 'large' ? 14 : 12} />
        </button>
      )}
    </span>
  );
};

// Componente para agregar nuevos tags
const TagAdd = ({
  placeholder = 'Agregar...',
  onClick,
  size = 'medium',
  className = '',
  ...props
}) => {
  const addClasses = [
    styles.tag,
    styles.add,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={addClasses}
      onClick={onClick}
      role="button"
      tabIndex={0}
      {...props}
    >
      <IconPlus size={size === 'small' ? 10 : size === 'large' ? 14 : 12} className={styles.addIcon} />
      <span className={styles.content}>{placeholder}</span>
    </span>
  );
};

Tag.Add = TagAdd;

export default Tag;


