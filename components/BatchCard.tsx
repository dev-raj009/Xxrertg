'use client';

import { Video } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Batch } from '@/lib/api';

interface BatchCardProps {
  batch: Batch;
  onClick: (batch: Batch) => void;
}

export default function BatchCard({ batch, onClick }: BatchCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative aspect-square overflow-hidden cursor-pointer bg-black border border-white/10 transition-all duration-500 flex flex-col w-full shadow-2xl"
      onClick={() => onClick(batch)}
    >
      {/* White Box on Top Side */}
      <div className="relative z-20 bg-white py-2 px-3 border-b border-white/10">
        <h2 className="text-[10px] sm:text-[11px] font-black text-black uppercase tracking-tighter text-center leading-tight line-clamp-1">
          {batch.name}
        </h2>
        <p className="text-[7px] font-bold text-black/60 uppercase tracking-[0.1em] text-center mt-0.5">
          {batch.teacher}
        </p>
      </div>

      {/* Perfectly Photographed Image Section */}
      <div className="relative flex-1 w-full overflow-hidden">
        <Image 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQplsQXlw5tJeRL0dIeJBFZrs0Lzjh9d8ajkLbOSsHwbA&s=10" 
          alt={batch.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          priority // Ensure instant loading
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        
        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-black text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
              Premium
            </span>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
              <Video className="w-3 h-3 text-black" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
