import React from 'react';
import { ArrowRight, Bookmark, Calendar, Share2 } from 'lucide-react';
import { insights } from '../data/mock';
import { useApiResource } from '../hooks/useApiResource';
import { api } from '../services/api';

const categories = ['Management Signals', 'Risk Evolution', 'Sector Shifts', 'Contrarian Views', 'Capital Allocation', 'Saved Intelligence'];

const InsightsHub = () => {
  const { data: insightList, source } = useApiResource(api.insights, insights, []);
  const featuredInsight = insightList[0] || insights[0];
  const otherInsights = [...insightList, ...insightList, ...insightList];

  return (
    <div className="pb-16 text-foreground">
      <div className="mb-10 border-b border-border pb-8">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">Insights</div>
        <h1 className="font-display text-5xl leading-tight">A magazine for investment signals.</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
          Editorial intelligence on management commentary, risk evolution, sector shifts, and capital allocation.
        </p>
        <div className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {source === 'api' ? 'Insights loaded from backend' : 'Insights using local fallback'}
        </div>
      </div>

      <section className="mb-10 grid border border-border bg-[#111827] lg:grid-cols-[1fr_0.7fr]">
        <div className="p-8 md:p-10">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="text-cyan">Featured Analysis</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> {featuredInsight.date}</span>
          </div>
          <h2 className="font-display text-4xl leading-tight md:text-6xl">{featuredInsight.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">{featuredInsight.excerpt}</p>
          <button className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
            Read full analysis <ArrowRight size={15} />
          </button>
        </div>
        <div className="hidden border-l border-border p-8 lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Analyst lens</div>
              <p className="mt-4 text-2xl leading-10 text-slate-300">
                The useful question is whether retail cash flow can keep reducing cyclicality in consolidated earnings.
              </p>
            </div>
            <div className="border-t border-border pt-4 text-xs leading-6 text-slate-500">
              Sources include investor presentation, quarterly commentary, and segment disclosures.
            </div>
          </div>
        </div>
      </section>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button
            key={category}
            className={index === 0
              ? 'rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-2 text-xs font-semibold text-cyan'
              : 'rounded-lg border border-border px-3 py-2 text-xs text-slate-400 hover:text-foreground'}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {otherInsights.map((insight, index) => (
          <article key={`${insight.id}-${index}`} className="group border border-border bg-[#111827] p-6">
            <div className="mb-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              <span className="text-cyan">{insight.category}</span>
              <span>{insight.date}</span>
            </div>
            <h3 className="min-h-20 text-2xl leading-8 group-hover:text-cyan">{insight.title}</h3>
            <p className="mt-4 min-h-24 text-sm leading-7 text-slate-400">{insight.excerpt}</p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-slate-500">
              <span>{insight.author}</span>
              <div className="flex items-center gap-3">
                <button className="hover:text-foreground" aria-label="Save insight"><Bookmark size={14} /></button>
                <button className="hover:text-foreground" aria-label="Share insight"><Share2 size={14} /></button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default InsightsHub;
