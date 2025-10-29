import React from "react";
import { useNavigate } from "react-router-dom"
import styles from "./RegisterForm.module.css";
import InputField from "../../common/InputField/InputField";

const RegisterForm = () => {
    const navigate = useNavigate();
    const handleContinue = () => {
        navigate('/register-inmobiliaria');
    };

    return (
        <div className={styles.form}>
            {/* Campo Email */}
            <div className={styles.inputs_container}>
                <InputField
                    label="Correo electrónico"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="pipomontalvan@gmail.com"
                />
                <InputField
                    label="Contraseña"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*********"
                />
                <InputField
                    label="Confirmar Contraseña"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="*********"
                />
            </div>
            <button type="button" className={styles.register_button} onClick={handleContinue}>
                Continuar
            </button>
        </div>
    )
}

export default RegisterForm;