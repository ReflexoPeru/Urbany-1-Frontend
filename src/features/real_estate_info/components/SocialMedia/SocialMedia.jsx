import React, { useState } from 'react';
import { ShareNetwork } from 'phosphor-react';
import Accordion from '../../../../components/ui/Accordion/Accordion';
import SocialMediaInput from './SocialMediaInput';
import styles from './SocialMedia.module.css';

const SocialMedia = () => {
    const [formData, setFormData] = useState({
        facebook: '',
        youtube: '',
        twitter: '',
        instagram: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Accordion
            title="Redes sociales de la inmobiliaria"
            icon={ShareNetwork}
            isOpen={false}
        >
            <div className={styles.sectionContent}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <SocialMediaInput
                            label="Facebook"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            placeholder="https://facebook.com/inmobiliaria"
                            platform="facebook"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <SocialMediaInput
                            label="Youtube"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleInputChange}
                            placeholder="https://youtube.com/inmobiliaria"
                            platform="youtube"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <SocialMediaInput
                            label="Twitter"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            placeholder="https://twitter.com/inmobiliaria"
                            platform="twitter"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <SocialMediaInput
                            label="Instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            placeholder="https://instagram.com/inmobiliaria"
                            platform="instagram"
                        />
                    </div>
                </div>
            </div>
        </Accordion>
    );
};

export default SocialMedia;
