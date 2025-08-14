import React from "react";

const Mapa = ({ organizations, setSelectedOrg, selectedOrg }) => {
  const handleMarkerClick = (org) => {
    if (setSelectedOrg) setSelectedOrg(org);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-indigo-200 relative">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      {organizations && organizations.map((org) => (
        <div
          key={org.id}
          className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
          style={{
            left: `${50 + (org.id - 1) * 15}%`,
            top: `${30 + (org.id - 1) * 10}%`,
          }}
          onClick={() => handleMarkerClick(org)}
        >
          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
        </div>
      ))}
      
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
        <p className="text-sm text-gray-700 font-medium">Mapa Interactivo</p>
        <p className="text-xs text-gray-500">Versión simplificada - Marcadores: {organizations ? organizations.length : 0}</p>
      </div>
    </div>
  );
};

export default Mapa;


