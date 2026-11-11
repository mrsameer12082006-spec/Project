import React, { useState } from 'react';
import { Edit3, CheckCircle2 } from 'lucide-react';
import ResultCard from '../components/results/ResultCard';

export default function EligibilityResults({
  results,
  answers,
  onEditAnswers,
  onOpenDetails,
  onPrintSlip
}) {
  const [filter, setFilter] = useState('all');

  const eligibleCount = results.filter(r => r.status === 'potentially_eligible').length;
  const filteredResults = results.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto animate-fade-in">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#F2F2F4] border border-[#E4E4E7] px-3.5 py-1 rounded-full text-xs text-zinc-700 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block shrink-0" />
            <span className="font-bold text-zinc-900">
              Evaluation Complete
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-emerald-700 text-xs font-bold">
              {eligibleCount} of {results.length} Schemes Qualified
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
            Your Scheme Eligibility Report
          </h2>
          <p className="text-sm text-zinc-500">
            {eligibleCount > 0
              ? `You qualify for ${eligibleCount} out of ${results.length} central welfare schemes based on your recorded criteria.`
              : `Review the rule criteria below for each scheme to see which conditions were not met.`}
          </p>
        </div>

        <button
          type="button"
          onClick={onEditAnswers}
          className="text-xs font-semibold text-zinc-700 hover:text-[#111111] px-4 py-2.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-2xs"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Answers</span>
        </button>
      </div>

      {/* Apple Glassmorphic Filter Tabs */}
      <div className="flex items-center gap-1 bg-zinc-200/40 backdrop-blur-md border border-black/[0.06] p-1 rounded-full w-fit shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)] text-xs font-semibold">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
            filter === 'all'
              ? 'bg-white text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_1.5px_rgba(0,0,0,0.04),0_0_0_0.5px_rgba(0,0,0,0.04)] font-semibold'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.03]'
          }`}
        >
          All Schemes ({results.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter('potentially_eligible')}
          className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
            filter === 'potentially_eligible'
              ? 'bg-white text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_1.5px_rgba(0,0,0,0.04),0_0_0_0.5px_rgba(0,0,0,0.04)] font-semibold'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.03]'
          }`}
        >
          Eligible ({eligibleCount})
        </button>
      </div>

      {/* Scheme Cards Stack */}
      <div className="space-y-6">
        {filteredResults.map(scheme => (
          <ResultCard
            key={scheme.schemeId}
            scheme={scheme}
            onOpenDetails={onOpenDetails}
            onPrintSlip={onPrintSlip}
          />
        ))}
      </div>

    </div>
  );
}
