// src/services/api.js
const BASE_URL = 'http://localhost:5096/api';

export const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('ucb_admin_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('ucb_admin_token');
        window.location.hash = '#/login';
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // --- LA SOLUCIÓN ESTÁ AQUÍ ---
    // Si la respuesta es 204 No Content (como en un DELETE), devolvemos null y evitamos el parseo
    if (response.status === 204) {
      return null;
    }

    // Para todos los demás (200 OK, 201 Created), parseamos el JSON normal
    return await response.json();
    
  } catch (error) {
    console.error(`Error llamando a ${endpoint}:`, error);
    throw error;
  }
};