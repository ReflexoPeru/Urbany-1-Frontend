import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from './GraficoContainer.module.css'; // Asegúrate de crear este CSS

const data = [
  { dia: "Lu", valor: 50 },
  { dia: "Ma", valor: 70 },
  { dia: "Mi", valor: 45 },
  { dia: "Ju", valor: 75 },
  { dia: "Vi", valor: 55 },
  { dia: "Sa", valor: 85 },
  { dia: "Do", valor: 50 },
];

const GraficoContainer = () => {
  return (
    <div className={styles.graficoContainer}>
      <h3>Negocio abierto por etapa</h3>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2f3640",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#007bff"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoContainer;