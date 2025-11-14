import React, { useMemo, useState } from 'react';
import {
    DotsThreeOutline,
    EnvelopeSimple,
    Lock,
    LockOpen,
    PencilSimple,
    Trash,
} from 'phosphor-react';
import Pagination from '../../../components/common/Pagination';
import UserRoleBadge from './UserRoleBadge';
import UserStatusBadge from './UserStatusBadge';
import styles from './UsersTable.module.css';

const ITEMS_PER_PAGE = 8;

const getInitials = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();

const formatDate = (value) => {
    if (!value) return 'Sin ingreso';
    const date = new Date(value);
    return `${date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })} · ${date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;
};

const normalizeUsers = (users) =>
    users.map((user, index) => ({
        ...user,
        __rowId: user?.id ?? `user-${index}`,
    }));

const UsersTable = ({
    data = [],
    onToggleStatus,
    onEdit,
    onView,
    onDelete,
    onReset,
}) => {
    const rows = useMemo(() => normalizeUsers(data), [data]);
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

    const paginatedRows = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [rows, currentPage]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.surface}>
                <div className={styles.table} role="table">
                    <div className={styles.headerRow} role="row">
                        <div className={`${styles.headerCell} ${styles.userColumn}`} role="columnheader">
                            Usuario
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Rol
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Estado
                        </div>
                        <div className={styles.headerCell} role="columnheader">
                            Último acceso
                        </div>
                        <div className={`${styles.headerCell} ${styles.actionsColumn}`} role="columnheader">
                            Acciones
                        </div>
                    </div>

                    <div className={styles.body} role="rowgroup">
                        {paginatedRows.length === 0 ? (
                            <div className={styles.emptyRow} role="row">
                                <p>No hay usuarios que coincidan con los filtros.</p>
                            </div>
                        ) : (
                            paginatedRows.map((user) => {
                                const isActive = user.status === 'active';
                                return (
                                    <div key={user.__rowId} className={styles.bodyRow} role="row">
                                        <div className={`${styles.cell} ${styles.userCell}`} role="cell">
                                            <div className={styles.avatarWrapper} aria-hidden>
                                                <div className={`${styles.avatar} ${isActive ? styles.avatarActive : styles.avatarInactive}`}>
                                                    {getInitials(user.name)}
                                                </div>
                                            </div>
                                        <div
                                            className={styles.userInfo}
                                            role={onView ? 'button' : undefined}
                                            tabIndex={onView ? 0 : undefined}
                                            onClick={() => onView?.(user)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' || event.key === ' ') {
                                                    event.preventDefault();
                                                    onView?.(user);
                                                }
                                            }}
                                        >
                                                <span className={styles.userName}>{user.name}</span>
                                                <span className={styles.userEmail}>
                                                    <EnvelopeSimple size={14} weight="bold" />
                                                    {user.email}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`${styles.cell} ${styles.roleCell}`} role="cell">
                                            <UserRoleBadge role={user.role} />
                                        </div>

                                        <div className={`${styles.cell} ${styles.statusCell}`} role="cell">
                                            <UserStatusBadge status={user.status} />
                                        </div>

                                        <div className={`${styles.cell} ${styles.dateCell}`} role="cell">
                                            {formatDate(user.lastLogin)}
                                        </div>

                                        <div className={`${styles.cell} ${styles.actionsCell}`} role="cell">
                                            <button
                                                type="button"
                                                className={styles.actionButton}
                                                onClick={() => onToggleStatus?.(user)}
                                                title={isActive ? 'Suspender acceso' : 'Activar acceso'}
                                            >
                                                {isActive ? <Lock size={18} weight="bold" /> : <LockOpen size={18} weight="bold" />}
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.actionButton}
                                                onClick={() => onEdit?.(user)}
                                                title="Editar usuario"
                                            >
                                                <PencilSimple size={18} weight="bold" />
                                            </button>
                                            <button
                                                type="button"
                                                className={`${styles.actionButton} ${styles.danger}`}
                                                onClick={() => onDelete?.(user)}
                                                title="Eliminar usuario"
                                            >
                                                <Trash size={18} weight="bold" />
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.actionButton}
                                                onClick={() => onReset?.(user)}
                                                title="Restablecer contraseña"
                                            >
                                                <DotsThreeOutline size={18} weight="bold" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className={styles.paginationRow}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onPageChange={setCurrentPage}
                            showInfo
                            showPageNumbers
                            maxVisiblePages={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;

