import React from 'react';
import { Mail } from 'lucide-react';
import StaticCard from '../../components/StaticCard';

const Email = () => {
  return (
    <div style={{ marginLeft: '12px' }}>
      <StaticCard
        title="Integración de correo electrónico"
        description="Pero primero debe estar tu web configurada. ¿Qué podré hacer una vez que tenga mi cuenta creada?"
        icon={<Mail size={20} color="#10B981" />}
        features={[
          "Sincronizar los correos de urbany con tu cuenta de email profesional",
          "Difundir tus propiedades por email",
          "Efectuar seguimiento de las aperturas de correo",
          "Ahorrar tiempo usando plantillas personalizables",
          "Personalizar tu firma para tener una apariencia más profesional",
          "Comparte tu disponibilidad con tus compañeros de trabajo"
        ]}
      />
    </div>
  );
};

export default Email;