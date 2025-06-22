
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { getProductBySlug, products } from '@/data/products';

const ProductPage = () => {
  const { productSlug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const { dispatch } = useCart();

  const product = getProductBySlug(productSlug || '');
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

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

  const addToCart = () => {
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const generateQuoteMessage = () => {
    const message = `Hello! I'm interested in the ${product.name}. Please provide me with a detailed quote including specifications, pricing, and delivery information. Thank you!`;
    return encodeURIComponent(message);
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
              {product.category.replace('-', ' ')}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-[#387C2B]">
                  Featured
                </Badge>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-[#387C2B]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-8">
              <span className="text-3xl font-bold text-[#387C2B]">
                {product.price}
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <Button size="lg" onClick={addToCart} className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/1234567890?text=${generateQuoteMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    WhatsApp Quote
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full"
                >
                  Request Quote
                </Button>
              </div>
            </div>

            {/* Quick Specs */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-500">{key}</dt>
                      <dd className="font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Full Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="warranty">Warranty Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.fullDescription}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <dt className="text-sm font-medium text-gray-500">{key}</dt>
                        <dd className="text-lg text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="warranty" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Warranty & Support</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.warranty}
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">What's Included:</h4>
                    <ul className="text-green-700 space-y-1">
                      <li>• Parts and labor coverage</li>
                      <li>• Technical support hotline</li>
                      <li>• Installation guidance</li>
                      <li>• Regular maintenance tips</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow duration-200">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#387C2B]">
                        {relatedProduct.price}
                      </span>
                      <Link to={`/product/${relatedProduct.slug}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowQuoteModal(false)} />
            <Card className="relative bg-white rounded-lg max-w-md w-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get a Quote</h3>
                <p className="text-gray-600 mb-6">
                  Choose your preferred method to get a personalized quote for the {product.name}:
                </p>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/1234567890?text=${generateQuoteMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                  <a
                    href={`https://m.me/your-page?text=${product.name} quote request`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messenger
                    </Button>
                  </a>
                  <Link to="/contact" className="w-full">
                    <Button variant="outline" className="w-full">
                      Contact Form
                    </Button>
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowQuoteModal(false)}
                  className="w-full mt-4"
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
