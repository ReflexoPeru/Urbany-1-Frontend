import { CheckCircle, Clock, WarningCircle } from 'phosphor-react'
import styles from './NetworkSelector.module.css'

const formatSyncLabel = (value) => {
    if (!value) {
        return 'Sin sincronizar'
    }

    try {
        const date = new Date(value)
        return date.toLocaleString('es-CO', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        })
    } catch (error) {
        return 'Sincronización desconocida'
    }
}

const getStatusIcon = (status = 'connected') => {
    switch (status) {
        case 'connected':
            return <CheckCircle size={16} weight="fill" />
        case 'pending':
            return <Clock size={16} weight="fill" />
        default:
            return <WarningCircle size={16} weight="fill" />
    }
}

const getStatusLabel = (status = 'connected') => {
    switch (status) {
        case 'connected':
            return 'Conectada'
        case 'pending':
            return 'Pendiente'
        default:
            return 'Sin conexión'
    }
}

const getInitials = (name = '') => {
    return name
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
}

const NetworkSelector = ({ networks = [], selectedId, onSelect }) => {
    if (!networks.length) {
        return null
    }

    return (
        <div className={styles.wrapper}>
            {networks.map((network) => {
                const isActive = network.id === selectedId
                const initials = getInitials(network.name)
                const syncLabel = formatSyncLabel(network.lastSync)

                return (
                    <button
                        type="button"
                        key={network.id}
                        className={`${styles.card} ${isActive ? styles.active : ''}`}
                        onClick={() => onSelect?.(network.id)}
                    >
                        <div className={styles.header}>
                            <div className={styles.avatar} style={{ background: network.tagColor }}>
                                {initials}
                            </div>
                            <div className={styles.titleBlock}>
                                <span className={styles.name}>{network.name}</span>
                                <span className={styles.description}>{network.description}</span>
                            </div>
                            <span className={styles.badge}>{network.propertiesCount ?? network.badgeText}</span>
                        </div>

                        <div className={styles.statsRow}>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>Propiedades</span>
                                <span className={styles.statValue}>{network.propertiesCount}</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>Mis propiedades</span>
                                <span className={styles.statValue}>{network.mineCount}</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>Favoritas</span>
                                <span className={styles.statValue}>{network.favoriteCount}</span>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <span className={`${styles.status} ${styles[`status-${network.connectionStatus}`]}`}>
                                {getStatusIcon(network.connectionStatus)}
                                {getStatusLabel(network.connectionStatus)}
                            </span>
                            <span className={styles.syncLabel}>Última sync: {syncLabel}</span>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

export default NetworkSelector













