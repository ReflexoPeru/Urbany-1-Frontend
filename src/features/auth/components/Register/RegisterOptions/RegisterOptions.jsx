import React from "react";
import SocialLogin from "../../common/SocialLogin/SocialLogin";
import styles from "./RegisterOptions.module.css";

const RegisterOptions = () => {
    return (
        <div className={styles.register_section}>
            <p className={styles.or_text}>O USA</p>
            <SocialLogin />
        </div>
    )
}

export default RegisterOptions;