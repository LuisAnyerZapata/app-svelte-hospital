# Hospital Universitario Manuel Nunez Tovar - Sistema de Citas Medicas

Aplicacion web para gestionar citas medicas del Hospital Universitario Manuel Nunez Tovar en Maturin, Venezuela.

> [!WARNING]
> **Proyecto en desarrollo activo.** Esta aplicacion es un prototipo en
> construccion: el codigo cambia de forma frecuente y algunas funciones pueden
> estar incompletas o cambiar sin previo aviso.
>
> - **No hay backend real.** No se conecta a ningun servidor ni a una base de
>   datos: todos los datos (usuarios, citas, pacientes) se crean y viven en el
>   `localStorage` de tu navegador. Si borras los datos del navegador, se
>   pierde todo.
> - **Los datos son ficticios.** Los usuarios, pacientes, medicos y citas
>   incluidos son de invencion y no corresponden a personas reales.
> - **Las contrasenas de la tabla de prueba de abajo NO son credenciales
>   reales.** Son constantes fijas escritas en el codigo a proposito, para
>   poder demostrar el sistema sin infraestructura. No las reutilices en
>   ningun otro sitio.

## Que hace esta aplicacion?

- **Pagina publica**: Presenta el hospital, sus areas medicas y permite contactar
- **Login seguro**: Control de acceso con intentos fallidos y recuperacion de contrasena
- **Dashboard personalizado**: Cada rol ve informacion relevante (estadisticas, graficos)
- **Navegacion por rol**: Admin, doctor, enfermera, recepcionista y paciente ven diferentes menus
- **Busqueda rapida**: Encuentra cualquier seccion con `Alt+K`

## Usuarios de prueba

| Usuario | Contrasena | Que ve |
|---------|------------|--------|
| `admin` | `admin123` | Todo el sistema |
| `maria` | `demo123` | Solo sus citas |
| `daruiz` | `demo123` | Citas y pacientes |
| `enfermera` | `demo123` | Triaje y pacientes |
| `recepcion` | `demo123` | Citas y recepcion |

> Usa `localStorage` - no hay servidor real. Los datos se guardan en el navegador.

## Tecnologias

- [Svelte 5](https://svelte.dev/) - Framework reactivo
- [Vite 8](https://vitejs.dev/) - Build tool
- JavaScript con tipos (JSDoc)

## Como ejecutar

```bash
npm install      # Instalar dependencias
npm run dev      # Iniciar desarrollo
npm run build    # Build de produccion
npm run check    # Verificar tipos
```

## Estructura del proyecto

El codigo esta organizado en **modulos funcionales** - cada carpeta representa un area del sistema, no un tipo de archivo tecnico.

```
src/
├── core/                  # Herramientas compartidas (router y permisos)
│
└── modules/               # Cada modulo es una funcionalidad del hospital
    ├── landing/           # Pagina publica
    ├── auth/              # Login y sesiones
    └── dashboard/         # Panel interno
```

### Core - Herramientas compartidas

| Archivo | Que hace |
|---------|----------|
| `router.svelte.js` | Conecta URLs con pantallas (ej: `/login` muestra LoginPage) |
| `routes.js` | Lista todas las rutas del sistema |
| `permissions.js` | Controla que puede ver cada rol |

### Modulo Landing - Pagina publica

Accesible sin login. Muestra informacion del hospital.

| Archivo | Que hace |
|---------|----------|
| `LandingPage.svelte` | pagina completa |
| `Navbar.svelte` | Barra de navegacion con logo |
| `Hero.svelte` | Seccion principal con estadisticas |
| `AreasSection.svelte` | Tarjetas de especialidades medicas |
| `SocialSection.svelte` | Enlaces a redes sociales |
| `Footer.svelte` | Pie de pagina con contacto |

### Modulo Auth - Login

Controla quien entra al sistema.

| Archivo | Que hace |
|---------|----------|
| `auth.models.js` | Define estructuras de datos (User, LoginCredentials) |
| `auth-api.js` | Logica: login, logout, recuperar contrasena |
| `login-form.svelte.js` | Estado del formulario y bloqueo por intentos |
| `session.svelte.js` | Guarda quien esta logueado |
| `LoginPage.svelte` | Pantalla de login |
| `RecoveryModal.svelte` | Modal para recuperar contrasena |

### Modulo Dashboard - Panel interno

Requiere login. Cada rol ve contenido diferente.

**Layouts** (estructura base):
| Archivo | Que hace |
|---------|----------|
| `DashboardShell.svelte` | Ensambla sidebar + topbar + contenido |
| `Topbar.svelte` | Barra superior con busqueda |
| `Sidebar.svelte` | Menu lateral filtrado por rol |
| `SearchBar.svelte` | Buscador global (`Alt+K`) |

**Overview** (vista principal):
| Archivo | Que hace |
|---------|----------|
| `OverviewView.svelte` | Estadisticas y grafico de citas |
| `StatsGrid.svelte` | Tarjetas de metricas por rol |
| `AppointmentsChart.svelte` | Grafico SVG de 30 dias |

## Arquitectura

### Screaming Architecture

> *"La estructura del codigo debe gritar de que trata el sistema."*

En vez de organizar por tipo tecnico (`controllers/`, `views/`, `utils/`), el proyecto organiza por **funcionalidad del negocio**:

```
src/modules/
├── landing/      # Pagina publica del hospital
├── auth/         # Login y sesiones
└── dashboard/    # Panel de administracion
```

Al mirar las carpetas, cualquiera entiende que es un **sistema de gestion hospitalaria**, no una app generica.

### Clean Architecture

El codigo se divide en **capas** donde cada una solo depende de la interior:

```
┌─────────────────────────────────────┐
│  components/  ← Interfaz visual     │
│       ↓                             │
│  stores/      ← Estado reactivo     │
│       ↓                             │
│  services/    ← Logica de negocio   │
│       ↓                             │
│  models/      ← Definicion de datos │
└─────────────────────────────────────┘
```

**Regla**: Un `service` nunca importa un `component`, pero un `component` si puede usar un `service`.

### Dependencias

```
core     ← NUNCA usa modulos
modules  ← Puede usar core
modules  ← NO usa otros modules (excepto dashboard lee sesion de auth)
```

**En simple**: `core` es general, `modules` es especifico. Los modules pueden usar core, pero core no conoce los modules.

## Arquitectura de Datos

Todo se guarda en `localStorage` con esta estructura:

```json
{
  "users": [],
  "patients": [],
  "doctors": [],
  "appointments": [],
  "areas": [],
  "clinicalRecords": [],
  "triaje": []
}
```

## Licencia

Proyecto academico - Hospital Universitario Manuel Nunez Tovar
