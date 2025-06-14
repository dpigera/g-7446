
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled 
          ? "bg-black/90 backdrop-blur-lg shadow-sm" 
          : "bg-black"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="text-2xl font-bold text-white">
              Wrapped<span className="text-yellow-400">.ai</span>
            </div>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-300 hover:text-white font-medium transition-colors">
            How It Works
          </a>
          <a href="#examples" className="text-gray-300 hover:text-white font-medium transition-colors">
            Examples
          </a>
          <a href="#powered-by-ai" className="text-gray-300 hover:text-white font-medium transition-colors">
            AI Features
          </a>
          <a href="#track-engagement" className="text-gray-300 hover:text-white font-medium transition-colors">
            Analytics
          </a>
          <a href="#auth" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-all">
            Get Started
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg shadow-lg py-4 px-6">
          <div className="flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="text-gray-300 hover:text-white font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#examples" 
              className="text-gray-300 hover:text-white font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Examples
            </a>
            <a 
              href="#powered-by-ai" 
              className="text-gray-300 hover:text-white font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Features
            </a>
            <a 
              href="#track-engagement" 
              className="text-gray-300 hover:text-white font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </a>
            <a 
              href="#auth" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-all text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
