import { createContext, useContext, useEffect, useState } from "react";
import { initialServices, initialGallery } from "../data/initialData";
import { getImage } from "../data/catalogTypes";
import { generateId, loadFromStorage, saveToStorage } from "../utils/storage";
import { saveGalleryImage, deleteGalleryImage } from "../utils/galleryImageDB";

const DataContext = createContext(null);

const KEYS = {
  services: "wEc-services",
  gallery: "wEc-gallery",
  messages: "wEc-messages",
};

function normalizeProduct(p) {
  return {
    ...p,
    title: p.title || p.name,
    image: getImage(p),
  };
}

function normalizeGalleryItem(g) {
  return {
    ...g,
    image: getImage(g),
    videoUrl: g.videoUrl || (g.type === "video" ? g.url : undefined),
  };
}

function stripGalleryForStorage(items) {
  return items.map(
    ({
      id,
      title,
      description,
      icon,
      image,
      category,
      type,
      videoUrl,
      storageId,
      uploaded,
      featured,
    }) => ({
      id,
      title,
      description: description || "",
      icon: icon || category || "box",
      // Don't save huge base64 dataURLs in localStorage — uploaded images
      // are already persisted in IndexedDB and loaded via storageId.
      image: uploaded && storageId ? "" : image,
      category,
      type: type || "image",
      videoUrl,
      storageId,
      uploaded,
      featured: Boolean(featured),
    }),
  );
}

export function DataProvider({ children }) {
  const [services, setServices] = useState(initialServices);
  const [gallery, setGallery] = useState(() =>
    loadFromStorage(KEYS.gallery, initialGallery).map(normalizeGalleryItem),
  );
  const [messages, setMessages] = useState(() =>
    loadFromStorage(KEYS.messages, []),
  );

  useEffect(() => {
    saveToStorage(KEYS.services, services);
  }, [services]);

  useEffect(() => {
    saveToStorage(KEYS.gallery, stripGalleryForStorage(gallery));
  }, [gallery]);

  useEffect(() => {
    saveToStorage(KEYS.messages, messages);
  }, [messages]);

  const addMessage = (msg) => {
    const entry = {
      id: generateId("msg"),
      ...msg,
      date: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [entry, ...prev]);
    return entry;
  };

  const markMessageRead = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const addGalleryPhoto = async (dataUrl, title, category = "products") => {
    const storageId = generateId("img");
    await saveGalleryImage(storageId, dataUrl);
    const entry = {
      id: generateId("gal"),
      title: title || "My Photo",
      description: "",
      icon:
        category === "products"
          ? "box"
          : category === "warehouse"
            ? "warehouse"
            : category === "promotion"
              ? "star"
              : "event",
      image: dataUrl,
      category,
      type: "image",
      storageId,
      uploaded: true,
      featured: false,
    };
    setGallery((prev) => [entry, ...prev]);
    return entry;
  };

  const removeGalleryPhoto = async (id) => {
    const item = gallery.find((g) => g.id === id);
    if (item?.storageId) {
      try {
        await deleteGalleryImage(item.storageId);
      } catch {
        /* ignore */
      }
    }
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const crud = (setter) => ({
    add: (item) => setter((prev) => [...prev, { ...item, id: generateId() }]),
    update: (id, updates) =>
      setter((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      ),
    remove: (id) => setter((prev) => prev.filter((item) => item.id !== id)),
  });

  const serviceCrud = crud(setServices);
  const galleryCrud = crud(setGallery);

  return (
    <DataContext.Provider
      value={{
        services,
        gallery,
        messages,
        addMessage,
        markMessageRead,
        deleteMessage,
        addGalleryPhoto,
        removeGalleryPhoto,
        serviceCrud,
        galleryCrud,
        setServices,
        setGallery,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
