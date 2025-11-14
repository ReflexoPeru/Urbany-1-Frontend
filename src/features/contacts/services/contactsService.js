// src/features/contacts/services/contactsService.js
// Datos de ejemplo que coinciden con la imagen
const mockContacts = [
  {
    id: 1,
    name: 'Sofía Rodríguez',
    email: 'sofia.rodriguez@email.com',
    type: 'Cliente',
    phone: '555-123-4567'
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    email: 'carlos.perez@email.com',
    type: 'Proveedor',
    phone: '555-987-6543'
  },
  {
    id: 3,
    name: 'Ana Garcia',
    email: 'ana.garcia@email.com',
    type: 'Cliente',
    phone: '555-246-8013'
  },
  {
    id: 4,
    name: 'Diego Martínez',
    email: 'diego.martinez@email.com',
    type: 'Proveedor',
    phone: '555-369-1470'
  },
  {
    id: 5,
    name: 'Isabel López',
    email: 'isabel.lopez@email.com',
    type: 'Cliente',
    phone: '555-753-9512'
  }
];

export const contactsService = {
  getAll: async () => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockContacts;
  },
  
  getById: async (id) => {
    return mockContacts.find(contact => contact.id === id);
  },
  
  create: async (contactData) => {
    const newContact = {
      id: Math.max(...mockContacts.map(c => c.id)) + 1,
      ...contactData
    };
    mockContacts.push(newContact);
    return newContact;
  },
  
  update: async (id, contactData) => {
    const index = mockContacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      mockContacts[index] = { ...mockContacts[index], ...contactData };
      return mockContacts[index];
    }
    throw new Error('Contact not found');
  },
  
  delete: async (id) => {
    const index = mockContacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      return mockContacts.splice(index, 1)[0];
    }
    throw new Error('Contact not found');
  }
};