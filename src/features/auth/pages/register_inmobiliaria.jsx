import React from "react";
import RegisterHeaderInmobiliaria from "../components/Register/RegisterHeaderInmobiliaria/RegisterHeaderInmobiliaria";
import RegisterInmobiliariaForm from "../components/Register/RegisterInmobiliariaForm/RegisterInmobiliariaForm";
import RegisterOptions from "../components/Register/RegisterOptions/RegisterOptions";
import styles from "./register_inmobiliaria.module.css";
import urbany_register from "../../../assets/urbany_register.jpeg";

const RegisterInmobiliaria = () => {
    return (
        <div className={styles.register}>
            <div className={styles.register_container}>
                <RegisterHeaderInmobiliaria />
                <RegisterInmobiliariaForm />
                <RegisterOptions />
            </div>
            <div className={styles.register_image}>
                <img src={urbany_register} alt="Register Background" />
            </div>
        </div>
    )
}

export default RegisterInmobiliaria;