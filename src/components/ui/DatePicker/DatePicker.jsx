import React, { useState, useRef, useEffect } from 'react';
import { IconCalendar, IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import styles from './DatePicker.module.css';

const DatePicker = ({
  label,
  placeholder = 'Seleccionar fecha',
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  minDate,
  maxDate,
  size = 'medium',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setCurrentMonth(date);
    }
  }, [value]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevMonth = new Date(year, month - 1, 0);
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isPreviousMonth: true,
        fullDate: new Date(year, month - 1, prevMonth.getDate() - i)
      });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      days.push({
        date: day,
        isCurrentMonth: true,
        isPreviousMonth: false,
        fullDate
      });
    }

    // Días del mes siguiente
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      const fullDate = new Date(year, month + 1, day);
      days.push({
        date: day,
        isCurrentMonth: false,
        isPreviousMonth: false,
        fullDate
      });
    }

    return days;
  };

  const isDateDisabled = (date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDateSelect = (day) => {
    if (day.isPreviousMonth || isDateDisabled(day.fullDate)) return;
    
    setSelectedDate(day.fullDate);
    onChange?.(day.fullDate);
    setIsOpen(false);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange?.(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const containerClasses = [
    styles.container,
    styles[size],
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    isOpen ? styles.open : '',
    className
  ].filter(Boolean).join(' ');

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div 
        ref={inputRef}
        className={containerClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={isOpen}
        {...props}
      >
        <div className={styles.inputContent}>
          <IconCalendar size={18} className={styles.calendarIcon} />
          <span className={styles.selectedValue}>
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
        </div>

        <div className={styles.actions}>
          {selectedDate && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              tabIndex={-1}
            >
              <IconX size={16} />
            </button>
          )}
        </div>

        {isOpen && (
          <div ref={calendarRef} className={styles.calendar}>
            <div className={styles.calendarHeader}>
              <button
                type="button"
                className={styles.navButton}
                onClick={handlePreviousMonth}
                tabIndex={-1}
              >
                <IconChevronLeft size={16} />
              </button>
              
              <h3 className={styles.monthYear}>
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <button
                type="button"
                className={styles.navButton}
                onClick={handleNextMonth}
                tabIndex={-1}
              >
                <IconChevronRight size={16} />
              </button>
            </div>

            <div className={styles.daysOfWeek}>
              {daysOfWeek.map(day => (
                <div key={day} className={styles.dayOfWeek}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.daysGrid}>
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.day} ${
                    day.isCurrentMonth ? styles.currentMonth : styles.otherMonth
                  } ${isDateSelected(day.fullDate) ? styles.selected : ''} ${
                    isToday(day.fullDate) ? styles.today : ''
                  } ${isDateDisabled(day.fullDate) ? styles.disabled : ''}`}
                  onClick={() => handleDateSelect(day)}
                  disabled={isDateDisabled(day.fullDate)}
                  tabIndex={-1}
                >
                  {day.date}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {helperText && !error && (
        <div className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default DatePicker;


