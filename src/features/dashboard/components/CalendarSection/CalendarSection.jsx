
//Seccion de calendario
// src/features/dashboard/components/CalendarSection/CalendarSection.jsx
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'dayjs/locale/es'; // Importar la localización española
import styles from './CalendarSection.module.css';

const CalendarSection = () => {
  return (
    <div className={styles.calendarSection}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DateCalendar />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarSection;