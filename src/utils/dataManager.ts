
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  specifications: { [key: string]: string };
  warranty: string;
  price: string;
  images: string[];
  category: string;
  featured: boolean;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  product?: string;
  message: string;
  department: 'sales' | 'support' | 'general';
  status: 'new' | 'replied' | 'in-progress' | 'archived';
  priority: 'low' | 'medium' | 'high';
  date: string;
  lastReply?: string;
}

export interface ProductView {
  productId: string;
  timestamp: string;
  userAgent: string;
}

// Data keys for localStorage
const CATEGORIES_KEY = 'dolphine_categories';
const PRODUCTS_KEY = 'dolphine_products';
const INQUIRIES_KEY = 'dolphine_inquiries';
const PRODUCT_VIEWS_KEY = 'dolphine_product_views';

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Generate slug from name
export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Categories Management
export const getCategories = (): Category[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const addCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'productCount'>) => {
  const categories = getCategories();
  const newCategory: Category = {
    ...categoryData,
    id: generateId(),
    slug: generateSlug(categoryData.name),
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
};

export const updateCategory = (id: string, updates: Partial<Category>) => {
  const categories = getCategories();
  const index = categories.findIndex(cat => cat.id === id);
  if (index !== -1) {
    categories[index] = {
      ...categories[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveCategories(categories);
    return categories[index];
  }
  return null;
};

export const deleteCategory = (id: string) => {
  const categories = getCategories();
  const filtered = categories.filter(cat => cat.id !== id);
  saveCategories(filtered);
  return true;
};

// Products Management
export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  updateCategoryProductCounts();
};

export const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>) => {
  const products = getProducts();
  const newProduct: Product = {
    ...productData,
    id: generateId(),
    slug: generateSlug(productData.name),
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const products = getProducts();
  const index = products.findIndex(prod => prod.id === id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveProducts(products);
    return products[index];
  }
  return null;
};

export const deleteProduct = (id: string) => {
  const products = getProducts();
  const filtered = products.filter(prod => prod.id !== id);
  saveProducts(filtered);
  return true;
};

export const incrementProductView = (productId: string) => {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    product.viewCount += 1;
    saveProducts(products);
    
    // Track individual view
    const views = getProductViews();
    views.push({
      productId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
    localStorage.setItem(PRODUCT_VIEWS_KEY, JSON.stringify(views));
  }
};

export const getProductViews = (): ProductView[] => {
  const stored = localStorage.getItem(PRODUCT_VIEWS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Update category product counts
const updateCategoryProductCounts = () => {
  const categories = getCategories();
  const products = getProducts();
  
  categories.forEach(category => {
    category.productCount = products.filter(p => p.category === category.slug).length;
  });
  
  saveCategories(categories);
};

// Inquiries Management
export const getInquiries = (): Inquiry[] => {
  const stored = localStorage.getItem(INQUIRIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveInquiries = (inquiries: Inquiry[]) => {
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
};

export const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'date'>) => {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: generateId(),
    date: new Date().toISOString(),
  };
  inquiries.push(newInquiry);
  saveInquiries(inquiries);
  return newInquiry;
};

export const updateInquiry = (id: string, updates: Partial<Inquiry>) => {
  const inquiries = getInquiries();
  const index = inquiries.findIndex(inq => inq.id === id);
  if (index !== -1) {
    inquiries[index] = { ...inquiries[index], ...updates };
    saveInquiries(inquiries);
    return inquiries[index];
  }
  return null;
};

export const deleteInquiry = (id: string) => {
  const inquiries = getInquiries();
  const filtered = inquiries.filter(inq => inq.id !== id);
  saveInquiries(filtered);
  return true;
};

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  const products = getProducts();
  return products.filter(product => product.category === categorySlug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  const categories = getCategories();
  return categories.find(category => category.slug === slug);
};

export const getRelatedProducts = (categorySlug: string, excludeId: string, limit: number = 3): Product[] => {
  const products = getProducts();
  return products
    .filter(product => product.category === categorySlug && product.id !== excludeId)
    .slice(0, limit);
};

export const getFeaturedProducts = (): Product[] => {
  const products = getProducts();
  return products.filter(product => product.featured);
};

// Statistics
export const getProductStats = () => {
  const products = getProducts();
  const views = getProductViews();
  
  return {
    totalProducts: products.length,
    totalViews: products.reduce((sum, p) => sum + p.viewCount, 0),
    topProducts: products
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 5),
    recentViews: views
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10),
  };
};
