import React from 'react';
import { ConfigProvider, Input as AntdInput } from 'antd';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import WhatsAppModal from '../../../../components/common/WhatsAppModal';
import { useWebsiteRequestForm } from '../../hooks';
import styles from './WebsiteRequestModal.module.css';

const { TextArea } = AntdInput;

const textareaTheme = {
    components: {
        Input: {
            colorPrimary: '#2563eb',
            colorPrimaryHover: '#1d4ed8',
            colorPrimaryActive: '#1e40af',
            colorBorder: '#e2e8f0',
            colorBorderSecondary: '#cbd5f5',
            colorBorderHover: '#cbd5f5',
            colorBgContainer: '#fff',
            colorBgContainerDisabled: '#f8fafc',
            colorText: '#111827',
            colorTextPlaceholder: '#94a3b8',
            borderRadius: 12,
            paddingContentHorizontal: 18,
            paddingContentVertical: 14,
            boxShadow: 'none',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14
        }
    }
};

const WebsiteRequestModal = ({ isOpen, onClose }) => {
    const {
        values,
        errors,
        status,
        isSubmitting,
        handleFieldChange,
        handleSubmit,
        resetForm
    } = useWebsiteRequestForm();

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    const handleSend = async () => {
        const wasSuccessful = await handleSubmit();
        if (wasSuccessful) {
            resetForm();
            onClose();
        }
    };

    return (
        <WhatsAppModal
            isOpen={isOpen}
            onClose={handleCancel}
            title="Solicitar un sitio web personalizado"
            footer={(
                <>
                    <Button
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSend}
                        loading={isSubmitting}
                    >
                        Enviar solicitud
                    </Button>
                </>
            )}
        >
            <div className={styles.content}>
                <p className={styles.helperText}>
                    Complete el formulario y nuestro equipo se pondrá en contacto para diseñar la página perfecta para su inmobiliaria.
                </p>

                <Input
                    label="Nombre completo"
                    placeholder="Ingresa tu nombre"
                    value={values.name}
                    onChange={handleFieldChange('name')}
                    error={errors.name}
                />

                <Input
                    label="Correo electrónico"
                    type="email"
                    placeholder="correo@empresa.com"
                    value={values.email}
                    onChange={handleFieldChange('email')}
                    error={errors.email}
                />

                <Input
                    label="Teléfono de contacto"
                    placeholder="Incluye código de área"
                    value={values.phone}
                    onChange={handleFieldChange('phone')}
                    error={errors.phone}
                />

                <div className={styles.textareaGroup}>
                    <label htmlFor="website-message" className={styles.label}>
                        Cuéntanos qué necesitas
                    </label>
                    <ConfigProvider theme={textareaTheme}>
                        <TextArea
                            id="website-message"
                            placeholder="Describe la idea de tu sitio web, secciones, estilo, integraciones..."
                            value={values.message}
                            onChange={handleFieldChange('message')}
                            autoSize={{ minRows: 5, maxRows: 6 }}
                            maxLength={1000}
                            showCount
                            className={styles.textarea}
                        />
                    </ConfigProvider>
                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                </div>

                {status === 'error' && (
                    <div className={styles.statusError}>
                        No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.
                    </div>
                )}
            </div>
        </WhatsAppModal>
    );
};

export default WebsiteRequestModal;














