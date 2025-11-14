import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
    const cardClasses = [
        styles.card,
        styles[variant],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={cardClasses} {...props}>
            {children}
        </div>
    );
};

const CardHeader = ({ children, className = '', ...props }) => {
    return (
        <div className={`${styles.header} ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardBody = ({ children, className = '', ...props }) => {
    return (
        <div className={`${styles.body} ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardFooter = ({ children, className = '', ...props }) => {
    return (
        <div className={`${styles.footer} ${className}`} {...props}>
            {children}
        </div>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;


