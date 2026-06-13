/**
 * Shared catalog shape (services, products, gallery)
 *
 * @typedef {Object} CatalogItem
 * @property {number|string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [icon]
 * @property {string} image
 * @property {boolean} [featured]
 */

/** @param {{ title?: string, name?: string }} item */
export function getTitle(item) {
  return item.title || item.name || "";
}

/** @param {{ image?: string, url?: string, thumbnail?: string }} item */
export function getImage(item) {
  return item.image || item.url || item.thumbnail || "";
}
