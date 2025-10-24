import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntegrationSidebar = ({ activeCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'portales') {
      navigate('/integrations/portals');
    } else if (categoryId === 'calendario') {
      navigate('/integrations/calendar');
    } else if (categoryId === 'instagram-whatsapp') {
      navigate('/integrations/social-media');
    } else if (categoryId === 'hoomi') {
      navigate('/integrations/hoomi');
    } else if (categoryId === 'email') {
      navigate('/integrations/email');
    } else if (categoryId === 'redes-inmobiliarias') {
      navigate('/integrations/networks');
    } else if (categoryId === 'email-marketing') {
      navigate('/integrations/emailMarketing');
    }
  };

  return (
    <div style={{ width: '200px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
        CATEGORÍAS
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '4px' }}>
          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: activeCategory === 'portales' ? '#dbeafe' : 'transparent',
              color: activeCategory === 'portales' ? '#1d4ed8' : '#6b7280',
              fontSize: '14px',
              fontWeight: activeCategory === 'portales' ? '600' : '400',
              textAlign: 'left',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'portales') {
                e.target.style.background = '#f1f5f9';
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'portales') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
            onClick={() => handleCategoryClick('portales')}
          >
            Portales
          </button>
        </li>
        <li style={{ marginBottom: '4px' }}>
          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: activeCategory === 'calendario' ? '#dbeafe' : 'transparent',
              color: activeCategory === 'calendario' ? '#1d4ed8' : '#6b7280',
              fontSize: '14px',
              fontWeight: activeCategory === 'calendario' ? '600' : '400',
              textAlign: 'left',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'calendario') {
                e.target.style.background = '#f1f5f9';
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'calendario') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
            onClick={() => handleCategoryClick('calendario')}
          >
            Calendario
          </button>
        </li>
        <li style={{ marginBottom: '4px' }}>
          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: activeCategory === 'instagram-whatsapp' ? '#dbeafe' : 'transparent',
              color: activeCategory === 'instagram-whatsapp' ? '#1d4ed8' : '#6b7280',
              fontSize: '14px',
              fontWeight: activeCategory === 'instagram-whatsapp' ? '600' : '400',
              textAlign: 'left',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'instagram-whatsapp') {
                e.target.style.background = '#f1f5f9';
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'instagram-whatsapp') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
            onClick={() => handleCategoryClick('instagram-whatsapp')}
          >
            Instagram y WhatsApp
          </button>
        </li>
        <li style={{ marginBottom: '4px' }}>
          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: activeCategory === 'hoomi' ? '#dbeafe' : 'transparent',
              color: activeCategory === 'hoomi' ? '#1d4ed8' : '#6b7280',
              fontSize: '14px',
              fontWeight: activeCategory === 'hoomi' ? '600' : '400',
              textAlign: 'left',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'hoomi') {
                e.target.style.background = '#f1f5f9';
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'hoomi') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
            onClick={() => handleCategoryClick('hoomi')}
          >
            Hoomi
          </button>
        </li>
        <li style={{ marginBottom: '4px' }}>
          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: activeCategory === 'email' ? '#dbeafe' : 'transparent',
              color: activeCategory === 'email' ? '#1d4ed8' : '#6b7280',
              fontSize: '14px',
              fontWeight: activeCategory === 'email' ? '600' : '400',
              textAlign: 'left',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'email') {
                e.target.style.background = '#f1f5f9';
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'email') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
            onClick={() => handleCategoryClick('email')}
          >
            Correo electrónico
          </button>
        </li>
        <li style={{ marginBottom: '4px' }}>
          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: activeCategory === 'redes-inmobiliarias' ? '#dbeafe' : 'transparent',
              color: activeCategory === 'redes-inmobiliarias' ? '#1d4ed8' : '#6b7280',
              fontSize: '14px',
              fontWeight: activeCategory === 'redes-inmobiliarias' ? '600' : '400',
              textAlign: 'left',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'redes-inmobiliarias') {
                e.target.style.background = '#f1f5f9';
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'redes-inmobiliarias') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
            onClick={() => handleCategoryClick('redes-inmobiliarias')}
          >
            Redes inmobiliarias
          </button>
        </li>
        <li style={{ marginBottom: '4px' }}>
          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: activeCategory === 'email-marketing' ? '#dbeafe' : 'transparent',
              color: activeCategory === 'email-marketing' ? '#1d4ed8' : '#6b7280',
              fontSize: '14px',
              fontWeight: activeCategory === 'email-marketing' ? '600' : '400',
              textAlign: 'left',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'email-marketing') {
                e.target.style.background = '#f1f5f9';
                e.target.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'email-marketing') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
            onClick={() => handleCategoryClick('email-marketing')}
          >
            Email marketing
          </button>
        </li>
      </ul>
    </div>
  );
};

export default IntegrationSidebar;