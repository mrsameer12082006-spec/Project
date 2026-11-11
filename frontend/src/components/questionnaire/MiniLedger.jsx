import React from 'react';
import { ClipboardList, ChevronDown, Edit3 } from 'lucide-react';

const FIELD_LABELS = {
  has_land: 'Agricultural Landholding',
  income_taxpayer: 'Income Tax Status',
  housing_type: 'Dwelling / Housing Type',
  social_category: 'Social Category & Livelihood'
};

export default function MiniLedger({ answers, language, onEditStep }) {
  const answeredKeys = Object.keys(answers);

  return (
    <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
      <details className="group">
        <summary className="cursor-pointer font-bold text-sm text-zinc-800 flex items-center justify-between list-none">
          <span className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            <span>
              Recorded Answers ({answeredKeys.length} completed)
            </span>
          </span>
          <span className="text-zinc-500 text-xs font-semibold flex items-center gap-1 group-open:rotate-180 transition-transform">
            <ChevronDown className="w-4 h-4" />
          </span>
        </summary>

        <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2 text-sm text-zinc-700">
          {answeredKeys.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">
              No answers recorded yet.
            </p>
          ) : (
            answeredKeys.map((key, idx) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-b-0">
                <div>
                  <span className="text-[11px] text-zinc-400 font-medium block">
                    {FIELD_LABELS[key] || key}
                  </span>
                  <span className="font-bold text-[#111111] text-xs sm:text-sm">
                    {answers[key].label}
                  </span>
                </div>
                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => onEditStep(idx)}
                    className="text-xs text-zinc-700 hover:text-[#111111] font-semibold px-2.5 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-100 flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Change</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </details>
    </div>
  );
}
