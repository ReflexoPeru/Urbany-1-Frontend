import React, { useEffect } from 'react';
import { IconBrandYoutube, IconX } from '@tabler/icons-react';
import Button from '../../ui/Button';
import styles from './WhatsAppVideoModal.module.css';

const WhatsAppVideoModal = ({
  isOpen,
  onClose,
  videoId = '0EShSR1Ebn0'
}) => {
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
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const youtubeChannelUrl = 'https://www.youtube.com/@urbany';

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>
            ¿En qué puede ayudarte WhatsApp dentro del CRM?
          </h2>
          <div className={styles.headerContent}>
            <div className={styles.brandInfo}>
              <div className={styles.brandLogo}>
                <span className={styles.brandText}>CRM</span>
              </div>
              <div className={styles.brandDetails}>
                <p className={styles.brandTitle}>
                  CRM Urbany | WhatsApp: Integra tu número de WhatsApp en el CRM inmobiliario más simple del mercado
                </p>
              </div>
            </div>
            <button
              className={styles.shareButton}
              aria-label="Compartir"
            >
              <IconBrandYoutube size={20} />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.videoSection}>
            <div className={styles.videoContainer}>
              <iframe
                className={styles.video}
                src={videoUrl}
                title="CRM Urbany WhatsApp"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className={styles.videoInfo}>
              <p className={styles.videoTitle}>
                El primer CRM Inmobiliario con WhatsApp integrado
              </p>
            </div>
            <div className={styles.videoActions}>
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeButtonDark}
              >
                <IconBrandYoutube size={18} />
                Mirar en YouTube
              </a>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.youtubeButtonLight}
              >
                <IconBrandYoutube size={18} />
                Visitar CRM Urbany en YouTube
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            variant="primary"
            onClick={onClose}
          >
            ¡Quiero conocer más!
          </Button>
        </div>

        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <IconX size={24} />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppVideoModal;

