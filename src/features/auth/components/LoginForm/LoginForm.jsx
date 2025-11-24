import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useToast } from "../../../../contexts/ToastContext";
import { useLoading } from "../../../../contexts/LoadingContext";
import { login } from "../../../../services/auth";
import urbanyLogo from "../../../../assets/urbany.png";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
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

        // Validación básica
        if (!formData.email) {
            setErrors(prev => ({ ...prev, email: "El email es requerido" }));
            return;
        }
        if (!formData.password) {
            setErrors(prev => ({ ...prev, password: "La contraseña es requerida" }));
            return;
        }

        try {
            showLoading("Iniciando sesión...");
            const response = await login(formData.email, formData.password);

            hideLoading();

            toast.success(
                "¡Bienvenido!",
                response.message || `Hola ${response.user?.first_name || ''}, sesión iniciada correctamente`,
                3000,
                "SignIn"
            );

            // Redirigir al dashboard después de un breve delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            console.error("Error en login:", error);
            hideLoading();

            // Manejar diferentes tipos de errores
            let errorTitle = "Error al iniciar sesión";
            let errorMessage = "Credenciales incorrectas. Verifica tus datos.";
            let errorIcon = "WarningCircle";

            if (error.response?.status === 401) {
                errorTitle = "Credenciales incorrectas";
                errorMessage = "Email o contraseña incorrectos.";
                errorIcon = "Lock";
            } else if (error.response?.status === 403) {
                errorTitle = "Acceso denegado";
                errorMessage = "Sin permisos. Contacta al administrador.";
                errorIcon = "ShieldWarning";
            } else if (error.response?.status === 404) {
                errorTitle = "Servicio no disponible";
                errorMessage = "No se pudo conectar. Verifica tu conexión.";
                errorIcon = "WifiSlash";
            } else if (error.response?.status >= 500) {
                errorTitle = "Error del servidor";
                errorMessage = "Problemas en el servidor. Intenta más tarde.";
                errorIcon = "Server";
            } else if (error.response?.data) {
                const errorData = error.response.data;
                if (errorData.detail) {
                    errorMessage = errorData.detail.length > 60
                        ? errorData.detail.substring(0, 60) + '...'
                        : errorData.detail;
                } else if (errorData.message) {
                    errorMessage = errorData.message.length > 60
                        ? errorData.message.substring(0, 60) + '...'
                        : errorData.message;
                } else if (errorData.non_field_errors) {
                    errorMessage = errorData.non_field_errors[0].length > 60
                        ? errorData.non_field_errors[0].substring(0, 60) + '...'
                        : errorData.non_field_errors[0];
                } else if (errorData.email) {
                    setErrors(prev => ({ ...prev, email: errorData.email[0] }));
                    errorMessage = "Corrige los errores en el formulario";
                } else if (errorData.password) {
                    setErrors(prev => ({ ...prev, password: errorData.password[0] }));
                    errorMessage = "Corrige los errores en el formulario";
                }
            } else if (error.message) {
                if (error.message.includes('Network') || error.message.includes('network')) {
                    errorTitle = "Sin conexión";
                    errorMessage = "Verifica tu conexión a internet.";
                    errorIcon = "WifiSlash";
                } else {
                    errorMessage = error.message.length > 60
                        ? error.message.substring(0, 60) + '...'
                        : error.message;
                }
            }

            toast.error(
                errorTitle,
                errorMessage,
                5000,
                errorIcon
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            <div className={styles.input_box}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
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

            <div className={styles.input_box}>
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={errors.password ? styles.input_error : ""}
                />
                <Lock className={styles.icon} size={20} />
                {errors.password && (
                    <span className={styles.error_message}>{errors.password}</span>
                )}
            </div>

            <div className={styles.forgot_link}>
                <Link to="/forgot-password">¿Olvidaste la contraseña?</Link>
            </div>


            <button type="submit" className={styles.btn}>Login</button>

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
