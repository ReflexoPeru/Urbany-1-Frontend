import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../common/InputField/InputField";
import styles from "./LoginForm.module.css";
import { mockLogin } from "../../../../..//mock/login"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await mockLogin(email, password);

        setLoading(false);

        if (result.success) {
            console.log("✅ Usuario logueado:", result.user);

            // Guardar token E información del usuario
            localStorage.setItem("token", result.user.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            alert(`Bienvenido, ${result.user.name}!`);
            navigate('/dashboard')
        } else {
            alert(result.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputs_container}>
                <InputField
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Contraseña"
                    id="password"
                    type="password"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            <button type="submit" className={styles.login_button} disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
        </form>
    );
};

export default LoginForm;