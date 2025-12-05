import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const Drawer = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  width = "max-w-md", // Allow custom width classes
  zIndex = "z-[9999]" 
}) => {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  // Synchronously update isMounted if isOpen becomes true provided we weren't already mounted
  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  useEffect(() => {
    if (isOpen) {
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      requestAnimationFrame(() => setIsAnimating(false));
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return createPortal(
    <div className={`fixed inset-0 ${zIndex} flex justify-end`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div 
        className={`relative bg-white w-full ${width} h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50 flex-shrink-0">
            <div className="flex-1">
              {typeof title === 'string' ? (
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              ) : (
                title
              )}
            </div>
            {onClose && (
              <button 
                onClick={onClose} 
                className="p-2 -mr-2 hover:bg-gray-200 rounded-full transition text-gray-500 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
