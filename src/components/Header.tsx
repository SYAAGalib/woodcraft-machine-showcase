
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ShoppingCart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useRecentViews } from '@/contexts/RecentViewsContext';
import CartSlideout from './CartSlideout';
import { getCategories } from '@/utils/dataManager';
import dolphinLogo from '@/assets/dolphin-logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state, dispatch } = useCart();
  const { recentViews, clearRecentViews } = useRecentViews();
  const navigate = useNavigate();
  const categories = getCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, you'd implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                <img src={dolphinLogo} alt="Dolphine Wood Logo" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-[#387C2B]">
                  Dolphine Wood
                </h1>
                <p className="text-sm text-[#8B5E3C] -mt-1">Machineries</p>
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for wood machinery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-[#387C2B] transition-colors">
                Home
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-[#387C2B] transition-colors">
                  Categories
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      to="/category/all"
                      className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-[#387C2B] border-b"
                    >
                      All Categories
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#387C2B]"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <Link to="/blog" className="text-gray-700 hover:text-[#387C2B] transition-colors">
                Blog
              </Link>
              
              {/* Your Recent Views Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-[#387C2B] transition-colors">
                    <Clock className="h-4 w-4 mr-2" />
                    Your Recent Views
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-white shadow-lg border rounded-lg z-50">
                  <div className="px-4 py-2 border-b">
                    <h3 className="font-semibold text-gray-900">Recently Viewed Products</h3>
                  </div>
                  {recentViews.length > 0 ? (
                    <>
                      {recentViews.slice(0, 5).map((product) => (
                        <DropdownMenuItem key={product.id} asChild>
                          <Link
                            to={`/product/${product.slug}`}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500">{product.price}</p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <button
                          onClick={clearRecentViews}
                          className="w-full text-center py-2 text-sm text-gray-500 hover:text-gray-700"
                        >
                          Clear All
                        </button>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No recent views yet</p>
                      <p className="text-xs mt-1">Browse our products to see them here</p>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/contact" className="text-gray-700 hover:text-[#387C2B] transition-colors">
                Contact
              </Link>
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-2">
              {/* Recent Views Mobile */}
              <div className="lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72 bg-white shadow-lg border rounded-lg z-50">
                    <div className="px-3 py-2 border-b">
                      <h3 className="font-semibold text-sm text-gray-900">Recent Views</h3>
                    </div>
                    {recentViews.length > 0 ? (
                      <>
                        {recentViews.slice(0, 3).map((product) => (
                          <DropdownMenuItem key={product.id} asChild>
                            <Link
                              to={`/product/${product.slug}`}
                              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500">{product.price}</p>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <button
                            onClick={clearRecentViews}
                            className="w-full text-center py-2 text-xs text-gray-500"
                          >
                            Clear All
                          </button>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <div className="px-3 py-4 text-center text-gray-500">
                        <p className="text-xs">No recent views</p>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Cart Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#387C2B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden py-3 border-t">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search machinery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block py-2 text-gray-700 hover:text-[#387C2B]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div>
                <p className="py-2 font-semibold text-gray-900">Categories</p>
                <div className="pl-4 space-y-1">
                  <Link
                    to="/category/all"
                    className="block py-1 text-sm font-semibold text-gray-900 hover:text-[#387C2B]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Categories
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block py-1 text-sm text-gray-600 hover:text-[#387C2B]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/blog"
                className="block py-2 text-gray-700 hover:text-[#387C2B]"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-gray-700 hover:text-[#387C2B]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartSlideout />
    </>
  );
};

export default Header;
