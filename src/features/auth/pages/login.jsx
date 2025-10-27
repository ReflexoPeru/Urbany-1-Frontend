import React, { useState } from "react";
import styles from "./login.module.css";
import LoginHeader from "../components/Login/LoginHeader/LoginHeader";
import LoginForm from "../components/Login/LoginForm/LoginForm";
import LoginRegisterSection from "../components/Login/LoginRegisterSection/LoginRegisterSection";
import agencia_inmobiliaria from "../../../assets/agencia_inmobiliaria.jpg";
import inmobiliaria from "../../../assets/inmobiliaria.png";
import inmo_login from "../../../assets/inmo_login.png";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <LoginHeader />
        <LoginForm />
        <LoginRegisterSection />
      </div>

      <div className={styles.login_image}>
        <img src={inmobiliaria} alt="Login background" />
      </div>
    </div>
  );
};

export default Login;
