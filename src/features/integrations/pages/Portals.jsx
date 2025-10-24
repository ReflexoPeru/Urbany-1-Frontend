import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollableContainer from '../components/ScrollableContainer/ScrollableContainer';
import IntegrationSidebar from '../components/IntegrationSidebar/IntegrationSidebar';
import ExpandableCard from '../components/ExpandableCard';

const Portals = () => {
  const [selectedCategory, setSelectedCategory] = useState('portales');
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'portales') {
      navigate('/integrations');
    } else if (categoryId === 'calendario') {
      navigate('/calendar');
    } else if (categoryId === 'instagram-whatsapp') {
      navigate('/social-media');
    } else if (categoryId === 'hoomi') {
      navigate('/hoomi');
    }
  };

  return (
    <ScrollableContainer>
      <div style={{ marginBottom: '32px', marginLeft: '0px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Integraciones
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 24px 0' }}>
          Realice las diferentes integraciones para incrementar su efectividad
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <IntegrationSidebar activeCategory={selectedCategory} />

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
              Integración personalizada
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ExpandableCard
                title="MercadoLibre"
                description="Integre una página web desarrollada por 2clics para publicar, editar, eliminar sus inmuebles y sincronizar las consultas."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#FFE600"/>
                    <path d="M8 8h8v8H8z" fill="#ffffff"/>
                    <path d="M10 10h4v4h-4z" fill="#FFE600"/>
                    <circle cx="12" cy="12" r="2" fill="#ffffff"/>
                  </svg>
                }
              />

              <ExpandableCard
                title="InmoUP"
                description="Integre InmoUP para publicar, editar y eliminar sus inmuebles."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#3B82F6"/>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#ffffff"/>
                  </svg>
                }
              />

              <ExpandableCard
                title="Pagina Web"
                description="Integre una página web desarrollada por 2clics para publicar, editar, eliminar sus inmuebles y sincronizar las consultas."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#10B981"/>
                    <path d="M8 8h8v2H8V8z" fill="#ffffff"/>
                    <path d="M8 12h8v2H8v-2z" fill="#ffffff"/>
                    <path d="M8 16h4v2H8v-2z" fill="#ffffff"/>
                    <circle cx="6" cy="6" r="1" fill="#ffffff"/>
                  </svg>
                }
              />

              <ExpandableCard
                title="Inmoclick"
                description="Integre Inmoclick para publicar, editar y eliminar sus inmuebles."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#8B5CF6"/>
                    <path d="M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" fill="#ffffff"/>
                  </svg>
                }
              />

              <ExpandableCard
                title="Brokian"
                description="Integre Brokian para publicar, editar y eliminar sus inmuebles."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#F59E0B"/>
                    <path d="M12 2l3 6h6l-5 4 2 6-6-3-6 3 2-6-5-4h6l3-6z" fill="#ffffff"/>
                  </svg>
                }
              />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
              Portales pagos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ExpandableCard
                title="Proppit"
                description="Integre Proppit para publicar, editar, eliminar sus inmuebles."
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#EF4444"/>
                    <path d="M8 6h6v2H8V6z" fill="#ffffff"/>
                    <path d="M8 10h6v2H8v-2z" fill="#ffffff"/>
                    <path d="M8 14h4v2H8v-2z" fill="#ffffff"/>
                    <circle cx="6" cy="6" r="1" fill="#ffffff"/>
                  </svg>
                }
                infoTexts={[
                  "Si ya tienes una cuenta en Proppit ingresa el email con la que fue creada.",
                  "Si todavía no tienes una cuenta, ingresa un email con el cuál se te va a crear una cuenta y publicar tus propiedades."
                ]}
                actionText="Correo electrónico"
                buttonText="example@gmail.com"
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollableContainer>
  );
};

export default Portals;

