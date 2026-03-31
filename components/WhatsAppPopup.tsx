'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';

interface WhatsAppPopupProps {
  onClose?: () => void;
}

export default function WhatsAppPopup({ onClose }: WhatsAppPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay once the splash screen is gone
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-[300px] bg-zinc-900 border border-white/10 rounded-[2.5rem] p-6 shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-[50px] pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5 z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              {/* Circular WhatsApp Logo */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] border-2 border-white/10"
              >
                <MessageCircle className="w-8 h-8 text-white fill-current" />
              </motion.div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">
                  Join WhatsApp
                </h3>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em] leading-relaxed">
                  Get instant updates and exclusive content.
                </p>
              </div>

              <a 
                href="https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-xl shadow-green-500/20 flex items-center justify-center gap-2 group"
              >
                Join Now
                <motion.span 
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>

              <button 
                onClick={handleClose}
                className="text-[9px] text-white/20 hover:text-white/40 font-black uppercase tracking-widest transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
