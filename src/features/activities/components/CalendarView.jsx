import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import styles from './CalendarView.module.css';

const CalendarView = ({ activities, onAddActivity, onEditActivity }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getActivitiesForDate = (date) => {
    if (!date) return [];
    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button 
          className={styles.navButton}
          onClick={() => navigateMonth(-1)}
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className={styles.monthYear}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button 
          className={styles.navButton}
          onClick={() => navigateMonth(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.calendarGrid}>
        {dayNames.map(day => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          const dayActivities = getActivitiesForDate(date);
          const isToday = date && date.toDateString() === new Date().toDateString();
          
          return (
            <div 
              key={index} 
              className={`${styles.dayCell} ${isToday ? styles.today : ''}`}
            >
              {date && (
                <>
                  <div className={styles.dayNumber}>
                    {date.getDate()}
                  </div>
                  
                  <div className={styles.activities}>
                    {dayActivities.slice(0, 3).map((activity, activityIndex) => (
                      <div 
                        key={activityIndex}
                        className={`${styles.activityItem} ${styles[activity.priority]}`}
                        onClick={() => onEditActivity(activity)}
                        title={activity.title}
                      >
                        {activity.title}
                      </div>
                    ))}
                    
                    {dayActivities.length > 3 && (
                      <div className={styles.moreActivities}>
                        +{dayActivities.length - 3} más
                      </div>
                    )}
                  </div>
                  
                  {dayActivities.length === 0 && (
                    <button 
                      className={styles.addButton}
                      onClick={() => onAddActivity(date)}
                      title="Añadir actividad"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
