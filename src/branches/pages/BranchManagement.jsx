import React from 'react';
import './BranchManagement.css';
import illustrationImage from '../../assets/images/branch-management-illustration.svg';

const BranchManagement = () => {
  return (
    <div className="branch-management-container">
      <div className="branch-management-card">
        {/* Licencia Profesional */}
        <div className="license-tag">
          Licencia Profesional
        </div>
        
        {/* Título principal */}
        <h1 className="main-title">Gestión de Sucursales</h1>
        
        <div className="description">
          <p>Podrás organizar mejor tu información.</p>
          <p>Asigna tus propiedades, negocios y contactos a la sucursal que correspondiente.</p>
        </div>
        
        <div className="illustration">
          <img 
            src={illustrationImage} 
            alt="Ilustración de gestión de sucursales" 
            className="illustration-image"
          />
        </div>
        
        {/* Botón de actualización */}
        <button className="upgrade-button">
          + Actualiza a Licencia Profesional
        </button>
      </div>
    </div>
  );
};

export default BranchManagement;
