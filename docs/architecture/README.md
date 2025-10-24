# 🏗️ Arquitectura de Urbany

## Visión General

Urbany utiliza una arquitectura moderna basada en React con un enfoque **feature-based** que permite escalabilidad y mantenibilidad del código.

## 🎯 Principios de Diseño

### 1. **Feature-Based Architecture**
- Organización por funcionalidades de negocio
- Separación clara de responsabilidades
- Facilita el trabajo en equipo
- Permite escalabilidad horizontal

### 2. **Component-Driven Development**
- Componentes reutilizables y modulares
- Diseño atómico (atoms → molecules → organisms)
- Fácil testing y mantenimiento

### 3. **Separation of Concerns**
- UI separada de la lógica de negocio
- Servicios para comunicación con APIs
- Hooks para lógica reutilizable

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes globales reutilizables
│   ├── ui/                 # Componentes básicos (Button, Input, etc.)
│   ├── layout/             # Componentes de layout (Header, Sidebar)
│   ├── forms/              # Formularios reutilizables
│   ├── charts/             # Gráficos y visualizaciones
│   └── common/             # Componentes comunes (Pagination, etc.)
├── features/               # Módulos funcionales
│   ├── auth/               # Autenticación
│   ├── properties/         # Gestión de propiedades
│   ├── deals/              # Seguimiento de negocios
│   └── ...                 # Otros features
├── pages/                  # Páginas especiales (404, error, etc.)
├── layouts/                # Layouts de la aplicación
├── hooks/                  # Custom hooks globales
├── services/               # Servicios y APIs
├── store/                  # Estado global
├── utils/                  # Utilidades y helpers
├── constants/              # Constantes de la aplicación
├── types/                  # Tipos TypeScript
├── assets/                 # Recursos estáticos
└── styles/                 # Estilos globales
```

## 🔄 Flujo de Datos

### 1. **Componentes**
- Consumen hooks y servicios
- Manejan UI y eventos del usuario
- No contienen lógica de negocio

### 2. **Hooks**
- Manejan estado local del componente
- Contienen lógica reutilizable
- Se conectan con servicios

### 3. **Servicios**
- Comunicación con APIs
- Transformación de datos
- Manejo de errores

### 4. **Store (Estado Global)**
- Estado compartido entre componentes
- Manejo de autenticación
- Cache de datos

## 🎨 Patrones de Diseño

### 1. **Container/Presentational Pattern**
```jsx
// Container (lógica)
const PropertiesContainer = () => {
  const { properties, loading } = useProperties();
  
  return <PropertiesList properties={properties} loading={loading} />;
};

// Presentational (UI)
const PropertiesList = ({ properties, loading }) => {
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
```

### 2. **Custom Hooks Pattern**
```jsx
// Hook personalizado
const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await propertiesService.getAll();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return { properties, loading, fetchProperties };
};
```

### 3. **Service Layer Pattern**
```jsx
// Servicio
export const propertiesService = {
  getAll: async () => {
    const response = await api.get('/properties');
    return response.data;
  },
  
  create: async (property) => {
    const response = await api.post('/properties', property);
    return response.data;
  },
  
  update: async (id, property) => {
    const response = await api.put(`/properties/${id}`, property);
    return response.data;
  },
  
  delete: async (id) => {
    await api.delete(`/properties/${id}`);
  }
};
```

## 🔧 Tecnologías y Herramientas

### **Frontend Core**
- **React 19.1.1**: Biblioteca de UI
- **Vite 7.1.7**: Herramienta de build
- **CSS Modules**: Estilos modulares

### **Desarrollo**
- **ESLint**: Linting de código
- **Stylelint**: Linting de estilos
- **Prettier**: Formateo de código

### **Futuras Integraciones**
- **TypeScript**: Tipado estático
- **React Query**: Manejo de estado del servidor
- **React Hook Form**: Manejo de formularios
- **React Router**: Navegación

## 📐 Convenciones de Código

### **Nomenclatura**
- **Componentes**: PascalCase (`UserProfile.jsx`)
- **Archivos CSS**: PascalCase con `.module.css`
- **Hooks**: camelCase con prefijo `use` (`useUserProfile`)
- **Servicios**: camelCase con sufijo `Service` (`userService`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### **Estructura de Archivos**
```
Feature/
├── components/           # Componentes específicos del feature
├── pages/               # Páginas del feature
├── hooks/               # Hooks específicos del feature
├── services/            # Servicios específicos del feature
└── index.js             # Export principal del feature
```

### **CSS Modules**
```css
/* Component.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
}
```

```jsx
// Component.jsx
import styles from './Component.module.css';

const Component = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Título</h1>
  </div>
);
```

## 🚀 Escalabilidad

### **Horizontal**
- Nuevos features como módulos independientes
- Componentes reutilizables en la carpeta global
- Servicios modulares

### **Vertical**
- Hooks personalizados para lógica compleja
- Servicios especializados
- Store global para estado compartido

## 🔒 Seguridad

### **Frontend**
- Validación de formularios
- Sanitización de inputs
- Manejo seguro de tokens
- HTTPS en producción

### **Autenticación**
- JWT tokens
- Refresh tokens
- Logout automático
- Rutas protegidas

## 📊 Performance

### **Optimizaciones**
- Lazy loading de componentes
- Code splitting por features
- Memoización de componentes
- Optimización de imágenes

### **Monitoreo**
- Bundle analyzer
- Performance metrics
- Error tracking
- User analytics

## 🔮 Futuras Mejoras

### **Corto Plazo**
- Implementar TypeScript
- Agregar React Query
- Mejorar testing
- Optimizar bundle size

### **Mediano Plazo**
- PWA capabilities
- Offline support
- Real-time updates
- Advanced caching

### **Largo Plazo**
- Micro-frontends
- Server-side rendering
- Advanced analytics
- AI integration

---

Esta arquitectura está diseñada para crecer con el proyecto y adaptarse a las necesidades del negocio inmobiliario.
