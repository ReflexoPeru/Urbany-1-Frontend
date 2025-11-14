import React, { useMemo, useState, useEffect } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import Button from '../../../components/ui/Button';
import { Select } from '../../../components/common/Select';
import ConfirmModal from '../../../components/ui/Modal/ConfirmModal';
import { useToast } from '../../../contexts/ToastContext';
import { userRoles, userStatuses } from '../../../mock/users';
import { UsersTable, UserFormModal, UserDetailsModal, ResetPasswordModal } from '../components';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, useChangePassword } from '../hooks/userHooks';
import styles from './UsersPage.module.css';

const roleFilterOptions = [{ value: 'all', label: 'Todos los roles' }, ...userRoles];
const statusFilterOptions = [{ value: 'all', label: 'Todos los estados' }, ...userStatuses];

const UsersPage = () => {
    const [page] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState(roleFilterOptions[0]);
    const [statusFilter, setStatusFilter] = useState(statusFilterOptions[0]);

    const { users, loading, error, pagination, refetch } = useUsers({ 
        page, 
        search: searchQuery, 
        pageSize: 20 
    });
    const { create } = useCreateUser();
    const { update } = useUpdateUser();
    const { remove } = useDeleteUser();
    const { changePassword } = useChangePassword();

    const [formModalOpen, setFormModalOpen] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [userEditing, setUserEditing] = useState(null);

    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [userSelected, setUserSelected] = useState(null);

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);
    const [userToToggle, setUserToToggle] = useState(null);
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [userToReset, setUserToReset] = useState(null);

    const { toast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesRole = roleFilter.value === 'all' ? true : user.role === roleFilter.value;
            const matchesStatus = statusFilter.value === 'all' ? true : user.status === statusFilter.value;
            return matchesRole && matchesStatus;
        });
    }, [users, roleFilter, statusFilter]);

    const handleInviteUser = () => {
        setFormMode('create');
        setUserEditing(null);
        setFormModalOpen(true);
    };

    const handleEditUser = (user) => {
        setFormMode('edit');
        setUserEditing(user);
        setFormModalOpen(true);
    };

    const handleToggleStatus = (user) => {
        setUserToToggle(user);
        setStatusConfirmOpen(true);
    };

    const handleViewUser = (user) => {
        setUserSelected(user);
        setDetailsModalOpen(true);
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setConfirmModalOpen(true);
    };

    const handleOpenReset = (user) => {
        setUserToReset(user);
        setResetModalOpen(true);
    };

    const handleSubmitForm = async (payload) => {
        try {
            if (formMode === 'create') {
                await create(payload);
                toast.success('Invitación enviada', 'El usuario recibirá un correo para activar su cuenta.');
            } else if (userEditing) {
                await update(userEditing.id, payload, true);
                toast.success('Usuario actualizado', 'Los cambios se guardaron correctamente.');
            }
            setFormModalOpen(false);
            refetch();
        } catch (err) {
            toast.error('Error', err.message || 'No se pudo completar la operación.');
        }
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await remove(userToDelete.id);
            toast.success('Usuario eliminado', 'El usuario fue removido del equipo.');
            setConfirmModalOpen(false);
            setUserToDelete(null);
            refetch();
        } catch (err) {
            toast.error('Error', err.message || 'No se pudo eliminar el usuario.');
        }
    };

    const handleConfirmToggleStatus = async () => {
        if (!userToToggle) return;
        try {
            const nextStatus = userToToggle.status === 'active' ? 'inactive' : 'active';
            await update(userToToggle.id, { status: nextStatus }, true);
            const message = userToToggle.status === 'active'
                ? 'Se suspendió el acceso del usuario.'
                : 'El usuario puede acceder nuevamente.';
            toast.info('Estado actualizado', message);
            setStatusConfirmOpen(false);
            setUserToToggle(null);
            refetch();
        } catch (err) {
            toast.error('Error', err.message || 'No se pudo actualizar el estado.');
        }
    };

    const handleConfirmReset = async () => {
        if (!userToReset) return;
        try {
            await changePassword(userToReset.id, { 
                send_reset_email: true 
            });

            const resetLink = `https://urbany.app/reset/${userToReset.id}`;
            if (navigator?.clipboard?.writeText) {
                try {
                    await navigator.clipboard.writeText(resetLink);
                } catch (error) {
                    console.warn('No se pudo copiar el link al portapapeles', error);
                }
            }

            toast.success('Correo enviado', 'Se envió el enlace y se copió al portapapeles.');
            setResetModalOpen(false);
            setUserToReset(null);
        } catch (err) {
            toast.error('Error', err.message || 'No se pudo enviar el correo de restablecimiento.');
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageContent}>
                <header className={styles.header}>
                    <div className={styles.headerText}>

                    </div>

                    <Button variant="primary" size="medium" icon="plus" onClick={handleInviteUser}>
                        Invitar a un usuario
                    </Button>
                </header>

                <section className={styles.filtersCard}>
                    <div className={styles.filtersRow}>
                        <div className={styles.searchBox}>
                            <MagnifyingGlass size={18} weight="bold" className={styles.searchIcon} />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Filtrar por nombre, email o teléfono"
                                className={styles.searchInput}
                                aria-label="Buscar usuarios"
                            />
                        </div>

                        <Select
                            options={roleFilterOptions}
                            value={roleFilter}
                            onChange={(option) => setRoleFilter(option || roleFilterOptions[0])}
                            placeholder="Todos los roles"
                            isClearable={false}
                            className={styles.selectControl}
                        />

                        <Select
                            options={statusFilterOptions}
                            value={statusFilter}
                            onChange={(option) => setStatusFilter(option || statusFilterOptions[0])}
                            placeholder="Todos los estados"
                            isClearable={false}
                            className={styles.selectControl}
                        />
                    </div>
                </section>

                <section className={styles.tableSection}>
                    {loading ? (
                        <div className={styles.loadingState}>Cargando usuarios...</div>
                    ) : error ? (
                        <div className={styles.errorState}>Error: {error}</div>
                    ) : (
                        <UsersTable
                            data={filteredUsers}
                            onToggleStatus={handleToggleStatus}
                            onEdit={handleEditUser}
                            onView={handleViewUser}
                            onDelete={handleDeleteUser}
                            onReset={handleOpenReset}
                        />
                    )}
                </section>
            </div>

            <UserFormModal
                isOpen={formModalOpen}
                onClose={() => setFormModalOpen(false)}
                onSubmit={handleSubmitForm}
                initialData={userEditing}
                mode={formMode}
            />

            <UserDetailsModal
                isOpen={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                user={userSelected}
            />

            <ConfirmModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar usuario"
                message={
                    userToDelete
                        ? `¿Estás seguro de eliminar a ${userToDelete.name}? Perderá el acceso al sistema.`
                        : ''
                }
                type="danger"
                confirmText="Eliminar"
            />

            <ConfirmModal
                isOpen={statusConfirmOpen}
                onClose={() => setStatusConfirmOpen(false)}
                onConfirm={handleConfirmToggleStatus}
                title={userToToggle?.status === 'active' ? 'Suspender acceso' : 'Reactivar usuario'}
                message={
                    userToToggle?.status === 'active'
                        ? 'El usuario no podrá iniciar sesión hasta que lo actives nuevamente.'
                        : 'El usuario recibirá un correo para ingresar nuevamente.'
                }
                type={userToToggle?.status === 'active' ? 'warning' : 'success'}
                confirmText={userToToggle?.status === 'active' ? 'Suspender' : 'Reactivar'}
            />

            <ResetPasswordModal
                isOpen={resetModalOpen}
                onClose={() => {
                    setResetModalOpen(false);
                    setUserToReset(null);
                }}
                onConfirm={handleConfirmReset}
                user={userToReset}
            />
        </div>
    );
};

export default UsersPage;

