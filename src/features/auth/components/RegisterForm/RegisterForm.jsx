import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import { useToast } from "../../../../contexts/ToastContext";
import { useLoading } from "../../../../contexts/LoadingContext";
import { register } from "../../../../services/auth";
import urbanyLogo from "../../../../assets/urbany.png";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onContinue }) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirm: "",
        first_name: "",
        last_name: "",
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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "El email es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        if (!formData.password_confirm) {
            newErrors.password_confirm = "Confirma tu contraseña";
        } else if (formData.password !== formData.password_confirm) {
            newErrors.password_confirm = "Las contraseñas no coinciden";
        }

        if (!formData.first_name) {
            newErrors.first_name = "El nombre es requerido";
        }

        if (!formData.last_name) {
            newErrors.last_name = "El apellido es requerido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error(
                "Error de validación",
                "Por favor, corrige los errores en el formulario",
                3000,
                "WarningCircle"
            );
            return;
        }

        // Si hay un callback onContinue (para el flujo de registro de inmobiliaria)
        if (onContinue) {
            onContinue(formData);
            return;
        }

        // Registro normal
        try {
            showLoading("Creando tu cuenta...");

            const userData = {
                email: formData.email,
                password: formData.password,
                password_confirm: formData.password_confirm,
                first_name: formData.first_name,
                last_name: formData.last_name,
            };

            const response = await register(userData);

            hideLoading();

            toast.success(
                "¡Cuenta creada!",
                response.message || `Bienvenido ${formData.first_name}, ya puedes iniciar sesión.`,
                3000,
                "UserPlus"
            );

            // Redirigir al login después de un breve delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error("Error en registro:", error);
            hideLoading();

            // Manejar diferentes tipos de errores
            let errorTitle = "Error al registrar";
            let errorMessage = "No se pudo crear la cuenta. Intenta nuevamente.";
            let errorIcon = "XCircle";
            const newErrors = {};

            if (error.response?.status === 400) {
                errorTitle = "Datos inválidos";
                const errorData = error.response.data;

                if (errorData.email) {
                    if (Array.isArray(errorData.email)) {
                        newErrors.email = errorData.email[0];
                        if (errorData.email[0].toLowerCase().includes('ya existe') ||
                            errorData.email[0].toLowerCase().includes('already')) {
                            errorMessage = "Este email ya está registrado.";
                            errorIcon = "Envelope";
                        }
                    }
                }

                if (errorData.password) {
                    if (Array.isArray(errorData.password)) {
                        newErrors.password = errorData.password[0];
                    }
                }

                if (errorData.detail) {
                    errorMessage = errorData.detail.length > 60
                        ? errorData.detail.substring(0, 60) + '...'
                        : errorData.detail;
                } else if (errorData.message) {
                    errorMessage = errorData.message.length > 60
                        ? errorData.message.substring(0, 60) + '...'
                        : errorData.message;
                } else if (Object.keys(newErrors).length > 0) {
                    errorMessage = "Corrige los errores en el formulario";
                }
            } else if (error.response?.status === 409) {
                errorTitle = "Email ya registrado";
                errorMessage = "Este correo ya está en uso. Inicia sesión.";
                errorIcon = "Envelope";
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
                } else {
                    // Manejar errores de campos específicos
                    Object.keys(errorData).forEach(key => {
                        if (Array.isArray(errorData[key])) {
                            newErrors[key] = errorData[key][0];
                        } else if (typeof errorData[key] === 'string') {
                            newErrors[key] = errorData[key];
                        }
                    });

                    if (Object.keys(newErrors).length > 0) {
                        setErrors(newErrors);
                        errorMessage = "Corrige los errores en el formulario";
                    }
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

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
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
            <h1>Registro</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            <div className={styles.input_box}>
                <input
                    type="text"
                    name="first_name"
                    placeholder="Nombre"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className={errors.first_name ? styles.input_error : ""}
                />
                <User className={styles.icon} size={20} />
                {errors.first_name && (
                    <span className={styles.error_message}>{errors.first_name}</span>
                )}
            </div>

            <div className={styles.input_box}>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Apellido"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className={errors.last_name ? styles.input_error : ""}
                />
                <User className={styles.icon} size={20} />
                {errors.last_name && (
                    <span className={styles.error_message}>{errors.last_name}</span>
                )}
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={errors.password ? styles.input_error : ""}
                />
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
                {errors.password && (
                    <span className={styles.error_message}>{errors.password}</span>
                )}
            </div>

            <div className={styles.input_box}>
                <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="password_confirm"
                    placeholder="Confirmar contraseña"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    required
                    className={errors.password_confirm ? styles.input_error : ""}
                />
                <button
                    type="button"
                    className={styles.eye_button}
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                    {showPasswordConfirm ? (
                        <EyeOff className={styles.eye_icon} size={20} />
                    ) : (
                        <Eye className={styles.eye_icon} size={20} />
                    )}
                </button>
                {errors.password_confirm && (
                    <span className={styles.error_message}>{errors.password_confirm}</span>
                )}
            </div>

            <button type="submit" className={styles.btn}>
                {onContinue ? "Continuar" : "Registrarse"}
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
