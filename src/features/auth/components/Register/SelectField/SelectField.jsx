import React from "react";
import styles from "./SelectField.module.css";

const SelectField = ({
    label,
    id,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Selecciona una opción",
    required = false,
    className = ""
}) => {
    return (
        <div className={`${styles.select_group} ${className}`}>
            <label htmlFor={id} className={styles.select_label}>
                {label}
            </label>

            {/* Línea divisoria igual que InputField */}
            <div className={styles.select_underline}></div>

            <div className={styles.select_container}>
                <select
                    id={id}
                    name={name || id}
                    className={styles.select_field}
                    value={value}
                    onChange={onChange}
                    required={required}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectField;