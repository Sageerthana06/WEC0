import api from "./api";

const GALLERY_API = "/gallery";

export const galleryDB = {
  // Get all gallery items
  getAll: async () => {
    try {
      const response = await api.get(GALLERY_API);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching gallery:", error);
      return [];
    }
  },

  // Get gallery by category
  getByCategory: async (category) => {
    try {
      const response = await api.get(`${GALLERY_API}?category=${category}`);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching gallery by category:", error);
      return [];
    }
  },

  // Get single gallery item
  getById: async (id) => {
    try {
      const response = await api.get(`${GALLERY_API}/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      return null;
    }
  },

  // Add new gallery item
  add: async (item) => {
    try {
      const response = await api.post(GALLERY_API, item);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error adding gallery item:", error);
      throw error;
    }
  },

  // Update gallery item
  update: async (id, item) => {
    try {
      const response = await api.put(`${GALLERY_API}/${id}`, item);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error updating gallery item:", error);
      throw error;
    }
  },

  // Delete gallery item
  delete: async (id) => {
    try {
      await api.delete(`${GALLERY_API}/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      throw error;
    }
  },
};
