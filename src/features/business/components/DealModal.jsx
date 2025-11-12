import React, { useState, useEffect, useMemo } from 'react'
import { X, User, Phone, Mail, MapPin, Calendar, Tag } from 'lucide-react'
import styles from './DealModal.module.css'

const DEAL_AGENTS = ['Agente A', 'Agente B', 'Agente C']
const APPRAISAL_ADVISORS = ['Jessica Ramos', 'Carla Medina', 'Edgar Paredes', 'Vanessa Torres', 'Diego Quispe']
const PROPERTY_TYPES = ['Apartamento', 'Casa', 'Duplex', 'Estudio', 'Penthouse', 'Loft', 'Local comercial']
const PROPERTY_STATUSES = ['active', 'reserved', 'off-market', 'sold', 'rented', 'draft']
const PROPERTY_CURRENCIES = ['U$D', 'USD', 'S/', '€']
const PROPERTY_PORTALS = ['Idealista', 'Fotocasa', 'Habitaclia', 'Sin difundir']
const PROPERTY_STATUS_LABELS = {
  active: 'Activa',
  reserved: 'Reservada',
  'off-market': 'Fuera de mercado',
  sold: 'Vendida',
  rented: 'Alquilada',
  draft: 'Borrador'
}

const getDefaultFormData = (entityType) => {
  if (entityType === 'appraisal') {
    return {
      name: '',
      phone: '',
      email: '',
      address: '',
      propertyType: 'Departamento',
      valueRange: '',
      status: 'pending',
      agent: APPRAISAL_ADVISORS[0],
      visitDate: new Date().toISOString().split('T')[0]
    }
  }

  if (entityType === 'property') {
    return {
      address: '',
      city: '',
      propertyType: PROPERTY_TYPES[0],
      category: '',
      price: '',
      currency: PROPERTY_CURRENCIES[0],
      status: PROPERTY_STATUSES[0],
      portals: [],
      code: '',
      quality: '',
      image: ''
    }
  }

  return {
    name: '',
    phone: '',
    email: '',
    address: '',
    operation: 'Venta',
    status: 'Disponible',
    stage: 'Nuevo Negocio',
    agent: DEAL_AGENTS[0],
    tags: []
  }
}

const DealModal = ({ deal, isOpen, onClose, onSave, mode = 'view', entityType = 'deal' }) => {
  const isAppraisal = entityType === 'appraisal'
  const isProperty = entityType === 'property'
  const [formData, setFormData] = useState(() => getDefaultFormData(entityType))

  const [errors, setErrors] = useState({})
  const appraisalOptions = useMemo(() => {
    const options = [...APPRAISAL_ADVISORS]
    if (formData.agent && !options.includes(formData.agent)) {
      options.push(formData.agent)
    }
    return options
  }, [formData.agent])

  const dealOptions = useMemo(() => {
    const options = [...DEAL_AGENTS]
    if (formData.agent && !options.includes(formData.agent)) {
      options.push(formData.agent)
    }
    return options
  }, [formData.agent])

  const operations = ['Venta', 'Compra', 'Alquiler']
  const statuses = ['Disponible', 'No disponible']
  const stages = ['Nuevo Negocio', 'Contactado', 'Visita Programada', 'En Negociación', 'Frío']
  const availableTags = ['Venta', 'Compra', 'Alquiler', 'Disponible', 'No disponible', 'Urgente', 'Premium', 'Lujo']
  const appraisalStatuses = [
    { value: 'pending', label: 'Nueva consulta' },
    { value: 'scheduled', label: 'Visita programada' },
    { value: 'in_progress', label: 'En tasación' },
    { value: 'completed', label: 'Completada' }
  ]
  const propertyTypes = ['Departamento', 'Casa', 'Loft', 'Local comercial']

  useEffect(() => {
    if (deal && mode !== 'create') {
      if (isAppraisal) {
        setFormData({
          name: deal.name || '',
          phone: deal.contact?.phone || '',
          email: deal.contact?.email || '',
          address: deal.property?.address || '',
          propertyType: deal.propertyType || 'Departamento',
          valueRange: deal.valueRange || '',
          status: deal.status || 'pending',
          agent: deal.agent || APPRAISAL_ADVISORS[0],
          visitDate: deal.visitDate || deal.date || new Date().toISOString().split('T')[0]
        })
      } else if (isProperty) {
        setFormData({
          address: deal.address || '',
          city: deal.city || '',
          propertyType: deal.propertyType || deal.type || PROPERTY_TYPES[0],
          category: deal.category || '',
          price: deal.price !== undefined && deal.price !== null ? String(deal.price) : '',
          currency: deal.currency || PROPERTY_CURRENCIES[0],
          status: deal.status || PROPERTY_STATUSES[0],
          portals: Array.isArray(deal.portals)
            ? deal.portals
            : deal.portals
            ? [deal.portals]
            : [],
          code: deal.code || '',
          quality:
            deal.quality !== undefined && deal.quality !== null ? String(deal.quality) : '',
          image: deal.image || ''
        })
      } else {
        setFormData({
          name: deal.name || '',
          phone: deal.contact?.phone || '',
          email: deal.contact?.email || '',
          address: deal.property?.address || '',
          operation: deal.property?.operation || 'Venta',
          status: deal.property?.status || 'Disponible',
          stage: deal.stage || 'Nuevo Negocio',
          agent: deal.agent || DEAL_AGENTS[0],
          tags: deal.tags || []
        })
      }
    } else if (mode === 'create') {
      setFormData(getDefaultFormData(entityType))
    }
    setErrors({})
  }, [deal, mode, entityType, isAppraisal, isProperty])

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

  const handlePortalToggle = (portal) => {
    setFormData(prev => {
      const current = Array.isArray(prev.portals) ? prev.portals : []
      return {
        ...prev,
        portals: current.includes(portal)
          ? current.filter(item => item !== portal)
          : [...current, portal]
      }
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (isProperty) {
      if (!formData.address?.trim()) newErrors.address = 'La dirección es requerida'
      if (!formData.city?.trim()) newErrors.city = 'La ciudad es requerida'
      if (!formData.propertyType) newErrors.propertyType = 'El tipo es requerido'
      if (!formData.category?.trim()) newErrors.category = 'La categoría es requerida'
      if (formData.price === '' || Number.isNaN(Number(formData.price))) {
        newErrors.price = 'El precio es requerido'
      } else if (Number(formData.price) < 0) {
        newErrors.price = 'El precio debe ser positivo'
      }
      if (!formData.currency) newErrors.currency = 'La moneda es requerida'
      if (!formData.status) newErrors.status = 'El estado es requerido'
      if (formData.quality !== '' && (Number(formData.quality) < 0 || Number(formData.quality) > 100)) {
        newErrors.quality = 'La calidad debe estar entre 0 y 100'
      }
    } else {
      if (!formData.name?.trim()) newErrors.name = 'El nombre es requerido'
      if (!formData.phone?.trim()) newErrors.phone = 'El teléfono es requerido'
      if (!formData.email?.trim()) newErrors.email = 'El email es requerido'
      if (!formData.address?.trim()) newErrors.address = 'La dirección es requerida'
      if (formData.email && !formData.email.includes('@')) newErrors.email = 'El email no es válido'
      if (isAppraisal) {
        if (!formData.propertyType) newErrors.propertyType = 'El tipo de propiedad es requerido'
        if (!formData.status) newErrors.status = 'El estado es requerido'
        if (!formData.visitDate) newErrors.visitDate = 'La fecha es requerida'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (mode === 'view') {
      onClose()
      return
    }
    
    if (!validateForm()) {
      return
    }

    if (isAppraisal) {
      const appraisalData = {
        ...(deal && { id: deal.id }),
        name: formData.name,
        contact: {
          phone: formData.phone,
          email: formData.email
        },
        property: {
          address: formData.address
        },
        propertyType: formData.propertyType,
        valueRange: formData.valueRange,
        status: formData.status,
        agent: formData.agent,
        visitDate: formData.visitDate,
        date: formData.visitDate
      }

      onSave(appraisalData)
      onClose()
      return
    }

    if (isProperty) {
      const portals = Array.isArray(formData.portals) && formData.portals.length > 0
        ? formData.portals
        : ['Sin difundir']

      const propertyData = {
        ...(deal && { id: deal.id }),
        address: formData.address,
        city: formData.city,
        propertyType: formData.propertyType,
        category: formData.category,
        price: Number(formData.price),
        currency: formData.currency,
        status: formData.status,
        portals,
        code: formData.code,
        quality: formData.quality === '' ? undefined : Number(formData.quality),
        image: formData.image
      }

      onSave(propertyData)
      onClose()
      return
    }

    const dealData = {
      ...(deal && { id: deal.id }),
      name: formData.name,
      contact: {
        phone: formData.phone,
        email: formData.email
      },
      property: {
        operation: formData.operation,
        status: formData.status,
        address: formData.address
      },
      stage: formData.stage,
      agent: formData.agent,
      tags: formData.tags,
      date: deal?.date || new Date().toISOString().split('T')[0]
    }
    
    onSave(dealData)
    onClose()
  }

  const getTitle = () => {
    if (isAppraisal) {
      switch (mode) {
        case 'create': return 'Registrar Tasación'
        case 'edit': return 'Editar Tasación'
        case 'view': return 'Detalles de la Tasación'
        default: return 'Tasación'
      }
    }
    if (isProperty) {
      switch (mode) {
        case 'create': return 'Registrar Propiedad'
        case 'edit': return 'Editar Propiedad'
        case 'view': return 'Detalles de la Propiedad'
        default: return 'Propiedad'
      }
    }
    switch (mode) {
      case 'create': return 'Agregar Nuevo Negocio'
      case 'edit': return 'Editar Negocio'
      case 'view': return 'Detalles del Negocio'
      default: return 'Negocio'
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{getTitle()}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.content}>
            {isProperty ? (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      <MapPin size={16} />
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`${styles.input} ${errors.address ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    />
                    {errors.address && <span className={styles.errorText}>{errors.address}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Ciudad *</label>
                    <input
                      type="text"
                      value={formData.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`${styles.input} ${errors.city ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    />
                    {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Tipo *</label>
                    <select
                      value={formData.propertyType || PROPERTY_TYPES[0]}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className={`${styles.select} ${errors.propertyType ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    >
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.propertyType && <span className={styles.errorText}>{errors.propertyType}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Categoría *</label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={`${styles.input} ${errors.category ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    />
                    {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Precio *</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.price ?? ''}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className={`${styles.input} ${errors.price ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    />
                    {errors.price && <span className={styles.errorText}>{errors.price}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Moneda *</label>
                    <select
                      value={formData.currency || PROPERTY_CURRENCIES[0]}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className={`${styles.select} ${errors.currency ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    >
                      {PROPERTY_CURRENCIES.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                    {errors.currency && <span className={styles.errorText}>{errors.currency}</span>}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Calidad (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.quality ?? ''}
                      onChange={(e) => handleInputChange('quality', e.target.value)}
                      className={`${styles.input} ${errors.quality ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    />
                    {errors.quality && <span className={styles.errorText}>{errors.quality}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Estado *</label>
                    <select
                      value={formData.status || PROPERTY_STATUSES[0]}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className={`${styles.select} ${errors.status ? styles.error : ''}`}
                      disabled={mode === 'view'}
                    >
                      {PROPERTY_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {PROPERTY_STATUS_LABELS[status] || status}
                        </option>
                      ))}
                    </select>
                    {errors.status && <span className={styles.errorText}>{errors.status}</span>}
                  </div>
                </div>

                <div className={styles.rowSingle}>
                  <div className={styles.field}>
                    <label className={styles.label}>Código interno</label>
                    <input
                      type="text"
                      value={formData.code || ''}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      className={styles.input}
                      disabled={mode === 'view'}
                    />
                  </div>
                </div>

                <div className={styles.rowSingle}>
                  <div className={styles.field}>
                    <label className={styles.label}>Portales</label>
                    <div className={styles.tagsContainer}>
                      {PROPERTY_PORTALS.map((portal) => (
                        <button
                          key={portal}
                          type="button"
                          className={`${styles.tag} ${Array.isArray(formData.portals) && formData.portals.includes(portal) ? styles.tagSelected : ''}`}
                          onClick={() => handlePortalToggle(portal)}
                          disabled={mode === 'view'}
                        >
                          {portal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.rowSingle}>
                  <div className={styles.field}>
                    <label className={styles.label}>URL de imagen</label>
                    <input
                      type="url"
                      value={formData.image || ''}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className={styles.input}
                      disabled={mode === 'view'}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.row}>
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
                      disabled={mode === 'view'}
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
                      disabled={mode === 'view'}
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </div>
                </div>

                <div className={styles.row}>
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
                      disabled={mode === 'view'}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>

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
                      disabled={mode === 'view'}
                    />
                    {errors.address && <span className={styles.errorText}>{errors.address}</span>}
                  </div>
                </div>

                {isAppraisal ? (
                  <>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>Tipo de propiedad</label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => handleInputChange('propertyType', e.target.value)}
                          className={`${styles.select} ${errors.propertyType ? styles.error : ''}`}
                          disabled={mode === 'view'}
                        >
                          {propertyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {errors.propertyType && <span className={styles.errorText}>{errors.propertyType}</span>}
                      </div>

                      <div className={styles.field}>
                        <label className={styles.label}>Estado</label>
                        <select
                          value={formData.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className={`${styles.select} ${errors.status ? styles.error : ''}`}
                          disabled={mode === 'view'}
                        >
                          {appraisalStatuses.map((status) => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                          ))}
                        </select>
                        {errors.status && <span className={styles.errorText}>{errors.status}</span>}
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>Rango estimado</label>
                        <input
                          type="text"
                          value={formData.valueRange}
                          onChange={(e) => handleInputChange('valueRange', e.target.value)}
                          className={styles.input}
                          disabled={mode === 'view'}
                        />
                      </div>

                      <div className={styles.field}>
                        <label className={styles.label}>Asesor</label>
                        <select
                          value={formData.agent}
                          onChange={(e) => handleInputChange('agent', e.target.value)}
                          className={styles.select}
                          disabled={mode === 'view'}
                        >
                          {appraisalOptions.map(agent => (
                            <option key={agent} value={agent}>{agent}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.rowSingle}>
                      <div className={styles.field}>
                        <label className={styles.label}>Fecha de visita</label>
                        <input
                          type="date"
                          value={formData.visitDate}
                          onChange={(e) => handleInputChange('visitDate', e.target.value)}
                          className={`${styles.input} ${errors.visitDate ? styles.error : ''}`}
                          disabled={mode === 'view'}
                        />
                        {errors.visitDate && <span className={styles.errorText}>{errors.visitDate}</span>}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>Operación</label>
                        <select
                          value={formData.operation}
                          onChange={(e) => handleInputChange('operation', e.target.value)}
                          className={styles.select}
                          disabled={mode === 'view'}
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
                          disabled={mode === 'view'}
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.label}>Etapa</label>
                        <select
                          value={formData.stage}
                          onChange={(e) => handleInputChange('stage', e.target.value)}
                          className={styles.select}
                          disabled={mode === 'view'}
                        >
                          {stages.map(stage => (
                            <option key={stage} value={stage}>{stage}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label}>Agente</label>
                        <select
                          value={formData.agent}
                          onChange={(e) => handleInputChange('agent', e.target.value)}
                          className={styles.select}
                          disabled={mode === 'view'}
                        >
                          {dealOptions.map(agent => (
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
                              disabled={mode === 'view'}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              {mode === 'view' ? 'Cerrar' : 'Cancelar'}
            </button>
            {mode !== 'view' && (
              <button type="submit" className={styles.submitButton}>
                {isAppraisal
                  ? mode === 'create'
                    ? 'Registrar Tasación'
                    : 'Guardar Cambios'
                  : isProperty
                    ? mode === 'create'
                      ? 'Registrar Propiedad'
                      : 'Guardar Cambios'
                    : mode === 'create'
                      ? 'Agregar Negocio'
                      : 'Guardar Cambios'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default DealModal
