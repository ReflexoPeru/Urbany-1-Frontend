import { CalendarBlank, Hash, Phone, EnvelopeSimple, UsersThree, Gauge } from 'phosphor-react'
import styles from './NetworkDetailsModal.module.css'

const formatRelative = (date) => {
    if (!date) return 'Sin sincronizar'
    const target = new Date(date).getTime()
    if (Number.isNaN(target)) return 'Sin sincronizar'

    const diffMs = target - Date.now()
    const diffMinutes = Math.round(diffMs / (1000 * 60))
    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

    if (Math.abs(diffMinutes) < 60) {
        return rtf.format(diffMinutes, 'minute')
    }

    const diffHours = Math.round(diffMinutes / 60)
    if (Math.abs(diffHours) < 24) {
        return rtf.format(diffHours, 'hour')
    }

    const diffDays = Math.round(diffHours / 24)
    return rtf.format(diffDays, 'day')
}

const NetworkDetailsModal = ({ isOpen, network, onClose }) => {
    if (!isOpen || !network) {
        return null
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <span className={styles.badge} style={{ background: network.tagColor }}>{network.badgeText ?? '0'}</span>
                        <div>
                            <h2 className={styles.title}>{network.name}</h2>
                            <p className={styles.subtitle}>{network.description || 'Sin descripción registrada.'}</p>
                        </div>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        ✕
                    </button>
                </header>

                <section className={styles.grid}>
                    <div className={styles.card}>
                        <h3>Estado de conexión</h3>
                        <div className={styles.statusRow}>
                            <span className={`${styles.statusIndicator} ${styles[`status-${network.connectionStatus}`]}`} />
                            <span className={styles.statusLabel}>
                                {network.connectionStatus === 'connected' && 'Activa'}
                                {network.connectionStatus === 'pending' && 'Pendiente'}
                                {network.connectionStatus === 'draft' && 'Borrador'}
                            </span>
                        </div>
                        <p className={styles.muted}>
                            <CalendarBlank size={16} weight="bold" />
                            Última sincronización {formatRelative(network.lastSync)}
                        </p>
                        <p className={styles.muted}>
                            <Gauge size={16} weight="bold" />
                            Frecuencia: {network.syncFrequency || 'Manual'}
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>Contacto principal</h3>
                        <p className={styles.value}>{network.contactName || 'Sin asignar'}</p>
                        <p className={styles.muted}>
                            <EnvelopeSimple size={16} weight="bold" />
                            {network.contactEmail || 'Sin correo'}
                        </p>
                        <p className={styles.muted}>
                            <Phone size={16} weight="bold" />
                            {network.contactPhone || 'Sin teléfono'}
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>Comisión y reglas</h3>
                        <p className={styles.value}>
                            {network.defaultCommission !== null && network.defaultCommission !== undefined
                                ? `${network.defaultCommission}%`
                                : 'No definida'}
                        </p>
                        <p className={styles.muted}>{network.sharePolicy || 'Define las condiciones de compartición para tus aliados.'}</p>
                    </div>

                    <div className={styles.card}>
                        <h3>Resumen de propiedades</h3>
                        <ul className={styles.summaryList}>
                            <li>
                                <UsersThree size={16} weight="bold" />
                                Total: {network.propertiesCount ?? 0}
                            </li>
                            <li>
                                <Hash size={16} weight="bold" />
                                Mi inventario: {network.mineCount ?? 0}
                            </li>
                            <li>
                                <Hash size={16} weight="bold" />
                                Favoritas: {network.favoriteCount ?? 0}
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default NetworkDetailsModal

