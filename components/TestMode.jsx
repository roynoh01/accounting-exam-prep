"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { questions as allQuestions } from "../lib/questions";

const CONCEPT_GROUPS = [
  { id: "all", label: "All Concepts" },
  { id: "Cost Concepts", label: "Cost Concepts" },
  { id: "Job-Order Costing", label: "Job-Order Costing" },
  { id: "Process Costing", label: "Process Costing" },
  { id: "Cost Behavior", label: "Cost Behavior" },
  { id: "CVP", label: "CVP (Ch 6)" },
];

const DIFFICULTY_FILTERS = [
  { id: "all", label: "All Levels" },
  { id: "Easy", label: "Easy" },
  { id: "Medium", label: "Medium" },
  { id: "Hard", label: "Hard" },
];

const GRADING_MODES = [
  {
    id: "submit",
    label: "Submit at End",
    desc: "Answer every question, then submit for a full score report.",
  },
  {
    id: "instant",
    label: "Instant Feedback",
    desc: "Get the correct answer and explanation right after each question.",
  },
];

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeTF(ans) {
  if (!ans) return "";
  const s = String(ans).trim().toLowerCase();
  if (s === "true" || s === "t") return "True";
  if (s === "false" || s === "f") return "False";
  return ans;
}

function normalizeMC(ans) {
  if (!ans) return "";
  return String(ans).trim().toUpperCase().charAt(0);
}

function letterOf(optionLabel) {
  // "A) text" => "A"
  const m = String(optionLabel).match(/^\s*([A-Za-z])\)/);
  return m ? m[1].toUpperCase() : "";
}

export default function TestMode() {
  const [stage, setStage] = useState("setup"); // "setup" | "active" | "review"
  const [concept, setConcept] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [mode, setMode] = useState("submit");
  const [count, setCount] = useState(15);
  const [shuffle, setShuffle] = useState(true);

  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // id -> user answer
  const [revealed, setRevealed] = useState({}); // id -> bool (instant mode)

  const filtered = useMemo(() => {
    let list = allQuestions.slice();
    if (concept !== "all") list = list.filter((q) => q.concept_group === concept);
    if (difficulty !== "all") list = list.filter((q) => q.difficulty === difficulty);
    return list;
  }, [concept, difficulty]);

  const availableCounts = useMemo(() => {
    const total = filtered.length;
    return {
      total,
      tf: filtered.filter((q) => q.type === "TF").length,
      mc: filtered.filter((q) => q.type === "MC").length,
    };
  }, [filtered]);

  function startTest() {
    let pool = filtered.slice();
    if (shuffle) shuffleInPlace(pool);
    const picked = pool.slice(0, Math.min(count, pool.length));
    setDeck(picked);
    setIdx(0);
    setAnswers({});
    setRevealed({});
    setStage("active");
  }

  function resetAll() {
    setStage("setup");
    setDeck([]);
    setIdx(0);
    setAnswers({});
    setRevealed({});
  }

  function isCorrect(q) {
    const user = answers[q.id];
    if (user == null || user === "") return false;
    if (q.type === "TF") return normalizeTF(user) === normalizeTF(q.answer);
    if (q.type === "MC") return normalizeMC(user) === normalizeMC(q.answer);
    return false;
  }

  const scored = useMemo(() => {
    const correct = deck.filter((q) => isCorrect(q)).length;
    const answered = deck.filter((q) => answers[q.id] != null && answers[q.id] !== "").length;
    return { correct, answered, total: deck.length };
  }, [deck, answers]);

  if (stage === "setup") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Set up your test</h1>
          <p className="mt-2 text-slate-600">Pick scope, difficulty, and grading style, then hit Start.</p>

          <div className="mt-8 space-y-8">
            <Field label="Concept">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CONCEPT_GROUPS.map((c) => (
                  <Chip
                    key={c.id}
                    active={concept === c.id}
                    onClick={() => setConcept(c.id)}
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="Difficulty">
              <div className="flex flex-wrap gap-2">
                {DIFFICULTY_FILTERS.map((d) => (
                  <Chip key={d.id} active={difficulty === d.id} onClick={() => setDifficulty(d.id)}>
                    {d.label}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="Grading mode">
              <div className="grid gap-3 sm:grid-cols-2">
                {GRADING_MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      mode === m.id
                        ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{m.label}</div>
                    <div className="mt-1 text-sm text-slate-600">{m.desc}</div>
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`Number of questions (${availableCounts.total} available · ${availableCounts.tf} TF / ${availableCounts.mc} MC)`}>
              <div className="flex flex-wrap items-center gap-3">
                {[10, 15, 25, 50, availableCounts.total].map((n, i) => {
                  const val = Math.min(n, availableCounts.total);
                  const label = i === 4 ? `All (${availableCounts.total})` : `${val}`;
                  return (
                    <Chip key={i} active={count === val} onClick={() => setCount(val)}>
                      {label}
                    </Chip>
                  );
                })}
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={shuffle}
                  onChange={(e) => setShuffle(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Shuffle questions
              </label>
            </Field>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
              ← Back to home
            </Link>
            <button
              onClick={startTest}
              disabled={availableCounts.total === 0}
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Start Test ({Math.min(count, availableCounts.total)} qs)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "active") {
    const q = deck[idx];
    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <ProgressBar current={idx + 1} total={deck.length} answered={scored.answered} />

        <QuestionCard
          q={q}
          idx={idx}
          total={deck.length}
          answers={answers}
          revealed={revealed}
          mode={mode}
          setAnswers={setAnswers}
          setRevealed={setRevealed}
        />

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setIdx(Math.max(0, idx - 1))}
            disabled={idx === 0}
            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
          >
            ← Previous
          </button>

          {idx < deck.length - 1 ? (
            <button
              onClick={() => setIdx(idx + 1)}
              className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand-700"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setStage("review")}
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
            >
              Finish &amp; Review
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setStage("review")}
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900"
          >
            End Test Early →
          </button>
        </div>
      </div>
    );
  }

  // Review stage
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 p-8 text-white shadow-lg">
        <div className="text-xs uppercase tracking-[0.2em] text-brand-100">Results</div>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          {scored.correct} / {scored.total} correct
        </h2>
        <div className="mt-2 text-brand-50/90">
          {scored.total > 0
            ? `${Math.round((scored.correct / scored.total) * 100)}% — ${scored.answered} of ${scored.total} answered`
            : "No questions attempted."}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={resetAll}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700 shadow hover:bg-brand-50"
          >
            New Test
          </button>
          <Link
            href="/cheatsheet"
            className="rounded-full border border-white/60 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Review Cheat Sheet
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {deck.map((q, i) => (
          <ReviewRow key={q.id} q={q} index={i} user={answers[q.id]} isCorrect={isCorrect(q)} />
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900">{label}</label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-brand-500 bg-brand-600 text-white shadow"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

function ProgressBar({ current, total, answered }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Question {current} / {total}</span>
        <span>{answered} answered</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuestionCard({ q, idx, total, answers, revealed, mode, setAnswers, setRevealed }) {
  const user = answers[q.id] ?? "";
  const show = mode === "instant" && revealed[q.id];
  const correctLetter = q.type === "MC" ? normalizeMC(q.answer) : null;
  const userLetter = q.type === "MC" ? normalizeMC(user) : null;

  const locked = mode === "instant" && show;

  function setUserAnswer(val) {
    if (locked) return;
    setAnswers((prev) => ({ ...prev, [q.id]: val }));
  }

  function reveal() {
    if (user === "" || user == null) return;
    setRevealed((prev) => ({ ...prev, [q.id]: true }));
  }

  const isRight =
    q.type === "TF"
      ? normalizeTF(user) === normalizeTF(q.answer)
      : normalizeMC(user) === normalizeMC(q.answer);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
          {q.concept_group}
        </span>
        <span
          className={`rounded-full px-3 py-1 ${
            q.difficulty === "Easy"
              ? "bg-emerald-100 text-emerald-700"
              : q.difficulty === "Medium"
              ? "bg-amber-100 text-amber-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {q.difficulty}
        </span>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">{q.type}</span>
        <span className="ml-auto text-[10px] font-medium text-slate-400">{q.source}</span>
      </div>

      <h2 className="mt-5 text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl">
        {q.question}
      </h2>

      <div className="mt-6 space-y-3">
        {q.type === "TF" ? (
          ["True", "False"].map((opt) => {
            const selected = normalizeTF(user) === opt;
            const correct = show && normalizeTF(q.answer) === opt;
            const wrong = show && selected && !correct;
            return (
              <button
                key={opt}
                onClick={() => setUserAnswer(opt)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  correct
                    ? "border-emerald-500 bg-emerald-50"
                    : wrong
                    ? "border-rose-500 bg-rose-50"
                    : selected
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="font-semibold text-slate-900">{opt}</span>
              </button>
            );
          })
        ) : (
          q.options.map((opt, i) => {
            const letter = letterOf(opt) || String.fromCharCode(65 + i);
            const selected = userLetter === letter;
            const correct = show && correctLetter === letter;
            const wrong = show && selected && !correct;
            return (
              <button
                key={i}
                onClick={() => setUserAnswer(letter)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  correct
                    ? "border-emerald-500 bg-emerald-50"
                    : wrong
                    ? "border-rose-500 bg-rose-50"
                    : selected
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="font-mono mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  {letter}
                </span>
                <span className="text-slate-800">{opt.replace(/^\s*[A-Za-z]\)\s*/, "")}</span>
              </button>
            );
          })
        )}
      </div>

      {mode === "instant" && !show && user !== "" && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={reveal}
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand-700"
          >
            Check Answer
          </button>
        </div>
      )}

      {show && (
        <div
          className={`mt-6 rounded-2xl border p-5 ${
            isRight ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
          }`}
        >
          <div className={`text-sm font-bold ${isRight ? "text-emerald-700" : "text-rose-700"}`}>
            {isRight ? "✓ Correct" : "✗ Incorrect"}
          </div>
          <div className="mt-2 text-sm text-slate-800">
            <span className="font-semibold">Answer: </span>
            {q.type === "TF" ? normalizeTF(q.answer) : `${correctLetter})`}{" "}
            {q.type === "MC" && (
              <span className="text-slate-600">
                {q.options.find((o) => letterOf(o) === correctLetter)?.replace(/^\s*[A-Za-z]\)\s*/, "")}
              </span>
            )}
          </div>
          <div className="mt-2 text-sm text-slate-700">
            <span className="font-semibold">Why: </span>
            {q.explanation}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewRow({ q, index, user, isCorrect }) {
  const [expand, setExpand] = useState(true);
  const correctLetter = q.type === "MC" ? normalizeMC(q.answer) : null;
  const userLetter = q.type === "MC" ? normalizeMC(user) : null;

  return (
    <div
      className={`rounded-2xl border p-5 ${
        user === "" || user == null
          ? "border-slate-200 bg-white"
          : isCorrect
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-rose-200 bg-rose-50/40"
      }`}
    >
      <button
        onClick={() => setExpand(!expand)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">Q{index + 1}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{q.concept_group}</span>
            <span
              className={`rounded-full px-2 py-0.5 ${
                q.difficulty === "Easy"
                  ? "bg-emerald-100 text-emerald-700"
                  : q.difficulty === "Medium"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {q.difficulty}
            </span>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-brand-700">{q.type}</span>
            {user === "" || user == null ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">Unanswered</span>
            ) : isCorrect ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">✓ Correct</span>
            ) : (
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700">✗ Incorrect</span>
            )}
          </div>
          <div className="mt-2 font-semibold text-slate-900">{q.question}</div>
        </div>
        <span className="mt-1 text-slate-400">{expand ? "−" : "+"}</span>
      </button>

      {expand && (
        <div className="mt-4 space-y-3 text-sm">
          {q.type === "MC" && (
            <ul className="space-y-1.5">
              {q.options.map((opt, i) => {
                const letter = letterOf(opt) || String.fromCharCode(65 + i);
                const selected = userLetter === letter;
                const correct = correctLetter === letter;
                return (
                  <li
                    key={i}
                    className={`rounded-lg px-3 py-2 ${
                      correct
                        ? "bg-emerald-100/60 text-emerald-900"
                        : selected
                        ? "bg-rose-100/60 text-rose-900"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    <span className="font-mono mr-2 font-bold">{letter}.</span>
                    {opt.replace(/^\s*[A-Za-z]\)\s*/, "")}
                    {correct && <span className="ml-2 font-semibold">(Correct)</span>}
                    {selected && !correct && <span className="ml-2 font-semibold">(Your answer)</span>}
                  </li>
                );
              })}
            </ul>
          )}

          {q.type === "TF" && (
            <div className="flex gap-2">
              {["True", "False"].map((opt) => {
                const selected = normalizeTF(user) === opt;
                const correct = normalizeTF(q.answer) === opt;
                return (
                  <span
                    key={opt}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      correct
                        ? "bg-emerald-100 text-emerald-700"
                        : selected
                        ? "bg-rose-100 text-rose-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {opt}
                    {correct && " ✓"}
                    {selected && !correct && " (your answer)"}
                  </span>
                );
              })}
            </div>
          )}

          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Solution</div>
            <div className="mt-1 text-slate-800">
              <span className="font-semibold">Answer: </span>
              {q.type === "TF" ? normalizeTF(q.answer) : correctLetter}
              {q.type === "MC" && (
                <span className="text-slate-600">
                  {" — "}
                  {q.options.find((o) => letterOf(o) === correctLetter)?.replace(/^\s*[A-Za-z]\)\s*/, "")}
                </span>
              )}
            </div>
            <div className="mt-2 text-slate-700">{q.explanation}</div>
            <div className="mt-2 text-[11px] uppercase tracking-wider text-slate-400">
              {q.source} · {q.concept}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
