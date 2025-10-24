import React, { useState } from "react";
import styles from "./Password.module.css";
import { Lock } from "phosphor-react";

const Password = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
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
      <form className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña actual</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword.current ? "text" : "password"}
                placeholder="Ingresar contraseña actual..."
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("current")}
                className={styles.eyeButton}
              >
                <i className={`fa ${showPassword.current ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nueva contraseña</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword.new ? "text" : "password"}
                placeholder="Ingresar nueva contraseña..."
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("new")}
                className={styles.eyeButton}
              >
                <i className={`fa ${showPassword.new ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirmar nueva contraseña</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Repetir nueva contraseña..."
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("confirm")}
                className={styles.eyeButton}
              >
                <i className={`fa ${showPassword.confirm ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.saveButton}>
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
