export const notificationsMock = [
  {
    id: 1,
    type: 'success',
    title: 'Nueva propiedad agregada',
    message: 'Se ha agregado exitosamente la propiedad en Av. Principal 123',
    time: 'Hace 5 minutos',
    read: false,
    icon: 'House'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Documento pendiente',
    message: 'Tienes documentos pendientes por revisar en el negocio #12345',
    time: 'Hace 1 hora',
    read: false,
    icon: 'File'
  },
  {
    id: 3,
    type: 'info',
    title: 'Reunión programada',
    message: 'Tienes una reunión con el cliente Juan Pérez a las 15:00',
    time: 'Hace 2 horas',
    read: true,
    icon: 'Calendar'
  },
  {
    id: 4,
    type: 'success',
    title: 'Negocio cerrado',
    message: 'Se ha cerrado exitosamente el negocio #12345 por $150,000',
    time: 'Hace 3 horas',
    read: true,
    icon: 'CheckCircle'
  }
];

