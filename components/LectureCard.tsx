'use client';

import { Play, FileText, Download, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Lecture } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface LectureCardProps {
  lecture: Lecture;
}

export default function LectureCard({ lecture }: LectureCardProps) {
  const router = useRouter();

  const handlePlay = () => {
    if (lecture.videoUrl) {
      router.push(`/play?url=${encodeURIComponent(lecture.videoUrl)}&title=${encodeURIComponent(lecture.title)}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative bg-black backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 transition-all duration-700 group hover:shadow-[0_30px_60px_rgba(255,255,255,0.05)] hover:border-white/30 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
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
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full blur-[80px]"
        />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Thumbnail Area */}
        <div 
          onClick={handlePlay}
          className="relative shrink-0 w-full sm:w-48 h-32 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer group-hover:border-white/30 transition-all shadow-inner"
        >
          <Image 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQplsQXlw5tJeRL0dIeJBFZrs0Lzjh9d8ajkLbOSsHwbA&s=10" 
            alt={lecture.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="relative z-10 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-xl group-hover:bg-white transition-all duration-300"
          >
            <Play className="w-6 h-6 text-black group-hover:text-black fill-current translate-x-0.5" />
          </motion.div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-tighter border border-white/10">
            45:00
          </div>
          
          {/* Topic Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-widest border border-white/10">
            LECTURE
          </div>
        </div>

        <div className="flex-grow min-w-0 flex flex-col justify-between py-1 text-center sm:text-left">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tighter line-clamp-2 group-hover:text-white transition-colors">
              {lecture.title}
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Clock className="w-3 h-3 text-white/40" />
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">2 Days Ago</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Download className="w-3 h-3 text-white/40" />
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">1.2K</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {lecture.videoUrl && (
              <button 
                onClick={handlePlay}
                className="flex-[2] min-w-[140px] flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-2xl text-[11px] font-black transition-all active:scale-95 shadow-xl shadow-white/10 uppercase tracking-[0.2em] group/btn"
              >
                <Play className="w-4 h-4 fill-current group-hover/btn:scale-110 transition-transform" />
                Watch Now
              </button>
            )}
            
            <a 
              href={lecture.pdfUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!lecture.pdfUrl || lecture.pdfUrl === '#') {
                  e.preventDefault();
                  // Maybe show a toast or just do nothing
                }
                e.stopPropagation();
              }}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-[11px] font-black transition-all active:scale-95 uppercase tracking-widest border ${
                lecture.pdfUrl && lecture.pdfUrl !== '#' 
                  ? "bg-white/10 hover:bg-white/20 text-white border-white/20" 
                  : "bg-white/5 text-white/30 border-white/10 cursor-not-allowed"
              }`}
            >
              <FileText className="w-4 h-4" />
              {lecture.pdfUrl && lecture.pdfUrl !== '#' ? "Notes PDF" : "No PDF"}
            </a>
            
            <button className="p-3.5 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-2xl transition-all border border-white/10 active:scale-95">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
