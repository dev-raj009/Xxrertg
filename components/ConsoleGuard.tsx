'use client';

import { useEffect } from 'react';

export default function ConsoleGuard() {
  useEffect(() => {
    const originalConsole = {
      error: window.console.error,
      warn: window.console.warn,
      log: window.console.log
    };

    const safeConsole = {
      error: (...args: any[]) => {
        originalConsole.error(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
      },
      warn: (...args: any[]) => {
        originalConsole.warn(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
      },
      log: (...args: any[]) => {
        originalConsole.log(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
      }
    };

    // Override global console
    window.console.error = safeConsole.error;
    window.console.warn = safeConsole.warn;
    window.console.log = safeConsole.log;
  }, []);

  return null;
}
