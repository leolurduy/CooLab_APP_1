import React, { useState, useEffect } from "react";
import { cargarOrganizaciones, testSupabaseConnection, crearOrganizacion, actualizarOrganizacion } from "./lib/supabaseClient";
import Navigation from "./components/common/Navigation";
import { odsOptions } from "./constants/odsOptions";
import { targetPopulationOptions } from "./constants/targetPopulations";

// Importar páginas
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ManualsPage from "./pages/ManualsPage";
import CommunityPage from "./pages/CommunityPage";
import ContactPage from "./pages/ContactPage";
import MapView from "./pages/MapView";

// Importar formularios
import DonorForm from "./components/forms/DonorForm";

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
  const [userProfile, setUserProfile] = useState({ name: "", email: "", phone: "", role: "user" });

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
  
  // Carga inicial desde Supabase sin romper el fallback local
  useEffect(() => {
    (async () => {
      try {
        const data = await cargarOrganizaciones();
        if (Array.isArray(data) && data.length > 0) {
          setOrganizations(data);
        }
      } catch (err) {
        console.error("No se pudieron cargar organizaciones de Supabase:", err);
      }
    })();
  }, []);

  // Estado y verificación de conexión con Supabase
  const [supabaseStatus, setSupabaseStatus] = useState({ ok: null, count: null, error: null });
  useEffect(() => {
    (async () => {
      try {
        const result = await testSupabaseConnection();
        setSupabaseStatus({ ok: !!result.ok, count: result.count ?? null, error: result.ok ? null : result.error });
      } catch (error) {
        setSupabaseStatus({ ok: false, count: null, error });
      }
    })();
  }, []);

  const handleRefreshFromSupabase = async () => {
    try {
      const data = await cargarOrganizaciones();
      if (Array.isArray(data) && data.length > 0) {
        setOrganizations(data);
      }
      const result = await testSupabaseConnection();
      setSupabaseStatus({ ok: !!result.ok, count: result.count ?? null, error: result.ok ? null : result.error });
    } catch (error) {
      console.error("Error refrescando desde Supabase:", error);
    }
  };
  
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    ods: [],
    targetPopulation: []
  });
  const [showExtendedForm, setShowExtendedForm] = useState(false);

  // Las constantes ahora se importan desde archivos separados

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? 
        checked ? [...(prev[name] || []), value] : (prev[name] || []).filter(v => v !== value) :
        value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === "donor") {
      setCurrentPage("map");
    } else if (userType === "receiver") {
      const social = {
        linkedin: formData.social_linkedin || "",
        tiktok: formData.social_tiktok || "",
        instagram: formData.social_instagram || "",
        facebook: formData.social_facebook || "",
        x: formData.social_x || "",
        whatsapp: formData.social_whatsapp || "",
      };
      const newOrg = {
        id: organizations.length + 1,
        ...formData,
        contact: {
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          social
        },
        lat: Math.random() * 20 - 10,
        lng: Math.random() * 40 - 70
      };
      try {
        const saved = await crearOrganizacion(newOrg);
        if (saved) {
          setOrganizations([...organizations, saved]);
        } else {
      setOrganizations([...organizations, newOrg]);
        }
      } catch (_) {
        setOrganizations([...organizations, newOrg]);
      }
      setCurrentPage("dashboard");
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

  // Editor de lista de proyectos (añadir/eliminar)
  const ProjectListEditor = ({ onChange }) => {
    const [projects, setProjects] = useState([
      { title: "", description: "", city: "", address: "", beneficiaries: { direct: { men: "", women: "" }, indirect: { men: "", women: "" } }, photos: [], videos: [] }
    ]);

    const update = (next) => {
      setProjects(next);
      if (typeof onChange === 'function') onChange(next);
    };

    const addProject = () => update([...projects, { title: "", description: "", city: "", address: "", beneficiaries: { direct: { men: "", women: "" }, indirect: { men: "", women: "" } }, photos: [], videos: [] }]);
    const removeProject = (idx) => update(projects.filter((_, i) => i !== idx));
    const handleField = (idx, field, value) => {
      const next = projects.map((p, i) => (i === idx ? { ...p, [field]: value } : p));
      update(next);
    };

    const addMediaUrl = (idx, kind) => {
      const url = prompt(kind === 'photos' ? 'URL de imagen (png/jpg/webp)' : 'URL de video (mp4/webm/ogg)');
      if (!url) return;
      const next = projects.map((p, i) => (
        i === idx ? { ...p, [kind]: [...(p[kind] || []), url] } : p
      ));
      update(next);
    };
    const removeMediaAt = (idx, kind, mIdx) => {
      const next = projects.map((p, i) => (
        i === idx ? { ...p, [kind]: p[kind].filter((_, j) => j !== mIdx) } : p
      ));
      update(next);
    };

    return (
      <div className="space-y-4">
        {projects.map((p, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título del proyecto</label>
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => handleField(idx, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej. Laboratorio Digital"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <input
                  type="text"
                  value={p.description}
                  onChange={(e) => handleField(idx, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Resumen breve del proyecto"
                />
              </div>
            </div>
            {/* Ubicación del proyecto */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <input type="text" value={p.country || ''} onChange={(e)=>handleField(idx,'country',e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="País" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad/Municipio</label>
                <input type="text" value={p.city || ''} onChange={(e)=>handleField(idx,'city',e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ciudad" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input type="text" value={p.address || ''} onChange={(e)=>handleField(idx,'address',e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Dirección" />
              </div>
            </div>

            {/* Beneficiarios */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded border">
                <span className="block text-sm font-medium text-gray-700 mb-2">Beneficiarios Directos</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" min="0" placeholder="Hombres" value={p.beneficiaries?.direct?.men || ''} onChange={(e)=>{
                    const val = e.target.value; const next = { ...p.beneficiaries, direct: { ...(p.beneficiaries?.direct||{}), men: val } }; handleField(idx,'beneficiaries',next);
                  }} className="px-3 py-2 border rounded" />
                  <input type="number" min="0" placeholder="Mujeres" value={p.beneficiaries?.direct?.women || ''} onChange={(e)=>{
                    const val = e.target.value; const next = { ...p.beneficiaries, direct: { ...(p.beneficiaries?.direct||{}), women: val } }; handleField(idx,'beneficiaries',next);
                  }} className="px-3 py-2 border rounded" />
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded border">
                <span className="block text-sm font-medium text-gray-700 mb-2">Beneficiarios Indirectos</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" min="0" placeholder="Hombres" value={p.beneficiaries?.indirect?.men || ''} onChange={(e)=>{
                    const val = e.target.value; const next = { ...p.beneficiaries, indirect: { ...(p.beneficiaries?.indirect||{}), men: val } }; handleField(idx,'beneficiaries',next);
                  }} className="px-3 py-2 border rounded" />
                  <input type="number" min="0" placeholder="Mujeres" value={p.beneficiaries?.indirect?.women || ''} onChange={(e)=>{
                    const val = e.target.value; const next = { ...p.beneficiaries, indirect: { ...(p.beneficiaries?.indirect||{}), women: val } }; handleField(idx,'beneficiaries',next);
                  }} className="px-3 py-2 border rounded" />
                </div>
              </div>
            </div>

            {/* Media editor */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Fotos (URLs)</label>
                  <button type="button" onClick={() => addMediaUrl(idx, 'photos')} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Añadir foto</button>
                </div>
                <div className="space-y-2">
                  {(p.photos || []).map((url, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img src={url} alt="foto" className="w-10 h-10 object-cover rounded" onError={(e)=>{e.currentTarget.style.display='none'}} />
                        <span className="truncate mr-2 max-w-[220px]">{url}</span>
                      </div>
                      <button type="button" onClick={() => removeMediaAt(idx, 'photos', mIdx)} className="px-2 py-0.5 bg-red-50 text-red-600 rounded hover:bg-red-100">Quitar</button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Videos (URLs)</label>
                  <button type="button" onClick={() => addMediaUrl(idx, 'videos')} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Añadir video</button>
                </div>
                <div className="space-y-2">
                  {(p.videos || []).map((url, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <video className="w-14 h-10 rounded" src={url} onError={(e)=>{e.currentTarget.style.display='none'}} />
                        <span className="truncate mr-2 max-w-[220px]">{url}</span>
                      </div>
                      <button type="button" onClick={() => removeMediaAt(idx, 'videos', mIdx)} className="px-2 py-0.5 bg-red-50 text-red-600 rounded hover:bg-red-100">Quitar</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => removeProject(idx)}
                className="px-3 py-1 text-sm rounded bg-red-50 text-red-600 hover:bg-red-100"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Añadir proyecto
          </button>
        </div>
      </div>
    );
  };

  // Navigation component ahora se importa desde un archivo separado

  // DonorForm extraída a archivo separado

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
          <p className="text-gray-700 text-sm">Es obligatorio el formulario Básico, pero para mayor visibilidad sugerimos el formulario extendido</p>
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowExtendedForm(false)}
            className={`px-8 py-4 text-base rounded-l-lg font-medium transition-all ${
              !showExtendedForm 
                ? "bg-green-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.basic}
          </button>
          <button
            onClick={() => setShowExtendedForm(true)}
            className={`px-8 py-4 text-base rounded-r-lg font-medium transition-all ${
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.name} <span className="text-red-600">*</span></label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.country} <span className="text-red-600">*</span></label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.city} <span className="text-red-600">*</span></label>
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
            {/* Persona de contacto (obligatoria) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Persona de contacto <span className="text-red-600">*</span></label>
              <input
                type="text"
                name="contactPerson"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Nombre de la persona de contacto"
              />
          </div>
            {/* Cargo (opcional) */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                  <input
                type="text"
                name="contactRole"
                    onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Cargo o rol"
              />
            </div>
            {/* Email obligatorio (básico) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.email} <span className="text-red-600">*</span></label>
              <input
                type="email"
                name="email"
                required
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="contacto@organizacion.org"
              />
            </div>
            {/* Teléfono obligatorio (básico) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
              <input
                type="tel"
                name="phone"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="+57 300 123 4567"
              />
            </div>
            {/* Sitio web obligatorio (básico) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sitio web</label>
              <input
                type="url"
                name="website"
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="www.tuorganizacion.org"
              />
            </div>
          </div>
          
          {/* Objeto social (obligatorio, máximo 50 palabras) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.social_object} (máximo 50 palabras) <span className="text-red-600">*</span></label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">ODS Relacionados (múltiple)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-72 overflow-y-auto">
              {odsOptions.map((ods) => (
                <label key={ods} className="flex items-center space-x-2 text-sm">
                  <span className="inline-flex w-4 h-4 bg-indigo-200 rounded-sm items-center justify-center">
                    <svg className="w-3 h-3 text-indigo-700" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg>
                  </span>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Temáticas de Interés (múltiple)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-72 overflow-y-auto">
              {targetPopulationOptions.map((pop) => (
                <label key={pop} className="flex items-center space-x-2 text-sm">
                  <span className="inline-flex w-4 h-4 bg-green-200 rounded-sm items-center justify-center">
                    <svg className="w-3 h-3 text-green-700" viewBox="0 0 20 20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="2"/></svg>
                  </span>
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
              
              <ProjectListEditor onChange={(projects) => setFormData(prev => ({ ...prev, projects }))} />
              
              <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn (URL)</label>
                    <input
                    type="url"
                    name="social_linkedin"
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.linkedin.com/company/tu-organizacion"
                  />
                  {/* Redes sociales opcionales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">TikTok (URL)</label>
                      <input type="url" name="social_tiktok" onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="https://www.tiktok.com/@tuorganizacion" />
                  </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (URL)</label>
                      <input type="url" name="social_instagram" onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="https://instagram.com/tuorganizacion" />
                </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook (URL)</label>
                      <input type="url" name="social_facebook" onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="https://facebook.com/tuorganizacion" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">X/Twitter (URL)</label>
                      <input type="url" name="social_x" onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="https://twitter.com/tuorganizacion" />
                  </div>
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (URL de invitación)</label>
                      <input type="url" name="social_whatsapp" onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="https://wa.me/+573001234567" />
                    </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Finalizar formulario - Ir a perfil
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

  // MapView extraída a archivo separado

  // HomePage extraída a archivo separado

  // Páginas extraídas a archivos separados

  // Dashboard: perfiles de usuario y organización
  const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('user'); // 'user' | 'org'
    const [editableUser, setEditableUser] = useState(userProfile);
    const [editableOrg, setEditableOrg] = useState(() => {
      // Si hay una org seleccionada, usar esa; sino, primera org del estado como placeholder
      return organizations[0] || {
        name: '', country: '', city: '', address: '', contactPerson: '', contactRole: '',
        ods: [], targetPopulation: [], socialObject: '', contact: { email: '', phone: '', website: '', social: { linkedin: '', tiktok: '', instagram: '', facebook: '', x: '', whatsapp: '' } },
        projects: [], lat: 0, lng: 0
      };
    });

    const saveUser = () => {
      setUserProfile(editableUser);
      alert('Perfil de usuario actualizado');
    };
    const deleteUser = () => {
      const ok = window.confirm('¿Eliminar tu perfil de usuario? Esta acción no se puede deshacer.');
      if (!ok) return;
      setUserProfile({ name: '', email: '', phone: '', role: 'user' });
      alert('Perfil de usuario eliminado');
    };

    const saveOrg = async () => {
      // Actualizar la primera organización como ejemplo; idealmente usar auth/orgId
      if (!editableOrg || !editableOrg.name) {
        alert('Completa al menos el nombre de la organización');
        return;
      }
      const next = [...organizations];
      if (next.length > 0) {
        next[0] = { ...next[0], ...editableOrg };
      } else {
        next.push({ id: 1, ...editableOrg });
      }
      setOrganizations(next);
      try {
        if (editableOrg.id) {
          await actualizarOrganizacion(editableOrg.id, editableOrg);
        }
      } catch (_) {}
      alert('Organización actualizada');
    };
    const deleteOrgProject = (idx) => {
      const next = { ...editableOrg, projects: (editableOrg.projects || []).filter((_, i) => i !== idx) };
      setEditableOrg(next);
    };
    const addOrgProject = () => {
      const next = { ...editableOrg, projects: [...(editableOrg.projects || []), { title: '', description: '', photos: [], videos: [] }] };
      setEditableOrg(next);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Panel de Usuario</h1>

          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex space-x-2">
            <button onClick={() => setActiveTab('user')} className={`px-4 py-2 rounded ${activeTab==='user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Perfil de Usuario</button>
            <button onClick={() => setActiveTab('org')} className={`px-4 py-2 rounded ${activeTab==='org' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Perfil de Organización</button>
          </div>

          {activeTab === 'user' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableUser.name} onChange={(e)=>setEditableUser({...editableUser,name:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableUser.email} onChange={(e)=>setEditableUser({...editableUser,email:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableUser.phone} onChange={(e)=>setEditableUser({...editableUser,phone:e.target.value})} />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={deleteUser} className="px-4 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100">Eliminar perfil</button>
                <button onClick={saveUser} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Guardar</button>
              </div>
            </div>
          )}

          {activeTab === 'org' && (
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.name} onChange={(e)=>setEditableOrg({...editableOrg,name:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.country} onChange={(e)=>setEditableOrg({...editableOrg,country:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.city} onChange={(e)=>setEditableOrg({...editableOrg,city:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.address} onChange={(e)=>setEditableOrg({...editableOrg,address:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Persona de contacto</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.contactPerson || ''} onChange={(e)=>setEditableOrg({...editableOrg,contactPerson:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.contactRole || ''} onChange={(e)=>setEditableOrg({...editableOrg,contactRole:e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objeto Social</label>
                <textarea className="w-full px-4 py-2 border rounded" rows={3} value={editableOrg.socialObject} onChange={(e)=>setEditableOrg({...editableOrg,socialObject:e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.contact?.email || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,email:e.target.value}})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.contact?.phone || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,phone:e.target.value}})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sitio web</label>
                  <input className="w-full px-4 py-2 border rounded" value={editableOrg.contact?.website || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,website:e.target.value}})} />
                </div>
              </div>

              {/* ODS y Temáticas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ODS Relacionados (múltiple)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {odsOptions.map((ods) => (
                      <label key={ods} className="flex items-center space-x-2 text-sm">
                        <span className="inline-flex w-4 h-4 bg-indigo-200 rounded-sm items-center justify-center">
                          <svg className="w-3 h-3 text-indigo-700" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg>
                        </span>
                        <input
                          type="checkbox"
                          checked={(editableOrg.ods||[]).includes(ods.split('.')[0]) || (editableOrg.ods||[]).includes(ods)}
                          onChange={(e)=>{
                            const base = Array.isArray(editableOrg.ods)? [...editableOrg.ods]:[];
                            const key = ods.split('.')[0];
                            const next = e.target.checked ? [...base.filter(v=>v!==ods && v!==key), key] : base.filter(v=>v!==ods && v!==key);
                            setEditableOrg({...editableOrg, ods: next});
                          }}
                          className="text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">{ods}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temáticas de Interés (múltiple)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {targetPopulationOptions.map((topic) => (
                      <label key={topic} className="flex items-center space-x-2 text-sm">
                        <span className="inline-flex w-4 h-4 bg-green-200 rounded-sm items-center justify-center">
                          <svg className="w-3 h-3 text-green-700" viewBox="0 0 20 20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="2"/></svg>
                        </span>
                        <input
                          type="checkbox"
                          checked={(editableOrg.targetPopulation||[]).includes(topic)}
                          onChange={(e)=>{
                            const base = Array.isArray(editableOrg.targetPopulation)? [...editableOrg.targetPopulation]:[];
                            const next = e.target.checked ? [...base, topic] : base.filter(v=>v!==topic);
                            setEditableOrg({...editableOrg, targetPopulation: next});
                          }}
                          className="text-green-600 rounded focus:ring-green-500"
                        />
                        <span className="text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="border-t pt-4">
                <h3 className="text-md font-semibold text-gray-900 mb-3">Redes sociales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.linkedin || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),linkedin:e.target.value}}})} placeholder="https://www.linkedin.com/company/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                    <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.instagram || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),instagram:e.target.value}}})} placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                    <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.facebook || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),facebook:e.target.value}}})} placeholder="https://facebook.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">X / Twitter</label>
                    <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.x || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),x:e.target.value}}})} placeholder="https://twitter.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                    <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.tiktok || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),tiktok:e.target.value}}})} placeholder="https://www.tiktok.com/@..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (URL)</label>
                    <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.whatsapp || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),whatsapp:e.target.value}}})} placeholder="https://wa.me/+..." />
                  </div>
                </div>
                {/* Vista previa de enlaces */}
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  {editableOrg.contact?.social?.linkedin && <a target="_blank" rel="noreferrer" className="text-blue-700 hover:underline" href={editableOrg.contact.social.linkedin}>LinkedIn</a>}
                  {editableOrg.contact?.social?.instagram && <a target="_blank" rel="noreferrer" className="text-pink-600 hover:underline" href={editableOrg.contact.social.instagram}>Instagram</a>}
                  {editableOrg.contact?.social?.facebook && <a target="_blank" rel="noreferrer" className="text-blue-600 hover:underline" href={editableOrg.contact.social.facebook}>Facebook</a>}
                  {editableOrg.contact?.social?.x && <a target="_blank" rel="noreferrer" className="text-gray-700 hover:underline" href={editableOrg.contact.social.x}>X/Twitter</a>}
                  {editableOrg.contact?.social?.tiktok && <a target="_blank" rel="noreferrer" className="text-black hover:underline" href={editableOrg.contact.social.tiktok}>TikTok</a>}
                  {editableOrg.contact?.social?.whatsapp && <a target="_blank" rel="noreferrer" className="text-green-600 hover:underline" href={editableOrg.contact.social.whatsapp}>WhatsApp</a>}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Proyectos</h3>
                  <button onClick={addOrgProject} className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Añadir proyecto</button>
                </div>
                <div className="space-y-4">
                  {(editableOrg.projects || []).map((proj, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="px-3 py-2 border rounded" placeholder="Título" value={proj.title || ''} onChange={(e)=>{
                          const next = [...editableOrg.projects]; next[idx] = { ...next[idx], title: e.target.value }; setEditableOrg({ ...editableOrg, projects: next });
                        }} />
                        <input className="px-3 py-2 border rounded" placeholder="Descripción" value={proj.description || ''} onChange={(e)=>{
                          const next = [...editableOrg.projects]; next[idx] = { ...next[idx], description: e.target.value }; setEditableOrg({ ...editableOrg, projects: next });
                        }} />
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">Fotos (URLs)</span>
                            <button onClick={()=>{
                              const url = prompt('URL de imagen'); if(!url) return; const next = [...(proj.photos||[]), url];
                              const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], photos: next }; setEditableOrg({ ...editableOrg, projects: arr });
                            }} className="text-xs px-2 py-1 bg-gray-100 rounded">Añadir</button>
                          </div>
                          <div className="space-y-1">
                            {(proj.photos||[]).map((u,i)=>(
                              <div key={i} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                                <span className="truncate mr-2">{u}</span>
                                <button onClick={()=>{
                                  const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], photos: (arr[idx].photos||[]).filter((_,j)=>j!==i) }; setEditableOrg({ ...editableOrg, projects: arr });
                                }} className="px-2 py-0.5 bg-red-50 text-red-600 rounded">Quitar</button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">Videos (URLs)</span>
                            <button onClick={()=>{
                              const url = prompt('URL de video'); if(!url) return; const next = [...(proj.videos||[]), url];
                              const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], videos: next }; setEditableOrg({ ...editableOrg, projects: arr });
                            }} className="text-xs px-2 py-1 bg-gray-100 rounded">Añadir</button>
                          </div>
                          <div className="space-y-1">
                            {(proj.videos||[]).map((u,i)=>(
                              <div key={i} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                                <span className="truncate mr-2">{u}</span>
                                <button onClick={()=>{
                                  const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], videos: (arr[idx].videos||[]).filter((_,j)=>j!==i) }; setEditableOrg({ ...editableOrg, projects: arr });
                                }} className="px-2 py-0.5 bg-red-50 text-red-600 rounded">Quitar</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button onClick={()=>deleteOrgProject(idx)} className="px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 text-sm">Eliminar proyecto</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button onClick={saveOrg} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Guardar cambios</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
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
    return (
      <DonorForm 
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        setUserType={setUserType}
        translations={t}
      />
    );
  }
  
  if (userType === "receiver") {
    return <ReceiverForm />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        translations={t}
        supabaseStatus={supabaseStatus}
        handleRefreshFromSupabase={handleRefreshFromSupabase}
      />
      {currentPage === "home" && (
        <HomePage 
          setUserType={setUserType}
          setCurrentPage={setCurrentPage}
          translations={t}
        />
      )}
      {currentPage === "about" && <AboutPage translations={t} />}
      {currentPage === "services" && <ServicesPage translations={t} />}
      {currentPage === "manuals" && <ManualsPage translations={t} />}
      {currentPage === "community" && <CommunityPage translations={t} />}
      {currentPage === "contact" && <ContactPage translations={t} />}
      {currentPage === "map" && (
        <MapView 
          organizations={organizations}
          filteredOrganizations={filteredOrganizations}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
          filters={filters}
          setFilters={setFilters}
          translations={t}
        />
      )}
      {currentPage === "dashboard" && <DashboardPage />}
    </div>
  );
};

export default App;