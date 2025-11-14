// src/features/contacts/hooks/useContacts.js
import { useState, useEffect } from 'react';
import { contactsService } from '../services/contactsService';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contactsService.getAll();
        setContacts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading contacts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const createContact = async (contactData) => {
    try {
      const newContact = await contactsService.create(contactData);
      setContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      const updatedContact = await contactsService.update(id, contactData);
      setContacts(prev => 
        prev.map(contact => contact.id === id ? updatedContact : contact)
      );
      return updatedContact;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactsService.delete(id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact
  };
};