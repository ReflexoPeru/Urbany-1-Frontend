import React, { useEffect, useMemo, useState } from 'react';
import { Plus, PencilSimple, X } from 'phosphor-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Select } from '../../../components/common/Select';
import { userRoles, userStatuses } from '../../../mock/users';
import styles from './UserFormModal.module.css';

const defaultForm = {
    name: '',
    email: '',
    role: userRoles[0],
    status: userStatuses[0],
};

const UserFormModal = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            const roleOption = userRoles.find((option) => option.value === initialData?.role) || userRoles[0];
            const statusOption = userStatuses.find((option) => option.value === initialData?.status) || userStatuses[0];

            if (initialData) {
                setFormData({
                    name: initialData.name || '',
                    email: initialData.email || '',
                    role: roleOption,
                    status: statusOption,
                });
            } else {
                setFormData({ ...defaultForm, role: userRoles[0], status: userStatuses[0] });
            }
            setErrors({});
        }
    }, [initialData, isOpen]);

    const title = useMemo(() => (mode === 'edit' ? 'Editar usuario' : 'Invitar a un usuario'), [mode]);
    const Icon = mode === 'edit' ? PencilSimple : Plus;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (option) => {
        setFormData((prev) => ({
            ...prev,
            role: option,
        }));
    };

    const handleStatusChange = (option) => {
        setFormData((prev) => ({
            ...prev,
            status: option,
        }));
    };

    const validate = () => {
        const validationErrors = {};
        if (!formData.name.trim()) {
            validationErrors.name = 'El nombre es obligatorio';
        }
        if (!formData.email.trim()) {
            validationErrors.email = 'El correo es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            validationErrors.email = 'Ingresa un correo válido';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            role: formData.role.value,
            status: formData.status.value,
        };

        onSubmit?.(payload);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.titleGroup}>
                        <div className={styles.iconBadge}>
                            <Icon size={20} weight="bold" />
                        </div>
                        <div>
                            <h2 className={styles.title}>{title}</h2>
                            <p className={styles.subtitle}>
                                Completa los datos para {mode === 'edit' ? 'actualizar' : 'invitar'} a la persona.
                            </p>
                        </div>
                    </div>
                    <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                        <X size={20} weight="bold" />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fieldGroup}>
                        <Input
                            label="Nombre completo"
                            placeholder="Ej. Ana Rodríguez"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            error={errors.name}
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <Input
                            label="Correo electrónico"
                            placeholder="usuario@tuempresa.com"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            error={errors.email}
                        />
                    </div>

                    <div className={styles.gridTwoCols}>
                        <Select
                            label="Rol en la organización"
                            options={userRoles}
                            value={formData.role}
                            onChange={handleRoleChange}
                            placeholder="Seleccionar rol"
                            isClearable={false}
                            className={styles.selectControl}
                        />

                        <Select
                            label="Estado inicial"
                            options={userStatuses}
                            value={formData.status}
                            onChange={handleStatusChange}
                            placeholder="Seleccionar estado"
                            isClearable={false}
                            className={styles.selectControl}
                        />
                    </div>

                    <footer className={styles.footer}>
                        <Button variant="secondary" type="button" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {mode === 'edit' ? 'Guardar cambios' : 'Enviar invitación'}
                        </Button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;

