// Cheat sheet data derived from lecture materials (L2-L5)
// Principles of Accounting (II): Management Accounting - BIZ3108

export const cheatSheet = [
  {
    id: "ch1",
    chapter: "Chapter 1",
    title: "Cost Concepts",
    color: "from-blue-500 to-indigo-600",
    sections: [
      {
        heading: "Cost Classifications (5 lenses)",
        items: [
          { term: "Assignment", desc: "Direct vs. Indirect — traceable to a cost object vs. not." },
          { term: "Function", desc: "Manufacturing vs. Non-manufacturing (Selling, Administrative)." },
          { term: "Financial Statements", desc: "Product (inventoriable) vs. Period (expensed when incurred)." },
          { term: "Behavior", desc: "Variable vs. Fixed vs. Mixed, in relation to activity level." },
          { term: "Decision-Making", desc: "Relevant (differs, future, cash-flow impact) vs. Irrelevant (sunk, committed)." },
        ],
      },
      {
        heading: "Manufacturing Costs",
        items: [
          { term: "Direct Materials (DM)", desc: "Raw materials traceable to product." },
          { term: "Direct Labor (DL)", desc: "Labor traceable to product." },
          { term: "Manufacturing Overhead (MOH)", desc: "Indirect materials + indirect labor + other indirect factory costs." },
        ],
      },
      {
        heading: "Key Formulas",
        formulas: [
          { name: "Prime Cost", formula: "DM + DL" },
          { name: "Conversion Cost", formula: "DL + MOH" },
          { name: "Product Cost (Manufacturer)", formula: "DM + DL + MOH" },
          { name: "Period Cost", formula: "Selling Expenses + Administrative Expenses" },
          { name: "Mixed Cost", formula: "Y = a + b·X  (a = fixed, b = variable rate, X = activity)" },
        ],
      },
      {
        heading: "Behavior Summary (within relevant range)",
        table: {
          headers: ["Type", "In Total", "Per Unit"],
          rows: [
            ["Variable", "Changes with activity (↑ or ↓)", "Constant"],
            ["Fixed", "Constant", "Changes inversely with activity"],
            ["Mixed", "Changes partially with activity", "Changes with activity"],
          ],
        },
      },
      {
        heading: "Relevant vs. Irrelevant",
        items: [
          { term: "Relevant Cost", desc: "Differs between alternatives + future + impacts cash flow." },
          { term: "Opportunity Cost", desc: "Benefit forgone from the next-best alternative — always relevant." },
          { term: "Sunk Cost", desc: "Already incurred; cannot be changed — never relevant." },
          { term: "Committed Cost", desc: "Future cost locked in before the decision — irrelevant." },
        ],
      },
      {
        heading: "Income Statement Formats",
        items: [
          { term: "Traditional", desc: "Sales − COGS = Gross Margin − Selling & Admin = NOI. Used for external reporting." },
          { term: "Contribution", desc: "Sales − Variable Expenses = Contribution Margin − Fixed Expenses = NOI. Used for CVP/planning." },
        ],
      },
    ],
  },
  {
    id: "ch2-3",
    chapter: "Chapter 2 / 3",
    title: "Job-Order Costing",
    color: "from-emerald-500 to-teal-600",
    sections: [
      {
        heading: "When to Use",
        items: [
          { term: "Job-Order Costing", desc: "Heterogeneous, customized products/services (e.g., custom furniture, legal cases, construction)." },
          { term: "Process Costing", desc: "Homogeneous, continuous production (e.g., chemicals, cereal)." },
        ],
      },
      {
        heading: "Core Formulas",
        formulas: [
          { name: "Predetermined Overhead Rate (POHR)", formula: "Estimated Total MOH ÷ Estimated Allocation Base" },
          { name: "Applied MOH", formula: "POHR × Actual Amount of Allocation Base" },
          { name: "Job Cost", formula: "DM + DL + Applied MOH" },
        ],
      },
      {
        heading: "Schedule of Cost of Goods Manufactured (COGM)",
        formulas: [
          { name: "Raw Materials Used", formula: "Beginning RM + Purchases − Ending RM" },
          { name: "Total Manufacturing Costs", formula: "DM Used + DL + Applied MOH" },
          { name: "Cost of Goods Manufactured", formula: "Beginning WIP + Total Mfg Costs − Ending WIP" },
        ],
      },
      {
        heading: "Schedule of Cost of Goods Sold (COGS)",
        formulas: [
          { name: "Unadjusted COGS", formula: "Beginning FG + COGM − Ending FG" },
          { name: "Adjusted COGS", formula: "Unadjusted COGS + Underapplied OH − Overapplied OH" },
        ],
      },
      {
        heading: "Under/Overapplied Overhead",
        items: [
          { term: "Underapplied", desc: "Actual MOH > Applied MOH → debit balance in MOH → ADD to COGS (increases COGS, decreases NOI)." },
          { term: "Overapplied", desc: "Actual MOH < Applied MOH → credit balance in MOH → SUBTRACT from COGS (decreases COGS, increases NOI)." },
        ],
      },
      {
        heading: "Disposition Methods",
        items: [
          { term: "Method 1: Close to COGS", desc: "Adjust the entire variance to Cost of Goods Sold. Simple but less accurate." },
          { term: "Method 2: Allocate", desc: "Prorate to WIP, Finished Goods, and COGS based on applied-OH balances. More accurate, more complex." },
        ],
      },
      {
        heading: "Multiple POHRs",
        items: [
          { term: "Plantwide Rate", desc: "Single POHR for the entire factory. Simple but ignores departmental differences." },
          { term: "Departmental Rate", desc: "Separate POHR per department (e.g., labor-intensive vs. machine-intensive). More accurate." },
        ],
      },
    ],
  },
  {
    id: "ch4",
    chapter: "Chapter 4",
    title: "Process Costing",
    color: "from-purple-500 to-fuchsia-600",
    sections: [
      {
        heading: "Concept",
        items: [
          { term: "Process Costing", desc: "Average costs across large volumes of homogeneous units. Cost per unit = Total department cost ÷ Equivalent units." },
          { term: "Equivalent Unit (EU)", desc: "Partial units restated as whole equivalent units. Example: 500 units that are 60% complete = 300 equivalent units." },
        ],
      },
      {
        heading: "Four Steps (Weighted-Average Method)",
        items: [
          { term: "Step 1", desc: "Compute equivalent units of production (separately for materials & conversion)." },
          { term: "Step 2", desc: "Compute cost per equivalent unit." },
          { term: "Step 3", desc: "Assign costs to units (completed & transferred out + ending WIP)." },
          { term: "Step 4", desc: "Prepare a cost reconciliation report." },
        ],
      },
      {
        heading: "Key Formulas",
        formulas: [
          { name: "Weighted-Average EU", formula: "Units Completed & Transferred Out + (Ending WIP Units × % Complete)" },
          { name: "Cost per EU (Weighted-Avg)", formula: "(Beginning WIP Cost + Current Period Cost) ÷ EU" },
          { name: "FIFO EU", formula: "(Beginning WIP × % to complete) + Units Started & Completed + (Ending WIP × % complete)" },
          { name: "Cost per EU (FIFO)", formula: "Current Period Cost ÷ FIFO EU" },
        ],
      },
      {
        heading: "Weighted-Average vs. FIFO",
        items: [
          { term: "Weighted-Average", desc: "Blends beginning WIP costs with current-period costs. Simpler. Same cost per EU for all units." },
          { term: "FIFO", desc: "Separates beginning WIP from current production. Better cost control & performance measurement. More complex." },
        ],
      },
    ],
  },
  {
    id: "ch5",
    chapter: "Chapter 5",
    title: "Cost-Volume-Profit (CVP) Relationships",
    color: "from-orange-500 to-rose-600",
    sections: [
      {
        heading: "Contribution Margin Concepts",
        formulas: [
          { name: "Contribution Margin (CM)", formula: "Sales − Variable Expenses" },
          { name: "Unit CM", formula: "Selling Price − Variable Cost per Unit" },
          { name: "CM Ratio (CMR)", formula: "CM ÷ Sales  =  Unit CM ÷ Price" },
          { name: "Variable Expense Ratio (VER)", formula: "VC ÷ Sales  =  1 − CMR" },
        ],
      },
      {
        heading: "Profit Equation",
        formulas: [
          { name: "Profit (units)", formula: "Profit = (Unit CM × Q) − Fixed Costs" },
          { name: "Profit (dollars)", formula: "Profit = (CMR × Sales) − Fixed Costs" },
          { name: "Incremental Profit", formula: "ΔProfit = (CMR × ΔSales) − ΔFixed Costs" },
        ],
      },
      {
        heading: "Break-Even Analysis",
        formulas: [
          { name: "BEP in Units", formula: "Fixed Costs ÷ Unit CM" },
          { name: "BEP in Sales $", formula: "Fixed Costs ÷ CMR" },
        ],
      },
      {
        heading: "Target Profit Analysis",
        formulas: [
          { name: "Target Profit — Units", formula: "(Fixed Costs + Target Profit) ÷ Unit CM" },
          { name: "Target Profit — Sales $", formula: "(Fixed Costs + Target Profit) ÷ CMR" },
        ],
      },
      {
        heading: "Margin of Safety & Operating Leverage",
        formulas: [
          { name: "Margin of Safety ($ or units)", formula: "Actual (or Planned) Sales − Break-Even Sales" },
          { name: "Margin of Safety Ratio", formula: "Margin of Safety ÷ Actual Sales" },
          { name: "Degree of Operating Leverage (DOL)", formula: "Contribution Margin ÷ Net Operating Income" },
          { name: "%Δ NOI", formula: "DOL × %Δ Sales" },
        ],
      },
      {
        heading: "Cost Structure Intuition",
        items: [
          { term: "High Fixed / Low Variable", desc: "Higher CMR → profits rise faster with volume, but higher BEP and lower Margin of Safety. Higher operating leverage = higher risk." },
          { term: "Low Fixed / High Variable", desc: "Lower CMR → profits rise slower with volume, but lower BEP and higher Margin of Safety. Lower operating leverage = more stability." },
          { term: "DOL at BEP", desc: "DOL approaches infinity at the break-even point and decreases as sales rise further above BEP." },
        ],
      },
    ],
  },
];
