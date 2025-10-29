import React, { useState } from "react";
import { Monitor, Trash } from "phosphor-react";
import Button from '../../../components/ui/Button/Button';
import styles from "./Sessions.module.css";

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
        <h2 className={styles.title}>
          <Monitor size={20} />
          Sesiones activas
        </h2>
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
            <Button
              variant="danger"
              size="small"
              onClick={() => handleDelete(session.id)}
              icon="trash"
            >

            </Button>
          </div>
        ))}
      </div>


    </div>
  );
}