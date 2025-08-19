import React from 'react';

/**
 * Página Acerca de CooLab
 * @param {Object} props
 * @param {Object} props.translations - Objeto con las traducciones (t)
 */
const AboutPage = ({ translations: t }) => (
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

export default AboutPage;