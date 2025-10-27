import React from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Home, 
  Users, 
  FileText, 
  PenTool, 
  Circle,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import styles from './ActivityList.module.css';

const iconMap = {
  Agente: <User size={18} />,
  Llamada: <Phone size={18} />,
  'Correo electrónico': <Mail size={18} />,
  Visita: <Home size={18} />,
  Reunión: <Users size={18} />,
  Tasación: <FileText size={18} />,
  'Firma de contrato': <PenTool size={18} />,
  Otro: <Circle size={18} />
};

const statusMap = {
  pending: { icon: <Clock size={16} />, label: 'Por hacer', color: 'pending' },
  in_progress: { icon: <AlertCircle size={16} />, label: 'En progreso', color: 'in_progress' },
  completed: { icon: <CheckCircle size={16} />, label: 'Completada', color: 'completed' },
  cancelled: { icon: <X size={16} />, label: 'Cancelada', color: 'cancelled' }
};

const priorityMap = {
  low: { label: 'Baja', color: 'low' },
  medium: { label: 'Media', color: 'medium' },
  high: { label: 'Alta', color: 'high' }
};

const ActivityList = ({ activities, onEdit, onDelete, onStatusChange }) => {
  if (!activities || activities.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString || 'Sin hora';
  };

  const handleStatusChange = (activity, newStatus) => {
    onStatusChange(activity.id, newStatus);
  };


  return (
    <div className={styles.activityList}>
      {activities.map((activity) => (
        <div key={activity.id} className={styles.activityItem}>
          <div className={styles.activityIcon}>
            {iconMap[activity.type] || <Circle size={18} />}
          </div>
          
          <div className={styles.activityContent}>
            <div className={styles.activityHeader}>
              <div className={styles.activityInfo}>
                <span className={styles.activityType}>{activity.type}</span>
                <h3 className={styles.activityTitle}>{activity.title}</h3>
              </div>
              
              <div className={styles.activityMeta}>
                <span className={styles.activityDate}>
                  {formatDate(activity.date)}
                </span>
                <span className={styles.activityTime}>
                  {formatTime(activity.time)}
                </span>
              </div>
            </div>
            
            <p className={styles.activityDescription}>{activity.description}</p>
            
            <div className={styles.activityFooter}>
              <div className={styles.activityTags}>
                <span className={`${styles.statusTag} ${styles[statusMap[activity.status]?.color]}`}>
                  {statusMap[activity.status]?.icon}
                  {statusMap[activity.status]?.label}
                </span>
                
                <span className={`${styles.priorityTag} ${styles[priorityMap[activity.priority]?.color]}`}>
                  {priorityMap[activity.priority]?.label}
                </span>
              </div>
              
              <div className={styles.activityActions}>
                <button 
                  className={styles.actionButton}
                  onClick={() => onEdit(activity)}
                  title="Editar actividad"
                >
                  <Edit size={16} />
                </button>
                
                <button 
                  className={styles.actionButton}
                  onClick={() => onDelete(activity)}
                  title="Eliminar actividad"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;