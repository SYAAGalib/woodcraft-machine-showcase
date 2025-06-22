
import React, { useState } from 'react';
import { MessageCircle, Phone, Facebook, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: 'https://wa.me/1234567890?text=Hello! I\'m interested in your wood machinery products.',
    },
    {
      name: 'Messenger',
      icon: MessageCircle,
      color: 'bg-blue-500 hover:bg-blue-600',
      url: 'https://m.me/your-facebook-page',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: 'https://facebook.com/your-page',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Contact Options */}
        {isExpanded && (
          <div className="flex flex-col space-y-3 animate-slide-up">
            {contactOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Button
                  size="lg"
                  className={`${option.color} text-white shadow-lg transition-all duration-200 transform hover:scale-105 w-14 h-14 rounded-full p-0`}
                >
                  <option.icon className="h-6 w-6" />
                </Button>
                <span className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {option.name}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Main Contact Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="lg"
          className={`${
            isExpanded ? 'bg-gray-600 hover:bg-gray-700' : 'bg-[#387C2B] hover:bg-[#2d6322]'
          } text-white shadow-lg transition-all duration-200 transform hover:scale-105 w-16 h-16 rounded-full p-0`}
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <Phone className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FloatingContact;
