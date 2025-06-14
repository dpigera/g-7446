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
  projectName?: string;
}

const getThemeColors = (theme: string) => {
  switch (theme) {
    case 'vibrant':
      return {
        backgroundColor: '#FF6B35',
        textColor: '#FFFFFF',
        accentColor: '#FFE66D',
        slideBackgrounds: ['#FF6B35', '#FF3E75', '#8B5CF6', '#06D6A0', '#FFD166', '#EF476F', '#118AB2', '#F72585', '#7209B7', '#F77F00'],
        highlightColors: ['#FFE66D', '#FF9F1C', '#FCBF49', '#F77F00', '#D62828', '#FCBF49', '#00F5FF', '#FF1493', '#32CD32', '#FF4500'],
        dynamicColors: ['#FF0080', '#00FF80', '#8000FF', '#FF8000', '#0080FF', '#FF0040', '#40FF00', '#8040FF', '#FF4080', '#00FF40']
      };
    case 'minimal':
      return {
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
        accentColor: '#4ECDC4',
        slideBackgrounds: ['#000000', '#1A1A2E', '#16213E', '#0F3460', '#E94560', '#533483', '#7209B7', '#2D1B69', '#8B0000', '#191970'],
        highlightColors: ['#4ECDC4', '#A8E6CF', '#FFD93D', '#6BCF7F', '#4D96FF', '#9B59B6', '#FF69B4', '#00CED1', '#FF6347', '#98FB98'],
        dynamicColors: ['#00FFFF', '#FF00FF', '#FFFF00', '#FF007F', '#7FFF00', '#007FFF', '#FF7F00', '#7F00FF', '#00FF7F', '#FF007F']
      };
    case 'dark':
      return {
        backgroundColor: '#2D3748',
        textColor: '#FFFFFF',
        accentColor: '#9F7AEA',
        slideBackgrounds: ['#2D3748', '#4A5568', '#553C9A', '#667EEA', '#764BA2', '#F093FB', '#F5576C', '#1A202C', '#2C5282', '#6B46C1'],
        highlightColors: ['#9F7AEA', '#ED64A6', '#48BB78', '#ED8936', '#4299E1', '#38B2AC', '#F56565', '#68D391', '#4FD1C7', '#FC8181'],
        dynamicColors: ['#E53E3E', '#38A169', '#3182CE', '#805AD5', '#D69E2E', '#319795', '#E53E3E', '#9F7AEA', '#48BB78', '#4299E1']
      };
    default:
      return {
        backgroundColor: '#FF6B35',
        textColor: '#FFFFFF',
        accentColor: '#FFE66D',
        slideBackgrounds: ['#FF6B35', '#FF3E75', '#8B5CF6', '#06D6A0', '#FFD166', '#EF476F', '#118AB2'],
        highlightColors: ['#FFE66D', '#FF9F1C', '#FCBF49', '#F77F00', '#D62828', '#FCBF49'],
        dynamicColors: ['#FF0080', '#00FF80', '#8000FF', '#FF8000', '#0080FF']
      };
  }
};

const SlidePreviewModal = ({ isOpen, onClose, userName, captions, theme, projectName = 'PROJECT' }: SlidePreviewModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicBackgroundColor, setDynamicBackgroundColor] = useState('');
  const [dynamicTextColor, setDynamicTextColor] = useState('');
  const [colorCycleKey, setColorCycleKey] = useState(0);
  const themeColors = getThemeColors(theme);
  
  const totalSlides = captions.length;

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  // Dynamic color cycling effect
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const randomBgColor = themeColors.dynamicColors[Math.floor(Math.random() * themeColors.dynamicColors.length)];
      const randomTextColor = themeColors.highlightColors[Math.floor(Math.random() * themeColors.highlightColors.length)];
      
      setDynamicBackgroundColor(randomBgColor);
      setDynamicTextColor(randomTextColor);
      setColorCycleKey(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen, themeColors.dynamicColors, themeColors.highlightColors]);

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
    if (currentSlide === 0) return dynamicBackgroundColor || themeColors.backgroundColor;
    const slideIndex = (currentSlide - 1) % themeColors.slideBackgrounds.length;
    return dynamicBackgroundColor || themeColors.slideBackgrounds[slideIndex];
  };

  // Get random highlight color
  const getRandomHighlightColor = () => {
    const colors = themeColors.highlightColors;
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="relative backdrop-blur-xl border-2 border-white/30 rounded-2xl p-8 max-w-5xl w-full mx-4 shadow-2xl"
          style={{
            backgroundColor: 'transparent',
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.1), inset 0 0 50px rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Close Button - Fixed and Static */}
          <div className="absolute top-6 right-6 z-10">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="w-16 h-16 bg-black/80 hover:bg-black/90 text-white border-2 border-white/30 rounded-full transition-colors duration-300"
            >
              <X className="w-8 h-8" />
            </Button>
          </div>

          {/* Progress Bars */}
          <div className="flex space-x-2 mb-8">
            {captions.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-white via-yellow-300 to-white rounded-full"
                  initial={{ width: index < currentSlide ? '100%' : index === currentSlide ? '100%' : '0%' }}
                  animate={{ 
                    width: index < currentSlide ? '100%' : index === currentSlide ? '100%' : '0%',
                    boxShadow: index === currentSlide ? '0 0 20px rgba(255, 255, 255, 0.8)' : '0 0 0px rgba(255, 255, 255, 0)'
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Slide Container */}
          <div className="relative flex items-center justify-center">
            {/* Previous Button - Fixed positioning with solid background */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 z-20">
              <Button
                onClick={prevSlide}
                variant="ghost"
                size="lg"
                className="w-16 h-16 bg-black/80 hover:bg-black/90 text-white border-2 border-white/30 rounded-full transition-colors duration-300"
                disabled={totalSlides <= 1}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            </div>

            {/* Slide */}
            <motion.div
              key={`${currentSlide}-${colorCycleKey}`}
              initial={{ opacity: 0, scale: 0.8, rotateX: -20,
                z: -100 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0,
                z: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 20,
                z: -100 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4,
                staggerChildren: 0.1 }}
              className="w-[700px] h-[420px] rounded-2xl overflow-hidden shadow-2xl relative perspective-1000"
              style={{ 
                backgroundColor: getCurrentSlideBackground(),
                boxShadow: `0 0 60px ${getCurrentSlideBackground()}40, inset 0 0 100px rgba(255, 255, 255, 0.1)`
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: [
                    `linear-gradient(135deg, ${themeColors.accentColor}20, transparent 70%)`,
                    `linear-gradient(225deg, ${dynamicTextColor || themeColors.accentColor}30, transparent 60%)`,
                    `linear-gradient(45deg, ${themeColors.accentColor}25, transparent 80%)`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    animate={{
                      x: [0, Math.random() * 700],
                      y: [0, Math.random() * 420],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 5 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    style={{
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%'
                    }}
                  />
                ))}
              </div>
              
              <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-8 z-10">
                {currentSlide === 0 ? (
                  // Title slide with updated text and sizing to match template previews
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotateY: -180 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                      className="text-lg font-black uppercase tracking-wider mb-6"
                      style={{ 
                        color: dynamicTextColor || themeColors.textColor,
                        textShadow: '0 0 30px rgba(255,255,255,0.5)'
                      }}
                    >
                      2025
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 1.2, type: "tween" }}
                      className="text-3xl font-black uppercase mb-6"
                      style={{ 
                        color: themeColors.accentColor,
                        textShadow: '0 0 40px rgba(255,255,255,0.7), 0 0 80px rgba(255,255,255,0.3)',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                      }}
                    >
                      {projectName.toUpperCase()}
                    </motion.div>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="text-base font-bold uppercase mt-4"
                      style={{ 
                        color: dynamicTextColor || themeColors.textColor,
                        textShadow: '0 0 20px rgba(255,255,255,0.4)'
                      }}
                    >
                      SLIDES
                    </motion.div>
                  </motion.div>
                ) : (
                  // Content slides with entrance animation only
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-2xl font-bold leading-relaxed px-4 prose prose-invert max-w-none"
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <motion.div 
                            className="mb-6 text-white leading-tight" 
                            style={{ fontSize: '1.8rem' }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {children}
                          </motion.div>
                        ),
                        strong: ({ children }) => (
                          <strong 
                            className="font-black text-5xl inline-block mx-2"
                            style={{ 
                              color: dynamicTextColor || getRandomHighlightColor(),
                              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px currentColor',
                              filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))'
                            }}
                          >
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em 
                            className="italic text-4xl font-bold"
                            style={{ 
                              color: dynamicTextColor || getRandomHighlightColor(),
                              textShadow: '0 0 15px currentColor, 0 5px 10px rgba(0,0,0,0.3)'
                            }}
                          >
                            {children}
                          </em>
                        ),
                        h1: ({ children }) => (
                          <motion.h1 
                            className="text-6xl font-black mb-6 uppercase tracking-wide"
                            style={{ 
                              color: themeColors.accentColor,
                              textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px currentColor'
                            }}
                            initial={{ scale: 0.8, rotateX: -20 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            transition={{ duration: 0.8 }}
                          >
                            {children}
                          </motion.h1>
                        ),
                        h2: ({ children }) => (
                          <h2 
                            className="text-5xl font-bold mb-4 uppercase"
                            style={{ 
                              color: dynamicTextColor || getRandomHighlightColor(),
                              textShadow: '0 0 25px currentColor, 0 5px 15px rgba(0,0,0,0.4)'
                            }}
                          >
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 
                            className="text-4xl font-bold mb-3"
                            style={{ 
                              color: dynamicTextColor || getRandomHighlightColor(),
                              textShadow: '0 0 20px currentColor'
                            }}
                          >
                            {children}
                          </h3>
                        ),
                        ul: ({ children }) => (
                          <motion.ul 
                            className="list-none mb-6 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.2 }}
                          >
                            {children}
                          </motion.ul>
                        ),
                        ol: ({ children }) => (
                          <motion.ol 
                            className="list-none mb-6 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.2 }}
                          >
                            {children}
                          </motion.ol>
                        ),
                        li: ({ children }) => (
                          <motion.li 
                            className="mb-3 text-2xl font-semibold flex items-center justify-center"
                            style={{ color: themeColors.textColor }}
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <span 
                              className="inline-block w-4 h-4 rounded-full mr-4"
                              style={{ backgroundColor: dynamicTextColor || getRandomHighlightColor() }}
                            />
                            {children}
                          </motion.li>
                        ),
                        // Enhanced number highlighting - static but with color changes
                        text: ({ children }) => {
                          if (typeof children === 'string') {
                            return children.split(/(\d+(?:,\d+)*(?:\.\d+)?)/g).map((part, index) => {
                              if (/^\d+(?:,\d+)*(?:\.\d+)?$/.test(part)) {
                                return (
                                  <span
                                    key={index}
                                    className="font-black text-6xl mx-2 inline-block"
                                    style={{
                                      color: dynamicTextColor || getRandomHighlightColor(),
                                      textShadow: '0 0 30px currentColor, 0 0 60px rgba(255,255,255,0.5)',
                                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))'
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
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Next Button - Fixed positioning with solid background */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 z-20">
              <Button
                onClick={nextSlide}
                variant="ghost"
                size="lg"
                className="w-16 h-16 bg-black/80 hover:bg-black/90 text-white border-2 border-white/30 rounded-full transition-colors duration-300"
                disabled={totalSlides <= 1}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </div>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-6 text-white/80 text-lg font-semibold">
            {currentSlide + 1} / {totalSlides + 1}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlidePreviewModal;
