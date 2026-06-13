/**
 * Example data format — copy this pattern for services, products, gallery
 * File: src/data/initialData.js
 */

export const exampleService = {
  id: 1,
  title: "Import Services",
  description: "Global import solutions",
  icon: "ship",
  image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec",
  featured: true,
};

export const exampleProduct = {
  id: 1,
  title: "Premium Ceylon Tea",
  description: "Export-grade tea blends",
  icon: "leaf",
  image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9da6b",
  category: "Agriculture",
  price: "$8",
  originalPrice: "$12",
  discountPercent: 33,
  stock: "in-stock",
  featured: true,
};

export const exampleGallery = {
  id: 1,
  title: "Colombo Port",
  description: "Port cargo operations",
  icon: "ship",
  image: "https://images.unsplash.com/photo-1494412574647-9c33ee5b0e9e",
  category: "warehouse",
  type: "image",
  featured: true,
};
