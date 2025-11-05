import { useState, useCallback } from 'react';

const useWebsiteModals = () => {
    const [isRequestOpen, setIsRequestOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const openRequestModal = useCallback(() => {
        setIsRequestOpen(true);
    }, []);

    const closeRequestModal = useCallback(() => {
        setIsRequestOpen(false);
    }, []);

    const openVideoModal = useCallback(() => {
        setIsVideoOpen(true);
    }, []);

    const closeVideoModal = useCallback(() => {
        setIsVideoOpen(false);
    }, []);

    return {
        isRequestOpen,
        openRequestModal,
        closeRequestModal,
        isVideoOpen,
        openVideoModal,
        closeVideoModal
    };
};

export default useWebsiteModals;














