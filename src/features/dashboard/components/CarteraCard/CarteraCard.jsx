import React from 'react';
import { Bank } from 'phosphor-react';
import styles from './CarteraCard.module.css';

const CarteraCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <Bank size={110} color="#2d8f5d" weight="fill" />
          </div>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.valueContainer}>
            <h1 className={styles.value}>U$S 100.000</h1>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionText}>Cartera total</p>
            <svg className={styles.questionIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#2d8f5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10.6667V8" stroke="#2d8f5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 5.33333H8.00667" stroke="#2d8f5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteraCard;