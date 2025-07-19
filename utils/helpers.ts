/**
 * Generate a unique ID with optional prefix
 * @param prefix Optional prefix for the ID
 * @returns A unique string ID
 */
export function generateUniqueId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${prefix}${timestamp}-${randomStr}`;
}

/**
 * Format price with currency symbol
 * @param price Price value
 * @param currency Currency symbol
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = '€'): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Calculate discount percentage
 * @param price Current price
 * @param compareAtPrice Original price
 * @returns Discount percentage or null if no discount
 */
export function calculateDiscountPercentage(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) {
    return null;
  }
  
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}

/**
 * Truncate text with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Convert a string to URL-friendly slug
 * @param text Text to convert to slug
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
