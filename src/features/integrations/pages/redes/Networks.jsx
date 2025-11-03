import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import StaticCard from '../../components/StaticCard';
import IntegrationAccordion from '../../components/IntegrationAccordion/IntegrationAccordion';

const Networks = () => {
  return (
    <div style={{ marginLeft: '12px' }}>
      <div style={{ marginBottom: '16px' }}>
        <StaticCard
          title="Redes inmobiliarias"
          description="Obten un mayor alcance y concreta más negocios a través de las redes inmobiliarias."
          icon={<Building2 size={20} color="#10B981" />}
          features={[
            "Elige en que redes compartir tus propiedades.",
            "Comparte fichas entre colegas.",
            "Las fichas de otra propiedad con tus datos.",
            "Asigna comisiones propias para cada propiedad."
          ]}
        />
      </div>

      <div>
        <IntegrationAccordion
          title="Red Urbany"
          description="Administre sus propiedades en la red y qué hacer al cargar una nueva"
          icon={
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ChevronRight size={16} color="white" />
            </div>
          }
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#f6fbf8',
            borderRadius: '12px',
            border: '1px solid #bbf7d0',
            textAlign: 'center',
            marginTop: '16px'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="12" width="40" height="40" rx="6" fill="#38E47A" />
                <circle cx="18" cy="18" r="2.5" fill="#EF4444" />
                <circle cx="24" cy="18" r="2.5" fill="#F59E0B" />
                <circle cx="30" cy="18" r="2.5" fill="#10B981" />
                <rect x="20" y="40" width="24" height="4" rx="1" fill="white" />
              </svg>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
              Aun no has recibido invitaciones
            </h4>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px 0' }}>
              También puedes crear una red e invitar colegas
            </p>
            <Button variant="success" size="small">
              Crear red inmobiliaria
            </Button>
          </div>
        </IntegrationAccordion>
      </div>
    </div>
  );
};

export default Networks;