import React, { createContext, useContext, useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: string;
  category: string;
  viewedAt: number;
}

interface RecentViewsContextType {
  recentViews: Product[];
  addToRecentViews: (product: Omit<Product, 'viewedAt'>) => void;
  clearRecentViews: () => void;
}

const RecentViewsContext = createContext<RecentViewsContextType | undefined>(undefined);

export const useRecentViews = () => {
  const context = useContext(RecentViewsContext);
  if (!context) {
    throw new Error('useRecentViews must be used within a RecentViewsProvider');
  }
  return context;
};

const RECENT_VIEWS_KEY = 'dolphine-recent-views';
const MAX_RECENT_VIEWS = 10;
const STORAGE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const RecentViewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentViews, setRecentViews] = useState<Product[]>([]);

  // Load recent views from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_VIEWS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();
        // Filter out expired views
        const validViews = parsed.filter((view: Product) => 
          now - view.viewedAt < STORAGE_DURATION
        );
        setRecentViews(validViews);
      } catch (error) {
        console.error('Error loading recent views:', error);
      }
    }
  }, []);

  // Save recent views to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(recentViews));
  }, [recentViews]);

  const addToRecentViews = (product: Omit<Product, 'viewedAt'>) => {
    setRecentViews(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== product.id);
      // Add to beginning with current timestamp
      const newViews = [{ ...product, viewedAt: Date.now() }, ...filtered];
      // Keep only MAX_RECENT_VIEWS items
      return newViews.slice(0, MAX_RECENT_VIEWS);
    });
  };

  const clearRecentViews = () => {
    setRecentViews([]);
    localStorage.removeItem(RECENT_VIEWS_KEY);
  };

  return (
    <RecentViewsContext.Provider value={{ recentViews, addToRecentViews, clearRecentViews }}>
      {children}
    </RecentViewsContext.Provider>
  );
};
