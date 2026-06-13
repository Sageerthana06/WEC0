export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB before compress
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read photo"));
    reader.readAsDataURL(file);
  });
}

export function compressImage(file, maxWidth = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected"));
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      reject(new Error("Please choose a photo (JPG, PNG, WebP, or GIF)"));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      reject(new Error("Photo is too large. Please use under 5 MB."));
      return;
    }

    if (file.type === "image/gif") {
      readFileAsDataUrl(file).then(resolve).catch(reject);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load this image file"));
    };

    img.src = url;
  });
}
