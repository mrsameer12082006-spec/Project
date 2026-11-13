import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Landmark } from 'lucide-react';
import CountUp from '../common/CountUp';

export default function SpatialSchemeCard({
  scheme,
  onCheckEligibility,
  onSelectScheme
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: Math.max(-4, Math.min(4, -((y - centerY) / centerY) * 4)),
      y: Math.max(-4, Math.min(4, ((x - centerX) / centerX) * 4))
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Icon = scheme.icon;

  // Solid, authoritative color themes (No translucent/washed out pastels)
  const solidThemes = {
    emerald: {
      badge: 'bg-emerald-700 text-white shadow-xs',
      dot: 'bg-emerald-600',
      borderHover: 'hover:border-emerald-600',
      accentText: 'text-emerald-700'
    },
    amber: {
      badge: 'bg-amber-700 text-white shadow-xs',
      dot: 'bg-amber-600',
      borderHover: 'hover:border-amber-600',
      accentText: 'text-amber-800'
    },
    sky: {
      badge: 'bg-sky-700 text-white shadow-xs',
      dot: 'bg-sky-600',
      borderHover: 'hover:border-sky-600',
      accentText: 'text-sky-700'
    }
  };

  const theme = solidThemes[scheme.accent] || solidThemes.emerald;

  // Themed colored glow shadows (Apple / Stripe dynamic illumination)
  const themeGlows = {
    emerald: { border: 'var(--green-primary)', shadow: 'rgba(22, 101, 52, 0.18)' },
    green: { border: 'var(--green-primary)', shadow: 'rgba(22, 101, 52, 0.18)' },
    amber: { border: 'var(--orange-primary)', shadow: 'rgba(194, 65, 12, 0.18)' },
    orange: { border: 'var(--orange-primary)', shadow: 'rgba(194, 65, 12, 0.18)' },
    sky: { border: 'var(--blue-primary)', shadow: 'rgba(3, 105, 161, 0.18)' },
    blue: { border: 'var(--blue-primary)', shadow: 'rgba(3, 105, 161, 0.18)' }
  };
  const activeGlow = themeGlows[scheme.accent] || themeGlows.emerald;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8, 
        boxShadow: `0 25px 50px -12px ${activeGlow.shadow}`,
        borderColor: activeGlow.border 
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 100ms ease-out' : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`bg-white rounded-2xl border-2 border-[#E5E3DC] transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm relative cursor-pointer`}
    >
      {/* ── 1. Top Section & Header ── */}
      <div className="p-6 sm:p-7 space-y-5">
        
        {/* Solid Category Badge & Official Portal Link */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Solid Authoritative Category Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-tight ${theme.badge}`}>
            <Icon className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.5]" />
            <span>{scheme.tag}</span>
          </span>

          {/* Solid Portal Link */}
          <a
            href={scheme.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors border border-zinc-200/90"
            title={`Official Ministry Portal: ${scheme.portalDomain}`}
          >
            <span>{scheme.portalDomain}</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>

        {/* Rupee Value with Large Clean Tabular Counter */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-baseline gap-2 text-3xl sm:text-4xl font-extrabold text-[#111111] metric-tabular tracking-tight">
            {typeof scheme.rawAmount === 'number' ? (
              <CountUp end={scheme.rawAmount} prefix="₹" duration={600} />
            ) : (
              <span>{scheme.amount}</span>
            )}
            <span className="text-xs sm:text-sm font-bold text-zinc-600 font-sans tracking-normal">
              {scheme.period}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectScheme && onSelectScheme(scheme)}
            className="text-left font-extrabold text-[#111111] text-lg leading-snug hover:text-emerald-700 transition-colors cursor-pointer group/title flex items-center justify-between w-full"
          >
            <span>{scheme.name}</span>
          </button>
        </div>

        {/* Plain Language Benefit Summary */}
        <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed font-medium">
          {scheme.description}
        </p>

      </div>

      {/* ── 2. Solid Bottom Ledger & Action Row ── */}
      <div className="p-5 sm:p-6 pt-4 border-t border-[#E5E3DC] bg-[#FAF9F5] space-y-4">
        
        {/* Ministry & Benefit Status Rows (No Truncation) */}
        <div className="space-y-2">
          
          {/* Full Ministry Name */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
            <Landmark className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <span className="leading-tight">{scheme.ministry}</span>
          </div>

          {/* Solid Delivery Tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white text-zinc-900 text-[11px] font-bold border border-zinc-200 shadow-2xs">
            <span className={`w-2 h-2 rounded-full ${theme.dot} shrink-0 animate-pulse`} />
            <span>{scheme.highlightTag}</span>
          </div>

        </div>

        {/* Action Button Row with Spring Micro-Interactions */}
        <div className="space-y-2 pt-1">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, backgroundColor: '#000000' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => onCheckEligibility && onCheckEligibility(scheme)}
            className="w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm bg-[#111111] text-white shadow-md flex items-center justify-between transition-colors duration-150 group/btn cursor-pointer"
          >
            <span>Check Your Eligibility</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover/btn:translate-x-1.5 transition-transform shrink-0" />
          </motion.button>

          {onSelectScheme && (
            <button
              type="button"
              onClick={() => onSelectScheme(scheme)}
              className="w-full py-2 px-3 text-xs font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Checklist & Application Steps</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          )}
        </div>

      </div>

    </motion.div>
  );
}
