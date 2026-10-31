/**
 * @file knapsackEngine.js
 * @description Core algorithmic engine implementing the 0/1 Knapsack Dynamic Programming
 * algorithm for Cloud Infrastructure Resource Allocation.
 *
 * Problem Formulation:
 * Maximize: \sum_{i=1}^n v_i * x_i
 * Subject to: \sum_{i=1}^n w_i * x_i <= W, where x_i \in {0, 1}
 *
 * Asymptotic Complexity:
 * - Time Complexity: Θ(n * W)
 * - Space Complexity: Θ(n * W) for complete DP tabulation & backtracking
 */

/**
 * Single clean production cloud infrastructure preset.
 */
export const DEFAULT_PRESET = {
  name: "Cloud Microservices Cluster",
  description: "Standard production cluster optimizing request throughput per GB RAM.",
  capacity: 16,
  capacityUnit: "GB RAM",
  valueUnit: "SLA Points",
  workloads: [
    { id: "wl-1", name: "Auth & IAM Gateway", weight: 2, value: 35, category: "Security" },
    { id: "wl-2", name: "Payment Processing API", weight: 5, value: 70, category: "Core API" },
    { id: "wl-3", name: "Distributed Cache Node", weight: 4, value: 50, category: "Database" },
    { id: "wl-4", name: "AI Inference Engine", weight: 7, value: 90, category: "Intelligence" },
    { id: "wl-5", name: "Full-Text Search Worker", weight: 3, value: 40, category: "Search" },
    { id: "wl-6", name: "Async Event Pipeline", weight: 6, value: 65, category: "Messaging" },
  ],
};

/**
 * Solves the 0/1 Knapsack problem using Dynamic Programming Tabulation.
 *
 * @param {Array<{id: string, name: string, weight: number, value: number, category?: string}>} workloads
 * @param {number} capacity - Cloud resource limit W
 * @returns {Object} Solution payload containing optimal value, selected workloads, DP table, and metrics
 */
export function solve01Knapsack(workloads, capacity) {
  const startTime = performance.now();

  const sanitizedCapacity = Math.max(0, Math.floor(Number(capacity) || 0));
  const validWorkloads = (workloads || [])
    .filter((w) => w && Number(w.weight) > 0 && Number(w.value) >= 0)
    .map((w, idx) => ({
      ...w,
      weight: Math.floor(Number(w.weight)),
      value: Math.floor(Number(w.value)),
      originalIndex: idx,
    }));

  const n = validWorkloads.length;
  const W = sanitizedCapacity;

  // Initialize DP Table: (n + 1) rows x (W + 1) columns
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  // Tabulate bottom-up
  for (let i = 1; i <= n; i++) {
    const currentItem = validWorkloads[i - 1];
    const wi = currentItem.weight;
    const vi = currentItem.value;

    for (let w = 0; w <= W; w++) {
      if (wi > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        const excludeVal = dp[i - 1][w];
        const includeVal = dp[i - 1][w - wi] + vi;
        dp[i][w] = Math.max(excludeVal, includeVal);
      }
    }
  }

  // Backtrack to find optimal items
  const selectedWorkloads = [];
  const decisionPath = [];
  let remainingWeight = W;

  for (let i = n; i > 0; i--) {
    const currentItem = validWorkloads[i - 1];
    const wi = currentItem.weight;

    if (dp[i][remainingWeight] !== dp[i - 1][remainingWeight]) {
      selectedWorkloads.push(currentItem);
      decisionPath.push({ itemIndex: i, weight: remainingWeight, included: true });
      remainingWeight -= wi;
    } else {
      decisionPath.push({ itemIndex: i, weight: remainingWeight, included: false });
    }
  }

  selectedWorkloads.reverse();

  const totalCost = selectedWorkloads.reduce((acc, curr) => acc + curr.weight, 0);
  const totalValue = dp[n][W];
  const capacityUtilizationPercent = W > 0 ? ((totalCost / W) * 100).toFixed(1) : "0.0";
  const efficiencyRatio = totalCost > 0 ? (totalValue / totalCost).toFixed(2) : "0.00";

  const endTime = performance.now();
  const executionTimeMs = +(endTime - startTime).toFixed(3);

  return {
    optimalValue: totalValue,
    allocatedCost: totalCost,
    remainingCapacity: W - totalCost,
    capacityUtilizationPercent,
    efficiencyRatio,
    selectedWorkloads,
    selectedIds: new Set(selectedWorkloads.map((item) => item.id)),
    dpTable: dp,
    decisionPath,
    workloads: validWorkloads,
    capacity: W,
    executionTimeMs,
    complexity: {
      time: `Θ(${n} × ${W})`,
      space: `Θ(${n} × ${W})`,
    },
  };
}

/**
 * Benchmark algorithm: Greedy heuristic based on Value-to-Weight ratio.
 *
 * @param {Array} workloads
 * @param {number} capacity
 * @returns {Object}
 */
export function solveGreedyBenchmark(workloads, capacity) {
  const startTime = performance.now();
  const W = Math.max(0, Math.floor(Number(capacity) || 0));

  const sorted = [...(workloads || [])]
    .filter((w) => w && Number(w.weight) > 0 && Number(w.value) >= 0)
    .map((w) => ({
      ...w,
      weight: Math.floor(Number(w.weight)),
      value: Math.floor(Number(w.value)),
      density: +(w.value / w.weight).toFixed(3),
    }))
    .sort((a, b) => b.density - a.density);

  let currentWeight = 0;
  let totalValue = 0;
  const picked = [];

  for (const item of sorted) {
    if (currentWeight + item.weight <= W) {
      picked.push(item);
      currentWeight += item.weight;
      totalValue += item.value;
    }
  }

  const endTime = performance.now();

  return {
    greedyValue: totalValue,
    allocatedCost: currentWeight,
    selectedWorkloads: picked,
    executionTimeMs: +(endTime - startTime).toFixed(3),
  };
}
