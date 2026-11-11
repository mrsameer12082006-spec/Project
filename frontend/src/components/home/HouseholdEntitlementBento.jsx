import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowRight,
  Sprout,
  Home as HomeIcon,
  ShieldPlus
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
            <span>ESTIMATED ANNUAL WELFARE BENEFIT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
            How Government Welfare Entitlements Compound for Your Family.
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
          PROMINENT HOUSEHOLD ENTITLEMENT CARD
          ─────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Deep Obsidian Household Entitlement Hub */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0B1310] text-white p-7 sm:p-10 shadow-[0_24px_48px_-12px_rgba(11,19,16,0.35),0_0_0_1px_rgba(255,255,255,0.06)] min-h-[460px] flex flex-col justify-between">
          
          {/* Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500/30 via-emerald-600/15 to-transparent blur-3xl"
          />

          <div className="relative z-10 space-y-6">
            
            {/* Top Bar with Status Tag */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-mono font-bold text-emerald-300 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>COMBINED ANNUAL ENTITLEMENT</span>
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
                      <div className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">
                        {sc.active ? '● QUALIFIED' : '○ EXCLUDED'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Action Row */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-zinc-400">
              Evaluated strictly according to official central ministry guidelines.
            </span>

            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 hover:bg-emerald-300 text-[#0B1310] font-extrabold px-6 py-3 text-xs sm:text-sm shadow-md transition-all active:scale-[0.985]"
            >
              <span>Check Your Household Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
