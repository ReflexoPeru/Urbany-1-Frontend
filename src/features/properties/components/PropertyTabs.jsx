import React from 'react';
import styles from '../pages/PropertiesPage.module.css';

const PropertyTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.activo : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PropertyTabs;
