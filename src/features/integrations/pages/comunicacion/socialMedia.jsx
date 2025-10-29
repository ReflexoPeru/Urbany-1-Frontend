import React from 'react';
import { WhatsappLogo } from 'phosphor-react';
import ExpandableCard from '../../components/ExpandableCard';

const SocialMedia = () => {
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
            actionText="Conectar cuenta de la inmobiliaria con Facebook"
            buttonText="Conectar cuentas de los agentes con Facebook"
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
          />

          <ExpandableCard
            title="WhatsApp"
            description="Integre su número de WhatsApp a su cuenta escaneando el QR para sincronizar sus conversaciones con el CRM."
            icon={<WhatsappLogo size={20} color="#25D366" weight="bold" />}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;