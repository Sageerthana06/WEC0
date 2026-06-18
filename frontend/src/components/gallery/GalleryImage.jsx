import { useEffect, useState } from "react";
import { getImage } from "../../data/catalogTypes";

export default function GalleryImage({ item, className = "", alt }) {
  // ஆரம்பத்திலேயேgetImage மூலம் வரும் மதிப்பை state-ல் வைக்கவும்
  const [src, setSrc] = useState(getImage(item));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // item மாறும்போது புதிய படத்திற்கு மாறவும்
    setFailed(false);
    setSrc(getImage(item) || "");
  }, [item]); // item முழுவதையும் dependency ஆகக் கொடுத்தால் போதும்

  if (failed || !src) {
    return (
      <div className={`flex min-h-[120px] items-center justify-center bg-slate-800 text-sm text-slate-500 ${className}`}>
        Image unavailable
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || item.title || "Gallery image"}
      className={className}
      loading="lazy"
      // படம் லோட் ஆகவில்லை என்றால் தானாகவே failed ஸ்டேட்டை மாற்றும்
      onError={() => setFailed(true)}
    />
  );
}