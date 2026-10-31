"use client";

import React, { useState } from "react";

/**
 * @file DpMatrixVisualizer.js
 * @description Dynamic Programming Tabulation Table (Matrix) Visualizer.
 * Minimalist grid with interactive cell inspection, state recurrence math display,
 * and visual backtracking highlighting.
 */
export default function DpMatrixVisualizer({ solution, capacityUnit, valueUnit }) {
  const workloads = solution?.workloads || [];
  const capacity = solution?.capacity || 0;
  const n = workloads.length;
  const W = capacity;
  const dpTable = solution?.dpTable || [];
  const decisionPath = solution?.decisionPath || [];
  const optimalValue = solution?.optimalValue || 0;

  // Selected cell for detailed state breakdown
  const [inspectedCell, setInspectedCell] = useState({
    row: n,
    col: W,
  });

  if (!solution) return null;

  // Build a set of coordinates that lie on the optimal decision path
  const pathCoordinates = new Set(
    decisionPath.map((step) => `${step.itemIndex}-${step.weight}`)
  );
  pathCoordinates.add(`${n}-${W}`);

  const currentItem = inspectedCell.row > 0 ? workloads[inspectedCell.row - 1] : null;
  const cellValue = dpTable?.[inspectedCell.row]?.[inspectedCell.col] ?? 0;

  let cellExplanation = "";
  if (inspectedCell.row === 0 || inspectedCell.col === 0) {
    cellExplanation = "Base Case: Zero workloads or zero capacity available results in 0 utility.";
  } else if (currentItem) {
    const wi = currentItem.weight;
    const vi = currentItem.value;
    const excludeVal = dpTable[inspectedCell.row - 1]?.[inspectedCell.col] ?? 0;

    if (wi > inspectedCell.col) {
      cellExplanation = `Item "${currentItem.name}" weight (${wi} ${capacityUnit}) > sub-capacity (${inspectedCell.col}). Inherits state: dp[${inspectedCell.row - 1}][${inspectedCell.col}] = ${excludeVal}.`;
    } else {
      const includeVal = (dpTable[inspectedCell.row - 1]?.[inspectedCell.col - wi] ?? 0) + vi;
      const decision = includeVal > excludeVal ? "INCLUDED" : "EXCLUDED";
      cellExplanation = `max(Exclude: ${excludeVal}, Include: dp[${inspectedCell.row - 1}][${inspectedCell.col - wi}] + ${vi} = ${includeVal}) → ${cellValue} [${decision}]`;
    }
  }

  return (
    <section id="dp-matrix" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xs">03.</span>
            Dynamic Programming Tabulation Grid
          </h2>
          <p className="text-xs text-slate-400">
            Memoized sub-problem matrix dp[i][w] computed in bottom-up order.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded bg-cyan-400" />
            Optimal Path
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded bg-emerald-400" />
            Max: {optimalValue}
          </span>
        </div>
      </div>

      {/* State Inspector */}
      <div className="glass-panel rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-900 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">
              dp[{inspectedCell.row}][{inspectedCell.col}]
            </span>
            <span className="text-slate-400">
              {inspectedCell.row === 0 ? "Base Case" : currentItem?.name}
            </span>
          </div>
          <span className="text-white font-semibold">
            Value = {cellValue} {valueUnit}
          </span>
        </div>
        <p className="text-xs font-mono text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-900">
          {cellExplanation}
        </p>
      </div>

      {/* Table Container */}
      <div className="glass-panel rounded-xl p-4 overflow-hidden">
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-center border-collapse min-w-[620px]" aria-label="DP Grid">
            <thead>
              <tr className="border-b border-slate-900 text-[11px] font-mono text-slate-500">
                <th className="p-2 text-left sticky left-0 bg-slate-950/95 z-20 min-w-[140px] uppercase">
                  Item (i)
                </th>
                <th className="p-2 text-center w-10">w_i</th>
                <th className="p-2 text-center w-10">v_i</th>
                {Array.from({ length: W + 1 }, (_, w) => (
                  <th key={`head-${w}`} className="p-1.5 min-w-[34px] text-slate-400">
                    w={w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs font-mono divide-y divide-slate-900/80">
              {/* Base Case Row 0 */}
              <tr>
                <td className="p-2 text-left text-slate-500 sticky left-0 bg-slate-950/95 z-10">
                  0 (Ø)
                </td>
                <td className="p-2 text-slate-700">-</td>
                <td className="p-2 text-slate-700">-</td>
                {Array.from({ length: W + 1 }, (_, w) => (
                  <td
                    key={`dp-0-${w}`}
                    onClick={() => setInspectedCell({ row: 0, col: w })}
                    className={`p-1.5 transition-colors cursor-pointer ${
                      inspectedCell.row === 0 && inspectedCell.col === w
                        ? "bg-cyan-500/20 text-cyan-300 font-bold"
                        : "text-slate-600 hover:text-white"
                    }`}
                    title={`dp[0][${w}] = 0`}
                  >
                    0
                  </td>
                ))}
              </tr>

              {/* Rows 1 to n */}
              {workloads.map((item, itemIdx) => {
                const i = itemIdx + 1;
                return (
                  <tr key={item.id} className="hover:bg-slate-900/40">
                    <td
                      className="p-2 text-left sticky left-0 bg-slate-950/95 z-10 text-slate-300 truncate max-w-[150px]"
                      title={`${item.name} (w=${item.weight}, v=${item.value})`}
                    >
                      <span className="text-slate-600 mr-1.5">{i}.</span>
                      {item.name}
                    </td>
                    <td className="p-2 text-slate-500">{item.weight}</td>
                    <td className="p-2 text-cyan-400 font-medium">{item.value}</td>

                    {Array.from({ length: W + 1 }, (_, w) => {
                      const val = dpTable[i]?.[w] ?? 0;
                      const isTarget = i === n && w === W;
                      const isPath = pathCoordinates.has(`${i}-${w}`);
                      const isInspected = inspectedCell.row === i && inspectedCell.col === w;

                      let cellClass = "text-slate-400 hover:text-white";
                      if (isTarget) {
                        cellClass = "bg-emerald-500/20 text-emerald-300 font-bold";
                      } else if (isInspected) {
                        cellClass = "bg-cyan-500/25 text-cyan-200 font-bold";
                      } else if (isPath) {
                        cellClass = "bg-cyan-950/40 text-cyan-300 font-medium";
                      }

                      return (
                        <td
                          key={`dp-${i}-${w}`}
                          onClick={() => setInspectedCell({ row: i, col: w })}
                          className={`p-1.5 transition-colors cursor-pointer ${cellClass}`}
                          title={`Click to inspect dp[${i}][${w}] = ${val}`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
