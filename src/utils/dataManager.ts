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
  company: string;
  product: string;
  message: string;
  department: string;
  status: 'new' | 'replied' | 'in-progress' | 'archived';
  priority: 'high' | 'medium' | 'low';
  date: string;
  lastReply?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

// Initialize default categories
const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'CNC Machines',
    slug: 'cnc-machines',
    description: 'Precision Computer Numerical Control machines for automated wood cutting and shaping',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Saw Mills',
    slug: 'saw-mills',
    description: 'Heavy-duty sawmill equipment for lumber processing and wood cutting operations',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Wood Dryers',
    slug: 'wood-dryers',
    description: 'Industrial kiln dryers for efficient moisture removal from lumber',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Edge Banders',
    slug: 'edge-banders',
    description: 'Professional edge banding machines for furniture and cabinetry finishing',
    image: 'https://images.unsplash.com/photo-1581092335878-8c7c4c3b1e1c?w=800&h=600&fit=crop',
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Planers',
    slug: 'planers',
    description: 'Thickness planers and surface planers for smooth wood finishing',
    image: 'https://images.unsplash.com/photo-1587845216857-8296ee1b4f7b?w=800&h=600&fit=crop',
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Sanders',
    slug: 'sanders',
    description: 'Industrial sanders for surface preparation and finishing',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Utility functions
const generateSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
};

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Data management functions
export const getCategories = (): Category[] => {
  const stored = localStorage.getItem('categories');
  if (!stored) {
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
    return defaultCategories;
  }
  return JSON.parse(stored);
};

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : [];
};

export const getInquiries = (): Inquiry[] => {
  const stored = localStorage.getItem('inquiries');
  return stored ? JSON.parse(stored) : [];
};

export const getBlogPosts = (): BlogPost[] => {
  const stored = localStorage.getItem('blog_posts');
  return stored ? JSON.parse(stored) : [];
};

export const addCategory = (categoryData: {
  name: string;
  description: string;
  image: string;
}): Category => {
  const categories = getCategories();
  const newCategory: Category = {
    id: generateId(),
    slug: generateSlug(categoryData.name),
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...categoryData
  };
  
  categories.push(newCategory);
  localStorage.setItem('categories', JSON.stringify(categories));
  return newCategory;
};

export const updateCategory = (id: string, categoryData: Partial<Category>): Category | null => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  categories[index] = {
    ...categories[index],
    ...categoryData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('categories', JSON.stringify(categories));
  return categories[index];
};

export const deleteCategory = (id: string): boolean => {
  const categories = getCategories();
  const filteredCategories = categories.filter(c => c.id !== id);
  
  if (filteredCategories.length === categories.length) return false;
  
  localStorage.setItem('categories', JSON.stringify(filteredCategories));
  return true;
};

export const addProduct = (productData: {
  name: string;
  description: string;
  fullDescription: string;
  price: string;
  category: string;
  featured: boolean;
  tags: string[];
  images: string[];
  specifications: { [key: string]: string };
  warranty: string;
}): Product => {
  const products = getProducts();
  const newProduct: Product = {
    id: generateId(),
    slug: generateSlug(productData.name),
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...productData
  };
  
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  
  // Update category product count
  updateCategoryProductCount(productData.category);
  
  return newProduct;
};

export const updateProduct = (id: string, productData: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const oldCategory = products[index].category;
  
  products[index] = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('products', JSON.stringify(products));
  
  // Update category product counts if category changed
  if (productData.category && productData.category !== oldCategory) {
    updateCategoryProductCount(oldCategory);
    updateCategoryProductCount(productData.category);
  }
  
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  const filteredProducts = products.filter(p => p.id !== id);
  
  if (filteredProducts.length === products.length) return false;
  
  localStorage.setItem('products', JSON.stringify(filteredProducts));
  
  // Update category product count
  if (product) {
    updateCategoryProductCount(product.category);
  }
  
  return true;
};

export const addInquiry = (inquiryData: {
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  message: string;
  department: string;
}): Inquiry => {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    id: generateId(),
    status: 'new',
    priority: 'medium',
    date: new Date().toISOString(),
    ...inquiryData
  };
  
  inquiries.push(newInquiry);
  localStorage.setItem('inquiries', JSON.stringify(inquiries));
  return newInquiry;
};

export const updateInquiry = (id: string, inquiryData: Partial<Inquiry>): Inquiry | null => {
  const inquiries = getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  
  if (index === -1) return null;
  
  inquiries[index] = {
    ...inquiries[index],
    ...inquiryData
  };
  
  localStorage.setItem('inquiries', JSON.stringify(inquiries));
  return inquiries[index];
};

export const deleteInquiry = (id: string): boolean => {
  const inquiries = getInquiries();
  const filteredInquiries = inquiries.filter(i => i.id !== id);
  
  if (filteredInquiries.length === inquiries.length) return false;
  
  localStorage.setItem('inquiries', JSON.stringify(filteredInquiries));
  return true;
};

export const incrementProductView = (productId: string): void => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === productId);
  
  if (index !== -1) {
    products[index].viewCount = (products[index].viewCount || 0) + 1;
    localStorage.setItem('products', JSON.stringify(products));
  }
};

export const incrementProductViewBySlug = (slug: string): void => {
  const products = getProducts();
  const index = products.findIndex(p => p.slug === slug);
  
  if (index !== -1) {
    products[index].viewCount = (products[index].viewCount || 0) + 1;
    localStorage.setItem('products', JSON.stringify(products));
  }
};

const updateCategoryProductCount = (categorySlug: string): void => {
  const categories = getCategories();
  const products = getProducts();
  const categoryIndex = categories.findIndex(c => c.slug === categorySlug);
  
  if (categoryIndex !== -1) {
    const productCount = products.filter(p => p.category === categorySlug).length;
    categories[categoryIndex].productCount = productCount;
    localStorage.setItem('categories', JSON.stringify(categories));
  }
};

// Blog management functions
export const addBlogPost = (blogData: {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
}): BlogPost => {
  const blogPosts = getBlogPosts();
  const newBlogPost: BlogPost = {
    id: generateId(),
    slug: generateSlug(blogData.title),
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...blogData
  };
  
  blogPosts.push(newBlogPost);
  localStorage.setItem('blog_posts', JSON.stringify(blogPosts));
  return newBlogPost;
};

export const updateBlogPost = (id: string, blogData: Partial<BlogPost>): BlogPost | null => {
  const blogPosts = getBlogPosts();
  const index = blogPosts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  blogPosts[index] = {
    ...blogPosts[index],
    ...blogData,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('blog_posts', JSON.stringify(blogPosts));
  return blogPosts[index];
};

export const deleteBlogPost = (id: string): boolean => {
  const blogPosts = getBlogPosts();
  const filteredPosts = blogPosts.filter(p => p.id !== id);
  
  if (filteredPosts.length === blogPosts.length) return false;
  
  localStorage.setItem('blog_posts', JSON.stringify(filteredPosts));
  return true;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return getBlogPosts().find(post => post.slug === slug);
};

// Helper functions for the app
export const getProductsByCategory = (categorySlug: string): Product[] => {
  return getProducts().filter(product => product.category === categorySlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return getProducts().find(product => product.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return getCategories().find(category => category.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return getProducts().filter(product => product.featured);
};

export const getRelatedProducts = (categorySlug: string, excludeId: string, limit: number = 3): Product[] => {
  return getProducts()
    .filter(product => product.category === categorySlug && product.id !== excludeId)
    .slice(0, limit);
};
