import React, { useState } from "react";
import { Bell } from "phosphor-react";
import Button from '../../../components/ui/Button/Button';
import styles from "./Notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    negocio: false,
    negocioEmail: true,
    whatsapp: true,
    actividadesEmail: true,
    novedades: true,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.content}>
      {/* 🔹 Título y subtítulo */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Bell size={20} />
          Centro de notificaciones
        </h1>
        <p className={styles.subtitle}>
          Desde aquí podrás configurar las notificaciones que deseas recibir, tanto las de escritorio
          como las de correo electrónico.
        </p>
        <p className={styles.subtitle}>
          Recuerda activar las notificaciones de escritorio para recibir todas tus novedades.
        </p>
      </div>

      {/* 🔹 Botón de activar */}
      <button className={styles.activateButton}>Activar notificaciones</button>

      {/* 🔹 Secciones */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Negocios</h3>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={notifications.negocio}
            onChange={() => handleToggle("negocio")}
          />
          <span className={styles.switch}></span>
          Notifícame cuando cree un nuevo negocio
        </label>

        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={notifications.negocioEmail}
            onChange={() => handleToggle("negocioEmail")}
          />
          <span className={styles.switch}></span>
          Notifícame por email cuando se cree un nuevo negocio
        </label>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>WhatsApp</h3>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={notifications.whatsapp}
            onChange={() => handleToggle("whatsapp")}
          />
          <span className={styles.switch}></span>
          Notifícame cuando reciba un nuevo mensaje
        </label>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Actividades</h3>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={notifications.actividadesEmail}
            onChange={() => handleToggle("actividadesEmail")}
          />
          <span className={styles.switch}></span>
          Notifícame por email las actividades que tengo agendadas para el día de hoy
        </label>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Novedades</h3>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={notifications.novedades}
            onChange={() => handleToggle("novedades")}
          />
          <span className={styles.switch}></span>
          Notifícame las actualizaciones y novedades del CRM
        </label>
      </div>

      <div className={styles.buttonRow}>
        <Button variant="primary">Guardar cambios</Button>
      </div>
    </div>
  );
};

export default Notifications;