
// Re-export types and functions from dataManager
export type { Product, Category } from '@/utils/dataManager';
export { 
  getCategories,
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductBySlug,
  getCategoryBySlug,
  getRelatedProducts
} from '@/utils/dataManager';
