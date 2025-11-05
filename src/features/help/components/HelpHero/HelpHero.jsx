import React from 'react';
import { PlayCircle } from 'lucide-react';
import Badge from '../../../../components/common/Badge';
import Button from '../../../../components/ui/Button';
import styles from './HelpHero.module.css';

const HelpHero = ({ onRequestSupport, onWatchVideo }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.badgeWrapper}>
                <Badge variant="warning" size="medium">
                    Centro de soporte Urbany
                </Badge>
            </div>

            <div className={styles.titles}>
                <h1 className={styles.title}>Envíanos tu consulta</h1>
                <p className={styles.subtitle}>
                    Estamos listos para ayudarte a resolver cualquier duda sobre la plataforma.
                    Cuéntanos qué necesitas y un especialista se pondrá en contacto contigo.
                </p>
            </div>

            <div className={styles.actions}>
                <Button
                    variant="primary"
                    size="large"
                    onClick={onRequestSupport}
                >
                    Enviar nueva consulta
                </Button>

                <Button
                    variant="secondary"
                    size="large"
                    onClick={onWatchVideo}
                    className={styles.secondaryButton}
                >
                    <PlayCircle size={20} />
                    Ver video guía
                </Button>
            </div>
        </section>
    );
};

export default HelpHero;














