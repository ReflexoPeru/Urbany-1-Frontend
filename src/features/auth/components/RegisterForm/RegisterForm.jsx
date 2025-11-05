import React, { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import urbanyLogo from "../../../../assets/urbany.png";
import { useRegister } from "../../hooks/useRegister";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [localError, setLocalError] = useState(null);
    const { register, loading, error, clearError } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        setLocalError(null);

        // Validar que las contraseñas coincidan
        if (password !== password_confirm) {
            setLocalError('Las contraseñas no coinciden');
            return;
        }

        await register(email, password, password_confirm, first_name, last_name);
    };

    const displayError = localError || error;

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registro</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            {displayError && (
                <div className={styles.error_message}>
                    <AlertCircle className={styles.error_icon} size={16} />
                    <span>{displayError}</span>
                </div>
            )}

            <div className={styles.input_box}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={first_name}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                        clearError();
                        setLocalError(null);
                    }}
                    required
                    disabled={loading}
                />
                <User className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input
                    type="text"
                    placeholder="Apellido"
                    value={last_name}
                    onChange={(e) => {
                        setLastName(e.target.value);
                        clearError();
                        setLocalError(null);
                    }}
                    required
                    disabled={loading}
                />
                <User className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        clearError();
                        setLocalError(null);
                    }}
                    required
                    disabled={loading}
                />
                <Mail className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        clearError();
                        setLocalError(null);
                    }}
                    required
                    disabled={loading}
                />
                <button
                    type="button"
                    className={styles.eye_button}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                >
                    {showPassword ? (
                        <EyeOff className={styles.eye_icon} size={20} />
                    ) : (
                        <Eye className={styles.eye_icon} size={20} />
                    )}
                </button>
            </div>

            <div className={styles.input_box}>
                <input
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    value={password_confirm}
                    onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                        clearError();
                        setLocalError(null);
                    }}
                    required
                    disabled={loading}
                />
                <button
                    type="button"
                    className={styles.eye_button}
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    disabled={loading}
                >
                    {showPasswordConfirm ? (
                        <EyeOff className={styles.eye_icon} size={20} />
                    ) : (
                        <Eye className={styles.eye_icon} size={20} />
                    )}
                </button>
            </div>

            <button
                type="submit"
                className={styles.btn}
                disabled={loading}
            >
                {loading ? 'Registrando...' : 'Registrar'}
            </button>

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
