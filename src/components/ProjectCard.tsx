import React from 'react';
import { CauseProject } from '../types';
import { ShieldCheck, MapPin, Sparkles, Heart, ArrowUpRight, DollarSign, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: CauseProject;
  onSimulateAndPledge: (project: CauseProject) => void;
  onViewAudit: (project: CauseProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSimulateAndPledge,
  onViewAudit,
}) => {
  const percentFunded = Math.min(100, Math.round((project.currentAmount / project.targetAmount) * 100));
  const percentHours = Math.min(100, Math.round((project.currentHours / project.targetHours) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner with Category & Verification */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {project.category}
          </span>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{project.transparencyScore}% Open Audit</span>
          </div>
        </div>

        <h3 className="font-extrabold text-lg sm:text-xl font-display text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
          {project.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{project.location}</span>
          <span className="text-slate-300">•</span>
          <span>{project.organization}</span>
        </div>

        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Concrete Micro-Impact Units Badges */}
      <div className="px-5 py-2.5 bg-slate-50/70 border-y border-slate-100 flex flex-wrap gap-1.5">
        {project.impactUnits.map((unit, idx) => (
          <span
            key={idx}
            className="text-[11px] font-medium bg-white text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
          >
            {unit.badge} (${unit.costPerUnit})
          </span>
        ))}
      </div>

      {/* Progress & Actions */}
      <div className="p-5 pt-4 space-y-4">
        {/* Funds progress */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Funds Raised</span>
            </span>
            <span className="font-bold text-slate-900">
              ${project.currentAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}{' '}
              <span className="text-emerald-600 font-semibold">({percentFunded}%)</span>
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${percentFunded}%` }}
            ></div>
          </div>
        </div>

        {/* Volunteer Hours progress */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Volunteer Hours</span>
            </span>
            <span className="font-bold text-slate-900">
              {project.currentHours} / {project.targetHours} hrs{' '}
              <span className="text-indigo-600 font-semibold">({percentHours}%)</span>
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${percentHours}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSimulateAndPledge(project)}
            className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate & Pledge</span>
          </button>

          <button
            onClick={() => onViewAudit(project)}
            className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <span>Open Receipts</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
