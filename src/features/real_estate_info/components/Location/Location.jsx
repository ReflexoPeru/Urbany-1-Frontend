import React, { useState, useEffect } from 'react';
import { MapPin } from 'phosphor-react';
import Accordion from '../../../../components/ui/Accordion/Accordion';
import Input from '../../../../components/ui/Input/Input';
import Select from '../../../../components/ui/Select/Select';
import { getDepartments, getProvincesByDepartment, getDistrictsByProvince, initialLocationData } from '../../data/peruLocationData';
import styles from './Location.module.css';

const Location = () => {
    const [formData, setFormData] = useState({
        direccion: 'Av. Larco 123',
        departamento: initialLocationData.department,
        provincia: initialLocationData.province,
        distrito: initialLocationData.district
    });

    // Estados para las opciones dinámicas
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);

    // Cargar provincias cuando cambia el departamento
    useEffect(() => {
        const provinces = getProvincesByDepartment(formData.departamento);
        setProvinceOptions(provinces);

        // Reset provincia y distrito si cambia el departamento
        if (provinces.length > 0 && !provinces.find(p => p.value === formData.provincia)) {
            setFormData(prev => ({
                ...prev,
                provincia: provinces[0].value,
                distrito: ''
            }));
        }
    }, [formData.departamento]);

    // Cargar distritos cuando cambia la provincia
    useEffect(() => {
        const districts = getDistrictsByProvince(formData.departamento, formData.provincia);
        setDistrictOptions(districts);

        // Reset distrito si cambia la provincia
        if (districts.length > 0 && !districts.find(d => d.value === formData.distrito)) {
            setFormData(prev => ({
                ...prev,
                distrito: districts[0].value
            }));
        }
    }, [formData.provincia]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Opciones dinámicas desde el mock
    const departmentOptions = getDepartments();

    return (
        <Accordion
            title="Modificar ubicación de inmobiliaria"
            icon={MapPin}
        >
            <div className={styles.sectionContent}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <Input
                            label="Dirección"
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            placeholder="Dirección de la inmobiliaria"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <Select
                            label="Departamento"
                            name="departamento"
                            value={formData.departamento}
                            onChange={handleInputChange}
                            options={departmentOptions}
                            placeholder="Seleccionar departamento"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <Select
                            label="Provincia"
                            name="provincia"
                            value={formData.provincia}
                            onChange={handleInputChange}
                            options={provinceOptions}
                            placeholder="Seleccionar provincia"
                            disabled={!formData.departamento}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <Select
                            label="Distrito"
                            name="distrito"
                            value={formData.distrito}
                            onChange={handleInputChange}
                            options={districtOptions}
                            placeholder="Seleccionar distrito"
                            disabled={!formData.provincia}
                        />
                    </div>
                </div>
            </div>
        </Accordion>
    );
};

export default Location;

