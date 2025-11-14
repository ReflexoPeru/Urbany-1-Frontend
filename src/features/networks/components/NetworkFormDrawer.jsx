import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../../components/ui/Sidebar/Sidebar';
import Button from '../../../components/ui/Button/Button';
import styles from './NetworkFormModal.module.css';

const defaultValues = {
    name: '',
    description: '',
    tagColor: '#1d4ed8',
    connectionStatus: 'connected',
    defaultCommission: '',
    sharePolicy: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    syncFrequency: 'Manual'
};

const NetworkFormDrawer = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues = {},
    mode = 'edit'
}) => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormValues({
                ...defaultValues,
                ...initialValues,
                defaultCommission: initialValues.defaultCommission ?? '',
                syncFrequency: initialValues.syncFrequency || defaultValues.syncFrequency
            });
            setHasSubmitted(false);
        }
    }, [isOpen, initialValues]);

    const title = useMemo(() => (mode === 'edit' ? 'Editar red' : 'Crear red'), [mode]);
    const submitLabel = useMemo(() => (mode === 'edit' ? 'Guardar cambios' : 'Crear red'), [mode]);

    if (!isOpen) {
        return null;
    }

    const handleChange = (field) => (event) => {
        const { value } = event.target;
        setFormValues((previous) => ({
            ...previous,
            [field]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setHasSubmitted(true);

        if (!formValues.name.trim()) {
            return;
        }

        onSubmit?.({
            ...formValues,
            defaultCommission: formValues.defaultCommission === '' ? null : Number(formValues.defaultCommission)
        });
    };

    return (
        <Sidebar isOpen={isOpen} onClose={onClose} title={title} width={520}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldGroup}>
                    <label htmlFor="drawer-network-name" className={styles.label}>Nombre de la red *</label>
                    <input
                        id="drawer-network-name"
                        type="text"
                        value={formValues.name}
                        onChange={handleChange('name')}
                        className={`${styles.input} ${hasSubmitted && !formValues.name.trim() ? styles.inputError : ''}`}
                        placeholder="Ej. CRM Urbany"
                        autoFocus
                    />
                    {hasSubmitted && !formValues.name.trim() && (
                        <span className={styles.errorMessage}>Ingresa un nombre para la red.</span>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="drawer-network-description" className={styles.label}>Descripción</label>
                    <textarea
                        id="drawer-network-description"
                        rows={3}
                        value={formValues.description}
                        onChange={handleChange('description')}
                        className={styles.textarea}
                        placeholder="Describe el alcance o cobertura de la red."
                    />
                </div>

                <div className={styles.rowFields}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="drawer-network-color" className={styles.label}>Color identificador</label>
                        <div className={styles.colorControl}>
                            <input
                                id="drawer-network-color"
                                type="color"
                                value={formValues.tagColor}
                                onChange={handleChange('tagColor')}
                            />
                            <span>{formValues.tagColor?.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="drawer-network-status" className={styles.label}>Estado</label>
                        <select
                            id="drawer-network-status"
                            value={formValues.connectionStatus}
                            onChange={handleChange('connectionStatus')}
                            className={styles.select}
                        >
                            <option value="connected">Activa</option>
                            <option value="pending">Pendiente</option>
                            <option value="draft">Borrador</option>
                        </select>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="drawer-network-commission" className={styles.label}>Comisión estándar (%)</label>
                        <input
                            id="drawer-network-commission"
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            value={formValues.defaultCommission ?? ''}
                            onChange={handleChange('defaultCommission')}
                            className={styles.input}
                            placeholder="Ej. 30"
                        />
                    </div>
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="drawer-network-policy" className={styles.label}>Política de compartición</label>
                    <textarea
                        id="drawer-network-policy"
                        rows={3}
                        value={formValues.sharePolicy}
                        onChange={handleChange('sharePolicy')}
                        className={styles.textarea}
                        placeholder="Detalla condiciones o acuerdos de colaboración."
                    />
                </div>

                <div className={styles.rowFields}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="drawer-network-contact-name" className={styles.label}>Contacto principal</label>
                        <input
                            id="drawer-network-contact-name"
                            type="text"
                            value={formValues.contactName}
                            onChange={handleChange('contactName')}
                            className={styles.input}
                            placeholder="Ej. Ana Torres"
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="drawer-network-contact-email" className={styles.label}>Correo</label>
                        <input
                            id="drawer-network-contact-email"
                            type="email"
                            value={formValues.contactEmail}
                            onChange={handleChange('contactEmail')}
                            className={styles.input}
                            placeholder="contacto@red.com"
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="drawer-network-contact-phone" className={styles.label}>Teléfono</label>
                        <input
                            id="drawer-network-contact-phone"
                            type="tel"
                            value={formValues.contactPhone}
                            onChange={handleChange('contactPhone')}
                            className={styles.input}
                            placeholder="Ej. +57 300 000 0000"
                        />
                    </div>
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="drawer-network-sync" className={styles.label}>Frecuencia de sincronización</label>
                    <select
                        id="drawer-network-sync"
                        value={formValues.syncFrequency}
                        onChange={handleChange('syncFrequency')}
                        className={styles.select}
                    >
                        <option value="Manual">Manual</option>
                        <option value="Cada 4 horas">Cada 4 horas</option>
                        <option value="Cada 12 horas">Cada 12 horas</option>
                        <option value="Diaria">Diaria</option>
                        <option value="Semanal">Semanal</option>
                    </select>
                </div>

                <footer className={styles.footer}>
                    <button type="button" className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <Button type="submit" variant="primary">
                        {submitLabel}
                    </Button>
                </footer>
            </form>
        </Sidebar>
    );
};

export default NetworkFormDrawer;

