import { useCallback, useEffect, useMemo, useState } from 'react'
import { mockNetworks, mockNetworkProperties, initialNetworkFilters } from '../../../mock/networks'

const parsePriceRange = (value) => {
    if (!value) {
        return null
    }

    if (value.endsWith('+')) {
        return {
            min: Number.parseInt(value.replace('+', ''), 10) || 0,
            max: null
        }
    }

    const [minRaw, maxRaw] = value.split('-')
    return {
        min: Number.parseInt(minRaw, 10) || 0,
        max: Number.parseInt(maxRaw, 10) || null
    }
}

const normalizeText = (value) => value?.toString().trim().toLowerCase() ?? ''

const useNetworks = () => {
    const [networks, setNetworks] = useState(mockNetworks)
    const [properties, setProperties] = useState(mockNetworkProperties)
    const [selectedNetworkId, setSelectedNetworkId] = useState(mockNetworks[0]?.id ?? null)
    const [searchTerm, setSearchTerm] = useState('')
    const [includeMineOnly, setIncludeMineOnlyState] = useState(false)
    const [showFavoritesOnly, setShowFavoritesOnlyState] = useState(false)
    const [filters, setFilters] = useState(initialNetworkFilters)
    const [sortOption, setSortOption] = useState('recent')
    const [selectedPropertyIds, setSelectedPropertyIds] = useState([])

    const statsByNetwork = useMemo(() => {
        return properties.reduce((accumulator, property) => {
            const current = accumulator[property.networkId] ?? {
                total: 0,
                mine: 0,
                favorites: 0
            }

            current.total += 1
            if (property.isMine) {
                current.mine += 1
            }
            if (property.isFavorite) {
                current.favorites += 1
            }

            accumulator[property.networkId] = current
            return accumulator
        }, {})
    }, [properties])

    const networkSummaries = useMemo(() => (
        networks.map((network) => {
            const stats = statsByNetwork[network.id] ?? { total: 0, mine: 0, favorites: 0 }
            return {
                ...network,
                propertiesCount: stats.total,
                mineCount: stats.mine,
                favoriteCount: stats.favorites
            }
        })
    ), [networks, statsByNetwork])

    const selectedNetwork = useMemo(
        () => networkSummaries.find((network) => network.id === selectedNetworkId) ?? null,
        [networkSummaries, selectedNetworkId]
    )

    const scopedProperties = useMemo(
        () => properties.filter((property) => property.networkId === selectedNetworkId),
        [properties, selectedNetworkId]
    )

    const filteredProperties = useMemo(() => {
        const range = parsePriceRange(filters.priceRange)
        const bedroomsFilter = filters.bedrooms ? Number.parseInt(filters.bedrooms, 10) : null
        const commissionFilter = filters.commission ? Number.parseInt(filters.commission, 10) : null
        const searchValue = normalizeText(searchTerm)
        const locationFilter = normalizeText(filters.location)
        const realEstateFilter = normalizeText(filters.realEstate)

        return scopedProperties.filter((property) => {
            if (includeMineOnly && !property.isMine) {
                return false
            }

            if (showFavoritesOnly && !property.isFavorite) {
                return false
            }

            if (searchValue) {
                const haystack = [property.address, property.code, property.city, property.neighborhood]
                    .filter(Boolean)
                    .map((value) => normalizeText(value))

                const matchesSearch = haystack.some((value) => value.includes(searchValue))
                if (!matchesSearch) {
                    return false
                }
            }

            if (filters.operation && property.operation !== filters.operation) {
                return false
            }

            if (filters.propertyType && property.propertyType !== filters.propertyType) {
                return false
            }

            if (range) {
                const { min, max } = range
                if (min !== null && property.price < min) {
                    return false
                }
                if (max !== null && property.price > max) {
                    return false
                }
            }

            if (locationFilter) {
                const cityMatch = normalizeText(property.city).includes(locationFilter)
                const neighborhoodMatch = normalizeText(property.neighborhood).includes(locationFilter)
                if (!cityMatch && !neighborhoodMatch) {
                    return false
                }
            }

            if (bedroomsFilter !== null && Number(property.bedrooms ?? 0) < bedroomsFilter) {
                return false
            }

            if (commissionFilter !== null && Number(property.commission ?? 0) !== commissionFilter) {
                return false
            }

            if (realEstateFilter) {
                const realEstateName = normalizeText(property.realEstate?.name)
                if (!realEstateName.includes(realEstateFilter)) {
                    return false
                }
            }

            if (filters.coverage && property.coverage !== filters.coverage) {
                return false
            }

            if (filters.quality) {
                const minQuality = Number.parseInt(filters.quality, 10) || 0
                if (Number(property.quality ?? 0) < minQuality) {
                    return false
                }
            }

            return true
        })
    }, [filters, includeMineOnly, scopedProperties, searchTerm, showFavoritesOnly])

    const sortedProperties = useMemo(() => {
        const list = [...filteredProperties]

        switch (sortOption) {
            case 'higherPrice':
                list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
                break
            case 'lowerPrice':
                list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
                break
            case 'recent':
            default:
                list.sort((a, b) => {
                    const dateA = new Date(a.publishedAt ?? 0).getTime()
                    const dateB = new Date(b.publishedAt ?? 0).getTime()
                    return dateB - dateA
                })
                break
        }

        return list
    }, [filteredProperties, sortOption])

    useEffect(() => {
        setSelectedPropertyIds((previous) => previous.filter((id) => filteredProperties.some((property) => property.id === id)))
    }, [filteredProperties])

    const filterOptions = useMemo(() => {
        const unique = (values) => Array.from(new Set(values.filter(Boolean)))
        const scoped = scopedProperties

        const operations = unique(scoped.map((property) => property.operation))
        const propertyTypes = unique(scoped.map((property) => property.propertyType))
        const locations = unique(scoped.map((property) => `${property.city} | ${property.neighborhood}`))
        const bedrooms = unique(scoped.map((property) => Number(property.bedrooms ?? 0))).sort((a, b) => a - b)
        const commissions = unique(scoped.map((property) => Number(property.commission ?? 0))).sort((a, b) => a - b)
        const realEstates = unique(scoped.map((property) => property.realEstate?.name))

        return {
            operations: operations.map((value) => ({ value, label: value })),
            propertyTypes: propertyTypes.map((value) => ({ value, label: value })),
            locations: locations.map((value) => ({ value, label: value.replace('|', '·') })),
            bedrooms: bedrooms.map((value) => ({ value: String(value), label: `${value}+ dorm.` })),
            commissions: commissions.map((value) => ({ value: String(value), label: `${value}%` })),
            realEstates: realEstates.map((value) => ({ value, label: value })),
            coverages: unique(scoped.map((property) => property.coverage)).map((value) => ({ value, label: value }))
        }
    }, [scopedProperties])

    const selectNetwork = useCallback((networkId) => {
        setSelectedNetworkId(networkId)
        setSelectedPropertyIds([])
    }, [])

    const updateFilter = useCallback((key, value) => {
        setFilters((previous) => ({
            ...previous,
            [key]: value || null
        }))
    }, [])

    const clearFilters = useCallback(() => {
        setFilters(initialNetworkFilters)
        setIncludeMineOnlyState(false)
        setShowFavoritesOnlyState(false)
    }, [])

    const toggleIncludeMineOnly = useCallback(() => {
        setIncludeMineOnlyState((previous) => !previous)
    }, [])

    const toggleFavoritesOnly = useCallback(() => {
        setShowFavoritesOnlyState((previous) => !previous)
    }, [])

    const selectProperties = useCallback((ids) => {
        setSelectedPropertyIds(ids)
    }, [])

    const selectAllFiltered = useCallback(() => {
        setSelectedPropertyIds(filteredProperties.map((property) => property.id))
    }, [filteredProperties])

    const clearSelection = useCallback(() => {
        setSelectedPropertyIds([])
    }, [])

    const togglePropertyFavorite = useCallback((propertyId) => {
        setProperties((previous) => previous.map((property) => (
            property.id === propertyId
                ? { ...property, isFavorite: !property.isFavorite }
                : property
        )))
    }, [])

    const removePropertiesFromNetwork = useCallback((ids) => {
        if (!ids?.length) {
            return
        }

        setProperties((previous) => previous.filter((property) => !ids.includes(property.id)))
        setSelectedPropertyIds((previous) => previous.filter((id) => !ids.includes(id)))
    }, [])

    const createNetwork = useCallback((payload) => {
        const id = payload?.id ?? `network-${Date.now()}`
        const newNetwork = {
            id,
            name: payload?.name?.trim() || 'Nueva red',
            description: payload?.description?.trim() || 'Red inmobiliaria personalizada.',
            tagColor: payload?.tagColor || '#1d4ed8',
            badgeText: '0',
            connectionStatus: payload?.connectionStatus || 'draft',
            lastSync: new Date().toISOString()
        }

        setNetworks((previous) => [newNetwork, ...previous])
        setSelectedNetworkId(id)
        return newNetwork
    }, [])

    const updateNetworkSyncTimestamp = useCallback((networkId) => {
        setNetworks((previous) => previous.map((network) => (
            network.id === networkId
                ? { ...network, lastSync: new Date().toISOString() }
                : network
        )))
    }, [])

    const selectionStats = useMemo(() => {
        const selected = sortedProperties.filter((property) => selectedPropertyIds.includes(property.id))
        return {
            total: sortedProperties.length,
            selectedCount: selectedPropertyIds.length,
            mineCount: sortedProperties.filter((property) => property.isMine).length,
            favoritesCount: sortedProperties.filter((property) => property.isFavorite).length,
            selectedMineCount: selected.filter((property) => property.isMine).length
        }
    }, [selectedPropertyIds, sortedProperties])

    return {
        networks: networkSummaries,
        selectedNetwork,
        selectedNetworkId,
        selectNetwork,
        searchTerm,
        setSearchTerm,
        includeMineOnly,
        toggleIncludeMineOnly,
        setIncludeMineOnly: setIncludeMineOnlyState,
        showFavoritesOnly,
        toggleFavoritesOnly,
        setShowFavoritesOnly: setShowFavoritesOnlyState,
        filters,
        updateFilter,
        clearFilters,
        filterOptions,
        sortOption,
        setSortOption,
        properties: sortedProperties,
        rawProperties: scopedProperties,
        selectedPropertyIds,
        selectProperties,
        selectAllFiltered,
        clearSelection,
        togglePropertyFavorite,
        removePropertiesFromNetwork,
        createNetwork,
        updateNetworkSyncTimestamp,
        selectionStats
    }
}

export default useNetworks


