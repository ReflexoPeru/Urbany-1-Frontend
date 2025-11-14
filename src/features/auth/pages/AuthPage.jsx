import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthFlipForm from "../components/AuthFlipForm/AuthFlipForm";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialView = location.pathname === '/register' ? 'register' : 'login';
    const [isRegister, setIsRegister] = useState(initialView === 'register');
    const [currentView, setCurrentView] = useState(initialView);
    const [suppressPanels, setSuppressPanels] = useState(false);
    const timeoutsRef = useRef([]);

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, []);

    const scheduleTimeout = (callback, delay) => {
        const id = setTimeout(() => {
            callback();
            timeoutsRef.current = timeoutsRef.current.filter((storedId) => storedId !== id);
        }, delay);
        timeoutsRef.current.push(id);
    };

    const flipDuration = 2000;

    const handleToggleRegister = () => {
        if (currentView === 'register') {
            return;
        }
        setIsRegister(true);
        setSuppressPanels(false);
        scheduleTimeout(() => {
            setCurrentView('register');
            navigate('/register', { replace: true });
        }, flipDuration);
    };

    const handleToggleLogin = () => {
        if (currentView === 'login') {
            return;
        }
        setIsRegister(false);
        setSuppressPanels(false);
        scheduleTimeout(() => {
            setCurrentView('login');
            navigate('/login', { replace: true });
        }, flipDuration);
    };

    return (
        <div className={styles.auth_container}>
            <AuthFlipForm
                isRegister={isRegister}
                onToggleRegister={handleToggleRegister}
                onToggleLogin={handleToggleLogin}
                suppressPanels={suppressPanels}
            >
                {currentView === 'register' ? (
                    <RegisterForm />
                ) : (
                    <LoginForm />
                )}
            </AuthFlipForm>
        </div>
    );
};

export default AuthPage;
