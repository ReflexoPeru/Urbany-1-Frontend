import React from 'react';
import styles from './PropertyTabs.module.css';

const PropertyTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${isActive ? styles.activo : ""}`}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              {IconComponent && (
                <IconComponent
                  size={20}
                  weight={isActive ? "fill" : "regular"}
                  className={styles.tabIcon}
                />
              )}
              <span className={styles.tabLabel}>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`${styles.badge} ${isActive ? styles.badgeActive : ""}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyTabs;
