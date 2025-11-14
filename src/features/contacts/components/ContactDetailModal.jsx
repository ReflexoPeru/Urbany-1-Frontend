import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Phone, EnvelopeSimple, Factory, CalendarBlank, NotePencil } from 'phosphor-react'
import styles from './ContactDetailModal.module.css'

const typeOptions = [
  { value: 'Cliente', label: 'Cliente' },
  { value: 'Proveedor', label: 'Proveedor' },
  { value: 'Otro', label: 'Otro' }
]

const statusOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' }
]

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  type: 'Cliente',
  status: 'active',
  lastContact: new Date().toISOString().slice(0, 10),
  notes: ''
}

const formatStatus = (value) => statusOptions.find((option) => option.value === value)?.label ?? 'Sin estado'

const ContactDetailModal = ({ isOpen, mode = 'view', contact, onClose, onSave }) => {
  const [formValues, setFormValues] = useState(defaultValues)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const isViewMode = mode === 'view'
  const isCreateMode = mode === 'create'

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const source = contact ?? {}
    const values = {
      ...defaultValues,
      ...source,
      lastContact: source?.lastContact ? source.lastContact.slice(0, 10) : defaultValues.lastContact
    }
    setFormValues(values)
  }, [isOpen, contact])

  const headerTitle = useMemo(() => {
    if (isCreateMode) {
      return 'Crear contacto'
    }
    if (mode === 'edit') {
      return 'Editar contacto'
    }
    return 'Detalle de contacto'
  }, [mode, isCreateMode])

  const handleChange = (field) => (event) => {
    const { value } = event.target
    setFormValues((previous) => ({
      ...previous,
      [field]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      ...(contact ?? {}),
      ...formValues,
      type: formValues.type,
      status: formValues.status,
      lastContact: formValues.lastContact || null
    }
    onSave?.(payload)
  }

  if (!mounted || !isOpen) {
    return null
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.headerTop}>
              <span className={`${styles.modeBadge} ${styles[`mode${mode}`]}`}>
                {mode === 'view' && 'Vista'}
                {mode === 'edit' && 'Editar'}
                {mode === 'create' && 'Crear'}
              </span>
              <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                <X size={20} weight="bold" />
              </button>
            </div>
            <h2 className={styles.title}>{headerTitle}</h2>
            {!isCreateMode && (
              <p className={styles.subtitle}>{contact?.name ?? 'Sin nombre registrado'}</p>
            )}
          </div>
        </header>

        {isViewMode ? (
          <div className={styles.viewContent}>
            <div className={styles.infoRow}>
              <div className={styles.labelBlock}>
                <span className={styles.label}>Correo</span>
                <div className={styles.valueRow}>
                  <EnvelopeSimple size={16} weight="bold" />
                  <span>{contact?.email ?? 'Sin correo'}</span>
                </div>
              </div>
              <div className={styles.labelBlock}>
                <span className={styles.label}>Teléfono</span>
                <div className={styles.valueRow}>
                  <Phone size={16} weight="bold" />
                  <span>{contact?.phone ?? 'Sin teléfono'}</span>
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.labelBlock}>
                <span className={styles.label}>Empresa</span>
                <div className={styles.valueRow}>
                  <Factory size={16} weight="bold" />
                  <span>{contact?.company ?? 'Sin empresa'}</span>
                </div>
              </div>
              <div className={styles.labelBlock}>
                <span className={styles.label}>Último contacto</span>
                <div className={styles.valueRow}>
                  <CalendarBlank size={16} weight="bold" />
                  <span>{contact?.lastContact ? new Date(contact.lastContact).toLocaleDateString('es-ES') : 'Sin fecha'}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailGrid}>
              <div className={styles.detailCard}>
                <span className={styles.detailLabel}>Tipo</span>
                <span className={styles.detailValue}>{contact?.type ?? 'Sin tipo'}</span>
              </div>
              <div className={styles.detailCard}>
                <span className={styles.detailLabel}>Estado</span>
                <span className={`${styles.detailValue} ${styles[`status${contact?.status ?? 'unknown'}`]}`}>
                  {formatStatus(contact?.status)}
                </span>
              </div>
            </div>

            <div className={styles.notesBlock}>
              <span className={styles.label}>Notas</span>
              <div className={styles.notesContainer}>
                {contact?.notes ? (
                  <p>{contact.notes}</p>
                ) : (
                  <p className={styles.emptyNote}>No se registraron notas adicionales.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Nombre completo</label>
                <input
                  id="contact-name"
                  type="text"
                  value={formValues.name}
                  onChange={handleChange('name')}
                  placeholder="Ej. Laura Sánchez"
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">Correo</label>
                <input
                  id="contact-email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange('email')}
                  placeholder="correo@empresa.com"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="contact-phone">Teléfono</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={handleChange('phone')}
                  placeholder="Ej. +57 300 000 0000"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-company">Empresa</label>
                <input
                  id="contact-company"
                  type="text"
                  value={formValues.company}
                  onChange={handleChange('company')}
                  placeholder="Nombre de la empresa"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="contact-type">Tipo de contacto</label>
                <select
                  id="contact-type"
                  value={formValues.type}
                  onChange={handleChange('type')}
                >
                  {typeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-status">Estado</label>
                <select
                  id="contact-status"
                  value={formValues.status}
                  onChange={handleChange('status')}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-last">Último contacto</label>
                <input
                  id="contact-last"
                  type="date"
                  value={formValues.lastContact}
                  onChange={handleChange('lastContact')}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-notes">
                <NotePencil size={16} weight="bold" />
                Notas internas
              </label>
              <textarea
                id="contact-notes"
                value={formValues.notes}
                onChange={handleChange('notes')}
                rows={3}
                placeholder="Agrega información relevante, recordatorios o acuerdos."
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className={styles.saveButton}>
                {isCreateMode ? 'Crear contacto' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}

export default ContactDetailModal


