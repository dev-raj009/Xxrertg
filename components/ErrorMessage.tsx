'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ 
  message = "Failed to fetch batches. Please try again later.", 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center max-w-md mx-auto">
      <div className="bg-white/5 p-6 rounded-3xl border border-red-500/20 mb-8 relative group backdrop-blur-xl">
        <div className="absolute inset-0 blur-2xl bg-red-500/10 rounded-full group-hover:bg-red-500/20 transition-all"></div>
        <AlertCircle className="w-12 h-12 text-red-500 relative z-10" />
      </div>
      
      <h2 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">System Error</h2>
      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-10 leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-white hover:bg-white/90 flex items-center gap-3 px-8 py-4 text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.95] shadow-xl shadow-white/10"
        >
          <RefreshCw className="w-4 h-4" />
          Re-Initialize
        </button>
      )}
    </div>
  );
}
