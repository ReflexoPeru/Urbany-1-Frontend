// src/features/dashboard/components/SalesByZone/SalesByZone.jsx
import React from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import ChatIcon from '@mui/icons-material/ChatBubbleOutline';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './SalesByZone.module.css';

/**
 * Componente SalesByZone - Muestra las ventas organizadas por zona geográfica
 * Incluye filtros de período y categorización para los datos de ventas
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.data - Datos de ventas por zona (para futura implementación)
 * @returns {JSX.Element} Componente de ventas por zona
 */
const SalesByZone = ({ data }) => {
  return (
    <div className={styles.salesByZone}>
      {/* 
        Encabezado compacto con información de ventas y filtros 
        Contiene título principal, subtítulo y filtros de visualización
      */}
      <div className={styles.header}>
        <div className={styles.titles}>
          
          {/* 
            Primera línea: Título principal con filtro de período 
            Muestra "Ventas por zona" y el filtro temporal activo
            Incluye icono Flag a la izquierda
          */}
          <div className={styles.titleRow}>
            <div className={styles.titleWithIcon}>
              {/* Icono Flag - indicador visual de zona geográfica */}
              <FlagIcon className={styles.flagIcon} />
              <div className={styles.titleSection}>
                <h2 className={styles.mainTitle}>Ventas por</h2>
                <span className={styles.titleSecondary}>zona</span>
              </div>
            </div>
            {/* Contenedor de filtro con iconos y texto para la primera línea */}
            <div className={styles.filterContainer}>
              <ViewColumnIcon className={styles.squareIcon} />
              <span className={styles.filterText}>Un trimestre</span>
              <ExpandMoreIcon className={styles.caretIcon} />
            </div>
          </div>
          
          {/* 
            Línea divisoria para separar visualmente las secciones 
            Proporciona una clara separación entre título y subtítulo
          */}
          <div className={styles.separator}></div>
          
          {/* 
            Segunda línea: Subtítulo con filtro de categorización 
            Muestra el tipo de datos que se está visualizando y el filtro geográfico
            AHORA CON FLECHAS A AMBOS LADOS DEL TEXTO
          */}
          <div className={styles.titleRow}>
            <div className={styles.titleWithIcon}>
              {/* Icono Chat - indicador visual de datos de conversación/ventas */}
              <ChatIcon className={styles.chatIcon} />
              <div className={styles.subtitleSection}>
                <p className={styles.subtitle}>Viendo cant.</p>
                <span className={styles.subtitleSecondary}>de ventas</span>
              </div>
            </div>
            {/* Contenedor de filtro CON FLECHAS A AMBOS LADOS para la segunda línea */}
            <div className={styles.filterContainer}>
              <ExpandMoreIcon className={styles.caretIcon} />
              <span className={styles.filterText}>Por barrio</span>
              <ExpandMoreIcon className={styles.caretIcon} />
            </div>
          </div>
          
        </div>
      </div>
      
      {/*
        ESPACIO RESERVADO PARA GRÁFICO FUTURO:
        - Aquí se implementará la visualización de datos cuando esté disponible
        - Se puede añadir un componente de gráfico o tabla de datos
        - Actualmente el espacio está optimizado para altura mínima
      */}
      
    </div>
  );
};

export default SalesByZone;