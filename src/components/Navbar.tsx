import React from 'react';
import { Heart, Sparkles, Network, FileText, ShieldCheck, PlusCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'storyteller' | 'ripple' | 'transparency';
  setActiveTab: (tab: 'explore' | 'storyteller' | 'ripple' | 'transparency') => void;
  onOpenPledgeModal: () => void;
  totalFunds: number;
  totalHours: number;
  totalPledgesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPledgeModal,
  totalFunds,
  totalHours,
  totalPledgesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top International Day of Charity / Dev.to banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-sky-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider">
              Sept 5 • International Day of Charity
            </span>
            <span className="hidden sm:inline text-emerald-100">
              Dev.to Challenge: Building in the Spirit of Generosity & Radical Transparency
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Ledger: ${totalFunds.toLocaleString()} pledged • {totalHours} volunteer hrs
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/20 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">
                  OpenImpact
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Grassroots
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Transparent Giving & Generosity Ripple Engine
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'explore'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Explore & Simulate</span>
            </button>

            <button
              onClick={() => setActiveTab('storyteller')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'storyteller'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Field Storyteller</span>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                AI
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ripple')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'ripple'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Network className="w-4 h-4 text-sky-600" />
              <span>Ripple Ledger</span>
              <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {totalPledgesCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('transparency')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'transparency'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Open Audit</span>
            </button>
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPledgeModal}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Pledge Impact</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'explore' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('storyteller')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'storyteller' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Storyteller (AI)
          </button>
          <button
            onClick={() => setActiveTab('ripple')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'ripple' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Ripple Ledger ({totalPledgesCount})
          </button>
          <button
            onClick={() => setActiveTab('transparency')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'transparency' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Open Audit
          </button>
        </div>
      </div>
    </header>
  );
};
