/** Main nav order: Home → About → Service → Gallery → Product */
export const mainNavLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Service" },
  { to: "/gallery", label: "Gallery" },
];

export const footerNavLinks = [
  ...mainNavLinks,
  { to: "/contact", label: "Contact" },
];

export const galleryPhotoSteps = [
  {
    step: 1,
    title: "Open Gallery",
    description: "Go to the Gallery page from the menu.",
  },
  {
    step: 2,
    title: "Upload Image",
    description: "Click the upload area and choose a photo from your device.",
  },
  {
    step: 3,
    title: "Add Details",
    description:
      "Enter a title and pick a category (Products, Warehouse, or Events).",
  },
  {
    step: 4,
    title: "Publish",
    description:
      'Press "Publish to Gallery" — your image appears below instantly.',
  },
];
