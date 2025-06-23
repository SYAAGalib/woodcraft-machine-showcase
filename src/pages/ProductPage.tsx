
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useRecentViews } from '@/contexts/RecentViewsContext';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import ContactSection from '@/components/ContactSection';

const ProductPage = () => {
  const { productSlug } = useParams();
  const { dispatch } = useCart();
  const { addToRecentViews } = useRecentViews();
  
  const product = getProductBySlug(productSlug || '');
  const relatedProducts = product ? getRelatedProducts(product.category, product.id) : [];

  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentViews({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        category: product.category,
      });
    }
  }, [product, addToRecentViews]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        category: product.category,
        slug: product.slug,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#387C2B]">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-[#387C2B]">
              {product.category}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-5 w-5 text-yellow-500" />
                ))}
              </div>
              <span className="text-gray-600">4.5 (125 reviews)</span>
            </div>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-[#387C2B]">{product.price}</span>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 mb-8">
              <Button size="lg" className="w-full sm:w-auto bg-[#387C2B] hover:bg-[#2d6322] text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>

            {/* Product Badges/Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (125)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <p className="text-gray-700 leading-relaxed">
              {product.fullDescription || product.description}
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Voltage: 220V</li>
              <li>Power: 3.5kW</li>
              <li>Dimensions: 1500 x 800 x 1200 mm</li>
              <li>Weight: 500kg</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
                    <span className="font-semibold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">Reviewed on August 12, 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mt-3">
                  "This machine has significantly improved our production efficiency. Highly recommended!"
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-200">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {relatedProduct.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#387C2B]">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {relatedProduct.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#387C2B]">
                      {relatedProduct.price}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(relatedProduct)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Link to={`/product/${relatedProduct.slug}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Back to Category Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link to={`/category/${product.category}`}>
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {product.category}
          </Button>
        </Link>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default ProductPage;
