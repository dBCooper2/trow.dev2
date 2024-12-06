"use client";

import React, { useEffect, useRef, useState } from 'react';

interface InstagramEmbedProps {
  url: string;
  className?: string;
  padding?: string;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ 
  url, 
  className = '', 
  padding = '1rem' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    
    const loadInstagramScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      
      script.onload = () => {
        try {
          // Trigger Instagram embed processing
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
            setIsLoaded(true);
          }
        } catch (processingError) {
          setError('Failed to process Instagram embed');
        }
      };
      
      script.onerror = () => {
        setError('Could not load Instagram embed script');
      };

      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      };
    };

    // If script is not already loaded, load it
    if (!existingScript) {
      const cleanup = loadInstagramScript();
      return cleanup;
    } else {
      // If script is already present, try to process
      try {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
          setIsLoaded(true);
        }
      } catch (processingError) {
        setError('Failed to process existing Instagram embed');
      }
    }
  }, [url]);

  if (error) {
    return (
      <div 
        className={`bg-red-50 border border-red-200 p-4 rounded ${className}`}
        style={{ padding }}
      >
        <p className="text-red-600">Instagram Embed Error</p>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`w-full ${className}`} 
      style={{ padding }}
    >
      <blockquote 
        className="instagram-media" 
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      ></blockquote>
    </div>
  );
};

export default InstagramEmbed;