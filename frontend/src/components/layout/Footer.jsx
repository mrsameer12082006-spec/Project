import React from 'react';
import {
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Printer,
  Check,
  Landmark,
  Sprout,
  Home as HomeIcon,
  HeartPulse,
  ReceiptText,
  SlidersHorizontal,
  Compass,
  ArrowUp
} from 'lucide-react';

export default function Footer({ onStart, onBrowse, setScreen, currentScreen = 'home' }) {
  const isHomeScreen = currentScreen === 'home';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-[#E5E3DC] bg-[#FAF9F5] text-zinc-600 text-xs">
      
      {/* ───────────────────────────────────────────────────────────
          1. HIGH-IMPACT PRE-FOOTER CTA BANNER (HOMEPAGE ONLY)
          ─────────────────────────────────────────────────────────── */}
      {isHomeScreen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-10">
          <div className="rounded-3xl bg-[#111111] text-white p-8 sm:p-12 lg:p-14 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative overflow-hidden">
            {/* Subtle radial ambient light */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left 8 Cols: Pitch & Assurance */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  <span>Verified Civic Assistance</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-[1.18]">
                  Claim What Is Rightfully Yours From Central Welfare Programs.
                </h2>

                <p className="max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
                  No middlemen, no bribery, no bureaucratic jargon. Answer 4 simple questions in 60 seconds and print an instant CSC document slip to submit at your nearest village kiosk.
                </p>
              </div>

              {/* Right 4 Cols: High-Impact Buttons */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  type="button"
                  onClick={onStart}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#111111] shadow-sm transition-all duration-150 hover:bg-zinc-100 active:scale-[0.985]"
                >
                  <span>Check Eligibility in 60s</span>
                  <ArrowRight className="w-4 h-4 text-[#111111] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onBrowse}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent hover:bg-white/10 border border-zinc-700 px-6 py-3.5 text-sm font-semibold text-white transition-all active:scale-[0.985]"
                >
                  <span>Browse All Verified Schemes</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          2. AUTHORITATIVE 4-COLUMN CIVIC FOOTER (REDESIGNED)
          ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Civic Charter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#111111] text-emerald-400 flex items-center justify-center shadow-xs">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-[#111111] tracking-tight block leading-tight">
                  SchemeSathi
                </span>
                <span className="text-[11px] font-semibold text-zinc-500">
                  Verified Central Welfare Guidance
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-sm">
              An independent, non-commercial public service helping rural and semi-urban Indian households discover and claim central welfare benefits without middlemen.
            </p>

            {/* Live Trust Signal Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-2xs text-[11px] font-bold text-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official 2026 Gazette Guidelines Aligned</span>
            </div>
          </div>

          {/* Column 2: Central Ministries & Official Portals (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-[#111111] uppercase tracking-wider text-xs flex items-center gap-1.5">
              <span>Official Central Portals</span>
            </div>
            
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium group-hover:underline">PM-KISAN (Farmer Income)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmayg.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <HomeIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-medium group-hover:underline">PMAY-G (Rural Housing)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmjay.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <HeartPulse className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="font-medium group-hover:underline">Ayushman Bharat (PM-JAY)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Landmark className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="font-medium group-hover:underline">National Portal of India</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pfms.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <ReceiptText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="font-medium group-hover:underline">PFMS DBT Portal</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen & Kiosk Tools (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-[#111111] uppercase tracking-wider text-xs">
              Citizen & Kiosk Tools
            </div>
            
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onStart}
                  className="w-full flex items-center gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors text-left font-medium"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>4-Question Eligibility Wizard</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onBrowse}
                  className="w-full flex items-center gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors text-left font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>Verified Schemes Directory</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onStart}
                  className="w-full flex items-center gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-black/[0.04] text-zinc-700 hover:text-[#111111] transition-colors text-left font-medium"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>CSC Kiosk Print Slip Generator</span>
                </button>
              </li>
              <li>
                <div className="flex items-center gap-2 p-1.5 -mx-1.5 text-zinc-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Transparent Rule Audit Trace</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Public Guarantees & Privacy (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-bold text-[#111111] uppercase tracking-wider text-xs">
              Public Charter
            </div>
            
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-zinc-900 font-bold px-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Free Public Service</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-700 font-medium px-1">
                <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>Zero PII Stored</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-700 font-medium px-1">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>No Aadhaar Required</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-700 font-medium px-1">
                <Check className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>Direct to Portals</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </footer>
  );
}
