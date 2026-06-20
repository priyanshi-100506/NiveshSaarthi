import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, FileText, Highlighter, ListChecks, MessageSquare, NotebookText } from 'lucide-react';

const libraryItems = [
  { icon: MessageSquare, title: 'Saved conversations', detail: 'Questions, answer briefs, and follow-up trails.' },
  { icon: Bookmark, title: 'Insights', detail: 'Management signals, risk evolution, sector shifts.' },
  { icon: NotebookText, title: 'Notes', detail: 'Personal conviction notes linked to sources.' },
  { icon: Highlighter, title: 'Highlights', detail: 'Important filing excerpts and transcript passages.' },
  { icon: FileText, title: 'Investment memos', detail: 'Generated memos ready for review and refinement.' },
  { icon: ListChecks, title: 'Focus Lists', detail: 'Watchlists reframed as companies worth attention.' },
];

const LibraryMemory = () => {
  return (
    <div className="pb-16">
      <div className="ambient-stage mb-10 border-b border-white/[0.055] pb-8">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">Library</div>
        <h1 className="font-display text-5xl leading-tight">Your investment memory system.</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
          Everything you save becomes context: conversations, notes, highlights, memos, and focus lists.
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {libraryItems.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="premium-panel p-6"
          >
            <item.icon size={18} className="mb-5 text-cyan" />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{item.detail}</p>
            <div className="mt-6 border-t border-white/[0.055] pt-4 text-[10px] uppercase tracking-widest text-slate-500">
              Synced to Copilot context
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
};

export default LibraryMemory;
