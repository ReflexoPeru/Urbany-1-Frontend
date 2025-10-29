import React, { useState, useEffect } from 'react'
import { X, Calendar, Clock, MapPin, User } from 'lucide-react'
import styles from './CalendarModal.module.css'

const CalendarModal = ({ isOpen, onClose, deals = [], onViewDeal }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    if (isOpen && deals.length > 0) {
      const todayEvents = getEventsForDate(selectedDate)
      setEvents(todayEvents)
    }
  }, [isOpen, deals, selectedDate])

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getEventsForDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`
    
    const events = deals
      .filter(deal => {
        if (!deal.date) return false
        return deal.date === dateStr
      })
      .map(deal => {
        const dealDate = new Date(deal.date)
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const eventDate = new Date(dealDate.getFullYear(), dealDate.getMonth(), dealDate.getDate())
        
        let status = 'nuevo'
        if (eventDate < today) {
          status = 'atrasado'
        } else if (eventDate.getTime() === today.getTime()) {
          status = 'pendiente'
        }
        
        return {
          id: deal.id,
          title: `${deal.stage} - ${deal.name}`,
          time: dealDate.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          address: deal.property?.address || 'Sin dirección',
          agent: deal.agent,
          status: status,
          deal: deal
        }
      })
      .sort((a, b) => {
        const timeA = a.time.replace(/[^\d:]/g, '')
        const timeB = b.time.replace(/[^\d:]/g, '')
        return timeA.localeCompare(timeB)
      })
    
    return events
  }

  const handleDateChange = (e) => {
    const inputDate = e.target.value
    const [year, month, day] = inputDate.split('-').map(Number)
    const newSelectedDate = new Date(year, month - 1, day)
    setSelectedDate(newSelectedDate)
    
    const newEvents = getEventsForDate(newSelectedDate)
    setEvents(newEvents)
  }

  const handleEventClick = (event) => {
    if (onViewDeal && event.deal) {
      onViewDeal(event.deal)
    }
  }

  const todayEvents = events

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Calendar className={styles.titleIcon} size={24} />
            <h2 className={styles.title}>Calendario de Negocios</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.dateSelector}>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className={styles.dateInput}
            />
            <h3 className={styles.selectedDate}>{formatDate(selectedDate)}</h3>
          </div>

          <div className={styles.eventsSection}>
            <h4 className={styles.eventsTitle}>
              Eventos del día
              {todayEvents.length > 0 && (
                <span className={styles.eventCount}>({todayEvents.length})</span>
              )}
            </h4>
            {todayEvents.length > 0 ? (
              <div className={styles.eventsList}>
                {todayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`${styles.eventCard} ${styles[event.status]}`}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className={styles.eventHeader}>
                      <h5 className={styles.eventTitle}>{event.title}</h5>
                      <div className={styles.eventTimeStatus}>
                        <span className={styles.eventTime}>
                          <Clock size={14} />
                          {event.time}
                        </span>
                        <span className={`${styles.eventStatus} ${styles[event.status]}`}>
                          {event.status === 'atrasado' ? 'Atrasado' : 
                           event.status === 'pendiente' ? 'Pendiente' : 'Nuevo'}
                        </span>
                      </div>
                    </div>
                    <div className={styles.eventDetails}>
                      <div className={styles.eventDetail}>
                        <MapPin size={14} />
                        <span>{event.address}</span>
                      </div>
                      <div className={styles.eventDetail}>
                        <User size={14} />
                        <span>{event.agent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noEvents}>
                <Calendar size={48} className={styles.noEventsIcon} />
                <p>No hay eventos programados para este día</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.button} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarModal
