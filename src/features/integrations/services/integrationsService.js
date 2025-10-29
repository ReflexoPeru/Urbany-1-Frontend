import {
  ShoppingCart,
  TrendUp,
  Code,
  House,
  Building,
  Storefront
} from '@phosphor-icons/react';

export const getIntegrations = () => {
  return [
    {
      id: 'mercadolibre',
      title: 'MercadoLibre',
      description: 'Integre una página web desarrollada por 2clics para publicar, editar, eliminar sus inmuebles y sincronizar las consultas.',
      category: 'Integración personalizada',
      icon: <ShoppingCart size={24} weight="bold" />,
      isActive: false
    },
    {
      id: 'inmoup',
      title: 'InmoUP',
      description: 'Integre InmoUP para publicar, editar y eliminar sus inmuebles.',
      category: 'Integración personalizada',
      icon: <TrendUp size={24} weight="bold" />,
      isActive: false
    },
    {
      id: 'website',
      title: 'Pagina Web',
      description: 'Integre una página web desarrollada por 2clics para publicar, editar, eliminar sus inmuebles y sincronizar las consultas.',
      category: 'Integración personalizada',
      icon: <Code size={24} weight="bold" />,
      isActive: false
    },
    {
      id: 'inmoclick',
      title: 'Inmoclick',
      description: 'Integre Inmoclick para publicar, editar y eliminar sus inmuebles.',
      category: 'Integración personalizada',
      icon: <House size={24} weight="bold" />,
      isActive: false
    },
    {
      id: 'brokian',
      title: 'Brokian',
      description: 'Integre Brokian para publicar, editar y eliminar sus inmuebles.',
      category: 'Integración personalizada',
      icon: <Building size={24} weight="bold" />,
      isActive: false
    },
    {
      id: 'proppit',
      title: 'Proppit',
      description: 'Integre Proppit para publicar, editar, eliminar sus inmuebles.',
      category: 'Portales pagos',
      icon: <Storefront size={24} weight="bold" />,
      isActive: false
    }
  ];
};

export const getCategories = () => {
  return [
    { id: 'portales', label: 'Portales' },
    { id: 'calendario', label: 'Calendario' },
    { id: 'instagram-whatsapp', label: 'Instagram y WhatsApp' },
    { id: 'email', label: 'Correo electrónico' },
    { id: 'redes-inmobiliarias', label: 'Redes inmobiliarias' },
    { id: 'email-marketing', label: 'Email marketing' }
  ];
};

export const toggleIntegration = (integrationId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, integrationId });
    }, 500);
  });
};
