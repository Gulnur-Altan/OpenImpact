import React from 'react';
import { CauseProject } from '../types';
import { X, ShieldCheck, CheckCircle2, FileCheck, Info, ExternalLink, ArrowRight } from 'lucide-react';

interface TransparencyAuditModalProps {
  project: CauseProject | null;
  onClose: () => void;
  onPledgeDirectly: (project: CauseProject) => void;
}

export const TransparencyAuditModal: React.FC<TransparencyAuditModalProps> = ({
  project,
  onClose,
  onPledgeDirectly,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 relative transition-all max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Radical Transparency & Ethical Audit</span>
        </div>

        <h2 className="text-2xl font-bold font-display text-slate-900 leading-snug">
          {project.title}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {project.organization} • Lead Organizers: {project.leadOrganizer}
        </p>

        {/* Transparency Scorecard Pill */}
        <div className="my-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-100 font-medium">Public Transparency Score</span>
            <div className="text-3xl font-extrabold font-display">{project.transparencyScore}/100</div>
          </div>
          <div className="text-right text-xs text-emerald-100 max-w-xs">
            Verified open receipts, community-led payroll, and direct last-mile delivery.
          </div>
        </div>

        {/* Budget Allocation Breakdown */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Itemized Fund Allocation
          </h3>
          <div className="space-y-3">
            {project.budgetBreakdown.map((slice, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800">{slice.category}</span>
                  <span className="font-extrabold text-emerald-700">
                    {slice.percentage}% (${slice.amount.toLocaleString()})
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${slice.percentage}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500">{slice.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zero Overhead Myth Explainer */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 mb-6">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Ethical Giving Note: The "Zero-Overhead" Myth</span>
          </div>
          <p className="leading-relaxed">
            Charities claiming "100% goes to the cause with zero overhead" often hide underpaid local labor and burn out volunteers. 
            OpenImpact champions ethical compensation: fair local apprentice stipends, safe logistics, and public accounting receipts.
          </p>
        </div>

        {/* Verified Updates Log */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Verified Field Milestones & Proof
          </h3>
          {project.updates.map((update) => (
            <div key={update.id} className="border border-slate-200 rounded-xl p-3.5 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">{update.title}</span>
                <span className="text-slate-400 text-[10px]">{update.date}</span>
              </div>
              <p className="text-slate-600 mb-2 leading-relaxed">{update.summary}</p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <FileCheck className="w-3 h-3" />
                  <span>{update.verifiedReceiptCount} Verified Receipts</span>
                </span>
                <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  👥 {update.beneficiariesReached} Beneficiaries Reached
                </span>
                <span className="text-slate-400">By {update.author} ({update.authorRole})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Close Audit
          </button>

          <button
            onClick={() => {
              onClose();
              onPledgeDirectly(project);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <span>Pledge to this Initiative</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
