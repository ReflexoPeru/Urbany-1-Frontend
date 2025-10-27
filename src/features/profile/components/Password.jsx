import React, { useState } from "react";
import { Lock } from "phosphor-react";
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import styles from "./Password.module.css";

const Password = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Función de guardar - solo vista
  };

  return (
    <div className={styles.content}>
      {/* 🔹 Encabezado */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>
            <Lock size={20} />
            Cambiar Contraseña
          </h1>
          <p className={styles.subtitle}>
            Protege tus datos creando una contraseña que sea compleja y tenga la longitud suficiente. <br />
            Debe resultarte fácil de recordar pero difícil de adivinar para los demás.
          </p>
        </div>
      </div>

      {/* 🔹 Formulario */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <Input
              label="Contraseña actual"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Ingresar contraseña actual..."
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Nueva contraseña"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Ingresar nueva contraseña..."
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              label="Confirmar nueva contraseña"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repetir nueva contraseña..."
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button type="submit" variant="primary">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Password;