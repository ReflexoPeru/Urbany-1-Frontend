const ventures = [
  {
    id: 'venture-1',
    title: 'Torre Residencial Centro',
    location: 'Av. Corrientes 1234 | CABA | Buenos Aires',
    tag: 'VERTICAL',
    description: 'Moderno edificio residencial en el corazón de la ciudad con excelentes acabados y amenities completos.',
    stage: 'En construcción',
    deliveryDate: 'mar 2025',
    administrator: 'Juan Pérez Administrador',
    characteristics: {
      delivery: '4500 m2',
      price: '$2.500.000',
      units: '234',
      floors: '15',
      parking: '120',
      apartments: '180',
      offices: '24',
      stores: '12',
      elevators: '4'
    },
    amenities: {
      runningWater: true,
      heating: true,
      boiler: true,
      boxDeposit: true
    },
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'venture-2',
    title: 'Complejo Horizontal Norte',
    location: 'Ruta 9 km 45 | Pilar | Buenos Aires',
    tag: 'HORIZONTAL',
    description: 'Loteo premium con parcelas desde 500m², clubhouse, pileta y seguridad 24hs.',
    stage: 'En venta',
    deliveryDate: 'jun 2024',
    administrator: 'María García Administrador',
    characteristics: {
      delivery: '12000 m2',
      price: '$1.800.000',
      units: '45',
      floors: '1',
      parking: '45',
      apartments: '0',
      offices: '0',
      stores: '2',
      elevators: '0'
    },
    amenities: {
      runningWater: true,
      heating: false,
      boiler: false,
      boxDeposit: true
    },
    createdAt: '2024-02-20T14:30:00Z'
  },
  {
    id: 'venture-3',
    title: 'Edificio Mixto Sur',
    location: 'Av. Libertador 5678 | La Plata | Buenos Aires',
    tag: 'MIXTO',
    description: 'Emprendimiento comercial y residencial con locales en planta baja y departamentos en pisos superiores.',
    stage: 'Terminado',
    deliveryDate: 'sep 2023',
    administrator: 'Carlos Rodríguez Administrador',
    characteristics: {
      delivery: '6800 m2',
      price: '$3.200.000',
      units: '78',
      floors: '8',
      parking: '60',
      apartments: '56',
      offices: '12',
      stores: '8',
      elevators: '2'
    },
    amenities: {
      runningWater: true,
      heating: true,
      boiler: true,
      boxDeposit: false
    },
    createdAt: '2023-11-10T09:15:00Z'
  }
]

export const venturesService = {
  async getVentures(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let filteredVentures = [...ventures]
    
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim()
      filteredVentures = filteredVentures.filter(venture => 
        venture.title?.toLowerCase().includes(searchTerm) ||
        venture.location?.toLowerCase().includes(searchTerm) ||
        venture.description?.toLowerCase().includes(searchTerm) ||
        venture.tag?.toLowerCase().includes(searchTerm) ||
        venture.administrator?.toLowerCase().includes(searchTerm)
      )
    }
    
    if (filters.stage && filters.stage !== 'Todos') {
      filteredVentures = filteredVentures.filter(venture => venture.stage === filters.stage)
    }
    
    if (filters.tag && filters.tag !== 'Todos') {
      filteredVentures = filteredVentures.filter(venture => venture.tag === filters.tag)
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 5
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      ventures: filteredVentures.slice(startIndex, endIndex),
      total: filteredVentures.length,
      page,
      totalPages: Math.ceil(filteredVentures.length / limit)
    }
  },
  
  async getSummaryByStage() {
    await new Promise(resolve => setTimeout(resolve, 100))
    const allStages = ['En construcción', 'En venta', 'Terminado']
    const stageCounts = {}
    
    allStages.forEach(stage => {
      stageCounts[stage] = 0
    })
    
    ventures.forEach(venture => {
      if (stageCounts.hasOwnProperty(venture.stage)) {
        stageCounts[venture.stage]++
      }
    })
    
    return Object.entries(stageCounts).map(([stage, count]) => ({
      stage,
      count
    }))
  },
  
  async getTags() {
    await new Promise(resolve => setTimeout(resolve, 100))
    const allTags = ventures.map(v => v.tag).filter(Boolean)
    const uniqueTags = [...new Set(allTags)]
    return uniqueTags.map(tag => ({ value: tag, label: tag }))
  },
  
  async exportVentures(format = 'csv', dateRange = 'all') {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredVentures = [...ventures]
    
    if (dateRange !== 'all') {
      filteredVentures = this.filterVenturesByDateRange(ventures, dateRange)
    }
    
    const headers = ['Título', 'Ubicación', 'Tag', 'Etapa', 'Fecha de entrega', 'Administrador', 'WhatsApp', 'Fecha creación']
    const data = filteredVentures.map(venture => [
      venture.title || '',
      venture.location || '',
      venture.tag || '',
      venture.stage || '',
      venture.deliveryDate || '',
      venture.administrator || '',
      venture.whatsapp || '',
      venture.createdAt ? new Date(venture.createdAt).toLocaleDateString('es-ES') : ''
    ])
    
    const timestamp = new Date().toISOString().split('T')[0]
    
    switch (format) {
      case 'csv':
        this.exportCSV(headers, data, timestamp)
        break
      case 'excel':
        this.exportExcel(headers, data, timestamp)
        break
      case 'pdf':
        this.exportPDF(headers, data, timestamp)
        break
      default:
        this.exportCSV(headers, data, timestamp)
    }
  },

  filterVenturesByDateRange(ventures, dateRange) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch (dateRange) {
      case 'today':
        return ventures.filter(venture => {
          const ventureDate = new Date(venture.createdAt)
          return ventureDate >= today && ventureDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
        })
      
      case 'week':
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 7)
        return ventures.filter(venture => {
          const ventureDate = new Date(venture.createdAt)
          return ventureDate >= weekStart && ventureDate < weekEnd
        })
      
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        return ventures.filter(venture => {
          const ventureDate = new Date(venture.createdAt)
          return ventureDate >= monthStart && ventureDate < monthEnd
        })
      
      default:
        return ventures
    }
  },

  exportCSV(headers, data, timestamp) {
    const escapeCSV = (field) => {
      if (field === null || field === undefined) return ''
      const str = String(field)
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }
    
    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...data.map(row => row.map(escapeCSV).join(','))
    ].join('\r\n')
    
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `emprendimientos_${timestamp}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  },

  exportExcel(headers, data, timestamp) {
    const escapeExcel = (field) => {
      if (field === null || field === undefined) return ''
      const str = String(field)
      if (str.includes('\t') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }
    
    const excelContent = [
      headers.map(escapeExcel).join('\t'),
      ...data.map(row => row.map(escapeExcel).join('\t'))
    ].join('\n')
    
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + excelContent], { 
      type: 'application/vnd.ms-excel;charset=utf-8;' 
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `emprendimientos_${timestamp}.xls`
    link.click()
    window.URL.revokeObjectURL(url)
  },

  async exportPDF(headers, data, timestamp) {
    if (!window.jspdf) {
      await this.loadJsPDF()
    }
    
    const { jsPDF } = window.jspdf
    if (!jsPDF) {
      console.error('jsPDF library not loaded')
      return
    }
    
    const doc = new jsPDF('portrait')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - 2 * margin
    
    ventures.forEach((venture, index) => {
      if (index > 0) {
        doc.addPage()
      }
      
      let y = margin
      
      doc.setFillColor(56, 228, 122)
      doc.rect(0, 0, pageWidth, 40, 'F')
      
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('REPORTE DE EMPRENDIMIENTO', pageWidth / 2, 25, { align: 'center' })
      
      y = 50
      
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text(venture.title || 'Sin título', margin, y)
      y += 10
      
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      const dateText = `Generado el: ${new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`
      doc.text(dateText, pageWidth - margin, y - 15, { align: 'right' })
      y += 5
      
      doc.setDrawColor(56, 228, 122)
      doc.setLineWidth(0.5)
      doc.line(margin, y, pageWidth - margin, y)
      y += 15
      
      const sectionTitle = (title) => {
        doc.setFillColor(240, 253, 244)
        doc.rect(margin, y - 5, contentWidth, 8, 'F')
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(18, 52, 41)
        doc.text(title, margin + 2, y)
        y += 12
      }
      
      const fieldLine = (label, value, half = false) => {
        if (y > pageHeight - 30) {
          doc.addPage()
          y = margin + 10
        }
        
        const fieldWidth = half ? contentWidth / 2 - 5 : contentWidth
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(75, 85, 99)
        doc.text(`${label}:`, margin, y)
        
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(0, 0, 0)
        const valueText = String(value || 'N/A')
        const lines = doc.splitTextToSize(valueText, fieldWidth - 10)
        doc.text(lines, margin + 5, y + 3)
        y += lines.length * 5 + 5
      }
      
      sectionTitle('INFORMACIÓN GENERAL')
      fieldLine('Ubicación', venture.location)
      fieldLine('Tag', venture.tag, true)
      fieldLine('Etapa', venture.stage, true)
      fieldLine('Fecha de entrega', venture.deliveryDate, true)
      fieldLine('Administrador', venture.administrator, true)
      fieldLine('WhatsApp', venture.whatsapp, true)
      
      if (venture.description) {
        fieldLine('Descripción', venture.description)
      }
      
      if (venture.characteristics) {
        y += 5
        sectionTitle('CARACTERÍSTICAS')
        const char = venture.characteristics
        fieldLine('Superficie de entrega', char.delivery, true)
        fieldLine('Precio', char.price, true)
        fieldLine('Unidades totales', char.units, true)
        fieldLine('Pisos', char.floors, true)
        fieldLine('Cocheras', char.parking, true)
        fieldLine('Departamentos', char.apartments, true)
        fieldLine('Oficinas', char.offices, true)
        fieldLine('Locales comerciales', char.stores, true)
        fieldLine('Ascensores', char.elevators, true)
      }
      
      if (venture.amenities) {
        y += 5
        sectionTitle('COMODIDADES')
        const amenities = []
        if (venture.amenities.runningWater) amenities.push('Agua corriente')
        if (venture.amenities.heating) amenities.push('Calefacción')
        if (venture.amenities.boiler) amenities.push('Caldera')
        if (venture.amenities.boxDeposit) amenities.push('Box/Depósito')
        fieldLine('Servicios incluidos', amenities.join(', ') || 'Ninguno')
      }
      
      if (venture.diffusion && venture.diffusion.description) {
        y += 5
        sectionTitle('DIFUSIÓN')
        fieldLine('Descripción para difusión', venture.diffusion.description)
        
        if (venture.diffusion.highlights && venture.diffusion.highlights.length > 0) {
          doc.setFontSize(9)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(75, 85, 99)
          doc.text('Puntos destacados:', margin, y)
          y += 8
          
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(0, 0, 0)
          venture.diffusion.highlights.forEach(highlight => {
            if (highlight) {
              if (y > pageHeight - 30) {
                doc.addPage()
                y = margin + 10
              }
              doc.text(`• ${highlight}`, margin + 5, y)
              y += 6
            }
          })
        }
        
        if (venture.diffusion.socialMedia) {
          y += 5
          const social = venture.diffusion.socialMedia
          if (social.facebook) fieldLine('Facebook', social.facebook, true)
          if (social.instagram) fieldLine('Instagram', social.instagram, true)
          if (social.twitter) fieldLine('Twitter', social.twitter, true)
        }
      }
      
      if (venture.privateInfo && (venture.privateInfo.notes || (venture.privateInfo.internalContacts && venture.privateInfo.internalContacts.length > 0))) {
        y += 5
        sectionTitle('INFORMACIÓN PRIVADA')
        if (venture.privateInfo.notes) {
          fieldLine('Notas internas', venture.privateInfo.notes)
        }
        
        if (venture.privateInfo.internalContacts && venture.privateInfo.internalContacts.length > 0) {
          doc.setFontSize(9)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(75, 85, 99)
          doc.text('Contactos internos:', margin, y)
          y += 8
          
          venture.privateInfo.internalContacts.forEach(contact => {
            if (y > pageHeight - 30) {
              doc.addPage()
              y = margin + 10
            }
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(0, 0, 0)
            const contactInfo = []
            if (contact.name) contactInfo.push(`Nombre: ${contact.name}`)
            if (contact.phone) contactInfo.push(`Tel: ${contact.phone}`)
            if (contact.email) contactInfo.push(`Email: ${contact.email}`)
            if (contactInfo.length > 0) {
              doc.text(contactInfo.join(' | '), margin + 5, y)
              y += 6
            }
          })
        }
      }
      
      if (venture.multimedia && venture.multimedia.length > 0) {
        y += 5
        sectionTitle('MULTIMEDIA')
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(0, 0, 0)
        venture.multimedia.forEach(item => {
          if (y > pageHeight - 30) {
            doc.addPage()
            y = margin + 10
          }
          const sizeMB = ((item.size || 0) / 1024 / 1024).toFixed(2)
          doc.text(`• ${item.name} (${sizeMB} MB)`, margin, y)
          y += 6
        })
      }
      
      if (venture.plans && venture.plans.length > 0) {
        y += 5
        sectionTitle('PLANOS Y DOCUMENTOS')
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(0, 0, 0)
        venture.plans.forEach(item => {
          if (y > pageHeight - 30) {
            doc.addPage()
            y = margin + 10
          }
          const sizeMB = ((item.size || 0) / 1024 / 1024).toFixed(2)
          const uploadDate = item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString('es-ES') : 'N/A'
          doc.text(`• ${item.name} (${sizeMB} MB) - ${uploadDate}`, margin, y)
          y += 6
        })
      }
      
      doc.setFillColor(56, 228, 122)
      doc.rect(margin, pageHeight - 15, contentWidth, 10, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.text('CRM Urbany - Sistema de Gestión de Emprendimientos', pageWidth / 2, pageHeight - 9, { align: 'center' })
    })
    
    doc.save(`reporte_emprendimientos_${timestamp}.pdf`)
  },

  async loadJsPDF() {
    return new Promise((resolve, reject) => {
      if (window.jspdf) {
        resolve()
        return
      }
      
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load jsPDF'))
      document.head.appendChild(script)
    })
  },
  
  async getVentureById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const venture = ventures.find(v => v.id === id)
    if (!venture) {
      throw new Error('Emprendimiento no encontrado')
    }
    return venture
  },
  
  async addVenture(ventureData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newVenture = {
      id: `venture-${Date.now()}`,
      title: ventureData.title || '',
      location: ventureData.location || '',
      description: ventureData.description || '',
      stage: ventureData.stage || 'En construcción',
      deliveryDate: ventureData.deliveryDate || '',
      administrator: ventureData.administrator || '',
      imageUrl: ventureData.imageUrl || '',
      whatsapp: ventureData.whatsapp || '',
      multimedia: ventureData.multimedia || [],
      plans: ventureData.plans || [],
      diffusion: ventureData.diffusion || {
        description: '',
        highlights: [],
        socialMedia: { facebook: '', instagram: '', twitter: '' }
      },
      privateInfo: ventureData.privateInfo || {
        notes: '',
        internalContacts: []
      },
      characteristics: ventureData.characteristics || {
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
      amenities: ventureData.amenities || {
        runningWater: false,
        heating: false,
        boiler: false,
        boxDeposit: false,
        custom: []
      },
      createdAt: new Date().toISOString()
    }
    ventures.push(newVenture)
    return newVenture
  },
  
  async updateVenture(ventureData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = ventures.findIndex(v => v.id === ventureData.id)
    if (index !== -1) {
      ventures[index] = { ...ventures[index], ...ventureData, updatedAt: new Date().toISOString() }
      return ventures[index]
    }
    throw new Error('Emprendimiento no encontrado')
  },
  
  async deleteVenture(ventureId) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = ventures.findIndex(v => v.id === ventureId)
    if (index !== -1) {
      ventures.splice(index, 1)
      return true
    }
    throw new Error('Emprendimiento no encontrado')
  },

  async deleteMultipleVentures(ventureIds) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const initialLength = ventures.length
    ventureIds.forEach(id => {
      const index = ventures.findIndex(v => v.id === id)
      if (index !== -1) {
        ventures.splice(index, 1)
      }
    })
    return initialLength - ventures.length
  }
}

