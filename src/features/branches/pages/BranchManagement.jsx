import React from 'react';
import './BranchManagement.css';
import illustrationImage from '../../../assets/images/branch-management-illustration.svg';
import { Building, Users, MapPin, Star, ArrowRight, CheckCircle } from 'phosphor-react';

const BranchManagement = () => {
  const features = [
    {
      icon: Building,
      title: "Múltiples Sucursales",
      description: "Gestiona todas tus oficinas desde un solo lugar"
    },
    {
      icon: Users,
      title: "Equipos por Sucursal",
      description: "Asigna agentes y personal a cada ubicación"
    },
    {
      icon: MapPin,
      title: "Propiedades Organizadas",
      description: "Clasifica tus inmuebles por zona y sucursal"
    }
  ];

  return (
    <div className="branch-management-container">
      <div className="branch-management-card">
        {/* Licencia Profesional */}
        <div className="license-tag">
          <Star size={16} weight="fill" />
          Licencia Profesional
        </div>

        {/* Título principal */}
        <h1 className="main-title">
          <Building size={48} weight="duotone" />
          Gestión de Sucursales
        </h1>

        <div className="description">
          <p>Organiza tu información de manera profesional.</p>
          <p>Asigna propiedades, negocios y contactos a la sucursal correspondiente.</p>
        </div>

        {/* Características */}
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <IconComponent size={24} weight="duotone" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="illustration">
          <img
            src={illustrationImage}
            alt="Ilustración de gestión de sucursales"
            className="illustration-image"
          />
        </div>

        {/* Beneficios */}
        <div className="benefits">
          <h3 className="benefits-title">¿Qué incluye la Licencia Profesional?</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <CheckCircle size={20} weight="fill" />
              <span>Gestión ilimitada de sucursales</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={20} weight="fill" />
              <span>Reportes por sucursal</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={20} weight="fill" />
              <span>Asignación de equipos</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={20} weight="fill" />
              <span>Soporte prioritario</span>
            </div>
          </div>
        </div>

        {/* Botón de actualización */}
        <button className="upgrade-button">
          <Star size={20} weight="fill" />
          Actualizar a Licencia Profesional
          <ArrowRight size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
};

export default BranchManagement;
