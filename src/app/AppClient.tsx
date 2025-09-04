"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // install with: npm install framer-motion

type Candidate = { name: string; skills: string[]; score: number };

const mockCandidates: Candidate[] = [
  { name: "Alice Johnson", skills: ["React", "Node.js", "SQL"], score: 0 },
  { name: "Mark Patel", skills: ["Python", "Machine Learning", "Data Science"], score: 0 },
  { name: "Sara Wong", skills: ["Recruitment", "HR Tech", "Payroll"], score: 0 },
  { name: "David Kim", skills: ["TypeScript", "Next.js", "Postgres"], score: 0 },
];

function calculateScore(requirements: string, candidate: Candidate): number {
  const reqs = requirements.toLowerCase().split(/[\s,]+/);
  let score = 0;
  reqs.forEach((r) => {
    if (candidate.skills.some((s) => s.toLowerCase().includes(r))) {
      score += 20;
    }
  });
  return Math.min(score, 100);
}

export default function AppClient() {
  const [requirements, setRequirements] = useState("");
  const [shortlist, setShortlist] = useState<Candidate[]>([]);

  function handleShortlist() {
    const ranked = mockCandidates
      .map((c) => ({ ...c, score: calculateScore(requirements, c) }))
      .sort((a, b) => b.score - a.score);
    setShortlist(ranked);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-slate-800">
      {/* Navbar */}
      <nav className="border-b bg-white/80 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold text-indigo-700">AI Talent Matching Demo</div>
          <a
            href="mailto:nraoml77@gmail.com?subject=AI Recruiting Platform Demo"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
          >
            Schedule a Call
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold leading-tight">
            Recruit Smarter with <span className="text-indigo-600">AI Shortlisting</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Instead of scanning hundreds of profiles, let AI generate a ranked shortlist of the
            best-fit candidates. This demo shows how Owow Talents could use AI for faster, better hiring.
          </p>
        </header>

        {/* Interactive Section */}
        <section className="bg-white shadow-md rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-4">Try it out</h2>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full border rounded-md p-3 text-sm"
            placeholder="Enter role requirements, e.g. React, SQL, Node.js"
            rows={3}
          />
          <button
            onClick={handleShortlist}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Generate Shortlist
          </button>

          {shortlist.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Ranked Candidates:</h3>
              <ul className="space-y-4">
                {shortlist.map((c, i) => (
                  <li key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-sm text-slate-600">
                          Skills: {c.skills.join(", ")}
                        </div>
                      </div>
                      <div className="text-indigo-600 font-bold">{c.score}%</div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-indigo-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${c.score}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Call-to-action */}
        <section className="text-center">
          <h2 className="text-2xl font-bold">Want to see this in production?</h2>
          <p className="text-slate-600 mt-2">
             AI-powered recruiting pipeline — from sourcing to payroll.
          </p>
          <a
            href="mailto:nraoml77@gmail.com?subject=AI Recruiting Platform Demo"
            className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Schedule a Call
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-slate-500 text-sm py-6">
        © {new Date().getFullYear()} AI Talent Matching Demo
      </footer>
    </div>
  );
}

