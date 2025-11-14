import { useState, useEffect, useCallback } from 'react'
import { venturesService } from '../services/venturesService'

export const useVentures = () => {
  const [ventures, setVentures] = useState([])
  const [summary, setSummary] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    stage: 'En construcción',
    tag: 'Todos',
    page: 1,
    limit: 5
  })
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1
  })

  const loadVentures = useCallback(async () => {
    setLoading(true)
    try {
      const result = await venturesService.getVentures(filters)
      setVentures(result.ventures)
      setPagination({
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      })
    } catch (error) {
      console.error('Error loading ventures:', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  const loadSummary = useCallback(async () => {
    try {
      const result = await venturesService.getSummaryByStage()
      setSummary(result)
    } catch (error) {
      console.error('Error loading summary:', error)
    }
  }, [])

  const loadTags = useCallback(async () => {
    try {
      const result = await venturesService.getTags()
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

  const exportVentures = useCallback(async (format = 'csv', dateRange = 'all') => {
    try {
      await venturesService.exportVentures(format, dateRange)
    } catch (error) {
      console.error('Error exporting ventures:', error)
    }
  }, [])

  const addVenture = useCallback(async (ventureData) => {
    try {
      setLoading(true)
      const newVenture = await venturesService.addVenture(ventureData)
      await loadVentures()
      await loadSummary()
      return newVenture
    } catch (error) {
      console.error('Error adding venture:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadVentures, loadSummary])

  const updateVenture = useCallback(async (ventureData) => {
    try {
      setLoading(true)
      const updatedVenture = await venturesService.updateVenture(ventureData)
      await loadVentures()
      await loadSummary()
      return updatedVenture
    } catch (error) {
      console.error('Error updating venture:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadVentures, loadSummary])

  const deleteVenture = useCallback(async (ventureId) => {
    try {
      setLoading(true)
      await venturesService.deleteVenture(ventureId)
      await loadVentures()
      await loadSummary()
    } catch (error) {
      console.error('Error deleting venture:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadVentures, loadSummary])

  const deleteMultipleVentures = useCallback(async (ventureIds) => {
    try {
      setLoading(true)
      await venturesService.deleteMultipleVentures(ventureIds)
      await loadVentures()
      await loadSummary()
    } catch (error) {
      console.error('Error deleting ventures:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [loadVentures, loadSummary])

  useEffect(() => {
    loadVentures()
  }, [loadVentures])

  useEffect(() => {
    loadSummary()
    loadTags()
  }, [loadSummary, loadTags])

  return {
    ventures,
    summary,
    tags,
    loading,
    filters,
    pagination,
    updateFilters,
    changePage,
    exportVentures,
    addVenture,
    updateVenture,
    deleteVenture,
    deleteMultipleVentures
  }
}

