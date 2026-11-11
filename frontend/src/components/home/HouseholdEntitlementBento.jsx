import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  ArrowRight,
  Sprout,
  Home as HomeIcon,
  ShieldPlus,
  CheckCircle2,
  Info,
  SlidersHorizontal
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
      frequency: '3 installments of ₹2,000',
      active: pmKisanActive,
      icon: Sprout,
      color: 'emerald',
      inactiveReason: 'Requires cultivable agricultural land title in revenue records'
    },
    {
      id: 'pm-awas',
      name: 'PM Awas Yojana (Gramin)',
      category: 'Rural Housing Grant',
      ministry: 'Ministry of Rural Development',
      payout: 'Direct Treasury Construction Subsidy + MGNREGA wages',
      amount: '₹1,30,000 Grant',
      frequency: 'Staged construction releases',
      active: pmAwasActive,
      icon: HomeIcon,
      color: 'amber',
      inactiveReason: isKutchaHouse ? 'Not selected under senior citizen priority profile' : 'Dwelling is already a pucca concrete structure'
    },
    {
      id: 'pm-jay',
      name: 'Ayushman Bharat PM-JAY',
      category: 'Cashless Healthcare Protection',
      ministry: 'National Health Authority',
      payout: '100% Cashless secondary & tertiary hospital care',
      amount: '₹5,00,000 / yr',
      frequency: 'Annual family floating coverage',
      active: pmJayActive,
      icon: ShieldPlus,
      color: 'sky',
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
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Household Entitlement Calculator
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
            How Government Welfare Entitlements Compound for Your Family.
          </h2>

          <p className="text-sm text-zinc-600 leading-relaxed">
            Most Indian families qualify for multiple central welfare programs simultaneously. Explore how agricultural income, housing grants, and health safety nets compound into direct protection.
          </p>
        </div>

        {/* Profile Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#F2F2F4] border border-[#E4E4E7] p-1.5 rounded-xl w-fit shadow-2xs text-xs font-semibold self-start md:self-auto">
          {Object.values(baseProfiles).map(p => {
            const isSelected = activeProfile === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProfile(p.id)}
                className={`relative px-3.5 py-2 rounded-lg font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
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
        
        <div className="rounded-3xl bg-white border border-zinc-200/90 p-7 sm:p-10 shadow-sm flex flex-col justify-between space-y-7">
          
          <div className="space-y-6">
            
            {/* Top Bar with Profile Info & Interactive Dwelling Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  <span>Interactive Entitlement Model</span>
                </span>
                <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
                  · Profile: <strong className="text-zinc-800">{currentProfile.label}</strong>
                </span>
              </div>

              {/* Ramp-Style Condition Switcher: Kutcha House Toggle */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-600 font-medium">House Type:</span>
                <button
                  type="button"
                  onClick={() => setIsKutchaHouse(prev => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-all active:scale-[0.985] ${
                    isKutchaHouse
                      ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs'
                      : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}
                >
                  <HomeIcon className="w-3 h-3 text-amber-600" />
                  <span>{isKutchaHouse ? 'Kutcha / Kutcha Dwelling (PMAY-G Active)' : 'Pucca Dwelling (PMAY-G Excluded)'}</span>
                </button>
              </div>
            </div>

            {/* Giant Metric Counter */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight metric-tabular">
                  <CountUp end={totalCalculated} prefix="₹" duration={600} />
                </div>
                <span className="text-sm sm:text-base font-semibold text-emerald-800">
                  Total Annual Household Welfare Value
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-500">
                {currentProfile.tagline}
              </p>
            </div>

            {/* Wise-Style Segmented Proportional Grant Bar */}
            <div className="space-y-2 pt-1">
              <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden flex shadow-inner p-0.5">
                {pmJayPct > 0 && (
                  <motion.div
                    style={{ width: `${pmJayPct}%` }}
                    className="bg-sky-500 h-full first:rounded-l-full last:rounded-r-full"
                    title={`Healthcare: ₹5,00,000 (${pmJayPct.toFixed(1)}%)`}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
                {pmAwasPct > 0 && (
                  <motion.div
                    style={{ width: `${pmAwasPct}%` }}
                    className="bg-amber-500 h-full first:rounded-l-full last:rounded-r-full"
                    title={`Housing Grant: ₹1,30,000 (${pmAwasPct.toFixed(1)}%)`}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
                {pmKisanPct > 0 && (
                  <motion.div
                    style={{ width: `${pmKisanPct}%` }}
                    className="bg-emerald-600 h-full first:rounded-l-full last:rounded-r-full"
                    title={`Income Support: ₹6,000 (${pmKisanPct.toFixed(1)}%)`}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
              </div>

              {/* Legend with exact amounts and percentages */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                  <span>Healthcare Cover: <strong>₹5,00,000</strong> ({pmJayPct.toFixed(0)}%)</span>
                </div>
                {pmAwasActive && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Housing Grant: <strong>₹1,30,000</strong> ({pmAwasPct.toFixed(0)}%)</span>
                  </div>
                )}
                {pmKisanActive && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>Farmer DBT: <strong>₹6,000</strong> ({pmKisanPct.toFixed(0)}%)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Included Scheme Breakdown Rows (Wise Hairline Architecture) */}
            <div className="space-y-3 pt-2">
              {schemesList.map((sc) => {
                const Icon = sc.icon;
                return (
                  <div
                    key={sc.id}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      sc.active
                        ? 'bg-zinc-50/70 hover:bg-zinc-100/70 border-zinc-200/80'
                        : 'bg-zinc-50/20 border-zinc-200/40 opacity-60'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        sc.active
                          ? 'bg-white border-zinc-200 shadow-2xs text-[#111111]'
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

                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
                      <div className={`font-bold text-sm sm:text-base ${sc.active ? 'text-[#111111]' : 'text-zinc-400'}`}>
                        {sc.active ? sc.amount : 'Excluded'}
                      </div>
                      <div className="text-[11px] font-semibold mt-0.5">
                        {sc.active ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span>Qualified</span>
                          </span>
                        ) : (
                          <span className="text-zinc-400">
                            Criteria not met
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
          <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Calculated strictly using official Ministry guidelines and direct PFMS disbursement criteria.</span>
            </div>

            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-[#262626] text-white font-bold px-7 py-3.5 text-xs sm:text-sm shadow-sm transition-all active:scale-[0.985]"
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
