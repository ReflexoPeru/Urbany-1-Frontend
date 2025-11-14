import React, { useState } from 'react';
import { Image, Question } from 'phosphor-react';
import Accordion from '../../../../components/ui/Accordion/Accordion';
import Select from '../../../../components/ui/Select/Select';
import Button from '../../../../components/ui/Button/Button';
import styles from './Watermark.module.css';

const Watermark = () => {
    const [formData, setFormData] = useState({
        logo: null,
        ubicacionMarca: 'abajo-derecha'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                logo: file
            }));
        }
    };

    const watermarkOptions = [
        { value: 'centro', label: 'Centro' },
        { value: 'arriba', label: 'Arriba' },
        { value: 'abajo', label: 'Abajo' },
        { value: 'izquierda', label: 'Izquierda' },
        { value: 'derecha', label: 'Derecha' },
        { value: 'arriba-derecha', label: 'Arriba - Derecha' },
        { value: 'arriba-izquierda', label: 'Arriba - Izquierda' },
        { value: 'abajo-derecha', label: 'Abajo - Derecha' }
    ];

    return (
        <Accordion
            title="Modificar marca de agua"
            icon={Image}
        >
            <div className={styles.sectionContent}>
                <div className={styles.watermarkInfo}>
                    <p className={styles.infoText}>
                        La imagen que elijas será utilizada para generar las marcas de agua en las fotos de tus propiedades
                    </p>
                    <Question size={20} className={styles.helpIcon} />
                </div>

                <div className={styles.logoRow}>
                    <div className={styles.logoSection}>
                        <label className={styles.logoLabel}>Logo</label>
                        <div className={styles.logoUpload}>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => document.getElementById('logo-upload').click()}
                            >
                                Añadir logo para marca de agua
                            </Button>
                            <input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                hidden
                            />
                        </div>
                    </div>

                    <div className={styles.locationSection}>
                        <Select
                            label="Ubicación de marca de agua"
                            name="ubicacionMarca"
                            value={formData.ubicacionMarca}
                            onChange={handleInputChange}
                            options={watermarkOptions}
                            placeholder="Seleccionar ubicación"
                        />
                    </div>
                </div>
            </div>
        </Accordion>
    );
};

export default Watermark;

