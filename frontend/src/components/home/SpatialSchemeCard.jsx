import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import CountUp from '../common/CountUp';

export default function SpatialSchemeCard({
  scheme,
  onCheckEligibility
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: Math.max(-5, Math.min(5, -((y - centerY) / centerY) * 5)),
      y: Math.max(-5, Math.min(5, ((x - centerX) / centerX) * 5))
    });
    setMousePos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setMousePos(prev => ({ ...prev, active: false }));
  };

  const Icon = scheme.icon;

  // Theme configuration for Lantern glow and badges
  const colorThemes = {
    emerald: {
      lantern: 'rgba(5, 150, 105, 0.16)',
      badgeBg: 'bg-emerald-50',
      badgeBorder: 'border-emerald-200/90',
      badgeText: 'text-emerald-800',
      iconText: 'text-emerald-600',
      dotBg: 'bg-emerald-500',
      btnHover: 'hover:text-emerald-800',
      linkHover: 'hover:text-emerald-800'
    },
    amber: {
      lantern: 'rgba(217, 119, 6, 0.16)',
      badgeBg: 'bg-amber-50',
      badgeBorder: 'border-amber-200/90',
      badgeText: 'text-amber-800',
      iconText: 'text-amber-600',
      dotBg: 'bg-amber-500',
      btnHover: 'hover:text-amber-800',
      linkHover: 'hover:text-amber-800'
    },
    sky: {
      lantern: 'rgba(2, 132, 199, 0.16)',
      badgeBg: 'bg-sky-50',
      badgeBorder: 'border-sky-200/90',
      badgeText: 'text-sky-800',
      iconText: 'text-sky-600',
      dotBg: 'bg-sky-500',
      btnHover: 'hover:text-sky-800',
      linkHover: 'hover:text-sky-800'
    }
  };

  const theme = colorThemes[scheme.accent] || colorThemes.emerald;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: mousePos.active ? 'transform 100ms ease-out' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="spatial-card-3d rounded-2xl overflow-hidden flex flex-col justify-between group transition-shadow duration-300"
    >
      {/* ── Lantern 3D Spotlight Overlay (Cursor Reactive) ── */}
      {mousePos.active && (
        <div
          className="lantern-spotlight"
          style={{
            opacity: 1,
            background: `radial-gradient(340px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.lantern}, transparent 75%)`
          }}
        />
      )}

      {/* Main Card Content */}
      <div className="p-6 sm:p-7 space-y-5 relative z-10">
        
        {/* Top Header: Category Tag & 3D Holographic Seal */}
        <div className="flex items-center justify-between gap-3">
          <span className={`inline-flex items-center gap-1.5 ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} border px-3 py-1 rounded-md text-xs font-bold tracking-tight shadow-2xs`}>
            <Icon className={`w-3.5 h-3.5 ${theme.iconText} shrink-0`} />
            <span>{scheme.tag}</span>
          </span>

          {/* 3D Holographic Seal / External Portal */}
          <div className="flex items-center gap-2">
            <a
              href={scheme.portalUrl}
              target="_blank"
              rel="noreferrer"
              className={`text-xs font-semibold text-zinc-400 ${theme.linkHover} flex items-center gap-1 transition-colors`}
              title={`Visit official ${scheme.portalDomain} portal`}
            >
              <span>{scheme.portalDomain}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Micro 3D Hologram Badge */}
            <div 
              style={{ transform: 'translateZ(18px)' }}
              className="hologram-seal w-7 h-7 rounded-lg border border-black/[0.06] flex items-center justify-center text-zinc-600 transition-transform group-hover:scale-105"
            >
              <Icon className="w-3.5 h-3.5 opacity-80" />
            </div>
          </div>
        </div>

        {/* Rupee Value with Large Clean Tabular Counter */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-baseline gap-2 text-3xl sm:text-4xl font-extrabold text-[#111111] metric-tabular tracking-tight">
            {typeof scheme.rawAmount === 'number' ? (
              <CountUp end={scheme.rawAmount} prefix="₹" duration={600} />
            ) : (
              <span>{scheme.amount}</span>
            )}
            <span className="text-xs sm:text-sm font-semibold text-zinc-500 font-sans tracking-normal">
              {scheme.period}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#111111] leading-snug group-hover:text-emerald-950 transition-colors">
            {scheme.name}
          </h3>
        </div>

        {/* Plain Language Benefit Summary */}
        <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed">
          {scheme.description}
        </p>

      </div>

      {/* Tactile Lower Ledger & Action Strip */}
      <div className="p-4 sm:p-5 pt-3 border-t border-zinc-200/70 bg-[#FBFBFA]/80 space-y-3 relative z-10">
        
        {/* Verification Status & Ministry Info */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-800 bg-white border border-zinc-200/90 shadow-2xs px-2.5 py-1 rounded-md text-[11px] font-semibold">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg} shrink-0 animate-pulse`} />
            <span>{scheme.highlightTag}</span>
          </div>

          <span className="text-[11px] text-zinc-400 font-medium truncate max-w-[170px]" title={scheme.ministry}>
            {scheme.ministry}
          </span>
        </div>

        {/* Clickable Card Action */}
        <button
          type="button"
          onClick={() => onCheckEligibility && onCheckEligibility(scheme)}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-bold text-[#111111] hover:bg-zinc-100/90 border border-transparent hover:border-zinc-200 transition-all group/btn"
        >
          <span className="flex items-center gap-1.5">
            <span>Check eligibility for this scheme</span>
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:translate-x-1 transition-transform" />
        </button>

      </div>

    </motion.div>
  );
}
