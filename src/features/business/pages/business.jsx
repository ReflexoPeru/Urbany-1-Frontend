import React from 'react'
import { deals, summaryByStage } from '../../../mock/business'
import styles from './Business.module.css'
import { DownloadSimple, Plus, CalendarBlank, MagnifyingGlass, CaretDown } from '@phosphor-icons/react'

const formatDate = (iso) => {
  const [year, month, day] = iso.split('-')
  const d = new Date(year, month - 1, day)

  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

const StageTabs = () => (
  <div className={styles['tabs-container']}>
    {summaryByStage.map((s, idx) => (
      <div key={s.stage} className={styles['tab-group']}>
        <div className={`${styles['tab-item']} ${idx === 0 ? styles.active : ''}`}>
          {s.stage} ({s.count})
        </div>
        <div className={`${styles.counter} ${idx === 0 ? styles['counter-first'] : ''}`}>{s.count}</div>
      </div>
    ))}
  </div>
)

const Business = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Negocios</h2>
        <button className={styles['add-button']}>Agregar nuevo negocio</button>
      </div>

      <h3 className={styles['section-title']}>Estado del Negocio</h3>
      <StageTabs />

      <div className={styles.search}>
        <div className={styles['search-box']}>
          <MagnifyingGlass className={styles['search-icon']} weight="bold" />
          <input
            placeholder="Buscar por nombre, correo electrónico, teléfono y propiedad"
            className={styles['search-input']}
            type="text"
          />
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles['chip-group']}>
          <button className={styles.chip}>
            Agente <CaretDown size={14} weight="bold" className={styles['chip-icon']} />
          </button>
          <button className={styles.chip}>
            Negocios Abiertos <CaretDown size={14} weight="bold" className={styles['chip-icon']} />
          </button>
          <button className={styles.chip}>
            Etiquetas <CaretDown size={14} weight="bold" className={styles['chip-icon']} />
          </button>
          <button className={styles.chip}>
            Todos <CaretDown size={14} weight="bold" className={styles['chip-icon']} />
          </button>
        </div>
        <div className={styles['icon-group']}>
          <button className={styles['icon-btn']} aria-label="Descargar"><DownloadSimple weight="bold" /></button>
          <button className={styles['icon-btn']} aria-label="Agregar"><Plus weight="bold" /></button>
          <button className={styles['icon-btn']} aria-label="Calendario"><CalendarBlank weight="bold" /></button>
        </div>
      </div>

      <div className={styles['table-wrap']}>
        <table className={styles.table}>
          <thead>
            <tr className={styles['thead-row']}>
              <th className={styles.th1}></th>
              <th className={styles.th2}>Nombre</th>
              <th className={styles.th3}>Contacto</th>
              <th className={styles.th4}>Propiedad</th>
              <th className={styles.th5}>Fecha</th>
              <th className={styles.th6}></th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className={styles.row}>
                <td className={styles.td}>
                  <input type="checkbox" className={styles.checkbox} />
                </td>
                <td className={styles.td}>
                  <div className={styles['cell-name']}>
                    <span className={styles.muted}>{deal.name}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles['contact-lines']}>
                    <span className={styles.label}>Teléfono:</span>
                    <span className={styles['muted-small']}>{deal.contact.phone}</span>
                    <span className={styles.label}>Correo electrónico:</span>
                    <span className={styles['muted-small']}>{deal.contact.email}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.success}>{deal.property.operation}, {deal.property.status}</div>
                  <div className={styles['muted-small']}>{deal.property.address}</div>
                </td>
                <td className={`${styles.td} ${styles.date}`}>{formatDate(deal.date)}</td>
                <td className={`${styles.td} ${styles.link}`}>Ver</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles['page-btn']}>{'<'}</button>
        <div className={styles['page-current']}>1</div>
        <button className={styles['page-btn']}>{'>'}</button>
      </div>
    </div>
  )
}

export default Business


