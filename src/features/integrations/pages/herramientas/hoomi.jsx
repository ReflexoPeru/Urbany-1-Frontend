import React from 'react';
import { ChatCircle } from 'phosphor-react';
import StaticCard from '../../components/StaticCard';

const Hoomi = () => {
  return (
    <div style={{ marginLeft: '12px' }}>
      <StaticCard
        title="Hoomi"
        description="Hoomi es un bot especializado en el sector inmobiliario, diseñado para acompañarte en la gestión diaria de tus contactos y oportunidades."
        icon={<ChatCircle size={20} weight="bold" color="#10B981" />}
        features={[
          "Responder automáticamente los mensajes de WhatsApp",
          "Detectar el interés de tus clientes y sugerirles las propiedades más adecuadas",
          "Crear negocios y tasaciones directamente en el CRM",
          "Coordinar llamadas y visitas en tu agenda",
          "Mantenerte informado sobre cada avance importante"
        ]}
        infoTexts={[
          "Hoomi se conectará a tu cuenta de WhatsApp y te ayudará a gestionar solo los nuevos contactos.",
          "Recuerda no tener configurado mensajes automáticos en tu WhatsApp, sino Hoomi se desactivará en el momento que se envíen."
        ]}
        actionText="Para poder usar Hoomi, primero debes conectar tu cuenta de WhatsApp"
        buttonText="Conectar mi cuenta de WhatsApp"
      />
    </div>
  );
};

export default Hoomi;