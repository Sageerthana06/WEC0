import { useEffect, useState } from "react";
import { getImage } from "../../data/catalogTypes";

export default function GalleryImage({ item, className = "", alt }) {
  const [src, setSrc] = useState(getImage(item));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);

    const img = getImage(item);
    if (!cancelled) setSrc(img || "");

    return () => {
      cancelled = true;
    };
  }, [item.image, item.url, item.thumbnail]);

  if (failed || !src) {
    return (
      <div
        className={`flex min-h-[120px] items-center justify-center bg-slate-800 text-sm text-slate-500 ${className}`}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || item.title}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
