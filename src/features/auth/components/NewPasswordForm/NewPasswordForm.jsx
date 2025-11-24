import React, { useState } from "react";
import { Lock } from "lucide-react";
import urbanyLogo from "../../../../assets/urbany.png";
import recoveryImage from "../../../../assets/recovery.svg";
import styles from "./NewPasswordForm.module.css";

const NewPasswordForm = ({ email, onSubmit, showOldPassword = false, onOldPasswordChange, onBack }) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === "oldPassword" && onOldPasswordChange) {
            onOldPasswordChange(value);
        }
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (showOldPassword && !formData.oldPassword) {
            setErrors(prev => ({ ...prev, oldPassword: "La contraseña anterior es requerida" }));
            return;
        }

        if (!formData.newPassword) {
            setErrors(prev => ({ ...prev, newPassword: "La contraseña es requerida" }));
            return;
        }

        if (formData.newPassword.length < 8) {
            setErrors(prev => ({ ...prev, newPassword: "La contraseña debe tener al menos 8 caracteres" }));
            return;
        }

        if (!formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "Confirma tu contraseña" }));
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
            return;
        }

        onSubmit(formData.newPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Cambiar Contraseña</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            <div className={styles.image_section}>
                <img src={recoveryImage} alt="Recovery" className={styles.recovery_image} />
            </div>

            {email && (
                <p className={styles.description}>
                    Cambiando contraseña para: <strong>{email}</strong>
                </p>
            )}

            {showOldPassword && (
                <div className={styles.input_box}>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Contraseña Anterior"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required
                        className={errors.oldPassword ? styles.input_error : ""}
                    />
                    <Lock className={styles.icon} size={20} />
                    {errors.oldPassword && (
                        <span className={styles.error_message}>{errors.oldPassword}</span>
                    )}
                </div>
            )}

            <div className={styles.input_box}>
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Nueva Contraseña"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className={errors.newPassword ? styles.input_error : ""}
                />
                <Lock className={styles.icon} size={20} />
                {errors.newPassword && (
                    <span className={styles.error_message}>{errors.newPassword}</span>
                )}
            </div>

            <div className={styles.input_box}>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={errors.confirmPassword ? styles.input_error : ""}
                />
                <Lock className={styles.icon} size={20} />
                {errors.confirmPassword && (
                    <span className={styles.error_message}>{errors.confirmPassword}</span>
                )}
            </div>

            <button type="submit" className={styles.btn}>Confirmar Contraseña</button>

            {onBack && (
                <div className={styles.back_link}>
                    <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>
                        Volver
                    </a>
                </div>
            )}
        </form>
    );
};

export default NewPasswordForm;
