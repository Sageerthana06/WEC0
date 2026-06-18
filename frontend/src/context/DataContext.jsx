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
  "https://perpetual-clarity-production-fe88.up.railway.app/api";

// FIX: Add/Edit/Delete எல்லாம் 401 Unauthorized ஆகத் தோல்வியடைந்து கொண்டிருந்தது,
// ஏனெனில் எந்த mutating (POST/PUT/DELETE) அழைப்பிலும் Authorization header
// அனுப்பப்படவில்லை. GET (படிக்க) public route ஆக இருப்பதால் மட்டுமே வெற்றியடைந்தது.
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export function DataProvider({ children }) {
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
      const res = await axios.post(`${API_URL}/services`, item, {
        headers: authHeaders(),
      });
      setServices((prev) => [...prev, res.data]);
      return res.data;
    },
    remove: async (id) => {
      await axios.delete(`${API_URL}/services/${id}`, {
        headers: authHeaders(),
      });
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
      const res = await axios.post(`${API_URL}/gallery`, payload, {
        headers: authHeaders(),
      });
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
      const res = await axios.put(`${API_URL}/gallery/${id}`, payload, {
        headers: authHeaders(),
      });
      const updated = res.data.data || res.data;
      setGallery((prev) => prev.map((g) => (g.id === id ? updated : g)));
      return updated;
    },
    remove: async (id) => {
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: authHeaders(),
      });
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
