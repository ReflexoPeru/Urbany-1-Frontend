import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterInmobiliariaForm from "../components/RegisterInmobiliariaForm/RegisterInmobiliariaForm";
import AuthFlipForm from "../components/AuthFlipForm/AuthFlipForm";
import styles from "./register_inmobiliaria.module.css";

const RegisterInmobiliaria = () => {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    useLayoutEffect(() => {
        const id = requestAnimationFrame(() => {
            setIsRegister(true);
        });
        return () => cancelAnimationFrame(id);
    }, []);

    const timeoutsRef = useRef([]);

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((id) => clearTimeout(id));
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

    const handleToggleToRegister = () => {
        setIsRegister(false);
        scheduleTimeout(() => {
            navigate('/register', { replace: true });
        }, 2000);
    };

    return (
        <div className={styles.auth_container}>
            <AuthFlipForm 
                isRegister={isRegister}
                onToggleRegister={handleToggleToRegister}
                onToggleLogin={handleToggleToRegister}
                invertLayout
                showRegisterPanel={false}
                loginPanelLabel="Registrarse"
                loginPanelSubtitle="¿Necesitas crear otra cuenta?"
                loginButtonText="Registrarse"
            >
                <RegisterInmobiliariaForm />
            </AuthFlipForm>
        </div>
    );
};

export default RegisterInmobiliaria;
