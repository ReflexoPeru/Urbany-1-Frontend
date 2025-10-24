import React, { useState } from 'react';
import { ChatCircle } from 'phosphor-react';
import StaticCard from '../../components/StaticCard';
import ExpandableCard from '../../components/ExpandableCard';

const Hoomi = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <ExpandableCard
          title="Cliengo"
          description="Integre Cliengo para publicar, editar y eliminar sus inmuebles."
          icon={<ChatCircle size={20} weight="bold" color="#3B82F6" />}
        />
      </div>
      <StaticCard
        title="Hoomi"
        description="Integre Hoomi para publicar, editar y eliminar sus inmuebles."
        icon={<ChatCircle size={20} weight="bold" color="#10B981" />}
        actionText="Configurar"
        buttonText="Configurar"
      />
    </div>
  );
};

export default Hoomi;