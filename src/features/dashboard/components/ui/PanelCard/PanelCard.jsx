import React from 'react';
import styles from './PanelCard.module.css';

const joinClassNames = (...values) => values.filter(Boolean).join(' ');

const PanelCard = ({
  title,
  right,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
}) => {
  const sectionClass = joinClassNames(styles.card, className);
  const headerClass = joinClassNames(styles.header, headerClassName);
  const bodyClass = joinClassNames(styles.body, bodyClassName);

  return (
    <section className={sectionClass}>
      {(title || right) && (
        <div className={headerClass}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {right && <div className={styles.right}>{right}</div>}
        </div>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  );
};

export default PanelCard;


