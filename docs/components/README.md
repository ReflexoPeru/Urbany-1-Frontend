# 🎨 Componentes de Urbany

## 📋 Descripción

Esta documentación describe el sistema de componentes del CRM Inmobiliario Urbany. Todos los componentes están diseñados para ser reutilizables, mantenibles y escalables, utilizando **CSS Modules** para el manejo de estilos.

## 🏗️ Arquitectura de Componentes

### **Organización por Categorías**
Los componentes están organizados en categorías específicas para facilitar su uso y mantenimiento:

```
src/components/
├── ui/                    # Componentes básicos de UI
├── layout/                # Componentes de layout
├── forms/                 # Formularios reutilizables
├── charts/                # Gráficos y visualizaciones
└── common/                # Componentes comunes
```

## 🧱 Componentes UI Básicos

### **Button** - Botón Reutilizable
Componente de botón con múltiples variantes y tamaños.

**Características:**
- Variantes: primary, secondary, danger, success
- Tamaños: small, medium, large
- Estados: normal, disabled, loading
- Accesibilidad completa

**Ejemplo de uso:**
```jsx
import Button from '@/components/ui/Button/Button';

<Button variant="primary" size="large">
  Ingresar
</Button>
```

### **Input** - Campo de Entrada
Componente de entrada de texto con validación integrada.

**Características:**
- Tipos: text, email, password, number
- Validación en tiempo real
- Estados de error y éxito
- Labels y placeholders
- Campos requeridos

**Ejemplo de uso:**
```jsx
import Input from '@/components/ui/Input/Input';

<Input
  type="email"
  label="Email"
  placeholder="Ingresa tu email"
  required
  error={emailError}
/>
```

### **Card** - Contenedor de Contenido
Contenedor flexible para organizar información.

**Características:**
- Header, Body y Footer opcionales
- Sombras y bordes personalizables
- Responsive design
- Accesibilidad integrada

**Ejemplo de uso:**
```jsx
import Card from '@/components/ui/Card/Card';

<Card>
  <Card.Header>
    <h3>Título</h3>
  </Card.Header>
  <Card.Body>
    <p>Contenido</p>
  </Card.Body>
</Card>
```

### **Modal** - Diálogo Modal
Modal reutilizable para diálogos y formularios.

**Características:**
- Tamaños: small, medium, large, fullscreen
- Cierre automático y manual
- Overlay personalizable
- Accesibilidad completa

**Ejemplo de uso:**
```jsx
import Modal from '@/components/ui/Modal/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirmar acción"
  size="medium"
>
  <p>¿Estás seguro?</p>
</Modal>
```

### **Select** - Selector Desplegable
Selector con búsqueda y múltiples opciones.

**Características:**
- Búsqueda integrada
- Selección múltiple
- Opciones personalizables
- Estados de carga

**Ejemplo de uso:**
```jsx
import Select from '@/components/ui/Select/Select';

<Select
  options={propertyTypes}
  value={selectedType}
  onChange={setSelectedType}
  searchable
  placeholder="Selecciona tipo"
/>
```

### **LoadingSpinner** - Indicador de Carga
Componente para mostrar estados de carga.

**Características:**
- Animaciones suaves
- Mensajes personalizables
- Tamaños variables
- Accesibilidad

**Ejemplo de uso:**
```jsx
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';

<LoadingSpinner message="Cargando propiedades..." />
```

### **Badge** - Etiqueta de Estado
Etiqueta para mostrar estados o categorías.

**Características:**
- Variantes: success, warning, danger, info
- Tamaños personalizables
- Colores semánticos

**Ejemplo de uso:**
```jsx
import Badge from '@/components/ui/Badge/Badge';

<Badge variant="success">Activo</Badge>
```

### **Tag** - Etiqueta de Filtro
Etiqueta para filtros y categorías.

**Características:**
- Cierre opcional
- Variantes: filled, outline
- Colores personalizables

**Ejemplo de uso:**
```jsx
import Tag from '@/components/ui/Tag/Tag';

<Tag closable onClose={removeTag}>
  Apartamento
</Tag>
```

## 🏗️ Componentes de Layout

### **Header** - Encabezado Principal
Encabezado de la aplicación con navegación y usuario.

**Características:**
- Menú de usuario
- Notificaciones
- Navegación principal
- Responsive design

### **Sidebar** - Barra Lateral
Navegación lateral colapsable.

**Características:**
- Menú colapsable
- Navegación jerárquica
- Estados activos
- Responsive

### **Footer** - Pie de Página
Pie de página con información de la empresa.

**Características:**
- Enlaces útiles
- Información legal
- Redes sociales
- Responsive

## 📝 Componentes de Formularios

### **SearchForm** - Formulario de Búsqueda
Formulario especializado para búsquedas.

**Características:**
- Filtros integrados
- Búsqueda en tiempo real
- Historial de búsquedas
- Resultados destacados

### **FilterPanel** - Panel de Filtros
Panel lateral para filtros avanzados.

**Características:**
- Filtros múltiples
- Reset de filtros
- Persistencia de estado
- Responsive

### **ImageUpload** - Subida de Imágenes
Componente para subir múltiples imágenes.

**Características:**
- Drag & drop
- Vista previa
- Validación de tipos
- Límites de tamaño

## 📊 Componentes de Gráficos

### **LineChart** - Gráfico de Líneas
Gráfico para mostrar tendencias temporales.

**Características:**
- Múltiples series
- Zoom y pan
- Tooltips informativos
- Responsive

### **BarChart** - Gráfico de Barras
Gráfico para comparaciones.

**Características:**
- Orientación horizontal/vertical
- Múltiples categorías
- Colores personalizables
- Animaciones

### **PieChart** - Gráfico Circular
Gráfico para mostrar proporciones.

**Características:**
- Porcentajes automáticos
- Leyenda integrada
- Colores semánticos
- Interactividad

### **Map** - Mapa de Propiedades
Mapa interactivo para mostrar propiedades.

**Características:**
- Marcadores personalizados
- Clustering automático
- Filtros por zona
- Información detallada

## 🔧 Componentes Comunes

### **Breadcrumb** - Navegación de Migas
Navegación jerárquica de páginas.

**Características:**
- Separadores personalizables
- Enlaces activos
- Responsive
- Accesibilidad

### **Pagination** - Paginación
Paginación para listas largas.

**Características:**
- Navegación intuitiva
- Información de página
- Saltos rápidos
- Responsive

### **DataTable** - Tabla de Datos
Tabla avanzada con funcionalidades.

**Características:**
- Ordenamiento
- Filtrado
- Selección múltiple
- Paginación integrada

### **StatusIndicator** - Indicador de Estado
Indicador visual de estados.

**Características:**
- Colores semánticos
- Animaciones
- Tamaños variables
- Accesibilidad

## 🎨 Sistema de Estilos

### **CSS Modules**
Todos los componentes utilizan CSS Modules para evitar conflictos de estilos:

```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
}
```

### **Variables CSS Globales**
Variables consistentes en toda la aplicación:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --border-radius: 4px;
  --border-radius-lg: 8px;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## 🧪 Testing

### **Estructura de Tests**
Cada componente incluye sus tests correspondientes:

```
components/
├── Button/
│   ├── Button.jsx
│   ├── Button.module.css
│   ├── Button.test.jsx
│   └── index.js
```

### **Ejemplo de Test**
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📚 Documentación de Props

Cada componente documenta sus props de manera clara:

```jsx
/**
 * Button component for user interactions
 * @param {Object} props
 * @param {string} props.variant - Button style variant ('primary' | 'secondary' | 'danger' | 'success')
 * @param {string} props.size - Button size ('small' | 'medium' | 'large')
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({ variant = 'primary', size = 'medium', disabled = false, onClick, children }) => {
  // Component implementation
};
```

## 🎯 Principios de Diseño

### **Reutilización**
- Componentes modulares y reutilizables
- Props flexibles para diferentes casos de uso
- Composición sobre herencia

### **Consistencia**
- Sistema de diseño unificado
- Variables CSS globales
- Convenciones de nomenclatura

### **Accesibilidad**
- ARIA labels y roles
- Navegación por teclado
- Contraste de colores
- Screen reader friendly

### **Performance**
- Lazy loading de componentes pesados
- Memoización cuando es necesario
- Optimización de re-renders

## 🔄 Mantenimiento

### **Actualizaciones**
- Versionado semántico
- Changelog detallado
- Migración automática
- Backward compatibility

### **Deprecación**
- Avisos de deprecación
- Período de transición
- Guías de migración
- Soporte temporal

---

Esta documentación se actualiza regularmente para reflejar los cambios y mejoras en el sistema de componentes.