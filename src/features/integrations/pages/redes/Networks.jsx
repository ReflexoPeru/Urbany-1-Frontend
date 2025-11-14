import React from 'react';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import styles from './Networks.module.css';
import { NetworksProvider, useNetworks } from '../../../networks/hooks/useNetworks';

const statusConfig = {
  connected: { label: 'Activa', color: '#16a34a' },
  pending: { label: 'Pendiente', color: '#f59e0b' },
  draft: { label: 'Borrador', color: '#94a3b8' }
};

const NetworksContent = () => {
  const { networks } = useNetworks();
  const navigate = useNavigate();

  const handleGoToNetworks = () => {
    navigate('/redes');
  };

  const handleEditNetwork = (id) => {
    navigate(`/redes/${id}`);
  };

  const filteredNetworks = networks.filter((network) => network.id === '2clics');
  const hasNetworks = filteredNetworks.length > 0;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroHeader}>
          <span className={styles.heroIcon}>
            <Building2 size={26} />
          </span>
          <div className={styles.heroText}>
            <h2>Redes inmobiliarias conectadas</h2>
            <p>Consulta tus alianzas activas, revisa la información de cada red y centraliza su seguimiento desde CRM Urbany.</p>
          </div>
        </div>
        <div className={styles.heroFeatures}>
          <div className={styles.heroFeature}>
            <span>Colaboración segura</span>
            <span>Comparte fichas y unifica la información con tu equipo y aliados.</span>
          </div>
          <div className={styles.heroFeature}>
            <span>Control de comisiones</span>
            <span>Define condiciones personalizadas por red y monitorea su cumplimiento.</span>
          </div>
          <div className={styles.heroFeature}>
            <span>Inventario actualizado</span>
            <span>Sigue la sincronización periódica y el estado de cada propiedad compartida.</span>
          </div>
        </div>
        <Button variant="primary" size="small" onClick={handleGoToNetworks} className={styles.createButton}>
          Administrar redes
        </Button>
      </section>

      <section>
        <h3 className={styles.listTitle}>Redes conectadas</h3>
        {!hasNetworks ? (
          <div className={styles.emptyState}>
            Aún no tienes redes activas. Crea una nueva o acepta una invitación desde el módulo de Redes.
          </div>
        ) : (
          <div className={styles.networkList}>
            {filteredNetworks.map((network) => {
              const status = statusConfig[network.connectionStatus] ?? statusConfig.connected;
              return (
                <article key={network.id} className={styles.networkCard}>
                  <div className={styles.networkHeader}>
                    <span className={styles.badge} style={{ background: network.tagColor || '#1d4ed8' }}>
                      {network.badgeText ?? '0'}
                    </span>
                    <div>
                      <h4 className={styles.networkTitle}>{network.name}</h4>
                      <p className={styles.networkDescription}>{network.description || 'Sin descripción registrada.'}</p>
                      <div className={styles.statusRow}>
                        <span className={styles.statusIndicator} style={{ background: status.color }} />
                        <span>{status.label}</span>
                        {network.syncFrequency && <span>· {network.syncFrequency}</span>}
                      </div>
                    </div>
                  </div>

                  <div className={styles.metaGrid}>
                    <div className={styles.metaCard}>
                      <span className={styles.metaLabel}>Contacto principal</span>
                      <span className={styles.metaValue}>{network.contactName || 'Sin asignar'}</span>
                      <span className={styles.metaMuted}>{network.contactEmail || 'Sin correo'}</span>
                      <span className={styles.metaMuted}>{network.contactPhone || 'Sin teléfono'}</span>
                    </div>
                    <div className={styles.metaCard}>
                      <span className={styles.metaLabel}>Comisión estándar</span>
                      <span className={styles.metaValue}>
                        {network.defaultCommission !== null && network.defaultCommission !== undefined
                          ? `${network.defaultCommission}%`
                          : 'No definida'}
                      </span>
                      <span className={styles.metaMuted}>
                        {network.sharePolicy || 'Define tu política de compartición para esta red.'}
                      </span>
                    </div>
                    <div className={styles.metaCard}>
                      <span className={styles.metaLabel}>Inventario</span>
                      <span className={styles.metaValue}>{network.propertiesCount ?? 0} propiedades</span>
                      <span className={styles.metaMuted}>Mis propiedades: {network.mineCount ?? 0}</span>
                      <span className={styles.metaMuted}>Favoritas: {network.favoriteCount ?? 0}</span>
                    </div>
                    <div className={styles.metaCard}>
                      <span className={styles.metaLabel}>Última sincronización</span>
                      <span className={styles.metaValue}>
                        {network.lastSync
                          ? new Date(network.lastSync).toLocaleString('es-CO', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Sin sincronizar'}
                      </span>
                      <span className={styles.metaMuted}>Estado actualizado desde CRM Urbany.</span>
                    </div>
                  </div>

                  <div className={styles.networkActions}>
                    <Button variant="ghost" size="small" onClick={() => handleEditNetwork(network.id)}>
                      Configurar red
                    </Button>
                    <Button variant="ghost" size="small" onClick={handleGoToNetworks}>
                      Ver propiedades compartidas
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

const Networks = () => (
  <NetworksProvider>
    <NetworksContent />
  </NetworksProvider>
);

export default Networks;