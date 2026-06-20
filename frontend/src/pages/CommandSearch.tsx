import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Command, FileText, Search } from 'lucide-react';

const suggestions = [
  { type: 'Company', title: 'HDFC Bank', detail: 'Asset quality, deposit growth, merger integration', icon: Building2 },
  { type: 'Report', title: 'TCS Annual Report FY24', detail: 'Cash conversion and margin commentary', icon: FileText },
  { type: 'Question', title: 'Compare Reliance retail vs O2C cash flow', detail: 'Open as Copilot brief', icon: Command },
  { type: 'Signal', title: 'Management tone: IT spending caution', detail: '3 companies referenced this week', icon: Search },
];

const CommandSearch = () => {
  return (
    <div className="mx-auto max-w-4xl pb-16">
      <div className="mb-8 text-center">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">Search</div>
        <h1 className="font-display text-5xl">Find anything. Ask anything.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          Predictive, keyboard-first search across companies, filings, notes, and saved thinking.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="premium-panel overflow-hidden p-3">
        <div className="flex items-center gap-3 border-b border-white/[0.055] px-3 py-4">
          <Search size={18} className="text-slate-500" />
          <input
            autoFocus
            placeholder="Search Reliance, ask about asset quality, or open a memo..."
            className="flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-slate-600"
          />
          <span className="font-mono text-xs text-slate-600">ESC</span>
        </div>

        <div className="py-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-4 text-left transition-all hover:bg-white/[0.055]"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.055] bg-background text-cyan">
                  <suggestion.icon size={16} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{suggestion.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">{suggestion.type} / {suggestion.detail}</span>
                </span>
              </span>
              <ArrowRight size={15} className="text-slate-600" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CommandSearch;
