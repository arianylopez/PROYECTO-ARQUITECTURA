// src/services/communityService.js
import { fetchAPI } from './api.js';

export const getDocentesDirectory = async () => {
  return await fetchAPI('/Comunidad/docentes');
};

// NUEVO ENDPOINT
export const getAlumniDirectory = async () => {
  return await fetchAPI('/Comunidad/alumni');
};