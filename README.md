# Managerial Accounting — Midterm Prep

A Quizlet-style study site for **BIZ3108 Principles of Accounting (II)** covering:

- **Cost Concepts** (Ch 1)
- **Job-Order Costing** (Ch 2/3)
- **Process Costing** (Ch 4)
- **Cost-Volume-Profit Relationships** (Ch 5)

Two sections:

- **Cheat Sheet** — concept & formula reference pulled from the lecture slides.
- **Test Mode** — 100+ practice questions from the Test Bank (Ch 2–5) + lecture Quick Checks (including Ch 6 CVP from Quick Checks only, per the exam scope).

Built with **Next.js 14 (App Router)** and **Tailwind CSS**.

---

## Quick Start (local dev)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

Two easy ways — pick whichever you prefer.

### Option A — Vercel CLI (fastest, ~1 minute)

From inside this project folder:

```bash
# 1. Install Vercel CLI (one time, globally)
npm install -g vercel

# 2. Log in (opens browser)
vercel login

# 3. Deploy to production
vercel --prod
```

Accept the defaults when prompted (detected framework: **Next.js**). Vercel will build
and give you a live URL like `https://accounting-exam-prep.vercel.app`.

### Option B — GitHub + Vercel Dashboard

1. Create a new GitHub repo (e.g. `accounting-exam-prep`) and push this folder:
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/<your-username>/accounting-exam-prep.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Keep all defaults (framework: Next.js) and click **Deploy**.

---

## Project Structure

```
accounting-exam-prep/
├── app/
│   ├── layout.js            # Root layout (fonts, meta)
│   ├── page.js              # Home / landing page
│   ├── cheatsheet/page.js   # Concept & formula reference
│   └── test/page.js         # Quizlet-style Test Mode
├── components/
│   └── TestMode.jsx         # Interactive test UI (client component)
├── lib/
│   ├── cheatsheet.js        # Structured cheat-sheet data (Ch 1–5)
│   └── questions.js         # 100+ questions w/ answers + explanations
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Content Sources

- **Test Bank** (Garrison): Chapters 2, 3, 4, 5. Filtered to exclude grouped
  ("Use the following to answer questions…") and Essay questions. At most
  2 Easy / 2 Medium / 2 Hard per concept.
- **Lecture Quick Checks**: From lecture slides L2–L5. This includes the **only**
  source for CVP (Ch 6 in test-bank numbering) questions, per the exam scope.

## Test Mode Features

- Filter by concept (Cost Concepts / Job-Order / Process / Cost Behavior / CVP).
- Filter by difficulty (Easy / Medium / Hard).
- Two grading modes:
  - **Submit at End** — score + full review after you finish.
  - **Instant Feedback** — correct answer + explanation right after each question.
- Every question has a step-by-step solution/rationale attached.

Good luck on the midterm.
