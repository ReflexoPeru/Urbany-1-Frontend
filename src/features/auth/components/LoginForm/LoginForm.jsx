import React, { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import urbanyLogo from "../../../../assets/urbany.png";
import { useLogin } from "../../hooks/useLogin";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error, clearError } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        await login(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            {error && (
                <div className={styles.error_message}>
                    <AlertCircle className={styles.error_icon} size={16} />
                    <span>{error}</span>
                </div>
            )}

            <div className={styles.input_box}>
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        clearError();
                    }}
                    required 
                    disabled={loading}
                />
                <Mail className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        clearError();
                    }}
                    required 
                    disabled={loading}
                />
                <Lock className={styles.icon} size={20} />
            </div>

            <div className={styles.forgot_link}>
                <a href="#">¿Olvidaste la contraseña?</a>
            </div>

            <button 
                type="submit" 
                className={styles.btn}
                disabled={loading}
            >
                {loading ? 'Iniciando sesión...' : 'Login'}
            </button>

            <p>o inicia sesión con</p>

            <div className={styles.social_icons}>
                <a href="#"><i className="bx bxl-google"></i></a>
                <a href="#"><i className="bx bxl-facebook"></i></a>
                <a href="#"><i className="bx bxl-github"></i></a>
                <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
        </form>
    );
};

export default LoginForm;
