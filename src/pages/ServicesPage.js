import React from 'react';

/**
 * Página de Servicios de CooLab
 * @param {Object} props
 * @param {Object} props.translations - Objeto con las traducciones (t)
 */
const ServicesPage = ({ translations: t }) => (
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

export default ServicesPage;