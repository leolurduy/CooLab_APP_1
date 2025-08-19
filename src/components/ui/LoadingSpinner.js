import React from 'react';

/**
 * Componente de spinner de carga reutilizable
 * @param {Object} props
 * @param {string} props.size - Tamaño del spinner: 'sm', 'md', 'lg', 'xl'
 * @param {string} props.color - Color del spinner: 'indigo', 'blue', 'green', etc.
 * @param {string} props.message - Mensaje opcional a mostrar debajo del spinner
 * @param {boolean} props.centered - Si el spinner debe estar centrado
 * @param {string} props.className - Clases CSS adicionales
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'indigo', 
  message = null, 
  centered = false,
  className = ''
}) => {
  // Mapeo de tamaños
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  // Mapeo de colores
  const colorClasses = {
    indigo: 'border-indigo-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
    purple: 'border-purple-600',
    pink: 'border-pink-600'
  };

  const spinnerClasses = `
    animate-spin rounded-full border-b-2 
    ${sizeClasses[size] || sizeClasses.md} 
    ${colorClasses[color] || colorClasses.indigo}
    ${className}
  `.trim();

  const containerClasses = centered 
    ? "flex items-center justify-center h-full"
    : "flex items-center";

  const content = (
    <>
      <div className={spinnerClasses}></div>
      {message && (
        <p className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'} ${message ? 'ml-3' : ''}`}>
          {message}
        </p>
      )}
    </>
  );

  if (centered && message) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className={spinnerClasses}></div>
        <p className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'} mt-4`}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
};

export default LoadingSpinner;