import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    // Varificar si hay token en localStorage (sesión activa)
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir al login
    if (!token) {
        return <Navigate to="/login" replace />
    }

    // Si hay token, mostrar el componente children (Dashboard)
    return children;
};

export default ProtectedRoute;