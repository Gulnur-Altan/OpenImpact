import React, { useState } from 'react';
import { CauseProject, Pledge } from '../types';
import { X, Heart, Sparkles, Clock, DollarSign, CheckCircle2, Share2, ArrowRight, BarChart3, Calculator } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ImpactCalculator } from './ImpactCalculator';

interface ImpactSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: CauseProject[];
  initialProject?: CauseProject | null;
  onPledgeCreated: (pledge: Pledge) => void;
  rippleParentPledge?: Pledge | null;
}

export const ImpactSimulatorModal: React.FC<ImpactSimulatorModalProps> = ({
  isOpen,
  onClose,
  projects,
  initialProject,
  onPledgeCreated,
  rippleParentPledge,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProject?.id || projects[0]?.id || ''
  );
  const [pledgeType, setPledgeType] = useState<'funds' | 'hours'>('funds');
  const [amount, setAmount] = useState<number>(36);
  const [pledgerName, setPledgerName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSimulatingAi, setIsSimulatingAi] = useState<boolean>(false);
  const [aiSimulation, setAiSimulation] = useState<{
    headline?: string;
    tangibleOutcomes?: string[];
    rippleEffectNote?: string;
  } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [latestPledge, setLatestPledge] = useState<Pledge | null>(null);
  const [showChartCalculator, setShowChartCalculator] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Calculate tangible micro-impact based on project unit ratios
  const primaryUnit = currentProject?.impactUnits[0];
  const unitCount = primaryUnit
    ? pledgeType === 'funds'
      ? Math.max(1, Math.floor(amount / primaryUnit.costPerUnit))
      : Math.max(1, Math.floor(amount / (primaryUnit.hoursPerUnit || 1)))
    : 1;

  const handleSimulateAi = async () => {
    setIsSimulatingAi(true);
    try {
      const res = await fetch('/api/simulate-impact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          causeTitle: currentProject?.title,
          amount,
          type: pledgeType,
        }),
      });
      const data = await res.json();
      setAiSimulation(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulatingAi(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgerName.trim()) return;

    const unitDesc = primaryUnit ? `${unitCount} × ${primaryUnit.unitName}` : `${amount} units of impact`;

    const newPledge: Pledge = {
      id: `pledge-${Date.now()}`,
      projectId: currentProject.id,
      projectTitle: currentProject.title,
      pledgerName: pledgerName.trim(),
      type: pledgeType,
      amount,
      impactAchieved: unitDesc,
      message: message.trim() || undefined,
      timestamp: 'Just now',
      parentId: rippleParentPledge ? rippleParentPledge.id : undefined,
      rippleCount: 0,
      badge: pledgeType === 'funds' ? '💖 Community Giver' : '⏱️ Dedicated Volunteer',
    };

    onPledgeCreated(newPledge);
    setLatestPledge(newPledge);
    setIsSubmitted(true);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#6366f1', '#f59e0b'],
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setLatestPledge(null);
    setAiSimulation(null);
    setPledgerName('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 relative transition-all max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted && latestPledge ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
              Thank You for Your Generosity!
            </h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Your pledge has been permanently recorded to the{' '}
              <span className="font-semibold text-slate-800">OpenImpact Generosity Ledger</span>.
              Here is your verified micro-impact breakdown:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-left max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Cause
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {latestPledge.projectTitle}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Pledge
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {latestPledge.type === 'funds' ? `$${latestPledge.amount}` : `${latestPledge.amount} Hours`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tangible Outcome
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {latestPledge.impactAchieved}
                </span>
              </div>
            </div>

            {rippleParentPledge && (
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-sky-800 text-xs mb-6 max-w-md mx-auto">
                ⚡ <strong>Ripple Connected:</strong> You were inspired by{' '}
                <span className="font-semibold">{rippleParentPledge.pledgerName}</span>! This kindness chain now has a 2.0x multiplier.
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `I just pledged to ${latestPledge.projectTitle} on OpenImpact for International Day of Charity! Join the generosity ripple.`
                  );
                  alert('Kindness ripple link copied to clipboard!');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Ripple Link</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Micro-Impact Simulator</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Pledge in the Spirit of Generosity
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                See exactly where every dollar or volunteer hour goes before you give.
              </p>
            </div>

            {rippleParentPledge && (
              <div className="mb-4 bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center gap-2 text-sky-900 text-xs">
                <Heart className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  Continuing the ripple sparked by <strong>{rippleParentPledge.pledgerName}</strong> (
                  {rippleParentPledge.impactAchieved}).
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Select Project */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Select Grassroots Initiative
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    setSelectedProjectId(e.target.value);
                    setAiSimulation(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.title} ({proj.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Giving Type Toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Way to Give
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPledgeType('funds');
                      setAmount(36);
                      setAiSimulation(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                      pledgeType === 'funds'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Micro-Funds Donation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPledgeType('hours');
                      setAmount(3);
                      setAiSimulation(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                      pledgeType === 'hours'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-800 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Volunteer Time & Skills</span>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {pledgeType === 'funds' ? 'Pledge Amount (USD)' : 'Committed Volunteer Hours'}
                  </span>
                  <span className="text-base font-extrabold text-slate-900">
                    {pledgeType === 'funds' ? `$${amount}` : `${amount} Hours`}
                  </span>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(pledgeType === 'funds' ? [18, 36, 54, 90, 150] : [1, 2, 4, 6, 10]).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setAiSimulation(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        amount === val
                          ? pledgeType === 'funds'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {pledgeType === 'funds' ? `$${val}` : `${val} hrs`}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={pledgeType === 'funds' ? 10 : 1}
                  max={pledgeType === 'funds' ? 250 : 20}
                  step={pledgeType === 'funds' ? 2 : 1}
                  value={amount}
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    setAiSimulation(null);
                  }}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* View Switcher for Impact Calculator */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setShowChartCalculator(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      showChartCalculator
                        ? 'bg-white text-emerald-800 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Visual Bar Chart Calculator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowChartCalculator(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      !showChartCalculator
                        ? 'bg-white text-slate-800 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 text-slate-500" />
                    <span>Quick Summary Box</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateAi}
                  disabled={isSimulatingAi}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-white text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-xl shadow-xs hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
                  <span>{isSimulatingAi ? 'Simulating...' : 'AI Story Analysis'}</span>
                </button>
              </div>

              {/* Visual Impact Calculator (Bar Chart Breakdown) */}
              {showChartCalculator ? (
                <ImpactCalculator
                  project={currentProject}
                  amount={amount}
                  pledgeType={pledgeType}
                />
              ) : (
                /* Compact Tangible Outcome Box */
                <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-200/80 rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                        <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        <span>Direct Concrete Outcome</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 mt-1">
                        {unitCount} × {primaryUnit?.unitName || 'Community Units'}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {primaryUnit?.unitDescription || 'Directly supplies verified community resources.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Simulation Insight Banner (if generated) */}
              {aiSimulation && (
                <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 text-xs text-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>AI Tangible Impact Breakdown: {aiSimulation.headline}</span>
                  </div>
                  {aiSimulation.tangibleOutcomes?.map((outcome, i) => (
                    <p key={i} className="flex items-start gap-1.5 text-slate-700">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{outcome}</span>
                    </p>
                  ))}
                  {aiSimulation.rippleEffectNote && (
                    <p className="text-[11px] text-teal-800 italic mt-1 font-medium">
                      🌊 {aiSimulation.rippleEffectNote}
                    </p>
                  )}
                </div>
              )}

              {/* Name & Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Your Name / Handle *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={pledgerName}
                    onChange={(e) => setPledgerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Message / Kindness Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. In honor of community health!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <span>Confirm Pledge & Spark Ripple</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  No payment processor redirect required for this demo. Recorded instantly to the OpenImpact public ledger.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
