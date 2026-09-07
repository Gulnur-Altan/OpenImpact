import React from 'react';
import { CauseProject } from '../types';
import { ShieldCheck, CheckCircle2, Heart, Scale, Users, FileSpreadsheet, Sparkles, ArrowRight } from 'lucide-react';

interface TransparencyOverviewProps {
  projects: CauseProject[];
  onOpenPledgeModal: () => void;
}

export const TransparencyOverview: React.FC<TransparencyOverviewProps> = ({
  projects,
  onOpenPledgeModal,
}) => {
  const totalVerifiedReceipts = projects.reduce(
    (acc, p) => acc + p.updates.reduce((uSum, u) => uSum + u.verifiedReceiptCount, 0),
    0
  );

  const totalBeneficiaries = projects.reduce(
    (acc, p) => acc + p.updates.reduce((uSum, u) => uSum + u.beneficiariesReached, 0),
    0
  );

  const averageAuditScore = Math.round(
    projects.reduce((acc, p) => acc + p.transparencyScore, 0) / (projects.length || 1)
  );

  const handleExportCsv = () => {
    const headers = ['Project', 'Category', 'Location', 'Raised ($)', 'Target ($)', 'Volunteer Hours', 'Transparency Score'];
    const rows = projects.map((p) => [
      `"${p.title}"`,
      `"${p.category}"`,
      `"${p.location}"`,
      p.currentAmount,
      p.targetAmount,
      p.currentHours,
      `${p.transparencyScore}%`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'openimpact_public_ledger.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
            <span>Ethical & Accountable Giving Charter</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Radical Transparency. Zero Black Boxes.
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            The UN highlights ethical and accountable giving as a pillar of modern charity. 
            OpenImpact replaces opaque annual PDFs with real-time public accounting, open receipts, 
            and transparent micro-unit economics.
          </p>
        </div>
      </div>

      {/* Global Audit Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            <span>Average Transparency Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black font-display text-slate-900">
            {averageAuditScore}/100
          </div>
          <p className="text-xs text-slate-500 mt-1">Across all 4 verified grassroots partners</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            <span>Verified Receipts Logged</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black font-display text-slate-900">
            {totalVerifiedReceipts} Receipts
          </div>
          <p className="text-xs text-slate-500 mt-1">Direct equipment and transport invoices</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            <span>Direct Beneficiaries</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black font-display text-slate-900">
            {totalBeneficiaries.toLocaleString()}+ People
          </div>
          <p className="text-xs text-slate-500 mt-1">Reached with clean light, food & water</p>
        </div>
      </div>

      {/* The 4 Principles of OpenImpact */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-10">
        <h2 className="text-xl font-bold font-display text-slate-900 mb-6 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600" />
          <span>Our Radical Transparency Guarantees</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Tangible Unit Ratios Before Every Dollar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No donor gives into a nebulous bucket. Every campaign publishes strict unit economics 
                (e.g., $18 = 1 solar study lantern, 1.5 hours = 1 family produce rescue).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Ethical Labor & Fair Stipends
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We reject the fake "0% overhead" claim. True grassroots sustainability compensates local youth 
                technicians and covers volunteer driver fuel fairly and transparently.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Field Evidence Over Marketing Fluff
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Gemini-powered field dispatcher takes unpolished field receipts and raw volunteer notes 
                and transforms them into plain, transparent audit dispatches.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                Open Data & Public Download
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Anyone can download the complete ledger in CSV format anytime for independent community audit 
                and analysis without login barriers.
              </p>
            </div>
          </div>
        </div>

        {/* Download CSV & CTA */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Download Open Public Ledger (CSV)</span>
          </button>

          <button
            onClick={onOpenPledgeModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pledge in the Spirit of Generosity</span>
          </button>
        </div>
      </div>
    </div>
  );
};
