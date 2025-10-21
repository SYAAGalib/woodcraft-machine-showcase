import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { 
  getCategories, 
  getFeaturedProducts, 
  incrementProductViewBySlug,
  type Category,
  type Product
} from '@/utils/dataManager';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  useEffect(() => {
    setCategories(getCategories());
    setFeaturedProducts(getFeaturedProducts());
  }, []);

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

  const handleProductView = (slug: string) => {
    incrementProductViewBySlug(slug);
  };

  const clients = [
    { name: 'WoodCraft Industries', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop' },
    { name: 'Timber Tech Solutions', logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop' },
    { name: 'Forest Products Ltd', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop' },
    { name: 'Premium Lumber Co', logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] bg-gradient-to-r from-[#387C2B] to-[#8B5E3C] overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: '/public/dolphin-banar.jpg',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Industrial Wood
              <span className="text-[#387C2B] block">Machinery Excellence</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
              Precision-engineered CNC machines, sawmills, dryers, and edge banders for professional woodworking operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#387C2B] hover:bg-[#2d6322] text-lg px-8 py-3">
                Explore Machinery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#387C2B] text-lg px-8 py-3">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Machinery Categories Section - Updated with round design */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Machinery Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of wood processing machinery designed to meet every aspect of your production needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <div key={category.id} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-green-100 text-sm">{category.productCount} Products</p>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <Link
                    to={`/category/${category.slug}`}
                    className="inline-flex items-center text-[#387C2B] font-semibold hover:text-[#2d6322] transition-colors"
                  >
                    View All Products
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Machinery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular and advanced wood processing equipment
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#387C2B] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
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
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Link 
                          to={`/product/${product.slug}`}
                          onClick={() => handleProductView(product.slug)}
                        >
                          <Button size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured products available yet.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/category/cnc-machines">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing the highest quality wood processing machinery and services to our customers. Our team of experts is dedicated to helping you achieve your woodworking goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop"
                alt="Quality Assurance"
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-200"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Quality Assurance</h3>
                <p className="text-gray-600">Our machinery is rigorously tested and certified to meet the highest standards.</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop"
                alt="Customer Support"
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-200"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
                <p className="text-gray-600">Our dedicated team is available to answer any questions or concerns you may have.</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop"
                alt="Competitive Pricing"
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-200"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Competitive Pricing</h3>
                <p className="text-gray-600">We offer competitive pricing for our machinery and services to ensure you get the best value for your money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Views Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Recent Views
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers are currently viewing on our website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#387C2B] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
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
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Link 
                        to={`/product/${product.slug}`}
                        onClick={() => handleProductView(product.slug)}
                      >
                        <Button size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Over 500+ satisfied customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-200"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-md">
              <Users className="h-6 w-6 text-[#387C2B]" />
              <span className="text-lg font-semibold">500+ Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#387C2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your Workshop?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Get personalized recommendations and competitive quotes for your wood processing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#387C2B] hover:bg-gray-100 text-lg px-8 py-3">
                Get Free Consultation
              </Button>
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#387C2B] text-lg px-8 py-3">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
