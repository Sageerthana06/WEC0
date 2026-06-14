import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  initialServices,
  initialGallery,
  INITIAL_SITE_SETTINGS,
  team,
  stats,
} from "../data/initialData";

const DataContext = createContext(null);
const API_URL =
  import.meta.env.VITE_API_URL ||
  "dynamic-simplicity-production-f30c.up.railway.app/api";

https: export function DataProvider({ children }) {
  const [services, setServices] = useState(initialServices);
  const [gallery, setGallery] = useState(initialGallery);
  const [siteSettings, setSiteSettings] = useState(INITIAL_SITE_SETTINGS);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, gRes] = await Promise.all([
          axios.get(`${API_URL}/services`),
          axios.get(`${API_URL}/gallery`),
        ]);
        if (sRes.data && sRes.data.length > 0) {
          setServices(sRes.data);
        }
        if (gRes.data && gRes.data.data && gRes.data.data.length > 0) {
          setGallery(gRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        // Keep using initial data as fallback
      }
    };
    fetchData();
  }, []);

  const serviceCrud = {
    add: async (item) => {
      const res = await axios.post(`${API_URL}/services`, item);
      setServices((prev) => [...prev, res.data]);
    },
    remove: async (id) => {
      await axios.delete(`${API_URL}/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
    },
  };

  const galleryCrud = {
    add: async (item) => {
      // Convert 'image' to 'image_url' for backend compatibility
      const payload = {
        ...item,
        image_url: item.image || item.image_url,
      };
      delete payload.image;
      const res = await axios.post(`${API_URL}/gallery`, payload);
      const newItem = res.data.data || res.data;
      setGallery((prev) => [newItem, ...prev]);
      return newItem;
    },
    update: async (id, item) => {
      const payload = {
        ...item,
        image_url: item.image || item.image_url,
      };
      delete payload.image;
      const res = await axios.put(`${API_URL}/gallery/${id}`, payload);
      const updated = res.data.data || res.data;
      setGallery((prev) => prev.map((g) => (g.id === id ? updated : g)));
      return updated;
    },
    remove: async (id) => {
      await axios.delete(`${API_URL}/gallery/${id}`);
      setGallery((prev) => prev.filter((g) => g.id !== id));
    },
  };

  const addGalleryPhoto = async (dataUrl, photoTitle, category) => {
    return galleryCrud.add({
      title: photoTitle,
      image_url: dataUrl,
      category,
      description: "",
    });
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <DataContext.Provider
      value={{
        services,
        gallery,
        siteSettings,
        team,
        stats,
        messages,
        addMessage,
        serviceCrud,
        galleryCrud,
        addGalleryPhoto,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
