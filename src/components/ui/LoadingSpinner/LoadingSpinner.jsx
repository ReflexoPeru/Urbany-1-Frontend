import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({
  size = 'medium',
  variant = 'primary',
  text,
  className = '',
  ...props
}) => {
  const spinnerClasses = [
    styles.spinner,
    styles[size],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container} {...props}>
      <div className={spinnerClasses}>
        <div className={styles.spinnerInner}></div>
      </div>
      {text && (
        <span className={styles.text}>{text}</span>
      )}
    </div>
  );
};

// Componente para overlay de carga
const LoadingOverlay = ({
  size = 'large',
  variant = 'primary',
  text = 'Cargando...',
  className = '',
  ...props
}) => {
  const overlayClasses = [
    styles.overlay,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={overlayClasses} {...props}>
      <div className={styles.overlayContent}>
        <LoadingSpinner size={size} variant={variant} text={text} />
      </div>
    </div>
  );
};

// Componente para botón con loading
const LoadingButton = ({
  loading = false,
  children,
  size = 'medium',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.loadingButton,
    styles[size],
    styles[variant],
    loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} disabled={loading} {...props}>
      {loading && (
        <div className={styles.buttonSpinner}>
          <div className={styles.buttonSpinnerInner}></div>
        </div>
      )}
      <span className={loading ? styles.buttonTextLoading : styles.buttonText}>
        {children}
      </span>
    </button>
  );
};

LoadingSpinner.Overlay = LoadingOverlay;
LoadingSpinner.Button = LoadingButton;

export default LoadingSpinner;


