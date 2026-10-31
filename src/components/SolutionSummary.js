"use client";

import React from "react";
import { useIsClient } from "@/lib/useIsClient";

/**
 * @file SolutionSummary.js
 * @description Minimalist display of optimal 0/1 knapsack provisioning results and workload statuses.
 */
export default function SolutionSummary({ solution, capacityUnit, valueUnit }) {
  const isClient = useIsClient();

  if (!solution) return null;

  const {
    optimalValue,
    allocatedCost,
    remainingCapacity,
    capacityUtilizationPercent,
    selectedWorkloads,
    selectedIds,
    workloads,
    capacity,
    executionTimeMs,
  } = solution;

  const displayTime = isClient ? `${executionTimeMs} ms` : "< 0.1 ms";

  const metrics = [
    {
      label: "Optimal Utility",
      value: optimalValue,
      unit: valueUnit,
      sub: "Global Maximum",
      color: "text-cyan-400",
      titleTooltip: "Total maximized utility points under capacity constraint",
    },
    {
      label: "Resource Allocation",
      value: `${allocatedCost} / ${capacity}`,
      unit: capacityUnit,
      sub: `${capacityUtilizationPercent}% utilized (${remainingCapacity} free)`,
      color: "text-emerald-400",
      titleTooltip: "Total resource budget consumed",
    },
    {
      label: "Deployed Services",
      value: `${selectedWorkloads.length} / ${workloads.length}`,
      unit: "Active Instances",
      sub: "Discrete 0/1 selection",
      color: "text-white",
      titleTooltip: "Number of candidate workloads provisioned",
    },
    {
      label: "Computation Speed",
      value: displayTime,
      unit: "DP Matrix Latency",
      sub: "Dynamic Programming",
      color: "text-slate-300",
      titleTooltip: "Tabulation wall-clock solve time",
    },
  ];

  return (
    <section id="metrics" className="scroll-mt-24 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xs">02.</span>
            Optimal Provisioning Decision
          </h2>
          <p className="text-xs text-slate-400">
            Resolved via bottom-up dynamic programming state transitions.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="glass-panel rounded-xl p-4 space-y-1"
            title={m.titleTooltip}
          >
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
              {m.label}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span
                suppressHydrationWarning
                className={`text-2xl font-mono font-bold ${m.color}`}
              >
                {m.value}
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-400">{m.unit}</div>
            <div className="text-[10px] text-slate-500 font-mono">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Provisioned vs Skipped Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Allocated (x_i = 1) */}
        <div className="glass-panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Provisioned Services (x_i = 1)
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {selectedWorkloads.length} Deployed
            </span>
          </div>

          <div className="divide-y divide-slate-900">
            {selectedWorkloads.map((item) => (
              <div
                key={item.id}
                className="py-2.5 flex items-center justify-between text-xs"
                title={`Allocated: ${item.name} uses ${item.weight} ${capacityUnit} for ${item.value} ${valueUnit}`}
              >
                <div>
                  <span className="font-medium text-slate-200">{item.name}</span>
                  <span className="ml-2 text-[10px] font-mono text-slate-500">
                    {item.weight} {capacityUnit}
                  </span>
                </div>
                <span className="font-mono text-emerald-400 font-medium">
                  +{item.value} {valueUnit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skipped (x_i = 0) */}
        <div className="glass-panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Unallocated Candidates (x_i = 0)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
              {workloads.length - selectedWorkloads.length} Skipped
            </span>
          </div>

          <div className="divide-y divide-slate-900">
            {workloads
              .filter((item) => !selectedIds.has(item.id))
              .map((item) => (
                <div
                  key={item.id}
                  className="py-2.5 flex items-center justify-between text-xs text-slate-500"
                  title={`Skipped: Including ${item.name} exceeds remaining budget or yields lower overall utility`}
                >
                  <div>
                    <span className="text-slate-400">{item.name}</span>
                    <span className="ml-2 text-[10px] font-mono text-slate-600">
                      requires {item.weight} {capacityUnit}
                    </span>
                  </div>
                  <span className="font-mono text-slate-600">
                    +{item.value} {valueUnit}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
