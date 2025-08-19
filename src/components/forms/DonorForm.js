import React from 'react';
import { odsOptions } from '../../constants/odsOptions';
import { targetPopulationOptions } from '../../constants/targetPopulations';

/**
 * Formulario para registro de donantes
 * @param {Object} props
 * @param {Function} props.handleSubmit - Función para manejar el envío del formulario
 * @param {Function} props.handleInputChange - Función para manejar cambios en inputs
 * @param {Function} props.setUserType - Función para cambiar el tipo de usuario
 * @param {Object} props.translations - Objeto con las traducciones (t)
 */
const DonorForm = ({ handleSubmit, handleInputChange, setUserType, translations: t }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.donor_title}</h2>
        <p className="text-gray-600">{t.donor} {t.welcome?.toLowerCase()}</p>
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
        
        {/* ODS Relacionados (múltiple) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ODS Relacionados (múltiple)</label>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {odsOptions.map((ods) => (
              <label key={ods} className="flex items-center space-x-2 text-sm">
                <span className="inline-flex w-4 h-4 bg-indigo-200 rounded-sm items-center justify-center">
                  <svg className="w-3 h-3 text-indigo-700" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg>
                </span>
                <input
                  type="checkbox"
                  name="donorOds"
                  value={ods}
                  onChange={handleInputChange}
                  className="text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{ods}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Temáticas de Interés (múltiple) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temáticas de Interés (múltiple)</label>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {targetPopulationOptions.map((topic) => (
              <label key={topic} className="flex items-center space-x-2 text-sm">
                <span className="inline-flex w-4 h-4 bg-green-200 rounded-sm items-center justify-center">
                  <svg className="w-3 h-3 text-green-700" viewBox="0 0 20 20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="2"/></svg>
                </span>
                <input
                  type="checkbox"
                  name="donorTopics"
                  value={topic}
                  onChange={handleInputChange}
                  className="text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">{topic}</span>
              </label>
            ))}
          </div>
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

export default DonorForm;