import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPinLine, PhoneCall } from 'phosphor-react';
import Button from '../../../components/ui/Button/Button';
import { useNetworks } from '../hooks/useNetworks';
import slugify from '../../../utils/slugify';
import styles from './NetworkPropertyViewPage.module.css';

const formatPrice = (value, currency) => {
    const numeric = Number(value ?? 0);
    if (Number.isNaN(numeric)) {
        return 'Sin precio';
    }
    try {
        if (currency && ['COP', 'USD', 'EUR'].includes(currency)) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency,
                maximumFractionDigits: currency === 'COP' ? 0 : 2
            }).format(numeric);
        }
        return new Intl.NumberFormat('es-CO', {
            minimumFractionDigits: 0
        }).format(numeric);
    } catch {
        return String(numeric);
    }
};

const NetworkPropertyViewPage = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { rawProperties } = useNetworks();

    const property = useMemo(() => {
        const fromState = location.state?.property;
        if (fromState && fromState.id === propertyId) {
            return fromState;
        }
        return rawProperties.find((item) => item.id === propertyId) ?? null;
    }, [location.state, propertyId, rawProperties]);

    const handleBack = () => {
        navigate('/redes');
    };

    const handleViewRealEstate = () => {
        if (!property?.realEstate?.name) {
            return;
        }
        const realEstateSlug = slugify(property.realEstate.name);
        navigate(`/redes/inmobiliarias/${realEstateSlug}`, {
            state: {
                realEstateName: property.realEstate.name
            }
        });
    };

    if (!property) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyCard}>
                    <h1>No encontramos esta propiedad</h1>
                    <p>Es posible que haya sido removida de la red o que el enlace haya expirado.</p>
                    <Button variant="primary" size="medium" onClick={handleBack}>
                        Volver a redes
                    </Button>
                </div>
            </div>
        );
    }

    const locationLabel = [property.city, property.neighborhood].filter(Boolean).join(' · ') || 'Sin ubicación';
    const priceLabel = formatPrice(property.price, property.currency);
    const commissionLabel = property.commission != null ? `${property.commission}% comisión` : 'Sin comisión';

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button type="button" className={styles.backButton} onClick={handleBack}>
                    <ArrowLeft size={18} weight="bold" />
                    Volver a redes
                </button>
                <div className={styles.headerInfo}>
                    {property.operation && (
                        <span className={styles.operation}>{property.operation}</span>
                    )}
                    <h1 className={styles.title}>{property.address ?? 'Sin dirección'}</h1>
                    <p className={styles.subtitle}>
                        <MapPinLine size={18} weight="bold" />
                        {locationLabel}
                    </p>
                </div>
                <div className={styles.headerMeta}>
                    <span className={styles.priceBadge}>{priceLabel}</span>
                    <span className={styles.commissionBadge}>{commissionLabel}</span>
                </div>
            </header>

            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.mediaCard}>
                        {property.image ? (
                            <img src={property.image} alt={property.address ?? 'Propiedad sin dirección'} />
                        ) : (
                            <div className={styles.mediaFallback}>Sin imagen disponible</div>
                        )}
                    </div>

                    <section className={styles.section}>
                        <h2>Descripción</h2>
                        <p>{property.description || 'Esta propiedad aún no tiene una descripción publicada.'}</p>
                    </section>

                        <section className={styles.section}>
                        <h2>Características principales</h2>
                        <ul className={styles.featuresGrid}>
                            <li>
                                <span className={styles.featureLabel}>Tipo</span>
                                <span className={styles.featureValue}>{property.propertyType || 'Sin dato'}</span>
                            </li>
                            <li>
                                <span className={styles.featureLabel}>Dormitorios</span>
                                <span className={styles.featureValue}>{property.bedrooms ?? 'Sin dato'}</span>
                            </li>
                            <li>
                                <span className={styles.featureLabel}>Baños</span>
                                <span className={styles.featureValue}>{property.bathrooms ?? 'Sin dato'}</span>
                            </li>
                            <li>
                                <span className={styles.featureLabel}>Cobertura</span>
                                <span className={styles.featureValue}>{property.coverage || 'Sin dato'}</span>
                            </li>
                            <li>
                                <span className={styles.featureLabel}>Calidad de publicación</span>
                                <span className={styles.featureValue}>
                                    {property.quality != null ? `${property.quality}%` : 'Sin dato'}
                                </span>
                            </li>
                            <li>
                                <span className={styles.featureLabel}>Código</span>
                                <span className={styles.featureValue}>{property.code || 'Sin código'}</span>
                            </li>
                        </ul>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.card}>
                        <div className={styles.realEstateHeader}>
                            {property.realEstate?.logo ? (
                                <img src={property.realEstate.logo} alt={property.realEstate.name} />
                            ) : (
                                <div className={styles.logoFallback}>{property.realEstate?.name?.[0] ?? 'I'}</div>
                            )}
                            <div className={styles.realEstateInfo}>
                                <span className={styles.realEstateName}>{property.realEstate?.name ?? 'Sin inmobiliaria'}</span>
                                {property.contact?.name && (
                                    <span className={styles.realEstateAgent}>{property.contact.name}</span>
                                )}
                                {property.contact?.phone && (
                                    <span className={styles.realEstatePhone}>
                                        <PhoneCall size={16} weight="bold" />
                                        {property.contact.phone}
                                    </span>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="medium"
                            onClick={handleViewRealEstate}
                            disabled={!property.realEstate?.name}
                        >
                            Ver inmobiliaria
                        </Button>
                    </div>

                    <div className={styles.card}>
                        <h2>Estado en la red</h2>
                        <ul className={styles.statusList}>
                            <li>
                                <span>Propiedad favorita</span>
                                <strong>{property.isFavorite ? 'Sí' : 'No'}</strong>
                            </li>
                            <li>
                                <span>Propiedad propia</span>
                                <strong>{property.isMine ? 'Sí' : 'No'}</strong>
                            </li>
                            <li>
                                <span>Publicada el</span>
                                <strong>
                                    {property.publishedAt
                                        ? new Date(property.publishedAt).toLocaleDateString('es-CO', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                        : 'Sin dato'}
                                </strong>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default NetworkPropertyViewPage;


