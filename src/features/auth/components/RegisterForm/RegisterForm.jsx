import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            navigate('/register-inmobiliaria');
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registro</h1>

            <div className={styles.input_box}>
                <input type="text" placeholder="Usuario" required />
                <User className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input type="email" placeholder="Correo electrónico" required />
                <Mail className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input type="password" placeholder="Contraseña" required />
                <Lock className={styles.icon} size={20} />
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
