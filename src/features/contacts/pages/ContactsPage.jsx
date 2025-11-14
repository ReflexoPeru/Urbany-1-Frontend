import React, { useMemo, useState } from 'react'
import { DownloadSimple, MagnifyingGlass } from 'phosphor-react'
import Button from '../../../components/ui/Button/Button'
import ContactsDataTable from '../components/ContactsDataTable'
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal'
import { Select } from '../../../components/common/Select'
import { useToast } from '../../../contexts/ToastContext'
import { mockContacts } from '../../../mock/contacts'
import DownloadModal from '../../emprendimientos/components/DownloadModal'
import ContactDetailModal from '../components/ContactDetailModal'
import styles from './ContactsPage.module.css'

const createEmptyContact = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  type: 'Cliente',
  status: 'active',
  lastContact: new Date().toISOString().slice(0, 10),
  notes: ''
})

const ContactsPage = () => {
  const [contacts, setContacts] = useState(mockContacts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const [contactToDelete, setContactToDelete] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [detailModalMode, setDetailModalMode] = useState('view')
  const [activeContact, setActiveContact] = useState(null)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  const { toast } = useToast()

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const term = searchTerm.trim().toLowerCase()
      const matchesSearch = term
        ? [contact.name, contact.email, contact.phone, contact.company]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(term))
        : true

      const matchesType = selectedType && selectedType.value !== 'all'
        ? contact.type?.toLowerCase() === selectedType.value
        : true

      const matchesStatus = selectedStatus && selectedStatus.value !== 'all'
        ? contact.status === selectedStatus.value
        : true

      return matchesSearch && matchesType && matchesStatus
    })
  }, [contacts, searchTerm, selectedType, selectedStatus])

  const selectedContacts = useMemo(
    () =>
      filteredContacts.filter((contact, index) =>
        selectedContactIds.includes(contact.id ?? `contact-${index}`)
      ),
    [selectedContactIds, filteredContacts]
  )

  const handleSelectionChange = (ids) => {
    setSelectedContactIds(ids)
  }

  const handleAddContact = () => {
    setActiveContact(null)
    setDetailModalMode('create')
    setDetailModalOpen(true)
  }

  const handleViewContact = (contact) => {
    setActiveContact(contact)
    setDetailModalMode('view')
    setDetailModalOpen(true)
  }

  const handleEditContact = (contact) => {
    setActiveContact(contact)
    setDetailModalMode('edit')
    setDetailModalOpen(true)
  }

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async (contactId) => {
    try {
      if (!contactId) {
        setDeleteModalOpen(false)
        setContactToDelete(null)
        return
      }

      setContacts((previous) => previous.filter((contact) => contact.id !== contactId))
      setSelectedContactIds((previous) => previous.filter((id) => id !== contactId))
      setContactToDelete(null)
      setDeleteModalOpen(false)
      toast.success('Contacto eliminado', 'El contacto se eliminó correctamente.')
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast.error('Error al eliminar', 'No se pudo eliminar el contacto.')
    }
  }

  const handleBulkDelete = () => {
    if (selectedContacts.length === 0) {
      return
    }
    setBulkDeleteModalOpen(true)
  }

  const handleConfirmBulkDelete = async () => {
    try {
      const idsToDelete = selectedContacts.map((contact) => contact.id)
      setContacts((previous) => previous.filter((contact) => !idsToDelete.includes(contact.id)))
      setSelectedContactIds((previous) => previous.filter((id) => !idsToDelete.includes(id)))
      setBulkDeleteModalOpen(false)
      toast.success('Contactos eliminados', 'Los contactos seleccionados fueron eliminados.')
    } catch (error) {
      console.error('Error deleting contacts:', error)
      toast.error('Error al eliminar', 'No se pudieron eliminar los contactos seleccionados.')
    }
  }

  const handleSaveContact = (updatedContact) => {
    try {
      if (detailModalMode === 'create') {
        const newContact = {
          ...createEmptyContact(),
          ...updatedContact,
          id: updatedContact?.id ?? Date.now(),
          name: updatedContact.name.trim(),
          email: updatedContact.email.trim(),
          type: updatedContact.type,
          status: updatedContact.status,
          lastContact: updatedContact.lastContact || new Date().toISOString().slice(0, 10)
        }
        setContacts((previous) => [newContact, ...previous])
        toast.success('Contacto creado', `${newContact.name} se agregó correctamente.`)
      } else {
        setContacts((previous) =>
          previous.map((contactItem) =>
            contactItem.id === updatedContact.id
              ? {
                  ...contactItem,
                  ...updatedContact,
                  name: updatedContact.name.trim(),
                  email: updatedContact.email.trim(),
                  lastContact: updatedContact.lastContact || contactItem.lastContact,
                  notes: updatedContact.notes ?? contactItem.notes
                }
              : contactItem
          )
        )
        toast.success('Contacto actualizado', `${updatedContact.name} se actualizó correctamente.`)
      }
    } catch (error) {
      console.error('Error saving contact:', error)
      toast.error('Error al guardar', 'No se pudo guardar la información del contacto.')
    } finally {
      setDetailModalOpen(false)
      setDetailModalMode('view')
      setActiveContact(null)
    }
  }

  const handleDownload = (format, range) => {
    toast.info('Descarga en preparación', `Generando archivo ${format.toUpperCase()} (${range}).`)
  }

  const typeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'cliente', label: 'Clientes' },
    { value: 'proveedor', label: 'Proveedores' }
  ]

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activos' },
    { value: 'inactive', label: 'Inactivos' }
  ]

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>Contactos</h1>
            <p className={styles.subtitle}>Administra tu base de contactos y mantén al día tus relaciones clave.</p>
          </div>
          <div className={styles.headerActions}>
            <Button variant="primary" icon="plus" onClick={handleAddContact}>
              Añadir contacto
            </Button>
          </div>
        </header>

        <section className={styles.tableSection}>
          <div className={styles.controlHeader}>
            <div className={styles.searchBox}>
              <MagnifyingGlass className={styles.searchIcon} weight="bold" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nombre, correo o teléfono"
                className={styles.searchInput}
              />
            </div>

            <div className={styles.iconGroup}>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Descargar contactos"
                onClick={() => setDownloadModalOpen(true)}
              >
                <DownloadSimple weight="bold" />
              </button>
              {selectedContacts.length > 0 && (
                <button
                  type="button"
                  className={styles.bulkDeleteButton}
                  onClick={handleBulkDelete}
                >
                  Eliminar ({selectedContacts.length})
                </button>
              )}
            </div>
          </div>

          <div className={styles.filtersRow}>
            <Select
              options={typeOptions}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Tipo de contacto"
              isClearable
              className={styles.filterSelect}
            />
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Estado"
              isClearable
              className={styles.filterSelect}
            />
          </div>

          <div className={styles.tableContent}>
            <ContactsDataTable
              data={filteredContacts}
              selectedIds={selectedContactIds}
              onSelectionChange={handleSelectionChange}
              onRowClick={handleViewContact}
              onEditContact={handleEditContact}
              onDeleteContact={handleDeleteContact}
            />
          </div>
        </section>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setContactToDelete(null)
        }}
        onConfirm={() => handleConfirmDelete(contactToDelete?.id)}
        title="Eliminar contacto"
        message={contactToDelete ? `¿Seguro que deseas eliminar a ${contactToDelete.name}?` : ''}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Eliminar contactos seleccionados"
        message={`¿Seguro que deseas eliminar ${selectedContacts.length} contactos seleccionados?`}
        type="danger"
        confirmText="Eliminar todos"
        cancelText="Cancelar"
      />

      <ContactDetailModal
        isOpen={detailModalOpen}
        mode={detailModalMode}
        contact={activeContact}
        onClose={() => {
          setDetailModalOpen(false)
          setDetailModalMode('view')
          setActiveContact(null)
        }}
        onSave={handleSaveContact}
      />

      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        onDownload={handleDownload}
      />
    </div>
  )
}

export default ContactsPage