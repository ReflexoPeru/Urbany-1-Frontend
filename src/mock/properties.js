export const propertiesMock = [
  {
    id: 1,
    title: "Casa en Venta",
    price: "$250,000",
    address: "Calle Principal 123, Ciudad",
    type: "Casa",
    operation: "Venta",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    status: "activa",
    rooms: 3,
    bedrooms: 2,
    bathrooms: 2,
    area: "120 m²",
    description: "Hermosa casa familiar con jardín y garaje"
  },
  {
    id: 2,
    title: "Apartamento en Alquiler",
    price: "$1,200/mes",
    address: "Avenida Central 456, Pueblo",
    type: "Apartamento",
    operation: "Alquiler",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    status: "activa",
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: "80 m²",
    description: "Apartamento moderno en zona céntrica"
  },
  {
    id: 3,
    title: "Terreno en Venta",
    price: "$100,000",
    address: "Calle Secundaria 789, Villa",
    type: "Terreno",
    operation: "Venta",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    status: "activa",
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: "500 m²",
    description: "Terreno ideal para construcción"
  },
  {
    id: 4,
    title: "Local Comercial en Alquiler",
    price: "$2,000/mes",
    address: "Avenida del Sol 101, Ciudad",
    type: "Local Comercial",
    operation: "Alquiler",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    status: "activa",
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    area: "150 m²",
    description: "Local comercial en zona comercial"
  },
  {
    id: 5,
    title: "Oficina en Venta",
    price: "$300,000",
    address: "Calle de la Luna 202, Pueblo",
    type: "Oficina",
    operation: "Venta",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
    status: "activa",
    rooms: 3,
    bedrooms: 0,
    bathrooms: 2,
    area: "200 m²",
    description: "Oficina moderna con vista panorámica"
  },
  {
    id: 6,
    title: "Depósito en Alquiler",
    price: "$1,500/mes",
    address: "Avenida de las Estrellas 303, Villa",
    type: "Depósito",
    operation: "Alquiler",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    status: "activa",
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    area: "300 m²",
    description: "Depósito amplio para almacenamiento"
  }
];

// Función helper para obtener propiedades por tipo
export const getPropertiesByType = (type) => {
  return propertiesMock.filter(property => property.type === type);
};

// Función helper para obtener propiedades por operación
export const getPropertiesByOperation = (operation) => {
  return propertiesMock.filter(property => property.operation === operation);
};

// Función helper para obtener propiedades por estado
export const getPropertiesByStatus = (status) => {
  return propertiesMock.filter(property => property.status === status);
};

// Función helper para obtener una propiedad aleatoria
export const getRandomProperty = () => {
  return propertiesMock[Math.floor(Math.random() * propertiesMock.length)];
};

// Función helper para buscar propiedades por texto
export const searchProperties = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return propertiesMock.filter(property =>
    property.title.toLowerCase().includes(lowercaseQuery) ||
    property.address.toLowerCase().includes(lowercaseQuery) ||
    property.description.toLowerCase().includes(lowercaseQuery)
  );
};
