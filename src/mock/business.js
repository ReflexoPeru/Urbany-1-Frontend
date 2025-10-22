export const deals = [
  {
    id: 'deal-1',
    name: 'Diego Rodríguez',
    contact: {
      phone: '(555) 987-6543',
      email: 'diego.rodriguez@email.com',
    },
    property: {
      operation: 'Venta',
      status: 'Disponible',
      address: '456 Calle Roble',
    },
    date: '2025-09-23',
    stage: 'Nuevo Negocio',
    agent: 'Agente A',
    tags: ['Venta', 'Disponible'],
  },
    {
    id: 'deal-2',
    name: 'Mirko Ramoz',
    contact: {
      phone: '935 123 456',
      email: 'mirkolimas@email.com',
    },
    property: {
      operation: 'Compra',
      status: 'No disponible',
      address: 'Av Peru 451',
    },
    date: '2025-08-27',
    stage: 'Nuevo Negocio',
    agent: 'Agente B',
    tags: ['Compra', 'No disponible'],
  },
];

export const summaryByStage = [
  { stage: 'Nuevo Negocio', count: 1 },
  { stage: 'Contactado', count: 0 },
  { stage: 'Visita Programada', count: 0 },
  { stage: 'En Negociación', count: 0 },
  { stage: 'Frío', count: 0 },
];

export default { deals, summaryByStage };


