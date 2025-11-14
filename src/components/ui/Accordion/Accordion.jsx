import React, { useState } from 'react';
import { CaretDown, CaretUp } from 'phosphor-react';
import styles from './Accordion.module.css';

const Accordion = ({
    title,
    children,
    isOpen = false,
    onToggle,
    icon: Icon,
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(isOpen);

    const handleToggle = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    return (
        <div className={`${styles.accordion} ${className}`}>
            <button
                className={styles.accordionHeader}
                onClick={handleToggle}
                type="button"
            >
                <div className={styles.accordionTitle}>
                    {Icon && <Icon size={18} className={styles.accordionIcon} />}
                    <span>{title}</span>
                </div>
                {isExpanded ? (
                    <CaretUp size={16} className={styles.accordionCaret} />
                ) : (
                    <CaretDown size={16} className={styles.accordionCaret} />
                )}
            </button>

            {isExpanded && (
                <div className={styles.accordionContent}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;

