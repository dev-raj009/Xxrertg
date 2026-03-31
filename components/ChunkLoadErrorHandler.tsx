'use client';
import { useEffect } from 'react';

export default function ChunkLoadErrorHandler() {
  useEffect(() => {
    const handleChunkError = (event: ErrorEvent) => {
      // Check if the error is a ChunkLoadError
      if (event.message && (event.message.includes('ChunkLoadError') || event.message.includes('Loading chunk'))) {
        window.location.reload();
      }
    };
    window.addEventListener('error', handleChunkError, true);
    return () => window.removeEventListener('error', handleChunkError, true);
  }, []);
  return null;
}
