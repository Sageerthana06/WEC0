import { useId, useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { compressImage } from "../../utils/imageFile";

export default function ImageUpload({
  value,
  onChange,
  onFileReady,
  label = "Add photo",
  hint = "Tap to choose from gallery or take a photo",
  autoPublish = false,
}) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const processFile = async (file) => {
    setError("");
    setLoading(true);
    try {
      const dataUrl = await compressImage(file);
      if (autoPublish && onFileReady) {
        await onFileReady(dataUrl, file.name);
        onChange("");
      } else {
        onChange(dataUrl);
      }
    } catch (err) {
      setError(err.message || "Upload failed");
      onChange("");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const openPicker = () => {
    if (!loading) inputRef.current?.click();
  };

  const clear = () => {
    onChange("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {label && <p className="mb-3 text-base font-medium text-white">{label}</p>}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />

      {value && !autoPublish ? (
        <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/40">
          <img src={value} alt="Your photo" className="max-h-56 w-full object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute right-3 top-3 rounded-full bg-black/70 p-2.5 text-white"
            aria-label="Remove"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          disabled={loading}
          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-cyan-500/50 bg-cyan-500/10 px-6 py-12 transition hover:border-cyan-400 hover:bg-cyan-500/20 disabled:cursor-wait disabled:opacity-60`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/30">
            <FaCamera className="h-7 w-7" />
          </div>
          <span className="text-center text-lg font-semibold text-white">
            {loading ? "Adding photo…" : "Tap to add photo"}
          </span>
          <span className="text-center text-sm text-slate-400">{hint}</span>
        </button>
      )}
      {error && (
        <p className="mt-3 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-300">{error}</p>
      )}
    </div>
  );
}
