import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPinLine, PhoneCall } from 'phosphor-react';
import Button from '../../../components/ui/Button/Button';
import { useNetworks } from '../hooks/useNetworks';
import slugify from '../../../utils/slugify';
import styles from './NetworkRealEstateViewPage.module.css';

const NetworkRealEstateViewPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { rawProperties } = useNetworks();

    const properties = useMemo(
        () => rawProperties.filter((property) => slugify(property.realEstate?.name) === slug),
        [rawProperties, slug]
    );

    const primaryProperty = properties[0] ?? null;
    const realEstateName = primaryProperty?.realEstate?.name || location.state?.realEstateName || 'Inmobiliaria sin nombre';

    const handleBack = () => {
        navigate('/redes');
    };

    const handleOpenProperty = (property) => {
        navigate(`/redes/propiedades/${property.id}`, { state: { property } });
    };

    const contactName = primaryProperty?.contact?.name || 'Sin contacto';
    const contactPhone = primaryProperty?.contact?.phone || null;
    const coverageSet = new Set(properties.map((property) => property.coverage).filter(Boolean));
    const coverageList = Array.from(coverageSet);
    const locations = Array.from(
        new Set(
            properties
                .map((property) => [property.city, property.neighborhood].filter(Boolean).join(' · '))
                .filter(Boolean)
        )
    );

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button type="button" className={styles.backButton} onClick={handleBack}>
                    <ArrowLeft size={18} weight="bold" />
                    Volver a redes
                </button>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>{realEstateName}</h1>
                    {locations.length > 0 && (
                        <p className={styles.subtitle}>
                            <MapPinLine size={18} weight="bold" />
                            {locations.join(' · ')}
                        </p>
                    )}
                </div>
                <div className={styles.headerMeta}>
                    <div className={styles.metricCard}>
                        <span className={styles.metricLabel}>Propiedades en red</span>
                        <strong className={styles.metricValue}>{properties.length}</strong>
                    </div>
                    <div className={styles.metricCard}>
                        <span className={styles.metricLabel}>Coberturas</span>
                        <strong className={styles.metricValue}>{coverageList.length || 'Sin datos'}</strong>
                    </div>
                </div>
            </header>

            <div className={styles.layout}>
                <section className={styles.profileCard}>
                    <div className={styles.profileInfo}>
                        <div className={styles.logoFallback}>{realEstateName[0] ?? 'I'}</div>
                        <div className={styles.profileDetails}>
                            <span className={styles.contactLabel}>Contacto principal</span>
                            <span className={styles.contactName}>{contactName}</span>
                            {contactPhone && (
                                <span className={styles.contactPhone}>
                                    <PhoneCall size={16} weight="bold" />
                                    {contactPhone}
                                </span>
                            )}
                        </div>
                    </div>
                    {coverageList.length > 0 && (
                        <div className={styles.coverageList}>
                            {coverageList.map((coverage) => (
                                <span key={coverage}>{coverage}</span>
                            ))}
                        </div>
                    )}
                </section>

                <section className={styles.propertiesSection}>
                    <div className={styles.propertiesHeader}>
                        <h2>Propiedades compartidas</h2>
                        <span className={styles.propertiesCount}>{properties.length} resultados</span>
                    </div>

                    {properties.length === 0 ? (
                        <div className={styles.emptyProperties}>
                            <p>Esta inmobiliaria no tiene propiedades activas en la red seleccionada.</p>
                        </div>
                    ) : (
                        <div className={styles.propertiesGrid}>
                            {properties.map((property) => {
                                const locationLabel = [property.city, property.neighborhood]
                                    .filter(Boolean)
                                    .join(' · ') || 'Sin ubicación';
                                const commissionLabel = property.commission != null
                                    ? `${property.commission}% comisión`
                                    : 'Sin comisión';

                                return (
                                    <article key={property.id} className={styles.propertyCard}>
                                        <div className={styles.propertyMedia}>
                                            {property.image ? (
                                                <img src={property.image} alt={property.address ?? 'Propiedad sin dirección'} />
                                            ) : (
                                                <div className={styles.propertyFallback}>Sin imagen</div>
                                            )}
                                            <span className={styles.propertyTag}>{property.operation || 'Sin operación'}</span>
                                        </div>
                                        <div className={styles.propertyBody}>
                                            <h3>{property.address || 'Sin dirección'}</h3>
                                            <p>{locationLabel}</p>
                                            <div className={styles.propertyMeta}>
                                                <span>{property.propertyType || 'Tipo no definido'}</span>
                                                <span>{commissionLabel}</span>
                                            </div>
                                        </div>
                                        <div className={styles.propertyActions}>
                                            <Button variant="primary" size="small" onClick={() => handleOpenProperty(property)}>
                                                Ver propiedad
                                            </Button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default NetworkRealEstateViewPage;


