import React from 'react';
import Tag from '../../../components/ui/Tag';

const ROLE_VARIANTS = {
    Admin: { variant: 'success', label: 'Admin' },
    Gestor: { variant: 'primary', label: 'Gestor' },
    Agente: { variant: 'info', label: 'Agente' },
};

const UserRoleBadge = ({ role }) => {
    const { variant, label } = ROLE_VARIANTS[role] || {
        variant: 'secondary',
        label: role,
    };

    return (
        <Tag variant={variant} size="small">
            {label}
        </Tag>
    );
};

export default UserRoleBadge;

