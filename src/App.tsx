import React, { useState } from 'react';
import { CauseProject, Pledge, CauseCategory } from './types';
import { INITIAL_PROJECTS, INITIAL_PLEDGES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { ImpactSimulatorModal } from './components/ImpactSimulatorModal';
import { FieldStoryteller } from './components/FieldStoryteller';
import { RippleLedger } from './components/RippleLedger';
import { TransparencyAuditModal } from './components/TransparencyAuditModal';
import { TransparencyOverview } from './components/TransparencyOverview';
import { Sparkles, Search, Heart, ShieldCheck, ArrowRight, Network, Globe, Filter } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<CauseProject[]>(INITIAL_PROJECTS);
  const [pledges, setPledges] = useState<Pledge[]>(INITIAL_PLEDGES);
  const [activeTab, setActiveTab] = useState<'explore' | 'storyteller' | 'ripple' | 'transparency'>('explore');

  // Modals state
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState<boolean>(false);
  const [selectedProjectForPledge, setSelectedProjectForPledge] = useState<CauseProject | null>(null);
  const [rippleParentPledge, setRippleParentPledge] = useState<Pledge | null>(null);
  const [selectedProjectForAudit, setSelectedProjectForAudit] = useState<CauseProject | null>(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle new pledge added
  const handlePledgeCreated = (newPledge: Pledge) => {
    setPledges((prev) => [newPledge, ...prev]);

    // Also update project funding / hours progress
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === newPledge.projectId) {
          if (newPledge.type === 'funds') {
            return { ...proj, currentAmount: proj.currentAmount + newPledge.amount };
          } else {
            return { ...proj, currentHours: proj.currentHours + newPledge.amount };
          }
        }
        return proj;
      })
    );

    // If it had a parent pledge, increment its ripple count
    if (newPledge.parentId) {
      setPledges((prev) =>
        prev.map((p) =>
          p.id === newPledge.parentId ? { ...p, rippleCount: p.rippleCount + 1 } : p
        )
      );
    }
  };

  const openPledgeModalForProject = (project: CauseProject) => {
    setSelectedProjectForPledge(project);
    setRippleParentPledge(null);
    setIsPledgeModalOpen(true);
  };

  const openGeneralPledgeModal = () => {
    setSelectedProjectForPledge(null);
    setRippleParentPledge(null);
    setIsPledgeModalOpen(true);
  };

  const triggerRipplePledge = (parentPledge: Pledge) => {
    const parentProj = projects.find((p) => p.id === parentPledge.projectId) || null;
    setSelectedProjectForPledge(parentProj);
    setRippleParentPledge(parentPledge);
    setIsPledgeModalOpen(true);
  };

  // Metrics
  const totalFundsPledged = pledges
    .filter((p) => p.type === 'funds')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalHoursPledged = pledges
    .filter((p) => p.type === 'hours')
    .reduce((sum, p) => sum + p.amount, 0);

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories: (CauseCategory | 'All')[] = [
    'All',
    'Technology-driven giving',
    'Climate & poverty',
    'Equity & inclusion',
    'Youth leadership',
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPledgeModal={openGeneralPledgeModal}
        totalFunds={totalFundsPledged}
        totalHours={totalHoursPledged}
        totalPledgesCount={pledges.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>International Day of Charity • Sept 5</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                    Build Something in the{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                      Spirit of Generosity
                    </span>
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                    Giving shouldn't be a black box. OpenImpact connects community donors with verified 
                    grassroots changemakers through <strong>concrete micro-impact ratios</strong>, 
                    <strong>public transparent receipts</strong>, and a <strong>generosity ripple engine</strong>.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={openGeneralPledgeModal}
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer text-sm"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Simulate & Pledge Now</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('storyteller')}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl border border-white/15 transition-colors cursor-pointer text-sm"
                    >
                      <span>Field Storyteller (AI)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter & Search Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search causes, regions, goods..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Causes Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900">
                    Verified Grassroots Initiatives
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {filteredProjects.length} initiatives with open accounting & unit breakdown
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSimulateAndPledge={openPledgeModalForProject}
                    onViewAudit={(proj) => setSelectedProjectForAudit(proj)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'storyteller' && (
          <FieldStoryteller projects={projects} />
        )}

        {activeTab === 'ripple' && (
          <RippleLedger
            pledges={pledges}
            projects={projects}
            onTriggerRipplePledge={triggerRipplePledge}
          />
        )}

        {activeTab === 'transparency' && (
          <TransparencyOverview
            projects={projects}
            onOpenPledgeModal={openGeneralPledgeModal}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <Heart className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="text-slate-200 font-bold text-sm font-display">OpenImpact</span>
            <span className="text-slate-500">• Built for the Dev.to International Day of Charity Challenge</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>•</span>
            <span>Ethical Public Ledger</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('transparency')}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Open Audit Charter
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ImpactSimulatorModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
        projects={projects}
        initialProject={selectedProjectForPledge}
        onPledgeCreated={handlePledgeCreated}
        rippleParentPledge={rippleParentPledge}
      />

      <TransparencyAuditModal
        project={selectedProjectForAudit}
        onClose={() => setSelectedProjectForAudit(null)}
        onPledgeDirectly={openPledgeModalForProject}
      />
    </div>
  );
}
