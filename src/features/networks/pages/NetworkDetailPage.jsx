import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import Button from '../../../components/ui/Button/Button';
import { useToast } from '../../../contexts/ToastContext';
import { useNetworks } from '../hooks/useNetworks';
import pageStyles from './NetworkDetailPage.module.css';
import formStyles from '../components/NetworkFormModal.module.css';

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

const NetworkDetailPage = () => {
    const { id } = useParams();
    const isCreate = !id || id === 'nuevo';
    const { networks, createNetwork, updateNetwork, selectNetwork } = useNetworks();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(defaultValues);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const currentNetwork = useMemo(
        () => networks.find((network) => network.id === id) || null,
        [networks, id]
    );

    useEffect(() => {
        if (isCreate) {
            setFormValues(defaultValues);
            setHasSubmitted(false);
            return;
        }

        if (!currentNetwork) {
            navigate('/redes');
            return;
        }

        setFormValues({
            ...defaultValues,
            ...currentNetwork,
            defaultCommission: currentNetwork.defaultCommission ?? ''
        });
        setHasSubmitted(false);
    }, [isCreate, currentNetwork, navigate]);

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

        const payload = {
            ...formValues,
            defaultCommission: formValues.defaultCommission === '' ? null : Number(formValues.defaultCommission)
        };

        let networkId = id;

        if (isCreate) {
            const created = createNetwork(payload);
            networkId = created.id;
            toast.success('Red creada', `Registramos la red ${created.name}.`);
        } else {
            updateNetwork(id, payload);
            toast.success('Red actualizada', 'Los datos de la red se guardaron correctamente.');
        }

        if (networkId) {
            selectNetwork(networkId);
        }

        navigate('/redes');
    };

    const handleCancel = () => {
        navigate('/redes');
    };

    const summary = useMemo(() => {
        if (!currentNetwork) {
            return null;
        }
        return {
            properties: currentNetwork.propertiesCount ?? 0,
            mine: currentNetwork.mineCount ?? 0,
            favorites: currentNetwork.favoriteCount ?? 0,
            lastSync: currentNetwork.lastSync
                ? new Date(currentNetwork.lastSync).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
                : 'Sin sincronizar'
        };
    }, [currentNetwork]);

    return (
        <div className={pageStyles.container}>
            <header className={pageStyles.header}>
                <button type="button" className={pageStyles.backButton} onClick={handleCancel}>
                    <ArrowLeft size={18} weight="bold" />
                    Volver a redes
                </button>
                <div className={pageStyles.headerTitles}>
                    <h1>{isCreate ? 'Crear nueva red' : 'Editar red'}</h1>
                    <p>{isCreate ? 'Configura una nueva red de colaboración para compartir tu inventario.' : 'Actualiza la información de la red seleccionada.'}</p>
                </div>
                <div className={pageStyles.headerActions}>
                    <Button variant="ghost" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {isCreate ? 'Crear red' : 'Guardar cambios'}
                    </Button>
                </div>
            </header>

            {!isCreate && summary && (
                <section className={pageStyles.summaryCard}>
                    <div className={pageStyles.summaryBlock}>
                        <span className={pageStyles.summaryLabel}>Propiedades en red</span>
                        <span className={pageStyles.summaryValue}>{summary.properties}</span>
                    </div>
                    <div className={pageStyles.summaryBlock}>
                        <span className={pageStyles.summaryLabel}>Mis propiedades</span>
                        <span className={pageStyles.summaryValue}>{summary.mine}</span>
                    </div>
                    <div className={pageStyles.summaryBlock}>
                        <span className={pageStyles.summaryLabel}>Favoritas</span>
                        <span className={pageStyles.summaryValue}>{summary.favorites}</span>
                    </div>
                    <div className={pageStyles.summaryBlock}>
                        <span className={pageStyles.summaryLabel}>Última sincronización</span>
                        <span className={pageStyles.summaryValue}>{summary.lastSync}</span>
                    </div>
                </section>
            )}

            <section className={pageStyles.formCard}>
                <form className={formStyles.form} onSubmit={handleSubmit}>
                    <div className={formStyles.fieldGroup}>
                        <label htmlFor="network-name" className={formStyles.label}>Nombre de la red *</label>
                        <input
                            id="network-name"
                            type="text"
                            value={formValues.name}
                            onChange={handleChange('name')}
                            className={`${formStyles.input} ${hasSubmitted && !formValues.name.trim() ? formStyles.inputError : ''}`}
                            placeholder="Ej. CRM Urbany"
                        />
                        {hasSubmitted && !formValues.name.trim() && (
                            <span className={formStyles.errorMessage}>Ingresa un nombre para la red.</span>
                        )}
                    </div>

                    <div className={formStyles.fieldGroup}>
                        <label htmlFor="network-description" className={formStyles.label}>Descripción</label>
                        <textarea
                            id="network-description"
                            rows={3}
                            value={formValues.description}
                            onChange={handleChange('description')}
                            className={formStyles.textarea}
                            placeholder="Describe el alcance o condiciones de la red."
                        />
                    </div>

                    <div className={formStyles.rowFields}>
                        <div className={formStyles.fieldGroup}>
                            <label htmlFor="network-color" className={formStyles.label}>Color identificador</label>
                            <div className={formStyles.colorControl}>
                                <input
                                    id="network-color"
                                    type="color"
                                    value={formValues.tagColor}
                                    onChange={handleChange('tagColor')}
                                />
                                <span>{formValues.tagColor?.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className={formStyles.fieldGroup}>
                            <label htmlFor="network-status" className={formStyles.label}>Estado</label>
                            <select
                                id="network-status"
                                value={formValues.connectionStatus}
                                onChange={handleChange('connectionStatus')}
                                className={formStyles.select}
                            >
                                <option value="connected">Activa</option>
                                <option value="pending">Pendiente</option>
                                <option value="draft">Borrador</option>
                            </select>
                        </div>

                        <div className={formStyles.fieldGroup}>
                            <label htmlFor="network-commission" className={formStyles.label}>Comisión estándar (%)</label>
                            <input
                                id="network-commission"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={formValues.defaultCommission ?? ''}
                                onChange={handleChange('defaultCommission')}
                                className={formStyles.input}
                                placeholder="Ej. 30"
                            />
                        </div>
                    </div>

                    <div className={formStyles.fieldGroup}>
                        <label htmlFor="network-policy" className={formStyles.label}>Política de compartición</label>
                        <textarea
                            id="network-policy"
                            rows={3}
                            value={formValues.sharePolicy}
                            onChange={handleChange('sharePolicy')}
                            className={formStyles.textarea}
                            placeholder="Detalla condiciones, tiempos de respuesta o acuerdos de comisión."
                        />
                    </div>

                    <div className={formStyles.rowFields}>
                        <div className={formStyles.fieldGroup}>
                            <label htmlFor="network-contact-name" className={formStyles.label}>Contacto principal</label>
                            <input
                                id="network-contact-name"
                                type="text"
                                value={formValues.contactName}
                                onChange={handleChange('contactName')}
                                className={formStyles.input}
                                placeholder="Ej. Ana Torres"
                            />
                        </div>

                        <div className={formStyles.fieldGroup}>
                            <label htmlFor="network-contact-email" className={formStyles.label}>Correo</label>
                            <input
                                id="network-contact-email"
                                type="email"
                                value={formValues.contactEmail}
                                onChange={handleChange('contactEmail')}
                                className={formStyles.input}
                                placeholder="contacto@crmurbany.com"
                            />
                        </div>

                        <div className={formStyles.fieldGroup}>
                            <label htmlFor="network-contact-phone" className={formStyles.label}>Teléfono</label>
                            <input
                                id="network-contact-phone"
                                type="tel"
                                value={formValues.contactPhone}
                                onChange={handleChange('contactPhone')}
                                className={formStyles.input}
                                placeholder="Ej. +57 300 000 0000"
                            />
                        </div>
                    </div>

                    <div className={formStyles.fieldGroup}>
                        <label htmlFor="network-sync" className={formStyles.label}>Frecuencia de sincronización</label>
                        <select
                            id="network-sync"
                            value={formValues.syncFrequency}
                            onChange={handleChange('syncFrequency')}
                            className={formStyles.select}
                        >
                            <option value="Manual">Manual</option>
                            <option value="Cada 4 horas">Cada 4 horas</option>
                            <option value="Cada 12 horas">Cada 12 horas</option>
                            <option value="Diaria">Diaria</option>
                            <option value="Semanal">Semanal</option>
                        </select>
                    </div>

                    <footer className={formStyles.footer}>
                        <button type="button" className={formStyles.cancelButton} onClick={handleCancel}>
                            Cancelar
                        </button>
                        <Button type="submit" variant="primary">
                            {isCreate ? 'Crear red' : 'Guardar cambios'}
                        </Button>
                    </footer>
                </form>
            </section>
        </div>
    );
};

export default NetworkDetailPage;

