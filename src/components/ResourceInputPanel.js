"use client";

import React from "react";

/**
 * @file ResourceInputPanel.js
 * @description Minimalist configuration panel for adjusting cloud capacity limit
 * and inspecting candidate microservice workloads.
 */
export default function ResourceInputPanel({
  capacity,
  setCapacity,
  workloads,
  capacityUnit,
  valueUnit,
  presetMeta,
}) {
  return (
    <section id="config" className="scroll-mt-24 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xs">01.</span>
            Cloud Capacity &amp; Workloads
          </h2>
          <p className="text-xs text-slate-400">
            {presetMeta?.name} — {presetMeta?.description}
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Candidate items: <span className="text-white font-semibold">{workloads.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Capacity Limit Card */}
        <div className="glass-panel rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Capacity Limit (W)
              </span>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                Constraint
              </span>
            </div>

            <div className="my-5 text-center">
              <span className="text-4xl font-mono font-bold text-white tracking-tight">
                {capacity}
              </span>
              <span className="ml-2 text-xs font-mono text-slate-400">
                {capacityUnit}
              </span>
            </div>

            <label htmlFor="capacity-range" className="sr-only">
              Cloud capacity constraint
            </label>
            <input
              id="capacity-range"
              type="range"
              min="1"
              max="30"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
              title={`Drag to adjust capacity constraint (1 to 30 ${capacityUnit})`}
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
              <span>1 {capacityUnit}</span>
              <span>15 {capacityUnit}</span>
              <span>30 {capacityUnit}</span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between">
            <span className="text-xs text-slate-400">Exact capacity:</span>
            <input
              type="number"
              min="1"
              max="50"
              value={capacity}
              onChange={(e) => setCapacity(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              className="w-16 px-2 py-1 text-center text-xs font-mono bg-slate-900 border border-slate-800 rounded text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              title="Enter numerical capacity limit"
            />
          </div>
        </div>

        {/* Candidate Workload Table */}
        <div className="glass-panel rounded-xl p-5 md:col-span-2 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Workload Candidates
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Binary choice: x_i ∈ &#123;0, 1&#125;
            </span>
          </div>

          <div className="divide-y divide-slate-900">
            {workloads.map((item, idx) => {
              const density = item.weight > 0 ? (item.value / item.weight).toFixed(2) : "0.00";
              return (
                <div
                  key={item.id}
                  className="py-2.5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-slate-600 text-[11px] w-4">
                      {idx + 1}.
                    </span>
                    <div>
                      <span className="font-medium text-slate-200">{item.name}</span>
                      <span className="ml-2 text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-[11px]">
                    <span className="text-slate-400" title="Workload Resource Cost">
                      {item.weight} {capacityUnit}
                    </span>
                    <span className="text-cyan-400 font-semibold" title="Delivered Business Utility">
                      {item.value} {valueUnit}
                    </span>
                    <span
                      className="text-slate-500 bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800"
                      title="Value-to-Cost Ratio"
                    >
                      {density} v/w
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
