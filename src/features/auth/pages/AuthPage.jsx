import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthFlipForm from "../components/AuthFlipForm/AuthFlipForm";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(location.pathname === '/register');

    const handleToggleRegister = () => {
        setIsRegister(true);
        setTimeout(() => {
            navigate('/register', { replace: true });
        }, 2000);
    };

    const handleToggleLogin = () => {
        setIsRegister(false);
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 2000);
    };

    return (
        <div className={styles.auth_container}>
            <AuthFlipForm 
                isRegister={isRegister}
                onToggleRegister={handleToggleRegister}
                onToggleLogin={handleToggleLogin}
            >
                {isRegister ? <RegisterForm /> : <LoginForm />}
            </AuthFlipForm>
        </div>
    );
};

export default AuthPage;
