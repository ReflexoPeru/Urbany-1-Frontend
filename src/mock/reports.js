export const reportsPropertiesData = [
  {
    id: 1,
    code: 'Cra. 7 #80 4D',
    address: 'El Rosario',
    ref: 'FBA-422',
    qualityPercent: 70,
    type: 'Apartamento',
    bedrooms: 2,
    price: 'USD 180,000',
    portals: { name: 'Sin difundir', color: '#6b7280' },
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    code: 'Cll. 93 #15-20',
    address: 'Chapinero',
    ref: 'FBA-423',
    qualityPercent: 85,
    type: 'Casa',
    bedrooms: 3,
    price: 'USD 320,000',
    portals: { name: 'Idealista', color: '#10b981' },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    code: 'Cll. 127 #8-15',
    address: 'Usaquén',
    ref: 'FBA-424',
    qualityPercent: 65,
    type: 'Estudio',
    bedrooms: 1,
    price: 'USD 150,000',
    portals: { name: 'Idealista', color: '#10b981' },
    image: null
  },
  {
    id: 4,
    code: 'Cll. 85 #11-20',
    address: 'Rosales',
    ref: 'FBA-427',
    qualityPercent: 88,
    type: 'Duplex',
    bedrooms: 3,
    price: 'USD 380,000',
    portals: { name: 'Fotocasa', color: '#f59e0b' },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    code: 'Cll. 116 #15-30',
    address: 'Santa Bárbara',
    ref: 'FBA-428',
    qualityPercent: 91,
    type: 'Casa',
    bedrooms: 4,
    price: 'USD 420,000',
    portals: [
      { name: 'Idealista', color: '#10b981' },
      { name: 'Fotocasa', color: '#f59e0b' }
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  }
]

export const reportsAgentsData = [
  {
    id: 1,
    name: 'María González',
    email: 'maria.gonzalez@inmobiliaria.com',
    phone: '+57 300 123 4567',
    properties: 15,
    sales: 8,
    revenue: 'USD 2,400,000',
    commission: 'USD 72,000',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@inmobiliaria.com',
    phone: '+57 301 234 5678',
    properties: 12,
    sales: 6,
    revenue: 'USD 1,800,000',
    commission: 'USD 54,000',
    rating: 4.6
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@inmobiliaria.com',
    phone: '+57 302 345 6789',
    properties: 20,
    sales: 11,
    revenue: 'USD 3,200,000',
    commission: 'USD 96,000',
    rating: 4.9
  }
]