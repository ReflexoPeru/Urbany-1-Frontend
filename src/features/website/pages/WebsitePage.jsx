import React from 'react';
import WebsiteHero from '../components/WebsiteHero';
import WebsiteRequestModal from '../components/WebsiteRequestModal';
import WebsiteVideoModal from '../components/WebsiteVideoModal';
import { useWebsiteModals } from '../hooks';
import styles from './WebsitePage.module.css';

const WebsitePage = () => {
    const {
        isRequestOpen,
        openRequestModal,
        closeRequestModal,
        isVideoOpen,
        openVideoModal,
        closeVideoModal
    } = useWebsiteModals();

    return (
        <div className={styles.websitePage}>
            <div className={styles.container}>
                <WebsiteHero
                    onRequestWebsite={openRequestModal}
                    onWatchVideo={openVideoModal}
                />
            </div>

            <WebsiteRequestModal
                isOpen={isRequestOpen}
                onClose={closeRequestModal}
            />

            <WebsiteVideoModal
                isOpen={isVideoOpen}
                onClose={closeVideoModal}
            />
        </div>
    );
};

export default WebsitePage;


