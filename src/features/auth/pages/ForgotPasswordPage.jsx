import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";
import NewPasswordForm from "../components/NewPasswordForm/NewPasswordForm";
import { useToast } from "../../../contexts/ToastContext";
import { useLoading } from "../../../contexts/LoadingContext";
import { useChangePassword } from "../../../hooks/useChangePassword";
import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const { loginToGetToken, changePasswordWithToken } = useChangePassword();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [accessToken, setAccessToken] = useState("");

    const handleEmailSubmit = async (emailValue) => {
        setEmail(emailValue);
        toast.info(
            "Siguiente paso",
            "Ahora ingresa tu contraseña actual y la nueva contraseña",
            3000,
            "Info"
        );
        setStep(2);
    };

    const handlePasswordSubmit = async (newPassword) => {
        showLoading("Verificando credenciales...");
        
        try {
            const loginResponse = await loginToGetToken(email, oldPassword);
            
            if (loginResponse.tokens && loginResponse.tokens.access) {
                const token = loginResponse.tokens.access;
                setAccessToken(token);
                
                showLoading("Actualizando contraseña...");
                
                try {
                    await changePasswordWithToken(token, oldPassword, newPassword, newPassword);
                    hideLoading();
                    toast.success(
                        "¡Contraseña actualizada!",
                        "Tu contraseña ha sido cambiada exitosamente",
                        3000,
                        "CheckCircle"
                    );
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                } catch (passwordError) {
                    hideLoading();
                    
                    let errorMessage = "No se pudo actualizar la contraseña";
                    
                    if (passwordError.response?.data) {
                        const errorData = passwordError.response.data;
                        if (errorData.old_password) {
                            errorMessage = Array.isArray(errorData.old_password) 
                                ? errorData.old_password[0] 
                                : errorData.old_password;
                        } else if (errorData.new_password) {
                            errorMessage = Array.isArray(errorData.new_password) 
                                ? errorData.new_password[0] 
                                : errorData.new_password;
                        } else if (errorData.message) {
                            errorMessage = errorData.message;
                        } else if (errorData.detail) {
                            errorMessage = errorData.detail;
                        }
                    }
                    
                    toast.error(
                        "Error al cambiar contraseña",
                        errorMessage,
                        4000,
                        "WarningCircle"
                    );
                }
            } else {
                hideLoading();
                toast.error(
                    "Error de autenticación",
                    "No se pudo obtener el token de acceso",
                    3000,
                    "WarningCircle"
                );
            }
        } catch (loginError) {
            hideLoading();
            
            let errorMessage = "Email o contraseña incorrectos";
            
            if (loginError.response?.data) {
                const errorData = loginError.response.data;
                if (errorData.detail) {
                    errorMessage = errorData.detail;
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                } else if (errorData.email) {
                    errorMessage = Array.isArray(errorData.email) 
                        ? errorData.email[0] 
                        : errorData.email;
                } else if (errorData.password) {
                    errorMessage = Array.isArray(errorData.password) 
                        ? errorData.password[0] 
                        : errorData.password;
                }
            }
            
            toast.error(
                "Error de autenticación",
                errorMessage,
                4000,
                "WarningCircle"
            );
        }
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <div className={styles.forgot_password_container}>
            <div className={styles.card}>
                {step === 1 && (
                    <ForgotPasswordForm
                        onSubmit={handleEmailSubmit}
                        onBack={handleBackToLogin}
                    />
                )}
                {step === 2 && (
                    <NewPasswordForm
                        email={email}
                        onSubmit={handlePasswordSubmit}
                        showOldPassword={true}
                        onOldPasswordChange={setOldPassword}
                        onBack={() => setStep(1)}
                    />
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
