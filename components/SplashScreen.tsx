'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  // Safety timeout: ensure splash screen disappears after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 3.2, ease: "easeInOut" }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-between py-24 px-6 overflow-hidden"
    >
      {/* Global Background Grid & Boxes (Matching Main Page) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Animated Boxes */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100, 0],
                y: [0, 100, 0],
                rotate: [0, 180, 360],
                opacity: [0.02, 0.05, 0.02],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute border border-white/20 rounded-3xl"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${10 + i * 25}%`,
                top: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Subtle White Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Text */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 text-white font-black tracking-[0.6em] uppercase text-xl sm:text-2xl drop-shadow-lg"
      >
        VIP STUDY
      </motion.div>

      {/* Middle Content - Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 80,
            damping: 12,
            delay: 0.6 
          }}
          className="relative"
        >
          {/* Logo Glow */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-[60px] animate-pulse" />
          
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] bg-white p-1 shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/30">
            <Image 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFiOArGccGbHFle5hGbUx3hiSK3agL_trYEzItsjBbQ&s=10" 
              alt="VIP Study Logo" 
              width={160} 
              height={160} 
              className="object-cover rounded-[2rem]"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Badge */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -bottom-4 -right-4 bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl border-2 border-white"
          >
            VIP STUDY
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <div className="h-px w-12 bg-white/30" />
        <div className="text-white/90 font-black tracking-[0.4em] uppercase text-xs sm:text-sm">
          Powered by Raj
        </div>
      </motion.div>
    </motion.div>
  );
}
