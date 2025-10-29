// src/features/dashboard/services/salesService.js
export const salesService = {
  getDashboardData() {
    return {
      // Barras de progreso superiores
      operationsProgress: 55,
      salesProgress: 30,
      userBusinessProgress: 59,

      // Tareas
      tasks: [
        'Terminar la venta de hoy',
        'Ofrecer nuevos departamentos'
      ],

      // Tareas adicionales
      additionalTasks: ['Ver Más', 'Infección:', 'Un ingreso:'],

      // Ventas por zona
      salesByZone: {
        period: 'Un trimestre',
        view: 'Viendo carta de ventas',
        filter: 'Por barrio'
      },

      // Datos para el gráfico
      chartData: [
        { dia: "Lu", valor: 50 },
        { dia: "Ma", valor: 70 },
        { dia: "Mi", valor: 45 },
        { dia: "Ju", valor: 75 },
        { dia: "Vi", valor: 55 },
        { dia: "Sa", valor: 85 },
        { dia: "Do", valor: 50 },
      ]
    };
  },
};