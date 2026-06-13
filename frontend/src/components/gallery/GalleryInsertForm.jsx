import { useState } from "react";
import { toast } from "react-toastify";
import GlassCard from "../ui/GlassCard";
import ImageUpload from "../ui/ImageUpload";
import { useData } from "../../context/DataContext";

/**
 * Frontend-only photo upload — no dashboard, no admin, no code/URLs.
 * Used on Gallery page (and optionally Products page).
 */
export default function GalleryInsertForm({
  defaultCategory = "products",
  title = "Add Photo",
  onPhotoAdded,
}) {
  const { addGalleryPhoto } = useData();
  const [category, setCategory] = useState(defaultCategory);

  const handlePhoto = async (dataUrl, fileName) => {
    const photoTitle =
      fileName?.replace(/\.[^.]+$/i, "").replace(/[-_]/g, " ") || "My Photo";
    try {
      await addGalleryPhoto(dataUrl, photoTitle, category);
      toast.success("Photo added! See it below in the gallery.");
      onPhotoAdded?.(category);
    } catch {
      toast.error("Could not save photo. Try a smaller image.");
    }
  };

  return (
    <section id="insert-image" className="mb-12">
      <GlassCard className="!p-6 md:!p-10">
        <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
          {title}
        </h3>
        <p className="mt-2 text-slate-400">
          Tap the button below — pick a photo from your phone or computer. No
          dashboard, no links, no coding.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: "products", label: "Products" },
            { id: "warehouse", label: "Warehouse" },
            { id: "events", label: "Events" },
            { id: "promotion", label: "Promotion" },
            { id: "Promotion#", label: "Promotion#" }, // 👈 !
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c.id
                  ? "bg-cyan-500 text-white"
                  : "glass text-slate-400 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <ImageUpload
            value=""
            onChange={() => {}}
            autoPublish
            onFileReady={handlePhoto}
            label=""
            hint="JPG, PNG, WebP or GIF — photo saves automatically"
          />
        </div>
      </GlassCard>
    </section>
  );
}
