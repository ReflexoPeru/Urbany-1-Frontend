import React from "react";
import styles from "./AuthFlipForm.module.css";

const AuthFlipForm = ({ 
    isRegister = false,
    onToggleRegister,
    onToggleLogin,
    children,
    showFlip = true,
    suppressPanels = false,
    invertLayout = false,
    showRegisterPanel = true,
    showLoginPanel = true,
    loginPanelLabel = "¡Bienvenido de nuevo!",
    loginPanelSubtitle = "¿Ya tienes cuenta?",
    loginButtonText = "Iniciar Sesión"
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
        <div
            className={[
                styles.container,
                isRegister ? styles.active : '',
                suppressPanels ? styles.hidePanels : '',
                invertLayout ? styles.invert : ''
            ].join(' ').trim()}
        >
            <div className={styles.form_box_login}>
                {children}
            </div>
            
            <div className={styles.toggle_box}>
                {showRegisterPanel && (
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
                )}

                {showLoginPanel && (
                    <div className={styles.toggle_panel_right}>
                        <h1>{loginPanelLabel}</h1>
                        <p>{loginPanelSubtitle}</p>
                        <button 
                            type="button"
                            className={styles.btn}
                            onClick={onToggleLogin}
                        >
                            {loginButtonText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthFlipForm;
