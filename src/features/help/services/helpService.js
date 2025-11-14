const helpService = {
    async submitConsultation(payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    payload
                });
            }, 800);
        });
    }
};

export default helpService;



