import React, { useEffect } from 'react';
import { isNative, hideSplashScreen, setStatusBarColor } from '../lib/capacitor';

export const MobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (isNative) {
      // Initialize mobile features
      hideSplashScreen();
      setStatusBarColor('#ffffff', true);
      
      // Prevent context menu
      const preventDefault = (e: Event) => e.preventDefault();
      document.addEventListener('contextmenu', preventDefault);
      
      return () => {
        document.removeEventListener('contextmenu', preventDefault);
      };
    }
  }, []);

  return (
    <div className="min-h-screen safe-area-inset">
      <style dangerouslySetInnerHTML={{ __html: `
        .safe-area-inset {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        * {
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }
        input, textarea {
          user-select: text;
        }
      `}} />
      {children}
    </div>
  );
};