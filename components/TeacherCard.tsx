'use client';

import { motion } from 'motion/react';
import { Video, FileText, ClipboardList, PlayCircle, User } from 'lucide-react';
import Image from 'next/image';
import { Teacher } from '@/lib/api';

interface TeacherCardProps {
  teacher: Teacher;
  onClick: () => void;
}

export default function TeacherCard({ teacher, onClick }: TeacherCardProps) {
  // Mock subject based on name or generic
  const subject = teacher.name.toLowerCase().includes('math') ? 'Mathematics' : 
                  teacher.name.toLowerCase().includes('physic') ? 'Physics' : 
                  teacher.name.toLowerCase().includes('chem') ? 'Chemistry' : 'Premium Faculty';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-black backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 flex flex-col items-center text-center gap-4 cursor-pointer group transition-all duration-700 hover:shadow-[0_30px_60px_rgba(255,255,255,0.05)] hover:border-white/30 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQplsQXlw5tJeRL0dIeJBFZrs0Lzjh9d8ajkLbOSsHwbA&s=10" 
          alt="Background"
          fill
          className="object-cover opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Box Grid - Matching Global Style */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-full h-full bg-white/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-white/5 rounded-full blur-[100px]"
        />
      </div>
      
      {/* Teacher Image/Avatar */}
      <div className="relative z-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-4 border-white/20 flex items-center justify-center overflow-hidden group-hover:border-white/40 transition-all p-1 shadow-2xl">
          <div className="relative w-full h-full rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
            {teacher.photoUrl ? (
              <Image 
                src={teacher.photoUrl} 
                alt={teacher.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User className="w-14 h-14 text-white/40 group-hover:text-white transition-colors" />
            )}
          </div>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-black rounded-full shadow-lg" 
        />
      </div>

      <div className="flex flex-col gap-1 z-10">
        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-white transition-colors">
          {teacher.name}
        </h3>
        <div className="inline-flex items-center justify-center px-2.5 py-0.5 bg-white/10 rounded-full border border-white/10">
          <p className="text-[8px] text-white font-black uppercase tracking-[0.2em]">
            {subject}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 w-full z-10">
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
            <Video className="w-3.5 h-3.5 text-white/60" />
          </div>
          <span className="text-[11px] font-black text-white">{teacher.videos}</span>
          <span className="text-[7px] text-white/40 uppercase font-bold tracking-widest">Videos</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
            <FileText className="w-3.5 h-3.5 text-white/60" />
          </div>
          <span className="text-[11px] font-black text-white">{teacher.pdfs}</span>
          <span className="text-[7px] text-white/40 uppercase font-bold tracking-widest">Notes</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
            <ClipboardList className="w-3.5 h-3.5 text-white/60" />
          </div>
          <span className="text-[11px] font-black text-white">0</span>
          <span className="text-[7px] text-white/40 uppercase font-bold tracking-widest">DPP</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-white/10 flex items-center justify-center gap-2 z-10 group/btn">
        <PlayCircle className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
        View Content
      </button>
    </motion.div>
  );
}
