import React from 'react';

/**
 * OryzoMarqueeBanner
 * High-craft continuous kinetic ribbon running across the hero backdrop.
 * Replaces static flat banners with Oryzo-style kinetic typography.
 */
export default function OryzoMarqueeBanner({ className = '' }) {
  const items = [
    'VERIFIED 2026 CENTRAL RULES',
    'ZERO INTERMEDIARIES',
    '₹6,36,000 COMBINED HOUSEHOLD ENTITLEMENT',
    'NO LOGIN OR PII REQUIRED',
    'OFFICIAL DIRECT BENEFIT TRANSFER (DBT)',
    '100% FREE CIVIC SERVICE',
    'AYUSHMAN BHARAT PM-JAY',
    'PM AWAS YOJANA (GRAMIN)',
    'PM KISAN SAMMAN NIDHI'
  ];

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden border-y border-[#E5E3DC] bg-[#F5F4EE]/60 backdrop-blur-md py-3 select-none ${className}`}
    >
      {/* Subtle Gradient Fade on Left & Right Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAF9F5] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FAF9F5] to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee space-x-8 text-xs font-bold tracking-widest text-[#78716C]">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8 shrink-0">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
