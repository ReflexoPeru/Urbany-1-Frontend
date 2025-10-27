import React, { useState } from 'react';
import { Hash } from 'phosphor-react';
import Accordion from '../../../../components/ui/Accordion/Accordion';
import Input from '../../../../components/ui/Input/Input';
import styles from './CompanyCode.module.css';

const CompanyCode = () => {
    const [formData, setFormData] = useState({
        codigoInmobiliaria: 'FGH'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Accordion
            title="Modificar código de inmobiliaria"
            icon={Hash}
        >
            <div className={styles.sectionContent}>
                <div className={styles.formGroup}>
                    <Input
                        label="Código de inmobiliaria"
                        type="text"
                        name="codigoInmobiliaria"
                        value={formData.codigoInmobiliaria}
                        onChange={handleInputChange}
                        placeholder="Ingresa el código"
                    />
                </div>
            </div>
        </Accordion>
    );
};

export default CompanyCode;

