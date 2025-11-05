const websiteService = {
    async requestWebsite(payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, payload });
            }, 800);
        });
    }
};

export default websiteService;














