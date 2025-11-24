// src/features/message/services/messageService.js
import { get, post } from '../../../services/api/apiMethods';

/**
 * Servicio para consumir la API de mensajería
 * Base URL: /api/mensajes/
 */
export const messageService = {
  /**
   * Lista todas las conversaciones del usuario
   * GET /api/mensajes/conversations/
   * @param {object} params - Parámetros de consulta
   * @param {number} params.page - Número de página (default: 1)
   * @param {string} params.conversation_type - Tipo de conversación (direct, group, support, announcement)
   * @param {string} params.search - Búsqueda por título o participantes
   * @returns {Promise} - Lista paginada de conversaciones
   */
  getConversations: async (params = {}) => {
    return await get('/api/mensajes/conversations/', params);
  },

  /**
   * Crea una nueva conversación
   * POST /api/mensajes/conversations/
   * @param {object} data - Datos de la conversación
   * @param {string} data.title - Título de la conversación
   * @param {string} data.conversation_type - Tipo (direct, group, support, announcement)
   * @param {number[]} data.participants - Array de IDs de participantes
   * @returns {Promise} - Conversación creada
   */
  createConversation: async (data) => {
    return await post('/api/mensajes/conversations/', data);
  },

  /**
   * Obtiene los mensajes de una conversación específica
   * GET /api/mensajes/conversations/{id}/messages/
   * @param {number} conversationId - ID de la conversación
   * @param {object} params - Parámetros de consulta
   * @param {number} params.page - Número de página (default: 1)
   * @param {number} params.page_size - Mensajes por página (default: 50)
   * @returns {Promise} - Lista paginada de mensajes
   */
  getConversationMessages: async (conversationId, params = {}) => {
    return await get(`/api/mensajes/conversations/${conversationId}/messages/`, params);
  },

  /**
   * Envía un nuevo mensaje a una conversación
   * POST /api/mensajes/conversations/{id}/messages/
   * @param {number} conversationId - ID de la conversación
   * @param {object} data - Datos del mensaje
   * @param {string} data.message_type - Tipo de mensaje (text, image, file, etc.)
   * @param {string} data.content - Contenido del mensaje
   * @param {number} data.reply_to - ID del mensaje al que se responde (opcional)
   * @returns {Promise} - Mensaje enviado
   */
  sendMessage: async (conversationId, data) => {
    return await post(`/api/mensajes/conversations/${conversationId}/messages/`, data);
  },

  /**
   * Agrega una reacción a un mensaje
   * POST /api/mensajes/messages/{id}/reactions/
   * @param {number} messageId - ID del mensaje
   * @param {object} data - Datos de la reacción
   * @param {string} data.reaction_type - Tipo de reacción (like, love, etc.)
   * @returns {Promise} - Reacción agregada
   */
  addReaction: async (messageId, data) => {
    return await post(`/api/mensajes/messages/${messageId}/reactions/`, data);
  },

  /**
   * Obtiene estadísticas de mensajería del usuario
   * GET /api/mensajes/stats/
   * @returns {Promise} - Estadísticas de mensajería
   */
  getStats: async () => {
    return await get('/api/mensajes/stats/');
  },

  /**
   * Busca mensajes en todas las conversaciones
   * GET /api/mensajes/search/
   * @param {object} params - Parámetros de búsqueda
   * @param {string} params.q - Término de búsqueda (requerido)
   * @param {number} params.conversation_id - Buscar solo en conversación específica (opcional)
   * @param {string} params.message_type - Filtrar por tipo de mensaje (opcional)
   * @returns {Promise} - Resultados de búsqueda
   */
  searchMessages: async (params) => {
    return await get('/api/mensajes/search/', params);
  },

  /**
   * Obtiene el estado actual del usuario
   * GET /api/mensajes/status/
   * @returns {Promise} - Estado del usuario
   */
  getUserStatus: async () => {
    return await get('/api/mensajes/status/');
  },

  /**
   * Actualiza el estado del usuario
   * POST /api/mensajes/status/
   * @param {object} data - Datos del estado
   * @param {string} data.status - Estado (online, away, busy, offline)
   * @param {string} data.custom_message - Mensaje personalizado (opcional)
   * @returns {Promise} - Estado actualizado
   */
  updateUserStatus: async (data) => {
    return await post('/api/mensajes/status/', data);
  },

  /**
   * Obtiene lista de usuarios actualmente en línea
   * GET /api/mensajes/online-users/
   * @returns {Promise} - Lista de usuarios en línea
   */
  getOnlineUsers: async () => {
    return await get('/api/mensajes/online-users/');
  },
};

export default messageService;

