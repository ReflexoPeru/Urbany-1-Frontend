import React, { useState } from "react";
import styles from "./Activities.module.css";

// 🔹 Íconos comentados temporalmente

import {
  Phone,
  ListBulletsIcon,
  EnvelopeSimple,
  House,
  Users,
  FileText,
  PenNib,
  User,
  Circle,
  Calendar,
  PlusCircle,
} from "@phosphor-icons/react";


// 🔹 Mapeo de íconos por tipo de actividad (desactivado)

const iconMap = {
  Agente: <User size={18} weight="bold" />,
  Llamada: <Phone size={18} weight="bold" />,
  Correo: <EnvelopeSimple size={18} weight="bold" />,
  Visita: <House size={18} weight="bold" />,
  Reunión: <Users size={18} weight="bold" />,
  Tasación: <FileText size={18} weight="bold" />,
  Firma: <PenNib size={18} weight="bold" />,
  Otro: <Circle size={18} weight="bold" />,
};


const Activities = () => {
  const [filter, setFilter] = useState("Todos");
  const [show, setShow] = useState("Hoy");

  const filters = ["Todos", "Agente", "Llamada", "Correo", "Visita", "Reunión", "Tasación", "Firma", "Otro"];
  const periods = ["Por hacer", "Vencido", "Hoy", "Mañana", "Esta semana"];

  // 🔹 Arranca vacío
  const activities = [];

  const filtered = activities.filter(
    (a) =>
      (filter === "Todos" || a.tipo === filter) &&
      (show === "Hoy" ? a.fecha === "Hoy" : true)
  );

  return (

    <div className={styles.content} >
      <h1 className={styles.title}>Actividades</h1>
      <div className={styles.iconGroup}>
        <ListBulletsIcon size={24} weight="bold" className={styles.secondIcon} />
        <Calendar size={24} weight="bold" className={styles.calendarIcon} />
        <button className={styles.addBtn}>
          Añadir nueva actividad
        </button>
      </div>

      <header className={styles.header}>
        <section className={styles.filters}>
        <div>
          <span>Filtrar por:</span>
          {filters.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ""}`}
              onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div>
          <span>Mostrar por:</span>
          {periods.map((p) => (
            <button
              key={p}
              className={`${styles.filterBtn} ${show === p ? styles.active : ""}`}
              onClick={() => setShow(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </section>
      </header>

       <main className={styles.content}>
        {filtered.length > 0 ? (
          <ul className={styles.list}>
            {filtered.map((a, i) => (
              <li key={i} className={styles.item}>
                {/* <div className={styles.icon}>{iconMap[a.tipo] || <Circle />}</div> */}
                <div>
                  <strong>{a.tipo}</strong> - {a.descripcion} ({a.fecha})
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <div className={styles.illustration}>🎯</div>
            <h2>¡Bien hecho!</h2>
            <p>Has completado tus tareas. Tómate tu tiempo y recupera fuerzas.</p>
            <button className={styles.addbtn}>
              Añadir nueva actividad
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Activities;
