import React, { useState, useRef, useCallback } from 'react';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
  title?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Restoration',
  afterLabel = 'After Reupholstery',
  className = '',
  aspectRatio = 'aspect-4/3',
  title,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-lg select-none shadow-md ${aspectRatio} ${className}`}>
      <div 
        ref={containerRef}
        className="w-full h-full relative cursor-ew-resize overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* "After" Image (Underneath) */}
        <img 
          src={getDirectImageUrl(afterImage)} 
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const fallback = getDriveFallbackUrl(afterImage);
            if (e.currentTarget.src !== fallback) {
              e.currentTarget.src = fallback;
            }
          }}
        />

        {/* "Before" Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={getDirectImageUrl(beforeImage)} 
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover filter brightness-95"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const fallback = getDriveFallbackUrl(beforeImage);
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
          />
          <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#1F1B18]/80 text-[#FAF8F5] text-[11px] uppercase tracking-wider font-sans font-medium rounded backdrop-blur-sm shadow-sm">
            {beforeLabel}
          </span>
        </div>

        {/* "After" Label */}
        <span className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-[#FAF8F5]/90 text-[#1F1B18] text-[11px] uppercase tracking-wider font-sans font-medium rounded backdrop-blur-sm shadow-sm">
          {afterLabel}
        </span>

        {/* Divider Line & Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#1F1B18] shadow-lg flex items-center justify-center border border-[#E0D7C9] cursor-ew-resize">
            <svg className="w-4 h-4 text-[#2C2723]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-black/40 text-white/90 text-[10px] uppercase tracking-widest font-sans rounded-full pointer-events-none backdrop-blur-xs">
          Drag to compare
        </div>
      </div>

      {title && (
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium">
          {title}
        </div>
      )}
    </div>
  );
};
