
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface SlidePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  captions: string[];
  theme: string;
}

const getThemeColors = (theme: string) => {
  switch (theme) {
    case 'vibrant':
      return {
        backgroundColor: '#FF6B35',
        textColor: '#FFFFFF',
        accentColor: '#FFE66D'
      };
    case 'minimal':
      return {
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
        accentColor: '#4ECDC4'
      };
    case 'dark':
      return {
        backgroundColor: '#2D3748',
        textColor: '#FFFFFF',
        accentColor: '#9F7AEA'
      };
    default:
      return {
        backgroundColor: '#FF6B35',
        textColor: '#FFFFFF',
        accentColor: '#FFE66D'
      };
  }
};

const SlidePreviewModal = ({ isOpen, onClose, userName, captions, theme }: SlidePreviewModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const themeColors = getThemeColors(theme);
  
  const totalSlides = captions.length;

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 max-w-4xl w-full mx-4"
        >
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Progress Bars */}
          <div className="flex space-x-1 mb-6">
            {captions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
              >
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    index === currentSlide ? 'w-full' : index < currentSlide ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Slide Container */}
          <div className="relative flex items-center justify-center">
            {/* Previous Button */}
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="absolute left-0 z-10 text-white hover:bg-white/20"
              disabled={totalSlides <= 1}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Slide */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-[700px] h-[420px] rounded-lg overflow-hidden shadow-2xl"
              style={{ backgroundColor: themeColors.backgroundColor }}
            >
              <div className="w-full h-full flex flex-col justify-center items-center text-center p-8">
                {currentSlide === 0 ? (
                  // Title slide
                  <>
                    <div
                      className="text-3xl font-black uppercase tracking-wide mb-4"
                      style={{ color: themeColors.textColor }}
                    >
                      {userName.split(' ')[0]}'S 2024
                    </div>
                    <div
                      className="text-6xl font-black uppercase"
                      style={{ color: themeColors.accentColor }}
                    >
                      WRAPPED
                    </div>
                    <div
                      className="text-2xl font-bold uppercase mt-4"
                      style={{ color: themeColors.textColor }}
                    >
                      EXPERIENCE
                    </div>
                  </>
                ) : (
                  // Content slides with markdown rendering
                  <div
                    className="text-2xl font-bold leading-relaxed px-4 prose prose-invert max-w-none"
                    style={{ color: themeColors.textColor }}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <div className="mb-4">{children}</div>,
                        strong: ({ children }) => <strong className="font-black">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        h1: ({ children }) => <h1 className="text-4xl font-black mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                      }}
                    >
                      {captions[currentSlide - 1]}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Next Button */}
            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="absolute right-0 z-10 text-white hover:bg-white/20"
              disabled={totalSlides <= 1}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4 text-white/70">
            {currentSlide + 1} / {totalSlides + 1}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SlidePreviewModal;
