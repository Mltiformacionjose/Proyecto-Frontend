import api from "./api.js";

/**
 * Fetches a paginated list of Disney characters.
 * @param {number} page - Page number (starts at 1).
 * @param {number} pageSize - Characters per page.
 * @returns {Promise<Object>} Response with { info, data }.
 */
const getCharacters = async (page = 1, pageSize = 50) => {
  const response = await api.get("/character", {
    params: { page, pageSize },
  });
  return response.data;
};

/**
 * Fetches a single character by its id.
 * @param {number} id - Character identifier.
 * @returns {Promise<Object>} Found character.
 */
const getCharacterById = async (id) => {
  const response = await api.get(`/characters/${id}`);
  return response.data;
};

/**
 * Fetches the full catalog of characters.
 * The API does not support filtering by name, so it requests all
 * pages (with the maximum page size of 500) in parallel and combines
 * them into a single list. Used for the global search feature.
 * @returns {Promise<Array>} Complete list of characters.
 */
const getAllCharacters = async () => {
  const firstPage = await api.get("/character", {
    params: { page: 1, pageSize: 500 },
  });
  const { data, info } = firstPage.data;
  const totalPages = info.totalPages;

  // Request the remaining pages in parallel to avoid slow loading
  const otherPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      api.get("/character", {
        params: { page: index + 2, pageSize: 500 },
      })
    )
  );

  return otherPages.reduce(
    (allCharacters, pageResult) =>
      allCharacters.concat(pageResult.data.data),
    data
  );
};

const characterService = { getCharacters, getCharacterById, getAllCharacters };

export default characterService;