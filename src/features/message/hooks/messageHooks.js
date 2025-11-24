// src/features/message/hooks/messageHooks.js
import { useState, useEffect, useCallback } from 'react';
import { messageService } from '../services/messageService';

/**
 * Hook principal para gestionar conversaciones
 * @param {object} options - Opciones de configuración
 * @param {string} options.conversationType - Filtrar por tipo de conversación
 * @param {string} options.search - Término de búsqueda
 * @returns {object} - Estado y funciones para gestionar conversaciones
 */
export const useConversations = (options = {}) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const loadConversations = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = {
        ...options,
        ...params,
      };
      const data = await messageService.getConversations(queryParams);
      setConversations(data.results || []);
      setPagination({
        count: data.count || 0,
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      setError(err.message || 'Error al cargar conversaciones');
      console.error('Error loading conversations:', err);
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const createConversation = useCallback(async (conversationData) => {
    try {
      const newConversation = await messageService.createConversation(conversationData);
      setConversations(prev => [newConversation, ...prev]);
      return newConversation;
    } catch (err) {
      setError(err.message || 'Error al crear conversación');
      throw err;
    }
  }, []);

  return {
    conversations,
    loading,
    error,
    pagination,
    loadConversations,
    createConversation,
  };
};

/**
 * Hook para gestionar mensajes de una conversación
 * @param {number} conversationId - ID de la conversación
 * @param {object} options - Opciones de configuración
 * @param {number} options.pageSize - Tamaño de página (default: 50)
 * @returns {object} - Estado y funciones para gestionar mensajes
 */
export const useMessages = (conversationId, options = {}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const loadMessages = useCallback(async (params = {}) => {
    if (!conversationId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const queryParams = {
        page_size: options.pageSize || 50,
        ...params,
      };
      const data = await messageService.getConversationMessages(conversationId, queryParams);
      setMessages(data.results || []);
      setPagination({
        count: data.count || 0,
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      setError(err.message || 'Error al cargar mensajes');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  }, [conversationId, options.pageSize]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const sendMessage = useCallback(async (messageData) => {
    try {
      const newMessage = await messageService.sendMessage(conversationId, messageData);
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError(err.message || 'Error al enviar mensaje');
      throw err;
    }
  }, [conversationId]);

  const addReaction = useCallback(async (messageId, reactionType) => {
    try {
      const response = await messageService.addReaction(messageId, { reaction_type: reactionType });
      // Actualizar el mensaje con la nueva reacción
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? {
                ...msg,
                reactions: [...(msg.reactions || []), response.reaction],
              }
            : msg
        )
      );
      return response;
    } catch (err) {
      setError(err.message || 'Error al agregar reacción');
      throw err;
    }
  }, []);

  return {
    messages,
    loading,
    error,
    pagination,
    loadMessages,
    sendMessage,
    addReaction,
  };
};

/**
 * Hook para obtener estadísticas de mensajería
 * @returns {object} - Estadísticas y estado de carga
 */
export const useMessageStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageService.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Error al cargar estadísticas');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    refetch: loadStats,
  };
};

/**
 * Hook para buscar mensajes
 * @param {object} options - Opciones de búsqueda
 * @returns {object} - Resultados de búsqueda y funciones
 */
export const useMessageSearch = (options = {}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (searchParams) => {
    if (!searchParams?.q) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const params = {
        ...options,
        ...searchParams,
      };
      const data = await messageService.searchMessages(params);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || 'Error al buscar mensajes');
      console.error('Error searching messages:', err);
    } finally {
      setLoading(false);
    }
  }, [options]);

  return {
    results,
    loading,
    error,
    search,
  };
};

/**
 * Hook para gestionar el estado del usuario
 * @returns {object} - Estado del usuario y funciones para actualizarlo
 */
export const useMessageStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const loadStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageService.getUserStatus();
      setStatus(data);
    } catch (err) {
      setError(err.message || 'Error al cargar estado');
      console.error('Error loading status:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const updateStatus = useCallback(async (statusData) => {
    try {
      setUpdating(true);
      setError(null);
      const data = await messageService.updateUserStatus(statusData);
      setStatus(data);
      return data;
    } catch (err) {
      setError(err.message || 'Error al actualizar estado');
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  return {
    status,
    loading,
    error,
    updating,
    loadStatus,
    updateStatus,
  };
};

/**
 * Hook para obtener usuarios en línea
 * @returns {object} - Lista de usuarios en línea y estado de carga
 */
export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOnlineUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageService.getOnlineUsers();
      setOnlineUsers(data.users || []);
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios en línea');
      console.error('Error loading online users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOnlineUsers();
    // Opcional: refrescar periódicamente
    const interval = setInterval(loadOnlineUsers, 30000); // Cada 30 segundos
    return () => clearInterval(interval);
  }, [loadOnlineUsers]);

  return {
    onlineUsers,
    loading,
    error,
    refetch: loadOnlineUsers,
  };
};

