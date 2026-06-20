import React, { useState } from 'react';
import { ArrowRight, BookOpen, FileText, Highlighter, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { reports } from '../data/mock';
import { useApiResource } from '../hooks/useApiResource';
import { api } from '../services/api';

const outline = ['Chairman letter', 'Management discussion', 'Financial statements', 'Risk factors', 'Notes to accounts'];

const ReportsHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: reportList, source } = useApiResource(api.reports, reports, []);
  const filteredReports = reportList.filter((report) => {
    const value = `${report.company} ${report.type} ${report.year}`.toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="pb-16 text-foreground">
      <div className="mb-10 border-b border-border pb-8">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">Reports</div>
        <h1 className="font-display text-5xl leading-tight">Read filings like analyst notes.</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
          Documents are organized around outline, readable text, citations, and AI insights. The PDF is evidence, not the main interface.
        </p>
        <div className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {source === 'api' ? 'Reports loaded from backend' : 'Reports using local fallback'}
        </div>
      </div>

      <div className="mb-8 max-w-3xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by company, report, or disclosure topic..."
            className="w-full border border-border bg-[#111827] py-4 pl-12 pr-4 text-sm text-foreground outline-none placeholder:text-slate-500 focus:border-cyan"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr_280px]">
        <aside className="border border-border bg-[#111827] p-5">
          <h2 className="mb-4 text-sm font-semibold">Document outline</h2>
          <div className="space-y-3">
            {outline.map((item) => (
              <button key={item} className="block w-full border-t border-border pt-3 text-left text-xs text-slate-400 hover:text-foreground">
                {item}
              </button>
            ))}
          </div>
        </aside>

        <main className="border border-border bg-[#111827] p-6">
          <div className="mb-6 border-b border-border pb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan">Selected report</div>
            <h2 className="mt-2 font-display text-4xl">HDFC Bank Annual Report FY24</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">Asset quality remained stable, with management emphasizing controlled slippages and continued deposit franchise strength.</p>
          </div>

          <article className="mx-auto max-w-[720px] space-y-6 text-base leading-8 text-slate-300">
            <p>
              The report indicates a business still absorbing merger-related complexity while maintaining conservative language around credit quality. The important shift is not a dramatic improvement, but the absence of fresh stress in the core book.
            </p>
            <p>
              Management commentary places more emphasis on deposit mobilization than aggressive loan growth. For investors, this suggests near-term returns may be shaped by funding cost discipline rather than balance-sheet expansion alone.
            </p>
            <div className="border-l-2 border-cyan pl-4 text-sm text-slate-400">
              Citation: Management discussion, asset quality section, provisioning note.
            </div>
          </article>
        </main>

        <aside className="space-y-4">
          <div className="border border-border bg-[#111827] p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><BookOpen size={15} className="text-cyan" /> AI insights</h2>
            <div className="space-y-4 text-sm leading-7 text-slate-400">
              <p>Credit commentary is steady, but unsecured retail deserves a follow-up question.</p>
              <p>Deposit growth language appears more important than headline advances.</p>
            </div>
          </div>
          <Link to="/dashboard/chat">
            <Button variant="saffron" className="w-full gap-2">
              Ask about this report <MessageSquare size={14} />
            </Button>
          </Link>
          <Button variant="outline" className="w-full gap-2">
            Save note <Highlighter size={14} />
          </Button>
        </aside>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {filteredReports.map((report) => (
          <div key={report.id} className="border border-border bg-[#111827] p-5">
            <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              <span>{report.company}</span>
              <span>{report.year}</span>
            </div>
            <h3 className="text-lg font-semibold">{report.type}</h3>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-2"><FileText size={14} /> {report.date}</span>
              <Link to="/dashboard/chat" className="flex items-center gap-1 text-cyan">Analyze <ArrowRight size={13} /></Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReportsHub;
