import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import styles from './MiniCalendar.module.css';

const monthsEs = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const MiniCalendar = ({ value, onChange, className = '' }) => {
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const current = value ? dayjs(value) : dayjs();
  const startOfMonth = current.startOf('month');
  const endOfMonth = current.endOf('month');
  const startWeekday = (startOfMonth.day() + 6) % 7;
  const daysInMonth = endOfMonth.date();
  const days = useMemo(() => { const a = []; for (let i = 0; i < startWeekday; i++)a.push(null); for (let d = 1; d <= daysInMonth; d++)a.push(d); return a; }, [startWeekday, daysInMonth]);
  const years = useMemo(() => { const base = current.year(); return Array.from({ length: 13 }, (_, i) => base - 6 + i) }, [current]);
  const setMonth = (m) => { setOpenMonth(false); onChange?.(current.month(m)); };
  const setYear = (y) => { setOpenYear(false); onChange?.(current.year(y)); };
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <button className={styles.nav} onClick={() => onChange?.(current.subtract(1, 'year'))}>«</button>
        <button className={styles.nav} onClick={() => onChange?.(current.subtract(1, 'month'))}>‹</button>
        <div className={styles.selectorGroup}>
          <div className={styles.select} onClick={() => setOpenMonth(v => !v)}>{monthsEs[current.month()]}</div>
          <div className={styles.select} onClick={() => setOpenYear(v => !v)}>{current.year()}</div>
          {openMonth && (
            <ul className={styles.dropdown} role="listbox">
              {monthsEs.map((m, idx) => (<li key={m} className={styles.option} onClick={() => setMonth(idx)}>{m}</li>))}
            </ul>
          )}
          {openYear && (
            <ul className={styles.dropdown} style={{ left: 'auto', right: 0 }} role="listbox">
              {years.map(y => (<li key={y} className={styles.option} onClick={() => setYear(y)}>{y}</li>))}
            </ul>
          )}
        </div>
        <button className={styles.nav} onClick={() => onChange?.(current.add(1, 'month'))}>›</button>
        <button className={styles.nav} onClick={() => onChange?.(current.add(1, 'year'))}>»</button>
      </div>
      <div className={styles.weekdays}>{['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(w => (<div key={w} className={styles.week}>{w}</div>))}</div>
      <div className={styles.grid}>
        {days.map((d, i) => (<button key={i} className={`${styles.cell} ${d === current.date() ? styles.active : ''}`} disabled={!d} onClick={() => d && onChange?.(current.date(d))}>{d || ''}</button>))}
      </div>
    </div>
  );
};

export default MiniCalendar;


