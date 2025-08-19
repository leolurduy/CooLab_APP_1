import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { Icon } from "leaflet";
import { cargarOrganizaciones } from "../lib/supabaseClient";
import LoadingSpinner from "./ui/LoadingSpinner";
import { 
  getMapTilerUrl, 
  getMapTilerAttribution, 
  getMapConfig, 
  isApiKeyConfigured,
  MAPTILER_CONFIG 
} from "../config/maptiler";
import "leaflet/dist/leaflet.css";

// Fix para los iconos de Leaflet en React
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Mapa = ({ organizations, setSelectedOrg, selectedOrg }) => {
  const [mapOrganizations, setMapOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapStyle, setMapStyle] = useState(MAPTILER_CONFIG.STYLES.STREETS);
  const [usingMapTiler, setUsingMapTiler] = useState(isApiKeyConfigured());

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        if (organizations && organizations.length > 0) {
          setMapOrganizations(organizations);
        } else {
          const datos = await cargarOrganizaciones();
          setMapOrganizations(datos);
        }
      } catch (error) {
        console.error("Error cargando datos del mapa:", error);
        // Si hay error, usar datos locales como fallback
        setMapOrganizations(organizations || []);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [organizations]);

  const mapConfig = getMapConfig();
  // Permitir forzar OSM vía variable de entorno, query param o localStorage
  const forceOSM = (process.env.REACT_APP_FORCE_OSM || "").toString() === "1";
  const forceOSMFromQuery = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("osm") === "1";
    } catch (_) {
      return false;
    }
  })();
  const forceOSMFromStorage = (() => {
    try {
      return localStorage.getItem("forceOSM") === "1";
    } catch (_) {
      return false;
    }
  })();
  useEffect(() => {
    if (forceOSM || forceOSMFromQuery || forceOSMFromStorage) {
      setUsingMapTiler(false);
    } else {
      setUsingMapTiler(isApiKeyConfigured());
    }
  }, [forceOSM, forceOSMFromQuery, forceOSMFromStorage]);

  // Verificar de forma proactiva si la key de MapTiler funciona (tile 0/0/0)
  useEffect(() => {
    if (!usingMapTiler) return;
    try {
      const testUrl = getMapTilerUrl(mapStyle)
        .replace("{z}", "0")
        .replace("{x}", "0")
        .replace("{y}", "0");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onerror = () => setUsingMapTiler(false);
      img.src = testUrl;
    } catch (_e) {
      setUsingMapTiler(false);
    }
  }, [usingMapTiler, mapStyle]);
  const handleMarkerClick = (org) => {
    if (setSelectedOrg) setSelectedOrg(org);
  };

  // usingMapTiler ahora es estado y puede cambiar ante errores de tiles

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner 
          size="lg" 
          color="indigo" 
          message="Cargando mapa..." 
          centered={true}
        />
      </div>
    );
  }

  // Si no hay organizaciones, mostrar mensaje
  if (!mapOrganizations || mapOrganizations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          <p className="text-lg">No hay organizaciones para mostrar</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      {/* Controles del mapa (solo con MapTiler) */}
      {usingMapTiler && (
        <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col space-y-2">
            {Object.entries(MAPTILER_CONFIG.STYLES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setMapStyle(value)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  mapStyle === value 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Información del mapa */}
      <div className="absolute top-4 right-4 z-[1000] bg-white bg-opacity-90 rounded-lg shadow-lg p-3">
        <p className="text-sm text-gray-700 font-medium">Mapa Interactivo</p>
        <p className="text-xs text-gray-500">Organizaciones: {mapOrganizations.length}</p>
        {usingMapTiler ? (
          <>
            <p className="text-xs text-gray-500">Estilo: {mapStyle}</p>
            <p className="text-xs text-gray-500">Powered by MapTiler</p>
            <button
              onClick={() => {
                try { localStorage.setItem("forceOSM", "1"); } catch (_) {}
                setUsingMapTiler(false);
              }}
              className="mt-2 px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Usar OpenStreetMap
            </button>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-500">Usando OpenStreetMap (sin API key)</p>
            <button
              onClick={() => {
                try { localStorage.removeItem("forceOSM"); } catch (_) {}
                setUsingMapTiler(isApiKeyConfigured());
              }}
              className="mt-2 px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Intentar MapTiler
            </button>
          </>
        )}
      </div>

      <MapContainer 
        center={mapConfig.CENTER} 
        zoom={mapConfig.ZOOM} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        minZoom={mapConfig.MIN_ZOOM}
        maxZoom={mapConfig.MAX_ZOOM}
      >
        <ZoomControl position="bottomright" />
        
        {usingMapTiler ? (
          <TileLayer
            url={getMapTilerUrl(mapStyle)}
            attribution={getMapTilerAttribution()}
            eventHandlers={{ tileerror: () => setUsingMapTiler(false) }}
          />
        ) : (
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        )}
        
        {mapOrganizations.map((org) => {
          // Verificar que las coordenadas sean válidas
          const lat = parseFloat(org.lat);
          const lng = parseFloat(org.lng);
          
          if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
            return null; // No mostrar marcadores con coordenadas inválidas
          }

          return (
            <Marker
              key={org.id}
              position={[lat, lng]}
              eventHandlers={{
                click: () => handleMarkerClick(org)
              }}
            >
              <Popup>
                <div className="p-3 min-w-[250px]">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{org.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Ciudad:</strong> {org.city}, {org.country}
                  </p>
                  {org.address && (
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Dirección:</strong> {org.address}
                    </p>
                  )}
                  {Array.isArray(org.ods) && org.ods.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-sm text-gray-700">ODS:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {org.ods.slice(0, 3).map((ods, index) => (
                          <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                            ODS {ods}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {Array.isArray(org.targetPopulation) && org.targetPopulation.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-sm text-gray-700">Población Objetivo:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {org.targetPopulation.slice(0, 2).map((pop, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {pop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => handleMarkerClick(org)}
                    className="w-full mt-3 bg-indigo-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Ver Detalles Completos
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Mapa;


