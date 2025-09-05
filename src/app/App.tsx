// src/app/App.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type Message = { role: "ai" | "user"; text: string };

const cannedReplies = [
  {
    q: /what can you build|what do you build|what can you do/i,
    a: "I build data-heavy, AI-enabled hiring products: sourcing engines, rankers, interview tooling, payroll flows, and analytics.",
  },
  {
    q: /owow|talents|recruit|hire|payroll/i,
    a: "For Owow Talents: I can ship a sourcing→payroll MVP in weeks—candidate parsers, embeddings, shortlisting, scorecards, and payout automations.",
  },
  {
    q: /stack|tech/i,
    a: "Typical stack: Next.js + Tailwind, Node/Python backend, Postgres, Redis, Docker. Optionally LLM integrations for ranking and screening.",
  },
  {
    q: /contact|interview|schedule|calendar/i,
    a: "Click 'Schedule Interview' to email me (or replace mailto in the code with your calendly).",
  },
];

function isFromOwow(): boolean {
  try {
    const ref = typeof window !== "undefined" ? document.referrer : "";
    const qp = typeof window !== "undefined" ? new URLSearchParams(location.search) : new URLSearchParams();
    return /linkedin\.com\/company\/owow-talents/i.test(ref) || /owow/i.test(qp.get("from") || "");
  } catch {
    return false;
  }
}

export default function AppClient() {
  const [personalized, setPersonalized] = useState(false);

  // Tiny on-page AI chat history
  const [history, setHistory] = useState<Message[]>([
    { role: "ai", text: "Hey! I’m your on-page AI. Ask me how I’ll help Owow Talents hire faster." },
  ]);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    setPersonalized(isFromOwow());
  }, []);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Interview request – AI Recruiting Platform Builder");
    const body = encodeURIComponent(
      `Hi Owow Talents,\n\nI saw your company and would like to schedule an interview about building your AI recruiting platform.\n\n— Nammy`
    );
    return `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  }, []);

  function sendMessage() {
    if (!msg.trim()) return;
    const userMsg: Message = { role: "user", text: msg.trim() };
    const match = cannedReplies.find((r) => r.q.test(msg));
    const aiText = match ? match.a : "Nice question — I’d ship a shortlist ranker, structured interview rubrics, and an offer workflow. Ask about architecture or timeline.";
    const aiMsg: Message = { role: "ai", text: aiText };
    setHistory((h) => [...h, userMsg, aiMsg]);
    setMsg("");
  }

  const pipeline = [
    { step: "Source", desc: "Search public profiles, repos & job boards; build skills embeddings." },
    { step: "Screen", desc: "Asynchronous code screens + LLM-assisted signal extraction." },
    { step: "Interview", desc: "Structured rubrics and live/async interview flows." },
    { step: "Offer", desc: "Geo-aware comp bands & automated offer generation." },
    { step: "Payroll", desc: "Global onboarding, invoices, and payouts." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <nav className="border-b bg-white/80 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Hire Nammy — AI Recruiting Demo</div>
          <div>
            <a
              href={mailto}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Schedule Interview
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* HERO */}
        <header className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-3">
              {personalized ? (
                <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  Tailored for Owow Talents
                </span>
              ) : (
i                <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm">
                  AI Recruiting Demo
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              Ship an <span className="underline decoration-indigo-400">AI-powered</span> recruiting platform that moves hires, not pixels.
            </h1>
            <p className="mt-4 text-slate-600">
              Outcome-driven engineering for sourcing, screening, structured interviews, offers and global payroll.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={mailto} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                Schedule Interview
              </a>
              <a href="#demo" className="px-4 py-2 border rounded-md">
                See Live Demo
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 shadow-sm">
            <div className="font-medium">"We are building an AI powered tech platform to Recruit, Hire and Manage talents anywhere on earth."</div>
            <div className="text-sm text-slate-600 mt-2">From sourcing to global payroll — I’ll help you ship it.</div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="p-3 bg-white rounded">+60% faster shortlist</div>
              <div className="p-3 bg-white rounded">↓ time-to-hire</div>
              <div className="p-3 bg-white rounded">Global-ready</div>
              <div className="p-3 bg-white rounded">Privacy-minded</div>
            </div>
          </div>
        </header>

        {/* DEMO */}
        <section id="demo" className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-6 rounded-xl border bg-white">
              <h3 className="font-semibold mb-3">Sourcing → Payroll pipeline</h3>
              <ol className="list-decimal pl-5 text-slate-700 space-y-2">
                {pipeline.map((p, i) => (
                  <li key={i}>
                    <strong>{p.step}:</strong> <span className="text-slate-600">{p.desc}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-6 rounded-xl border bg-white">
              <h3 className="font-semibold mb-3">Relevant projects</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm">
                <li>Talent Ranker — parsed 50k+ profiles; skills embeddings & ranker.</li>
                <li>Interview Engine — LLM question generation, async code screens.</li>
                <li>Global Payroll — contract templates, automated payouts & receipts.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            {/* Tiny AI assistant */}
            <div className="p-4 rounded-xl border bg-white">
              <h3 className="font-semibold mb-3">On-page assistant</h3>
              <div className="h-48 overflow-auto p-2 bg-slate-50 rounded">
                {history.map((m, i) => (
                  <div key={i} className={`mb-2 ${m.role === "ai" ? "text-left" : "text-right"}`}>
                    <div className={`inline-block px-3 py-2 rounded-lg ${m.role === "ai" ? "bg-white" : "bg-indigo-600 text-white"}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Ask about stack, roadmap, or results"
                />
                <button onClick={sendMessage} className="px-4 py-2 bg-indigo-600 text-white rounded">
                  Send
                </button>
              </div>
              <div className="text-xs text-slate-500 mt-2">Demo only — answers are canned. Replace with real LLM later if needed.</div>
            </div>

            <div className="p-4 rounded-xl border bg-white text-sm text-slate-600">
              Hiring velocity (demo): as sourcing & interviews automate, hires increase.
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-fuchsia-50 border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-slate-600">Available for full-time • Austin, TX or remote</div>
              <h3 className="text-2xl font-bold mt-1">Let’s build Owow’s AI recruiting platform</h3>
              <div className="text-slate-600 mt-2 text-sm">From sourcing to global payroll — covered. I’ll walk through architecture and a 30-day plan.</div>
            </div>
            <div className="flex gap-3">
              <a href={mailto} className="px-4 py-2 bg-indigo-600 text-white rounded">Schedule Interview</a>
              <a href="#demo" className="px-4 py-2 border rounded">See Demo</a>
            </div>
          </div>
        </section>

        <footer className="mt-8 text-sm text-slate-500">
          <div className="flex justify-between items-center">
            <div>Built with Next.js & Tailwind</div>
            <div>© {new Date().getFullYear()} Nammy — Demo only, not affiliated with Owow Talents.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

