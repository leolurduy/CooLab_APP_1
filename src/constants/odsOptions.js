/**
 * Opciones de Objetivos de Desarrollo Sostenible (ODS)
 * Lista completa de los 17 ODS de las Naciones Unidas
 */

export const odsOptions = [
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

/**
 * Obtiene el número del ODS a partir del texto completo
 * @param {string} odsText - Texto completo del ODS (ej: "1. Fin de la pobreza")
 * @returns {string} Número del ODS (ej: "1")
 */
export const getOdsNumber = (odsText) => {
  return odsText.split('.')[0];
};

/**
 * Obtiene el título del ODS sin el número
 * @param {string} odsText - Texto completo del ODS
 * @returns {string} Título del ODS sin número
 */
export const getOdsTitle = (odsText) => {
  return odsText.split('.')[1]?.trim() || odsText;
};

export default odsOptions;