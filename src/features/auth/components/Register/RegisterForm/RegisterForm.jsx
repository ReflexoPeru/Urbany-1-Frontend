import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./RegisterForm.module.css";
import InputField from "../../common/InputField/InputField";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        if (formData.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.")
            return;
        }

        setLoading(true);

        try {
            console.log("Datos a enviar:", formData);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert("Registro exitoso! Seras redirigido al siguiente paso.");

            navigate('/register/inmobiliaria')

        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Error de conexión. Intenta nuevamente.")
        } finally {
            setLoading(false);
        }
        
    };

    return (
            <form className={styles.form} onSubmit={handleSubmit} >
                {/* Campo Email */}
                <div className={styles.inputs_container}>
                    <InputField
                        label="Correo electrónico"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="pipomontalvan@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Contraseña"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="*********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Confirmar Contraseña"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="*********"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                    <button type="submit" className={styles.register_button} disabled={loading}>
                        {loading ? "Registrando..." : "Continuar"}
                    </button>                   
                
            </form>
    )
}

export default RegisterForm;