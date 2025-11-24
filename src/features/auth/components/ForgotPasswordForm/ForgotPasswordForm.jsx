import React, { useState } from "react";
import { Mail } from "lucide-react";
import urbanyLogo from "../../../../assets/urbany.png";
import recoveryImage from "../../../../assets/recovery.svg";
import styles from "./ForgotPasswordForm.module.css";

const ForgotPasswordForm = ({ onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!formData.email) {
            setErrors(prev => ({ ...prev, email: "El email es requerido" }));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: "Email inválido" }));
            return;
        }

        onSubmit(formData.email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>¿Olvidaste tu Contraseña?</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            <div className={styles.image_section}>
                <img src={recoveryImage} alt="Recovery" className={styles.recovery_image} />
            </div>

            <p className={styles.description}>
                Ingresa tu correo electrónico para continuar con el cambio de contraseña.
            </p>

            <div className={styles.input_box}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={errors.email ? styles.input_error : ""}
                />
                <Mail className={styles.icon} size={20} />
                {errors.email && (
                    <span className={styles.error_message}>{errors.email}</span>
                )}
            </div>

            <button type="submit" className={styles.btn}>Confirmar Correo</button>

            {onBack && (
                <div className={styles.back_link}>
                    <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>
                        Volver al login
                    </a>
                </div>
            )}
        </form>
    );
};

export default ForgotPasswordForm;
