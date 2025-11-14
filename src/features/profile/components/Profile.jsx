import React, { useState } from 'react';
import { User, Camera } from 'phosphor-react';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import styles from './Profile.module.css';

const Profile = () => {
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

  return (
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
            <Input
              label="Nombre Completo"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Teléfono"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+51 999 900 900"
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Tipo de usuario"
              type="text"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              placeholder="Tipo de usuario"
              disabled
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            type="button"
            onClick={handleSave}
            variant="primary"
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;