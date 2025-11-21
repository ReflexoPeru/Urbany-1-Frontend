import React, { useState } from "react";
import { Lock } from "phosphor-react";
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import styles from "./Password.module.css";
import useProfile from '../services/useProfile';
import { useToast } from '../../../contexts/ToastContext';

const Password = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const { changePassword } = useProfile();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setStatusType('');
    try {
      const payload = {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirm: formData.confirmPassword,
      };
      const res = await changePassword(payload);
      toast.success('Contraseña actualizada', res?.message || 'Se guardaron los cambios correctamente');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error('Error al actualizar', 'No se pudo actualizar la contraseña');
    }
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