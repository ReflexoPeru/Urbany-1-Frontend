import React, { useEffect } from 'react';
import { IconPlayerPlayFilled, IconX } from '@tabler/icons-react';
import Button from '../../../../components/ui/Button';
import styles from './WebsiteVideoModal.module.css';

const WebsiteVideoModal = ({ isOpen, onClose, videoId = 'Z0U7grZQq9A' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Cerrar video"
                >
                    <IconX size={22} />
                </button>

                <div className={styles.header}>
                    <div className={styles.badge}>
                        <IconPlayerPlayFilled size={18} />
                        Demo del creador de sitios web
                    </div>
                    <h2 className={styles.title}>Conoce el proceso de creación en Urbany</h2>
                    <p className={styles.subtitle}>
                        Aprende cómo configuramos un sitio inmobiliario profesional en minutos: estructura, secciones, captura de
                        leads y personalización total.
                    </p>
                </div>

                <div className={styles.videoWrapper}>
                    <iframe
                        src={youtubeUrl}
                        title="Video demo del sitio web Urbany"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <div className={styles.footer}>
                    <Button variant="primary" onClick={onClose}>
                        Quiero saber más
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WebsiteVideoModal;














