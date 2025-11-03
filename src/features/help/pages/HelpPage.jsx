import React from 'react';
import WhatsAppVideoModal from '../../../components/common/WhatsAppVideoModal';
import HelpHero from '../components/HelpHero';
import HelpHighlights from '../components/HelpHighlights';
import HelpIllustration from '../components/HelpIllustration';
import SupportRequestModal from '../components/SupportRequestModal';
import { useHelpModals } from '../hooks';
import styles from './HelpPage.module.css';

const HelpPage = () => {
    const {
        isRequestOpen,
        openRequestModal,
        closeRequestModal,
        isVideoOpen,
        openVideoModal,
        closeVideoModal
    } = useHelpModals();

    return (
        <div className={styles.helpPage}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <HelpHero
                        onRequestSupport={openRequestModal}
                        onWatchVideo={openVideoModal}
                    />
                    <HelpHighlights />
                </div>
                <div className={styles.visual}>
                    <HelpIllustration />
                </div>
            </div>

            <SupportRequestModal
                isOpen={isRequestOpen}
                onClose={closeRequestModal}
            />

            <WhatsAppVideoModal
                isOpen={isVideoOpen}
                onClose={closeVideoModal}
            />
        </div>
    );
};

export default HelpPage;


