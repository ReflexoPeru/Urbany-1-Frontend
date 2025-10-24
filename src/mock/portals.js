// Datos mock para portales inmobiliarios
export const portalsData = {
    customIntegrations: {
        title: "Integración personalizada",
        description: "Conecta tus portales inmobiliarios favoritos para automatizar la publicación de propiedades",
        integrations: [
            {
                id: "mercadolibre",
                title: "MercadoLibre",
                description: "Integre una página web desarrollada por 2clics para publicar, editar, eliminar sus inmuebles y sincronizar las consultas.",
                icon: "mercadolibre",
                status: "active",
                features: [
                    "Sincronización automática de propiedades",
                    "Gestión de consultas en tiempo real",
                    "Actualización de precios automática",
                    "Estadísticas de visualizaciones"
                ],
                setupSteps: [
                    "Conecta tu cuenta de MercadoLibre",
                    "Autoriza el acceso a tus publicaciones",
                    "Configura las categorías de propiedades",
                    "Activa la sincronización automática"
                ],
                pricing: "Gratis",
                lastSync: "Hace 2 horas"
            },
            {
                id: "inmoup",
                title: "InmoUP",
                description: "Integre InmoUP para publicar, editar y eliminar sus inmuebles.",
                icon: "inmoup",
                status: "active",
                features: [
                    "Publicación masiva de propiedades",
                    "Gestión de fotos automática",
                    "Sincronización de precios",
                    "Reportes de rendimiento"
                ],
                setupSteps: [
                    "Registra tu cuenta en InmoUP",
                    "Conecta con tu perfil profesional",
                    "Configura las preferencias de publicación",
                    "Inicia la sincronización"
                ],
                pricing: "Gratis",
                lastSync: "Hace 1 hora"
            },
            {
                id: "website",
                title: "Página Web",
                description: "Integre una página web desarrollada por 2clics para publicar, editar, eliminar sus inmuebles y sincronizar las consultas.",
                icon: "website",
                status: "pending",
                features: [
                    "Diseño personalizado",
                    "SEO optimizado",
                    "Formularios de contacto",
                    "Analytics integrado"
                ],
                setupSteps: [
                    "Proporciona los datos de tu empresa",
                    "Selecciona el diseño preferido",
                    "Configura los dominios",
                    "Activa las integraciones"
                ],
                pricing: "Desde $99/mes",
                lastSync: "No conectado"
            },
            {
                id: "inmoclick",
                title: "Inmoclick",
                description: "Integre Inmoclick para publicar, editar y eliminar sus inmuebles.",
                icon: "inmoclick",
                status: "active",
                features: [
                    "Publicación automática",
                    "Gestión de leads",
                    "Sincronización bidireccional",
                    "Dashboard de analytics"
                ],
                setupSteps: [
                    "Crea tu cuenta en Inmoclick",
                    "Verifica tu perfil profesional",
                    "Conecta con Urbany",
                    "Configura las reglas de publicación"
                ],
                pricing: "Gratis",
                lastSync: "Hace 30 minutos"
            },
            {
                id: "brokian",
                title: "Brokian",
                description: "Integre Brokian para publicar, editar y eliminar sus inmuebles.",
                icon: "brokian",
                status: "inactive",
                features: [
                    "Red de corredores",
                    "Compartir propiedades",
                    "Gestión de comisiones",
                    "Reportes detallados"
                ],
                setupSteps: [
                    "Registra tu perfil profesional",
                    "Completa la verificación",
                    "Conecta con tu red",
                    "Activa las notificaciones"
                ],
                pricing: "Gratis",
                lastSync: "Hace 1 día"
            }
        ]
    },

    paidPortals: {
        title: "Portales pagos",
        description: "Integraciones premium con portales de pago para mayor alcance",
        integrations: [
            {
                id: "proppit",
                title: "Proppit",
                description: "Integre Proppit para publicar, editar, eliminar sus inmuebles.",
                icon: "proppit",
                status: "active",
                features: [
                    "Alcance premium",
                    "Posicionamiento destacado",
                    "Analytics avanzados",
                    "Soporte prioritario"
                ],
                setupSteps: [
                    "Si ya tienes una cuenta en Proppit ingresa el email con la que fue creada.",
                    "Si todavía no tienes una cuenta, ingresa un email con el cuál se te va a crear una cuenta y publicar tus propiedades."
                ],
                pricing: "Desde $29/mes",
                lastSync: "Hace 15 minutos",
                actionText: "Correo electrónico",
                buttonText: "example@gmail.com"
            }
        ]
    }
};
