import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Edit, CheckCircle, Upload, X, File, Image as ImageIcon, Video, FileText, Plus
} from 'lucide-react'
import ventureIllustration from '../../../assets/emprendimentos/emprendimiento.svg'
import Button from '../../../components/ui/Button/Button'
import DatePicker from '../../../components/ui/DatePicker/DatePicker'
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal'
import { useVentures } from '../hooks'
import { venturesService } from '../services/venturesService'
import styles from './VentureDetailPage.module.css'

const VentureDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateVenture, addVenture } = useVentures()
  const isNew = !id || id === 'nuevo'

  const [loading, setLoading] = useState(!isNew)
  const [venture, setVenture] = useState({
    title: '',
    location: '',
    description: '',
    stage: 'En construcción',
    deliveryDate: '',
    administrator: '',
    imageUrl: '',
    imageFile: null,
    whatsapp: '',
    multimedia: [],
    plans: [],
    diffusion: {
      description: '',
      highlights: [],
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    },
    privateInfo: {
      notes: '',
      internalContacts: []
    },
    characteristics: {
      delivery: '',
      price: '',
      units: '',
      floors: '',
      parking: '',
      apartments: '',
      offices: '',
      stores: '',
      elevators: ''
    },
    amenities: {
      runningWater: false,
      heating: false,
      boiler: false,
      boxDeposit: false,
      custom: []
    }
  })

  const [activeTab, setActiveTab] = useState('characteristics')
  const [imagePreview, setImagePreview] = useState(ventureIllustration)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [missingFields, setMissingFields] = useState([])
  const [deliveryDateValue, setDeliveryDateValue] = useState(null)
  const fileInputRef = useRef(null)
  const multimediaInputRef = useRef(null)
  const plansInputRef = useRef(null)

  useEffect(() => {
    if (!isNew) {
      const loadVenture = async () => {
        try {
          setLoading(true)
          const loadedVenture = await venturesService.getVentureById(id)
          const ventureData = {
            title: loadedVenture.title || '',
            location: loadedVenture.location || '',
            description: loadedVenture.description || '',
            stage: loadedVenture.stage || 'En construcción',
            deliveryDate: loadedVenture.deliveryDate || '',
            administrator: loadedVenture.administrator || '',
            imageUrl: loadedVenture.imageUrl || '',
            whatsapp: loadedVenture.whatsapp || '',
            multimedia: loadedVenture.multimedia || [],
            plans: loadedVenture.plans || [],
            diffusion: loadedVenture.diffusion || {
              description: '',
              highlights: [],
              socialMedia: {
                facebook: '',
                instagram: '',
                twitter: ''
              }
            },
            privateInfo: loadedVenture.privateInfo || {
              notes: '',
              internalContacts: []
            },
            characteristics: {
              delivery: loadedVenture.characteristics?.delivery || '',
              price: loadedVenture.characteristics?.price || '',
              units: loadedVenture.characteristics?.units || '',
              floors: loadedVenture.characteristics?.floors || '',
              parking: loadedVenture.characteristics?.parking || '',
              apartments: loadedVenture.characteristics?.apartments || '',
              offices: loadedVenture.characteristics?.offices || '',
              stores: loadedVenture.characteristics?.stores || '',
              elevators: loadedVenture.characteristics?.elevators || ''
            },
            amenities: {
              runningWater: loadedVenture.amenities?.runningWater || false,
              heating: loadedVenture.amenities?.heating || false,
              boiler: loadedVenture.amenities?.boiler || false,
              boxDeposit: loadedVenture.amenities?.boxDeposit || false,
              custom: loadedVenture.amenities?.custom || []
            }
          }
          setVenture(ventureData)
          if (loadedVenture.deliveryDate) {
            try {
              const dateParts = loadedVenture.deliveryDate.split(' ')
              if (dateParts.length >= 2) {
                const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
                const month = monthNames.indexOf(dateParts[0].toLowerCase())
                const year = parseInt(dateParts[1])
                if (month !== -1 && year) {
                  setDeliveryDateValue(new Date(year, month, 1))
                } else {
                  setDeliveryDateValue(null)
                }
              } else {
                setDeliveryDateValue(null)
              }
            } catch {
              setDeliveryDateValue(null)
            }
          } else {
            setDeliveryDateValue(null)
          }
          setImagePreview(loadedVenture.imageUrl || ventureIllustration)
        } catch (error) {
          console.error('Error loading venture:', error)
        } finally {
          setLoading(false)
        }
      }
      loadVenture()
    }
  }, [id, isNew])

  const handleInputChange = (field, value) => {
    setVenture(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCharacteristicChange = (field, value) => {
    setVenture(prev => ({
      ...prev,
      characteristics: {
        ...prev.characteristics,
        [field]: value
      }
    }))
  }

  const handleAmenityChange = (field, value) => {
    setVenture(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [field]: value,
        custom: prev.amenities?.custom || []
      }
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setVenture(prev => ({
          ...prev,
          imageFile: file,
          imageUrl: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMultimediaUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))
    setVenture(prev => ({
      ...prev,
      multimedia: [...prev.multimedia, ...newFiles]
    }))
  }

  const handlePlansUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      uploadedAt: new Date().toISOString()
    }))
    setVenture(prev => ({
      ...prev,
      plans: [...prev.plans, ...newFiles]
    }))
  }

  const handleRemoveMultimedia = (id) => {
    setVenture(prev => ({
      ...prev,
      multimedia: prev.multimedia.filter(item => item.id !== id)
    }))
  }

  const handleRemovePlan = (id) => {
    setVenture(prev => ({
      ...prev,
      plans: prev.plans.filter(item => item.id !== id)
    }))
  }

  const handleAddHighlight = () => {
    setVenture(prev => ({
      ...prev,
      diffusion: {
        ...prev.diffusion,
        highlights: [...prev.diffusion.highlights, '']
      }
    }))
  }

  const handleUpdateHighlight = (index, value) => {
    setVenture(prev => ({
      ...prev,
      diffusion: {
        ...prev.diffusion,
        highlights: prev.diffusion.highlights.map((h, i) => i === index ? value : h)
      }
    }))
  }

  const handleRemoveHighlight = (index) => {
    setVenture(prev => ({
      ...prev,
      diffusion: {
        ...prev.diffusion,
        highlights: prev.diffusion.highlights.filter((_, i) => i !== index)
      }
    }))
  }

  const handleAddContact = () => {
    setVenture(prev => ({
      ...prev,
      privateInfo: {
        ...prev.privateInfo,
        internalContacts: [...prev.privateInfo.internalContacts, { name: '', phone: '', email: '' }]
      }
    }))
  }

  const handleUpdateContact = (index, field, value) => {
    setVenture(prev => ({
      ...prev,
      privateInfo: {
        ...prev.privateInfo,
        internalContacts: prev.privateInfo.internalContacts.map((c, i) => 
          i === index ? { ...c, [field]: value } : c
        )
      }
    }))
  }

  const handleRemoveContact = (index) => {
    setVenture(prev => ({
      ...prev,
      privateInfo: {
        ...prev.privateInfo,
        internalContacts: prev.privateInfo.internalContacts.filter((_, i) => i !== index)
      }
    }))
  }

  const handleAddCustomAmenity = () => {
    setVenture(prev => {
      const currentCustom = prev.amenities?.custom || []
      return {
        ...prev,
        amenities: {
          ...prev.amenities,
          runningWater: prev.amenities?.runningWater || false,
          heating: prev.amenities?.heating || false,
          boiler: prev.amenities?.boiler || false,
          boxDeposit: prev.amenities?.boxDeposit || false,
          custom: [...currentCustom, { id: Date.now(), name: '' }]
        }
      }
    })
  }

  const handleUpdateCustomAmenity = (id, name) => {
    setVenture(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        runningWater: prev.amenities?.runningWater || false,
        heating: prev.amenities?.heating || false,
        boiler: prev.amenities?.boiler || false,
        boxDeposit: prev.amenities?.boxDeposit || false,
        custom: (prev.amenities?.custom || []).map(item => 
          item.id === id ? { ...item, name } : item
        )
      }
    }))
  }

  const handleRemoveCustomAmenity = (id) => {
    setVenture(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        runningWater: prev.amenities?.runningWater || false,
        heating: prev.amenities?.heating || false,
        boiler: prev.amenities?.boiler || false,
        boxDeposit: prev.amenities?.boxDeposit || false,
        custom: (prev.amenities?.custom || []).filter(item => item.id !== id)
      }
    }))
  }

  const handleSaveClick = () => {
    const title = venture.title?.trim() || ''
    const location = venture.location?.trim() || ''
    const description = venture.description?.trim() || ''
    const hasDeliveryDate = deliveryDateValue !== null

    const missing = []
    if (!title) missing.push('Título')
    if (!location) missing.push('Ubicación')
    if (!description) missing.push('Descripción')
    if (!hasDeliveryDate) missing.push('Fecha de entrega')

    if (missing.length > 0) {
      setMissingFields(missing)
      setShowValidationModal(true)
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmSave = async () => {
    try {
      let formattedDate = ''
      if (deliveryDateValue) {
        const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
        const month = monthNames[deliveryDateValue.getMonth()]
        const year = deliveryDateValue.getFullYear()
        formattedDate = `${month} ${year}`
      }
      
      const ventureToSave = {
        title: (venture.title || '').trim(),
        location: (venture.location || '').trim(),
        description: (venture.description || '').trim(),
        stage: venture.stage || 'En construcción',
        deliveryDate: formattedDate,
        administrator: (venture.administrator || '').trim(),
        imageUrl: imagePreview && imagePreview !== ventureIllustration ? imagePreview : '',
        whatsapp: (venture.whatsapp || '').trim(),
        multimedia: (venture.multimedia || []).map(item => ({
          id: item.id,
          name: item.name,
          type: item.type,
          size: item.size,
          preview: item.preview
        })),
        plans: (venture.plans || []).map(item => ({
          id: item.id,
          name: item.name,
          type: item.type,
          size: item.size,
          uploadedAt: item.uploadedAt
        })),
        diffusion: venture.diffusion || {
          description: '',
          highlights: [],
          socialMedia: { facebook: '', instagram: '', twitter: '' }
        },
        privateInfo: venture.privateInfo || {
          notes: '',
          internalContacts: []
        },
        characteristics: venture.characteristics || {
          delivery: '',
          price: '',
          units: '',
          floors: '',
          parking: '',
          apartments: '',
          offices: '',
          stores: '',
          elevators: ''
        },
        amenities: venture.amenities || {
          runningWater: false,
          heating: false,
          boiler: false,
          boxDeposit: false,
          custom: []
        }
      }
      
      if (isNew) {
        await addVenture(ventureToSave)
      } else {
        await updateVenture({ ...ventureToSave, id })
      }
      setShowConfirmModal(false)
      navigate('/emprendimientos')
    } catch (error) {
      console.error('Error saving venture:', error)
      alert('Error al guardar el emprendimiento. Por favor, intenta nuevamente.')
      setShowConfirmModal(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div>Cargando...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'characteristics', label: 'Caracteristicas' },
    { id: 'multimedia', label: 'Multimedia' },
    { id: 'plans', label: 'Planos' },
    { id: 'diffusion', label: 'Difusión' },
    { id: 'private', label: 'Información privada' }
  ]

  const progress = venture.stage === 'Terminado' ? 100 : venture.stage === 'En construcción' ? 60 : 30

  return (
    <div className={styles.ventureDetail}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/emprendimientos')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={styles.title}>
            {isNew ? 'Nuevo Emprendimiento' : venture.title || 'Emprendimiento'}
          </h1>
        </div>
        
      </div>

      <div className={styles.content}>
        <div className={styles.summaryCard}>
          <div className={styles.imageContainer}>
            <img 
              src={imagePreview || ventureIllustration} 
              alt={venture.title || 'Emprendimiento'} 
              className={styles.image}
            />
            <div className={styles.imageOverlay}>
              <button 
                className={styles.imageChangeButton}
                onClick={() => fileInputRef.current?.click()}
              >
                <Edit size={18} />
                Cambiar imagen
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.hiddenInput}
            />
          </div>
          
          <div className={styles.summaryInfo}>
            <input
              type="text"
              value={venture.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Título del emprendimiento"
              className={styles.titleInput}
            />
            
            <input
              type="text"
              value={venture.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Ubicación"
              className={styles.locationInput}
            />
            
            <textarea
              value={venture.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descripción del emprendimiento"
              className={styles.descriptionInput}
              rows={4}
            />
            
            <div className={styles.statusSection}>
              <div className={styles.statusHeader}>
                <span className={styles.statusLabel}>Etapa del emprendimiento:</span>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <select
                value={venture.stage}
                onChange={(e) => handleInputChange('stage', e.target.value)}
                className={styles.stageSelect}
              >
                <option value="En construcción">En construcción</option>
                <option value="En venta">En venta</option>
                <option value="Terminado">Terminado</option>
              </select>
              
              <DatePicker
                placeholder="Fecha de entrega"
                value={deliveryDateValue}
                onChange={(date) => {
                  setDeliveryDateValue(date)
                }}
              />
              
              <input
                type="text"
                value={venture.administrator}
                onChange={(e) => handleInputChange('administrator', e.target.value)}
                placeholder="Administrador"
                className={styles.adminInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'characteristics' && (
            <div className={styles.characteristicsContent}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Característica</h3>
              </div>

              <div className={styles.characteristicsGrid}>
                <div className={styles.characteristicColumn}>
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>Entrega:</label>
                    <input
                      type="text"
                      value={venture.characteristics.delivery}
                      onChange={(e) => handleCharacteristicChange('delivery', e.target.value)}
                      placeholder="m2"
                      className={styles.characteristicInput}
                    />
                  </div>
                  
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>$ contado:</label>
                    <input
                      type="text"
                      value={venture.characteristics.price}
                      onChange={(e) => handleCharacteristicChange('price', e.target.value)}
                      placeholder="$"
                      className={styles.characteristicInput}
                    />
                  </div>
                  
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}># Unidades:</label>
                    <input
                      type="number"
                      value={venture.characteristics.units}
                      onChange={(e) => handleCharacteristicChange('units', e.target.value)}
                      placeholder="234"
                      className={styles.characteristicInput}
                    />
                  </div>
                </div>

                <div className={styles.characteristicColumn}>
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>Pisos:</label>
                    <input
                      type="number"
                      value={venture.characteristics.floors}
                      onChange={(e) => handleCharacteristicChange('floors', e.target.value)}
                      placeholder="3"
                      className={styles.characteristicInput}
                    />
                  </div>
                  
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>Cocheras:</label>
                    <input
                      type="number"
                      value={venture.characteristics.parking}
                      onChange={(e) => handleCharacteristicChange('parking', e.target.value)}
                      placeholder="2"
                      className={styles.characteristicInput}
                    />
                  </div>
                  
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>Departamentos totales:</label>
                    <input
                      type="number"
                      value={venture.characteristics.apartments}
                      onChange={(e) => handleCharacteristicChange('apartments', e.target.value)}
                      placeholder="12"
                      className={styles.characteristicInput}
                    />
                  </div>
                  
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>Oficinas:</label>
                    <input
                      type="number"
                      value={venture.characteristics.offices}
                      onChange={(e) => handleCharacteristicChange('offices', e.target.value)}
                      placeholder="9"
                      className={styles.characteristicInput}
                    />
                  </div>
                  
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>Locales:</label>
                    <input
                      type="number"
                      value={venture.characteristics.stores}
                      onChange={(e) => handleCharacteristicChange('stores', e.target.value)}
                      placeholder="3"
                      className={styles.characteristicInput}
                    />
                  </div>
                  
                  <div className={styles.characteristicItem}>
                    <label className={styles.characteristicLabel}>Ascensores:</label>
                    <input
                      type="number"
                      value={venture.characteristics.elevators}
                      onChange={(e) => handleCharacteristicChange('elevators', e.target.value)}
                      placeholder="2"
                      className={styles.characteristicInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.amenitiesSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Comodidades</h3>
                  <button 
                    className={styles.addAmenityButton}
                    onClick={handleAddCustomAmenity}
                  >
                    <Plus size={16} />
                    Añadir nueva comodidad
                  </button>
                </div>

                <div className={styles.amenitiesGrid}>
                  <div className={styles.amenityColumn}>
                    <label className={styles.amenityCheckbox}>
                      <input
                        type="checkbox"
                        checked={venture.amenities.runningWater}
                        onChange={(e) => handleAmenityChange('runningWater', e.target.checked)}
                      />
                      <span>Agua corriente</span>
                      {venture.amenities.runningWater && (
                        <CheckCircle size={16} className={styles.checkIcon} />
                      )}
                    </label>
                  </div>

                  <div className={styles.amenityColumn}>
                    <label className={styles.amenityCheckbox}>
                      <input
                        type="checkbox"
                        checked={venture.amenities.heating}
                        onChange={(e) => handleAmenityChange('heating', e.target.checked)}
                      />
                      <span>Calefacción</span>
                      {venture.amenities.heating && (
                        <CheckCircle size={16} className={styles.checkIcon} />
                      )}
                    </label>
                    
                    <label className={styles.amenityCheckbox}>
                      <input
                        type="checkbox"
                        checked={venture.amenities.boiler}
                        onChange={(e) => handleAmenityChange('boiler', e.target.checked)}
                      />
                      <span>Caldera</span>
                      {venture.amenities.boiler && (
                        <CheckCircle size={16} className={styles.checkIcon} />
                      )}
                    </label>
                    
                    <label className={styles.amenityCheckbox}>
                      <input
                        type="checkbox"
                        checked={venture.amenities.boxDeposit}
                        onChange={(e) => handleAmenityChange('boxDeposit', e.target.checked)}
                      />
                      <span>Box/Depósito</span>
                      {venture.amenities.boxDeposit && (
                        <CheckCircle size={16} className={styles.checkIcon} />
                      )}
                    </label>
                  </div>
                </div>

                {venture.amenities.custom && venture.amenities.custom.length > 0 && (
                  <div className={styles.customAmenitiesSection}>
                    <h4 className={styles.customAmenitiesTitle}>Comodidades personalizadas</h4>
                    <div className={styles.customAmenitiesList}>
                      {venture.amenities.custom.map((amenity) => (
                        <div key={amenity.id} className={styles.customAmenityItem}>
                          <input
                            type="text"
                            value={amenity.name}
                            onChange={(e) => handleUpdateCustomAmenity(amenity.id, e.target.value)}
                            placeholder="Nombre de la comodidad"
                            className={styles.customAmenityInput}
                          />
                          <button
                            className={styles.removeCustomAmenityButton}
                            onClick={() => handleRemoveCustomAmenity(amenity.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'multimedia' && (
            <div className={styles.multimediaContent}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Archivos Multimedia</h3>
                <button 
                  className={styles.uploadButton}
                  onClick={() => multimediaInputRef.current?.click()}
                >
                  <Upload size={18} />
                  Subir archivos
                </button>
                <input
                  ref={multimediaInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMultimediaUpload}
                  className={styles.hiddenInput}
                />
              </div>

              {venture.multimedia.length === 0 ? (
                <div className={styles.emptyState}>
                  <ImageIcon size={48} className={styles.emptyIcon} />
                  <p>No hay archivos multimedia cargados</p>
                  <p className={styles.emptyHint}>Sube imágenes o videos relacionados al emprendimiento</p>
                </div>
              ) : (
                <div className={styles.multimediaGrid}>
                  {venture.multimedia.map((item) => (
                    <div key={item.id} className={styles.multimediaItem}>
                      {item.preview ? (
                        <img src={item.preview} alt={item.name} className={styles.multimediaPreview} />
                      ) : (
                        <div className={styles.multimediaPlaceholder}>
                          <Video size={32} />
                        </div>
                      )}
                      <div className={styles.multimediaInfo}>
                        <span className={styles.multimediaName}>{item.name}</span>
                        <span className={styles.multimediaSize}>
                          {(item.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemoveMultimedia(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'plans' && (
            <div className={styles.plansContent}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Planos y Documentos</h3>
                <button 
                  className={styles.uploadButton}
                  onClick={() => plansInputRef.current?.click()}
                >
                  <Upload size={18} />
                  Subir archivos
                </button>
                <input
                  ref={plansInputRef}
                  type="file"
                  accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                  multiple
                  onChange={handlePlansUpload}
                  className={styles.hiddenInput}
                />
              </div>

              {venture.plans.length === 0 ? (
                <div className={styles.emptyState}>
                  <FileText size={48} className={styles.emptyIcon} />
                  <p>No hay planos o documentos cargados</p>
                  <p className={styles.emptyHint}>Sube planos, documentos técnicos o archivos compartidos</p>
                </div>
              ) : (
                <div className={styles.plansList}>
                  {venture.plans.map((item) => (
                    <div key={item.id} className={styles.planItem}>
                      <File size={24} className={styles.planIcon} />
                      <div className={styles.planInfo}>
                        <span className={styles.planName}>{item.name}</span>
                        <span className={styles.planMeta}>
                          {(item.size / 1024 / 1024).toFixed(2)} MB • {new Date(item.uploadedAt).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemovePlan(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'diffusion' && (
            <div className={styles.diffusionContent}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Contenido para Difusión</h3>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Descripción para difusión</label>
                <textarea
                  value={venture.diffusion.description}
                  onChange={(e) => setVenture(prev => ({
                    ...prev,
                    diffusion: { ...prev.diffusion, description: e.target.value }
                  }))}
                  placeholder="Escribe una descripción atractiva para promocionar el emprendimiento..."
                  className={styles.textarea}
                  rows={6}
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>Puntos destacados</label>
                  <button 
                    className={styles.addButton}
                    onClick={handleAddHighlight}
                  >
                    + Agregar punto
                  </button>
                </div>
                {venture.diffusion.highlights.map((highlight, index) => (
                  <div key={index} className={styles.highlightItem}>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleUpdateHighlight(index, e.target.value)}
                      placeholder="Ej: Ubicación privilegiada en el centro"
                      className={styles.input}
                    />
                    <button 
                      className={styles.removeButton}
                      onClick={() => handleRemoveHighlight(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {venture.diffusion.highlights.length === 0 && (
                  <p className={styles.hint}>No hay puntos destacados. Agrega uno para comenzar.</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Redes Sociales</label>
                <div className={styles.socialGrid}>
                  <div className={styles.socialItem}>
                    <label className={styles.socialLabel}>Facebook</label>
                    <input
                      type="url"
                      value={venture.diffusion.socialMedia.facebook}
                      onChange={(e) => setVenture(prev => ({
                        ...prev,
                        diffusion: {
                          ...prev.diffusion,
                          socialMedia: { ...prev.diffusion.socialMedia, facebook: e.target.value }
                        }
                      }))}
                      placeholder="https://facebook.com/..."
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.socialItem}>
                    <label className={styles.socialLabel}>Instagram</label>
                    <input
                      type="url"
                      value={venture.diffusion.socialMedia.instagram}
                      onChange={(e) => setVenture(prev => ({
                        ...prev,
                        diffusion: {
                          ...prev.diffusion,
                          socialMedia: { ...prev.diffusion.socialMedia, instagram: e.target.value }
                        }
                      }))}
                      placeholder="https://instagram.com/..."
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.socialItem}>
                    <label className={styles.socialLabel}>Twitter</label>
                    <input
                      type="url"
                      value={venture.diffusion.socialMedia.twitter}
                      onChange={(e) => setVenture(prev => ({
                        ...prev,
                        diffusion: {
                          ...prev.diffusion,
                          socialMedia: { ...prev.diffusion.socialMedia, twitter: e.target.value }
                        }
                      }))}
                      placeholder="https://twitter.com/..."
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'private' && (
            <div className={styles.privateContent}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Información Privada</h3>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>WhatsApp</label>
                <input
                  type="tel"
                  value={venture.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="+54 11 1234-5678"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Notas internas</label>
                <textarea
                  value={venture.privateInfo.notes}
                  onChange={(e) => setVenture(prev => ({
                    ...prev,
                    privateInfo: { ...prev.privateInfo, notes: e.target.value }
                  }))}
                  placeholder="Notas privadas sobre el emprendimiento..."
                  className={styles.textarea}
                  rows={6}
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>Contactos internos</label>
                  <button 
                    className={styles.addButton}
                    onClick={handleAddContact}
                  >
                    + Agregar contacto
                  </button>
                </div>
                {venture.privateInfo.internalContacts.map((contact, index) => (
                  <div key={index} className={styles.contactItem}>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleUpdateContact(index, 'name', e.target.value)}
                      placeholder="Nombre"
                      className={styles.contactInput}
                    />
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleUpdateContact(index, 'phone', e.target.value)}
                      placeholder="Teléfono"
                      className={styles.contactInput}
                    />
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleUpdateContact(index, 'email', e.target.value)}
                      placeholder="Email"
                      className={styles.contactInput}
                    />
                    <button 
                      className={styles.removeButton}
                      onClick={() => handleRemoveContact(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {venture.privateInfo.internalContacts.length === 0 && (
                  <p className={styles.hint}>No hay contactos internos. Agrega uno para comenzar.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <Button variant="secondary" onClick={() => navigate('/emprendimientos')}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Guardar
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        title={isNew ? "Crear emprendimiento" : "Guardar cambios"}
        message={isNew 
          ? "¿Estás seguro de que deseas crear este emprendimiento?"
          : "¿Estás seguro de que deseas guardar los cambios realizados?"
        }
        type="info"
        confirmText="Guardar"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        onConfirm={() => setShowValidationModal(false)}
        title="Campos obligatorios faltantes"
        message={`Los siguientes campos son obligatorios y deben completarse antes de guardar: ${missingFields.join(', ')}. Por favor, completa estos campos y vuelve a intentar.`}
        type="warning"
        confirmText="Entendido"
        showCancel={false}
      />
    </div>
  )
}

export default VentureDetailPage

