import React from 'react';
import styles from './KpiCard.module.css';

const KpiCard = ({ icon, title, percent, current, total, users = [], description }) => {
  const Icon = icon;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}><Icon size={16} /></div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.sub}>Progreso</div>
      <div className={styles.progress}><div className={styles.fill} style={{ width: `${percent}%` }} /></div>
      <div className={styles.meta}>{current}/{total} ({percent}%)</div>
      {description ? <div className={styles.desc}>{description}</div> : null}
      <div className={styles.avatars}>
        {users.slice(0,3).map((u,i)=>(<img key={i} src={u.avatar || u} title={u.name || ''} alt="" />))}
      </div>
    </div>
  );
};

export default KpiCard;


