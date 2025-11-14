import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone, Building } from "lucide-react";
import urbanyLogo from "../../../../assets/urbany.png";
import styles from "./RegisterInmobiliariaForm.module.css";
import { mockDepartamentos, mockProvincias, mockDistritos } from "../../../../mock/ubicaciones";

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
    const navigate = useNavigate();

    useEffect(() => {
        if (formData.departamento) {
            const provincias = mockProvincias.filter(
                prov => prov.departamentoId === parseInt(formData.departamento)
            );
            setProvinciasFiltradas(provincias);
            setFormData(prev => ({ ...prev, provincia: "", distrito: "" }));
        } else {
            setProvinciasFiltradas([]);
        }
    }, [formData.departamento]);

    useEffect(() => {
        if (formData.provincia) {
            const distritos = mockDistritos.filter(
                dist => dist.provinciaId === parseInt(formData.provincia)
            );
            setDistritosFiltrados(distritos);
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
        console.log("Datos de inmobiliaria:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registro de Inmobiliaria</h1>

            <div className={styles.logo_section}>
                <img src={urbanyLogo} alt="Urbany Logo" className={styles.logo} />
                <p className={styles.tagline}>Tu futuro inmobiliario comienza aquí</p>
            </div>

            <div className={styles.input_box}>
                <input 
                    type="text" 
                    name="nombreInmobiliaria"
                    placeholder="Nombre de la Inmobiliaria" 
                    value={formData.nombreInmobiliaria}
                    onChange={handleChange}
                    required 
                />
                <Building className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input 
                    type="tel" 
                    name="telefono"
                    placeholder="Teléfono" 
                    value={formData.telefono}
                    onChange={handleChange}
                    required 
                />
                <Phone className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input 
                    type="email" 
                    name="email"
                    placeholder="Correo electrónico" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
                <Mail className={styles.icon} size={20} />
            </div>

            <div className={styles.input_box}>
                <input 
                    type="text" 
                    name="direccion"
                    placeholder="Dirección" 
                    value={formData.direccion}
                    onChange={handleChange}
                    required 
                />
                <MapPin className={styles.icon} size={20} />
            </div>

            <div className={styles.location_row}>
                <div className={styles.select_box}>
                    <select 
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Departamento</option>
                        {mockDepartamentos.map(depto => (
                            <option key={depto.id} value={depto.id}>
                                {depto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.select_box}>
                    <select 
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                        required
                        disabled={!formData.departamento}
                    >
                        <option value="">
                            {formData.departamento ? "Provincia" : "Primero selecciona departamento"}
                        </option>
                        {provinciasFiltradas.map(prov => (
                            <option key={prov.id} value={prov.id}>
                                {prov.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.select_box}>
                    <select 
                        name="distrito"
                        value={formData.distrito}
                        onChange={handleChange}
                        required
                        disabled={!formData.provincia}
                    >
                        <option value="">
                            {formData.provincia ? "Distrito" : "Primero selecciona provincia"}
                        </option>
                        {distritosFiltrados.map(dist => (
                            <option key={dist.id} value={dist.id}>
                                {dist.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="submit" className={styles.btn}>Registrar Inmobiliaria</button>
        </form>
    );
};

export default RegisterInmobiliariaForm;
