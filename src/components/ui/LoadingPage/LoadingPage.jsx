import React from 'react';
import { HashLoader } from 'react-spinners';

export const LoadingPage = ({ text = 'Cargando...', isVisible = false }) => {
  return (
    <div 
      className={`loading-overlay ${isVisible ? 'show' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px'
      }}
    >
      <HashLoader 
        size={60}
        color="#38e47a"
      />
      
      <p style={{
        margin: 0,
        fontSize: '20px',
        fontWeight: '600',
        color: '#1a1a1a',
        textAlign: 'center',
        letterSpacing: '-0.02em'
      }}>
        {text}
      </p>
    </div>
  );
};
