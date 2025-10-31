import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterInmobiliariaForm from "../components/RegisterInmobiliariaForm/RegisterInmobiliariaForm";
import styles from "./register_inmobiliaria.module.css";

const RegisterInmobiliaria = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.auth_container}>
            <div className={styles.container}>
                <div className={styles.form_container}>
                    <RegisterInmobiliariaForm />
                    <div className={styles.back_button}>
                        <button onClick={() => navigate('/register')}>
                            ← Volver al Registro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterInmobiliaria;
