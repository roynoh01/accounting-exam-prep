import Link from "next/link";
import TestMode from "../../components/TestMode";

export const metadata = {
  title: "Test Mode — Managerial Accounting Midterm",
};

export default function TestPage() {
  return (
    <main className="flex-1">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
              ← Home
            </Link>
            <span className="h-5 w-px bg-slate-200" />
            <span className="text-sm font-semibold text-slate-900">Test Mode</span>
          </div>
          <Link
            href="/cheatsheet"
            className="text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Review Cheat Sheet →
          </Link>
        </div>
      </div>
      <TestMode />
    </main>
  );
}
