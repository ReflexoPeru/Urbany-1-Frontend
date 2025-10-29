import { deals, summaryByStage } from '../../../mock/business'

export const businessService = {
  async getDeals(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let filteredDeals = [...deals]
    
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim()
      filteredDeals = filteredDeals.filter(deal => 
        deal.name.toLowerCase().includes(searchTerm) ||
        deal.contact.phone.includes(searchTerm) ||
        deal.contact.email.toLowerCase().includes(searchTerm) ||
        deal.property.address.toLowerCase().includes(searchTerm) ||
        deal.property.operation.toLowerCase().includes(searchTerm) ||
        deal.property.status.toLowerCase().includes(searchTerm) ||
        deal.stage.toLowerCase().includes(searchTerm) ||
        deal.agent.toLowerCase().includes(searchTerm) ||
        deal.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }
    
    if (filters.stage && filters.stage !== 'Todos') {
      filteredDeals = filteredDeals.filter(deal => deal.stage === filters.stage)
    }
    
    if (filters.agent && filters.agent !== 'Todos') {
      filteredDeals = filteredDeals.filter(deal => deal.agent === filters.agent)
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filteredDeals = filteredDeals.filter(deal => 
        filters.tags.some(tag => deal.tags.includes(tag))
      )
    }
    
    if (filters.status && filters.status !== 'Todos') {
      filteredDeals = filteredDeals.filter(deal => deal.property.status === filters.status)
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 5
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      deals: filteredDeals.slice(startIndex, endIndex),
      total: filteredDeals.length,
      page,
      totalPages: Math.ceil(filteredDeals.length / limit)
    }
  },
  
  async getSummaryByStage() {
    await new Promise(resolve => setTimeout(resolve, 100))
    const allStages = ['Nuevo Negocio', 'Contactado', 'Visita Programada', 'En Negociación', 'Frío']
    const stageCounts = {}
    
    allStages.forEach(stage => {
      stageCounts[stage] = 0
    })
    
    deals.forEach(deal => {
      if (stageCounts.hasOwnProperty(deal.stage)) {
        stageCounts[deal.stage]++
      }
    })
    
    return Object.entries(stageCounts).map(([stage, count]) => ({
      stage,
      count
    }))
  },
  
  async getAgents() {
    await new Promise(resolve => setTimeout(resolve, 100))
    const agents = [...new Set(deals.map(deal => deal.agent))]
    return agents.map(agent => ({ value: agent, label: agent }))
  },
  
  async getTags() {
    await new Promise(resolve => setTimeout(resolve, 100))
    const allTags = deals.flatMap(deal => deal.tags)
    const uniqueTags = [...new Set(allTags)]
    return uniqueTags.map(tag => ({ value: tag, label: tag }))
  },
  
  async exportDeals(format = 'csv', dateRange = 'all') {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredDeals = [...deals]
    
    if (dateRange !== 'all') {
      filteredDeals = this.filterDealsByDateRange(deals, dateRange)
    }
    
    const headers = ['Nombre', 'Teléfono', 'Email', 'Operación', 'Estado', 'Dirección', 'Fecha', 'Etapa', 'Agente']
    const data = filteredDeals.map(deal => [
      deal.name || '',
      deal.contact?.phone || '',
      deal.contact?.email || '',
      deal.property?.operation || '',
      deal.property?.status || '',
      deal.property?.address || '',
      deal.date ? new Date(deal.date).toLocaleDateString('es-ES') : '',
      deal.stage || '',
      deal.agent || ''
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

  filterDealsByDateRange(deals, dateRange) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch (dateRange) {
      case 'today':
        return deals.filter(deal => {
          const dealDate = new Date(deal.date)
          return dealDate >= today && dealDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
        })
      
      case 'week':
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 7)
        return deals.filter(deal => {
          const dealDate = new Date(deal.date)
          return dealDate >= weekStart && dealDate < weekEnd
        })
      
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        return deals.filter(deal => {
          const dealDate = new Date(deal.date)
          return dealDate >= monthStart && dealDate < monthEnd
        })
      
      default:
        return deals
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
    link.download = `negocios_${timestamp}.csv`
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
    link.download = `negocios_${timestamp}.xls`
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
    
    const doc = new jsPDF('landscape')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const tableWidth = pageWidth - 2 * margin
    
    const colWidths = [30, 25, 30, 25, 20, 35, 20, 20, 20]
    const totalWidth = colWidths.reduce((sum, width) => sum + width, 0)
    const scale = tableWidth / totalWidth
    const scaledWidths = colWidths.map(width => width * scale)
    
    let y = 20
    
    doc.setFillColor(59, 130, 246)
    doc.rect(margin, y - 5, tableWidth, 15, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('REPORTE DE NEGOCIOS', pageWidth / 2, y + 3, { align: 'center' })
    
    y += 20
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, margin, y)
    doc.text(`Total de registros: ${data.length}`, pageWidth - margin - 50, y)
    
    y += 15
    
    doc.setFillColor(243, 244, 246)
    doc.rect(margin, y - 3, tableWidth, 10, 'F')
    
    doc.setTextColor(55, 65, 81)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    
    let x = margin
    headers.forEach((header, index) => {
      const cellWidth = scaledWidths[index]
      doc.text(header, x + 2, y + 2)
      x += cellWidth
    })
    
    y += 12
    
    doc.setDrawColor(209, 213, 219)
    doc.setLineWidth(0.5)
    doc.line(margin, y, pageWidth - margin, y)
    
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    
    data.forEach((row, rowIndex) => {
      if (y > pageHeight - 25) {
        doc.addPage('landscape')
        y = 20
      }
      
      const isEven = rowIndex % 2 === 0
      if (isEven) {
        doc.setFillColor(249, 250, 251)
        doc.rect(margin, y - 2, tableWidth, 8, 'F')
      }
      
      let x = margin
      row.forEach((cell, colIndex) => {
        const cellWidth = scaledWidths[colIndex]
        const cellText = String(cell || '').substring(0, 20)
        doc.text(cellText, x + 2, y + 2)
        x += cellWidth
      })
      
      y += 8
      
      if (rowIndex < data.length - 1) {
        doc.setDrawColor(229, 231, 235)
        doc.setLineWidth(0.2)
        doc.line(margin, y, pageWidth - margin, y)
      }
    })
    
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(1)
    doc.rect(margin, 20, tableWidth, y - 20)
    
    doc.save(`negocios_${timestamp}.pdf`)
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

  async addDeal(dealData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newDeal = {
      id: `deal-${Date.now()}`,
      ...dealData,
      date: dealData.date || new Date().toISOString().split('T')[0]
    }
    deals.push(newDeal)
    return newDeal
  },

  async updateDeal(dealData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = deals.findIndex(deal => deal.id === dealData.id)
    if (index !== -1) {
      deals[index] = { ...deals[index], ...dealData }
      return deals[index]
    }
    throw new Error('Deal not found')
  },

  async deleteDeal(dealId) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = deals.findIndex(deal => deal.id === dealId)
    if (index !== -1) {
      deals.splice(index, 1)
      return true
    }
    throw new Error('Deal not found')
  },

  async deleteMultipleDeals(dealIds) {
    await new Promise(resolve => setTimeout(resolve, 300))
    dealIds.forEach(dealId => {
      const index = deals.findIndex(deal => deal.id === dealId)
      if (index !== -1) {
        deals.splice(index, 1)
      }
    })
    return true
  }
}
