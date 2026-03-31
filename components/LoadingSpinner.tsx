'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = "Loading content..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="relative">
        <div className="absolute inset-0 blur-2xl bg-white/20 rounded-full animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-white/40 font-black tracking-[0.3em] text-[10px] uppercase">{message}</p>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
