import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../common/InputField/InputField";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/dashboard');
    };

    return (
        <div className={styles.form}>
            <div className={styles.inputs_container}>
                <InputField
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    placeholder="ejemplo@gmail.com"
                />
                <InputField
                    label="Contraseña"
                    id="password"
                    type="password"
                    placeholder="*********"
                />
            </div>

            <div className={styles.remember_forgot}>
                <div className={styles.remember_me}>
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Recuérdame</label>
                </div>
                <a href="#" className={styles.forgot_password}>
                    ¿Olvidaste la contraseña?
                </a>
            </div>

            <button type="button" className={styles.login_button} onClick={handleClickLogin}>
                Iniciar sesión
            </button>
        </div>
    );
};

export default LoginForm;