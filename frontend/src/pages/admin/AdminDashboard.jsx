import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    services,
    gallery,
    serviceCrud,
    galleryCrud,
    siteSettings,
    updateSiteSettings,
  } = useData();
  const [activeTab, setActiveTab] = useState("services");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen gradient-bg text-white p-8">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="flex justify-between items-center mb-8 glass-dark p-6 rounded-2xl border border-white/10">
          <h1 className="text-3xl font-display font-bold gradient-text">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/50"
          >
            Logout
          </button>
        </div>

        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {["services", "gallery", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl capitalize font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "glass text-slate-400 hover:text-white"
              }`}
            >
              Manage {tab}
            </button>
          ))}
        </div>

        <div className="glass-dark p-8 rounded-2xl border border-white/10">
          {activeTab === "services" && (
            <ServicesManager services={services} crud={serviceCrud} />
          )}
          {activeTab === "gallery" && (
            <GalleryManager gallery={gallery} crud={galleryCrud} />
          )}
          {activeTab === "settings" && (
            <SettingsManager
              siteSettings={siteSettings}
              updateSiteSettings={updateSiteSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ServicesManager({ services, crud }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    image: "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      crud.update(editingId, form);
      toast.success("Service updated successfully");
    } else {
      crud.add(form);
      toast.success("Service added successfully");
    }
    setEditingId(null);
    setForm({ title: "", description: "", icon: "", image: "" });
  };

  const handleEdit = (srv) => {
    setEditingId(srv.id);
    setForm({
      title: srv.title,
      description: srv.description,
      icon: srv.icon,
      image: srv.image,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-display">Services</h2>
      <form
        onSubmit={handleSave}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 glass p-6 rounded-xl border border-white/10"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
        />
        <input
          placeholder="Icon (e.g. ship, truck)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          required
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
        />
        <input
          placeholder="Image URL (e.g. /images/1.jpg)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 md:col-span-2"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 md:col-span-2"
          rows="3"
        />
        <div className="md:col-span-2 flex space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-6 py-2 bg-slate-600 rounded-lg font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="flex justify-between items-center glass p-4 rounded-xl border border-white/10"
          >
            <div>
              <h3 className="font-bold text-lg">{srv.title}</h3>
              <p className="text-sm text-slate-400">
                {srv.description.substring(0, 80)}...
              </p>
            </div>
            <div className="flex space-x-3 ml-4">
              <button
                onClick={() => handleEdit(srv)}
                className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  crud.remove(srv.id);
                  toast.success("Removed");
                }}
                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryManager({ gallery, crud }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "promotion",
    type: "image",
    image: "",
    videoUrl: "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      crud.update(editingId, form);
      toast.success("Photo updated successfully");
    } else {
      crud.add({ ...form, uploaded: true });
      toast.success("Photo added successfully");
    }
    setEditingId(null);
    setForm({
      title: "",
      category: "promotion",
      type: "image",
      image: "",
      videoUrl: "",
    });
  };

  const handleEdit = (img) => {
    setEditingId(img.id);
    setForm({
      title: img.title || "",
      category: img.category || "promotion",
      type: img.type || "image",
      image: img.image_url || img.image || "",
      videoUrl: img.videoUrl || "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.7 quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setForm({ ...form, image: dataUrl });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-display">Gallery Images</h2>
      <form
        onSubmit={handleSave}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 glass p-6 rounded-xl border border-white/10"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="promotion">Promotion</option>
          <option value="New Branch">New Branch</option>
          <option value="events">Events</option>
          <option value="products">Products</option>
        </select>

        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 items-center border border-white/10 p-4 rounded-lg bg-slate-900/50">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
          />
          <span className="text-slate-500 font-medium">OR</span>
          <input
            placeholder="Image URL (if not uploading)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
            className="flex-1 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {form.image && (
          <div className="md:col-span-2">
            <img
              src={form.image}
              alt="Preview"
              className="h-32 rounded-lg object-cover border border-white/20"
            />
          </div>
        )}

        <div className="md:col-span-2 flex space-x-4 mt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium"
          >
            {editingId ? "Update Photo" : "Add Photo"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  category: "promotion",
                  type: "image",
                  image: "",
                  videoUrl: "",
                });
              }}
              className="px-6 py-2 bg-slate-600 rounded-lg font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((img) => (
          <div
            key={img.id}
            className="relative group rounded-xl overflow-hidden glass border border-white/10"
          >
            <img
              src={img.image_url || img.image}
              alt={img.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-medium truncate">{img.title}</p>
              <p className="text-xs text-cyan-400">{img.category}</p>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(img)}
                className="bg-cyan-500 text-white p-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  crud.remove(img.id);
                  toast.success("Photo removed");
                }}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsManager({ siteSettings, updateSiteSettings }) {
  const [form, setForm] = useState(siteSettings || {});

  useEffect(() => {
    setForm(siteSettings || {});
  }, [siteSettings]);

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSiteSettings(form);
    toast.success("Site settings updated successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-display">Site Settings</h2>
      <form onSubmit={handleSave} className="space-y-8">
        <div className="glass p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Company Name"
              value={form.company?.name || ""}
              onChange={(e) => handleChange("company", "name", e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
            />
            <input
              placeholder="Short Name"
              value={form.company?.shortName || ""}
              onChange={(e) =>
                handleChange("company", "shortName", e.target.value)
              }
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
            />
            <input
              placeholder="Phone"
              value={form.company?.phone || ""}
              onChange={(e) => handleChange("company", "phone", e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
            />
            <input
              placeholder="Email"
              value={form.company?.email || ""}
              onChange={(e) => handleChange("company", "email", e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
            />
            <textarea
              placeholder="Address"
              value={form.company?.address || ""}
              onChange={(e) =>
                handleChange("company", "address", e.target.value)
              }
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white md:col-span-2"
              rows="2"
            />
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            Home Page
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Hero Tagline"
              value={form.home?.heroTagline || ""}
              onChange={(e) =>
                handleChange("home", "heroTagline", e.target.value)
              }
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
            />
            <textarea
              placeholder="Hero Subtitle"
              value={form.home?.heroSubtitle || ""}
              onChange={(e) =>
                handleChange("home", "heroSubtitle", e.target.value)
              }
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
              rows="2"
            />
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            About Page
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <textarea
              placeholder="History"
              value={form.about?.history || ""}
              onChange={(e) => handleChange("about", "history", e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
              rows="4"
            />
            <textarea
              placeholder="Mission"
              value={form.about?.mission || ""}
              onChange={(e) => handleChange("about", "mission", e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
              rows="3"
            />
            <textarea
              placeholder="Vision"
              value={form.about?.vision || ""}
              onChange={(e) => handleChange("about", "vision", e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
              rows="3"
            />
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            Map & Location
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Google Maps Embed URL"
              value={form.map?.embedUrl || ""}
              onChange={(e) => handleChange("map", "embedUrl", e.target.value)}
              className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white"
            />
            <p className="text-xs text-slate-400">
              Paste the URL from Google Maps Embed iframe (src attribute value).
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Save All Settings
        </button>
      </form>
    </div>
  );
}
