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
const API_URL = "http://localhost:5000/api";

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
      const res = await axios.post(`${API_URL}/gallery`, item);
      const newItem = res.data.data || res.data;
      setGallery((prev) => [newItem, ...prev]);
    },
    remove: async (id) => {
      await axios.delete(`${API_URL}/gallery/${id}`);
      setGallery((prev) => prev.filter((g) => g.id !== id));
    },
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
