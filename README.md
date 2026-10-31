# Cloud Infrastructure Scheduling ⚡
### Cloud Infrastructure Resource Allocation via 0/1 Knapsack (DAA Project)

> **Design and Analysis of Algorithms (DAA)** practical project solving Cloud Infrastructure Scheduling using **0/1 Knapsack Dynamic Programming**.

Built with **Next.js (App Router)**, **Tailwind CSS v4**, and modern **JavaScript**.

---

## 📌 Problem Formulation

Cloud infrastructure platforms (e.g. AWS EC2, Kubernetes clusters) operate with hard resource limits:
* **Capacity ($W$):** Fixed available resource budget (e.g., $16\text{ GB RAM}$, or max vCPUs).
* **Candidate Workloads ($n$):** Microservices, database nodes, or background workers.
* **Workload Cost ($w_i$):** Compute resource footprint required by service $i$.
* **Workload Utility ($v_i$):** Delivered business value, requests/sec, or SLA points.

Because each service is either deployed or excluded ($x_i \in \{0, 1\}$), fractional allocations are invalid:

$$\text{Maximize } \sum_{i=1}^{n} v_i \cdot x_i \quad \text{subject to} \quad \sum_{i=1}^{n} w_i \cdot x_i \le W, \quad x_i \in \{0, 1\}$$

---

## 🧠 Dynamic Programming (DP) Formulation

### 1. State Definition
$dp[i][w]$ represents the maximum utility achievable using a subset of the first $i$ workloads within capacity limit $w$.

### 2. Base Conditions
* $dp[0][w] = 0 \quad \forall w \in [0, W]$
* $dp[i][0] = 0 \quad \forall i \in [0, n]$

### 3. Recurrence Relation
$$dp[i][w] = \begin{cases} dp[i-1][w] & \text{if } w_i > w \\ \max\Big(dp[i-1][w], \; dp[i-1][w - w_i] + v_i\Big) & \text{if } w_i \le w \end{cases}$$

### 4. Backtracking
Traces back from $(n, W)$ to $(0, 0)$:
* If $dp[i][w] \neq dp[i-1][w]$, workload $i$ was provisioned ($x_i = 1$) and $w \leftarrow w - w_i$.
* Otherwise, workload $i$ was excluded ($x_i = 0$).

---

## ⏱️ Asymptotic Complexity Analysis

| Metric | Complexity | Explanation |
| :--- | :--- | :--- |
| **Time Complexity** | $\Theta(n \times W)$ | Double nested loops tabulating the $(n+1) \times (W+1)$ matrix. |
| **Space Complexity** | $\Theta(n \times W)$ | 2D matrix storage required to reconstruct the exact subset of provisioned services. |
| **Backtracking Time** | $O(n)$ | Linear scan back through rows $n$ down to $1$. |

---

## 📊 DP vs. Greedy Heuristic Benchmark

| Criterion | 0/1 Knapsack Dynamic Programming | Greedy Heuristic (Density $v_i / w_i$) |
| :--- | :--- | :--- |
| **Optimality Guarantee** | ✅ **100% Guaranteed Global Maximum** | ❌ Heuristic Approximation |
| **Time Complexity** | $\Theta(n \cdot W)$ | $O(n \log n)$ |
| **Why Greedy Fails** | Explores all optimal sub-problems | Strands discrete capacity due to non-divisible $0/1$ items |

---

## 📂 Project Architecture

```
├── src/
│   ├── algorithms/
│   │   └── knapsackEngine.js     # Pure 0/1 Knapsack DP algorithm & benchmarks
│   ├── components/
│   │   ├── FloatingNavbar.js     # Minimalist floating navbar with OptiInfra logo
│   │   ├── ResourceInputPanel.js # Capacity slider & candidate workloads list
│   │   ├── SolutionSummary.js    # Optimal allocation metrics & service status
│   │   ├── DpMatrixVisualizer.js # Tabulation grid with interactive cell inspection
│   │   ├── AlgorithmComparison.js# DP vs Greedy heuristic benchmark
│   │   ├── ComplexityCard.js     # DAA recurrence formulas & complexity proof
│   │   └── BrandFooter.js        # Minimalist copyright-only footer
│   ├── lib/
│   │   └── useIsClient.js        # React 19 hydration-safe hook
│   └── app/
│       ├── globals.css           # Tailwind CSS v4 styling & scrollbars
│       ├── layout.js             # Root layout & metadata
│       └── page.js               # Main page orchestrator
├── .gitignore                    # Production-grade gitignore
└── package.json                  # Next.js 16 + Tailwind CSS v4 + React 19
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Production build
npm run build
npm run start

# 4. Lint check
npm run lint
```

---

## 🛡️ License
© 2026 Cloud Infrastructure Scheduling. All rights reserved.
