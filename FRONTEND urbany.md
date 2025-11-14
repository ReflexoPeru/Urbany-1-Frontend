# Guía de Integración Frontend y Consumo de API (Urbany)

Este documento describe cómo el frontend debe integrarse con el backend Urbany, los endpoints disponibles, los headers requeridos, y proporciona una guía de despliegue y documentación del proceso seguido.

---

## 1. Configuración de la API

### Base URL

- Producción (IP actual): `https://178.156.143.222/`
- Prefijo de API: `https://178.156.143.222/api/`
- Documentación interactiva:
  - Swagger UI: `https://178.156.143.222/api/docs/`
  - ReDoc: `https://178.156.143.222/api/redoc/`
- Nota: si usas dominio, sustituye la IP por tu dominio y añade `https://<tu-dominio>/api/` a `CORS_ALLOWED_ORIGINS`.

### Headers requeridos

- `Authorization: Bearer <token>` (JWT generado para el usuario)
- `Content-Type: application/json`
- `Accept: application/json`
- CORS: el origen del frontend debe estar incluido en `CORS_ALLOWED_ORIGINS` del backend.

### Endpoints disponibles (resumen)

Para la lista completa y esquemas, utiliza la documentación interactiva (`/api/docs/` o `/api/redoc/`). A continuación, un resumen por módulo típico:

- Autenticación
  - `POST /api/auth/login/` → Inicia sesión (usuario/contraseña)
  - `POST /api/auth/refresh/` → Refresca token
  - `GET  /api/auth/me/` → Perfil del usuario autenticado
- Usuarios y Roles
  - `GET  /api/users/` → Lista usuarios
  - `POST /api/users/` → Crea usuario
  - `GET  /api/users/{id}/` → Detalle
  - `PATCH/PUT /api/users/{id}/` → Actualiza
  - `DELETE /api/users/{id}/` → Elimina
  - `GET  /api/roles/` → Lista roles
- Contactos
  - `GET  /api/contacts/`
  - `POST /api/contacts/`
  - `GET  /api/contacts/{id}/`
  - `PATCH/PUT /api/contacts/{id}/`
  - `DELETE /api/contacts/{id}/`
- Mensajería (Channels/WebSockets)
  - REST: `GET/POST /api/messages/`
  - WS: `wss://178.156.143.222/ws/chat/<room>/`
- Negocio/Contratos/Propiedades (CRUDs similares)
  - `GET/POST /api/business/`
  - `GET/POST /api/contracts/`
  - `GET/POST /api/properties/`
- Informes/Panel
  - `GET  /api/reports/summary/`
  - `GET  /api/dashboard/metrics/`

### Ejemplos de request/response

- Login (JWT)
```http
POST /api/auth/login/ HTTP/1.1
Host: 178.156.143.222
Content-Type: application/json

{
  "username": "deploy_admin",
  "password": "<tu_password>"
}
```
Respuesta (200):
```json
{
  "access": "eyJ...",
  "refresh": "eyJ...",
  "user": {"id": 1, "username": "deploy_admin"}
}
```

- Authenticated fetch
```http
GET /api/contacts/ HTTP/1.1
Host: 178.156.143.222
Authorization: Bearer eyJ...
Accept: application/json
```
Respuesta (200):
```json
[
  {"id": 101, "name": "Acme", "email": "info@acme.com"}
]
```

### Ejemplo cliente (JavaScript / axios)

```js
import axios from 'axios';

const API_BASE = 'https://178.156.143.222/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export async function login(username, password) {
  const { data } = await api.post('/auth/login/', { username, password });
  api.defaults.headers.Authorization = `Bearer ${data.access}`;
  return data;
}

export async function listContacts() {
  const { data } = await api.get('/contacts/');
  return data;
}
```

### WebSocket (ejemplo)

```js
const ws = new WebSocket('wss://178.156.143.222/ws/chat/general/');
ws.onopen = () => ws.send(JSON.stringify({ type: 'ping' }));
ws.onmessage = (e) => console.log('WS message', e.data);
```

---

## 2. Guía de despliegue (backend + acceso frontend)

### Requisitos previos

- VPS con Docker y Docker Compose activos
- PuTTY en tu máquina (Windows): `plink.exe` y `pscp.exe`
- Variables de entorno (en `/opt/urbany/.env`) mínimas:
  - `DEBUG=False`
  - `ALLOWED_HOSTS=178.156.143.222,<tu-dominio>`
  - `USE_POSTGRES=true` + `DB_*`
  - `REDIS_HOST=redis`
  - `SECRET_KEY=<seguro>`
  - `CORS_ALLOWED_ORIGINS=https://<tu-dominio>` (o `https://178.156.143.222`)
  - `URBANY_TOKEN=<proporcionado>`
  - `WEB_IMAGE=urbany/web`, `WEB_TAG=latest` (parametrización)
- Certificados TLS (opcional): `/etc/nginx/certs/fullchain.pem`, `/etc/nginx/certs/privkey.pem`

### Comandos ejecutados (despliegue automatizado)

- Descarga de herramientas y orquestador (desde tu máquina Windows):
```powershell
# Descarga plink/pscp y añade al PATH de la sesión
$toolsDir = Join-Path (Get-Location) "Urbany\tools"; New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null
Invoke-WebRequest -Uri https://the.earth.li/~sgtatham/putty/latest/w64/plink.exe -OutFile (Join-Path $toolsDir "plink.exe")
Invoke-WebRequest -Uri https://the.earth.li/~sgtatham/putty/latest/w64/pscp.exe  -OutFile (Join-Path $toolsDir "pscp.exe")
$env:PATH = "$env:PATH;" + (Resolve-Path $toolsDir)

# Orquestador (no interactivo)
./Urbany/scripts/auto_deploy.ps1 -VpsUser root -VpsHost 178.156.143.222 -VpsPass "Av7ikfJJufpb" `
  -LocalProjectPath "D:/Escritorio/URBANY-MODULO 03/Urbany" -RemoteDir "/opt/urbany" -UsernameForToken "deploy_admin" -NoConfirm
```

- Acciones realizadas automáticamente:
  - Crea `/opt/urbany/{server,logs,media,static}`
  - Sube el proyecto, ajusta permisos
  - Genera o valida `.env` (añade `WEB_TAG=<timestamp>` si falta)
  - Levanta el stack: `docker compose -f /opt/urbany/docker-compose.prod.yml up -d`
  - Campos de fallback: Nginx usa HTTP si faltan certificados
  - Genera `/opt/urbany/ACCESO_FRONTEND.md` con estado y tokens

### Pasos de implementación (manual alternativo)

1. Crear estructura y subir proyecto (desde tu máquina):
```powershell
pscp -batch -hostkey "<huella-ed25519>" -pw "<password>" -r "<ruta-local>/Urbany/*" root@178.156.143.222:/opt/urbany/
```
2. Crear `.env` (mínimo):
```bash
cat > /opt/urbany/.env << 'EOF'
# (variables mínimas vistas arriba)
EOF
```
3. Levantar servicios:
```bash
cd /opt/urbany
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```
4. Generar reporte y token:
```bash
chmod +x /opt/urbany/server/generate_acceso_frontend.sh
/opt/urbany/server/generate_acceso_frontend.sh deploy_admin
```

---

## 3. Documentación del proceso

### Arquitectura (frontend de referencia)

- SPA (React/Vue/Svelte) que consume la API REST de Urbany
- Autenticación JWT (Bearer) y persistencia de sesión segura
- Cliente HTTP (`axios`/`fetch`) configurado con `baseURL` y `Authorization`
- Comunicación en tiempo real:
  - WebSockets con rutas `/ws/...` (Channels)
- CORS y seguridad:
  - El origen del frontend debe estar autorizado en `CORS_ALLOWED_ORIGINS`
  - HTTPS recomendado (HSTS activo al colocar TLS)

### Flujo de trabajo (resumen)

1. Preparación del backend: Dockerización, Nginx reverse proxy, Redis, Postgres, Celery
2. Validación y documentación: DRF + drf-yasg + drf-spectacular (`/api/docs`, `/api/redoc`)
3. Despliegue automatizado: orquestador en PowerShell (PuTTY + Compose)
4. Correcciones aplicadas:
   - Aceptación de clave SSH en modo batch (`-hostkey`) para evitar prompts
   - Dependencias: `python-decouple` (3.8), `drf-spectacular`, `pandas`
   - Fallback HTTP en Nginx si faltan certificados
5. Verificaciones: `docker compose ps`, `curl -Ik` HTTP/HTTPS, generación de `ACCESO_FRONTEND.md`

### Consideraciones técnicas

- Salud del servicio `web`:
  - Healthcheck inicial en `/api/auth/health/` (ajustar a `/api/docs/` si el endpoint de salud no existe)
- TLS:
  - El uso de HTTPS requiere colocar `fullchain.pem` y `privkey.pem` y recargar Nginx
- Rendimiento:
  - `pandas` y `numpy` aumentan el tamaño de la imagen; mantenerlos solo si el flujo los requiere
- Seguridad:
  - CORS restringido; throttling DRF; rate limit en Nginx; `security_opt: no-new-privileges`

---

## Apéndice: Endpoints útiles de autenticación

- Obtener token vía management (solo backend):
```bash
docker compose -f /opt/urbany/docker-compose.prod.yml exec web python manage.py drf_create_token <usuario>
```
- Usar token en el frontend:
```js
api.defaults.headers.Authorization = `Bearer ${accessToken}`;
```

---

## Checklist para el equipo de frontend

- Configurar `baseURL` y `Authorization` en el cliente
- Verificar CORS (origen autorizado en backend)
- Consumir documentación (`/api/docs` y `/api/redoc`)
- Validar endpoints críticos (login, perfil, CRUDs principales)
- Activar y usar WebSockets donde aplique
- Confirmar HTTPS en producción (si hay TLS) y headers de seguridad (HSTS)