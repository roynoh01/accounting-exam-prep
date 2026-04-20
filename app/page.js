import Link from "next/link";
import { questions } from "../lib/questions";
import { cheatSheet } from "../lib/cheatsheet";

export default function Home() {
  const total = questions.length;
  const byGroup = questions.reduce((acc, q) => {
    acc[q.concept_group] = (acc[q.concept_group] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="flex-1">
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white blur-3xl" />
          <div className="absolute top-32 right-0 h-96 w-96 rounded-full bg-indigo-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-100/80">BIZ3108 · Midterm Prep</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl leading-tight">
            Managerial Accounting
            <br />
            <span className="text-brand-100">Midterm Study Hub</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-50/90">
            Everything you need to review before the midterm — a concise concept &amp; formula cheat sheet,
            plus {total} practice questions drawn from the Test Bank (Ch 2–5) and lecture Quick Checks (Ch 1–5, CVP).
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/cheatsheet"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
            >
              Open Cheat Sheet
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/test"
              className="inline-flex items-center rounded-full border border-white/60 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Start Test Mode
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900">Scope at a Glance</h2>
        <p className="mt-2 text-slate-600">Content is filtered to the exam scope: 4 core concepts × targeted question mix.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cheatSheet.map((ch) => (
            <Link
              key={ch.id}
              href={`/cheatsheet#${ch.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`inline-flex rounded-full bg-gradient-to-r ${ch.color} px-3 py-1 text-xs font-semibold text-white`}>
                {ch.chapter}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-brand-700">{ch.title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {ch.sections.length} sections · {ch.sections.reduce((n, s) => n + (s.formulas?.length || 0) + (s.items?.length || 0), 0)} key items
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Question Bank Summary</h3>
          <p className="mt-2 text-slate-600">Test Bank Chapters 2–5 (at most 2 per difficulty per concept) + lecture Quick Checks.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(byGroup).map(([g, count]) => (
              <div key={g} className="rounded-xl bg-slate-50 p-5">
                <div className="text-xs uppercase tracking-wider text-slate-500">{g}</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{count}</div>
                <div className="text-sm text-slate-500">questions</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-10 text-white">
          <h3 className="text-2xl font-bold">How to study with this site</h3>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            <li className="rounded-2xl bg-white/10 p-5">
              <div className="text-xs uppercase tracking-wider text-brand-100">Step 1</div>
              <div className="mt-2 text-lg font-semibold">Skim the cheat sheet</div>
              <p className="mt-2 text-sm text-white/80">Refresh formulas and the logic behind each concept before attempting questions.</p>
            </li>
            <li className="rounded-2xl bg-white/10 p-5">
              <div className="text-xs uppercase tracking-wider text-brand-100">Step 2</div>
              <div className="mt-2 text-lg font-semibold">Take the test</div>
              <p className="mt-2 text-sm text-white/80">Pick a concept (or all concepts) and a grading mode. Submit at the end or get instant feedback.</p>
            </li>
            <li className="rounded-2xl bg-white/10 p-5">
              <div className="text-xs uppercase tracking-wider text-brand-100">Step 3</div>
              <div className="mt-2 text-lg font-semibold">Read the solutions</div>
              <p className="mt-2 text-sm text-white/80">Every question includes the answer plus a short derivation or rationale.</p>
            </li>
          </ol>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        Midterm Prep · BIZ3108 Principles of Accounting (II) · Built for self-study
      </footer>
    </main>
  );
}
