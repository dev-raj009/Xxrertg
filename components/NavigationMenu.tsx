'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Send, Info, ShieldAlert } from 'lucide-react';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const menuItems = [
    {
      title: "Join WhatsApp Channel",
      icon: <MessageCircle className="w-5 h-5 text-green-400" />,
      link: "https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U", // Placeholder
      color: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
    },
    {
      title: "Join Telegram Channel",
      icon: <Send className="w-5 h-5 text-blue-400" />,
      link: "https://t.me/studyuk_offline", // Placeholder
      color: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
    },
    {
      title: "About",
      icon: <Info className="w-5 h-5 text-slate-400" />,
      link: "#",
      color: "bg-slate-500/10 border-slate-500/20 hover:bg-slate-500/20"
    },
    {
      title: "Disclaimer",
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
      link: "#",
      color: "bg-red-500/10 border-red-500/20 hover:bg-red-500/20"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[300px] z-[160] bg-black border-l border-white/10 p-6 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-black text-white tracking-tighter uppercase">Menu</h2>
              <button 
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group bg-white/5 hover:bg-white/10 border border-white/5"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-sm border border-white/10">
                    {item.icon}
                  </div>
                  <span className="text-white/60 group-hover:text-white font-bold text-[11px] tracking-widest uppercase">
                    {item.title}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-10 text-center">
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em]">
                Powered by VIP Study
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
