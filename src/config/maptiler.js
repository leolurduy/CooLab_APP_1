// Configuración de MapTiler
export const MAPTILER_CONFIG = {
  // Obtener la API key desde variables de entorno
  API_KEY: process.env.REACT_APP_MAPTILER_KEY || "YOUR_MAPTILER_KEY",
  
  // Estilos de mapa disponibles
  STYLES: {
    STREETS: "streets",
    BASIC: "basic", 
    HYBRID: "hybrid",
    SATELLITE: "satellite",
    OUTDOOR: "outdoor",
    VOYAGER: "voyager"
  },
  
  // URLs base para los diferentes estilos
  BASE_URL: "https://api.maptiler.com/maps",
  
  // Configuración del mapa
  MAP_CONFIG: {
    CENTER: [-14.235, -51.9253], // Centro en América Latina (Brasil)
    ZOOM: 4,
    MIN_ZOOM: 2,
    MAX_ZOOM: 18,
    ATTRIBUTION: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }
};

// Función para generar URL de tiles
export const getMapTilerUrl = (style) => {
  const { API_KEY, BASE_URL, STYLES } = MAPTILER_CONFIG;
  
  // Validar que el estilo sea válido
  if (!Object.values(STYLES).includes(style)) {
    style = STYLES.STREETS; // Fallback a streets si el estilo no es válido
  }
  
  return `${BASE_URL}/${style}/{z}/{x}/{y}.png?key=${API_KEY}`;
};

// Función para obtener la atribución
export const getMapTilerAttribution = () => {
  return MAPTILER_CONFIG.MAP_CONFIG.ATTRIBUTION;
};

// Función para obtener la configuración del mapa
export const getMapConfig = () => {
  return MAPTILER_CONFIG.MAP_CONFIG;
};

// Función para validar si la API key está configurada
export const isApiKeyConfigured = () => {
  return MAPTILER_CONFIG.API_KEY && MAPTILER_CONFIG.API_KEY !== "YOUR_MAPTILER_KEY";
};
