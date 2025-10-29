import React from "react";
import styles from "./AuthHeader.module.css";
import urbany from "../../../../../assets/urbany.png";

const AuthHeader = ({
    title = "Título",
    subtitle = "",
    showWelcome = true
    }) => {
    return (
        <div className={styles.auth_header}>
            {showWelcome && (
                <div className={styles.header}>
                    <h1>Bienvenidos a</h1>
                    <div className={styles.logo}>
                        <img src={urbany} alt="c_urbany" />
                    </div>
                </div>
            )}
        
        <div className={styles.title_section}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        </div>
    );
};

export default AuthHeader;