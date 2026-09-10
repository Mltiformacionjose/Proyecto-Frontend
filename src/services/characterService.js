import api from "./api.js";

/**
 * Obtiene un listado paginado de personajes Disney.
 * @param {number} page - Número de página (empieza en 1).
 * @param {number} pageSize - Cantidad de personajes por página.
 * @returns {Promise<Object>} Respuesta con { info, data }.
 */
const getCharacters = async (page = 1, pageSize = 50) => {
  const response = await api.get("/character", {
    params: { page, pageSize },
  });
  return response.data;
};

/**
 * Obtiene un personaje concreto por su id.
 * @param {number} id - Identificador del personaje.
 * @returns {Promise<Object>} Personaje encontrado.
 */
const getCharacterById = async (id) => {
  const response = await api.get(`/characters/${id}`);
  return response.data;
};

const characterService = { getCharacters, getCharacterById };

export default characterService;