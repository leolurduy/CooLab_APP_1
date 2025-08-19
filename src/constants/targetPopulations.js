/**
 * Opciones de poblaciones objetivo para las organizaciones
 * Lista de temáticas y grupos demográficos que pueden ser beneficiarios
 */

export const targetPopulationOptions = [
  "Niños Niñas y Adolescentes",
  "Jóvenes",
  "Adult@s mayores",
  "Mujeres",
  "Personas con discapacidad",
  "Indígenas",
  "Campesin@s",
  "Victimas de Violencia",
  "Personas desaparecidas",
  "Derechos Humanos",
  "Deporte y Recreación",
  "Educación y cultura",
  "Salud (Física y Mental",
  "Población Migrante",
  "LGBTIQ+",
  "Medioambiente y Cambio climático",
  "Animales",
  "Energías Renovables",
  "Pobreza y desigualdad",
  "Desarollo ecoómico y emprendimiento"
];

/**
 * Agrupa las poblaciones objetivo por categorías temáticas
 */
export const targetPopulationCategories = {
  demograficas: [
    "Niños Niñas y Adolescentes",
    "Jóvenes", 
    "Adult@s mayores",
    "Mujeres",
    "Personas con discapacidad",
    "Indígenas",
    "Campesin@s",
    "LGBTIQ+"
  ],
  sociales: [
    "Victimas de Violencia",
    "Personas desaparecidas", 
    "Derechos Humanos",
    "Población Migrante",
    "Pobreza y desigualdad"
  ],
  temáticas: [
    "Deporte y Recreación",
    "Educación y cultura",
    "Salud (Física y Mental",
    "Medioambiente y Cambio climático",
    "Animales",
    "Energías Renovables",
    "Desarollo ecoómico y emprendimiento"
  ]
};

/**
 * Obtiene la categoría de una población objetivo
 * @param {string} population - Población objetivo
 * @returns {string} Categoría de la población
 */
export const getPopulationCategory = (population) => {
  for (const [category, populations] of Object.entries(targetPopulationCategories)) {
    if (populations.includes(population)) {
      return category;
    }
  }
  return 'otras';
};

export default targetPopulationOptions;