import React from 'react';
import MessageIllustration from '../../../../components/common/MessageIllustration';
import styles from './HelpIllustration.module.css';

const HelpIllustration = () => {
    return (
        <div className={styles.illustrationWrapper}>
            <div className={styles.card}>
                <MessageIllustration />
            </div>
        </div>
    );
};

export default HelpIllustration;

