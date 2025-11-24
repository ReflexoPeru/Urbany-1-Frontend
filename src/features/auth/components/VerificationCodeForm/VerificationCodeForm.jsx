import React, { useState, useRef, useEffect } from "react";
import urbanyLogo from "../../../../assets/urbany.png";
import recoveryImage from "../../../../assets/recovery.svg";
import styles from "./VerificationCodeForm.module.css";

const VerificationCodeForm = ({ email, onSubmit, onResend }) => {
    const [code, setCode] = useState(["", "", "", ""]);
    const [errors, setErrors] = useState({});
    const [timer, setTimer] = useState(120);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }

        if (errors.code) {
            setErrors({});
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const fullCode = code.join("");
        if (fullCode.length !== 4) {
            setErrors({ code: "Por favor ingresa el código completo" });
            return;
        }

        onSubmit(fullCode);
    };

    const handleResend = () => {
        setTimer(120);
        onResend();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Código de Verificación</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            <div className={styles.image_section}>
                <img src={recoveryImage} alt="Recovery" className={styles.recovery_image} />
            </div>

            <p className={styles.description}>
                Código de verificación enviado a <strong>{email}</strong>
            </p>

            <div className={styles.code_inputs}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={errors.code ? styles.input_error : ""}
                    />
                ))}
            </div>

            {errors.code && (
                <span className={styles.error_message}>{errors.code}</span>
            )}

            <button type="submit" className={styles.btn}>Confirmar Código</button>

            <div className={styles.resend_section}>
                {timer > 0 ? (
                    <p className={styles.timer}>{formatTime(timer)} para reenviar código</p>
                ) : (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleResend(); }}>
                        Reenviar código
                    </a>
                )}
            </div>
        </form>
    );
};

export default VerificationCodeForm;
