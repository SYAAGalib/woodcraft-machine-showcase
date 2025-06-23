
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { 
  getProductsByCategory, 
  getCategoryBySlug, 
  getProducts,
  Product,
  Category 
} from '@/utils/dataManager';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (categorySlug) {
      if (categorySlug === 'all') {
        setProducts(getProducts());
        setCategory({
          id: 'all',
          name: 'All Products',
          slug: 'all',
          description: 'Browse our complete range of wood processing machinery',
          image: '',
          productCount: getProducts().length,
          createdAt: '',
          updatedAt: ''
        });
      } else {
        setProducts(getProductsByCategory(categorySlug));
        setCategory(getCategoryBySlug(categorySlug) || null);
      }
    }
  }, [categorySlug]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        image: product.images[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
        price: product.price,
        category: product.category,
        slug: product.slug,
      },
    });
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#387C2B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/" className="text-green-200 hover:text-white">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <nav className="text-sm">
              <Link to="/" className="text-green-200 hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>{category.name}</span>
            </nav>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {product.featured && (
                      <Badge className="absolute top-4 left-4 bg-[#387C2B]">
                        Featured
                      </Badge>
                    )}
                    {product.viewCount > 0 && (
                      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        {product.viewCount} views
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#387C2B]">
                        {product.price}
                      </span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                        <Link to={`/product/${product.slug}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-48 h-36 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                        <img
                          src={product.images[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {product.name}
                              </h3>
                              {product.featured && (
                                <Badge className="bg-[#387C2B]">Featured</Badge>
                              )}
                              {product.viewCount > 0 && (
                                <span className="text-sm text-gray-500">
                                  {product.viewCount} views
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-6">
                            <p className="text-2xl font-bold text-[#387C2B] mb-4">
                              {product.price}
                            </p>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addToCart(product)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Link to={`/product/${product.slug}`}>
                                <Button size="sm">View Details</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Grid className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? 'Try adjusting your search terms or browse other categories.'
                  : 'Products will appear here once they are added to this category.'
                }
              </p>
              <Link to="/">
                <Button>Browse All Categories</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
