import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterInmobiliariaForm from "../components/RegisterInmobiliariaForm/RegisterInmobiliariaForm";
import AuthFlipForm from "../components/AuthFlipForm/AuthFlipForm";
import styles from "./register_inmobiliaria.module.css";

const RegisterInmobiliaria = () => {
    const navigate = useNavigate();

    const handleToggleToRegister = () => {
        setTimeout(() => {
            navigate('/register', { replace: true });
        }, 2000);
    };

    return (
        <div className={styles.auth_container}>
            <AuthFlipForm 
                isRegister={true}
                onToggleRegister={handleToggleToRegister}
                onToggleLogin={handleToggleToRegister}
            >
                <RegisterInmobiliariaForm />
            </AuthFlipForm>
        </div>
    );
};

export default RegisterInmobiliaria;
