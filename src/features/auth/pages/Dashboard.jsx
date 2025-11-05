import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeCookie, getCookie } from '../../../utils/cookieUtility'

const Dashboard = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState();

    // Cargar información del usuario al montar el componente
    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleLogout = () => {
        // Limpiar toda la información de la sesión (cookies)
        removeCookie('token')
        removeCookie('refresh_token')
        removeCookie('user_id')
        // También limpiar localStorage si existe información del usuario
        localStorage.removeItem('user')
        navigate('/login')
    }


    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard - CRM Urbany</h1>

            {/* Mostrar informción del usuario si existe */}
            {user && (
                <div style={{
                    background: '#f8f9fa',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    border: '1px'
                }}>
                    <h2 style={{ marginTop: 0, color: '#2de0a1' }}>¡Sesión activa!</h2>
                    <p><strong>Usuario:</strong> {user.name} </p>
                    <p><strong>Email:</strong> {user.email} </p>
                    <p><strong>ID:</strong> {user.id} </p>
                    <p><strong>Token:</strong> {user.token ? '✅ Activo' : '❌ Inactivo'} </p>
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
                        cursor: 'pointer'
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
    )
}

export default Dashboard