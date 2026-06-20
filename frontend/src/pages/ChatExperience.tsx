import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Clipboard,
  Copy,
  FileText,
  MessageSquare,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';
import { api, type RagAnswer } from '../services/api';

type MockBrief = {
  id: string;
  label: string;
  prompt: string;
  match: string[];
  company: string;
  confidence: string;
  tone: 'constructive' | 'watch' | 'cautious';
  blocks: Array<{ title: string; body: string }>;
  followUps: string[];
  sources: string[];
};

const mockBriefs: MockBrief[] = [
  {
    id: 'hdfc-asset-quality',
    label: 'HDFC asset quality',
    prompt: "What changed in HDFC Bank's asset quality this quarter?",
    match: ['hdfc', 'hdfcbank', 'asset quality', 'slippages', 'npa'],
    company: 'HDFC Bank',
    confidence: 'Medium-high',
    tone: 'watch',
    blocks: [
      {
        title: 'Signal',
        body: 'Asset quality looks stable rather than dramatically better. Slippages appear controlled, but the useful read is whether unsecured retail stress stays contained over the next two quarters.',
      },
      {
        title: 'Evidence',
        body: 'Management language stayed disciplined around collections, provisioning, and deposit mobilization. The absence of fresh stress in the corporate book supports the base case.',
      },
      {
        title: 'Risk',
        body: 'Deposit repricing and unsecured retail seasoning can still pressure returns. A clean quarter should raise comfort, not remove the watchlist item.',
      },
    ],
    followUps: [
      'Compare HDFC Bank with ICICI Bank on credit cost.',
      'Which line item should I monitor next quarter?',
      'Summarize the bear case in three bullets.',
    ],
    sources: ['Q4 FY24 earnings call', 'Quarterly exchange filing', 'Annual report provisioning note'],
  },
  {
    id: 'reliance-retail',
    label: 'Reliance retail thesis',
    prompt: "Is Reliance's retail segment reducing earnings cyclicality?",
    match: ['reliance', 'retail', 'cyclicality', 'o2c'],
    company: 'Reliance Industries',
    confidence: 'Medium',
    tone: 'constructive',
    blocks: [
      {
        title: 'Signal',
        body: 'Retail is improving the mix by adding a steadier consumer-facing growth engine beside the more cyclical O2C business.',
      },
      {
        title: 'Evidence',
        body: 'The thesis depends on store productivity, digital commerce traction, and margin discipline. Segment scale is meaningful, but valuation already prices in some execution strength.',
      },
      {
        title: 'Risk',
        body: 'Any slowdown in discretionary consumption or margin pressure from expansion can weaken the diversification argument.',
      },
    ],
    followUps: [
      'What metric proves retail quality?',
      'Compare Reliance retail with DMart.',
      'What would break the bull case?',
    ],
    sources: ['Investor presentation', 'Segment disclosure', 'Annual report management discussion'],
  },
  {
    id: 'it-margin-resilience',
    label: 'TCS vs Infosys',
    prompt: 'Compare TCS and Infosys on margin resilience.',
    match: ['tcs', 'infosys', 'infy', 'margin', 'it services'],
    company: 'TCS / Infosys',
    confidence: 'Medium',
    tone: 'cautious',
    blocks: [
      {
        title: 'Signal',
        body: 'TCS screens as the steadier margin compounder, while Infosys may offer more operating leverage if discretionary demand recovers.',
      },
      {
        title: 'Evidence',
        body: 'The comparison should focus on deal conversion, utilization, pricing discipline, and subcontracting costs rather than headline revenue growth alone.',
      },
      {
        title: 'Risk',
        body: 'A prolonged global spending slowdown can compress both stories. Margin resilience matters most when revenue visibility is low.',
      },
    ],
    followUps: [
      'Which company has better downside protection?',
      'Show the valuation risk for both stocks.',
      'What changed in management commentary?',
    ],
    sources: ['Quarterly results', 'Earnings call transcript', 'Large deal disclosure'],
  },
];

const toneStyles = {
  constructive: 'border-[#6FAF84]/40 text-[#6FAF84] bg-[#6FAF84]/10',
  watch: 'border-cyan/40 text-cyan bg-cyan/10',
  cautious: 'border-[#B86A6A]/40 text-[#B86A6A] bg-[#B86A6A]/10',
};

const hdfcTerms = ['hdfc', 'hdfcbank', 'asset quality', 'deposit', 'deposits', 'npa', 'nim', 'merger', 'slippage'];

const makePrototypeBrief = (question: string): MockBrief => ({
  id: 'prototype-fallback',
  label: 'Prototype brief',
  prompt: question,
  match: [],
  company: 'Research prototype',
  confidence: 'Prototype',
  tone: 'watch',
  blocks: [
    {
      title: 'Signal',
      body: 'This question is not mapped to a dedicated company corpus yet. The production path is ready: add company data, annual-report chunks, metrics, and citations, then route it through the same RAG service used for HDFC Bank.',
    },
    {
      title: 'What exists now',
      body: 'HDFC Bank has the real vertical slice: profile, metrics, risks, report chunks, chart page, citations, and Ollama-backed RAG. Reliance and TCS/Infosys still use curated prototype briefs.',
    },
    {
      title: 'Next build step',
      body: 'To make this answer fully real, create a focused corpus for the company in the question and connect it to the backend dossier and RAG endpoints.',
    },
  ],
  followUps: [
    'Ask about HDFC Bank asset quality.',
    'Open HDFC Bank chart page.',
    'Compare TCS and Infosys margins.',
  ],
  sources: ['Prototype routing layer', 'HDFC Bank RAG vertical slice', 'Curated mock brief library'],
});

const ChatExperience = () => {
  const [input, setInput] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [selectedBrief, setSelectedBrief] = useState<MockBrief | null>(null);
  const [ragAnswer, setRagAnswer] = useState<RagAnswer | null>(null);
  const [ragError, setRagError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'streaming' | 'done'>('idle');
  const [visibleBlocks, setVisibleBlocks] = useState(0);

  const suggestedBriefs = useMemo(() => mockBriefs, []);

  const findBrief = (value: string) => {
    const normalized = value.toLowerCase();
    return mockBriefs.find((brief) => brief.match.some((term) => normalized.includes(term)));
  };

  const isHdfcQuestion = (value: string) => {
    const normalized = value.toLowerCase();
    return hdfcTerms.some((term) => normalized.includes(term));
  };

  const submitQuestion = async (value = input) => {
    const question = value.trim();
    if (!question) return;

    setSubmittedQuestion(question);
    setSelectedBrief(null);
    setRagAnswer(null);
    setRagError(null);
    setHasSubmitted(true);
    setPhase('thinking');
    setVisibleBlocks(0);
    setInput('');

    if (isHdfcQuestion(question)) {
      try {
        const answer = await api.askCompanyRag('hdfcbank', question);
        setRagAnswer(answer);
        setPhase('done');
      } catch (error) {
        setRagError(error instanceof Error ? error.message : 'HDFC RAG is unavailable');
        setSelectedBrief(findBrief(question) ?? makePrototypeBrief(question));
      }
      return;
    }

    setSelectedBrief(findBrief(question) ?? makePrototypeBrief(question));
  };

  const choosePrompt = (brief: MockBrief) => {
    setInput(brief.prompt);
    submitQuestion(brief.prompt);
  };

  useEffect(() => {
    if (!hasSubmitted || !selectedBrief) return;

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase('streaming'), 420));
    selectedBrief.blocks.forEach((_, index) => {
      timers.push(window.setTimeout(() => setVisibleBlocks(index + 1), 760 + index * 520));
    });
    timers.push(window.setTimeout(() => setPhase('done'), 920 + selectedBrief.blocks.length * 520));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [hasSubmitted, selectedBrief]);

  return (
    <div className="mx-auto max-w-6xl pb-16">
      <section className={cn('ambient-stage mb-8 border-b border-white/[0.055] pb-8', hasSubmitted && 'pb-6')}>
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">Copilot</div>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <AnimatePresence mode="wait">
              {!hasSubmitted ? (
                <motion.h1
                  key="greeting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-display text-5xl leading-tight md:text-6xl"
                >
                  Good evening.
                  <br />
                  What would you like to understand today?
                </motion.h1>
              ) : (
                <motion.h1
                  key="working"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-display text-4xl leading-tight md:text-5xl"
                >
                  Building the analyst brief.
                </motion.h1>
              )}
            </AnimatePresence>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
              Ask about a company, management signal, risk, or comparison. The answer appears only after the question is asked.
            </p>
          </div>
          <div className="premium-panel p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={15} className="text-cyan" />
              Mock coverage
            </div>
            <div className="grid gap-2">
              {suggestedBriefs.map((brief) => (
                <button
                  key={brief.id}
                  onClick={() => choosePrompt(brief)}
                  className="flex items-center justify-between border border-white/[0.055] bg-background/70 px-3 py-2 text-left text-xs text-slate-300 transition-all hover:border-cyan/40 hover:text-foreground"
                >
                  {brief.label}
                  <ArrowRight size={13} className="text-cyan" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.div layout className="mb-8 border border-white/[0.07] bg-[#111827]/86 p-3 shadow-2xl shadow-black/10">
        <div className="flex items-center gap-2">
          <Search size={17} className="ml-3 text-slate-500" />
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && submitQuestion()}
            placeholder="Ask about HDFC asset quality, Reliance retail, or TCS vs Infosys margins..."
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-foreground outline-none placeholder:text-slate-600"
          />
          <Button size="icon" onClick={() => submitQuestion()} disabled={!input.trim()} aria-label="Ask Copilot">
            <Send size={15} />
          </Button>
        </div>
      </motion.div>

      {!hasSubmitted && (
        <motion.section
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-4 md:grid-cols-3"
        >
          {suggestedBriefs.map((brief) => (
            <motion.button
              key={brief.id}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              onClick={() => choosePrompt(brief)}
              className="premium-panel p-5 text-left transition-all hover:-translate-y-0.5 hover:border-cyan/40"
            >
              <div className={cn('mb-4 inline-flex border px-2 py-1 text-[10px] font-semibold uppercase tracking-widest', toneStyles[brief.tone])}>
                {brief.company}
              </div>
              <h2 className="text-lg font-semibold leading-7 text-foreground">{brief.prompt}</h2>
              <p className="mt-3 text-xs leading-6 text-slate-500">{brief.sources[0]}</p>
            </motion.button>
          ))}
        </motion.section>
      )}

      {hasSubmitted && phase === 'thinking' && !selectedBrief && !ragAnswer && (
        <section className="premium-panel p-8">
          <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-slate-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
            Reading the relevant corpus...
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">{submittedQuestion}</p>
        </section>
      )}

      {ragError && (
        <section className="mb-6 border border-[#B86A6A]/30 bg-[#B86A6A]/10 p-4 text-xs leading-6 text-[#E8A3A3]">
          {ragError}. Showing the prototype fallback instead.
        </section>
      )}

      {ragAnswer && (
        <article className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <main className="premium-panel p-6 md:p-8">
            <div className="mb-8 border-b border-white/[0.055] pb-6">
              <div className="mb-5 flex justify-end">
                <div className="max-w-[760px] border border-white/[0.07] bg-background/75 px-5 py-4 text-right text-base leading-7 text-slate-200">
                  {submittedQuestion}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-cyan/40 bg-cyan/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan">
                  HDFC Bank
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  {ragAnswer.provider} / {ragAnswer.model}
                </span>
              </div>
            </div>
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <BookOpen size={15} className="text-cyan" />
                RAG Answer
              </h3>
              <p className="whitespace-pre-line text-base leading-8 text-slate-300">{ragAnswer.answer}</p>
            </section>
            <section className="mt-10 border-t border-white/[0.055] pt-6">
              <h3 className="mb-4 text-sm font-semibold">Follow-up questions</h3>
              <div className="grid gap-2">
                {ragAnswer.follow_ups.map((item) => (
                  <button
                    key={item}
                    onClick={() => submitQuestion(item)}
                    className="flex items-center justify-between border border-white/[0.055] bg-background/70 px-4 py-3 text-left text-sm text-slate-300 transition-all hover:border-cyan/40 hover:text-foreground"
                  >
                    {item}
                    <ArrowRight size={14} className="text-cyan" />
                  </button>
                ))}
              </div>
            </section>
          </main>
          <aside className="space-y-5">
            <div className="premium-panel p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                <FileText size={15} className="text-cyan" /> Citations
              </h3>
              <div className="space-y-3">
                {ragAnswer.citations.map((citation) => (
                  <div key={citation.chunk_id} className="border-t border-white/[0.055] pt-3">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan">
                      {citation.section} / p.{citation.page}
                    </div>
                    <p className="mt-2 text-xs leading-6 text-slate-400">{citation.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="premium-panel p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ShieldAlert size={15} className="text-cyan" /> Confidence
              </h3>
              <div className="font-mono text-lg text-[#6FAF84]">{ragAnswer.confidence}</div>
              <p className="mt-3 text-xs leading-6 text-slate-500">Generated from retrieved HDFC annual-report chunks.</p>
            </div>
          </aside>
        </article>
      )}

      {selectedBrief && !ragAnswer && (
        <article className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <main className="premium-panel p-6 md:p-8">
            <motion.div layout className="mb-8 border-b border-white/[0.055] pb-6">
              <div className="mb-5 flex justify-end">
                <div className="max-w-[760px] border border-white/[0.07] bg-background/75 px-5 py-4 text-right text-base leading-7 text-slate-200">
                  {submittedQuestion}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn('border px-2 py-1 text-[10px] font-semibold uppercase tracking-widest', toneStyles[selectedBrief.tone])}>
                  {selectedBrief.company}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  {phase === 'thinking' ? 'Reading sources' : phase === 'streaming' ? 'Composing brief' : 'Mock brief complete'}
                </span>
              </div>
            </motion.div>

            {phase === 'thinking' && (
              <div className="mb-8 flex items-center gap-3 text-sm text-slate-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
                Locating the most relevant evidence...
              </div>
            )}

            <div className="space-y-8">
              <AnimatePresence>
                {selectedBrief.blocks.slice(0, visibleBlocks).map((block, index) => (
                <motion.section
                  key={block.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <BookOpen size={15} className="text-cyan" />
                    {block.title}
                  </h3>
                  <p className={cn('max-w-[720px] text-base leading-8 text-slate-300', phase === 'streaming' && index === visibleBlocks - 1 && 'streaming-cursor')}>
                    {block.body}
                  </p>
                </motion.section>
              ))}
              </AnimatePresence>
            </div>

            {phase === 'done' && (
              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10 border-t border-white/[0.055] pt-6">
                <h3 className="mb-4 text-sm font-semibold">Follow-up questions</h3>
                <div className="grid gap-2">
                  {selectedBrief.followUps.map((item) => (
                    <button
                      key={item}
                      onClick={() => submitQuestion(item)}
                      className="flex items-center justify-between border border-white/[0.055] bg-background/70 px-4 py-3 text-left text-sm text-slate-300 transition-all hover:border-cyan/40 hover:text-foreground"
                    >
                      {item}
                      <ArrowRight size={14} className="text-cyan" />
                    </button>
                  ))}
                </div>
              </motion.section>
            )}
          </main>

          <aside className="space-y-5">
            <AnimatePresence>
              {phase === 'done' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-panel p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <FileText size={15} className="text-cyan" /> Sources
                  </h3>
                  <div className="space-y-3">
                    {selectedBrief.sources.map((source) => (
                      <button key={source} className="block w-full border-t border-white/[0.055] pt-3 text-left text-xs leading-6 text-slate-400 hover:text-foreground">
                        {source}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="premium-panel p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ShieldAlert size={15} className="text-cyan" /> Confidence
              </h3>
              <div className="font-mono text-lg text-[#6FAF84]">{selectedBrief.confidence}</div>
              <p className="mt-3 text-xs leading-6 text-slate-500">Mock confidence based on available filing and commentary coverage.</p>
            </div>

            <div className="grid gap-2">
              <Button variant="outline" className="justify-start gap-2"><Copy size={14} /> Copy Summary</Button>
              <Button variant="outline" className="justify-start gap-2"><Clipboard size={14} /> Save Conviction</Button>
            </div>
          </aside>
        </article>
      )}
    </div>
  );
};

export default ChatExperience;
