# CooLab - Plataforma de Conexión Social

## 🌟 Descripción

CooLab es una plataforma innovadora que conecta donantes con organizaciones sociales en América Latina, facilitando el impacto positivo en comunidades vulnerables y proyectos sostenibles. Nuestra misión es crear puentes de colaboración para un futuro más justo y sostenible.

## ✨ Características Principales

### 🎯 Para Donantes
- **Registro Simplificado**: Formulario fácil de completar con información básica
- **Descubrimiento de Organizaciones**: Encuentra organizaciones confiables cerca de ti
- **Filtros Avanzados**: Busca por ODS, población objetivo y ubicación
- **Mapa Interactivo**: Visualiza organizaciones en un mapa intuitivo

### 🏢 Para Organizaciones
- **Perfil Completo**: Registra tu organización con información detallada
- **Formulario Extendido**: Opción para incluir proyectos y documentación
- **Visibilidad Internacional**: Presenta tu trabajo al mundo
- **Conexión Directa**: Recibe donaciones y colaboraciones

### 🗺️ Mapa Interactivo
- **Filtros por Ubicación**: País, ciudad, ODS y población objetivo
- **Información Detallada**: Perfiles completos de cada organización
- **Contacto Directo**: Información de contacto y proyectos
- **Visualización en Tiempo Real**: Impacto social y ambiental actualizado

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd app_web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   La aplicación se abrirá automáticamente en `http://localhost:3000`

### Scripts Disponibles

- `npm start` - Inicia la aplicación en modo desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack (irreversible)

## 🎨 Tecnologías Utilizadas

- **Frontend**: React 19.1.1
- **Estilos**: Tailwind CSS 3.4.17
- **Iconos**: SVG inline
- **Internacionalización**: Sistema de archivos JSON
- **Responsive Design**: Mobile-first approach

## 🌍 Idiomas Soportados

- 🇪🇸 Español (por defecto)
- 🇬🇧 Inglés
- 🇵🇹 Portugués
- 🇫🇷 Francés
- 🇮🇹 Italiano
- 🇯🇵 Japonés
- 🇷🇺 Ruso
- 🇰🇷 Coreano
- 🇨🇳 Chino

## 📱 Características Responsivas

- **Mobile-First**: Diseño optimizado para dispositivos móviles
- **Adaptativo**: Se adapta a diferentes tamaños de pantalla
- **Touch-Friendly**: Interfaz optimizada para pantallas táctiles
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 🔧 Estructura del Proyecto

```
app_web/
├── public/                 # Archivos públicos
│   ├── index.html         # HTML principal
│   └── favicon.ico        # Icono de la aplicación
├── src/                   # Código fuente
│   ├── App.js            # Componente principal
│   ├── App.css           # Estilos personalizados
│   ├── index.js          # Punto de entrada
│   ├── index.css         # Estilos base
│   └── languages/        # Archivos de traducción
│       ├── es.json       # Español
│       ├── en.json       # Inglés
│       └── ...           # Otros idiomas
├── package.json           # Dependencias y scripts
└── tailwind.config.js     # Configuración de Tailwind CSS
```

## 🎯 Funcionalidades Clave

### Sistema de Navegación
- **Navegación Principal**: Home, About, Services, Manuals, Community, Contact
- **Selector de Idioma**: Cambio dinámico entre idiomas
- **Navegación Responsiva**: Menú adaptativo para móviles

### Formularios Inteligentes
- **Validación en Tiempo Real**: Verificación de campos requeridos
- **Formulario Básico**: Registro rápido para donantes
- **Formulario Extendido**: Información detallada para organizaciones
- **Manejo de Estado**: Gestión eficiente de datos del formulario

### Sistema de Filtros
- **Filtros por Ubicación**: País y ciudad
- **Filtros por ODS**: Objetivos de Desarrollo Sostenible
- **Filtros por Población**: Población objetivo
- **Filtros Combinados**: Múltiples criterios simultáneos

## 🚀 Despliegue

### Desarrollo Local
```bash
npm start
```

### Producción
```bash
npm run build
```

### Servidor de Producción
Los archivos generados en `build/` pueden ser servidos por cualquier servidor web estático.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Proyecto**: CooLab
- **Equipo**: COO-LAB
- **Email**: [tu-email@ejemplo.com]
- **Website**: [URL_DEL_PROYECTO]

## 🙏 Agradecimientos

- React Team por el framework
- Tailwind CSS por el sistema de diseño
- Comunidad de desarrolladores open source
- Organizaciones sociales que inspiran este proyecto

---

**CooLab** - Conectando Impacto, Transformando Comunidades 🌟
