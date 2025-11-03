import React from 'react';
import Tag from '../../../components/ui/Tag';

const STATUS_VARIANTS = {
    active: { variant: 'success', label: 'Activo' },
    invited: { variant: 'info', label: 'Invitado' },
    inactive: { variant: 'warning', label: 'Inactivo' },
};

const UserStatusBadge = ({ status }) => {
    const normalized = status?.toLowerCase();
    const { variant, label } = STATUS_VARIANTS[normalized] || {
        variant: 'secondary',
        label: status,
    };

    return (
        <Tag variant={variant} size="small">
            {label}
        </Tag>
    );
};

export default UserStatusBadge;

