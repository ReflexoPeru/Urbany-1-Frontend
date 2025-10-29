import React from 'react';
import NetworksHeader from '../components/NetworksHeader';
import FiltersSection from '../components/FiltersSection';
import PropertiesTable from '../components/PropertiesTable';
import styles from './NetworksPage.module.css';

const NetworksPage = () => {
    return (
        <div className={styles.networksPage}>
            <NetworksHeader />
            <FiltersSection />
            <PropertiesTable />
        </div>
    );
};

export default NetworksPage;


