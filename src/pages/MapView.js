import React from 'react';
import Mapa from '../components/Mapa';
import { odsOptions } from '../constants/odsOptions';
import { targetPopulationOptions } from '../constants/targetPopulations';

/**
 * Página de vista de mapa con organizaciones
 * @param {Object} props
 * @param {Array} props.organizations - Lista de organizaciones
 * @param {Array} props.filteredOrganizations - Lista de organizaciones filtradas
 * @param {Object} props.selectedOrg - Organización seleccionada
 * @param {Function} props.setSelectedOrg - Función para seleccionar organización
 * @param {Object} props.filters - Filtros actuales
 * @param {Function} props.setFilters - Función para establecer filtros
 * @param {Object} props.translations - Objeto con las traducciones (t)
 */
const MapView = ({ 
  organizations, 
  filteredOrganizations, 
  selectedOrg, 
  setSelectedOrg, 
  filters, 
  setFilters, 
  translations: t 
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="flex h-screen">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{t.ods}</h2>
          <p className="text-sm text-gray-600">{t.target_population}</p>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.country}</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({...filters, country: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">{t.country}</option>
                {[...new Set(organizations.map(o => o.country))].map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.city}</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">{t.city}</option>
                {[...new Set(organizations.map(o => o.city))].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.ods}</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {odsOptions.slice(0, 8).map((ods) => (
                  <label key={ods} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.ods.includes(ods)}
                      onChange={(e) => {
                        const newOds = e.target.checked 
                          ? [...filters.ods, ods] 
                          : filters.ods.filter(o => o !== ods);
                        setFilters({...filters, ods: newOds});
                      }}
                      className="text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{ods}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.target_population}</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {targetPopulationOptions.slice(0, 6).map((pop) => (
                  <label key={pop} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.targetPopulation.includes(pop)}
                      onChange={(e) => {
                        const newPop = e.target.checked 
                          ? [...filters.targetPopulation, pop] 
                          : filters.targetPopulation.filter(p => p !== pop);
                        setFilters({...filters, targetPopulation: newPop});
                      }}
                      className="text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{pop}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {filteredOrganizations.length} {t.receiver.toLowerCase()} {t.found?.toLowerCase() || "found"}
          </p>
        </div>
      </div>
      
      {/* Map - Leaflet */}
      <div className="flex-1 relative">
        <Mapa
          organizations={filteredOrganizations}
          setSelectedOrg={setSelectedOrg}
          selectedOrg={selectedOrg}
        />
      </div>
      
      {/* Right Sidebar - Organization Details */}
      <div className="w-96 bg-white shadow-lg border-l border-gray-200 flex flex-col">
        {selectedOrg ? (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedOrg.name}</h2>
              <button
                onClick={() => setSelectedOrg(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>{selectedOrg.city}, {selectedOrg.country}</span>
              </div>
              
              {selectedOrg.address && (
                <div className="text-sm">
                  <span className="text-gray-600">{t.address}: </span>
                  <span className="text-gray-900">{selectedOrg.address}</span>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-700">{t.ods}: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedOrg.ods.map(ods => (
                    <span key={ods} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      ODS {ods}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-700">{t.target_population}: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedOrg.targetPopulation.map(pop => (
                    <span key={pop} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {pop}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t.social_object}</h3>
                <p className="text-sm text-gray-900">{selectedOrg.socialObject}</p>
              </div>
              
              {selectedOrg.projects && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{t.projects}</h3>
                  <div className="space-y-3">
                    {selectedOrg.projects.map((project, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">{project.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                        {project.photos && (
                          <div className="mt-2 grid grid-cols-2 gap-1">
                            {project.photos.map((photo, i) => (
                              <img key={i} src={photo} alt={project.title} className="w-full h-16 object-cover rounded" />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">{t.contact_info}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>{selectedOrg.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>{selectedOrg.contact.phone}</span>
                  </div>
                  {selectedOrg.contact.website && (
                    <div className="flex items-center space-x-2 text-sm">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                      </svg>
                      <a href={selectedOrg.contact.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                        {selectedOrg.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              <p className="text-lg">{t.select_org || "Selecciona una organización en el mapa"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default MapView;