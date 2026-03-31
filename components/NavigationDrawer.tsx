'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Send, Info, ShieldAlert, UserPlus, Mail, Radio } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
  const links = [
    { icon: Radio, label: 'Live Stream', href: '/play?v=https://vjs.zencdn.net/v/oceans.mp4&portrait=true', color: 'text-red-500', isInternal: true },
    { icon: MessageCircle, label: 'WhatsApp Channel', href: 'https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U', color: 'text-green-500' },
    { icon: Send, label: 'Telegram Channel', href: 'https://t.me/Vip_Study_Officail', color: 'text-blue-500' },
    { icon: Info, label: 'About', href: '#', color: 'text-slate-700' },
    { icon: ShieldAlert, label: 'Disclaimer', href: '#', color: 'text-slate-700' },
    { icon: UserPlus, label: 'Join VIP Study', href: '#', color: 'text-purple-500' },
    { icon: Mail, label: 'Contact VIP Study', href: '#', color: 'text-slate-700' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-black shadow-2xl z-50 flex flex-col border-r border-white/10"
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <h2 className="text-lg font-black text-white uppercase tracking-tighter">Menu</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col gap-1 px-3">
                {links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target={link.isInternal ? '_self' : '_blank'}
                    rel={link.isInternal ? '' : 'noopener noreferrer'}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-white/10 shadow-sm ${link.color}`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white/70 group-hover:text-white text-sm">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white/5 border-t border-white/10">
              <p className="text-xs text-center text-white/40 font-medium">
                © 2026 VIP Study Offline
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
