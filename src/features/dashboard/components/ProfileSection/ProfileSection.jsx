import React from 'react';
import styles from './ProfileSection.module.css';

const ProfileSection = ({ items }) => (
  <div className={styles.profileSection}>
    <h3 className={styles.title}>Mi Perfil</h3>
    <ul className={styles.profileList}>
      {items.map((item, index) => (
        <li key={index} className={styles.profileItem}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ProfileSection;