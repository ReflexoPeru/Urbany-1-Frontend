import React from 'react';
import NetworksHeader from './NetworksHeader';
import FiltersSection from './FiltersSection';
import PropertiesTable from './PropertiesTable';
import styles from '../styles/NetworksPage.module.css';

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