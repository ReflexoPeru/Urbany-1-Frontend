import { useState, useEffect, useCallback } from 'react'
import { businessService } from '../services/businessService'

export const useBusiness = () => {
  const [deals, setDeals] = useState([])
  const [summary, setSummary] = useState([])
  const [agents, setAgents] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    stage: 'Nuevo Negocio',
    agent: 'Todos',
    tags: [],
    page: 1,
    limit: 5
  })
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1
  })

  const loadDeals = useCallback(async () => {
    setLoading(true)
    try {
      const result = await businessService.getDeals(filters)
      setDeals(result.deals)
      setPagination({
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      })
    } catch (error) {
      console.error('Error loading deals:', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  const loadSummary = useCallback(async () => {
    try {
      const result = await businessService.getSummaryByStage()
      setSummary(result)
    } catch (error) {
      console.error('Error loading summary:', error)
    }
  }, [])

  const loadAgents = useCallback(async () => {
    try {
      const result = await businessService.getAgents()
      setAgents(result)
    } catch (error) {
      console.error('Error loading agents:', error)
    }
  }, [])

  const loadTags = useCallback(async () => {
    try {
      const result = await businessService.getTags()
      setTags(result)
    } catch (error) {
      console.error('Error loading tags:', error)
    }
  }, [])

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
    }))
  }, [])

  const changePage = useCallback((page) => {
    setFilters(prev => ({
      ...prev,
      page
    }))
  }, [])

  const exportDeals = useCallback(async (format = 'csv', dateRange = 'all') => {
    try {
      await businessService.exportDeals(format, dateRange)
    } catch (error) {
      console.error('Error exporting deals:', error)
    }
  }, [])

  const addDeal = useCallback(async (dealData) => {
    try {
      setLoading(true)
      const newDeal = await businessService.addDeal(dealData)
      setDeals(prev => [newDeal, ...prev])
      await loadDeals()
      await loadSummary()
    } catch (error) {
      console.error('Error adding deal:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadDeals, loadSummary])

  const updateDeal = useCallback(async (dealData) => {
    try {
      setLoading(true)
      const updatedDeal = await businessService.updateDeal(dealData)
      setDeals(prev => prev.map(deal => deal.id === dealData.id ? updatedDeal : deal))
      await loadDeals()
      await loadSummary()
    } catch (error) {
      console.error('Error updating deal:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadDeals, loadSummary])

  const deleteDeal = useCallback(async (dealId) => {
    try {
      setLoading(true)
      await businessService.deleteDeal(dealId)
      setDeals(prev => prev.filter(deal => deal.id !== dealId))
      await loadDeals()
      await loadSummary()
    } catch (error) {
      console.error('Error deleting deal:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadDeals, loadSummary])

  const deleteMultipleDeals = useCallback(async (dealIds) => {
    try {
      setLoading(true)
      await businessService.deleteMultipleDeals(dealIds)
      setDeals(prev => prev.filter(deal => !dealIds.includes(deal.id)))
      await loadDeals()
      await loadSummary()
    } catch (error) {
      console.error('Error deleting deals:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadDeals, loadSummary])

  useEffect(() => {
    loadDeals()
  }, [loadDeals])

  useEffect(() => {
    loadSummary()
    loadAgents()
    loadTags()
  }, [loadSummary, loadAgents, loadTags])

  return {
    deals,
    summary,
    agents,
    tags,
    loading,
    filters,
    pagination,
    updateFilters,
    changePage,
    exportDeals,
    addDeal,
    updateDeal,
    deleteDeal,
    deleteMultipleDeals
  }
}
