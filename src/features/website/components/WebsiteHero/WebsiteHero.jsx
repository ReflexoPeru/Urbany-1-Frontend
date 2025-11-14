import React from 'react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import Button from '../../../../components/ui/Button';
import WebsiteIllustration from '../WebsiteIllustration';
import styles from './WebsiteHero.module.css';

const WebsiteHero = ({ onWatchVideo, onRequestWebsite }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.textBlock}>
                <h1 className={styles.title}>Creación a medida de sitio web</h1>
                <p className={styles.subtitle}>
                    Ahora tener un sitio web totalmente personalizable está a su alcance. Cree sitios web inmobiliarios
                    impresionantes, con su estilo, tipografía, secciones – ¡todo está a su alcance!
                </p>

                <div className={styles.illustration}>
                    <WebsiteIllustration />
                </div>

                <div className={styles.actions}>
                    <Button
                        variant="secondary"
                        size="large"
                        className={styles.secondaryButton}
                        onClick={onWatchVideo}
                    >
                        <IconPlayerPlayFilled size={18} />
                        ¿Cómo funciona?
                    </Button>

                    <Button
                        variant="primary"
                        size="large"
                        onClick={onRequestWebsite}
                    >
                        Solicitar sitio web
                    </Button>
                </div>

                <p className={styles.notice}>
                    Todos los planes contienen sitio web autoadministrable y el panel de modificaciones.
                </p>
            </div>
        </section>
    );
};

export default WebsiteHero;


