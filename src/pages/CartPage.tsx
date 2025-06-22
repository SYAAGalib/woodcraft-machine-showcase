
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, MessageSquare, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const generateWhatsAppMessage = () => {
    if (state.items.length === 0) return '';
    
    const items = state.items.map(item => 
      `• ${item.name} (Qty: ${item.quantity})`
    ).join('\n');
    
    const message = `Hello! I'm interested in the following machinery from Dolphine Wood Machineries:\n\n${items}\n\nPlease provide me with a detailed quote including:\n- Individual item pricing\n- Bulk discount pricing (if applicable)\n- Delivery timeline\n- Installation services\n- Training programs\n- Warranty details\n\nThank you!`;
    return encodeURIComponent(message);
  };

  const generateMessengerMessage = () => {
    if (state.items.length === 0) return '';
    
    const items = state.items.map(item => 
      `${item.name} (Qty: ${item.quantity})`
    ).join(', ');
    
    return `Interested in quote for: ${items}. Please provide detailed pricing and delivery information.`;
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Your Cart ({totalItems} items)
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring our industrial wood machinery collection and add items to your cart for personalized quotes.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-[#387C2B] hover:bg-[#2d6322]">
                Explore Machinery
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {state.items.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="sm:w-32 aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <Link
                              to={`/product/${item.slug}`}
                              className="text-lg font-semibold text-gray-900 hover:text-[#387C2B] transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500 capitalize mt-1">
                              {item.category.replace('-', ' ')}
                            </p>
                            <p className="text-lg font-bold text-[#387C2B] mt-2">
                              {item.price}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-lg font-medium w-12 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                              className="text-red-500 hover:text-red-700 h-8 w-8 p-0 ml-4"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Need to start over?</span>
                    <Button
                      variant="outline"
                      onClick={() => dispatch({ type: 'CLEAR_CART' })}
                      className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quote Request Section */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Request Your Quote
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-medium">{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Categories:</span>
                      <span className="font-medium">
                        {new Set(state.items.map(item => item.category)).size}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 text-center">
                        Pricing includes consultation, delivery estimates, and bulk discounts where applicable
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/1234567890?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Get Quote via WhatsApp
                      </Button>
                    </a>
                    
                    <a
                      href={`https://m.me/your-page?text=${generateMessengerMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full" size="lg">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Get Quote via Messenger
                      </Button>
                    </a>
                    
                    <Link to="/contact" className="w-full">
                      <Button variant="outline" className="w-full" size="lg">
                        Contact Form Quote
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      What You'll Get:
                    </h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Detailed pricing for each item</li>
                      <li>• Bulk discount opportunities</li>
                      <li>• Delivery timeline estimates</li>
                      <li>• Installation & training options</li>
                      <li>• Financing solutions available</li>
                      <li>• 24-48 hour response time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Services */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Additional Services
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="installation" className="rounded" />
                      <label htmlFor="installation" className="text-gray-600">
                        Professional Installation
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="training" className="rounded" />
                      <label htmlFor="training" className="text-gray-600">
                        Operator Training Program
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="maintenance" className="rounded" />
                      <label htmlFor="maintenance" className="text-gray-600">
                        Extended Maintenance Plan
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="financing" className="rounded" />
                      <label htmlFor="financing" className="text-gray-600">
                        Financing Options
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
