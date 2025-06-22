
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartSlideout = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const generateWhatsAppMessage = () => {
    const items = state.items.map(item => 
      `• ${item.name} (Qty: ${item.quantity})`
    ).join('\n');
    
    const message = `Hello! I'm interested in the following machinery from Dolphine Wood Machineries:\n\n${items}\n\nPlease provide me with a detailed quote. Thank you!`;
    return encodeURIComponent(message);
  };

  const generateMessengerMessage = () => {
    const items = state.items.map(item => 
      `${item.name} (Qty: ${item.quantity})`
    ).join(', ');
    
    return `Interested in: ${items}. Please provide quote.`;
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />
      
      {/* Slideout */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Your Cart ({state.items.length})</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'CLOSE_CART' })}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  variant="outline"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.category}</p>
                        <p className="text-sm font-semibold text-[#387C2B]">{item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
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
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="text-center text-sm text-gray-600 mb-3">
                Contact us for personalized quotes and bulk pricing
              </div>
              
              <div className="space-y-2">
                <a
                  href={`https://wa.me/1234567890?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Quote via WhatsApp</span>
                </a>
                
                <a
                  href={`https://m.me/your-page?text=${generateMessengerMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Quote via Messenger</span>
                </a>
                
                <Link
                  to="/cart"
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="w-full bg-[#387C2B] hover:bg-[#2d6322] text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
              
              <Button
                variant="outline"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSlideout;
