import React, { useState } from "react";
import styles from "./InputField.module.css";
import { Eye, EyeSlash, Envelope, Lock } from "@phosphor-icons/react";

const InputField = ({
    label,
    id,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required,
    className = "",
    labelClassName = "",
    underlineClassName = "",  
    containerClassName = "",
    fieldClassName = "",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    
    // Determinar la clase CSS basada en el tipo (MANTENIENDO tu lógica)
    const getInputContainerClass = () => {
        if (type === "password") return styles.password_input;
        if (type === "email") return styles.email_input;
        return styles.text_input;
    };

    const shouldShowIcon = type === "email" || type === "password";
    const Icon = type === "email" ? Envelope : Lock;

    return (
        <div className={`${styles.input_group} ${className}`}>
            {/* ✅ USAR labelClassName SIN cambiar el estilo */}
            <label htmlFor={id} className={`${styles.input_label} ${labelClassName}`}>
                {label}
            </label>

            <div className={`${getInputContainerClass()} ${containerClassName}`}>
                {shouldShowIcon && <Icon size={20} className={styles.input_icon} />}

                {/* ✅ USAR fieldClassName SIN cambiar el estilo */}
                <input
                    id={id}
                    name={name || id}
                    className={`${styles.input_field} ${fieldClassName}`}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />

                {isPassword && (
                    <div
                        className={styles.eye_icon}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlash size={20} color="#9CA3AF" weight="bold" />
                        ) : (
                            <Eye size={20} color="#9CA3AF" weight="bold" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;