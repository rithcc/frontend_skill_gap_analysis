import { useEffect, useState } from 'react';

export const useGoogleFont = (fontFamily: string) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is already loaded
    if (document.fonts && document.fonts.check) {
      const isLoaded = document.fonts.check(`12px "${fontFamily}"`);
      if (isLoaded) {
        setFontLoaded(true);
        return;
      }
    }

    // Load Google Font
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    
    link.onload = () => {
      setFontLoaded(true);
    };
    
    document.head.appendChild(link);

    return () => {
      // Cleanup if needed
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [fontFamily]);

  return fontLoaded ? fontFamily : 'system-ui, -apple-system, sans-serif';
};
