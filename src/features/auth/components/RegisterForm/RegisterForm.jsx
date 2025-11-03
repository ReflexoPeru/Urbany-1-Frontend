import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import urbanyLogo from "../../../../assets/urbany.png";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            navigate('/register-inmobiliaria');
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registro</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            <div className={styles.input_box}>
                <input type="text" placeholder="Usuario" required />
                <User className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input type="email" placeholder="Correo electrónico" required />
                <Mail className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input type={showPassword ? "text" : "password"} placeholder="Contraseña" required />
                <button 
                    type="button"
                    className={styles.eye_button}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className={styles.eye_icon} size={20} />
                    ) : (
                        <Eye className={styles.eye_icon} size={20} />
                    )}
                </button>
            </div>

            <button type="submit" className={styles.btn}>Registrar</button>

            <p>o regístrate con</p>

            <div className={styles.social_icons}>
                <a href="#"><i className="bx bxl-google"></i></a>
                <a href="#"><i className="bx bxl-facebook"></i></a>
                <a href="#"><i className="bx bxl-github"></i></a>
                <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
        </form>
    );
};

export default RegisterForm;
