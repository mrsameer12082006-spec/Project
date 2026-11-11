import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  CreditCard,
  FileCheck,
  Sparkles,
  Layers,
  Sprout,
  Home as HomeIcon,
  ShieldPlus,
  Zap,
  Lock
} from 'lucide-react';
import CountUp from '../common/CountUp';

export default function HouseholdEntitlementBento({ onStart, onBrowse }) {
  const [activeProfile, setActiveProfile] = useState('farmer');

  const profiles = {
    farmer: {
      id: 'farmer',
      label: 'Small Farmer Family',
      tagline: 'Landholding farmer household with kutcha dwelling',
      total: 636000,
      schemes: [
        {
          name: 'PM Kisan Samman Nidhi',
          amount: '₹6,000 / yr',
          detail: 'Direct DBT income support in 3 equal installments',
          active: true,
          icon: Sprout,
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
        },
        {
          name: 'PM Awas Yojana (Gramin)',
          amount: '₹1,30,000 Grant',
          detail: 'Permanent pucca house construction + 90 days MGNREGA labour wages',
          active: true,
          icon: HomeIcon,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        },
        {
          name: 'Ayushman Bharat PM-JAY',
          amount: '₹5,00,000 / yr',
          detail: 'Cashless secondary and tertiary hospitalization cover per family',
          active: true,
          icon: ShieldPlus,
          color: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
        }
      ]
    },
    artisan: {
      id: 'artisan',
      label: 'Rural Artisan / Labourer',
      tagline: 'Non-landholding rural household with kutcha dwelling',
      total: 630000,
      schemes: [
        {
          name: 'PM Kisan Samman Nidhi',
          amount: 'Excluded',
          detail: 'Requires cultivable agricultural land title in revenue records',
          active: false,
          icon: Sprout,
          color: 'text-zinc-500 bg-white/5 border-white/10 opacity-50'
        },
        {
          name: 'PM Awas Yojana (Gramin)',
          amount: '₹1,30,000 Grant',
          detail: 'Full financial assistance for permanent pucca dwelling construction',
          active: true,
          icon: HomeIcon,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        },
        {
          name: 'Ayushman Bharat PM-JAY',
          amount: '₹5,00,000 / yr',
          detail: 'Cashless hospital treatment across 27,000+ empanelled hospitals',
          active: true,
          icon: ShieldPlus,
          color: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
        }
      ]
    },
    senior: {
      id: 'senior',
      label: 'Senior Citizen Household',
      tagline: 'Vulnerable senior household residing in permanent dwelling',
      total: 500000,
      schemes: [
        {
          name: 'PM Kisan Samman Nidhi',
          amount: 'Excluded',
          detail: 'Non-agricultural household criteria',
          active: false,
          icon: Sprout,
          color: 'text-zinc-500 bg-white/5 border-white/10 opacity-50'
        },
        {
          name: 'PM Awas Yojana (Gramin)',
          amount: 'Excluded',
          detail: 'Household already possesses a pucca concrete structure',
          active: false,
          icon: HomeIcon,
          color: 'text-zinc-500 bg-white/5 border-white/10 opacity-50'
        },
        {
          name: 'Ayushman Bharat PM-JAY',
          amount: '₹5,00,000 / yr',
          detail: 'Comprehensive medical coverage with priority geriatric care',
          active: true,
          icon: ShieldPlus,
          color: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
        }
      ]
    }
  };

  const current = profiles[activeProfile];

  return (
    <section className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ───────────────────────────────────────────────────────────
          SECTION HEADER WITH SEGMENTED SWITCHER
          ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold text-emerald-900 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>HOUSEHOLD ENTITLEMENT ACCUMULATOR</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
            Watch Your Family's Welfare Entitlement Bloom & Accumulate.
          </h2>

          <p className="text-sm text-zinc-600 leading-relaxed">
            Most Indian families qualify for multiple central welfare programs simultaneously. Explore how agricultural support, rural housing grants, and health safety nets compound into significant direct protection.
          </p>
        </div>

        {/* Profile Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-[#F2F2F4] border border-[#E4E4E7] p-1.5 rounded-xl w-fit shadow-2xs text-xs font-semibold self-start md:self-auto">
          {Object.values(profiles).map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveProfile(p.id)}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeProfile === p.id
                  ? 'bg-[#111111] text-white shadow-2xs font-bold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          FINGROW-INSPIRED ASYMMETRIC BENTO GRID
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BENTO CARD 1 (7 Cols): Deep Obsidian Household Entitlement Hub */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-[#0B1310] text-white p-7 sm:p-9 flex flex-col justify-between shadow-[0_24px_48px_-12px_rgba(11,19,16,0.35),0_0_0_1px_rgba(255,255,255,0.06)] min-h-[460px]">
          
          {/* Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500/30 via-emerald-600/15 to-transparent blur-3xl"
          />

          <div className="relative z-10 space-y-6">
            
            {/* Top Bar with Status Tag */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-bold text-emerald-300 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DYNAMIC COMBINED ENTITLEMENT</span>
              </span>

              <span className="text-xs font-mono text-zinc-400">
                Profile: {current.label}
              </span>
            </div>

            {/* Giant Metric Counter */}
            <div className="space-y-1">
              <div className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight metric-tabular">
                <CountUp end={current.total} prefix="₹" duration={600} />
              </div>
              <div className="text-xs sm:text-sm text-emerald-300 font-medium">
                Annual Direct Household Benefit & Cashless Protection
              </div>
              <p className="text-xs text-zinc-400 pt-1">
                {current.tagline}
              </p>
            </div>

            {/* Included Scheme Breakdown Chips */}
            <div className="space-y-2.5 pt-2">
              {current.schemes.map((sc, idx) => {
                const Icon = sc.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl p-3.5 border transition-all flex items-center justify-between gap-3 ${sc.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">
                          {sc.name}
                        </div>
                        <div className="text-xs text-zinc-300 line-clamp-1">
                          {sc.detail}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono font-extrabold text-sm text-white">
                        {sc.amount}
                      </div>
                      <div className="text-[10px] font-mono uppercase text-zinc-400">
                        {sc.active ? '● QUALIFIED' : '○ EXCLUDED'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Action Row */}
          <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-zinc-400">
              Deterministic rule evaluation based on official gazette limits.
            </span>

            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 hover:bg-emerald-300 text-[#0B1310] font-extrabold px-6 py-3 text-xs sm:text-sm shadow-md transition-all active:scale-[0.985]"
            >
              <span>Verify Your Exact Household</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* BENTO CARD 2 (5 Cols): Direct Central Treasury Pipeline */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-zinc-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div className="space-y-5">
            
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>DIRECT BENEFIT PIPELINE</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-400 font-bold">
                PFMS CONNECTED
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] leading-snug">
                Zero Middlemen. Direct Treasury Conduit.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                Central welfare subsidies disburse directly from the Consolidated Fund of India into the citizen's Aadhaar-seeded bank account.
              </p>
            </div>

            {/* Visual Pipeline Conduit Animation */}
            <div className="space-y-3 py-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111111]">
                    Central Ministry Treasury
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">
                    Direct RBI / PFMS Authorization
                  </div>
                </div>
              </div>

              {/* Animated Connecting Arrow */}
              <div className="flex items-center justify-center gap-2 py-0.5 text-emerald-700 text-xs font-mono font-bold">
                <span className="h-4 w-[2px] bg-emerald-500" />
                <span>100% Direct DBT (Zero Commission Cut)</span>
                <span className="h-4 w-[2px] bg-emerald-500" />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950">
                    Beneficiary Bank Account
                  </div>
                  <div className="text-[11px] font-mono text-emerald-800">
                    Aadhaar-Seeded DBT Account
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-zinc-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                COMMISSION LEAKAGE
              </div>
              <div className="text-lg font-extrabold text-emerald-700 font-mono mt-0.5">
                0.00%
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                RETAINED BY CITIZEN
              </div>
              <div className="text-lg font-extrabold text-[#111111] font-mono mt-0.5">
                100.00%
              </div>
            </div>
          </div>
        </div>

        {/* BENTO CARD 3 (6 Cols): Zero-Document Initial Barrier */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-zinc-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <FileCheck className="w-3.5 h-3.5 text-zinc-700" />
                <span>ACCESSIBILITY FIRST</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-400 font-bold">
                ZERO INITIAL UPLOADS
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-[#111111]">
                Check Eligibility First. Gather Paperwork Second.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Traditional portals demand 10+ PDF uploads before showing whether you qualify. SchemeSathi flips the paradigm: answer 4 plain-language prompts in 60 seconds with voice or touch, then receive an exact 1-page paper checklist to take to your village CSC kiosk.
              </p>
            </div>

            {/* Checklist Comparison Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="rounded-xl p-3 bg-red-50/40 border border-red-200 text-xs space-y-1">
                <div className="font-bold text-red-900 flex items-center gap-1.5">
                  <span>✕ Traditional Portals</span>
                </div>
                <div className="text-[11px] text-red-700">
                  12-page PDF forms, mandatory document scanning, frequent OTP timeouts.
                </div>
              </div>

              <div className="rounded-xl p-3 bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <span>✓ SchemeSathi Flow</span>
                </div>
                <div className="text-[11px] text-emerald-800">
                  4 intuitive prompts, voice playback, zero uploads, instant CSC paper slip.
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>No Aadhaar Required to Check</span>
            <span className="text-[#111111] font-bold">Zero PII Stored</span>
          </div>
        </div>

        {/* BENTO CARD 4 (6 Cols): 100% Deterministic Gazette Policy Engine */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-zinc-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>OFFICIAL GAZETTE GROUNDED</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-400 font-bold">
                AUDITED: 2026
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-[#111111]">
                Zero Hallucinations. Deterministic Ministry Logic.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                We reject opaque AI guessing for citizen welfare. Every scheme requirement is codified as deterministic boolean rules extracted verbatim from official government gazettes and ministry notification guidelines.
              </p>
            </div>

            {/* Code Policy Matrix Mock */}
            <div className="rounded-xl bg-zinc-900 text-zinc-300 p-3.5 font-mono text-[11px] space-y-1 border border-zinc-800 shadow-inner">
              <div className="text-zinc-500">
                // Official Gazette Verification Engine
              </div>
              <div className="text-emerald-400">
                RULE_PMKISAN_LAND == true &rarr; PASS (Cultivable Land)
              </div>
              <div className="text-emerald-400">
                RULE_PMKISAN_TAX == false &rarr; PASS (Non-Taxpayer)
              </div>
              <div className="text-emerald-400">
                RULE_PMAY_HOUSE == kutcha &rarr; PASS (Homeless / Kutcha)
              </div>
            </div>

          </div>

          <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span className="font-mono text-[11px]">
              Grounded in Gazette of India
            </span>
            <button
              type="button"
              onClick={onBrowse}
              className="font-bold text-[#111111] hover:underline flex items-center gap-1"
            >
              <span>Explore Rule Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
