import React, { useState } from "react";
import styles from "../hooks/Sessions.module.css";
import { Trash2 } from "lucide-react"; // ícono elegante

export default function Sessions() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Edge en Windows 11",
      lastConnection: "22/08/2025",
    },
    {
      id: 2,
      device: "Edge en Windows 11",
      lastConnection: "22/08/2025",
    },
  ]);

  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className={styles.container}>
      {/* 🔹 Cabecera */}
      <div className={styles.header}>
        <h2 className={styles.title}>Sesiones activas</h2>
        <p className={styles.subtitle}>
          Desde aquí podrás ver los dispositivos en los cuales tienes una sesión activa.
        </p>
      </div>

      {/* 🔹 Lista de sesiones */}
      <div className={styles.sessionList}>
        <h3 className={styles.sectionTitle}>SESIONES ACTIVAS.</h3>
        <hr className={styles.divider} />

        {sessions.map((session) => (
          <div key={session.id} className={styles.sessionItem}>
            <div>
              <p className={styles.device}>{session.device}</p>
              <p className={styles.info}>ID:</p>
              <p className={styles.info}>Ult. Conexión: {session.lastConnection}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(session.id)}
              title="Cerrar sesión"
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 Paginación */}
      <div className={styles.pagination}>
        <button className={styles.pageButton}>Anterior</button>
        <span className={styles.pageActive}>1</span>
        <span className={styles.page}>2</span>
        <button className={styles.pageButton}>Siguiente</button>
      </div>
    </div>
  );
}
