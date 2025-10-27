// src/features/dashboard/pages/SalesDashboardPage.jsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from './SalesDashboardPage.module.css';
import CarteraCard from '../components/CarteraCard/CarteraCard';
import CalendarSection from '../components/CalendarSection/CalendarSection';
import LineChartComponent from '../components/LineChartComponent/LineChartComponent';
import BusinessOverview from '../components/BusinessOverview/BusinessOverview';
import ProgressSection from '../components/ProgressSection/ProgressSection';
import TodayTasks from '../components/TodayTasks/TodayTasks';
import SalesByZone from '../components/SalesByZone/SalesByZone';
import { salesService } from '../services/salesService';

const SalesDashboardPage = () => {
  const dashboardData = salesService.getDashboardData();

  return (
    <div className={styles.dashboard}>
      {/* Fila 1 - Ventas Concretas en 3 columnas */}
      <div className={styles.row}>
        <div className={styles.col80}>
          <div className={styles.salesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Ventas Concretas</h2>
              <IconButton 
                className={styles.menuButton}
                size="small"
                aria-label="menu"
              >
                <MoreHorizIcon />
              </IconButton>
            </div>
            <div className={styles.progressGrid}>
              <ProgressSection 
                title="Cantidad de Operaciones" 
                current={8} 
                total={15} 
              />
              <ProgressSection 
                title="Ventas Concretadas" 
                current={8} 
                total={40} 
              />
              <ProgressSection 
                title="Negocios abiertos por usuario" 
                current={40} 
                total={55} 
              />
            </div>
          </div>
        </div>
        
        <div className={styles.col20}>
          <CalendarSection />
        </div>
      </div>

      {/* Resto del código permanece igual */}
      <div className={styles.row}>
        <div className={styles.col40}>
          <div className={styles.chartContainer}>
            <LineChartComponent />
          </div>
        </div>
        
        <div className={styles.col40}>
          <div className={styles.businessContainer}>
            <BusinessOverview />
          </div>
        </div>
        
        <div className={styles.col20}>
          <CarteraCard />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col80}>
          <TodayTasks tasks={dashboardData.tasks} />
        </div>
        
        <div className={styles.col40}> {/* Aumentado de col20 a col30 */}
          <SalesByZone data={dashboardData.salesByZone} />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardPage;