import React from 'react';
import { ShieldCheck, ChevronDown, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

export default function RuleAuditTrace({ scheme }) {
  return (
    <details className="group bg-zinc-50/70 border border-zinc-200/90 rounded-xl p-3.5 text-xs text-zinc-700 transition-all">
      <summary className="cursor-pointer font-bold flex items-center justify-between list-none">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-zinc-900">
            Official Policy Verification Breakdown
          </span>
        </span>
        <span className="text-zinc-500 text-xs font-semibold flex items-center gap-1 group-open:text-[#111111]">
          <span>View Criteria Details</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-180" />
        </span>
      </summary>

      <div className="mt-3 pt-3 border-t border-zinc-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between text-zinc-500 text-[11px]">
          <span>Central Guidelines: <strong>{scheme.schemeName || scheme.englishName}</strong></span>
          <span className="text-emerald-700 font-semibold">Statutory Criteria Evaluated</span>
        </div>

        {/* Clean Human-Readable Criteria Rows */}
        <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100 shadow-2xs overflow-hidden">
          {scheme.passed.map(p => (
            <div key={p.ruleId} className="p-3 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-zinc-900">
                    {p.englishDescription || p.description}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Requirement satisfied based on your answers
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 shrink-0">
                Verified
              </span>
            </div>
          ))}

          {scheme.failed.map(f => (
            <div key={f.ruleId} className="p-3 flex items-start justify-between gap-3 text-xs bg-zinc-50/50">
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-700">
                    {f.englishDescription || f.description}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Statutory condition not met for this category
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold text-zinc-600 bg-zinc-100 border border-zinc-200 shrink-0">
                Not Met
              </span>
            </div>
          ))}

          {scheme.missing.map(m => (
            <div key={m.ruleId} className="p-3 flex items-start justify-between gap-3 text-xs bg-amber-50/30">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-800">
                    {m.englishDescription || m.description}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Additional verification required at village CSC kiosk
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 shrink-0">
                Pending Info
              </span>
            </div>
          ))}
        </div>

        {/* Footer Link to Official Guidelines */}
        <div className="text-zinc-500 flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span>Official Portal:</span>
            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#111111] hover:underline font-semibold flex items-center gap-1"
            >
              <span>{scheme.officialUrl}</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </span>
          <span className="text-zinc-400">
            Audit ground: Central Ministry Rules
          </span>
        </div>
      </div>
    </details>
  );
}
