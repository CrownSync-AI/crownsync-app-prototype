import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children, className = '' }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Check scroll position to toggle arrows
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Allow a small buffer (1px) for calculation precision
    setShowLeft(scrollLeft > 1);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Initial check and event listener
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of view width
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`relative group/carousel ${className}`}>
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 hover:bg-gray-50 hover:scale-110 transition-all duration-300 ease-out flex items-center justify-center disabled:opacity-0 ${
          showLeft 
            ? 'opacity-0 group-hover/carousel:opacity-100 translate-x-[-30%] pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      {/* Scroll Container */}
      {/* Added pb-10 to accommodate hover effects of children (shadows), simplified from original hardcoded pb-10 in Overview */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-10 -mx-6 px-6 no-scrollbar snap-x items-stretch scroll-smooth relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Ensure hidden scrollbar
      >
        {children}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 hover:bg-gray-50 hover:scale-110 transition-all duration-300 ease-out flex items-center justify-center disabled:opacity-0 ${
          showRight 
            ? 'opacity-0 group-hover/carousel:opacity-100 translate-x-[30%] pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
