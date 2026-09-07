import React, { useState } from 'react';
import { Pledge, CauseProject } from '../types';
import { Network, Heart, Sparkles, Clock, DollarSign, ArrowRight, Share2, Filter } from 'lucide-react';

interface RippleLedgerProps {
  pledges: Pledge[];
  projects: CauseProject[];
  onTriggerRipplePledge: (parentPledge: Pledge) => void;
}

export const RippleLedger: React.FC<RippleLedgerProps> = ({
  pledges,
  projects,
  onTriggerRipplePledge,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'funds' | 'hours'>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  // Filtered pledges
  const filteredPledges = pledges.filter((p) => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    if (selectedProjectId !== 'all' && p.projectId !== selectedProjectId) return false;
    return true;
  });

  // Calculate metrics
  const totalFunds = pledges
    .filter((p) => p.type === 'funds')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalHours = pledges
    .filter((p) => p.type === 'hours')
    .reduce((sum, p) => sum + p.amount, 0);

  const rippleChainsCount = pledges.filter((p) => p.parentId).length;
  const rippleMultiplier = (1 + (rippleChainsCount / (pledges.length || 1))).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Ripple Stats Hero */}
      <div className="bg-gradient-to-br from-sky-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Network className="w-3.5 h-3.5 text-sky-300" />
            <span>The Generosity Ripple Engine</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                How One Act of Giving Inspires Three More
              </h1>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Generosity is contagious. When someone donates or pledges volunteer time, they inspire friends, 
                colleagues, and neighbors to take action. Track how acts of kindness propagate across communities.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-200">
                  Total Funds Pledged
                </span>
                <div className="text-2xl font-black font-display text-white mt-1">
                  ${totalFunds.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-300 font-medium">100% direct community benefit</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-200">
                  Volunteer Hours
                </span>
                <div className="text-2xl font-black font-display text-white mt-1">
                  {totalHours} hrs
                </div>
                <span className="text-[10px] text-sky-300 font-medium">Verified hands-on time</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-200">
                    Community Ripple Multiplier
                  </span>
                  <div className="text-2xl font-black font-display text-emerald-400 mt-0.5">
                    {rippleMultiplier}x Multiplier
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-200 px-2.5 py-1 rounded-full font-bold border border-emerald-400/30">
                  {rippleChainsCount} Connected Chains
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter Ledger:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Pledges
            </button>
            <button
              onClick={() => setFilterType('funds')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'funds' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Funds ($)
            </button>
            <button
              onClick={() => setFilterType('hours')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === 'hours' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Volunteer Hours
            </button>
          </div>
        </div>

        <div>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-700 text-xs rounded-xl px-3 py-1.5 font-medium"
          >
            <option value="all">All Grassroots Causes</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ripple Ledger Cards */}
      <div className="space-y-4">
        {filteredPledges.map((pledge) => {
          const parentPledge = pledges.find((p) => p.id === pledge.parentId);

          return (
            <div
              key={pledge.id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-xs hover:shadow-md ${
                pledge.parentId ? 'border-sky-200/80 bg-gradient-to-r from-sky-50/30 to-white ml-0 sm:ml-6' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      pledge.type === 'funds'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {pledge.pledgerName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {pledge.pledgerName}
                      </span>
                      {pledge.badge && (
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {pledge.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{pledge.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900 flex items-center gap-1">
                      {pledge.type === 'funds' ? (
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-indigo-600" />
                      )}
                      <span>
                        {pledge.type === 'funds' ? `$${pledge.amount}` : `${pledge.amount} Hours`}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {pledge.impactAchieved}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              {pledge.message && (
                <p className="mt-3 text-sm text-slate-700 italic bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  "{pledge.message}"
                </p>
              )}

              {/* Cause & Ripple Link info */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="font-medium text-slate-700">{pledge.projectTitle}</span>
                  {parentPledge && (
                    <span className="bg-sky-100 text-sky-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      🌊 Inspired by {parentPledge.pledgerName}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTriggerRipplePledge(pledge)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                    <span>Pass Ripple Forward</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
