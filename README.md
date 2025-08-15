# CooLab - Plataforma de Conexión Social

## 🌟 Descripción

CooLab es una plataforma innovadora que conecta organizaciones sociales, donantes y receptores en América Latina y el mundo. La plataforma facilita la colaboración y el impacto social a través de un sistema de mapeo interactivo, formularios de conexión y gestión de proyectos sociales.

## ✨ Características Principales

### 🗺️ **Mapa Interactivo Profesional**
- **Leaflet + MapTiler**: Mapa interactivo de alta calidad con tiles profesionales
- **Múltiples Estilos**: Calles, Básico, Híbrido, Satélite, Outdoor, Voyager
- **Marcadores Dinámicos**: Visualización de organizaciones con información detallada
- **Filtros Avanzados**: Búsqueda por país, ciudad, ODS y población objetivo
- **Centrado en América Latina**: Configuración optimizada para la región

### 🔗 **Sistema de Conexión**
- **Formulario de Donantes**: Registro de organizaciones que ofrecen recursos
- **Formulario de Receptores**: Solicitudes de proyectos y necesidades
- **Matching Inteligente**: Conexión automática basada en criterios

### 🌍 **Internacionalización**
- **8 Idiomas**: Español, Inglés, Francés, Italiano, Japonés, Coreano, Portugués, Ruso, Chino
- **Interfaz Adaptativa**: Cambio dinámico de idioma en tiempo real

### 📱 **Diseño Responsivo**
- **Mobile-First**: Optimizado para dispositivos móviles
- **Tailwind CSS**: Sistema de diseño moderno y escalable
- **Componentes Reutilizables**: Arquitectura modular y mantenible

## 🚀 **Instalación y Configuración**

### **Prerrequisitos**
- Node.js 16+ 
- npm o yarn
- Cuenta en Supabase
- Cuenta en MapTiler (gratuita)

### **1. Clonar el Repositorio**
```bash
git clone <tu-repositorio>
cd app_web
```

### **2. Instalar Dependencias**
```bash
npm install
npm install leaflet react-leaflet @supabase/supabase-js
```

### **3. Configurar Variables de Entorno**
Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_SUPABASE_URL=tu_url_de_supabase_aqui
REACT_APP_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase_aqui
REACT_APP_MAPTILER_KEY=tu_api_key_de_maptiler_aqui
```

### **4. Configurar Supabase**
1. Ve a [Supabase](https://supabase.com/)
2. Crea un nuevo proyecto
3. Crea la tabla `organizations` con la siguiente estructura:

```sql
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  ods INTEGER[],
  targetPopulation VARCHAR(100)[],
  socialObject TEXT,
  contact JSONB,
  projects JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **5. Configurar MapTiler**
1. Ve a [MapTiler](https://www.maptiler.com/)
2. Crea una cuenta gratuita
3. Obtén tu API Key
4. Agrega la API Key en tu archivo `.env`

**📖 Ver instrucciones detalladas en [MAPTILER_SETUP.md](./MAPTILER_SETUP.md)**

### **6. Ejecutar la Aplicación**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ **Arquitectura del Proyecto**

### **Estructura de Archivos**
```
src/
├── components/          # Componentes React reutilizables
│   ├── Mapa.js        # Componente del mapa interactivo con Leaflet + MapTiler
│   └── ...
├── config/             # Archivos de configuración
│   └── maptiler.js    # Configuración de MapTiler
├── lib/               # Utilidades y clientes de base de datos
│   ├── supabaseClient.js  # Cliente de Supabase
│   └── ...
├── languages/         # Archivos de internacionalización
│   ├── es.json       # Español
│   ├── en.json       # Inglés
│   └── ...
├── App.js            # Componente principal de la aplicación
├── App.css           # Estilos personalizados
└── index.js          # Punto de entrada
```

### **Componentes Principales**

#### **Mapa.js**
- **Propósito**: Renderiza el mapa interactivo con Leaflet + MapTiler
- **Funcionalidades**:
  - Visualización de organizaciones como marcadores
  - Popups informativos con detalles de cada organización
  - Cambio dinámico de estilos de mapa (Calles, Satélite, Híbrido, etc.)
  - Integración con el estado global de la aplicación
  - Carga de datos desde Supabase o datos locales

#### **maptiler.js**
- **Propósito**: Configuración centralizada de MapTiler
- **Funcionalidades**:
  - Gestión de API keys
  - Configuración de estilos de mapa
  - Validación de configuración
  - Funciones helper para URLs y atribuciones

#### **supabaseClient.js**
- **Propósito**: Cliente para interactuar con la base de datos Supabase
- **Funciones**:
  - `cargarOrganizaciones()`: Obtiene todas las organizaciones
  - `crearOrganizacion()`: Crea una nueva organización
  - `actualizarOrganizacion()`: Actualiza datos existentes
  - `eliminarOrganizacion()`: Elimina organizaciones

### **Flujo de Datos**
1. **Carga Inicial**: Los datos se cargan desde Supabase al montar el componente
2. **Filtrado**: Los filtros se aplican en tiempo real
3. **Visualización**: El mapa se actualiza automáticamente con los resultados filtrados
4. **Selección**: Al hacer clic en un marcador, se selecciona la organización

## 🗺️ **Características del Mapa**

### **Estilos Disponibles**
- **Streets**: Mapa de calles detallado (por defecto)
- **Basic**: Mapa básico y limpio
- **Hybrid**: Combinación de calles y satélite
- **Satellite**: Vista satelital
- **Outdoor**: Ideal para actividades al aire libre
- **Voyager**: Estilo de exploración

### **Funcionalidades Avanzadas**
- **Zoom Control**: Control de zoom personalizado
- **Marcadores Interactivos**: Popups con información detallada
- **Navegación Suave**: Movimiento fluido por el mapa
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## 🎨 **Tecnologías Utilizadas**

### **Frontend**
- **React 18**: Biblioteca de interfaz de usuario
- **Tailwind CSS**: Framework de CSS utilitario
- **Leaflet**: Biblioteca de mapas interactivos
- **React-Leaflet**: Integración de Leaflet con React

### **Mapas y Tiles**
- **MapTiler**: Servicio de tiles de alta calidad
- **OpenStreetMap**: Datos geográficos base
- **Leaflet CSS**: Estilos para el mapa

### **Backend y Base de Datos**
- **Supabase**: Backend-as-a-Service con PostgreSQL
- **PostgreSQL**: Base de datos relacional robusta
- **REST API**: API RESTful para operaciones CRUD

### **Herramientas de Desarrollo**
- **Create React App**: Configuración inicial del proyecto
- **ESLint**: Linting de código
- **Git**: Control de versiones

## 📊 **Base de Datos**

### **Tabla `organizations`**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL | Identificador único |
| `name` | VARCHAR(255) | Nombre de la organización |
| `country` | VARCHAR(100) | País de ubicación |
| `city` | VARCHAR(100) | Ciudad de ubicación |
| `address` | TEXT | Dirección completa |
| `lat` | DECIMAL(10,8) | Latitud para el mapa |
| `lng` | DECIMAL(11,8) | Longitud para el mapa |
| `ods` | INTEGER[] | Array de ODS (Objetivos de Desarrollo Sostenible) |
| `targetPopulation` | VARCHAR(100)[] | Población objetivo |
| `socialObject` | TEXT | Objeto social de la organización |
| `contact` | JSONB | Información de contacto |
| `projects` | JSONB | Proyectos de la organización |

### **Ejemplo de Datos**
```json
{
  "name": "Fundación CooLab",
  "country": "México",
  "city": "Ciudad de México",
  "lat": 19.4326,
  "lng": -99.1332,
  "ods": [1, 4, 8],
  "targetPopulation": ["Jóvenes", "Mujeres"],
  "socialObject": "Promover la cooperación social",
  "contact": {
    "email": "info@coo-lab.org",
    "phone": "+52 55 1234 5678",
    "website": "https://coo-lab.org"
  }
}
```

## 🚀 **Despliegue**

### **Despliegue en Producción**
```bash
npm run build
```

### **Plataformas Recomendadas**
- **Vercel**: Despliegue automático desde GitHub
- **Netlify**: Hosting estático con funciones serverless
- **AWS S3 + CloudFront**: Solución escalable para producción

### **Variables de Entorno en Producción**
Asegúrate de configurar las variables de entorno en tu plataforma de hosting:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_MAPTILER_KEY`

## 🔮 **Escalabilidad Futura**

### **Arquitectura Híbrida Recomendada**
- **PostgreSQL (Supabase)**: Para datos estructurados como organizaciones, usuarios, ODS
- **MongoDB Atlas**: Para datos flexibles como archivos adjuntos, comentarios, logs

### **Integración con MongoDB**
```javascript
// src/lib/mongoClient.js (para el futuro)
import { MongoClient } from 'mongodb'

const mongoUri = process.env.REACT_APP_MONGODB_URI
const client = new MongoClient(mongoUri)

export const connectMongo = async () => {
  try {
    await client.connect()
    return client.db('coo-lab')
  } catch (error) {
    console.error('Error conectando a MongoDB:', error)
    return null
  }
}
```

### **Casos de Uso para MongoDB**
- **Archivos Adjuntos**: Documentos, imágenes, videos
- **Comentarios y Reviews**: Sistema de feedback de usuarios
- **Logs de Actividad**: Historial de interacciones
- **Datos No Estructurados**: Contenido dinámico y flexible

## 🔒 **Seguridad**

### **Buenas Prácticas**
- **Claves Anónimas**: Solo usa claves anónimas de Supabase en el frontend
- **Variables de Entorno**: Nunca expongas claves secretas en el código
- **Validación de Datos**: Valida todos los inputs del usuario
- **HTTPS**: Usa siempre conexiones seguras en producción

### **Archivos de Configuración**
```gitignore
# .gitignore
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
node_modules/
build/
```

## 🧪 **Testing**

### **Ejecutar Tests**
```bash
npm test
```

### **Cobertura de Código**
```bash
npm test -- --coverage --watchAll=false
```

## 🤝 **Contribución**

### **Flujo de Trabajo**
1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

### **Estándares de Código**
- Usar ESLint para mantener consistencia
- Seguir las convenciones de React
- Documentar funciones complejas
- Escribir tests para nuevas funcionalidades

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 **Contacto**

- **Email**: info@coo-lab.org
- **Website**: https://coo-lab.org
- **GitHub**: [tu-usuario/coo-lab](https://github.com/tu-usuario/coo-lab)

## 🙏 **Agradecimientos**

- **Supabase** por proporcionar la infraestructura de backend
- **MapTiler** por los tiles de mapas de alta calidad
- **Leaflet** por la biblioteca de mapas interactivos
- **Tailwind CSS** por el sistema de diseño utilitario

---

**CooLab** - Conectando impacto social a través de la cooperación digital 🌟
