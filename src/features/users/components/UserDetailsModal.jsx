import React from 'react';
import { EnvelopeSimple, Phone, UsersThree, X } from 'phosphor-react';
import UserRoleBadge from './UserRoleBadge';
import UserStatusBadge from './UserStatusBadge';
import styles from './UserDetailsModal.module.css';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.userSummary}>
                        <div className={styles.avatar}>{user.name?.charAt(0) ?? '?'}</div>
                        <div>
                            <h2 className={styles.name}>{user.name}</h2>
                            <div className={styles.badges}>
                                <UserRoleBadge role={user.role} />
                                <UserStatusBadge status={user.status} />
                            </div>
                        </div>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        <X size={20} weight="bold" />
                    </button>
                </header>

                <div className={styles.content}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailIcon}>
                            <EnvelopeSimple size={18} weight="bold" />
                        </span>
                        <div>
                            <p className={styles.label}>Correo electrónico</p>
                            <p className={styles.value}>{user.email}</p>
                        </div>
                    </div>

                    {user.phone && (
                        <div className={styles.detailRow}>
                            <span className={styles.detailIcon}>
                                <Phone size={18} weight="bold" />
                            </span>
                            <div>
                                <p className={styles.label}>Teléfono</p>
                                <p className={styles.value}>{user.phone}</p>
                            </div>
                        </div>
                    )}

                    {user.teams?.length > 0 && (
                        <div className={styles.detailRow}>
                            <span className={styles.detailIcon}>
                                <UsersThree size={18} weight="bold" />
                            </span>
                            <div>
                                <p className={styles.label}>Equipos asignados</p>
                                <p className={styles.value}>{user.teams.join(', ')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;

