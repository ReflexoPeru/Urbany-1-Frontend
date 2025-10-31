import React from "react";
import styles from "./AuthFlipForm.module.css";

const AuthFlipForm = ({ 
    isRegister = false,
    onToggleRegister,
    onToggleLogin,
    children,
    showFlip = true
}) => {
    if (!showFlip) {
        return (
            <div className={styles.container}>
                <div className={styles.form_box_no_flip}>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.container} ${isRegister ? styles.active : ''}`}>
            <div className={styles.form_box_login}>
                {children}
            </div>
            
            <div className={styles.toggle_box}>
                <div className={styles.toggle_panel_left}>
                    <h1>¡Hola, Bienvenido!</h1>
                    <p>¿No tienes cuenta?</p>
                    <button 
                        type="button"
                        className={styles.btn} 
                        onClick={onToggleRegister}
                    >
                        Registrarse
                    </button>
                </div>

                <div className={styles.toggle_panel_right}>
                    <h1>¡Bienvenido de nuevo!</h1>
                    <p>¿Ya tienes cuenta?</p>
                    <button 
                        type="button"
                        className={styles.btn}
                        onClick={onToggleLogin}
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthFlipForm;
