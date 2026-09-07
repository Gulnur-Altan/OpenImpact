import React, { useState } from 'react';
import { CauseProject, GeneratedDispatch } from '../types';
import { Sparkles, FileText, CheckCircle, Copy, Share2, ArrowRight, ShieldCheck, Quote, AlertCircle, RefreshCw } from 'lucide-react';

interface FieldStorytellerProps {
  projects: CauseProject[];
}

interface PresetScenario {
  label: string;
  projectIndex: number;
  rawNotes: string;
  receiptsSummary: string;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    label: '🏮 Solar Lamps: Batch #3 Field Delivery',
    projectIndex: 0,
    rawNotes: 'Batch #3 assembly completed today. 84 solar study lamps assembled and calibrated by 6 vocational apprentices. Delivered directly to Kpandu Primary School. Headmaster Mr. Osei tested the lanterns with 4th graders. Pupils no longer breathe hazardous kerosene smoke during evening study. Zero units failed quality test.',
    receiptsSummary: 'Tier-1 Solar LED Kits (84 units): $420.00 | Local apprentice assembly stipends: $85.00 | Cargo bicycle delivery transport: $45.00',
  },
  {
    label: '🥦 Cold Pantry: 480 lbs Wholesale Produce Rescue',
    projectIndex: 1,
    rawNotes: 'Morning grocery rescue run to wholesale terminal. Salvaged 480 lbs of fresh broccoli, sweet potatoes, apples, and artisan loaves that were destined for landfill due to minor cosmetic blemishes. All 4 community fridges on 47th & 51st fully stocked by 11:30 AM. Met Mrs. Washington who distributed boxes to 6 elderly neighbors.',
    receiptsSummary: 'Volunteer vehicle fuel reimbursement (2 vans): $38.50 | Food-grade sanitizing spray & compostable bags: $24.00 | Temperature sensor battery replacement: $12.00',
  },
  {
    label: '💻 Refugee Tech: Student Web Portfolios Graduation',
    projectIndex: 2,
    rawNotes: 'Cohort 1 demo day. 8 relocated teen students presented live web applications built on refurbished Raspberry Pi 4 terminals. Farhad (age 16) built an offline phrasebook for newcomer families. Chloe and Tariq mentored through the final debugging session. Parents attended with traditional sweet tea.',
    receiptsSummary: 'Refurbished micro-HDMI & power cables (8 kits): $72.00 | Monthly Wi-Fi hotspot vouchers (4 families): $120.00 | Demo day celebration pizzas & juices: $45.00',
  },
  {
    label: '💧 Flood Relief: 35 Gravity Filters at Rio San Juan',
    projectIndex: 3,
    rawNotes: 'Urgent deployment after overnight flash floods contaminated 3 community shallow wells. Team navigated motorized canoe to reach 2 isolated hamlets. 35 dual-bucket gravity filtration units installed at communal gathering areas. Turbidity dropped from hazardous brown to crystal clear in 15 minutes. 140 families have safe drinking water.',
    receiptsSummary: '0.1-Micron Hollow Fiber Filter Cartridges (35 units): $770.00 | Food-grade 20L nesting buckets (70 units): $210.00 | Riverboat outboard motor fuel: $65.00',
  },
];

export const FieldStoryteller: React.FC<FieldStorytellerProps> = ({ projects }) => {
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>(projects[0]?.title || '');
  const [selectedOrg, setSelectedOrg] = useState<string>(projects[0]?.organization || '');
  const [rawNotes, setRawNotes] = useState<string>(PRESET_SCENARIOS[0].rawNotes);
  const [receiptsSummary, setReceiptsSummary] = useState<string>(PRESET_SCENARIOS[0].receiptsSummary);
  const [tone, setTone] = useState<string>('Transparent, human, and audit-clear (no corporate fluff)');
  const [targetAudience, setTargetAudience] = useState<string>('Dev.to Community & Grassroots Supporters');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dispatch, setDispatch] = useState<GeneratedDispatch | null>(null);
  const [copiedDevTo, setCopiedDevTo] = useState<boolean>(false);
  const [copiedSocial, setCopiedSocial] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const applyPreset = (preset: PresetScenario) => {
    const proj = projects[preset.projectIndex] || projects[0];
    setSelectedProjectTitle(proj.title);
    setSelectedOrg(proj.organization);
    setRawNotes(preset.rawNotes);
    setReceiptsSummary(preset.receiptsSummary);
    setDispatch(null);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawNotes.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: selectedProjectTitle,
          organization: selectedOrg,
          rawNotes,
          receiptsSummary,
          targetAudience,
          tone,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate dispatch');
      }

      const data: GeneratedDispatch = await res.json();
      setDispatch(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error communicating with AI storyteller');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyDevTo = () => {
    if (!dispatch) return;
    navigator.clipboard?.writeText(dispatch.markdownForDevTo);
    setCopiedDevTo(true);
    setTimeout(() => setCopiedDevTo(false), 2500);
  };

  const handleCopySocial = () => {
    if (!dispatch) return;
    navigator.clipboard?.writeText(dispatch.socialShareSnippet);
    setCopiedSocial(true);
    setTimeout(() => setCopiedSocial(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>AI Transparency Engine for Small Nonprofits</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Field-to-Donor Impact Storyteller
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Small charities lose dozens of hours trying to write updates with zero communications staff. 
            Paste your raw field notes or receipts, and let Gemini generate an authentic, audit-ready impact dispatch 
            tailored for the <strong>Dev.to International Day of Charity</strong> community.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Field Input */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Input Field Evidence & Notes</span>
            </h2>

            {/* Presets */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Quick Real-World Field Scenarios:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {PRESET_SCENARIOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="text-left text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-indigo-50/70 hover:border-indigo-300 text-slate-700 transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={selectedProjectTitle}
                  onChange={(e) => setSelectedProjectTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3.5 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Raw Field Observations & Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  value={rawNotes}
                  onChange={(e) => setRawNotes(e.target.value)}
                  placeholder="What happened today? Who was helped? What did you build or distribute?"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Receipts, Invoices & Cost Items
                </label>
                <textarea
                  rows={2}
                  value={receiptsSummary}
                  onChange={(e) => setReceiptsSummary(e.target.value)}
                  placeholder="e.g. Hardware kits: $420 | Local courier: $45"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs"
                  >
                    <option value="Transparent, human, and audit-clear (no corporate fluff)">
                      Transparent & Humble
                    </option>
                    <option value="Urgent frontline reporting">Urgent Frontline</option>
                    <option value="Celebratory community milestone">Celebratory Milestone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Audience
                  </label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs"
                  >
                    <option value="Dev.to Community & Tech Supporters">Dev.to Community</option>
                    <option value="Local Neighborhood Donors">Local Donors</option>
                    <option value="Grant Auditors & Foundations">Grant Auditors</option>
                  </select>
                </div>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Notes with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Transparent Dispatch</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Output: The Generated Dispatch */}
        <div className="lg:col-span-7">
          {dispatch ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Audited Dispatch</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    Generated via Gemini 3.8 Flash
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyDevTo}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedDevTo ? 'Copied Markdown!' : 'Copy for Dev.to'}</span>
                  </button>

                  <button
                    onClick={handleCopySocial}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedSocial ? 'Copied!' : 'Share Snippet'}</span>
                  </button>
                </div>
              </div>

              {/* Headline & Overview */}
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 leading-snug">
                  {dispatch.headline}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                  {dispatch.overview}
                </p>
              </div>

              {/* Key Outcomes */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Verified Real-World Outcomes
                </h4>
                <div className="space-y-2.5">
                  {dispatch.keyOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-800">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Field Quote */}
              {dispatch.fieldQuote && (
                <div className="border-l-4 border-indigo-500 pl-4 py-1.5 bg-indigo-50/40 rounded-r-xl">
                  <div className="flex items-start gap-2">
                    <Quote className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <p className="text-slate-800 italic text-sm leading-relaxed">
                        "{dispatch.fieldQuote.quote}"
                      </p>
                      <p className="text-xs font-semibold text-indigo-900 mt-1">
                        — {dispatch.fieldQuote.speaker}{' '}
                        <span className="text-slate-500 font-normal">
                          ({dispatch.fieldQuote.context})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transparent Accounting Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Transparent Cost & Ledger Accounting
                </h4>
                <div className="overflow-hidden border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Resource / Item</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {dispatch.transparentAccounting.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-medium">{item.item}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{item.cost}</td>
                          <td className="py-2.5 px-3 text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>{item.proofStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Next Milestone */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-900 uppercase">Immediate Next Goal:</span>
                  <span className="text-emerald-800">{dispatch.nextMilestone}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>

              {/* Dev.to Markdown Preview */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Ready-to-Publish Markdown (Dev.to / Substack)
                  </span>
                  <button
                    onClick={handleCopyDevTo}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    {copiedDevTo ? 'Copied!' : 'Copy Markdown'}
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-48 leading-relaxed whitespace-pre-wrap">
                  {dispatch.markdownForDevTo}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-white/40">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-1">
                Your Field Dispatch Will Appear Here
              </h3>
              <p className="text-xs max-w-sm text-slate-500">
                Pick a real-world scenario on the left or type your own grassroots notes, then click "Generate Transparent Dispatch".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
