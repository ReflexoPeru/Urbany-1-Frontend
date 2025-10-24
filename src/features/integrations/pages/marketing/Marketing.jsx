import React, { useState } from 'react';
import { GoogleLogo, FacebookLogo } from 'phosphor-react';
import ExpandableCard from '../../components/ExpandableCard';

const Marketing = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
          Marketing
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ExpandableCard
            title="Google Ads"
            description="Integre Google Ads para publicar, editar y eliminar sus inmuebles."
            icon={<GoogleLogo size={20} weight="bold" color="#4285F4" />}
          />

          <ExpandableCard
            title="Facebook Ads"
            description="Integre Facebook Ads para publicar, editar y eliminar sus inmuebles."
            icon={<FacebookLogo size={20} weight="bold" color="#1877F2" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Marketing;