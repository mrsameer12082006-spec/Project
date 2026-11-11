import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sprout,
  Home as HomeIcon,
  ShieldPlus,
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
      colorClass: 'text-emerald-700',
      iconBoxClass: 'bg-emerald-50 border-emerald-200/80 text-emerald-700 shadow-2xs',
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
      colorClass: 'text-amber-700',
      iconBoxClass: 'bg-amber-50 border-amber-200/80 text-amber-700 shadow-2xs',
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
      colorClass: 'text-sky-700',
      iconBoxClass: 'bg-sky-50 border-sky-200/80 text-sky-700 shadow-2xs',
      active: pmJayActive,
      icon: ShieldPlus,
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
            
            {/* Top Bar with Profile Info & Tactile Dwelling Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                  Household Category: {currentProfile.label}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {currentProfile.tagline}
                </span>
              </div>

              {/* Clean Dwelling Type Segmented Toggle */}
              <div className="flex items-center gap-1 bg-[#F2F2F4] border border-[#E4E4E7] p-1 rounded-lg text-xs font-semibold w-fit">
                <button
                  type="button"
                  onClick={() => setIsKutchaHouse(true)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    isKutchaHouse
                      ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  Kutcha Dwelling
                </button>
                <button
                  type="button"
                  onClick={() => setIsKutchaHouse(false)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    !isKutchaHouse
                      ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-900'
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

            {/* Wise-Style Segmented Proportional Grant Bar */}
            <div className="space-y-2 pt-1">
              <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden flex gap-1 p-0.5">
                {pmJayPct > 0 && (
                  <motion.div
                    style={{ width: `${pmJayPct}%` }}
                    className="bg-sky-600 h-full rounded-full"
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
                {pmAwasPct > 0 && (
                  <motion.div
                    style={{ width: `${pmAwasPct}%` }}
                    className="bg-amber-600 h-full rounded-full"
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
                {pmKisanPct > 0 && (
                  <motion.div
                    style={{ width: `${pmKisanPct}%` }}
                    className="bg-emerald-600 h-full min-w-[14px] rounded-full"
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                )}
              </div>

              {/* Clean Metric Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                  <span>Healthcare Cover: <strong>₹5,00,000</strong> ({pmJayPct.toFixed(0)}%)</span>
                </div>
                {pmAwasActive && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                    <span>Housing Grant: <strong>₹1,30,000</strong> ({pmAwasPct.toFixed(0)}%)</span>
                  </div>
                )}
                {pmKisanActive && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>Farmer DBT: <strong>₹6,000</strong> ({pmKisanPct.toFixed(0)}%)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Included Scheme Breakdown Rows (Clean Passbook Ledger) */}
            <div className="space-y-3 pt-2">
              {schemesList.map((sc) => {
                const Icon = sc.icon;
                return (
                  <div
                    key={sc.id}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      sc.active
                        ? 'bg-zinc-50/70 hover:bg-zinc-100/70 border-zinc-200/80'
                        : 'bg-zinc-50/20 border-zinc-200/40 opacity-50'
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
          <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Grounded directly in official 2026 central ministry welfare guidelines.</span>
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
