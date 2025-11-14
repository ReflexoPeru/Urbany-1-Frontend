import React, { useState } from 'react';
import { WhatsappLogo } from 'phosphor-react';
import ExpandableCard from '../../components/ExpandableCard';
import ConfirmModal from '../../../../components/ui/Modal/ConfirmModal';
import { useToast } from '../../../../contexts/ToastContext';

const SocialMedia = () => {
  const { toast } = useToast();
  const [pendingRequest, setPendingRequest] = useState(null);

  const handleConnectInstagram = () => {
    setPendingRequest('instagram');
  };

  const handleConnectWhatsapp = (type) => {
    setPendingRequest(type);
  };

  const handleConfirm = () => {
    if (pendingRequest === 'instagram') {
      toast.success('Solicitud recibida', 'Te enviaremos los pasos para conectar Instagram Business.');
    } else if (pendingRequest === 'api') {
      toast.info('Equipo de soporte', 'En breves te contactaremos para habilitar la API Oficial de WhatsApp Business.');
    } else if (pendingRequest === 'personal') {
      toast.info('Equipo de soporte', 'Abrimos un chat para enviarte el QR de conexión con tu número personal.');
    }
    setPendingRequest(null);
  };

  return (
    <div style={{ marginLeft: '12px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
          Integraciones oficiales
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ExpandableCard
            title="Instagram"
            description="Integre su cuenta de Instagram Negocio y comience a publicar a través del CRM."
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#instagram-gradient)" />
                <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="white" />
                <circle cx="17" cy="7" r="1" fill="white" />
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E4405F" />
                    <stop offset="100%" stopColor="#F77737" />
                  </linearGradient>
                </defs>
              </svg>
            }
            infoTexts={[
              "Para poder conectar tu cuenta de Instagram primero debe estar relacionada a un negocio de Facebook.",
              "Suena complicado pero no te preocupes, te ayudaremos en todo el proceso. En el siguiente artículo tienes todo detallado.",
              "Una vez que lo hayas completado puedes conectar tu cuenta con el CRM desde aquí."
            ]}
            actionText="Solicitar conexión de Instagram"
            buttonText="Te enviaremos el paso a paso por correo"
            onActionPrimary={handleConnectInstagram}
            onSecondaryAction={handleConnectInstagram}
          />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
          Integración alternativa
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ExpandableCard
            title="WhatsApp Business API"
            description="Integre su cuenta de Facebook Business y conecte todo el equipo a un número de WhatsApp para tener todas las conversaciones en el CRM a través de la API Oficial."
            icon={<WhatsappLogo size={20} color="#25D366" weight="bold" />}
            infoTexts={[
              'Necesitas aprobación de Facebook Business Manager.',
              'Te ayudamos con los requisitos técnicos y el alta del número.',
              'Incluiremos métricas y seguimiento automatizado en Urbany.'
            ]}
            actionText="Solicitar activación de la API"
            onActionPrimary={() => handleConnectWhatsapp('api')}
          />

          <ExpandableCard
            title="WhatsApp"
            description="Integre su número de WhatsApp a su cuenta escaneando el QR para sincronizar sus conversaciones con el CRM."
            icon={<WhatsappLogo size={20} color="#25D366" weight="bold" />}
            infoTexts={[
              'Ideal para cuentas pequeñas o agentes independientes.',
              'Sin requisitos técnicos, solo necesitas escanear un código QR.',
              'Mantén todas tus conversaciones junto a los contactos y negocios.'
            ]}
            actionText="Conectar un número personal"
            buttonText="Recibir instrucciones por correo"
            onActionPrimary={() => handleConnectWhatsapp('personal')}
            onSecondaryAction={() => handleConnectWhatsapp('personal')}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={pendingRequest === 'instagram'}
        onClose={() => setPendingRequest(null)}
        onConfirm={handleConfirm}
        title="Conectar Instagram Business"
        message="Registraremos tu cuenta para habilitar la publicación directa desde Urbany. Te enviaremos un correo con los pasos y necesitaremos acceso al negocio de Facebook."
        confirmText="Solicitar conexión"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={pendingRequest === 'api'}
        onClose={() => setPendingRequest(null)}
        onConfirm={handleConfirm}
        title="Activar WhatsApp Business API"
        message="Nuestro equipo técnico coordinará la habilitación de la API oficial para tu inmobiliaria. ¿Deseas continuar con la solicitud?"
        confirmText="Solicitar activación"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={pendingRequest === 'personal'}
        onClose={() => setPendingRequest(null)}
        onConfirm={handleConfirm}
        title="Conectar WhatsApp personal"
        message="Te enviaremos un correo con el QR y la guía para vincular tu número personal. ¿Deseas recibirlo ahora?"
        confirmText="Enviar guía"
        cancelText="Cerrar"
      />
    </div>
  );
};

export default SocialMedia;