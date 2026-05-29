// src/services/contentService.js
import { fetchAPI } from './api.js';

// El que ya teníamos para estudiantes
export const getUpcomingEvents = async () => {
  return await fetchAPI('/Content/events/upcoming');
};

// --- NUEVOS ENDPOINTS PARA EL CMS ---

// Trae todos sin filtro de fecha
export const getAllPosts = async () => {
  return await fetchAPI('/Content/posts');
};

// Crea un nuevo post
export const createPost = async (postData) => {
  return await fetchAPI('/Content/posts', {
    method: 'POST',
    body: JSON.stringify(postData)
  });
};