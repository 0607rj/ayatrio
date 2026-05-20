"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ChartersInterviewAi from "@/components/home/Chartersinterview_ai";

type Option = {
  label: string;
  description?: string;
  score: number;
};

type Question = {
  id: string;
  number: string;
  title: string;
  options: Option[];
};

type Step = {
  label: string;
  sideTitle: string;
  sideText: string;
  title: string;
  questions: Question[];
};

const steps: Step[] = [
  {
    label: "01 · START",
    sideTitle: "Your AI Career Report",
    sideText:
      "Answer a few questions. Get a personalised report showing exactly where you stand — and what to do next.",
    title: "What's your current background?",
    questions: [
      {
        id: "background",
        number: "01",
        title: "Choose what best describes you right now.",
        options: [
          {
            label: "Non-Tech / Career Switcher",
            description: "Looking to transition into tech from a non-technical background.",
            score: 8,
          },
          {
            label: "Software, Data & AI Professional",
            description: "Working in software, data, ML, AI, or DevOps — and looking to grow.",
            score: 16,
          },
        ],
      },
    ],
  },
  {
    label: "STEP 1 OF 4 · YOUR PROFILE",
    sideTitle: "Why we ask",
    sideText: "Your role shapes every gap, recommendation, and roadmap in your report.",
    title: "Tell us about your current role",
    questions: [
      {
        id: "role",
        number: "02",
        title: "What's your current role in the tech world?",
        options: [
          { label: "Software Engineer – Product Company", score: 18 },
          { label: "Software Engineer – Service Company", score: 14 },
          { label: "DevOps / Cloud / Infrastructure Engineer", score: 15 },
          { label: "QA / Support / Other Technical Role", score: 10 },
        ],
      },
      {
        id: "experience",
        number: "03",
        title: "How many years have you been in the tech industry?",
        options: [
          { label: "0–2 years", score: 8 },
          { label: "2–3 years", score: 12 },
          { label: "3–5 years", score: 16 },
          { label: "5–8 years", score: 20 },
          { label: "8+ years", score: 22 },
        ],
      },
      {
        id: "learning",
        number: "04",
        title: "Where are you currently investing most of your learning time?",
        options: [
          { label: "Full-stack development", score: 14 },
          { label: "AI / ML tools", score: 18 },
          { label: "DSA and problem solving", score: 16 },
          { label: "System design", score: 17 },
          { label: "Cloud / DevOps", score: 13 },
        ],
      },
    ],
  },
  {
    label: "STEP 2 OF 4 · YOUR ASPIRATIONS",
    sideTitle: "Why we ask",
    sideText: "Your goal shapes the exact roadmap, target skills, and recommended next moves.",
    title: "Where do you want to go?",
    questions: [
      {
        id: "goal",
        number: "05",
        title: "What's your main career goal right now?",
        options: [
          { label: "Move to a better company", score: 15 },
          { label: "Level up / promotion", score: 16 },
          { label: "Higher compensation", score: 14 },
          { label: "Switch to different tech domain", score: 12 },
          { label: "Upskilling in current role", score: 13 },
        ],
      },
      {
        id: "dreamRole",
        number: "06",
        title: "What's your dream role?",
        options: [
          { label: "Senior Backend Engineer", score: 16 },
          { label: "Senior Full-Stack Engineer", score: 18 },
          { label: "Backend / API Engineer", score: 14 },
          { label: "Full-Stack Engineer", score: 15 },
          { label: "Data Science Engineer", score: 17 },
          { label: "DevOps Engineer", score: 13 },
        ],
      },
    ],
  },
  {
    label: "STEP 3 OF 4 · AI FLUENCY",
    sideTitle: "Why we ask",
    sideText: "AI fluency now separates average profiles from high-impact profiles.",
    title: "How are you working with AI?",
    questions: [
      {
        id: "aiUsage",
        number: "07",
        title: "How does AI show up in your day-to-day work?",
        options: [
          { label: "I build agents or AI-powered features", score: 25 },
          { label: "I use Cursor / Copilot daily", score: 20 },
          { label: "I use it for specific tasks", score: 14 },
          { label: "Only when stuck", score: 9 },
          { label: "Haven't integrated AI into workflow yet", score: 5 },
        ],
      },
      {
        id: "aiBuilt",
        number: "08",
        title: "What have you actually built or shipped using AI?",
        options: [
          { label: "A production feature is live", score: 24 },
          { label: "Internal tool or side project using LLM API", score: 19 },
          { label: "Experimented with prompts/scripts only", score: 11 },
          { label: "Haven't built anything with AI yet", score: 5 },
        ],
      },
    ],
  },
  {
    label: "STEP 4 OF 4 · FUNDAMENTALS",
    sideTitle: "Why we ask",
    sideText: "Fundamentals are still what separate candidates in the final round.",
    title: "Where do you stand today?",
    questions: [
      {
        id: "coding",
        number: "09",
        title: "How much have you been practicing coding problems recently?",
        options: [
          { label: "Very Active (100+ problems)", score: 22 },
          { label: "Moderately Active (50–100 problems)", score: 17 },
          { label: "Somewhat Active (10–50 problems)", score: 11 },
          { label: "Not Active (0–10 problems)", score: 4 },
        ],
      },
      {
        id: "systemDesign",
        number: "10",
        title: "How comfortable are you with system design?",
        options: [
          { label: "Led design discussions", score: 20 },
          { label: "Participated in discussions", score: 15 },
          { label: "Self-learning only", score: 10 },
          { label: "Not yet, will learn", score: 5 },
        ],
      },
      {
        id: "github",
        number: "11",
        title: "How active is your GitHub / GitLab profile?",
        options: [
          { label: "Strong deployed projects", score: 18 },
          { label: "Some projects uploaded", score: 12 },
          { label: "Basic profile only", score: 7 },
          { label: "Not active yet", score: 3 },
        ],
      },
    ],
  },
];

export default function CareerPathPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [showReport, setShowReport] = useState(false);

  const current = steps[step];
  const allCurrentAnswered = current.questions.every((q) => answers[q.id]);

  const score = useMemo(() => {
    const selected = Object.values(answers);
    const raw = selected.reduce((sum, item) => sum + item.score, 0);
    const maxPossible = 204;
    return Math.max(12, Math.min(100, Math.round((raw / maxPossible) * 100)));
  }, [answers]);

  const selectOption = (questionId: string, option: Option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (!allCurrentAnswered) return;
    if (step === steps.length - 1) {
      setShowReport(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (showReport) { setShowReport(false); return; }
    if (step > 0) setStep((prev) => prev - 1);
  };

  if (showReport) {
    return <ReportPage score={score} answers={answers} />;
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-[#fff7f9] text-[#1f2937] overflow-hidden">
      <div className="h-screen flex">
        {/* LEFT SIDE PANEL */}
        <aside className="w-[360px] shrink-0 bg-[#B30437] text-white flex flex-col justify-between px-8 py-8">
          <div>
            <img
              src="/charters-logo.png"
              alt="Charters Business"
              className="h-14 w-auto object-contain bg-white rounded-sm p-1"
            />
            <div className="mt-12">
              <p className="text-xs tracking-[0.32em] uppercase text-white/70">
                Step {step + 1} of {steps.length}
              </p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full ${index <= step ? "bg-white" : "bg-white/25"}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-12 border border-white/20 bg-white/10 rounded-xl p-6">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-5">
                {current.sideTitle}
              </p>
              <p className="text-xl font-bold leading-relaxed">{current.sideText}</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full border border-white/30 py-4 rounded-xl font-bold hover:bg-white hover:text-[#B30437] transition"
            >
              Back to Home
            </button>
            <p className="mt-8 text-xs tracking-[0.3em] uppercase text-white/50">Alumni working at</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Razorpay", "Swiggy", "PhonePe", "Uber", "CRED", "Google", "Amazon", "Flipkart"].map((item) => (
                <span key={item} className="bg-white/10 border border-white/10 px-3 py-2 text-sm rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 min-w-0 flex flex-col bg-white">
          <header className="h-20 shrink-0 border-b border-pink-100 bg-white flex items-center justify-between px-10">
            <div>
              <p className="text-[#B30437] text-xs font-bold tracking-[0.28em] uppercase">{current.label}</p>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className="text-sm font-bold text-[#B30437] border border-[#B30437] rounded-full px-5 py-2 hover:bg-[#B30437] hover:text-white transition"
            >
              Exit
            </button>
          </header>
          {/* Breadcrumb bar */}
          <div className="shrink-0 border-b border-pink-100 bg-white px-10 py-2 flex items-center gap-1 text-xs text-gray-400">
            <a href="/" className="hover:text-[#B30437] transition-colors font-medium">Home</a>
            <span>{'>'}</span>
            <span className="text-gray-700 font-semibold">Career Path</span>
          </div>

          <section className="flex-1 overflow-y-auto px-10 lg:px-16 py-10 pb-32">
            <div className="max-w-5xl">
              <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-10 text-[#1f2937]">
                {current.title}
              </h1>
              <div className="space-y-12">
                {current.questions.map((question) => (
                  <div key={question.id}>
                    <h2 className="text-lg font-bold mb-5">
                      <span className="text-pink-300 mr-2">{question.number}</span>
                      {question.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option) => {
                        const selected = answers[question.id]?.label === option.label;
                        return (
                          <button
                            key={option.label}
                            onClick={() => selectOption(question.id, option)}
                            className={`min-h-[92px] text-left border px-7 py-5 rounded-xl transition-all ${
                              selected
                                ? "bg-[#B30437] border-[#B30437] text-white shadow-md"
                                : "bg-white border-pink-100 hover:border-[#B30437] hover:shadow-sm"
                            }`}
                          >
                            <p className="text-lg font-bold">{option.label}</p>
                            {option.description && (
                              <p className={`mt-2 text-sm leading-relaxed ${selected ? "text-white/80" : "text-gray-500"}`}>
                                {option.description}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="h-24 shrink-0 border-t border-pink-100 bg-white flex items-center justify-between px-10 lg:px-16">
            <p className="text-gray-400 font-medium">Step {step + 1} of {steps.length}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="h-12 w-14 border border-pink-100 text-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-50 rounded-lg"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                disabled={!allCurrentAnswered}
                className="h-12 px-9 bg-[#B30437] text-white font-extrabold disabled:bg-pink-200 disabled:cursor-not-allowed hover:bg-[#8B0329] rounded-lg transition"
              >
                {step === steps.length - 1 ? "SEE MY REPORT →" : "CONTINUE →"}
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  REPORT PAGE                                                */
/* ─────────────────────────────────────────────────────────── */

function ReportPage({ score, answers }: { score: number; answers: Record<string, Option> }) {
  const [showLogin, setShowLogin] = useState(false);
  const level = score >= 75 ? "Advanced" : score >= 50 ? "Growing Fast" : "Beginner";

  useEffect(() => {
    document.body.style.overflow = "";

    const fixPage = () => {
    
    // make header pure white
    document
      .querySelectorAll<HTMLElement>("header, [class*='Header'], [class*='navbar'], [class*='Navbar']")
      .forEach((el) => {
        el.style.background = "#ffffff";
        el.style.backgroundColor = "#ffffff";
      });

    // push chatbot above bottom bar
    document
      .querySelectorAll<HTMLElement>(
        "#fc_frame, #freshworks-container, #hubspot-messages-iframe-container, .intercom-lightweight-app, .crisp-client, iframe[src*='chat'], iframe[title*='chat'], iframe[title*='Chat']"
      )
      .forEach((el) => {
        el.style.setProperty("bottom", "95px", "important");
        el.style.setProperty("z-index", "999999", "important");
      });
  };

  fixPage();

  const interval = setInterval(fixPage, 500);

  return () => {
    clearInterval(interval);
  };
}, []);

  /* SVG arc gauge helpers */
  const R = 70;
  const cx = 90;
  const cy = 90;
  const startAngle = -220;
  const endAngle = 40;
  const totalDeg = endAngle - startAngle;
  const filledDeg = (score / 100) * totalDeg;

  function polar(angle: number, r: number) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arcPath(from: number, to: number, r: number) {
    const s = polar(from, r);
    const e = polar(to, r);
    const large = to - from > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  const bgPath = arcPath(startAngle, endAngle, R);
  const fillPath = arcPath(startAngle, startAngle + filledDeg, R);

  return (
    <>
      <style>{`
        @keyframes drift {
          0%   { transform: translateX(0) translateY(0); }
          50%  { transform: translateX(40px) translateY(-20px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes drift2 {
          0%   { transform: translateX(0) translateY(0); }
          50%  { transform: translateX(-30px) translateY(30px); }
          100% { transform: translateX(0) translateY(0); }
        }
        .line-anim { animation: drift 18s ease-in-out infinite; }
        .line-anim2 { animation: drift2 22s ease-in-out infinite; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }

        /* header pure white */
        header,
        [class*="Header"],
        [class*="navbar"],
        [class*="Navbar"] {
          background: #ffffff !important;
          background-color: #ffffff !important;
        }

        /* chatbot above bottom footer */
        #hubspot-messages-iframe-container,
        #fc_frame,
        #freshworks-container,
        .intercom-lightweight-app,
        .crisp-client,
        iframe[src*="chat"],
        iframe[title*="chat"],
        iframe[title*="Chat"] {
          bottom: 95px !important;
          z-index: 999999 !important;
        }
      `}</style>

      <div className="min-h-screen bg-white text-[#1f2937] font-sans">
        <div className="shrink-0 border-b border-pink-100 bg-white px-10 py-2 flex items-center gap-1 text-xs text-gray-400">
          <a href="/" className="hover:text-[#B30437] transition-colors font-medium">Home</a>
          <span>{'>'}</span>
          <span className="text-gray-700 font-semibold">Career Path</span>
        </div>
        {/* ── HERO — lighter rose with animated diagonal lines ── */}
        <div className="bg-white border-b border-pink-100 px-10 py-2 flex items-center gap-1 text-xs text-gray-400">
          <a href="/" className="hover:text-[#B30437] transition-colors font-medium">Home</a>
          <span>{'>'}</span>
          <span className="text-gray-700 font-semibold">Career Path</span>
        </div>
        <section className="relative overflow-hidden bg-[#b5174e] text-white">
          {/* Animated line background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                <line x1="0" y1="0" x2="0" y2="60" stroke="#ff4d6d" strokeWidth="0.5" strokeOpacity="0.22" />
                <line x1="0" y1="0" x2="60" y2="0" stroke="#ff4d6d" strokeWidth="0.5" strokeOpacity="0.22" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="line-anim" />
            {/* Additional diagonal accent lines */}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1={`${i * 14 - 5}%`} y1="0%"
                x2={`${i * 14 + 30}%`} y2="100%"
                stroke="#ff4d6d"
                strokeWidth="0.6"
                strokeOpacity={0.08 + i * 0.01}
                className="line-anim2"
              />
            ))}
          </svg>

          <div className="relative max-w-7xl mx-auto px-8 lg:px-20 py-24 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div>
              <p className="text-pink-400/70 tracking-[0.28em] text-xs font-bold uppercase fade-up-1">
                Career Profile Evaluation · Apr 2026
              </p>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.05] mt-5 fade-up-2">
                Become an<br />
                <span className="text-pink-400">AI-Powered<br />10× Engineer.</span>
              </h1>
              <p className="text-white/60 text-lg mt-6 max-w-lg fade-up-3">
                Your profile. The AI shifts you can't ignore. The fastest path to hired.
              </p>
              <button
                onClick={() => { setShowLogin(true); document.body.style.overflow = "hidden"; }}
                className="mt-8 bg-white text-[#B30437] px-8 py-4 font-extrabold rounded-xl hover:bg-pink-50 transition flex items-center gap-3 fade-up-4"
              >
                📞 BOOK FREE 1:1 CAREER CALL
              </button>
              <p className="mt-3 text-white/30 text-xs tracking-[0.2em] uppercase fade-up-4">
                30 Min · Free · Senior Counsellor
              </p>
              <div className="mt-8 flex items-center gap-6 text-white/40 text-xs tracking-[0.18em] uppercase border-t border-white/10 pt-6 fade-up-4">
                <span>4 Min Read</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>6 Chapters</span>
              </div>
            </div>

            {/* Right — Score Gauge */}
            <div className="flex flex-col items-center gap-4 fade-up-3">
              <svg width="180" height="180" viewBox="0 0 180 180">
                {/* Track */}
                <path d={bgPath} fill="none" stroke="#ffffff15" strokeWidth="10" strokeLinecap="round" />
                {/* Fill */}
                <path d={fillPath} fill="none" stroke="#ff4d6d" strokeWidth="10" strokeLinecap="round" />
                {/* Score text */}
                <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="32" fontWeight="800">
                  {score}
                </text>
                <text x={cx} y={cy + 16} textAnchor="middle" fill="#ffffff60" fontSize="11">
                  out of 100
                </text>
              </svg>
              <div className="border border-pink-400/40 text-pink-300 text-xs tracking-[0.22em] px-5 py-2 rounded-full uppercase font-bold">
                Career & AI Readiness
              </div>
              <p className="text-white/50 text-sm text-center max-w-xs">
                Your current readiness score is{" "}
                <span className="text-white font-bold">{score}/100</span>. Level: {level}
              </p>
            </div>
          </div>
        </section>

        {/* ── 02 · THE 10× ENGINEER ── */}
        <section className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
          <p className="text-[#B30437] tracking-[0.25em] text-xs font-bold uppercase">02 · The 10× Engineer</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold mt-5 max-w-4xl leading-tight">
            What an AI-powered full-stack engineer actually looks like.
          </h2>
          <p className="text-gray-500 text-lg mt-3">
            Not a unicorn. A real engineer who uses AI as leverage every single day.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mt-14">
            {/* Feature lines */}
            <div className="space-y-0">
              {[
                { n: "01", bold: "Uses AI coding agents end-to-end", rest: " — catches hallucinated props, broken API contracts, and XSS vectors before they ship." },
                { n: "02", bold: "Reviews AI-generated code critically", rest: " — catches issues before shipping." },
                { n: "03", bold: "Ships AI-integrated features", rest: ": smart search, AI-powered forms, real-time content generation across the stack." },
                { n: "04", bold: "Designs full-stack systems with AI built in", rest: " — streaming responses, edge inference, and client-side ML from the start." },
                { n: "05", bold: "Answers \"how would AI change your architecture?\"", rest: " in interviews without hesitation." },
              ].map(({ n, bold, rest }) => (
                <div key={n} className="flex gap-6 border-b border-pink-100 py-5">
                  <span className="text-2xl text-pink-200 font-bold shrink-0 w-8">{n}</span>
                  <p className="text-base text-gray-700 leading-relaxed">
                    <strong>{bold}</strong>{rest}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats cards */}
            <div className="space-y-5">
              <div className="bg-[#fff7f9] border border-pink-100 rounded-2xl p-8">
                <p className="text-[#B30437] text-xs tracking-[0.25em] font-bold uppercase">AI in job postings</p>
                <h3 className="text-5xl font-extrabold mt-4 text-[#1f2937]">4× growth</h3>
                <p className="text-gray-500 mt-2">in job postings mentioning generative AI skills — since 2023</p>
                <div className="mt-6 space-y-3">
                  {[
                    { label: "2022", w: "25%", active: false },
                    { label: "2023", w: "50%", active: false },
                    { label: "2024", w: "75%", active: false },
                    { label: "2025", w: "100%", active: true },
                  ].map(({ label, w, active }) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className="w-10 text-sm text-gray-400">{label}</span>
                      <div className="flex-1 h-2.5 bg-pink-100 rounded-full">
                        <div className={`h-full rounded-full ${active ? "bg-[#B30437]" : "bg-pink-300"}`} style={{ width: w }} />
                      </div>
                      <span className="text-xs text-gray-400">{active ? "4×" : ""}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#fff7f9] border border-pink-100 rounded-2xl p-8">
                <p className="text-5xl font-extrabold text-[#B30437]">66%</p>
                <p className="text-gray-600 mt-2">of hiring managers won't hire engineers without demonstrated AI skills</p>
                <p className="text-xs text-gray-400 mt-3">LinkedIn Work Trend Index, 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · WHERE YOU STAND ── */}
        <section className="bg-[#fff7f9] border-y border-pink-100">
          <div className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
            <p className="text-[#B30437] tracking-[0.25em] text-xs font-bold uppercase">03 · Where You Stand</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold mt-5">Your strengths. Your gaps. No spin.</h2>
            <p className="text-gray-500 text-lg mt-3">Based on what you've shipped, your DSA depth, and how you use AI today.</p>

            <div className="grid lg:grid-cols-2 gap-8 mt-12">
              <div className="bg-white border border-green-200 rounded-2xl p-8">
                <h3 className="text-green-700 tracking-[0.2em] text-xs font-bold uppercase border-b border-green-100 pb-4 mb-6">
                  ✅ Your Strengths
                </h3>
                <div className="space-y-4">
                  {[
                    "Good problem-solving mindset",
                    answers.role?.label || "Strong learning intent",
                    answers.aiUsage?.label || "Interest in AI tools",
                    answers.dreamRole?.label ? `Goal clarity: ${answers.dreamRole.label}` : "Clear career direction",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      <p className="font-semibold text-gray-800">{t}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-pink-100 rounded-2xl p-8">
                <h3 className="text-[#B30437] tracking-[0.2em] text-xs font-bold uppercase border-b border-pink-100 pb-4 mb-6">
                  ❌ Areas to Improve
                </h3>
                <div className="space-y-4">
                  {[
                    "More production-level full-stack projects",
                    "Better GitHub, README and portfolio presentation",
                    "Interview preparation for product companies",
                    "Deeper AI fluency and hands-on AI project work",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <span className="text-[#B30437] mt-0.5 shrink-0">✗</span>
                      <p className="font-semibold text-gray-800">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 · TWO PATHS ── */}
        <section className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
          <p className="text-[#B30437] tracking-[0.25em] text-xs font-bold uppercase">04 · Two Paths Forward</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold mt-5">Two paths to close your gaps.</h2>
          <p className="text-gray-500 text-lg mt-3">One is free. One is faster. Both work.</p>

          <div className="grid lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Full-Stack Architecture", desc: "Master end-to-end application design from frontend to backend.", tag: "Free Path" },
              { title: "React Advanced Patterns", desc: "Level up your React skills with production-grade patterns.", tag: "Free Path" },
              { title: "System Design Fundamentals", desc: "Learn how to design scalable systems for senior roles.", tag: "Free Path" },
            ].map(({ title, desc, tag }) => (
              <div key={title} className="bg-white border border-pink-100 p-7 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-300 transition">
                <p className="text-[#B30437] tracking-[0.2em] text-xs font-bold uppercase">{tag}</p>
                <h3 className="text-xl font-extrabold mt-4">{title}</h3>
                <p className="text-gray-500 mt-3 text-sm">{desc}</p>
                <p className="mt-6 font-bold text-[#B30437]">Start Learning →</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 05 · CAREER TIMELINE ── */}
        <section className="bg-[#fff7f9] border-y border-pink-100">
          <div className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
            <p className="text-[#B30437] tracking-[0.25em] text-xs font-bold uppercase">05 · Career Timeline</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold mt-5 max-w-5xl leading-tight">
              Realistic timelines to achieve your target roles based on current skill gaps
            </h2>

            <div className="grid lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  tag: "Your Target Role",
                  title: "Senior Full-Stack Engineer @ Product Co.",
                  time: "10–12 months",
                  highlight: true,
                  steps: ["Month 1–2: Deep technical preparation", "Month 3–4: Build portfolio projects", "Month 5+: Interview readiness"],
                },
                {
                  tag: "Easier Path",
                  title: "Senior Full-Stack Engineer @ Service Co.",
                  time: "8–10 months",
                  highlight: false,
                  steps: ["Month 1–2: Strengthen core skills", "Month 3: Interview preparation", "Month 4+: Apply and negotiate"],
                },
                {
                  tag: "Alternative Path",
                  title: "Senior Backend Engineer @ FAANG",
                  time: "11–13 months",
                  highlight: false,
                  steps: ["Month 1–2: System fundamentals", "Month 3–4: Backend projects", "Month 5+: Deep interview prep"],
                },
              ].map(({ tag, title, time, highlight, steps }) => (
                <div
                  key={title}
                  className={`bg-white rounded-2xl p-7 ${highlight ? "border-2 border-[#B30437] shadow-md" : "border border-pink-100 shadow-sm"}`}
                >
                  <p className="text-[#B30437] tracking-[0.2em] text-xs font-bold uppercase">{tag}</p>
                  <h3 className="text-xl font-extrabold mt-4 leading-snug">{title}</h3>
                  <p className="text-[#B30437] font-bold mt-4">{time}</p>
                  <div className="mt-5 space-y-3">
                    {steps.map((s) => (
                      <p key={s} className="font-medium text-sm border-t border-pink-50 pt-3 text-gray-600">{s}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 · STRUCTURED PROGRAM ── */}
        <section className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
          <p className="text-[#B30437] tracking-[0.25em] text-xs font-bold uppercase">Path 02 · Structured · Faster</p>
          <h2 className="text-4xl font-extrabold mt-5 max-w-3xl leading-tight">
            Stop patching gaps alone. Get a system that closes them.
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-3xl">
            Mentorship, projects, mock interviews and a clear roadmap can help you close skill gaps faster.
          </p>

          <div className="grid lg:grid-cols-[0.9fr_1.3fr] mt-12 border border-pink-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#B30437] text-white p-10">
              <p className="tracking-[0.25em] text-xs text-white/50 uppercase">For builders</p>
              <h3 className="text-3xl font-extrabold mt-6 leading-snug">
                Modern Software & AI Engineering
              </h3>
              <p className="text-white/70 mt-5 text-sm leading-relaxed">
                A structured path for early-career engineers to build strong fundamentals and ship AI-powered projects.
              </p>
              <div className="mt-8 flex gap-6 text-white/80 text-sm font-bold">
                <div>
                  <p className="text-3xl font-extrabold text-white">4.8+</p>
                  <p className="text-white/50 text-xs mt-1">(25K+ Ratings)</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-white">12</p>
                  <p className="text-white/50 text-xs mt-1">Months</p>
                </div>
              </div>
            </div>
            <div className="bg-[#fff7f9] p-10 space-y-7">
              {[
                { n: "01", t: "Strong engineering fundamentals — DSA, system design and backend architecture." },
                { n: "02", t: "AI woven into projects, assignments and problem-solving practice." },
                { n: "03", t: "Specialisation in Generative AI — build, evaluate and ship AI systems." },
              ].map(({ n, t }) => (
                <div key={n} className="flex gap-5">
                  <span className="text-xl font-bold text-[#B30437] shrink-0">{n}</span>
                  <p className="text-lg font-semibold text-gray-800">{t}</p>
                </div>
              ))}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => { setShowLogin(true); document.body.style.overflow = "hidden"; }}
                  className="bg-[#B30437] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#8B0329] transition text-sm"
                >
                  GO TO PROGRAM PAGE →
                </button>
                <button className="border border-[#B30437] text-[#B30437] px-6 py-3 rounded-xl font-bold hover:bg-pink-50 transition text-sm">
                  DOWNLOAD CURRICULUM
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 07 · AI TOOLS ── */}
        <section className="bg-[#fff7f9] border-y border-pink-100">
          <div className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
            <p className="text-[#B30437] tracking-[0.25em] text-xs font-bold uppercase">07 · Tools That 10× You</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold mt-5">
              9 tools that separate the 10× engineer from the rest.
            </h2>
            <p className="text-gray-500 text-lg mt-3">All have free tiers. Start using them this week.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12 border border-pink-100 rounded-2xl overflow-hidden">
              {[
                { icon: "⚙️", name: "GitHub Copilot", tag: "Code 2× Faster", desc: "Inline completions. ~45 min saved per feature." },
                { icon: "⚡", name: "Cursor", tag: "AI-Native IDE", desc: "Refactor entire files with a single instruction." },
                { icon: "🤖", name: "ChatGPT + Excalidraw", tag: "System Design", desc: "Brainstorm tradeoffs, sketch architectures." },
                { icon: "🐕", name: "Datadog Watchdog", tag: "Debug Faster", desc: "Auto-links slow endpoints to recent deploys." },
                { icon: "📋", name: "Notion AI", tag: "Round Senior", desc: "Bullet notes → polished RFC in 5 minutes." },
                { icon: "🐰", name: "CodeRabbit", tag: "PR Reviews", desc: "AI reviews PRs before humans see them." },
                { icon: "🔍", name: "Perplexity", tag: "Research", desc: "Cited answers that replace 20 SO tabs." },
                { icon: "▲", name: "v0 / Bolt", tag: "UI Prototypes", desc: "Sketch → working UI in seconds." },
                { icon: "🚀", name: "Warp", tag: "AI Terminal", desc: "Autocompletes shell commands, explains errors." },
              ].map(({ icon, name, tag, desc }, i) => (
                <div
                  key={name}
                  className={`bg-white p-6 flex gap-4 items-start ${
                    i % 3 !== 2 ? "border-r border-pink-100" : ""
                  } ${i < 6 ? "border-b border-pink-100" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-xl shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-800">{name}</p>
                    <p className="text-[#B30437] text-xs tracking-[0.18em] uppercase font-bold mt-0.5">{tag}</p>
                    <p className="text-gray-500 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 08 · PEOPLE LIKE YOU ── */}
        <section className="max-w-7xl mx-auto px-8 lg:px-20 py-20">
          <p className="text-[#B30437] tracking-[0.25em] text-xs font-bold uppercase">08 · People Like You</p>
          <h2 className="text-4xl font-extrabold mt-5">They were exactly where you are. Here&apos;s what changed.</h2>
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {[
              { name: "Subham Soni", role: "Backend Developer at Google", before: "Credit Suisse", after: "Google" },
              { name: "Rishi Prakash", role: "Software Engineer 2 at Microsoft", before: "Accenture", after: "Microsoft" },
            ].map(({ name, role, before, after }) => (
              <div key={name} className="bg-[#fff7f9] border border-pink-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-extrabold">{name}</h3>
                <p className="text-gray-500 mt-1">{role}</p>
                <div className="flex gap-10 mt-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Before</p>
                    <p className="font-bold mt-1">{before}</p>
                  </div>
                  <div className="text-pink-300 text-2xl self-center">→</div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">After</p>
                    <p className="font-bold mt-1 text-[#B30437]">{after}</p>
                  </div>
                </div>
                <p className="italic text-gray-600 mt-6 text-sm">
                  "The right roadmap helped me focus on exactly what mattered."
                </p>
                <p className="text-yellow-500 mt-4">★★★★★</p>
              </div>
            ))}
          </div>
        </section>



        {/* ── STICKY BOTTOM BAR ── */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white text-[#1f2937] py-3 px-6 flex items-center justify-center shadow-[0_-2px_12px_rgba(0,0,0,0.08)] border-t border-gray-200">
          <p className="text-sm font-semibold">
            Talk to us at{" "}
            <span className="text-[#B30437] font-bold">08045579576</span>
            {" "}or{" "}
            <button
              onClick={() => { setShowLogin(true); document.body.style.overflow = "hidden"; }}
              className="text-[#B30437] font-bold underline underline-offset-2 hover:text-[#8B0329] transition"
            >
              Request Callback ↗
            </button>
          </p>
        </div>

        {/* padding for sticky bar */}
        <div className="h-16" />
      </div>

      {/* Login Modal */}
      {showLogin &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-[999999] bg-black/30">
            <div className="w-[80%] h-[90%] relative">
              <button
                onClick={() => { setShowLogin(false); document.body.style.overflow = ""; }}
                className="absolute -top-3 -right-3 z-40 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-600 hover:text-red-500"
              >
                ✕
              </button>
              <div className="w-full h-full overflow-hidden rounded-xl shadow-2xl bg-white">
                <ChartersInterviewAi />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
