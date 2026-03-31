'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SecurityGuard() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip security on the video player page
    if (pathname === '/play') {
      return;
    }

    // 1. Disable Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Keyboard Shortcuts for DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I / Cmd+Option+I (Inspect)
      if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.altKey && e.key === 'i')) {
        e.preventDefault();
      }
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey && e.shiftKey && e.key === 'J') || (e.metaKey && e.altKey && e.key === 'j')) {
        e.preventDefault();
      }
      // Ctrl+Shift+C / Cmd+Shift+C (Inspect Element)
      if ((e.ctrlKey && e.shiftKey && e.key === 'C') || (e.metaKey && e.shiftKey && e.key === 'c')) {
        e.preventDefault();
      }
      // Ctrl+U / Cmd+Option+U (View Source)
      if ((e.ctrlKey && e.key === 'U') || (e.metaKey && e.altKey && e.key === 'u')) {
        e.preventDefault();
      }
    };

    // 3. Detect DevTools via window resize (less intrusive than debugger)
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // DevTools likely open
        // safeConsole.warn("DevTools detected");
      }
    };

    // Set up listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    // Run detection periodically
    const intervalId = setInterval(detectDevTools, 2000);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalId);
    };
  }, [pathname]);

  return null; // This component doesn't render anything visible
}
