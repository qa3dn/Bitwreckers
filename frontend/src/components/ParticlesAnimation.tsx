'use client';

import { useState } from 'react';

const ParticlesAnimation = () => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div 
        className="fixed inset-0 w-full h-full -z-10 pattern-animation"
        style={{
          background: 'linear-gradient(45deg, #1a1a2e 25%, transparent 25%), linear-gradient(-45deg, #1a1a2e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a2e 75%), linear-gradient(-45deg, transparent 75%, #1a1a2e 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          opacity: 0.3
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
      <img
        src="/assets/patterns/Pattern.png"
        alt="Pattern Background"
        className="w-full h-full object-cover opacity-60 pattern-animation"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          minWidth: '100%',
          minHeight: '100%',
          width: '100%',
          height: '100%'
        }}
        onError={() => {
          console.log('Image failed to load, using fallback');
          setImageError(true);
        }}
        onLoad={() => {
          console.log('Image loaded successfully');
        }}
      />
    </div>
  );
};

export default ParticlesAnimation;