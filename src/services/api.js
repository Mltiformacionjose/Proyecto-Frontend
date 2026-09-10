import axios from "axios";

// Base URL de la API pública de Disney
const API_BASE_URL = "https://api.disneyapi.dev";

/**
 * Instancia de Axios compartida por todos los servicios.
 * Centraliza la URL base para mantener el código limpio y reutilizable.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;