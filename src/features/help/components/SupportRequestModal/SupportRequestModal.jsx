import React, { useRef } from 'react';
import { ConfigProvider, Input as AntdInput } from 'antd';
import { Paperclip, X } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import WhatsAppModal from '../../../../components/common/WhatsAppModal';
import { useSupportRequestForm } from '../../hooks';
import styles from './SupportRequestModal.module.css';

const { TextArea } = AntdInput;

const textareaTheme = {
    components: {
        Input: {
            colorPrimary: '#38e47a',
            colorPrimaryHover: '#22c55e',
            colorPrimaryActive: '#16a34a',
            colorBorder: '#e5e7eb',
            colorBorderSecondary: '#d1d5db',
            colorBorderHover: '#d1d5db',
            colorBgContainer: '#fff',
            colorBgContainerDisabled: '#f9fafb',
            colorText: '#111827',
            colorTextPlaceholder: '#9ca3af',
            colorTextDisabled: '#9ca3af',
            borderRadius: 12,
            paddingContentHorizontal: 18,
            paddingContentVertical: 14,
            boxShadow: 'none',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14
        }
    }
};

const SupportRequestModal = ({ isOpen, onClose }) => {
    const fileInputRef = useRef(null);
    const {
        values,
        errors,
        status,
        isSubmitting,
        hasAttachment,
        handleFieldChange,
        handleFileChange,
        removeAttachment,
        handleSubmit,
        resetForm
    } = useSupportRequestForm();

    const handleCancel = () => {
        resetForm();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    const handleAttachmentChange = (event) => {
        const file = event.target.files?.[0] ?? null;
        handleFileChange(file);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveAttachment = () => {
        removeAttachment();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSend = async () => {
        const wasSuccessful = await handleSubmit();
        if (wasSuccessful) {
            onClose();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            resetForm();
        }
    };

    return (
        <WhatsAppModal
            isOpen={isOpen}
            onClose={handleCancel}
            title="Enviar nueva consulta"
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
                        Enviar
                    </Button>
                </>
            )}
        >
            <div className={styles.content}>
                <p className={styles.description}>
                    Contanos más sobre tu inconveniente para que podamos ayudarte. Cuanta más
                    información nos compartas, más rápido podremos darte una respuesta útil.
                </p>

                <div className={styles.fieldGroup}>
                    <label htmlFor="help-message" className={styles.label}>
                        Mensaje
                    </label>
                    <ConfigProvider theme={textareaTheme}>
                        <TextArea
                            id="help-message"
                            placeholder="Escribe tu mensaje..."
                            value={values.message}
                            onChange={handleFieldChange('message')}
                            autoSize={{ minRows: 6, maxRows: 6 }}
                            className={styles.textArea}
                            maxLength={1200}
                            showCount
                        />
                    </ConfigProvider>
                    <span className={styles.helper}>Sé específico. Incluye links, ejemplos o pasos para reproducir el problema.</span>
                    {errors.message && (
                        <span className={styles.error}>{errors.message}</span>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <Input
                        label="Enviar una copia de esta consulta a otro email"
                        placeholder="Ingresa el correo"
                        type="email"
                        value={values.copyEmail}
                        onChange={handleFieldChange('copyEmail')}
                        error={errors.copyEmail}
                        helperText="Opcional"
                        wrapperClassName={styles.inputWrapper}
                    />
                </div>

                <div className={`${styles.fieldGroup} ${styles.attachments}`}>
                    <span className={styles.label}>Adjuntar imagen</span>
                    <div className={styles.attachmentControls}>
                        <label className={styles.attachButton}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAttachmentChange}
                                className={styles.fileInput}
                            />
                            <Paperclip size={18} />
                            Seleccionar archivo
                        </label>

                        {hasAttachment && values.attachment && (
                            <div className={styles.attachmentInfo}>
                                <Paperclip size={16} />
                                <span className={styles.attachmentName}>
                                    {values.attachment.name}
                                </span>
                                <button
                                    type="button"
                                    className={styles.removeAttachment}
                                    onClick={handleRemoveAttachment}
                                    aria-label="Eliminar archivo adjunto"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                    <span className={styles.helper}>Aceptamos archivos PNG, JPG o JPEG de hasta 5 MB.</span>
                </div>

                {status === 'error' && (
                    <div className={styles.statusError}>
                        Ocurrió un error al enviar tu consulta. Inténtalo nuevamente en unos minutos.
                    </div>
                )}
            </div>
        </WhatsAppModal>
    );
};

export default SupportRequestModal;


