
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
        accentColor: '#FFE66D',
        slideBackgrounds: ['#FF6B35', '#FF3E75', '#8B5CF6', '#06D6A0', '#FFD166', '#EF476F', '#118AB2'],
        highlightColors: ['#FFE66D', '#FF9F1C', '#FCBF49', '#F77F00', '#D62828', '#FCBF49']
      };
    case 'minimal':
      return {
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
        accentColor: '#4ECDC4',
        slideBackgrounds: ['#000000', '#1A1A2E', '#16213E', '#0F3460', '#E94560', '#533483', '#7209B7'],
        highlightColors: ['#4ECDC4', '#A8E6CF', '#FFD93D', '#6BCF7F', '#4D96FF', '#9B59B6']
      };
    case 'dark':
      return {
        backgroundColor: '#2D3748',
        textColor: '#FFFFFF',
        accentColor: '#9F7AEA',
        slideBackgrounds: ['#2D3748', '#4A5568', '#553C9A', '#667EEA', '#764BA2', '#F093FB', '#F5576C'],
        highlightColors: ['#9F7AEA', '#ED64A6', '#48BB78', '#ED8936', '#4299E1', '#38B2AC']
      };
    default:
      return {
        backgroundColor: '#FF6B35',
        textColor: '#FFFFFF',
        accentColor: '#FFE66D',
        slideBackgrounds: ['#FF6B35', '#FF3E75', '#8B5CF6', '#06D6A0', '#FFD166', '#EF476F', '#118AB2'],
        highlightColors: ['#FFE66D', '#FF9F1C', '#FCBF49', '#F77F00', '#D62828', '#FCBF49']
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

  // Get dynamic background color for current slide
  const getCurrentSlideBackground = () => {
    if (currentSlide === 0) return themeColors.backgroundColor;
    const slideIndex = (currentSlide - 1) % themeColors.slideBackgrounds.length;
    return themeColors.slideBackgrounds[slideIndex];
  };

  // Get random highlight color
  const getRandomHighlightColor = () => {
    const colors = themeColors.highlightColors;
    return colors[Math.floor(Math.random() * colors.length)];
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
              className="w-[700px] h-[420px] rounded-lg overflow-hidden shadow-2xl relative"
              style={{ backgroundColor: getCurrentSlideBackground() }}
            >
              {/* Dynamic gradient overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${themeColors.accentColor}33, transparent 70%)`
                }}
              />
              
              <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-8">
                {currentSlide === 0 ? (
                  // Title slide with enhanced styling
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-black uppercase tracking-wide mb-4"
                      style={{ color: themeColors.textColor }}
                    >
                      {userName.split(' ')[0]}'S 2024
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-6xl font-black uppercase mb-4"
                      style={{ 
                        color: themeColors.accentColor,
                        textShadow: '0 0 20px rgba(255,255,255,0.3)'
                      }}
                    >
                      WRAPPED
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-2xl font-bold uppercase mt-4"
                      style={{ color: themeColors.textColor }}
                    >
                      EXPERIENCE
                    </motion.div>
                  </>
                ) : (
                  // Content slides with dynamic markdown rendering
                  <div className="text-2xl font-bold leading-relaxed px-4 prose prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <div className="mb-6 text-white leading-tight" style={{ fontSize: '1.8rem' }}>
                            {children}
                          </div>
                        ),
                        strong: ({ children }) => (
                          <strong 
                            className="font-black text-4xl inline-block mx-2 drop-shadow-lg"
                            style={{ 
                              color: getRandomHighlightColor(),
                              textShadow: '0 0 10px rgba(0,0,0,0.5)'
                            }}
                          >
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em 
                            className="italic text-3xl font-bold"
                            style={{ 
                              color: getRandomHighlightColor(),
                              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}
                          >
                            {children}
                          </em>
                        ),
                        h1: ({ children }) => (
                          <h1 
                            className="text-5xl font-black mb-6 uppercase tracking-wide"
                            style={{ 
                              color: themeColors.accentColor,
                              textShadow: '0 0 15px rgba(255,255,255,0.3)'
                            }}
                          >
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 
                            className="text-4xl font-bold mb-4 uppercase"
                            style={{ 
                              color: getRandomHighlightColor(),
                              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                            }}
                          >
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 
                            className="text-3xl font-bold mb-3"
                            style={{ 
                              color: getRandomHighlightColor()
                            }}
                          >
                            {children}
                          </h3>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-none mb-6 space-y-3">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-none mb-6 space-y-3">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li 
                            className="mb-2 text-2xl font-semibold flex items-center justify-center"
                            style={{ color: themeColors.textColor }}
                          >
                            <span 
                              className="inline-block w-3 h-3 rounded-full mr-3"
                              style={{ backgroundColor: getRandomHighlightColor() }}
                            />
                            {children}
                          </li>
                        ),
                        // Custom component to handle numbers
                        text: ({ children }) => {
                          if (typeof children === 'string') {
                            // Split text and highlight numbers
                            return children.split(/(\d+(?:,\d+)*(?:\.\d+)?)/g).map((part, index) => {
                              if (/^\d+(?:,\d+)*(?:\.\d+)?$/.test(part)) {
                                return (
                                  <span
                                    key={index}
                                    className="font-black text-5xl mx-1 inline-block"
                                    style={{
                                      color: getRandomHighlightColor(),
                                      textShadow: '0 0 15px rgba(255,255,255,0.4)',
                                      transform: 'scale(1.2)'
                                    }}
                                  >
                                    {part}
                                  </span>
                                );
                              }
                              return part;
                            });
                          }
                          return children;
                        }
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
