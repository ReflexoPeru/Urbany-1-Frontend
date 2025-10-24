export const toastsMock = {
  success: [
    {
      id: 1,
      type: 'success',
      title: 'Propiedad Publicada',
      message: 'La propiedad se publicó exitosamente',
      duration: 5000,
      icon: 'House'
    },
    {
      id: 2,
      type: 'success',
      title: 'Contacto Guardado',
      message: 'El contacto se agregó a tu lista',
      duration: 5000,
      icon: 'UserPlus'
    },
    {
      id: 3,
      type: 'success',
      title: 'Cita Confirmada',
      message: 'La visita fue agendada para mañana',
      duration: 5000,
      icon: 'CalendarCheck'
    },
    {
      id: 4,
      type: 'success',
      title: 'Pago Recibido',
      message: 'Se registró el pago de $15,000',
      duration: 5000,
      icon: 'CurrencyCircleDollar'
    },
    {
      id: 5,
      type: 'success',
      title: 'Contrato Firmado',
      message: 'El contrato fue firmado correctamente',
      duration: 5000,
      icon: 'FilePlus'
    },
    {
      id: 6,
      type: 'success',
      title: 'Usuario Autenticado',
      message: 'Has iniciado sesión correctamente',
      duration: 5000,
      icon: 'ShieldCheck'
    }
  ],

  error: [
    {
      id: 7,
      type: 'error',
      title: 'Error de Conexión',
      message: 'No se pudo conectar con el servidor',
      duration: 5000,
      icon: 'WifiSlash'
    },
    {
      id: 8,
      type: 'error',
      title: 'Publicación Fallida',
      message: 'No se pudo publicar la propiedad',
      duration: 5000,
      icon: 'XCircle'
    },
    {
      id: 9,
      type: 'error',
      title: 'Pago Rechazado',
      message: 'La transacción fue rechazada',
      duration: 5000,
      icon: 'CreditCard'
    },
    {
      id: 10,
      type: 'error',
      title: 'Archivo Inválido',
      message: 'El formato del archivo no es válido',
      duration: 5000,
      icon: 'FileX'
    },
    {
      id: 11,
      type: 'error',
      title: 'Acceso Denegado',
      message: 'No tienes permisos para esta acción',
      duration: 5000,
      icon: 'Lock'
    },
    {
      id: 12,
      type: 'error',
      title: 'Sesión Expirada',
      message: 'Tu sesión ha caducado, inicia sesión nuevamente',
      duration: 5000,
      icon: 'Clock'
    }
  ],

  warning: [
    {
      id: 13,
      type: 'warning',
      title: 'Campos Incompletos',
      message: 'Faltan datos obligatorios del inmueble',
      duration: 5000,
      icon: 'TextAlignLeft'
    },
    {
      id: 14,
      type: 'warning',
      title: 'Plan Básico',
      message: 'Actualiza tu plan para más funciones',
      duration: 5000,
      icon: 'Crown'
    },
    {
      id: 15,
      type: 'warning',
      title: 'Documentos Pendientes',
      message: 'Faltan 3 documentos por subir',
      duration: 5000,
      icon: 'Files'
    },
    {
      id: 16,
      type: 'warning',
      title: 'Límite de Propiedades',
      message: 'Has alcanzado el límite de tu plan',
      duration: 5000,
      icon: 'Warning'
    },
    {
      id: 17,
      type: 'warning',
      title: 'Visita sin Confirmar',
      message: 'El cliente aún no confirmó la cita',
      duration: 5000,
      icon: 'CalendarX'
    },
    {
      id: 18,
      type: 'warning',
      title: 'Precio Fuera de Rango',
      message: 'El precio está por debajo del mercado',
      duration: 5000,
      icon: 'TrendDown'
    }
  ],

  info: [
    {
      id: 19,
      type: 'info',
      title: 'Nueva Solicitud',
      message: 'Tienes una nueva solicitud de visita',
      duration: 5000,
      icon: 'Bell'
    },
    {
      id: 20,
      type: 'info',
      title: 'Recordatorio',
      message: 'Visita programada para hoy a las 3:00 PM',
      duration: 5000,
      icon: 'ClockCounterClockwise'
    },
    {
      id: 21,
      type: 'info',
      title: 'Actualización Disponible',
      message: 'Hay una nueva versión del sistema',
      duration: 5000,
      icon: 'ArrowsClockwise'
    },
    {
      id: 22,
      type: 'info',
      title: 'Nuevo Comentario',
      message: 'Juan comentó en tu propiedad',
      duration: 5000,
      icon: 'ChatCircle'
    },
    {
      id: 23,
      type: 'info',
      title: 'Reporte Generado',
      message: 'Tu reporte mensual está listo',
      duration: 5000,
      icon: 'ChartLine'
    },
    {
      id: 24,
      type: 'info',
      title: 'Sincronización Completa',
      message: 'Tus datos se sincronizaron correctamente',
      duration: 5000,
      icon: 'CloudCheck'
    }
  ]
};

// Array plano con todos los toasts
export const allToasts = [
  ...toastsMock.success,
  ...toastsMock.error,
  ...toastsMock.warning,
  ...toastsMock.info
];

// Función helper para obtener toasts por tipo
export const getToastsByType = (type) => {
  return toastsMock[type] || [];
};

// Función helper para obtener un toast aleatorio
export const getRandomToast = () => {
  return allToasts[Math.floor(Math.random() * allToasts.length)];
};

// Función helper para obtener un toast aleatorio por tipo
export const getRandomToastByType = (type) => {
  const toasts = toastsMock[type] || [];
  return toasts[Math.floor(Math.random() * toasts.length)];
};

