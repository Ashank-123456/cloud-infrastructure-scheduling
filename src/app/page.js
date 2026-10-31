"use client";

import React, { useState, useMemo } from "react";
import FloatingNavbar from "@/components/FloatingNavbar";
import ResourceInputPanel from "@/components/ResourceInputPanel";
import SolutionSummary from "@/components/SolutionSummary";
import DpMatrixVisualizer from "@/components/DpMatrixVisualizer";
import AlgorithmComparison from "@/components/AlgorithmComparison";
import ComplexityCard from "@/components/ComplexityCard";
import BrandFooter from "@/components/BrandFooter";
import { DEFAULT_PRESET, solve01Knapsack } from "@/algorithms/knapsackEngine";

/**
 * @file page.js
 * @description Master page orchestrating Cloud Infrastructure Scheduling via 0/1 Knapsack.
 */
export default function CloudInfrastructureSchedulingPage() {
  const [capacity, setCapacity] = useState(DEFAULT_PRESET.capacity);
  const workloads = DEFAULT_PRESET.workloads;
  const capacityUnit = DEFAULT_PRESET.capacityUnit;
  const valueUnit = DEFAULT_PRESET.valueUnit;

  // Reactive 0/1 Knapsack solution
  const solution = useMemo(() => {
    return solve01Knapsack(workloads, capacity);
  }, [workloads, capacity]);

  const handleReset = () => {
    setCapacity(DEFAULT_PRESET.capacity);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      {/* Floating Navbar */}
      <FloatingNavbar onResetToDefault={handleReset} />

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 flex-1 space-y-14">
        {/* Hero */}
        <section className="text-center pt-8 pb-4 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            DAA Project • Dynamic Programming
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Cloud Infrastructure Scheduling via{" "}
            <span className="text-cyan-400">0/1 Knapsack</span>
          </h1>

          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Mathematically optimal cloud microservice provisioning under capacity constraints using
            bottom-up Dynamic Programming.
          </p>

          <div className="flex items-center justify-center gap-3 pt-3">
            <a
              href="#config"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Jump to Cloud Capacity Configuration"
            >
              Adjust Capacity Limit
            </a>
            <a
              href="#dp-matrix"
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all cursor-pointer active:scale-95"
              title="View Dynamic Programming Matrix"
            >
              Inspect DP Grid
            </a>
          </div>
        </section>

        {/* 01. Resource & Workload Configuration */}
        <ResourceInputPanel
          capacity={capacity}
          setCapacity={setCapacity}
          workloads={workloads}
          capacityUnit={capacityUnit}
          valueUnit={valueUnit}
          presetMeta={DEFAULT_PRESET}
        />

        {/* 02. High-Level Allocation Metrics */}
        <SolutionSummary
          solution={solution}
          capacityUnit={capacityUnit}
          valueUnit={valueUnit}
        />

        {/* 03. Tabulation Matrix Visualizer */}
        <DpMatrixVisualizer
          solution={solution}
          capacityUnit={capacityUnit}
          valueUnit={valueUnit}
        />

        {/* 04. Algorithmic Benchmark */}
        <AlgorithmComparison
          solution={solution}
          capacityUnit={capacityUnit}
          valueUnit={valueUnit}
        />

        {/* 05. Algorithmic Formulation & Complexity */}
        <ComplexityCard solution={solution} />
      </main>

      {/* Footer strictly with only the copyright line */}
      <BrandFooter />
    </div>
  );
}
