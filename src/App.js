import React, { useState, useEffect } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({});
  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: "Jóvenes por el Futuro",
      country: "Colombia",
      city: "Bogotá",
      address: "Calle 72 #13-45",
      ods: ["4", "5", "10"],
      socialObject: "Promover la educación y empoderamiento de jóvenes en zonas vulnerables",
      targetPopulation: ["Jóvenes", "Comunidades marginadas"],
      projects: [
        {
          title: "EducaJoven",
          description: "Programa de alfabetización digital para adolescentes",
          photos: ["https://placehold.co/300x200/6366f1/ffffff?text=EducaJoven"],
          documents: ["Plan estratégico 2024"]
        }
      ],
      contact: {
        email: "info@jovenesfuturo.org",
        phone: "+57 310 123 4567",
        website: "www.jovenesfuturo.org"
      },
      lat: 4.6097,
      lng: -74.0817
    },
    {
      id: 2,
      name: "Verde Joven",
      country: "Chile",
      city: "Santiago",
      ods: ["13", "14", "15"],
      socialObject: "Conservación ambiental y reforestación urbana",
      targetPopulation: ["Medioambiente", "Comunidades urbanas"],
      projects: [
        {
          title: "Reforestación Urbana",
          description: "Plantación de árboles nativos en áreas urbanas",
          photos: ["https://placehold.co/300x200/10b981/ffffff?text=VerdeJoven"],
          documents: ["Informe anual 2023"]
        }
      ],
      contact: {
        email: "contacto@verdejoven.cl",
        phone: "+56 9 8765 4321",
        website: "www.verdejoven.cl"
      },
      lat: -33.4489,
      lng: -70.6693
    },
    {
      id: 3,
      name: "Tecnología para Todos",
      country: "México",
      city: "Ciudad de México",
      ods: ["4", "9", "17"],
      socialObject: "Bridging the digital divide for underserved communities",
      targetPopulation: ["Niños", "Adultos mayores", "Personas con discapacidad"],
      projects: [
        {
          title: "Laboratorios Digitales",
          description: "Equipamiento de centros comunitarios con tecnología",
          photos: ["https://placehold.co/300x200/8b5cf6/ffffff?text=TecParaTodos"],
          documents: ["Propuesta de expansión"]
        }
      ],
      contact: {
        email: "hello@tecnoparatodos.mx",
        phone: "+52 55 1234 5678",
        website: "www.tecnoparatodos.mx"
      },
      lat: 19.4326,
      lng: -99.1332
    }
  ]);
  
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    ods: [],
    targetPopulation: []
  });
  const [showExtendedForm, setShowExtendedForm] = useState(false);

  const odsOptions = [
    "1. Fin de la pobreza",
    "2. Hambre cero",
    "3. Salud y bienestar",
    "4. Educación de calidad",
    "5. Igualdad de género",
    "6. Agua limpia y saneamiento",
    "7. Energía asequible y no contaminante",
    "8. Trabajo decente y crecimiento económico",
    "9. Industria, innovación e infraestructura",
    "10. Reducción de desigualdades",
    "11. Ciudades y comunidades sostenibles",
    "12. Producción y consumo responsables",
    "13. Acción por el clima",
    "14. Vida submarina",
    "15. Vida de ecosistemas terrestres",
    "16. Paz, justicia e instituciones sólidas",
    "17. Alianzas para lograr los objetivos"
  ];

  const targetPopulationOptions = [
    "Niños y adolescentes",
    "Jóvenes",
    "Adultos mayores",
    "Mujeres",
    "Personas con discapacidad",
    "Indígenas",
    "Comunidades marginadas",
    "Medioambiente",
    "Salud",
    "Educación",
    "Desarrollo económico"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? 
        checked ? [...(prev[name] || []), value] : (prev[name] || []).filter(v => v !== value) :
        value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "donor") {
      setCurrentPage("map");
    } else if (userType === "receiver") {
      const newOrg = {
        id: organizations.length + 1,
        ...formData,
        contact: {
          email: formData.email,
          phone: formData.phone,
          website: formData.website
        },
        lat: Math.random() * 20 - 10,
        lng: Math.random() * 40 - 70
      };
      setOrganizations([...organizations, newOrg]);
      setCurrentPage("map");
    }
  };

  const filteredOrganizations = organizations.filter(org => {
    return (!filters.country || org.country === filters.country) &&
           (!filters.city || org.city === filters.city) &&
           (filters.ods.length === 0 || filters.ods.some(ods => org.ods.includes(ods.split('.')[0]))) &&
           (filters.targetPopulation.length === 0 || 
            filters.targetPopulation.some(pop => org.targetPopulation.includes(pop)));
  });

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="font-bold text-xl">CooLab</span>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "home" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              Inicio
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "about" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              Quiénes Somos
            </button>
            <button
              onClick={() => setCurrentPage("services")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "services" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              Servicios
            </button>
            <button
              onClick={() => setCurrentPage("manuals")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "manuals" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              Manuales
            </button>
            <button
              onClick={() => setCurrentPage("community")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "community" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              Comunidad
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "contact" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const DonorForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registro de Donante</h2>
          <p className="text-gray-600">Únete a nuestra comunidad de impacto positivo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Tu nombre completo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono móvil</label>
            <input
              type="tel"
              name="phone"
              required
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="+57 300 123 4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
            <input
              type="text"
              name="country"
              required
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Tu país"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
            <input
              type="text"
              name="city"
              required
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Tu ciudad"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Registrarse y Acceder al Mapa
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setUserType(null)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );

  const ReceiverForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registro de Organización</h2>
          <p className="text-gray-600">Comparte tu impacto con la comunidad</p>
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowExtendedForm(false)}
            className={`px-6 py-3 rounded-l-lg font-medium transition-all ${
              !showExtendedForm 
                ? "bg-green-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Registro Básico
          </button>
          <button
            onClick={() => setShowExtendedForm(true)}
            className={`px-6 py-3 rounded-r-lg font-medium transition-all ${
              showExtendedForm 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Registro Extendido
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la organización</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Nombre de tu organización"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
              <input
                type="text"
                name="country"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="País"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
              <input
                type="text"
                name="city"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Ciudad"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección (opcional)</label>
              <input
                type="text"
                name="address"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Dirección completa"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ODS relacionados</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {odsOptions.slice(0, 8).map((ods) => (
                <label key={ods} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={ods}
                    onChange={handleInputChange}
                    name="ods"
                    className="text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{ods}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Objeto social</label>
            <textarea
              name="socialObject"
              required
              rows="3"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Describe la misión y propósito de tu organización"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Población objetivo</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {targetPopulationOptions.slice(0, 6).map((pop) => (
                <label key={pop} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={pop}
                    onChange={handleInputChange}
                    name="targetPopulation"
                    className="text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{pop}</span>
                </label>
              ))}
            </div>
          </div>
          
          {showExtendedForm && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Extendida</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Proyectos</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="projectTitle"
                      placeholder="Título del proyecto"
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      name="projectDescription"
                      placeholder="Descripción del proyecto"
                      rows="2"
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enlaces de fotos/videos</label>
                  <input
                    type="text"
                    name="mediaLinks"
                    placeholder="URL de fotos o videos"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Documentos adjuntos</label>
                  <input
                    type="text"
                    name="documents"
                    placeholder="Nombres de documentos importantes"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo de contacto</label>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="contacto@organizacion.org"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sitio web</label>
                  <input
                    type="url"
                    name="website"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="www.tuorganizacion.org"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Registrar Organización
            </button>
            <button
              type="button"
              onClick={() => setUserType(null)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const MapView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Filters */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
            <p className="text-sm text-gray-600">Refina tu búsqueda de organizaciones</p>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <select
                  value={filters.country}
                  onChange={(e) => setFilters({...filters, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Todos los países</option>
                  {[...new Set(organizations.map(o => o.country))].map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Todas las ciudades</option>
                  {[...new Set(organizations.map(o => o.city))].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ODS</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Población objetivo</label>
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
              {filteredOrganizations.length} organizaciones encontradas
            </p>
          </div>
        </div>
        
        {/* Map */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
            {/* Simulated map pins */}
            {filteredOrganizations.map((org) => (
              <div
                key={org.id}
                className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
                style={{
                  left: `${50 + (org.id - 1) * 15}%`,
                  top: `${30 + (org.id - 1) * 10}%`,
                }}
                onClick={() => setSelectedOrg(org)}
              >
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
              </div>
            ))}
          </div>
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
                    <span className="text-gray-600">Dirección: </span>
                    <span className="text-gray-900">{selectedOrg.address}</span>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium text-gray-700">ODS: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedOrg.ods.map(ods => (
                      <span key={ods} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                        ODS {ods}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-700">Población objetivo: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedOrg.targetPopulation.map(pop => (
                      <span key={pop} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {pop}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Objeto social</h3>
                  <p className="text-sm text-gray-900">{selectedOrg.socialObject}</p>
                </div>
                
                {selectedOrg.projects && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Proyectos</h3>
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
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Contacto</h3>
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
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
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
                <p className="text-lg">Selecciona una organización en el mapa para ver más detalles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Conectando </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 xl:inline">Impacto</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Plataforma innovadora que conecta donantes con organizaciones sociales, facilitando el impacto positivo en comunidades vulnerables y proyectos sostenibles.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => setUserType("donor")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-200"
                    >
                      Soy Donante
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => setUserType("receiver")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-200"
                    >
                      Soy Organización
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-tr from-blue-400 to-indigo-600 sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
            {/* Simulated map with pins */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm border border-white border-opacity-30 p-4">
                <div className="grid grid-cols-4 gap-4 h-full">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full relative">
                        <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Para Donantes</h3>
            <p className="text-gray-600">Regístrate fácilmente y descubre organizaciones confiables cerca de ti. Encuentra proyectos que alinean con tus intereses y valores.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Para Organizaciones</h3>
            <p className="text-gray-600">Presenta tu trabajo al mundo. Registra tu organización y muestra tus proyectos, impacto y necesidades de manera profesional.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mapa Interactivo</h3>
            <p className="text-gray-600">Explora organizaciones en un mapa intuitivo con filtros avanzados. Visualiza el impacto social y ambiental en tiempo real.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiénes Somos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            YouthImpact es una plataforma innovadora que conecta donantes con organizaciones sociales, 
            facilitando el impacto positivo en comunidades vulnerables y proyectos sostenibles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img src="https://placehold.co/600x400/6366f1/ffffff?text=YouthImpact+Team" alt="Team" className="rounded-2xl shadow-lg" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Misión</h2>
            <p className="text-lg text-gray-700">
              Crear un puente entre quienes desean hacer una diferencia y quienes están transformando realidades. 
              Creemos que el impacto social debe ser accesible, transparente y eficiente.
            </p>
            <p className="text-lg text-gray-700">
              Nuestra plataforma utiliza tecnología de vanguardia para conectar donantes con organizaciones 
              que trabajan en temas sociales, ambientales y de desarrollo comunitario.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nuestros Valores</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span>Transparencia en cada acción</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span>Impacto medible y verificable</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span>Innovación tecnológica al servicio del bien común</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span>Empoderamiento de las organizaciones sociales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestro Impacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Organizaciones registradas</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10,000+</div>
              <div className="text-gray-600">Donantes activos</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">30+</div>
              <div className="text-gray-600">Países conectados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Servicios Asociados</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una suite completa de servicios para potenciar el impacto de las organizaciones sociales y facilitar la conexión con donantes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Verificación de Organizaciones</h3>
            <p className="text-gray-600 mb-4">
              Proceso riguroso de verificación para garantizar la transparencia y confiabilidad de las organizaciones registradas.
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Validación documental</li>
              <li>• Auditoría de impacto</li>
              <li>• Certificación de buenas prácticas</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Herramientas de Gestión</h3>
            <p className="text-gray-600 mb-4">
              Plataforma integral para que las organizaciones gestionen sus proyectos, impacto y relaciones con donantes.
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Dashboard de impacto</li>
              <li>• Gestión de proyectos</li>
              <li>• Reportes automatizados</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Capacitación y Mentoría</h3>
            <p className="text-gray-600 mb-4">
              Programas de formación para fortalecer las capacidades de las organizaciones sociales en gestión, comunicación y sostenibilidad.
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Talleres virtuales</li>
              <li>• Mentoría especializada</li>
              <li>• Recursos educativos</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Financiamiento Colectivo</h3>
            <p className="text-gray-600 mb-4">
              Plataforma de crowdfunding especializada para proyectos sociales, con herramientas de marketing y seguimiento.
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Campañas personalizadas</li>
              <li>• Integración con redes sociales</li>
              <li>• Seguimiento de donaciones</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Comunidad y Networking</h3>
            <p className="text-gray-600 mb-4">
              Espacios de conexión entre organizaciones, donantes y expertos para fomentar la colaboración y el aprendizaje mutuo.
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Foros temáticos</li>
              <li>• Eventos virtuales</li>
              <li>• Grupos de interés</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Soporte Técnico</h3>
            <p className="text-gray-600 mb-4">
              Asistencia especializada para que las organizaciones aprovechen al máximo todas las funcionalidades de la plataforma.
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Soporte 24/7</li>
              <li>• Tutoriales personalizados</li>
              <li>• Implementación de soluciones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ManualsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Manuales y Guías</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recursos completos para aprovechar al máximo nuestra plataforma, tanto para donantes como para organizaciones.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Para Donantes</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Guía de Registro y Acceso</h3>
                <p className="text-gray-600 text-sm">Aprende a crear tu cuenta y comenzar a explorar organizaciones.</p>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 mt-2">Descargar PDF</button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Navegación por el Mapa</h3>
                <p className="text-gray-600 text-sm">Descubre cómo utilizar los filtros y explorar organizaciones.</p>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 mt-2">Descargar PDF</button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Evaluación de Organizaciones</h3>
                <p className="text-gray-600 text-sm">Guía para analizar el impacto y transparencia de las organizaciones.</p>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 mt-2">Descargar PDF</button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Seguridad en Donaciones</h3>
                <p className="text-gray-600 text-sm">Recomendaciones para donar de manera segura y efectiva.</p>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 mt-2">Descargar PDF</button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Para Organizaciones</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Registro y Verificación</h3>
                <p className="text-gray-600 text-sm">Pasos para completar tu registro y obtener la verificación.</p>
                <button className="text-green-600 text-sm font-medium hover:text-green-800 mt-2">Descargar PDF</button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Gestión de Perfil</h3>
                <p className="text-gray-600 text-sm">Cómo mantener tu información actualizada y atractiva.</p>
                <button className="text-green-600 text-sm font-medium hover:text-green-800 mt-2">Descargar PDF</button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Presentación de Proyectos</h3>
                <p className="text-gray-600 text-sm">Guía para crear descripciones efectivas de tus proyectos.</p>
                <button className="text-green-600 text-sm font-medium hover:text-green-800 mt-2">Descargar PDF</button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Herramientas de Impacto</h3>
                <p className="text-gray-600 text-sm">Cómo utilizar las herramientas de medición y reporte.</p>
                <button className="text-green-600 text-sm font-medium hover:text-green-800 mt-2">Descargar PDF</button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Campañas de Financiamiento</h3>
                <p className="text-gray-600 text-sm">Estrategias para crear campañas de crowdfunding exitosas.</p>
                <button className="text-green-600 text-sm font-medium hover:text-green-800 mt-2">Descargar PDF</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda adicional?</h2>
            <p className="mb-6">Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta.</p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CommunityPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Comunidad YouthImpact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Únete a una red global de personas y organizaciones comprometidas con el cambio positivo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eventos y Webinars</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Impacto Sostenible 2024</h3>
                  <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Próximo</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Conferencia anual sobre sostenibilidad y desarrollo comunitario</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>25-27 Marzo, 2024</span>
                  <span>•</span>
                  <span>Virtual</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Taller: Comunicación de Impacto</h3>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Abierto</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Aprende a contar tu historia de impacto de manera efectiva</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>15 Abril, 2024</span>
                  <span>•</span>
                  <span>Virtual</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Encuentro Regional: América Latina</h3>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Inscripción</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Reunión presencial para organizaciones de la región</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>10-12 Mayo, 2024</span>
                  <span>•</span>
                  <span>Bogotá, Colombia</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Grupos de Interés</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Medioambiente y Sostenibilidad</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">Conecta con organizaciones y donantes interesados en temas ambientales.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">1,247 miembros</span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">Unirse</button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Educación y Juventud</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">Espacio para proyectos educativos y empoderamiento juvenil.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">892 miembros</span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">Unirse</button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Salud y Bienestar</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">Comunidad para iniciativas de salud comunitaria y bienestar.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">654 miembros</span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">Unirse</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Testimonios de la Comunidad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <img src="https://placehold.co/60x60/6366f1/ffffff?text=J" alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">Juan Pérez</h4>
                  <p className="text-sm text-gray-600">Donante, Colombia</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "YouthImpact me permitió encontrar organizaciones reales que están haciendo una diferencia tangible en mi comunidad. La transparencia y el seguimiento de impacto son excelentes."
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <img src="https://placehold.co/60x60/10b981/ffffff?text=M" alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">María González</h4>
                  <p className="text-sm text-gray-600">Directora, México</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "Desde que estamos en YouthImpact, hemos aumentado nuestras donaciones en un 300%. La plataforma nos ha dado visibilidad y credibilidad ante nuevos donantes."
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <img src="https://placehold.co/60x60/8b5cf6/ffffff?text=C" alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">Carlos Rodríguez</h4>
                  <p className="text-sm text-gray-600">Voluntario, Chile</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "Lo que más me gusta es la comunidad. Puedo conectarme con otras personas que comparten mis valores y trabajar juntos en proyectos de impacto."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos para cualquier pregunta, sugerencia o colaboración.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Asunto del mensaje"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                  <p className="text-gray-600">Av. Innovación 1234<br />Edificio TechHub, Piso 15<br />Ciudad Tecnológica, 12345</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                  <p className="text-gray-600">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Correo Electrónico</h3>
                  <p className="text-gray-600">info@youthimpact.org<br />soporte@youthimpact.org<br />colaboraciones@youthimpact.org</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Horario de Atención</h3>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM<br />Sábados: 10:00 AM - 2:00 PM<br />Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preguntas Frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">¿Cómo me registro como donante?</h3>
              <p className="text-gray-600 text-sm">
                Haz clic en "Soy Donante" en la página principal y completa el formulario básico con tu información personal.
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">¿Qué organizaciones pueden registrarse?</h3>
              <p className="text-gray-600 text-sm">
                Cualquier organización sin fines de lucro que trabaje en temas sociales, ambientales o de desarrollo comunitario.
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">¿Es segura la plataforma?</h3>
              <p className="text-gray-600 text-sm">
                Sí, utilizamos encriptación de última generación y seguimos las mejores prácticas de seguridad de datos.
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">¿Cómo contacto a una organización?</h3>
              <p className="text-gray-600 text-sm">
                Puedes usar los datos de contacto que aparecen en el perfil de cada organización en el mapa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (userType === "donor") {
    return <DonorForm />;
  }
  
  if (userType === "receiver") {
    return <ReceiverForm />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      {currentPage === "home" && <HomePage />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "services" && <ServicesPage />}
      {currentPage === "manuals" && <ManualsPage />}
      {currentPage === "community" && <CommunityPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "map" && <MapView />}
    </div>
  );
};

export default App;