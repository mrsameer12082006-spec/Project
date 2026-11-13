import React from 'react';
import { Landmark, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({
  currentScreen,
  setScreen,
  onNavigateHome,
  onNavigateExplorer,
  onStartCheck
}) {
  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      setScreen('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExplorer = () => {
    if (onNavigateExplorer) {
      onNavigateExplorer();
    } else {
      setScreen('explorer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCheck = () => {
    if (onStartCheck) {
      onStartCheck();
    } else {
      setScreen('interview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F5]/90 backdrop-blur-xl border-b border-[#E5E3DC]/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand identity: Clean Civic Landmark */}
        <button
          type="button"
          onClick={handleHome}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#111111] text-emerald-400 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Landmark className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-[#111111] tracking-tight">
                SchemeSathi
              </span>
              <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                Civic Welfare Platform
              </span>
            </div>
          </div>
        </button>

        {/* Right Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Schemes Directory Nav Link */}
          <button
            type="button"
            onClick={handleExplorer}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'explorer'
                ? 'bg-zinc-200/80 text-[#111111] font-bold'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden xs:inline sm:inline">Verified Schemes</span>
            <span className="xs:hidden sm:hidden">Schemes</span>
          </button>

          {/* Quick Check CTA */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCheck}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 sm:px-4 py-2 rounded-full shadow-sm transition-colors cursor-pointer ${
              currentScreen === 'interview' || currentScreen === 'review'
                ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                : 'spatial-glass-button-dark text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Check Eligibility</span>
          </motion.button>
        </div>

      </div>
    </header>
  );
}
