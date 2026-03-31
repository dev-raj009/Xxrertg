'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search batches..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8 group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all sm:text-sm shadow-2xl"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
