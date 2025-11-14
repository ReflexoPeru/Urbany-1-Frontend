import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../contexts/ToastContext';
import { useLoading } from '../../../contexts/LoadingContext';
import { logout, getUserData } from '../../../services/auth';

const Dashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const [user, setUser] = useState(null);

    // Cargar información del usuario al montar el componente
    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleLogout = async () => {
        try {
            showLoading("Cerrando sesión...");
            await logout();

            toast.success(
                "Sesión cerrada",
                "Has cerrado sesión correctamente",
                3000,
                "SignOut"
            );

            // Redirigir al login después de un breve delay
            setTimeout(() => {
                navigate('/login');
            }, 500);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            toast.error(
                "Error",
                "Hubo un problema al cerrar sesión",
                3000,
                "WarningCircle"
            );
            // Aún así redirigir al login
            navigate('/login');
        } finally {
            hideLoading();
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard - CRM Urbany</h1>

            {/* Mostrar información del usuario si existe */}
            {user && (
                <div style={{
                    background: '#f8f9fa',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    border: '1px solid #dee2e6'
                }}>
                    <h2 style={{ marginTop: 0, color: '#2de0a1' }}>¡Sesión activa!</h2>
                    <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>ID:</strong> {user.id}</p>
                </div>
            )}

            <div style={{ marginTop: '2rem' }}>
                <h3>Opciones</h3>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#dc3535',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Debug: Mostrar datos completos */}
            {user && (
                <details style={{ marginTop: '2rem', background: '#fff3cd', padding: '1rem', borderRadius: '4px' }}>
                    <summary style={{ cursor: 'pointer' }}>🔍 Ver datos completos del usuario</summary>
                    <pre style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </details>
            )}
        </div>
    );
};

export default Dashboard;
