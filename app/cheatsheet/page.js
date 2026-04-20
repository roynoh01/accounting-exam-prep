import Link from "next/link";
import { cheatSheet } from "../../lib/cheatsheet";

export const metadata = {
  title: "Cheat Sheet — Managerial Accounting Midterm",
};

export default function CheatSheetPage() {
  return (
    <main className="flex-1">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
              ← Home
            </Link>
            <span className="h-5 w-px bg-slate-200" />
            <span className="text-sm font-semibold text-slate-900">Cheat Sheet</span>
          </div>
          <Link
            href="/test"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Go to Test Mode →
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contents</div>
            <ul className="mt-3 space-y-2 text-sm">
              {cheatSheet.map((ch) => (
                <li key={ch.id}>
                  <a
                    href={`#${ch.id}`}
                    className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <span className="text-xs text-slate-400">{ch.chapter}</span>
                    <div className="font-medium">{ch.title}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-12">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Concept &amp; Formula Cheat Sheet
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Distilled from BIZ3108 lectures L2–L5. Skim before attempting questions — focus on formulas,
              definitions, and the intuition behind each concept.
            </p>
          </header>

          {cheatSheet.map((ch) => (
            <section key={ch.id} id={ch.id} className="scroll-mt-24">
              <div className={`rounded-3xl bg-gradient-to-r ${ch.color} p-6 text-white shadow-lg`}>
                <div className="text-xs uppercase tracking-[0.2em] text-white/80">{ch.chapter}</div>
                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{ch.title}</h2>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {ch.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{section.heading}</h3>

                    {section.items && (
                      <dl className="mt-4 space-y-3">
                        {section.items.map((it, i) => (
                          <div key={i} className="grid gap-1">
                            <dt className="text-sm font-semibold text-brand-700">{it.term}</dt>
                            <dd className="text-sm text-slate-600">{it.desc}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {section.formulas && (
                      <ul className="mt-4 space-y-3">
                        {section.formulas.map((f, i) => (
                          <li key={i} className="rounded-xl bg-slate-50 p-4">
                            <div className="text-sm font-semibold text-slate-900">{f.name}</div>
                            <code className="mt-1 block whitespace-pre-wrap font-mono text-sm text-brand-700">
                              {f.formula}
                            </code>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.table && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600">
                            <tr>
                              {section.table.headers.map((h, i) => (
                                <th key={i} className="px-3 py-2">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 bg-white">
                            {section.table.rows.map((row, r) => (
                              <tr key={r}>
                                {row.map((cell, c) => (
                                  <td key={c} className="px-3 py-2 text-slate-700">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-3xl border border-dashed border-brand-300 bg-brand-50 p-8 text-center">
            <h3 className="text-lg font-semibold text-brand-900">Ready to practice?</h3>
            <p className="mt-2 text-sm text-brand-800/80">
              Now that the formulas are fresh, try the test. Pick a mode and get instant feedback.
            </p>
            <Link
              href="/test"
              className="mt-4 inline-flex items-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700"
            >
              Start Test Mode →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
