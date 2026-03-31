'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  getBatches, 
  getBatchDetails, 
  getTeacherLectures,
  Batch, 
  Teacher,
  Lecture 
} from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import BatchCard from '@/components/BatchCard';
import TeacherCard from '@/components/TeacherCard';
import LectureCard from '@/components/LectureCard';
import LoadingOverlay from '@/components/LoadingOverlay';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import SplashScreen from '@/components/SplashScreen';
import NavigationDrawer from '@/components/NavigationDrawer';
import ProfileDrawer from '@/components/ProfileDrawer';
import WhatsAppPopup from '@/components/WhatsAppPopup';
import { 
  ChevronLeft, 
  Users, 
  Video, 
  User,
  Menu
} from 'lucide-react';

const safeConsole = {
  error: (...args: any[]) => {
    console.error(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  },
  warn: (...args: any[]) => {
    console.warn(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  },
  log: (...args: any[]) => {
    console.log(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  }
};

export default function StudyUKApp() {
  // State Management
  const [showSplash, setShowSplash] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loadingLectures, setLoadingLectures] = useState(false);
  
  const [isMounted, setIsMounted] = useState(false);

  // Initial Load: Fetch Batches
  useEffect(() => {
    setIsMounted(true);
    loadBatches();
  }, []);

  const loadBatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBatches();
      setBatches(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch batches. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Batch Click: Direct Navigation
  const handleBatchClick = async (batch: Batch) => {
    setIsNavigating(true);
    
    setSelectedBatch(batch);
    setLoadingTeachers(true);
    setTeachers([]);
    
    try {
      const data = await getBatchDetails(batch.id);
      setTeachers(data);
    } catch (err: any) {
      safeConsole.error("Failed to load batch details", err instanceof Error ? err.message : String(err));
      setError(err.message || "Failed to load batch details. Please try again.");
      setSelectedBatch(null);
    } finally {
      setLoadingTeachers(false);
      setIsNavigating(false);
    }
  };

  // Handle Teacher Click: Load Lectures with Blur Effect
  const handleTeacherClick = async (teacher: Teacher) => {
    if (!selectedBatch) return;
    setIsNavigating(true);
    
    // Artificial delay for smooth transition effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSelectedTeacher(teacher);
    setLoadingLectures(true);
    setLectures([]);
    
    try {
      const data = await getTeacherLectures(selectedBatch.id, teacher.name);
      setLectures(data);
    } catch (err: any) {
      safeConsole.error("Failed to load lectures", err instanceof Error ? err.message : String(err));
      setError(err.message || "Failed to load lectures. Please try again.");
      setSelectedTeacher(null); // Go back to teachers view
    } finally {
      setLoadingLectures(false);
      setIsNavigating(false);
    }
  };

  // Filter Batches based on Search
  const filteredBatches = useMemo(() => {
    return batches.filter(batch => 
      batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [batches, searchQuery]);

  // Filter Teachers based on Search
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teachers, searchQuery]);

  // Filter Lectures based on Search
  const filteredLectures = useMemo(() => {
    return lectures.filter(lecture => 
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [lectures, searchQuery]);

  // UI Navigation
  const handleBackToBatches = () => {
    setSelectedBatch(null);
    setSelectedTeacher(null);
    setTeachers([]);
    setLectures([]);
    setSearchQuery('');
  };

  const handleBackToTeachers = () => {
    setSelectedTeacher(null);
    setLectures([]);
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white/30 overflow-x-hidden relative">
      {/* Professional White Grid on Black Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* White Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.1]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Animated White Boxes */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 150, 0],
                y: [0, 150, 0],
                rotate: [0, 180, 360],
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{
                duration: 25 + i * 7,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute border border-white/20 rounded-3xl"
              style={{
                width: `${250 + i * 120}px`,
                height: `${250 + i * 120}px`,
                left: `${5 + i * 20}%`,
                top: `${5 + i * 15}%`,
              }}
            />
          ))}
        </div>

        {/* Subtle White Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[140px]" />
      </div>

      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showSplash && isMounted && (
          <WhatsAppPopup />
        )}
      </AnimatePresence>

      <NavigationDrawer isOpen={isNavDrawerOpen} onClose={() => setIsNavDrawerOpen(false)} />
      <ProfileDrawer isOpen={isProfileDrawerOpen} onClose={() => setIsProfileDrawerOpen(false)} />
      <LoadingOverlay isLoading={isNavigating} />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button 
            onClick={() => setIsNavDrawerOpen(true)}
            className="p-3 -ml-2 rounded-2xl hover:bg-white/10 text-white transition-all active:scale-90 border border-white/5"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="font-black text-2xl text-white tracking-tighter uppercase flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-sm" />
            </div>
            VIP Study
          </div>

          <button 
            onClick={() => setIsProfileDrawerOpen(true)}
            className="w-12 h-12 rounded-2xl border-2 border-white/10 overflow-hidden hover:border-white/30 transition-all shadow-2xl active:scale-90 p-0.5 bg-white/5"
          >
            <Image 
              src="https://i.postimg.cc/zBFfBhtG/IMG-20260324-140610-299.jpg" 
              alt="Profile" 
              width={48} 
              height={48} 
              className="object-cover rounded-xl"
            />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Navigation Blur Overlay */}
      {/* Removed */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {selectedBatch ? (
            <motion.div
              key="batch-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={selectedTeacher ? handleBackToTeachers : handleBackToBatches}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 border border-white/10 group shadow-2xl"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase truncate">
                      {selectedTeacher ? selectedTeacher.name : selectedBatch.name}
                    </h2>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedTeacher ? (
                  /* Lectures View */
                  <motion.div 
                    key="lectures-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {loadingLectures ? (
                      <LoadingSpinner message="Loading premium lectures..." />
                    ) : filteredLectures.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredLectures.map((lecture, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <LectureCard 
                              lecture={lecture} 
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/40 bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl uppercase tracking-[0.2em] font-black text-[10px]">
                        No lectures found for this teacher.
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* Teachers View */
                  <motion.div 
                    key="teachers-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {loadingTeachers ? (
                      <LoadingSpinner message="Loading batch details..." />
                    ) : filteredTeachers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeachers.map((teacher, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <TeacherCard 
                              teacher={teacher} 
                              onClick={() => handleTeacherClick(teacher)} 
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/40 bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl uppercase tracking-[0.2em] font-black text-[10px]">
                        No teacher details found for this batch.
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Batches View */
            <motion.div
              key="batches-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {loading ? (
                <LoadingSpinner message="Loading premium content..." />
              ) : error ? (
                <ErrorMessage message={error} onRetry={loadBatches} />
              ) : filteredBatches.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredBatches.map((batch, idx) => (
                    <motion.div
                      key={batch.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BatchCard 
                        batch={batch} 
                        onClick={handleBatchClick} 
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-16 text-center shadow-2xl backdrop-blur-xl">
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">No batches found</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Try adjusting your search terms.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 py-10 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">
          Powered by Raj • VIP Study
        </p>
      </footer>
    </main>
  );
}
