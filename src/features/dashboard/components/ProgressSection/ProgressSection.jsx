
//Parte de : Ventas Concretas
// src/features/dashboard/components/ProgressSection/ProgressSection.jsx
import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './ProgressSection.module.css';

const ProgressSection = ({ title, progress, current, total, showPercentage = true }) => {
  const calculatedProgress = progress !== undefined 
    ? progress 
    : total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={styles.progressSection}>
      {/* Menú de tres puntos sin fondo redondo */}
      <div className={styles.cardMenu}>
        <IconButton 
          className={styles.menuButton}
          size="small"
          aria-label="menu"
        >
          <MoreHorizIcon />
        </IconButton>
      </div>
      
      <div className={styles.progressHeader}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{title}</span>
          <div className={styles.progressLine}>
            <span className={styles.progressLabel}>Progress</span>
            {showPercentage && (
              <span className={styles.percentage}>{calculatedProgress}%</span>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${calculatedProgress}%` }}
        ></div>
      </div>
      
      <div className={styles.progressInfo}>
        <div className={styles.checkboxContainer}>
          <Checkbox
            checked={true}
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            sx={{
              color: '#9e9e9e',
              '&.Mui-checked': {
                color: '#4CAF50',
              },
              padding: '4px',
              '& .MuiSvgIcon-root': {
                borderRadius: '3px',
              },
            }}
          />
          {current !== undefined && total !== undefined ? (
            <span className={styles.progressText}>{current}/{total}</span>
          ) : null}
        </div>
      </div>
      
      <div className={styles.avatarContainer}>
        <AvatarGroup max={3} className={styles.avatarGroup}>
          <Avatar 
            alt="Remy Sharp" 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            sx={{ width: 24, height: 24 }} 
          />
          <Avatar 
            alt="Travis Howard" 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            sx={{ width: 24, height: 24 }} 
          />
          <Avatar 
            sx={{ 
              width: 24, 
              height: 24, 
              bgcolor: 'grey.300', 
              color: 'grey.600',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            +2
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  );
};

export default ProgressSection;