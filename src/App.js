import React, { useState } from "react";

// Importar todos los archivos de traducción
import es from "./languages/es.json";
import en from "./languages/en.json";
import pt from "./languages/pt.json";
import fr from "./languages/fr.json";
import it from "./languages/it.json";
import ja from "./languages/ja.json";
import ru from "./languages/ru.json";
import ko from "./languages/ko.json";
import zh from "./languages/zh.json";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState("es"); // Idioma por defecto

  // Diccionario de traducciones
  const translations = { es, en, pt, fr, it, ja, ru, ko, zh };
  const t = translations[language]; // Atajo para usar traducciones

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
    "Niños Niñas y Adolescentes",
    "Jóvenes",
    "Adult@s mayores",
    "Mujeres",
    "Personas con discapacidad",
    "Indígenas",
    "Campesin@s",
    "Medioambiente",
    "Animales",
    "Energías Renovables",
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
    const countryMatch = !filters.country || org.country === filters.country;
    const cityMatch = !filters.city || org.city === filters.city;
    
    const odsMatch = filters.ods.length === 0 || 
      filters.ods.some(filterOds => {
        const odsNumber = filterOds.split('.')[0];
        return org.ods.includes(odsNumber);
      });
    
    const populationMatch = filters.targetPopulation.length === 0 || 
      filters.targetPopulation.some(pop => org.targetPopulation.includes(pop));
    
    return countryMatch && cityMatch && odsMatch && populationMatch;
  });

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="font-bold text-3xl">CooLab</span>
            </div>
          </div>
          <div className="flex items-center space-x-10">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${currentPage === "home" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              {t.home}
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${currentPage === "about" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              {t.about}
            </button>
            <button
              onClick={() => setCurrentPage("services")}
              className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${currentPage === "services" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              {t.services}
            </button>
            <button
              onClick={() => setCurrentPage("manuals")}
              className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${currentPage === "manuals" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              {t.manuals}
            </button>
            <button
              onClick={() => setCurrentPage("community")}
              className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${currentPage === "community" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              {t.community}
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${currentPage === "contact" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
            >
              {t.contact}
            </button>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border border-white border-opacity-30 rounded-md px-4 py-2 text-base focus:outline-none"
              >
                <option value="es">🇪🇸 {t.select_language}</option>
                <option value="en">🇬🇧 English</option>
                <option value="pt">🇵🇹 Português</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="it">🇮🇹 Italiano</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="zh">🇨🇳 中文</option>
              </select>
            </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.donor_title}</h2>
          <p className="text-gray-600">{t.donor} {t.welcome.toLowerCase()}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder={t.name}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Intereses</label>
            <select
              name="interests"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="">Selecciona tus intereses</option>
              <option value="educacion">Educación</option>
              <option value="medioambiente">Medio Ambiente</option>
              <option value="salud">Salud</option>
              <option value="tecnologia">Tecnología</option>
              <option value="desarrollo">Desarrollo Comunitario</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {t.donor} → {t.map_view}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setUserType(null)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            ← {t.home}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.receiver_title}</h2>
          <p className="text-gray-600">{t.receiver} {t.welcome.toLowerCase()}</p>
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
            {t.basic}
          </button>
          <button
            onClick={() => setShowExtendedForm(true)}
            className={`px-6 py-3 rounded-r-lg font-medium transition-all ${
              showExtendedForm 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.extended}
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder={t.name}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.country}</label>
              <input
                type="text"
                name="country"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder={t.country}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.city}</label>
              <input
                type="text"
                name="city"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder={t.city}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.address}</label>
              <input
                type="text"
                name="address"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder={t.address}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.ods}</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.social_object}</label>
            <textarea
              name="socialObject"
              required
              rows="3"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder={t.social_object}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.target_population}</label>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.projects}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.projects}</label>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact_info}</label>
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
              {t.receiver} → {t.map_view}
            </button>
            <button
              type="button"
              onClick={() => setUserType(null)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {t.home}
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
        
        {/* Map */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
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

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                  <span className="block mb-1">Laboratorio de Cooperación</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">- CooLab</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Plataforma innovadora que conecta donantes con organizaciones sociales, facilitando el impacto positivo en comunidades vulnerables y proyectos sostenibles en América Latina y el Mundo.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => setUserType("donor")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-200"
                    >
                      {t.donor}
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => setUserType("receiver")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-200"
                    >
                      {t.receiver}
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
              backgroundImage: `url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow hover:scale-105 transition-transform duration-200 feature-card">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.donor}</h3>
            <p className="text-gray-600 mb-4">Regístrate fácilmente y descubre organizaciones confiables cerca de ti. Encuentra proyectos que se alineen con tus intereses y valores sociales.</p>
            <button
              onClick={() => setUserType("donor")}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md feature-card-button"
            >
              Registrarse como Donante
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow hover:scale-105 transition-transform duration-200 feature-card">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.receiver}</h3>
            <p className="text-gray-600 mb-4">Presenta tu trabajo al mundo. Registra tu organización y muestra tus proyectos, impacto social y necesidades de manera profesional y atractiva.</p>
            <button
              onClick={() => setUserType("receiver")}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-md feature-card-button"
            >
              Registrar Organización
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow hover:scale-105 transition-transform duration-200 feature-card">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.map_view}</h3>
            <p className="text-gray-600 mb-4">Explora organizaciones en un mapa intuitivo con filtros avanzados por ODS, población objetivo y ubicación. Visualiza el impacto social y ambiental en tiempo real.</p>
            <button
              onClick={() => setCurrentPage("map")}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-md feature-card-button"
            >
              Explorar Mapa
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Sección de enlaces adicionales */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Descubre Más de CooLab</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button
              onClick={() => setCurrentPage("about")}
              className="group p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg link-card"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform link-card-icon">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Acerca de</h3>
              <p className="text-sm text-gray-600">Conoce nuestra misión y visión</p>
            </button>
            
            <button
              onClick={() => setCurrentPage("services")}
              className="group p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg link-card"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform link-card-icon">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Servicios</h3>
              <p className="text-sm text-gray-600">Explora nuestras soluciones</p>
            </button>
            
            <button
              onClick={() => setCurrentPage("manuals")}
              className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg link-card"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform link-card-icon">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manuales</h3>
              <p className="text-sm text-gray-600">Guías y recursos útiles</p>
            </button>
            
            <button
              onClick={() => setCurrentPage("community")}
              className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg link-card"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform link-card-icon">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidad</h3>
              <p className="text-sm text-gray-600">Únete a nuestra red</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Las páginas About, Services, etc. también usarían `t.key` para traducir textos
  // (Por brevedad, no se incluyen todas las traducciones aquí)

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.about}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CooLab es una plataforma innovadora que conecta donantes con organizaciones sociales en América Latina y el Mundo, 
            facilitando el impacto positivo en comunidades vulnerables y proyectos sostenibles. Nuestra misión es crear 
            puentes de colaboración para un futuro más justo y sostenible.
          </p>
        </div>
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.services}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una suite completa de servicios para potenciar el impacto de las organizaciones sociales y facilitar 
            la conexión con donantes. Desde herramientas de gestión hasta visibilidad internacional, todo diseñado para 
            maximizar tu impacto social.
          </p>
        </div>
      </div>
    </div>
  );

  const ManualsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.manuals}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recursos completos para aprovechar al máximo nuestra plataforma, tanto para donantes como para organizaciones. 
            Guías paso a paso, mejores prácticas y casos de éxito para maximizar tu impacto en la comunidad.
          </p>
        </div>
      </div>
    </div>
  );

  const CommunityPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.community}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Únete a una red global de personas y organizaciones comprometidas con el cambio positivo. Conecta con 
            líderes sociales, comparte experiencias y colabora en proyectos que transforman comunidades en toda América Latina.
          </p>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => {
    const [contactForm, setContactForm] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleContactSubmit = (e) => {
      e.preventDefault();
      // Aquí se implementaría la lógica para enviar el correo
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    };

    const handleContactChange = (e) => {
      setContactForm({
        ...contactForm,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.contact}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos para cualquier pregunta, sugerencia o colaboración. Nuestro equipo 
              está comprometido con tu éxito y el impacto positivo en las comunidades que servimos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario de Contacto */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Cuéntanos más detalles..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
            
            {/* Información de Contacto y Redes Sociales */}
            <div className="space-y-8">
              {/* Información de Contacto */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">contacto@coo-lab.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Teléfono</p>
                      <p className="text-gray-600">+57 300 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ubicación</p>
                      <p className="text-gray-600">Bogotá, Colombia</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Redes Sociales */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Síguenos en Redes Sociales</h2>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://linkedin.com/company/coo-lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  >
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="font-medium text-blue-600 group-hover:text-blue-700">LinkedIn</span>
                  </a>
                  
                  <a
                    href="https://twitter.com/coo_lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 p-4 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors group"
                  >
                    <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <span className="font-medium text-sky-500 group-hover:text-sky-600">Twitter</span>
                  </a>
                  
                  <a
                    href="https://instagram.com/coo_lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
                  >
                    <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.49.49-1.141.807-1.892.807-.751 0-1.402-.317-1.892-.807-.49-.49-.807-1.141-.807-1.892s.317-1.402.807-1.892c.49-.49 1.141-.807 1.892-.807.751 0 1.402.317 1.892.807.49.49.807 1.141.807 1.892s-.317 1.402-.807 1.892z"/>
                    </svg>
                    <span className="font-medium text-pink-500 group-hover:text-pink-600">Instagram</span>
                  </a>
                  
                  <a
                    href="https://youtube.com/@coo-lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
                  >
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="font-medium text-red-600 group-hover:text-red-700">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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