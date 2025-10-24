import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de un ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: toast.type || 'info',
      title: toast.title,
      message: toast.message,
      duration: toast.duration !== undefined ? toast.duration : 5000,
      icon: toast.icon || null,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (title, message, duration, icon) =>
      addToast({ type: 'success', title, message, duration, icon }),
    error: (title, message, duration, icon) =>
      addToast({ type: 'error', title, message, duration, icon }),
    warning: (title, message, duration, icon) =>
      addToast({ type: 'warning', title, message, duration, icon }),
    info: (title, message, duration, icon) =>
      addToast({ type: 'info', title, message, duration, icon }),
    custom: (options) => addToast(options),
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

