import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { User, Lock, Bell, Monitor } from 'phosphor-react';
import styles from './ConfiguracionLayout.module.css';

const ConfiguracionLayout = () => {
    const tabs = [
        { id: 'perfil', label: 'Mi Perfil', icon: User, path: '/configuracion/perfil' },
        { id: 'password', label: 'Cambiar contraseña', icon: Lock, path: '/configuracion/password' },
        { id: 'notifications', label: 'Notificaciones', icon: Bell, path: '/configuracion/notificaciones' },
        { id: 'sessions', label: 'Sesiones activas', icon: Monitor, path: '/configuracion/sesiones' }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* 🔹 Tabs de navegación */}
                <div className={styles.tabs}>
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <NavLink
                                key={tab.id}
                                to={tab.path}
                                className={({ isActive }) =>
                                    `${styles.tab} ${isActive ? styles.active : ''}`
                                }
                            >
                                <IconComponent size={18} />
                                {tab.label}
                            </NavLink>
                        );
                    })}
                </div>

                {/* 🔹 Contenido de las páginas hijas */}
                <Outlet />
            </div>
        </div>
    );
};

export default ConfiguracionLayout;
