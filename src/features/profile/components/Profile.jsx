import React, { useState } from 'react';
import styles from './Profile.module.css';
import Password from './Password';
import Notifications from "./Notifications.jsx";
import Sessions from "./Sessions.jsx";
import { User, Lock, Bell, Monitor, Camera } from 'phosphor-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: ''
  });
  const [avatarUrl, setAvatarUrl] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-wtBeKb7tsRR-E7q5Tzg07gJ1RPUBpwfa8ps1GmjVd0Znpk8Bvg5m0cdv4QlqfiwFJk&usqp=CAU'
  );

  // 📌 Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 📌 Guardar cambios
  const handleSave = () => {
    // Función de guardar - solo vista
  };

  // 📌 Subir foto
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 📌 Tabs del perfil
  const tabs = [
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { id: 'password', label: 'Cambiar contraseña', icon: Lock },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'sessions', label: 'Sesiones activas', icon: Monitor }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* 🔹 Tabs dentro del cuadro */}
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              >
                <IconComponent size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 🔹 Contenido principal */}
        {activeTab === 'perfil' && (
          <div className={styles.content}>
            {/* Cabecera */}
            <div className={styles.header}>
              <div className={styles.headerText}>
                <h1 className={styles.title}>
                  <User size={20} />
                  Información de usuario
                </h1>
                <p className={styles.subtitle}>
                  Su información de usuario será visible en las publicaciones de sus inmuebles en los portales.
                </p>
              </div>

              <div className={styles.avatarContainer}>
                <img src={avatarUrl} alt="Avatar" className={styles.avatar} />
                <label className={styles.cameraButton}>
                  <Camera size={16} />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                </label>
              </div>
            </div>

            {/* Formulario */}
            <form className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre Completo</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${styles.disabled}`}
                    disabled
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tipo de usuario</label>
                  <input
                    type="text"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className={`${styles.input} ${styles.disabled}`}
                    disabled
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button type="button" onClick={handleSave} className={styles.saveButton}>
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 🔹 Componente Cambiar Contraseña */}
        {activeTab === 'password' && <Password />}

        {/* 🔹 Componente Notificaciones */}
        {activeTab === 'notifications' && <Notifications />}

        {/* 🔹 Componente Sesiones Activas */}
        {activeTab === 'sessions' && <Sessions />}

        {/* 🔹 Placeholder solo para futuras pestañas */}
        {!['perfil', 'password', 'notifications', 'sessions'].includes(activeTab) && (
          <div className={styles.placeholder}>
            <p>Contenido de "{tabs.find(t => t.id === activeTab)?.label}"</p>
            <p>Esta sección está en desarrollo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
