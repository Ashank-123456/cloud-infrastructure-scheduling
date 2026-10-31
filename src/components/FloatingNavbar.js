"use client";

import React from "react";

/**
 * @file FloatingNavbar.js
 * @description Minimalist floating navigation bar with brand logo, section anchors, and reset action.
 */
export default function FloatingNavbar({ onResetToDefault }) {
  const navItems = [
    { label: "Configuration", href: "#config", title: "View Capacity Constraint & Workload Candidates" },
    { label: "Allocation", href: "#metrics", title: "View 0/1 Knapsack Optimal Allocation" },
    { label: "DP Matrix", href: "#dp-matrix", title: "Inspect Dynamic Programming Tabulation Grid" },
    { label: "Benchmark", href: "#benchmark", title: "Compare DP vs Greedy Heuristic" },
    { label: "Analysis", href: "#analysis", title: "View DAA Algorithmic Complexity" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      <nav
        className="glass-panel rounded-xl px-4 py-2.5 sm:px-5 sm:py-2.5 shadow-xl flex items-center justify-between"
        aria-label="Navigation"
      >
        {/* Brand Logo & Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          title="Cloud Infrastructure Scheduling • 0/1 Knapsack Engine"
        >
          <div
            className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors"
            title="Cloud Infrastructure Scheduling Logo"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="8" x="2" y="2" rx="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" />
              <line x1="6" x2="6.01" y1="6" y2="6" />
              <line x1="6" x2="6.01" y1="18" y2="18" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Cloud Infrastructure Scheduling
            </span>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              0/1 Knapsack Engine
            </span>
          </div>
        </a>

        {/* Section Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-400">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              title={item.title}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <span
            className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
            title="Optimal DP Engine Active"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Θ(n·W)
          </span>

          <button
            type="button"
            onClick={onResetToDefault}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer active:scale-95"
            title="Reset to default capacity (16 GB)"
          >
            Reset
          </button>
        </div>
      </nav>
    </header>
  );
}
