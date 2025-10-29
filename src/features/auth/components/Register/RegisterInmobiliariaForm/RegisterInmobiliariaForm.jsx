import React, { useState, useEffect } from "react"; // ← Añadir useEffect
import { useNavigate } from "react-router-dom"
import InputField from "../../common/InputField/InputField";
import SelectField from "../SelectField/SelectField"; // ← Verifica esta ruta
import styles from "./RegisterInmobiliariaForm.module.css";
import { mockDepartamentos, mockProvincias, mockDistritos } from "../../../../../mock/ubicaciones";

const RegisterInmobiliariaForm = () => {
    const [formData, setFormData] = useState({
        nombreInmobiliaria: "",
        telefono: "",
        email: "",
        direccion: "",
        departamento: "",
        provincia: "",
        distrito: ""
    });

    const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);
    const [distritosFiltrados, setDistritosFiltrados] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Filtrar provincias cuando cambie el departamento
    useEffect(() => {
        if (formData.departamento) {
            const provincias = mockProvincias.filter(
                prov => prov.departamentoId === parseInt(formData.departamento)
            );
            setProvinciasFiltradas(provincias);
            // Reset provincia y distrito cuando cambia departamento
            setFormData(prev => ({ ...prev, provincia: "", distrito: "" }));
        } else {
            setProvinciasFiltradas([]);
        }
    }, [formData.departamento]);

    // Filtrar distritos cuando cambie la provincia
    useEffect(() => {
        if (formData.provincia) {
            const distritos = mockDistritos.filter(
                dist => dist.provinciaId === parseInt(formData.provincia)
            );
            setDistritosFiltrados(distritos);
            // Reset distrito cuando cambia provincia
            setFormData(prev => ({ ...prev, distrito: "" }));
        } else {
            setDistritosFiltrados([]);
        }
    }, [formData.provincia]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("Datos de inmobiliaria:", formData);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert("Inmobiliaria registrada exitosamente!");
            navigate('/login')
        } catch (error) {
            console.error("Error", error);
            alert("Error al registrar la inmobiliaria.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputs_container}>
                <InputField
                    label="Nombre de la Inmobiliaria"
                    id="nombreInmobiliaria"
                    name="nombreInmobiliaria"
                    type="text"
                    placeholder="Ingresa el nombre"
                    value={formData.nombreInmobiliaria}
                    onChange={handleChange}
                    required
                    className={styles.small_input}
                    labelClassName={styles.small_label} // ← AÑADIR
                    containerClassName={styles.small_container} // ← AÑADIR
                    fieldClassName={styles.small_field} // ← AÑADIR
                />

                <InputField
                    label="Teléfono"
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="Número de teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className={styles.small_input}
                    labelClassName={styles.small_label} // ← AÑADIR
                    containerClassName={styles.small_container} // ← AÑADIR
                    fieldClassName={styles.small_field} // ← AÑADIR
                />

                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@inmobiliaria.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.small_input}
                    labelClassName={styles.small_label} // ← AÑADIR
                    containerClassName={styles.small_container} // ← AÑADIR
                    fieldClassName={styles.small_field} // ← AÑADIR
                />

                <InputField
                    label="Dirección"
                    id="direccion"
                    name="direccion"
                    type="text"
                    placeholder="Dirección de la inmobiliaria"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                    className={styles.small_input}
                    labelClassName={styles.small_label} // ← AÑADIR
                    containerClassName={styles.small_container} // ← AÑADIR
                    fieldClassName={styles.small_field} // ← AÑADIR
                />

                <div className={styles.fields_row_three}>
                    <SelectField
                        label="Departamento"
                        id="departamento"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        options={mockDepartamentos}
                        placeholder="Selecciona departamento"
                        required
                        className={styles.small_input}
                    />

                    <SelectField
                        label="Provincia"
                        id="provincia"
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                        options={provinciasFiltradas}
                        placeholder={formData.departamento ? "Selecciona provincia" : "Primero selecciona departamento"}
                        required
                        className={styles.small_input}
                        disabled={!formData.departamento}
                    />

                    <SelectField
                        label="Distrito"
                        id="distrito"
                        name="distrito"
                        value={formData.distrito}
                        onChange={handleChange}
                        options={distritosFiltrados}
                        placeholder={formData.provincia ? "Selecciona distrito" : "Primero selecciona provincia"}
                        required
                        className={styles.small_input}
                        disabled={!formData.provincia}
                    />
                </div>
            </div>

            <button type="submit" className={styles.register_button} disabled={loading}>
                {loading ? "Registrando..." : "Registrar Inmobiliaria"}
            </button>
        </form>
    );
};

export default RegisterInmobiliariaForm;