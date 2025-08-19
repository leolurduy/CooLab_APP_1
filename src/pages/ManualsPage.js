import React from 'react';

/**
 * Página de Manuales de CooLab
 * @param {Object} props
 * @param {Object} props.translations - Objeto con las traducciones (t)
 */
const ManualsPage = ({ translations: t }) => (
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

export default ManualsPage;