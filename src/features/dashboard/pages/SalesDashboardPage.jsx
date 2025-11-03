// src/features/dashboard/pages/SalesDashboardPage.jsx
import React, { useMemo, useState } from 'react';
import styles from './SalesDashboardPage.module.css';
import PanelCard from '../components/ui/PanelCard/PanelCard';
import KpiCard from '../components/KpiCard/KpiCard';
import MiniCalendar from '../components/MiniCalendar/MiniCalendar';
import SalesChart from '../components/SalesChart';
import ActiveSummary from '../components/ActiveSummary';
import WalletValue from '../components/WalletValue';
import TasksList from '../components/TasksList';
import ZoneFilters from '../components/ZoneFilters';
import { useDashboard } from '../hooks/useDashboard';
import { Row, Col } from 'antd';
import { BriefcaseBusiness, BadgeCheck, UsersRound } from 'lucide-react';

const SalesDashboardPage = () => {
  const { data, users, tasks, walletPen, zonePeriod, zoneView, setZonePeriod, setZoneView, addTask, toggleTask, deleteTask } = useDashboard();
  const [period, setPeriod] = useState('Semanal');
  const [calendarValue, setCalendarValue] = useState();

  const chartData = useMemo(() => {
    if (period === 'Semanal') return data.chart;
    if (period === 'Mensual') return data.chart.map(p => ({ ...p, valor: Math.min(100, Math.round(p.valor * 1.1)) }));
    return data.chart.map(p => ({ ...p, valor: Math.max(0, Math.round(p.valor * 0.9)) }));
  }, [data.chart, period]);

  return (
    <div className={styles.dashboard}>
      <Row gutter={16} align="stretch">
        <Col span={18}>
          <PanelCard title="Ventas Concretas" className={styles.surfaceCard}>
            <div className={styles.progressGrid}>
              <KpiCard icon={BriefcaseBusiness} title="Cantidad de Operaciones" percent={data.progress.operations.percent} current={data.progress.operations.current} total={data.progress.operations.total} users={data.progress.users} description="Operaciones en curso del equipo durante el período actual" />
              <KpiCard icon={BadgeCheck} title="Ventas Concretadas" percent={data.progress.sales.percent} current={data.progress.sales.current} total={data.progress.sales.total} users={data.progress.users} description="Cierres confirmados registrados en el CRM" />
              <KpiCard icon={UsersRound} title="Negocios abiertos por usuario" percent={data.progress.userOpen.percent} current={data.progress.userOpen.current} total={data.progress.userOpen.total} users={data.progress.users} description="Promedio de oportunidades activas por asesor" />
            </div>
          </PanelCard>
        </Col>
        <Col span={6}>
          <MiniCalendar value={calendarValue} onChange={setCalendarValue} className={styles.surfaceCard} />
        </Col>
      </Row>

      <div className={styles.row}>
        <div className={styles.col40}>
          <div className={styles.chartContainer}>
            <SalesChart data={chartData} period={period} onChangePeriod={setPeriod} className={styles.surfaceCard} />
          </div>
        </div>
        <div className={styles.col40}>
          <div className={styles.businessContainer}>
            <ActiveSummary counts={data.businessCounts} rate={data.completionRate} spark={data.completionSpark} className={styles.surfaceCard} />
          </div>
        </div>
        <div className={styles.col20}>
          <div className={styles.walletContainer}>
            <WalletValue valuePen={walletPen} className={styles.surfaceCard} />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col80}>
          <TasksList tasks={tasks} users={users} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} className={styles.surfaceCard} />
        </div>
        <div className={styles.col40}>
          <ZoneFilters period={zonePeriod} view={zoneView} onChangePeriod={setZonePeriod} onChangeView={setZoneView} className={styles.surfaceCard} />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardPage;