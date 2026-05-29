// src/services/api.js
const BASE_URL = 'http://localhost:5096/api'; // Ajustado a tu puerto real según los logs

export const fetchAPI = async (endpoint, options = {}) => {
  // 1. Buscamos si hay un token guardado
  const token = localStorage.getItem('ucb_admin_token');
  
  // 2. Preparamos las cabeceras
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 3. Inyectamos el JWT (La magia de la seguridad)
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
        // Si el token expiró, lo pateamos al login
        localStorage.removeItem('ucb_admin_token');
        window.location.hash = '#/login';
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error llamando a ${endpoint}:`, error);
    throw error;
  }
};