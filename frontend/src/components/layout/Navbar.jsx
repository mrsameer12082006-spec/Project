import React from 'react';
import { CivicCrestIcon } from '../common/CivicIcons';

export default function Navbar({
  currentScreen,
  setScreen
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F5]/85 backdrop-blur-xl border-b border-[#E5E3DC]/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand identity: High-impact Nike/Civic style */}
        <button
          onClick={() => setScreen('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <CivicCrestIcon className="w-4 h-4 text-white" />
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
        <div className="flex items-center gap-3">
          
          {/* Schemes Directory Nav Link */}
          <button
            type="button"
            onClick={() => setScreen('explorer')}
            className={`hidden sm:inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              currentScreen === 'explorer'
                ? 'bg-zinc-100 text-[#111111] font-bold'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
            }`}
          >
            Verified Schemes
          </button>

          {/* Quick Check CTA */}
          <button
            type="button"
            onClick={() => setScreen('interview')}
            className="spatial-glass-button-dark inline-flex items-center text-xs font-bold px-4 py-2 rounded-full text-white shadow-sm active:scale-[0.985]"
          >
            Check Eligibility
          </button>
        </div>

      </div>
    </header>
  );
}
