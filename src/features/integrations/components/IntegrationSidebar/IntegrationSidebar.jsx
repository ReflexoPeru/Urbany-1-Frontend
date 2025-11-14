import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'portales', label: 'Portales', path: '/integrations/portals' },
  { id: 'calendario', label: 'Calendario', path: '/integrations/calendar' },
  { id: 'instagram-whatsapp', label: 'Instagram y WhatsApp', path: '/integrations/social-media' },
  { id: 'hoomi', label: 'Hoomi', path: '/integrations/hoomi' },
  { id: 'email', label: 'Correo electrónico', path: '/integrations/email' },
  { id: 'redes-inmobiliarias', label: 'Redes inmobiliarias', path: '/integrations/networks' },
  { id: 'marketing', label: 'Marketing digital', path: '/integrations/marketing' },
  { id: 'email-marketing', label: 'Email marketing', path: '/integrations/emailMarketing' },
];

const baseButtonStyle = {
  fontFamily: 'Poppins, sans-serif',
  width: '100%',
  padding: '12px 16px',
  border: 'none',
  fontSize: '14px',
  textAlign: 'left',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const IntegrationSidebar = ({ activeCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ width: '220px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#4b6359', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
        Categorías
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const baseColor = '#60766d';
          const style = {
            ...baseButtonStyle,
            background: isActive ? '#d1fae5' : 'transparent',
            color: isActive ? '#047857' : baseColor,
            fontWeight: isActive ? '600' : '400',
            boxShadow: isActive ? '0 8px 18px rgb(16 185 129 / 20%)' : 'none',
          };

          return (
            <li key={category.id} style={{ marginBottom: '4px' }}>
              <button
                type="button"
                style={style}
                onMouseEnter={(event) => {
                  if (!isActive) {
                    event.currentTarget.style.background = '#ecfdf5';
                    event.currentTarget.style.color = '#14532d';
                  }
                }}
                onMouseLeave={(event) => {
                  if (!isActive) {
                    event.currentTarget.style.background = 'transparent';
                    event.currentTarget.style.color = baseColor;
                  }
                }}
                onClick={() => handleCategoryClick(category.path)}
              >
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IntegrationSidebar;
