import React from 'react';
import SocialMedia from './SocialMedia';
import Location from './Location';
import Watermark from './Watermark';
import CompanyCode from './CompanyCode';
import styles from './RealEstateAccordions.module.css';

const RealEstateAccordions = () => {
    return (
        <div className={styles.accordionsContainer}>
            <SocialMedia />
            <Location />
            <Watermark />
            <CompanyCode />
        </div>
    );
};

export default RealEstateAccordions;