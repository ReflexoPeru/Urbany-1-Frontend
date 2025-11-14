import React, { useEffect } from 'react';
import { PaperPlaneTilt } from 'phosphor-react';
import styles from './ResetPasswordModal.module.css';

const ResetPasswordModal = ({ isOpen, onClose, onConfirm, user }) => {
    useEffect(() => {
        if (!isOpen) return undefined;

        const handleKeyUp = (event) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('keyup', handleKeyUp);
        return () => document.removeEventListener('keyup', handleKeyUp);
    }, [isOpen, onClose]);

    if (!isOpen || !user) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <h2 className={styles.title}>Restablecer contraseña</h2>
                <p className={styles.message}>
                    Se enviará un correo a <span className={styles.email}>{user.email}</span> para que pueda restablecer su
                    contraseña.
                </p>
                <p className={styles.message}>
                    También se copiará el link para restablecer la contraseña en el portapapeles para que puedas utilizarlo.
                </p>

                <div className={styles.actions}>
                    <button type="button" className={styles.buttonSecondary} onClick={onClose}>
                        Cancelar
                    </button>
                    <button type="button" className={styles.buttonPrimary} onClick={onConfirm}>
                        <PaperPlaneTilt size={18} weight="bold" />
                        <span>Enviar correo y copiar link</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;

