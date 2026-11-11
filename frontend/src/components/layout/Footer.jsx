import React from 'react';
import { ExternalLink, ArrowRight, ShieldCheck, CheckCircle2, Lock, FileText, Printer, Sliders } from 'lucide-react';
import { CivicCrestIcon } from '../common/CivicIcons';

export default function Footer({ onStart, onBrowse, setScreen }) {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-[#FBFBFA] text-zinc-600 text-xs">
      
      {/* ───────────────────────────────────────────────────────────
          1. HIGH-IMPACT PRE-FOOTER CTA BANNER (CLEAN & SOLID)
          ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-10">
        <div className="rounded-3xl bg-[#111111] text-white p-8 sm:p-12 lg:p-14 border border-zinc-800 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 8 Cols: Pitch & Assurance */}
            <div className="lg:col-span-8 space-y-4">
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
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111111] text-white text-xs transition-transform group-hover:translate-x-1">
                  →
                </span>
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

      {/* ───────────────────────────────────────────────────────────
          2. AUTHORITATIVE 4-COLUMN CIVIC FOOTER
          ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Civic Charter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center shadow-xs">
                <CivicCrestIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg text-[#111111] tracking-tight">
                SchemeSathi
              </span>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              An independent, non-commercial public service helping underserved rural and semi-urban Indian households discover and claim statutory government welfare benefits without middlemen.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span>Gazette Sync: 2026 Central Rules Active</span>
            </div>
          </div>

          {/* Column 2: Central Ministries & Official Portals (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
              Official Central Portals
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors group"
                >
                  <span className="text-zinc-700 group-hover:underline">PM-KISAN (Farmer Income)</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmayg.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors group"
                >
                  <span className="text-zinc-700 group-hover:underline">PMAY-G (Rural Housing)</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmjay.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors group"
                >
                  <span className="text-zinc-700 group-hover:underline">Ayushman Bharat (PM-JAY)</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors group"
                >
                  <span className="text-zinc-700 group-hover:underline">National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pfms.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors group"
                >
                  <span className="text-zinc-700 group-hover:underline">PFMS DBT Portal</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[#111111]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen & Kiosk Tools (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
              Citizen & Kiosk Tools
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onStart}
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors text-left text-zinc-700 hover:underline"
                >
                  <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                  <span>4-Question Eligibility Check</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onBrowse}
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors text-left text-zinc-700 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Verified Schemes Directory</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onStart}
                  className="hover:text-[#111111] flex items-center gap-1.5 transition-colors text-left text-zinc-700 hover:underline"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-400" />
                  <span>CSC Kiosk Print Slip Generator</span>
                </button>
              </li>
              <li>
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Deterministic Rule Matcher</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Public Guarantees & Privacy (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-bold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
              Public Charter
            </div>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>100% Free Always</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Zero PII Stored</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>No Aadhaar Required</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Zero Intermediaries</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-zinc-700">© 2026 SchemeSathi Team</span>
            <span>·</span>
            <span>CS002 Community Public Service</span>
            <span>·</span>
            <span>Open Source Civic Technology</span>
          </div>

          <div className="text-[11px] text-zinc-400 font-medium">
            Grounded directly in official Gazette of India criteria · Zero user data retained
          </div>
        </div>

      </div>

    </footer>
  );
}
