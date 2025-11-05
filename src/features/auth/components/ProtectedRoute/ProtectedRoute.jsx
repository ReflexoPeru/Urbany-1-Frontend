import { Navigate } from 'react-router-dom'
import { getCookie } from '../../../../utils/cookieUtility'

const ProtectedRoute = ({ children }) => {
    // Verificar si hay token en cookies (sesión activa)
    const token = getCookie('token');

    // Si no hay token, redirigir al login
    if (!token) {
        return <Navigate to="/login" replace />
    }

    // Si hay token, mostrar el componente children (Dashboard)
    return children;
};

export default ProtectedRoute;