import React from 'react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/ui/Button';
import WhatsAppModal from '../../../components/common/WhatsAppModal';
import WhatsAppVideoModal from '../../../components/common/WhatsAppVideoModal';
import MessageIllustration from '../../../components/common/MessageIllustration';
import WhatsAppBrandButton from '../../../components/common/WhatsAppBrandButton';
import { useWhatsAppModal } from '../hooks';
import styles from './MessagePage.module.css';

const MessagePage = () => {
  const { isOpen, openModal, closeModal } = useWhatsAppModal();
  const { isOpen: isVideoOpen, openModal: openVideoModal, closeModal: closeVideoModal } = useWhatsAppModal();

  const handleAcquireClick = () => {
    openModal();
  };

  const handleVideoClick = () => {
    openVideoModal();
  };

  return (
    <div className={styles.messagePage}>
      <div className={styles.container}>
        <div className={styles.badgeContainer}>
          <Badge variant="warning" size="medium">
            Complemento WhatsApp
          </Badge>
        </div>

        <h1 className={styles.title}>
          Conecte sus conversaciones
        </h1>

        <div className={styles.description}>
          <p className={styles.descriptionText}>
            Ahora puedes integrar tu WhatsApp para potenciar tus ventas.
          </p>
          <p className={styles.descriptionText}>
            Mejora tus tiempos de respuesta, relaciona tus chats con los negocios, deja todo registrado.
          </p>
        </div>

        <div className={styles.illustrationContainer}>
          <MessageIllustration />
        </div>

        <div className={styles.branding}>
          <WhatsAppBrandButton onClick={handleVideoClick} />
        </div>

        <div className={styles.actionContainer}>
          <Button
            variant="primary"
            size="large"
            onClick={handleAcquireClick}
            fullWidth
          >
            Adquiere el complemento de WhatsApp
          </Button>
        </div>
      </div>

      <WhatsAppVideoModal
        isOpen={isVideoOpen}
        onClose={closeVideoModal}
      />

      <WhatsAppModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Adquirir complemento de WhatsApp"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={closeModal}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                closeModal();
              }}
            >
              Confirmar adquisición
            </Button>
          </>
        }
      >
        <div className={styles.modalContent}>
          <p>
            ¿Estás seguro de que deseas adquirir el complemento de WhatsApp?
          </p>
          <p>
            Este complemento te permitirá integrar tu WhatsApp Business con la plataforma
            y gestionar todas tus conversaciones desde un solo lugar.
          </p>
        </div>
      </WhatsAppModal>
    </div>
  );
};

export default MessagePage;
