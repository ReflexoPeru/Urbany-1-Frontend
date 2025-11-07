import React from 'react';
import styles from './AutoCard.module.css';

const AutoCard = ({ time, icon, text, image, name }) => {
  const Icon = icon;
  
  return (
    <div className={styles.containerCard}>
      <span className={styles.time}>
        AHORRÁ {time}
      </span>
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.description}>
        {text}
      </div>
    </div>
  );
};

export default AutoCard;