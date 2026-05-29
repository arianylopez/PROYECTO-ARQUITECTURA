// src/services/contentService.js
import { fetchAPI } from './api.js';

export const getUpcomingEvents = async () => await fetchAPI('/Content/events/upcoming');
export const getAllPosts = async () => await fetchAPI('/Content/posts');

export const createPost = async (postData) => {
  return await fetchAPI('/Content/posts', {
    method: 'POST',
    body: JSON.stringify(postData)
  });
};

// --- NUEVO ---
export const updatePost = async (id, postData) => {
  return await fetchAPI(`/Content/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData)
  });
};

export const deletePost = async (id) => {
  return await fetchAPI(`/Content/posts/${id}`, { method: 'DELETE' });
};