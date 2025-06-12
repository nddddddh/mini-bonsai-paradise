
import React from 'react';
import { Facebook } from 'lucide-react';

const FloatingFacebookIcon = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href="https://www.facebook.com/thaiduong.le.123276"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
        aria-label="Theo dõi chúng tôi trên Facebook"
      >
        <Facebook className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500"></div>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-50 animate-ping"></div>
      </a>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Theo dõi Facebook
          <div className="absolute top-full left-2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingFacebookIcon;
