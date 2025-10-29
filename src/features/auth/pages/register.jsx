import React from "react";
import RegisterHeader from "../components/Register/RegisterHeader/RegisterHeader";
import RegisterOptions from "../components/Register/RegisterOptions/RegisterOptions";
import RegisterForm from "../components/Register/RegisterForm/RegisterForm";
import styles from "./register.module.css";
import urbany_register from "../../../assets/urbany_register.jpeg";

const Register = () => {
    return (
        <div className={styles.register}>
            <div className={styles.register_container}>
                <RegisterHeader />
                <RegisterForm />
                <RegisterOptions />
            </div>
            <div className={styles.register_image}>
                <img src={urbany_register} alt="Register Background" />
            </div>
        </div>
    )
}

export default Register;