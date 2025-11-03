export const mockNetworks = [
    {
        id: '2clics',
        name: '2clics',
        description: 'Sincronización automática con la red 2clics.',
        tagColor: '#2563eb',
        badgeText: '19',
        connectionStatus: 'connected',
        lastSync: '2025-10-28T08:45:00Z'
    },
    {
        id: 'urbyt',
        name: 'Urbyt',
        description: 'Alianzas estratégicas para difundir inventario premium.',
        tagColor: '#f97316',
        badgeText: '8',
        connectionStatus: 'connected',
        lastSync: '2025-10-28T07:10:00Z'
    },
    {
        id: 'realconnect',
        name: 'RealConnect',
        description: 'Marketplace colaborativo para brokers certificados.',
        tagColor: '#0f766e',
        badgeText: '15',
        connectionStatus: 'pending',
        lastSync: '2025-10-26T18:32:00Z'
    },
    {
        id: 'alianza360',
        name: 'Alianza 360',
        description: 'Red local con acuerdos de comisión preferencial.',
        tagColor: '#9333ea',
        badgeText: '5',
        connectionStatus: 'connected',
        lastSync: '2025-10-21T12:15:00Z'
    }
];

export const mockNetworkProperties = [
    {
        id: 'network-prop-001',
        networkId: 'alianza360',
        code: 'GRN-201',
        address: 'Cl. 60 Sur #45B-20 Casa 201',
        city: 'Envigado',
        neighborhood: 'La Magnolia',
        commission: 25,
        operation: 'Venta',
        propertyType: 'Casa',
        bedrooms: 4,
        bathrooms: 3,
        price: 780000000,
        currency: 'COP',
        realEstate: {
            name: 'Grupo Magnolia',
            logo: 'https://images.unsplash.com/photo-1524609601504-003e10a0f84c?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Felipe Gómez',
            phone: '+57 301 555 1010'
        },
        quality: 90,
        coverage: 'Exclusiva',
        image: 'https://images.unsplash.com/photo-1600585154340-0ef3c08dcdb6?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: false,
        publishedAt: '2025-09-20T11:00:00Z'
    },
    {
        id: 'network-prop-002',
        networkId: '2clics',
        code: 'ABX-1400',
        address: 'Cra. 43A #70 Sur-142 apartamento 1400',
        city: 'Sabaneta',
        neighborhood: 'Prados de Sabaneta',
        commission: 30,
        operation: 'Alquiler',
        propertyType: 'Apartamento',
        bedrooms: 2,
        bathrooms: 2,
        price: 4200000,
        currency: 'COP',
        realEstate: {
            name: 'Inmobiliaria Sabaneta',
            logo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'María Ríos',
            phone: '+57 300 555 1020'
        },
        quality: 84,
        coverage: 'Exclusiva',
        image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: true,
        publishedAt: '2025-09-28T09:00:00Z'
    },
    {
        id: 'network-prop-003',
        networkId: '2clics',
        code: 'ABX-0600',
        address: 'Cra. 45A #80 Sur-127 apartamento 600',
        city: 'Sabaneta',
        neighborhood: 'Cañaveralejo',
        commission: 30,
        operation: 'Alquiler',
        propertyType: 'Apartamento',
        bedrooms: 2,
        bathrooms: 2,
        price: 2700000,
        currency: 'COP',
        realEstate: {
            name: 'Residencias 2C',
            logo: null
        },
        contact: {
            name: 'Juan Pérez',
            phone: '+57 310 888 4411'
        },
        quality: 76,
        coverage: 'Compartida',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=640&h=480&fit=crop',
        isMine: false,
        isFavorite: false,
        publishedAt: '2025-09-25T15:30:00Z'
    },
    {
        id: 'network-prop-004',
        networkId: 'realconnect',
        code: 'ABX-1000',
        address: 'Cra. 45A #80 Sur-127 apartamento 1000',
        city: 'Sabaneta',
        neighborhood: 'Cañaveralejo',
        commission: 30,
        operation: 'Alquiler',
        propertyType: 'Apartamento',
        bedrooms: 2,
        bathrooms: 3,
        price: 2650000,
        currency: 'COP',
        realEstate: {
            name: 'Residencias 2C',
            logo: null
        },
        contact: {
            name: 'Juan Pérez',
            phone: '+57 310 888 4411'
        },
        quality: 72,
        coverage: 'Compartida',
        image: 'https://images.unsplash.com/photo-1512914890250-353c97c9e347?w=640&h=480&fit=crop',
        isMine: false,
        isFavorite: false,
        publishedAt: '2025-08-30T18:00:00Z'
    },
    {
        id: 'network-prop-005',
        networkId: 'alianza360',
        code: 'LIM-2100',
        address: 'Av. José Pardo 123, Miraflores',
        city: 'Lima',
        neighborhood: 'Miraflores',
        commission: 32,
        operation: 'Venta',
        propertyType: 'Departamento',
        bedrooms: 3,
        bathrooms: 3,
        price: 550000,
        currency: 'USD',
        realEstate: {
            name: 'Inmobiliaria Lima Centro',
            logo: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Carolina Méndez',
            phone: '+51 912 345 678'
        },
        quality: 88,
        coverage: 'Exclusiva',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: true,
        publishedAt: '2025-09-12T10:15:00Z'
    },
    {
        id: 'network-prop-006',
        networkId: 'urbyt',
        code: 'LIM-3101',
        address: 'Calle Los Libertadores 350, San Isidro',
        city: 'Lima',
        neighborhood: 'San Isidro',
        commission: 28,
        operation: 'Alquiler',
        propertyType: 'Oficina',
        bedrooms: 0,
        bathrooms: 2,
        price: 2400,
        currency: 'USD',
        realEstate: {
            name: 'Oficinas Elite Perú',
            logo: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Rodrigo León',
            phone: '+51 945 555 101'
        },
        quality: 82,
        coverage: 'Compartida',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=480&fit=crop',
        isMine: false,
        isFavorite: false,
        publishedAt: '2025-09-22T14:45:00Z'
    },
    {
        id: 'network-prop-007',
        networkId: 'realconnect',
        code: 'CUS-2202',
        address: 'Jr. Pumacahua 789, Centro Histórico',
        city: 'Cusco',
        neighborhood: 'Centro Histórico',
        commission: 30,
        operation: 'Venta',
        propertyType: 'Casa',
        bedrooms: 3,
        bathrooms: 2,
        price: 380000,
        currency: 'USD',
        realEstate: {
            name: 'Andes & Valle Inmobiliaria',
            logo: 'https://images.unsplash.com/photo-1459535653751-d571815e906b?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Ana Torres',
            phone: '+51 999 111 222'
        },
        quality: 90,
        coverage: 'Exclusiva',
        image: 'https://images.unsplash.com/photo-1551244072-30780d0901de?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: false,
        publishedAt: '2025-08-30T16:20:00Z'
    },
    {
        id: 'network-prop-008',
        networkId: 'urbyt',
        code: 'ARE-1420',
        address: 'Av. El Sol 12, Yanahuara',
        city: 'Arequipa',
        neighborhood: 'Yanahuara',
        commission: 26,
        operation: 'Venta',
        propertyType: 'Departamento',
        bedrooms: 2,
        bathrooms: 2,
        price: 240000,
        currency: 'USD',
        realEstate: {
            name: 'Vista Andina Inmuebles',
            logo: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Carmen Suárez',
            phone: '+51 944 555 666'
        },
        quality: 87,
        coverage: 'Exclusiva',
        image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: false,
        publishedAt: '2025-09-05T10:30:00Z'
    },
    {
        id: 'network-prop-009',
        networkId: 'alianza360',
        code: 'TRU-3150',
        address: 'Malecón Balta 221, Huanchaco',
        city: 'Trujillo',
        neighborhood: 'Huanchaco',
        commission: 24,
        operation: 'Alquiler',
        propertyType: 'Departamento',
        bedrooms: 1,
        bathrooms: 1,
        price: 1300,
        currency: 'USD',
        realEstate: {
            name: 'Coastal Living Perú',
            logo: 'https://images.unsplash.com/photo-1529429617124-aee01a6d2b79?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Luis Martínez',
            phone: '+51 938 222 333'
        },
        quality: 72,
        coverage: 'Semi-Exclusiva',
        image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=640&h=480&fit=crop',
        isMine: false,
        isFavorite: false,
        publishedAt: '2025-09-18T12:00:00Z'
    },
    {
        id: 'network-prop-010',
        networkId: 'realconnect',
        code: 'HUA-1780',
        address: 'Jr. Andes 17, Centro',
        city: 'Huaraz',
        neighborhood: 'Centro',
        commission: 23,
        operation: 'Alquiler',
        propertyType: 'Casa',
        bedrooms: 2,
        bathrooms: 1,
        price: 950,
        currency: 'USD',
        realEstate: {
            name: 'Mountain Real Estate',
            logo: 'https://images.unsplash.com/photo-1471623817296-13987c9088cd?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Diego Romero',
            phone: '+51 948 333 444'
        },
        quality: 69,
        coverage: 'General',
        image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=640&h=480&fit=crop',
        isMine: false,
        isFavorite: true,
        publishedAt: '2025-09-10T09:00:00Z'
    },
    {
        id: 'network-prop-011',
        networkId: 'urbyt',
        code: 'CHI-2220',
        address: 'Av. Santa Victoria 500, Chiclayo',
        city: 'Chiclayo',
        neighborhood: 'Santa Victoria',
        commission: 27,
        operation: 'Venta',
        propertyType: 'Casa',
        bedrooms: 3,
        bathrooms: 3,
        price: 210000,
        currency: 'USD',
        realEstate: {
            name: 'Costa Norte Brokers',
            logo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Paola Salinas',
            phone: '+51 976 333 111'
        },
        quality: 81,
        coverage: 'Compartida',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: true,
        publishedAt: '2025-09-29T09:45:00Z'
    },
    {
        id: 'network-prop-012',
        networkId: 'alianza360',
        code: 'ARE-5800',
        address: 'Calle Misti 75, Cerro Colorado',
        city: 'Arequipa',
        neighborhood: 'Cerro Colorado',
        commission: 29,
        operation: 'Alquiler',
        propertyType: 'Departamento',
        bedrooms: 2,
        bathrooms: 2,
        price: 1500,
        currency: 'USD',
        realEstate: {
            name: 'Altos del Sur',
            logo: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Julia Romero',
            phone: '+51 984 888 222'
        },
        quality: 79,
        coverage: 'Semi-Exclusiva',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=640&h=480&fit=crop',
        isMine: false,
        isFavorite: false,
        publishedAt: '2025-10-02T18:15:00Z'
    },
    {
        id: 'network-prop-013',
        networkId: 'realconnect',
        code: 'PIU-3200',
        address: 'Av. Grau 210, Piura',
        city: 'Piura',
        neighborhood: 'Centro',
        commission: 22,
        operation: 'Venta',
        propertyType: 'Casa',
        bedrooms: 4,
        bathrooms: 3,
        price: 195000,
        currency: 'USD',
        realEstate: {
            name: 'Pacific View Inmobiliaria',
            logo: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Roberto Muñoz',
            phone: '+51 945 111 222'
        },
        quality: 74,
        coverage: 'General',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: false,
        publishedAt: '2025-08-21T12:10:00Z'
    },
    {
        id: 'network-prop-014',
        networkId: '2clics',
        code: 'LOR-1100',
        address: 'Av. Loreto 45, Iquitos',
        city: 'Iquitos',
        neighborhood: 'Punchana',
        commission: 24,
        operation: 'Alquiler',
        propertyType: 'Departamento',
        bedrooms: 1,
        bathrooms: 1,
        price: 800,
        currency: 'USD',
        realEstate: {
            name: 'Jungle Living Inmuebles',
            logo: 'https://images.unsplash.com/photo-1487980356623-5fc09d23308e?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Liliana Vargas',
            phone: '+51 934 222 555'
        },
        quality: 62,
        coverage: 'General',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=640&h=480&fit=crop',
        isMine: false,
        isFavorite: true,
        publishedAt: '2025-09-14T08:40:00Z'
    },
    {
        id: 'network-prop-015',
        networkId: 'urbyt',
        code: 'CUS-4500',
        address: 'Av. Collasuyo 120, Cusco',
        city: 'Cusco',
        neighborhood: 'Wanchaq',
        commission: 31,
        operation: 'Venta',
        propertyType: 'Departamento',
        bedrooms: 2,
        bathrooms: 2,
        price: 265000,
        currency: 'USD',
        realEstate: {
            name: 'Andes Prime Realty',
            logo: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=80&h=80&fit=crop'
        },
        contact: {
            name: 'Isabel Quispe',
            phone: '+51 955 666 777'
        },
        quality: 86,
        coverage: 'Exclusiva',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&h=480&fit=crop',
        isMine: true,
        isFavorite: false,
        publishedAt: '2025-10-08T10:05:00Z'
    }
];

export const initialNetworkFilters = {
    operation: null,
    propertyType: null,
    priceRange: null,
    location: null,
    bedrooms: null,
    commission: null,
    realEstate: null,
    coverage: null,
    quality: null
};

