// src/features/dashboard/components/BusinessOverview/BusinessOverview.jsx
import React from 'react';
import { DotsThree, CirclesThree, User, CheckSquare } from 'phosphor-react';
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from './BusinessOverview.module.css';

const data = [
  { dia: "Lu", valor: 50 },
  { dia: "Ma", valor: 70 },
  { dia: "Mi", valor: 45 },
  { dia: "Ju", valor: 75 },
  { dia: "Vi", valor: 55 },
  { dia: "Sa", valor: 85 },
  { dia: "Do", valor: 50 },
];

const BusinessOverview = () => {
  return (
    <div className={styles.businessOverview}>
      {/* Header con título y puntos */}
      <div className={styles.dots_container}>
        <h2>Negocios Activos</h2>
        <DotsThree size={24} />
      </div>

      {/* Tarjetas de negocios con colores personalizados */}
      <div className={styles.cards_main_container}>
        <div className={`${styles.cards_container} ${styles.nuevoNegocio}`}>
          <div className={styles.new_negocio}>
            <CirclesThree size={24} />
          </div>
          <h3>Nuevo Negocio</h3>
          <p>40</p>
        </div>

        <div className={`${styles.cards_container} ${styles.contactado}`}>
          <div className={styles.new_negocio}>
            <User size={24} />
          </div>
          <h3>Contactado</h3>
          <p>79</p>
        </div>

        <div className={styles.cards_container}>
          <div className={styles.new_negocio}>
            <CheckSquare size={24} />
          </div>
          <h3>Visita Programada</h3>
          <p>79</p>
        </div>
      </div>

      {/* Gráfico de Completion Rate */}
      <div className={styles.graficoCompletionContainer}>
        <div className={styles.completionInfo}>
          <h3 className={styles.completionTitle}>On-time Completion Rate</h3>
          <div className={styles.completionRate}>
            <h2>95%</h2>
            <p>+2,5%</p>
          </div>
        </div>

        <div className={styles.graficoContainer}>
          <ResponsiveContainer width="85%" height={80}>
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#007bff"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;