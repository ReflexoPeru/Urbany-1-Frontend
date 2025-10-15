# 🔐 Feature de Autenticación (auth/)

## 📋 Descripción

Ejemplo 
## 📁 Estructura del Feature

```
src/features/auth/
├── components/           # Componentes específicos de autenticación
├── pages/               # Páginas de autenticación
├── hooks/               # Custom hooks de autenticación
└── services/            # Servicios y APIs de autenticación
```

---

## 📁 1. components/ - Componentes Específicos de Auth

### **¿Qué va aquí?**
- Componentes reutilizables específicos para autenticación
- Formularios de login, registro, cambio de contraseña
- Componentes de UI específicos del flujo de auth

### **Estructura sugerida:**
```
components/
├── LoginForm/
│   ├── LoginForm.jsx           # Componente principal
│   ├── LoginForm.module.css    # Estilos CSS Modules
│   └── index.js                # Export del componente
├── RegisterForm/
│   ├── RegisterForm.jsx
│   ├── RegisterForm.module.css
│   └── index.js
├── PasswordResetForm/
│   ├── PasswordResetForm.jsx
│   ├── PasswordResetForm.module.css
│   └── index.js
├── AnimatedBackground/
│   ├── AnimatedBackground.jsx
│   ├── AnimatedBackground.module.css
│   └── index.js
└── AuthLayout/
    ├── AuthLayout.jsx
    ├── AuthLayout.module.css
    └── index.js
```

### **Componentes Principales:**

#### **LoginForm**
- Formulario de inicio de sesión
- Validación de campos
- Manejo de errores
- Integración con hooks de autenticación

#### **RegisterForm**
- Formulario de registro de usuarios
- Validación de datos
- Confirmación de contraseña
- Términos y condiciones

#### **PasswordResetForm**
- Formulario para restablecer contraseña
- Validación de email
- Confirmación de envío
- Redirección automática

#### **AnimatedBackground**
- Fondo animado para páginas de auth
- Efectos visuales atractivos
- Responsive design
- Optimización de performance

#### **AuthLayout**
- Layout específico para páginas de auth
- Estructura común
- Navegación simplificada
- Branding consistente

---

## 📁 2. pages/ - Páginas de Autenticación

### **¿Qué va aquí?**
- Páginas completas que usan los componentes
- Páginas que manejan rutas específicas
- Páginas con lógica de navegación y estado

### **Estructura sugerida:**
```
pages/
├── Login.jsx                   # Página de login
├── Register.jsx                # Página de registro
├── ForgotPassword.jsx          # Página "Olvidé mi contraseña"
├── ResetPassword.jsx           # Página de restablecer contraseña
├── ChangePassword.jsx          # Página de cambiar contraseña
└── index.js                    # Export de todas las páginas
```

### **Páginas Principales:**

#### **Login.jsx**
- Página principal de inicio de sesión
- Integración con LoginForm
- Manejo de redirección
- Estado de carga

#### **Register.jsx**
- Página de registro de nuevos usuarios
- Integración con RegisterForm
- Validación de datos
- Confirmación de registro

#### **ForgotPassword.jsx**
- Página para solicitar restablecimiento
- Integración con PasswordResetForm
- Confirmación de envío
- Navegación a login

#### **ResetPassword.jsx**
- Página para establecer nueva contraseña
- Validación de token
- Formulario de nueva contraseña
- Confirmación de cambio

#### **ChangePassword.jsx**
- Página para cambiar contraseña actual
- Validación de contraseña actual
- Formulario de nueva contraseña
- Confirmación de cambio

---

## 📁 3. hooks/ - Custom Hooks de Autenticación

### **¿Qué va aquí?**
- Hooks personalizados para manejar estado de autenticación
- Hooks para validaciones
- Hooks para manejo de formularios

### **Estructura sugerida:**
```
hooks/
├── useAuth.js                  # Hook principal de autenticación
├── useLogin.js                 # Hook específico para login
├── useRegister.js              # Hook específico para registro
├── usePasswordReset.js         # Hook para restablecer contraseña
├── useFormValidation.js        # Hook para validación de formularios
└── index.js                    # Export de todos los hooks
```

### **Hooks Principales:**

#### **useAuth.js**
- Estado global de autenticación
- Funciones de login/logout
- Verificación de sesión
- Manejo de tokens

#### **useLogin.js**
- Lógica específica de login
- Validación de credenciales
- Manejo de errores
- Redirección post-login

#### **useRegister.js**
- Lógica de registro
- Validación de datos
- Creación de usuario
- Confirmación de email

#### **usePasswordReset.js**
- Lógica de restablecimiento
- Envío de email
- Validación de token
- Actualización de contraseña

#### **useFormValidation.js**
- Validación de formularios
- Reglas de validación
- Mensajes de error
- Estado de validación

---

## 📁 4. services/ - Servicios y APIs

### **¿Qué va aquí?**
- Servicios para comunicación con el backend
- Configuración de APIs
- Manejo de tokens y sesiones

### **Estructura sugerida:**
```
services/
├── authService.js              # Servicio principal de autenticación
├── userService.js              # Servicio de usuarios
├── tokenService.js             # Manejo de tokens
├── sessionService.js           # Manejo de sesiones
├── apiConfig.js                # Configuración de API
└── index.js                    # Export de todos los servicios
```

### **Servicios Principales:**

#### **authService.js**
- Endpoints de autenticación
- Login/logout
- Registro de usuarios
- Verificación de sesión

#### **userService.js**
- Gestión de usuarios
- Perfil de usuario
- Actualización de datos
- Eliminación de cuenta

#### **tokenService.js**
- Manejo de JWT tokens
- Refresh tokens
- Almacenamiento seguro
- Expiración de tokens

#### **sessionService.js**
- Gestión de sesiones
- Sesiones activas
- Cierre de sesión
- Persistencia de sesión

#### **apiConfig.js**
- Configuración de axios
- Interceptores
- Manejo de errores
- Headers automáticos

---

## 🎨 Ubicación de CSS Modules

### **Regla General:**
- **CSS Modules van junto al componente** que los usa
- **Nomenclatura:** `[NombreComponente].module.css`
- **Ubicación:** Misma carpeta que el componente

### **Ejemplos de Ubicación:**

```
components/LoginForm/
├── LoginForm.jsx
├── LoginForm.module.css    ← CSS Module aquí
└── index.js

components/RegisterForm/
├── RegisterForm.jsx
├── RegisterForm.module.css ← CSS Module aquí
└── index.js

pages/
├── Login.jsx
├── Login.module.css        ← CSS Module aquí (si tiene estilos específicos)
└── index.js
```

### **Estructura de CSS Modules:**

```css
/* LoginForm.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

.button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.button:hover {
  background: #2563eb;
}

.error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.success {
  color: #10b981;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

### **Uso en el Componente:**

```jsx
// LoginForm.jsx
import styles from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Iniciar Sesión</h2>
      <form className={styles.form}>
        <input 
          className={styles.input}
          type="email" 
          placeholder="Email" 
        />
        <input 
          className={styles.input}
          type="password" 
          placeholder="Contraseña" 
        />
        <button className={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  );
};
```

## 🔄 Flujo de Datos

### **1. Componentes**
- Consumen hooks y servicios
- Manejan UI y eventos del usuario
- No contienen lógica de negocio

### **2. Hooks**
- Manejan estado local del componente
- Contienen lógica reutilizable
- Se conectan con servicios

### **3. Servicios**
- Comunicación con APIs
- Transformación de datos
- Manejo de errores

### **4. CSS Modules**
- Estilos específicos del componente
- Evita conflictos de nombres
- Mantiene encapsulación

## 🎯 Mejores Prácticas

### **Organización**
- Un componente por archivo
- CSS Module con mismo nombre
- Export en index.js
- Documentación de props

### **Nomenclatura**
- PascalCase para componentes
- camelCase para hooks
- camelCase para servicios
- kebab-case para CSS classes

### **Reutilización**
- Componentes modulares
- Hooks especializados
- Servicios genéricos
- Estilos consistentes

---

Esta estructura asegura un código limpio, mantenible y escalable para el feature de autenticación del CRM inmobiliario Urbany.
