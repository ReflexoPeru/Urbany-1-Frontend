import React from 'react';
import heroImage from '../../../../assets/images/website/imagen.png';
import styles from './WebsiteIllustration.module.css';

const WebsiteIllustration = () => {
    return (
        <div className={styles.illustrationWrapper}>
            <img
                src={heroImage}
                alt="Ilustración de creación de sitio web"
                className={styles.image}
            />
        </div>
    );
};

export default WebsiteIllustration;














