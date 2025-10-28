// src/features/dashboard/components/TodayTasks/TodayTasks.jsx
import React, { useState } from 'react';
import { Checkbox, Chip, Avatar, AvatarGroup, Stack, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import styles from './TodayTasks.module.css';

const TodayTasks = ({ tasks, showSeeMore = false }) => {
  const [checkedState, setCheckedState] = useState(
    tasks.map(() => false)
  );

  const handleCheckboxChange = (index) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedState(newCheckedState);
  };

  // Estados para las tareas
  const taskStatus = ["In Review", "In Progress"];

  return (
    <div className={styles.todayTasks}>
      <h3 className={styles.title}>Mis Tareas de Hoy</h3>
      
      <div className={styles.taskItem}>
        <div className={styles.taskContent}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskRow}>
              <div className={styles.taskLeft}>
                <Checkbox
                  checked={checkedState[index]}
                  onChange={() => handleCheckboxChange(index)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  className={styles.checkbox}
                />
                <span className={styles.taskText}>{task}</span>
              </div>
              
              <div className={styles.taskRight}>
                <Chip 
                  label={taskStatus[index]} 
                  size="small"
                  className={`${styles.statusChip} ${
                    taskStatus[index] === "In Review" ? styles.review : styles.progress
                  }`}
                />
                
                <Stack spacing={2}>
                  <AvatarGroup spacing="small" max={4}>
                    <Avatar 
                      alt="Remy Sharp" 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                    />
                    <Avatar 
                      alt="Travis Howard" 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                    />
                  </AvatarGroup>
                </Stack>
                
                <IconButton 
                  size="small" 
                  className={styles.menuButton}
                  aria-label="opciones"
                >
                  <MoreHoriz fontSize="small" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showSeeMore && (
        <button className={styles.seeMoreButton}>Ver Más</button>
      )}
    </div>
  );
};

export default TodayTasks;