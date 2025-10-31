export const dashboardDataService = {
  getData() {
    return {
      progress: {
        operations: { percent: 55, current: 8, total: 15 },
        sales: { percent: 30, current: 8, total: 40 },
        userOpen: { percent: 89, current: 40, total: 55 },
        users: [
          { name: 'Karen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
          { name: 'Hugo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
          { name: 'Daniela', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face' }
        ],
      },
      tasks: ['Terminar la venta de hoy', 'Ofrecer nuevos departamentos'],
      businessCounts: { new: 40, contacted: 79, scheduled: 79 },
      completionRate: { percent: 95, delta: 2.5 },
      completionSpark: [
        { x: 1, y: 20 },
        { x: 2, y: 35 },
        { x: 3, y: 28 },
        { x: 4, y: 42 },
        { x: 5, y: 37 },
        { x: 6, y: 48 }
      ],
      walletPen: 675000,
      chart: [
        { dia: 'Lu', valor: 50 },
        { dia: 'Ma', valor: 68 },
        { dia: 'Mi', valor: 45 },
        { dia: 'Ju', valor: 75 },
        { dia: 'Vi', valor: 56 },
        { dia: 'Sa', valor: 86 },
        { dia: 'Do', valor: 50 },
      ],
    };
  },
};


