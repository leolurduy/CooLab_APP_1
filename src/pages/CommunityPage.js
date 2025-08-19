import React from 'react';

/**
 * Página de Comunidad de CooLab
 * @param {Object} props
 * @param {Object} props.translations - Objeto con las traducciones (t)
 */
const CommunityPage = ({ translations: t }) => (
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

export default CommunityPage;