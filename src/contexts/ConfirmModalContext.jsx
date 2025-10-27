import { createContext, useContext, useState, useCallback } from 'react';

const ConfirmModalContext = createContext(null);

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error('useConfirmModal debe ser usado dentro de un ConfirmModalProvider');
  }
  return context;
};

export const ConfirmModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    icon: null,
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    showCancel: true,
    onConfirm: null,
  });

  const openModal = useCallback((config) => {
    setModalConfig({
      isOpen: true,
      type: config.type || 'info',
      title: config.title,
      message: config.message,
      icon: config.icon || null,
      confirmText: config.confirmText || 'Confirmar',
      cancelText: config.cancelText || 'Cancelar',
      showCancel: config.showCancel !== undefined ? config.showCancel : true,
      onConfirm: config.onConfirm || null,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const confirmModal = {
    success: (title, message, onConfirm, config = {}) =>
      openModal({ type: 'success', title, message, onConfirm, ...config }),
    error: (title, message, onConfirm, config = {}) =>
      openModal({ type: 'error', title, message, onConfirm, ...config }),
    danger: (title, message, onConfirm, config = {}) =>
      openModal({ type: 'danger', title, message, onConfirm, ...config }),
    warning: (title, message, onConfirm, config = {}) =>
      openModal({ type: 'warning', title, message, onConfirm, ...config }),
    info: (title, message, onConfirm, config = {}) =>
      openModal({ type: 'info', title, message, onConfirm, ...config }),
    custom: (config) => openModal(config),
  };

  return (
    <ConfirmModalContext.Provider value={{ confirmModal, modalConfig, closeModal }}>
      {children}
    </ConfirmModalContext.Provider>
  );
};

