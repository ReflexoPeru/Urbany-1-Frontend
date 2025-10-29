//Grafico linea de negocio abierto por etapa
// src/features/dashboard/components/LineChartComponent/LineChartComponent.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { CaretDown } from 'phosphor-react';
import styles from './LineChartComponent.module.css';

const data = [
  { dia: "Lu", valor: 35 },
  { dia: "Mar", valor: 55 },
  { dia: "Mier", valor: 32 },
  { dia: "Jue", valor: 65 },
  { dia: "Vier", valor: 46 },
  { dia: "Sab", valor: 72 },
  { dia: "Do", valor: 50 },
];

const LineChartComponent = () => {
  return (
    <div className={styles.graficoContainer}>
      {/* Header con título y selector Semanal */}
      <div className={styles.chartHeader}>
        <h3>Negocio abierto por etapa</h3>
        <div className={styles.selector}>
          <span>Semanal</span>
          <CaretDown size={16} />
        </div>
      </div>
      
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007bff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#007bff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="dia"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              animationDuration={100}
              cursor={false}
              contentStyle={{
                backgroundColor: "#1f2937",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
              }}
              labelStyle={{ color: "#fff" }}
              
            />
            
            <Area 
              type="monotone" 
              dataKey="valor" 
              stroke="#007bff" 
              fill="url(#colorValor)" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;