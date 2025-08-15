# 🗺️ Configuración de MapTiler para CooLab

## 📋 **Prerrequisitos**
- Cuenta en [MapTiler](https://www.maptiler.com/)
- API Key gratuita de MapTiler

## 🚀 **Paso 1: Crear cuenta en MapTiler**

1. Ve a [https://www.maptiler.com/](https://www.maptiler.com/)
2. Haz clic en "Sign Up" o "Registrarse"
3. Completa el formulario de registro
4. Confirma tu email

## 🔑 **Paso 2: Obtener tu API Key**

1. Inicia sesión en tu cuenta de MapTiler
2. Ve a "Cloud" en el menú principal
3. Haz clic en "API Keys"
4. Copia tu API Key (empieza con `sk.`)

## ⚙️ **Paso 3: Configurar variables de entorno**

1. En la raíz de tu proyecto, crea un archivo `.env` (si no existe)
2. Agrega tu API Key:

```env
REACT_APP_MAPTILER_KEY=sk.tu_api_key_aqui
```

**⚠️ IMPORTANTE:**
- **NO** subas el archivo `.env` a GitHub
- **NO** compartas tu API Key públicamente
- El archivo `.env` ya está en `.gitignore`

## 🗺️ **Paso 4: Estilos de mapa disponibles**

MapTiler ofrece varios estilos de mapa:

- **Streets**: Mapa de calles detallado (por defecto)
- **Basic**: Mapa básico y limpio
- **Hybrid**: Combinación de calles y satélite
- **Satellite**: Vista satelital
- **Outdoor**: Ideal para actividades al aire libre
- **Voyager**: Estilo de exploración

## 🔧 **Paso 5: Personalizar la configuración**

Puedes modificar la configuración en `src/config/maptiler.js`:

```javascript
export const MAPTILER_CONFIG = {
  // Cambiar el centro del mapa
  MAP_CONFIG: {
    CENTER: [-14.235, -51.9253], // [latitud, longitud]
    ZOOM: 4,                      // Nivel de zoom inicial
    MIN_ZOOM: 2,                  // Zoom mínimo
    MAX_ZOOM: 18,                 // Zoom máximo
  }
};
```

## 🧪 **Paso 6: Probar la implementación**

1. Asegúrate de que tu API Key esté en el archivo `.env`
2. Reinicia la aplicación: `npm start`
3. Ve a la página del mapa
4. Deberías ver el mapa de MapTiler con controles de estilo

## 🚨 **Solución de problemas**

### **Error: "API Key de MapTiler Requerida"**
- Verifica que el archivo `.env` existe
- Verifica que `REACT_APP_MAPTILER_KEY` esté configurado
- Reinicia la aplicación después de cambiar `.env`

### **Error: "Invalid API Key"**
- Verifica que tu API Key sea correcta
- Asegúrate de que tu cuenta de MapTiler esté activa
- Verifica que no haya espacios extra en `.env`

### **Mapa no se carga**
- Verifica la consola del navegador para errores
- Asegúrate de que las dependencias estén instaladas
- Verifica que el CSS de Leaflet esté cargado

## 📊 **Límites de la cuenta gratuita**

- **100,000 map loads por mes**
- **Suficiente para desarrollo y proyectos pequeños**
- **Para producción, considera un plan de pago**

## 🔗 **Enlaces útiles**

- [Documentación de MapTiler](https://docs.maptiler.com/)
- [Ejemplos de implementación](https://maptiler.com/developers/)
- [Soporte técnico](https://maptiler.com/support/)

## ✅ **Verificación final**

Tu implementación está lista cuando:

- ✅ El mapa se carga correctamente
- ✅ Puedes cambiar entre estilos de mapa
- ✅ Los marcadores se muestran en las ubicaciones correctas
- ✅ Los popups funcionan al hacer clic en marcadores
- ✅ El zoom y navegación funcionan correctamente

---

**🎉 ¡Felicidades! Ahora tienes un mapa interactivo profesional con MapTiler en CooLab.**
