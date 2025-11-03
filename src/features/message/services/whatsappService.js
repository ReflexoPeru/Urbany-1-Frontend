const whatsappService = {
  async acquireAddon() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },

  async getStatus() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ connected: false });
      }, 500);
    });
  }
};

export default whatsappService;

