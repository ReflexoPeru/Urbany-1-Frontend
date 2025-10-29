import React from 'react';
import { Link } from 'react-router-dom'
import SocialLogin from '../../common/SocialLogin/SocialLogin';
import styles from './LoginRegisterSection.module.css';

const LoginRegisterSection = () => {
    return (
        <div className={styles.register_section}>
            <p>
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className={styles.register_link}>
                    Regístrate
                </Link>
            </p>

            <p className={styles.or_text}>O USA</p>

            <SocialLogin />
        </div>
    );
};

export default LoginRegisterSection;