import React, { useMemo } from 'react';
import { CauseProject } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Calculator, Sparkles, Layers, Info } from 'lucide-react';

interface ImpactCalculatorProps {
  project: CauseProject;
  amount: number;
  pledgeType: 'funds' | 'hours';
}

interface UnitImpactData {
  name: string;
  shortName: string;
  badge: string;
  units: number;
  costOrHoursPerUnit: number;
  description: string;
  tangibleMultiplierDesc: string;
  color: string;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({
  project,
  amount,
  pledgeType,
}) => {
  // Color palette for chart bars
  const barColors = ['#10b981', '#06b6d4', '#6366f1', '#f59e0b', '#ec4899'];

  // Calculate conversions based on project's impactUnits
  const chartData: UnitImpactData[] = useMemo(() => {
    if (!project || !project.impactUnits || project.impactUnits.length === 0) {
      return [];
    }

    return project.impactUnits.map((unit, index) => {
      const divisor =
        pledgeType === 'funds'
          ? unit.costPerUnit
          : unit.hoursPerUnit || 1;

      const rawCount = amount / (divisor > 0 ? divisor : 1);
      const units = Number(rawCount.toFixed(1));

      // Build meaningful tangible context
      let tangibleMultiplierDesc = '';
      if (pledgeType === 'funds') {
        tangibleMultiplierDesc = `${units} × ${unit.unitName} ($${unit.costPerUnit}/each)`;
      } else {
        tangibleMultiplierDesc = `${units} × ${unit.unitName} (${unit.hoursPerUnit || 1} hr/each)`;
      }

      return {
        name: unit.unitName,
        shortName:
          unit.unitName.length > 18
            ? unit.unitName.slice(0, 16) + '...'
            : unit.unitName,
        badge: unit.badge,
        units,
        costOrHoursPerUnit: divisor,
        description: unit.unitDescription,
        tangibleMultiplierDesc,
        color: barColors[index % barColors.length],
      };
    });
  }, [project, amount, pledgeType]);

  // Derived contextual real-world equivalents (e.g. meals, books, study nights)
  const additionalEquivalents = useMemo(() => {
    if (pledgeType === 'funds') {
      if (project.category === 'Climate & poverty') {
        return {
          metric1: `${Math.round(amount * 0.4)} kg CO2 emissions offset`,
          metric2: `${Math.round(amount * 2.2)} nights of clean study light`,
        };
      }
      if (project.category === 'Equity & inclusion') {
        return {
          metric1: `${Math.round(amount * 2.5)} lbs of organic food rescued`,
          metric2: `${Math.round(amount * 0.35)} family meals delivered`,
        };
      }
      if (project.category === 'Youth leadership') {
        return {
          metric1: `${Math.round(amount * 0.8)} hours of curriculum access`,
          metric2: `${Math.round(amount / 25)} full student workshop seats`,
        };
      }
      return {
        metric1: `${Math.round(amount * 1.5)} direct community beneficiaries reached`,
        metric2: `100% of pledge deployed to direct verified materials`,
      };
    } else {
      // Hours equivalents
      return {
        metric1: `Saves project ~$${amount * 32} in commercial operational labor`,
        metric2: `Equivalent to ${amount * 2} direct coaching or supply distribution interactions`,
      };
    }
  }, [project, amount, pledgeType]);

  // Custom tooltip for the recharts bar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: UnitImpactData = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700 max-w-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
            <span>{data.badge}</span>
            <span>{data.name}</span>
          </div>
          <div className="text-sm font-extrabold text-white mb-1">
            Yields: {data.units} {data.name}s
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed mb-1.5">
            {data.description}
          </p>
          <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400">
            Formula: {pledgeType === 'funds' ? `$${amount}` : `${amount} hrs`} ÷{' '}
            {pledgeType === 'funds'
              ? `$${data.costOrHoursPerUnit}/unit`
              : `${data.costOrHoursPerUnit} hr/unit`}{' '}
            ={' '}
            <span className="text-emerald-300 font-semibold">{data.units} units</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span>Impact Calculator & Visual Breakdown</span>
              <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-sm">
                LIVE
              </span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Visualizing how your{' '}
              <strong className="text-slate-700">
                {pledgeType === 'funds' ? `$${amount}` : `${amount} hours`}
              </strong>{' '}
              converts into real-world units
            </p>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs">
        <div className="text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
          <span>Direct Unit Yields ({pledgeType === 'funds' ? 'per $' : 'per hr'})</span>
          <span className="text-[10px] text-slate-400 font-normal">
            Hover or tap bars for detail
          </span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#64748b' }}
                domain={[0, 'auto']}
              />
              <YAxis
                type="category"
                dataKey="shortName"
                tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="units" radius={[0, 8, 8, 0]} maxBarSize={28}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Real-World Units Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
        {chartData.map((unit, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex items-start justify-between gap-2"
          >
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {unit.badge}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {unit.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-extrabold text-emerald-700">
                {unit.units}
              </div>
              <div className="text-[10px] font-medium text-slate-400">
                {pledgeType === 'funds' ? `@ $${unit.costOrHoursPerUnit}` : `@ ${unit.costOrHoursPerUnit}h`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tangible Equivalent Insights */}
      <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1 text-slate-600 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>{additionalEquivalents.metric1}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-600 text-[11px]">
          <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span>{additionalEquivalents.metric2}</span>
        </div>
      </div>
    </div>
  );
};
