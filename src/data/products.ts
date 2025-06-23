
// Re-export types and functions from dataManager
export type { Product, Category } from '@/utils/dataManager';
export { 
  getCategories as categories,
  getProducts as products,
  getFeaturedProducts as featuredProducts,
  getProductsByCategory,
  getProductBySlug,
  getCategoryBySlug,
  getRelatedProducts
} from '@/utils/dataManager';

// For backwards compatibility
export const categories = () => {
  const { getCategories } = require('@/utils/dataManager');
  return getCategories();
};

export const products = () => {
  const { getProducts } = require('@/utils/dataManager');
  return getProducts();
};

export const featuredProducts = () => {
  const { getFeaturedProducts } = require('@/utils/dataManager');
  return getFeaturedProducts();
};
