import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sprout,
  Home as HomeIcon,
  HeartPulse,
  Landmark,
  ShieldCheck,
  Info
} from 'lucide-react';
import CountUp from '../common/CountUp';

export default function HouseholdEntitlementBento({ onStart, onBrowse }) {
  const [activeProfile, setActiveProfile] = useState('farmer');
  const [isKutchaHouse, setIsKutchaHouse] = useState(true);

  // Dynamic profiles with baseline configurations
  const baseProfiles = {
    farmer: {
      id: 'farmer',
      label: 'Small Farmer Family',
      tagline: 'Landholding agricultural family with cultivable land title',
      hasLand: true,
      hasSenior: false
    },
    artisan: {
      id: 'artisan',
      label: 'Rural Artisan / Labourer',
      tagline: 'Non-landholding rural household with manual labour livelihood',
      hasLand: false,
      hasSenior: false
    },
    senior: {
      id: 'senior',
      label: 'Senior Citizen Household',
      tagline: 'Vulnerable senior citizen household needing healthcare security',
      hasLand: false,
      hasSenior: true
    }
  };

  const currentProfile = baseProfiles[activeProfile];

  // Dynamically compute eligibility and amounts based on profile + active toggles
  const pmKisanActive = currentProfile.hasLand;
  const pmAwasActive = isKutchaHouse && activeProfile !== 'senior';
  const pmJayActive = true; // Universal entitlement under SECC/Deprivation criteria

  const pmKisanAmount = pmKisanActive ? 6000 : 0;
  const pmAwasAmount = pmAwasActive ? 130000 : 0;
  const pmJayAmount = pmJayActive ? 500000 : 0;

  const totalCalculated = pmKisanAmount + pmAwasAmount + pmJayAmount;

  // Percentage distribution for Wise/Ramp segmented bar
  const pmJayPct = totalCalculated > 0 ? (pmJayAmount / totalCalculated) * 100 : 0;
  const pmAwasPct = totalCalculated > 0 ? (pmAwasAmount / totalCalculated) * 100 : 0;
  const pmKisanPct = totalCalculated > 0 ? (pmKisanAmount / totalCalculated) * 100 : 0;

  const schemesList = [
    {
      id: 'pm-kisan',
      name: 'PM Kisan Samman Nidhi',
      category: 'Farmer Income Support',
      ministry: 'Ministry of Agriculture',
      payout: 'Direct DBT into Aadhaar-linked Bank Account',
      amount: '₹6,000 / yr',
      benefitTag: 'Direct Bank DBT',
      colorClass: 'text-emerald-800 font-bold',
      iconBoxClass: 'bg-emerald-700 text-white shadow-xs',
      active: pmKisanActive,
      icon: Sprout,
      inactiveReason: 'Requires cultivable agricultural land title in revenue records'
    },
    {
      id: 'pm-awas',
      name: 'PM Awas Yojana (Gramin)',
      category: 'Rural Housing Grant',
      ministry: 'Ministry of Rural Development',
      payout: 'Direct Treasury Construction Subsidy + MGNREGA wages',
      amount: '₹1,30,000 Grant',
      benefitTag: 'Direct Construction Subsidy',
      colorClass: 'text-amber-800 font-bold',
      iconBoxClass: 'bg-amber-700 text-white shadow-xs',
      active: pmAwasActive,
      icon: HomeIcon,
      inactiveReason: isKutchaHouse ? 'Not selected under senior citizen priority profile' : 'Dwelling is already a permanent pucca structure'
    },
    {
      id: 'pm-jay',
      name: 'Ayushman Bharat PM-JAY',
      category: 'Cashless Healthcare Protection',
      ministry: 'National Health Authority',
      payout: 'Cashless hospitalization across 27,000+ hospitals',
      amount: '₹5,00,000 / yr',
      benefitTag: 'Annual Cashless Hospital Cover',
      colorClass: 'text-sky-800 font-bold',
      iconBoxClass: 'bg-sky-700 text-white shadow-xs',
      active: pmJayActive,
      icon: HeartPulse,
      inactiveReason: null
    }
  ];

  return (
    <section className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ───────────────────────────────────────────────────────────
          SECTION HEADER WITH SEGMENTED SWITCHER (WISE / RAMP PATTERN)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-bold tracking-tight shadow-xs w-fit">
            <Landmark className="w-3.5 h-3.5 text-emerald-300" />
            <span>Household Entitlement Calculation</span>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
            How Government Welfare Entitlements Compound for Your Family.
          </h2>

          <p className="text-sm text-zinc-600 leading-relaxed">
            Most Indian families qualify for multiple central welfare programs simultaneously. Explore how agricultural income, housing grants, and health safety nets compound into direct protection.
          </p>
        </div>

        {/* Profile Switcher Tabs (Apple Glassmorphic Segmented Control) */}
        <div className="spatial-segmented-track flex items-center gap-1 text-xs font-semibold self-start md:self-auto">
          {Object.values(baseProfiles).map(p => {
            const isSelected = activeProfile === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProfile(p.id)}
                className={`relative px-4 py-2 transition-all duration-200 ${
                  isSelected
                    ? 'spatial-segmented-pill-active'
                    : 'spatial-segmented-pill-inactive'
                }`}
              >
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PROMINENT HOUSEHOLD ENTITLEMENT CARD (WISE / RAMP ARCHITECTURE)
          ─────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto w-full">
        
        <div className="rounded-3xl spatial-glass p-7 sm:p-10 shadow-sm flex flex-col justify-between space-y-7">
          
          <div className="space-y-6">
            
            {/* Top Bar with Profile Info & Apple Glassmorphic Dwelling Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900">
                    {currentProfile.label}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                    · Baseline Household Model
                  </span>
                </div>
                <span className="text-xs text-zinc-500 font-medium">
                  {currentProfile.tagline}
                </span>
              </div>

              {/* Apple Glassmorphic Segmented Control (Dwelling Toggle) */}
              <div className="spatial-segmented-track flex items-center gap-1 text-xs font-semibold w-fit">
                <button
                  type="button"
                  onClick={() => setIsKutchaHouse(true)}
                  className={`px-3.5 py-1.5 transition-all duration-200 ${
                    isKutchaHouse
                      ? 'spatial-segmented-pill-active'
                      : 'spatial-segmented-pill-inactive'
                  }`}
                >
                  Kutcha Dwelling
                </button>
                <button
                  type="button"
                  onClick={() => setIsKutchaHouse(false)}
                  className={`px-3.5 py-1.5 transition-all duration-200 ${
                    !isKutchaHouse
                      ? 'spatial-segmented-pill-active'
                      : 'spatial-segmented-pill-inactive'
                  }`}
                >
                  Pucca Dwelling
                </button>
              </div>
            </div>

            {/* Giant Metric Counter */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight metric-tabular">
                  <CountUp end={totalCalculated} prefix="₹" duration={600} />
                </div>
                <span className="text-sm sm:text-base font-semibold text-zinc-600">
                  Total Annual Household Welfare Value & Cashless Cover
                </span>
              </div>
            </div>

            {/* 3D Extruded Isometric Compounding Blocks (Moment 2: 79% / 20% / 1% Honest Proportions) */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-3 pt-2"
            >
              <div className="h-6 w-full bg-zinc-100/80 rounded-xl p-1 flex gap-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden">
                {pmJayPct > 0 && (
                  <motion.div
                    custom={`${pmJayPct}%`}
                    variants={{
                      hidden: { width: 0 },
                      show: (customWidth) => ({
                        width: customWidth,
                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                      })
                    }}
                    style={{ background: 'var(--blue-primary)' }}
                    className="h-full rounded-lg relative group flex items-center justify-center text-[10px] text-white font-extrabold tracking-wider overflow-hidden cursor-help shadow-xs"
                  >
                    <span className="hidden sm:inline px-1 truncate drop-shadow-xs">79% Healthcare</span>
                  </motion.div>
                )}
                {pmAwasPct > 0 && (
                  <motion.div
                    custom={`${pmAwasPct}%`}
                    variants={{
                      hidden: { width: 0 },
                      show: (customWidth) => ({
                        width: customWidth,
                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
                      })
                    }}
                    style={{ background: 'var(--orange-primary)' }}
                    className="h-full rounded-lg relative group flex items-center justify-center text-[10px] text-white font-extrabold tracking-wider overflow-hidden cursor-help shadow-xs"
                  >
                    <span className="hidden sm:inline px-1 truncate drop-shadow-xs">20% Housing</span>
                  </motion.div>
                )}
                {pmKisanPct > 0 && (
                  <motion.div
                    custom={`${pmKisanPct}%`}
                    variants={{
                      hidden: { width: 0 },
                      show: (customWidth) => ({
                        width: customWidth,
                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
                      })
                    }}
                    style={{ background: 'var(--green-primary)' }}
                    className="h-full min-w-[22px] rounded-lg relative group flex items-center justify-center text-[10px] text-white font-extrabold tracking-wider overflow-hidden cursor-help shadow-xs"
                  >
                    <span className="px-1 drop-shadow-xs">1%</span>
                  </motion.div>
                )}
              </div>

              {/* Honest Proportional Metric Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-sky-600 shadow-2xs shrink-0" />
                  <span>Healthcare Cover: <strong className="text-zinc-900 font-bold">₹5,00,000</strong> ({pmJayPct.toFixed(0)}%)</span>
                </div>
                {pmAwasActive && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-600 shadow-2xs shrink-0" />
                    <span>Housing Grant: <strong className="text-zinc-900 font-bold">₹1,30,000</strong> ({pmAwasPct.toFixed(0)}%)</span>
                  </div>
                )}
                {pmKisanActive && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 shadow-2xs shrink-0" />
                    <span>Farmer DBT: <strong className="text-zinc-900 font-bold">₹6,000</strong> ({pmKisanPct.toFixed(0)}%)</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Included Scheme Breakdown Rows (Clean Passbook Ledger) */}
            <div className="space-y-3 pt-2">
              {schemesList.map((sc) => {
                const Icon = sc.icon;
                return (
                  <div
                    key={sc.id}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      sc.active
                        ? 'spatial-glass hover:border-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.02)]'
                        : 'bg-zinc-50/40 border-zinc-200/40 opacity-50'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        sc.active
                          ? sc.iconBoxClass
                          : 'bg-zinc-100 border-zinc-200 text-zinc-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-[#111111]">
                            {sc.name}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-medium">
                            · {sc.ministry}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500">
                          {sc.active ? sc.payout : sc.inactiveReason}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100 space-y-0.5">
                      <div className={`font-bold text-sm sm:text-base ${sc.active ? 'text-[#111111]' : 'text-zinc-400'}`}>
                        {sc.active ? sc.amount : 'Not Applicable'}
                      </div>
                      <div className="text-xs font-semibold">
                        {sc.active ? (
                          <span className={sc.colorClass}>
                            {sc.benefitTag}
                          </span>
                        ) : (
                          <span className="text-zinc-400 font-normal">
                            {isKutchaHouse ? 'Criteria not met' : 'Pucca house owned'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span>Grounded directly in official 2026 central ministry welfare guidelines.</span>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02, backgroundColor: '#000000' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={onStart}
              className="spatial-glass-button-dark inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] group cursor-pointer"
            >
              <span>Check Your Household Eligibility</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>

      </div>

    </section>
  );
}
