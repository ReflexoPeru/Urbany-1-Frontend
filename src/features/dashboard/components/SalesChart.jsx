import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Select from '@components/ui/Select';
import PanelCard from './ui/PanelCard/PanelCard';
import styles from './SalesChart.module.css';

const periodOptions = [
  { value: 'Semanal', label: 'Semanal' },
  { value: 'Mensual', label: 'Mensual' },
  { value: 'Trimestral', label: 'Trimestral' },
];

const SalesChart = ({ data, period, onChangePeriod, className }) => {
  const handlePeriodChange = ({ target }) => {
    onChangePeriod?.(target.value);
  };

  return (
    <PanelCard
      className={className}
      title="Negocio abierto por etapa"
      right={(
        <Select
          name="chart-period"
          value={period}
          onChange={handlePeriodChange}
          options={periodOptions}
          size="small"
          wrapperClassName={styles.selectInline}
        />
      )}
      bodyClassName={styles.body}
    >
      <div className={styles.chartWrapper}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38e47a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38e47a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="dia" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip cursor={false} />
            <Area type="monotone" dataKey="valor" stroke="#38e47a" fill="url(#colorValor)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </PanelCard>
  );
};

export default SalesChart;


