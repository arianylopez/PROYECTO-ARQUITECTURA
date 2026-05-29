// src/services/authService.js
import { fetchAPI } from './api.js';

export const loginUser = async (email, password) => {
  // fetchAPI ya está configurado para lanzar un error si el status no es 200 OK
  const response = await fetchAPI('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  // Guardamos el token en el LocalStorage del navegador
  if (response && response.token) {
    localStorage.setItem('ucb_admin_token', response.token);
  }
  
  return response;
};

// Función de utilidad para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('ucb_admin_token');
  window.location.hash = '#/';
};