'use client';

import { useEffect, useRef, useState, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import LoadingOverlay from '@/components/LoadingOverlay';

const safeConsole = {
  error: (...args: any[]) => {
    console.error(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  },
  warn: (...args: any[]) => {
    console.warn(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  },
  log: (...args: any[]) => {
    console.log(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  }
};

function PlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoUrl = searchParams.get('url') || searchParams.get('v') || '';
  const title = searchParams.get('title') || 'Live Stream';
  const isPortrait = searchParams.get('portrait') === 'true';
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const placeholderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  
  const url = videoUrl.toLowerCase();
  // Assume it's a direct video unless it's a known embed provider or explicitly contains 'embed'
  const isEmbed = url.includes('youtube.com') || 
                  url.includes('youtu.be') || 
                  url.includes('vimeo.com') || 
                  url.includes('embed') || 
                  url.includes('iframe');
  const isDirect = !isEmbed;

  const initPlayer = useCallback(() => {
    if (!videoUrl || !isDirect) return;
    
    setIsLoading(true);
    setHasError(false);

    // Cleanup existing player if it exists before re-initializing
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
    
    if (placeholderRef.current) {
      placeholderRef.current.innerHTML = '';
      const videoElement = document.createElement("video");
      videoElement.classList.add('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoElement.classList.add('w-full');
      videoElement.classList.add('h-full');
      videoElement.setAttribute('crossorigin', 'anonymous');
      videoElement.setAttribute('playsinline', 'true');
      placeholderRef.current.appendChild(videoElement);

      try {
        const player = videojs(videoElement, {
          autoplay: true,
          muted: false, // Start unmuted if possible, or let user decide
          controls: true,
          responsive: true,
          fill: true,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          userActions: {
            hotkeys: true
          },
          sources: [{
            src: videoUrl,
            type: (videoUrl.includes('.m3u8') || videoUrl.includes('m3u8')) ? 'application/x-mpegURL' : 'video/mp4'
          }]
        });

        playerRef.current = player;

        player.on('ready', () => {
          safeConsole.log("Video.js player ready");
          setIsLoading(false);
        });

        player.on('error', () => {
          setIsLoading(false);
          setHasError(true);
          const error = player.error();
          safeConsole.error("Video.js error:", error ? { message: error.message, code: error.code } : "Unknown error");
        });

        player.on('loadeddata', () => {
          setIsLoading(false);
        });

      } catch (error) {
        safeConsole.error("Failed to initialize videojs player", error instanceof Error ? error.message : String(error));
        setIsLoading(false);
        setHasError(true);
      }
    }
  }, [videoUrl, isDirect, setIsLoading, setHasError]);

  useEffect(() => {
    // Use a small delay to avoid synchronous setState in effect warning
    const timer = setTimeout(() => {
      initPlayer();
    }, 0);
    return () => clearTimeout(timer);
  }, [initPlayer]);

  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  if (!videoUrl) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>No video URL provided.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <LoadingOverlay isLoading={isLoading} />
      {/* Top Bar - Minimal */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => router.back()}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all active:scale-95 group shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <div className="pointer-events-auto px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex flex-col items-end shadow-lg">
          <h2 className="text-sm font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-md">
            {title}
          </h2>
          <span className="text-[8px] text-blue-400 font-black uppercase tracking-[0.3em]">VIP Study Player</span>
        </div>
      </div>

      {/* Main Player Area */}
      <div className={`flex-grow w-full h-full relative flex items-center justify-center ${isPortrait ? 'p-4 sm:p-12' : ''}`}>
        <div className={`relative ${isPortrait ? 'aspect-[9/16] h-full max-h-[85vh] w-auto shadow-[0_0_100px_rgba(255,255,255,0.1)] rounded-[3rem] overflow-hidden border border-white/10' : 'w-full h-full'}`}>
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <X className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Playback Error</h3>
              <p className="text-slate-400 text-sm max-w-xs mb-8">
                We couldn&apos;t load this video. It might be private, deleted, or in an unsupported format.
              </p>
              <button 
                onClick={initPlayer}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg"
              >
                Try Reloading
              </button>
            </div>
          ) : isDirect ? (
            <div data-vjs-player className="absolute inset-0 w-full h-full">
              <div ref={placeholderRef} className="w-full h-full" />
            </div>
          ) : (
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-600 rounded-full animate-spin" />
      </div>
    }>
      <PlayerContent />
    </Suspense>
  );
}
