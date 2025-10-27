import React, { useState } from 'react';
import { InstagramLogo, WhatsappLogo } from 'phosphor-react';
import ExpandableCard from '../../components/ExpandableCard';

const SocialMedia = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
          Redes sociales
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ExpandableCard
            title="Instagram"
            description="Integre Instagram para publicar, editar y eliminar sus inmuebles."
            icon={<InstagramLogo size={20} weight="bold" color="#E4405F" />}
          />

          <ExpandableCard
            title="WhatsApp"
            description="Integre WhatsApp para publicar, editar y eliminar sus inmuebles."
            icon={<WhatsappLogo size={20} weight="bold" color="#25D366" />}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;