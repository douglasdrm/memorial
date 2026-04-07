"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-4 relative animate-in zoom-in duration-1000 delay-500 shadow-2xl rounded-3xl overflow-hidden group">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-sage-600">
        <Search className="w-6 h-6 group-focus-within:scale-110 transition-transform" />
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Busque por uma paróquia ou o nome de um memorial..."
        className="w-full py-7 pl-16 pr-32 bg-white text-lg outline-none focus:ring-4 ring-sage-500/10 transition-all shadow-inner font-sans"
      />
      <button 
        onClick={handleSearch}
        className="absolute right-3 inset-y-3 bg-sage-600 text-white px-8 rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-sage-900 transition-all shadow-md active:scale-95"
      >
        Buscar
      </button>
    </div>
  );
}
