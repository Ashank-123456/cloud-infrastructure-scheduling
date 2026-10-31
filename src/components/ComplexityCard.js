"use client";

import React from "react";

/**
 * @file ComplexityCard.js
 * @description In-depth DAA complexity and mathematical formulation card,
 * providing algorithmic proofs, recurrence equations, and cloud infrastructure mapping.
 */
export default function ComplexityCard({ solution }) {
  if (!solution) return null;

  const { complexity, workloads, capacity } = solution;

  const mapping = [
    { knapsack: "Capacity (W)", cloud: "Global Cloud Budget (RAM, vCPUs, Cost)" },
    { knapsack: "Candidate (i)", cloud: "Microservice / Container Node" },
    { knapsack: "Weight (w_i)", cloud: "Workload Footprint (GB Memory / Cores)" },
    { knapsack: "Value (v_i)", cloud: "Workload Utility (SLA Points / Throughput)" },
    { knapsack: "Decision (x_i)", cloud: "Deploy Instance (1) or Exclude (0)" },
  ];

  return (
    <section id="analysis" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xs">05.</span>
            DAA Algorithmic Formulation &amp; Complexity
          </h2>
          <p className="text-xs text-slate-400">
            Bellman&apos;s recurrence equation and asymptotic boundaries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recurrence Equation */}
        <div className="glass-panel rounded-xl p-5 md:col-span-2 space-y-3">
          <span className="text-xs font-semibold text-white uppercase tracking-wider block">
            State Transition Recurrence
          </span>

          <div className="p-3.5 rounded bg-slate-950 font-mono text-xs text-slate-300 space-y-1.5 border border-slate-900">
            <div className="text-slate-500">{"// Bellman's Principle of Optimality:"}</div>
            <div className="text-emerald-400">
              dp[i][w] = (w_i &gt; w) ? dp[i-1][w] : max( dp[i-1][w], dp[i-1][w - w_i] + v_i )
            </div>
            <div className="text-slate-500 pt-1">
              Base: dp[0][w] = 0 (no items), dp[i][0] = 0 (no capacity)
            </div>
          </div>

          {/* Mapping Table */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              0/1 Knapsack to Cloud Architecture Mapping
            </span>
            <div className="divide-y divide-slate-900 text-xs font-mono">
              {mapping.map((row) => (
                <div key={row.knapsack} className="py-2 flex items-center justify-between">
                  <span className="text-cyan-400">{row.knapsack}</span>
                  <span className="text-slate-300">{row.cloud}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complexity Summary */}
        <div className="glass-panel rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Complexity Analysis
            </span>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded bg-slate-950 border border-slate-900">
                <span className="text-slate-500 block mb-1">Time Complexity</span>
                <span className="text-white font-bold text-sm">{complexity.time}</span>
                <span className="text-slate-500 block text-[11px] mt-1">
                  {workloads.length} items × {capacity} units
                </span>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-900">
                <span className="text-slate-500 block mb-1">Space Complexity</span>
                <span className="text-white font-bold text-sm">{complexity.space}</span>
                <span className="text-slate-500 block text-[11px] mt-1">
                  Auxiliary 2D matrix storage
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-900">
            Pseudo-polynomial time complexity ensures exact optimality.
          </div>
        </div>
      </div>
    </section>
  );
}
