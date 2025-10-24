import React from 'react';

const ScrollableContainer = ({ children, className = '' }) => {
  return (
    <div 
      className={className}
      style={{
        padding: '32px',
        fontFamily: 'Poppins, sans-serif',
        background: '#fff',
        borderRadius: '12px',
        margin: '20px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        height: 'calc(100vh - 200px)',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
