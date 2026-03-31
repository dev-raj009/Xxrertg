'use client';

import { motion } from 'motion/react';

export default function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-white/20 rounded-full animate-pulse"></div>
          <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin relative z-10" />
        </div>
        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">Processing Request...</p>
      </div>
    </motion.div>
  );
}
