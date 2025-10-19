'use client';

import { useState, useEffect } from 'react';

const PatternBackground = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Force image load check
    const img = new Image();
    img.onload = () => {
      console.log('Pattern image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.log('Pattern image failed to load');
      setImageError(true);
    };
    img.src = '/assets/patterns/Pattern.png';
  }, []);

  if (imageError) {
    return (
      <div 
        className="absolute inset-0 w-full h-full pattern-fallback"
        style={{
          background: 'linear-gradient(45deg, rgba(107, 45, 115, 0.3) 25%, transparent 25%), linear-gradient(-45deg, rgba(107, 45, 115, 0.3) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(107, 45, 115, 0.3) 75%), linear-gradient(-45deg, transparent 75%, rgba(107, 45, 115, 0.3) 75%)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
          opacity: 0.6
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
      <img
        src="/assets/patterns/Pattern.png"
        alt="Pattern Background"
        className={`w-full h-full object-cover pattern-animation transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          minWidth: '100%',
          minHeight: '100%',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        onError={() => {
          console.log('Image failed to load, using fallback');
          setImageError(true);
        }}
        onLoad={() => {
          console.log('Image loaded successfully');
          setImageLoaded(true);
        }}
      />
    </div>
  );
};

export default PatternBackground;
