import React, { useState } from 'react'
import { X, User, Phone, Mail, MapPin, Calendar, Tag } from 'lucide-react'
import styles from './AddBusinessModal.module.css'

const AddBusinessModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    operation: 'Venta',
    status: 'Disponible',
    stage: 'Nuevo Negocio',
    agent: 'Agente A',
    tags: []
  })

  const [errors, setErrors] = useState({})

  const operations = ['Venta', 'Compra', 'Alquiler']
  const statuses = ['Disponible', 'No disponible']
  const stages = ['Nuevo Negocio', 'Contactado', 'Visita Programada', 'En Negociación', 'Frío']
  const agents = ['Agente A', 'Agente B', 'Agente C']
  const availableTags = ['Venta', 'Compra', 'Alquiler', 'Disponible', 'No disponible', 'Urgente', 'Premium', 'Lujo']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido'
    if (!formData.email.trim()) newErrors.email = 'El email es requerido'
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida'
    if (!formData.email.includes('@')) newErrors.email = 'El email no es válido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const newDeal = {
        id: `deal-${Date.now()}`,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      }
      
      onAdd(newDeal)
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        operation: 'Venta',
        status: 'Disponible',
        stage: 'Nuevo Negocio',
        agent: 'Agente A',
        tags: []
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Agregar Nuevo Negocio</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.content}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Información Personal</h3>
              
              <div className={styles.field}>
                <label className={styles.label}>
                  <User size={16} />
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`${styles.input} ${errors.name ? styles.error : ''}`}
                  placeholder="Nombre completo"
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  <Phone size={16} />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  placeholder="email@ejemplo.com"
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Información de la Propiedad</h3>
              
              <div className={styles.field}>
                <label className={styles.label}>
                  <MapPin size={16} />
                  Dirección *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`${styles.input} ${errors.address ? styles.error : ''}`}
                  placeholder="Dirección completa"
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Operación</label>
                <select
                  value={formData.operation}
                  onChange={(e) => handleInputChange('operation', e.target.value)}
                  className={styles.select}
                >
                  {operations.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className={styles.select}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Información del Negocio</h3>
              
              <div className={styles.field}>
                <label className={styles.label}>Etapa</label>
                <select
                  value={formData.stage}
                  onChange={(e) => handleInputChange('stage', e.target.value)}
                  className={styles.select}
                >
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Agente</label>
                <select
                  value={formData.agent}
                  onChange={(e) => handleInputChange('agent', e.target.value)}
                  className={styles.select}
                >
                  {agents.map(agent => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  <Tag size={16} />
                  Etiquetas
                </label>
                <div className={styles.tagsContainer}>
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className={`${styles.tag} ${formData.tags.includes(tag) ? styles.tagSelected : ''}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              Agregar Negocio
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBusinessModal
