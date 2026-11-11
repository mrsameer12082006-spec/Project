import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowRight, ExternalLink, Sprout, Home as HomeIcon, ShieldPlus, Layers } from 'lucide-react';
import { VERIFIED_SCHEMES } from '../data/schemesData';

export default function SchemeExplorer({ onBack, onStartCheck, onSelectScheme }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Schemes', icon: Layers },
    { id: 'farmer', label: 'Farmer Support', icon: Sprout },
    { id: 'housing', label: 'Rural Housing', icon: HomeIcon },
    { id: 'health', label: 'Free Healthcare', icon: ShieldPlus },
  ];

  const filteredSchemes = VERIFIED_SCHEMES.filter(scheme => {
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefitSummary.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'farmer') return scheme.id.includes('kisan');
    if (selectedCategory === 'housing') return scheme.id.includes('awas');
    if (selectedCategory === 'health') return scheme.id.includes('jay');

    return true;
  });

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto animate-fade-in">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div className="space-y-1">
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-zinc-500 hover:text-[#111111] flex items-center gap-1.5 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
            Verified Central Welfare Schemes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Official eligibility criteria grounded directly in central ministry guidelines
          </p>
        </div>

        {/* Quick Check CTA */}
        <button
          type="button"
          onClick={onStartCheck}
          className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#262626] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-[0.985] self-start sm:self-auto shrink-0"
        >
          <span>Check Eligibility</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        
        {/* Search Input with Clean Border */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scheme name, ministry, or benefit..."
            className="w-full bg-white border border-zinc-200 rounded-xl pl-11 pr-12 py-3 text-sm text-[#111111] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#111111] shadow-2xs"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="keycap-badge">/</span>
          </div>
        </div>

        {/* Apple Glassmorphic Category Segmented Control */}
        <div className="flex items-center gap-1 bg-zinc-200/40 backdrop-blur-md border border-black/[0.06] p-1 rounded-full w-fit max-w-full overflow-x-auto shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)] text-xs font-semibold">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_1.5px_rgba(0,0,0,0.04),0_0_0_0.5px_rgba(0,0,0,0.04)] font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.03]'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Schemes Grid or Empty State */}
      {filteredSchemes.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3">
          <p className="text-zinc-600 text-sm font-semibold">
            No verified schemes found matching "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-bold text-[#111111] hover:underline px-4 py-2 bg-zinc-100 rounded-lg inline-block"
          >
            Clear Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSchemes.map(scheme => {
          const isKisan = scheme.id.includes('kisan');
          const isHousing = scheme.id.includes('awas');
          const isHealth = scheme.id.includes('jay');

          return (
            <div
              key={scheme.id}
              className="tactile-card rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between border border-zinc-200 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 shadow-2xs text-zinc-900 px-2.5 py-1 rounded-md text-[11px] font-bold">
                    {isKisan && <Sprout className="w-3.5 h-3.5 text-emerald-600" />}
                    {isHousing && <HomeIcon className="w-3.5 h-3.5 text-amber-600" />}
                    {isHealth && <ShieldPlus className="w-3.5 h-3.5 text-sky-600" />}
                    <span>{scheme.tag}</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    Verified 2026
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] metric-tabular tracking-tight">
                    {scheme.highlightAmount}
                  </div>
                  <h3 className="font-bold text-[#111111] text-base leading-snug">
                    {scheme.name}
                  </h3>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                  {scheme.benefitSummary}
                </p>
              </div>

              <div className="pt-3.5 border-t border-zinc-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectScheme(scheme)}
                  className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1"
                >
                  <span>View checklist & steps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-zinc-500 hover:text-zinc-900 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{scheme.officialUrl.replace('https://', '')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      )}

    </div>
  );
}
