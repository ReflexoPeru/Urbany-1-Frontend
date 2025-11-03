import React from 'react';
import ExpandableCard from '../../components/ExpandableCard';
import { portalsData } from '../../../../mock/portals';

const Portals = () => {
  const { customIntegrations, paidPortals } = portalsData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'inactive': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Conectado';
      case 'pending': return 'Pendiente';
      case 'inactive': return 'Desconectado';
      default: return 'Desconectado';
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
          {customIntegrations.title}
        </h3>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0' }}>
          {customIntegrations.description}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {customIntegrations.integrations.map((integration) => {
            const getIcon = (integrationId) => {
              switch (integrationId) {
                case 'mercadolibre':
                  return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#FFE600" />
                      <path d="M8 8h8v8H8z" fill="#ffffff" />
                      <path d="M10 10h4v4h-4z" fill="#FFE600" />
                      <circle cx="12" cy="12" r="2" fill="#ffffff" />
                    </svg>
                  );
                case 'inmoup':
                  return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#38E47A" />
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#ffffff" />
                    </svg>
                  );
                case 'website':
                  return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#10B981" />
                      <path d="M8 8h8v2H8V8z" fill="#ffffff" />
                      <path d="M8 12h8v2H8v-2z" fill="#ffffff" />
                      <path d="M8 16h4v2H8v-2z" fill="#ffffff" />
                      <circle cx="6" cy="6" r="1" fill="#ffffff" />
                    </svg>
                  );
                case 'inmoclick':
                  return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#8B5CF6" />
                      <path d="M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" fill="#ffffff" />
                    </svg>
                  );
                case 'brokian':
                  return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#F59E0B" />
                      <path d="M12 2l3 6h6l-5 4 2 6-6-3-6 3 2-6-5-4h6l3-6z" fill="#ffffff" />
                    </svg>
                  );
                default:
                  return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#38E47A" />
                      <circle cx="12" cy="12" r="3" fill="#ffffff" />
                    </svg>
                  );
              }
            };

            return (
              <ExpandableCard
                key={integration.id}
                title={integration.title}
                description={integration.description}
                icon={getIcon(integration.id)}
                status={integration.status}
                statusColor={getStatusColor(integration.status)}
                statusText={getStatusText(integration.status)}
                features={integration.features}
                setupSteps={integration.setupSteps}
                pricing={integration.pricing}
                lastSync={integration.lastSync}
              />
            );
          })}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
          {paidPortals.title}
        </h3>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0' }}>
          {paidPortals.description}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {paidPortals.integrations.map((integration) => (
            <ExpandableCard
              key={integration.id}
              title={integration.title}
              description={integration.description}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#EF4444" />
                  <path d="M8 6h6v2H8V6z" fill="#ffffff" />
                  <path d="M8 10h6v2H8v-2z" fill="#ffffff" />
                  <path d="M8 14h4v2H8v-2z" fill="#ffffff" />
                  <circle cx="6" cy="6" r="1" fill="#ffffff" />
                </svg>
              }
              status={integration.status}
              statusColor={getStatusColor(integration.status)}
              statusText={getStatusText(integration.status)}
              features={integration.features}
              setupSteps={integration.setupSteps}
              pricing={integration.pricing}
              lastSync={integration.lastSync}
              actionText={integration.actionText}
              buttonText={integration.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portals;

