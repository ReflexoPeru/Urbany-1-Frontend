import React, { useState } from 'react';
import { Buildings, Camera } from 'phosphor-react';
import Button from '../../../../components/ui/Button/Button';
import Input from '../../../../components/ui/Input/Input';
import RealEstateAccordions from '../RealEstateAccordions';
import styles from './RealEstateInfo.module.css';

const RealEstateInfo = () => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        celular: '',
        sitioWeb: ''
    });

    //  Manejar cambios en inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Guardar cambios
    const handleSave = () => {
        // Función de guardar - solo vista
    };

    // Subir foto
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    {/* Cabecera */}
                    <div className={styles.header}>
                        <div className={styles.headerText}>
                            <h1 className={styles.title}>
                                <Buildings size={20} />
                                Información inmobiliaria
                            </h1>
                            <p className={styles.subtitle}>
                                Configure todos los datos de su inmobiliaria en este panel.
                            </p>
                        </div>

                        <div className={styles.avatarContainer}>
                            <div className={styles.avatarPlaceholder}>
                                <span className={styles.avatarInitials}>FG</span>
                            </div>
                            <label className={styles.cameraButton}>
                                <Camera size={16} />
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                            </label>
                        </div>
                    </div>

                    {/* Formulario */}
                    <form className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <Input
                                    label="Nombre"
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Nombre de la inmobiliaria"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="email@inmobiliaria.com"
                                    icon="mail"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <Input
                                    label="Celular"
                                    type="tel"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleInputChange}
                                    placeholder="+51 999 900 900"
                                    icon="phone"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <Input
                                    label="Sitio web"
                                    type="url"
                                    name="sitioWeb"
                                    value={formData.sitioWeb}
                                    onChange={handleInputChange}
                                    placeholder="https://www.inmobiliaria.com"
                                    icon="search"
                                />
                            </div>
                        </div>

                        {/* Accordions con configuraciones adicionales */}
                        <RealEstateAccordions />

                        <div className={styles.buttonContainer}>
                            <Button
                                type="button"
                                onClick={handleSave}
                                variant="primary"
                            >
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RealEstateInfo;
