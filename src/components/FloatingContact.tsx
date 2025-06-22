
import React, { useState } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions = [
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500 hover:bg-green-600',
      href: 'https://wa.me/1234567890',
    },
    {
      name: 'Messenger',
      icon: MessageSquare,
      color: 'bg-blue-500 hover:bg-blue-600',
      href: 'https://m.me/your-page',
    },
    {
      name: 'Facebook',
      icon: MessageSquare,
      color: 'bg-blue-600 hover:bg-blue-700',
      href: 'https://facebook.com/your-page',
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Contact Options */}
      {isExpanded && (
        <div className="mb-3 space-y-2 sm:space-y-0 sm:space-x-2 sm:flex sm:flex-row-reverse">
          {contactOptions.map((option) => (
            <a
              key={option.name}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${option.color} text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2 sm:space-x-0`}
            >
              <option.icon className="h-5 w-5" />
              <span className="sm:hidden">{option.name}</span>
            </a>
          ))}
        </div>
      )}

      {/* Main Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`rounded-full p-4 shadow-lg transition-all duration-200 ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-[#387C2B] hover:bg-[#2d6322] hover:scale-105'
        }`}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <Phone className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingContact;
