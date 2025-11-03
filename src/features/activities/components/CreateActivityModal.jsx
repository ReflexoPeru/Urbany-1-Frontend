import React, { useState } from 'react';
import { Plus, X, Calendar, Clock, User, FileText } from 'lucide-react';
import styles from './CreateActivityModal.module.css';

const CreateActivityModal = ({ isOpen, onClose, onCreate, selectedDate = null }) => {
  const [formData, setFormData] = useState({
    type: 'Agente',
    title: '',
    description: '',
    date: selectedDate || '',
    time: '',
    priority: 'medium',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});

  const activityTypes = [
    'Agente',
    'Llamada',
    'Correo electrónico',
    'Visita',
    'Reunión',
    'Tasación',
    'Firma de contrato',
    'Otro'
  ];

  const priorities = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' }
  ];

  const statuses = [
    { value: 'pending', label: 'Por hacer' },
    { value: 'in_progress', label: 'En progreso' },
    { value: 'completed', label: 'Completada' },
    { value: 'cancelled', label: 'Cancelada' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }
    
    if (!formData.time) {
      newErrors.time = 'La hora es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const activityData = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onCreate(activityData);
      onClose();
      setFormData({
        type: 'Agente',
        title: '',
        description: '',
        date: '',
        time: '',
        priority: 'medium',
        status: 'pending'
      });
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      type: 'Agente',
      title: '',
      description: '',
      date: '',
      time: '',
      priority: 'medium',
      status: 'pending'
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <Plus size={20} className={styles.icon} />
            <h2>Nueva Actividad</h2>
          </div>
          <button className={styles.closeButton} onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <User size={16} />
              Tipo de Actividad
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={styles.select}
            >
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FileText size={16} />
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`${styles.input} ${errors.title ? styles.error : ''}`}
              placeholder="Título de la actividad"
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FileText size={16} />
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
              placeholder="Describe la actividad"
              rows={3}
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Calendar size={16} />
                Fecha *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`${styles.input} ${errors.date ? styles.error : ''}`}
              />
              {errors.date && <span className={styles.errorText}>{errors.date}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Clock size={16} />
                Hora *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`${styles.input} ${errors.time ? styles.error : ''}`}
              />
              {errors.time && <span className={styles.errorText}>{errors.time}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Prioridad</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={styles.select}
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.select}
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.createButton}>
              Crear Actividad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActivityModal;
