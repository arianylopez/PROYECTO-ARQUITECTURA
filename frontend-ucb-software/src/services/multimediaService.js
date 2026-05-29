// src/services/multimediaService.js
import { fetchAPI } from './api.js';

export const getBanners = async () => {
  return await fetchAPI('/Multimedia/banners');
};

export const getAlbumsDirectory = async () => {
  return await fetchAPI('/Multimedia/galeria');
};

export const getAlbumDetails = async (id) => {
  return await fetchAPI(`/Multimedia/galeria/${id}`);
};