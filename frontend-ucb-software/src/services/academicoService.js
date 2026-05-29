import { fetchAPI } from './api.js';

export const getMallaCurricular = async () => {
  return await fetchAPI('/Academico/malla');
};

export const getDetalleAsignatura = async (code) => {
  return await fetchAPI(`/Academico/asignatura/${code}`);
};