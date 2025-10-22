import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.phone) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
    console.log('Guardando datos:', formData);
    // Aquí puedes agregar lógica para enviar los datos al backend
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Nueva imagen:', reader.result);
        // Aquí podrías actualizar el estado con la nueva imagen si lo deseas
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Cabecera */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Información de usuario</h1>
            <p className={styles.subtitle}>
              Su información de usuario será visible en las publicaciones de sus inmuebles en los portales.
            </p>
          </div>

          <div className={styles.avatarContainer}>
            <img
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&h=150&fit=crop&crop=face"
              alt="Avatar"
              className={styles.avatar}
            />
            <label className={styles.cameraButton}>
              📷
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
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="tu@email.com"
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
                placeholder="+51 999 999 999"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tipo de usuario</label>
              <input
                type="text"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className={styles.input}
                disabled
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSave}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;