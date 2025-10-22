
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useRecentViews } from '@/contexts/RecentViewsContext';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import ContactSection from '@/components/ContactSection';

const ProductPage = () => {
  const { productSlug } = useParams();
  const { dispatch } = useCart();
  const { addToRecentViews } = useRecentViews();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const product = getProductBySlug(productSlug || '');
  const relatedProducts = product ? getRelatedProducts(product.category, product.id, 8) : [];

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

  const handlePreviousImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!showLightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePreviousImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, lightboxIndex]);

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
          {/* Product Image Gallery */}
          <div>
            {/* Main Image */}
            <div 
              className="mb-4 cursor-pointer overflow-hidden rounded-lg shadow-md group relative"
              onClick={() => openLightbox(selectedImageIndex)}
            >
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                  Click to view full size
                </span>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-[#387C2B] ring-2 ring-[#387C2B] ring-opacity-50'
                        : 'border-gray-200 hover:border-[#387C2B]'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </div>
                ))}
              </div>
            )}
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
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('specifications-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex-1 min-w-[100px]"
              >
                Specifications
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('description-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex-1 min-w-[100px]"
              >
                Description
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex-1 min-w-[100px]"
              >
                Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Specifications Section */}
        <div id="specifications-section" className="bg-white rounded-lg shadow-md p-6 mb-6 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Specifications</h2>
          {Object.keys(product.specifications).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-200 py-3">
                  <span className="font-semibold text-gray-900 w-1/2">{key}:</span>
                  <span className="text-gray-700 w-1/2">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2 text-gray-700">
              <li className="flex border-b border-gray-200 py-3">
                <span className="font-semibold w-1/2">Voltage:</span>
                <span className="w-1/2">220V</span>
              </li>
              <li className="flex border-b border-gray-200 py-3">
                <span className="font-semibold w-1/2">Power:</span>
                <span className="w-1/2">3.5kW</span>
              </li>
              <li className="flex border-b border-gray-200 py-3">
                <span className="font-semibold w-1/2">Dimensions:</span>
                <span className="w-1/2">1500 x 800 x 1200 mm</span>
              </li>
              <li className="flex border-b border-gray-200 py-3">
                <span className="font-semibold w-1/2">Weight:</span>
                <span className="w-1/2">500kg</span>
              </li>
            </ul>
          )}
          {product.warranty && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-1">Warranty</p>
              <p className="text-gray-700">{product.warranty}</p>
            </div>
          )}
        </div>

        {/* Description Section */}
        <div id="description-section" className="bg-white rounded-lg shadow-md p-6 mb-6 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Description</h2>
          <div className="text-gray-700 leading-relaxed">
            {product.fullDescription || product.description}
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews-section" className="bg-white rounded-lg shadow-md p-6 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">Reviews (125)</h2>
          
          {/* Review Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">4.5</span>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Based on 125 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            <Card>
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
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "This machine has significantly improved our production efficiency. Highly recommended!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
                    <span className="font-semibold">SM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Miller</h4>
                    <p className="text-sm text-gray-500">Reviewed on September 5, 2023</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(4)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
                <p className="text-gray-700">
                  "Great quality and performance. The only downside is the delivery took longer than expected."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
                    <span className="font-semibold">RK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Robert Kumar</h4>
                    <p className="text-sm text-gray-500">Reviewed on October 1, 2023</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "Excellent machine! Very precise and easy to operate. Customer support was also very helpful."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white py-12 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Suggested Products</h2>
            
            {/* Horizontal Scrollable Container */}
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {relatedProducts.map((relatedProduct) => (
                  <Card 
                    key={relatedProduct.id} 
                    className="group hover:shadow-lg transition-all duration-200 flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
                  >
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
              
              {/* Scroll Indicator */}
              <div className="text-center mt-4 text-sm text-gray-500">
                ← Scroll to see more →
              </div>
            </div>
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

      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {product.images.length}
          </div>

          {/* Previous Button */}
          {product.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePreviousImage();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Main Image */}
          <div 
            className="max-w-7xl max-h-[90vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.images[lightboxIndex]}
              alt={`${product.name} - Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          {/* Next Button */}
          {product.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-screen-lg overflow-x-auto">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden rounded border-2 transition-all flex-shrink-0 ${
                    lightboxIndex === index
                      ? 'border-[#387C2B] ring-2 ring-[#387C2B]'
                      : 'border-white border-opacity-50 hover:border-[#387C2B]'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
