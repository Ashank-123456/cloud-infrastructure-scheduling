"use client";

import React, { useMemo } from "react";
import { solveGreedyBenchmark } from "@/algorithms/knapsackEngine";
import { useIsClient } from "@/lib/useIsClient";

/**
 * @file AlgorithmComparison.js
 * @description Benchmark module comparing the optimal Dynamic Programming 0/1 Knapsack
 * approach against the heuristic Greedy Density approach.
 */
export default function AlgorithmComparison({ solution, valueUnit }) {
  const isClient = useIsClient();

  const greedyResult = useMemo(() => {
    const list = solution?.workloads || [];
    const cap = solution?.capacity || 0;
    return solveGreedyBenchmark(list, cap);
  }, [solution?.workloads, solution?.capacity]);

  if (!solution) return null;

  const optimalValue = solution.optimalValue || 0;
  const executionTimeMs = solution.executionTimeMs || 0;

  const optimalityGap = optimalValue > 0
    ? (((optimalValue - greedyResult.greedyValue) / optimalValue) * 100).toFixed(1)
    : "0.0";

  const isGreedySuboptimal = Number(optimalityGap) > 0;

  return (
    <section id="benchmark" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xs">04.</span>
            Algorithmic Benchmark: DP vs Greedy
          </h2>
          <p className="text-xs text-slate-400">
            Comparing Dynamic Programming global optimum against the Greedy density heuristic.
          </p>
        </div>
        <div>
          {isGreedySuboptimal ? (
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"
              title="Greedy leaves capacity gaps due to non-divisible items"
            >
              Greedy sub-optimal by {optimalityGap}%
            </span>
          ) : (
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              title="Greedy matched DP on this capacity instance"
            >
              Greedy matched DP
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dynamic Programming (Optimal) */}
        <div className="glass-panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <div>
              <span className="text-xs font-semibold text-white block">
                0/1 Dynamic Programming
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                Tabulation Engine
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
              Optimal
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-slate-400">Total Utility:</span>
            <span className="text-xl font-mono font-bold text-white">
              {optimalValue} {valueUnit}
            </span>
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-400 pt-1 border-t border-slate-900">
            <span>Time Complexity: Θ(n·W)</span>
            <span suppressHydrationWarning className="text-emerald-400">
              {isClient ? `${executionTimeMs} ms` : "< 0.1 ms"}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluates sub-problems bottom-up. Guarantees mathematical global optimum without discrete capacity waste.
          </p>
        </div>

        {/* Greedy Heuristic */}
        <div className="glass-panel rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <div>
              <span className="text-xs font-semibold text-white block">
                Greedy Heuristic
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Density Sort (v_i / w_i)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
              Approximation
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-slate-400">Total Utility:</span>
            <span className={`text-xl font-mono font-bold ${isGreedySuboptimal ? "text-amber-400" : "text-white"}`}>
              {greedyResult.greedyValue} {valueUnit}
            </span>
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-400 pt-1 border-t border-slate-900">
            <span>Time Complexity: O(n log n)</span>
            <span suppressHydrationWarning className="text-emerald-400">
              {isClient ? `${greedyResult.executionTimeMs} ms` : "< 0.1 ms"}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Sorts items by value density. Because 0/1 items are indivisible, greedy can strand budget and underperform.
          </p>
        </div>
      </div>
    </section>
  );
}
