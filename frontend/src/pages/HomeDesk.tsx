import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bookmark, Building2, FileText, MessageSquare, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { companies } from '../data/mock';
import { useApiResource } from '../hooks/useApiResource';
import { api } from '../services/api';

const intelligenceFeed = [
  {
    title: 'HDFC Bank commentary stayed calm, but unsecured retail is still the line to reread.',
    why: 'Why it matters: one clean quarter improves comfort, but seasoning risk can show up late.',
    source: 'Asset quality',
  },
  {
    title: 'IT services teams are still describing demand as cautious, not recovered.',
    why: 'Why it matters: margin resilience matters more when revenue visibility is weak.',
    source: 'Management tone',
  },
  {
    title: "Reliance's retail segment keeps reducing dependence on O2C cyclicality.",
    why: 'Why it matters: the thesis improves if consumer cash flows stay durable at scale.',
    source: 'Segment mix',
  },
];

const morningBrief = [
  {
    title: 'Banks look stable',
    text: 'HDFC Bank commentary points to stable asset quality, but unsecured retail loans remain the next line to read.',
  },
  {
    title: 'IT remains selective',
    text: 'IT services management teams continue to describe enterprise spending as cautious rather than recovering.',
  },
  {
    title: 'Reliance needs a retail pass',
    text: 'Deposit cost pressure may matter more than loan growth for private banks over the next two quarters.',
  },
];

const conversations = [
  "What changed in HDFC Bank's asset quality this quarter?",
  'Compare TCS and Infosys on margin resilience.',
  'Which Reliance segment reduced cyclicality in FY24?',
];

const HomeDesk = () => {
  const { data: companyList, source } = useApiResource(api.companies, companies, []);

  return (
    <div className="pb-16">
      <section className="ambient-stage mb-12 grid gap-8 border-b border-white/[0.055] pb-12 lg:grid-cols-[1fr_380px]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">Home</div>
          <h1 className="font-display text-5xl leading-tight md:text-7xl">Intelligence before action.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            A quiet research desk for signals, questions, filings, and conviction notes that deserve attention before the market noise does.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard/copilot">
              <Button variant="saffron" className="gap-2">Ask Copilot <Sparkles size={15} /></Button>
            </Link>
            <Link to="/dashboard/library">
              <Button variant="outline">Open Library</Button>
            </Link>
          </div>
        </motion.div>

        <motion.aside initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.45 }} className="premium-panel p-6">
          <div className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Morning Brief</div>
          <p className="text-2xl leading-10 text-slate-100">
            Three developments deserve attention today.
          </p>
          <div className="mt-6 space-y-5">
            {morningBrief.map((item) => (
              <div key={item.title} className="border-t border-white/[0.055] pt-4">
                <h2 className="text-sm font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
          <Link to="/dashboard/reports" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-cyan">
            Read full briefing <ArrowRight size={13} />
          </Link>
        </motion.aside>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-cyan">Intelligence Feed</div>
            <h2 className="font-display text-4xl">Signals worth carrying forward.</h2>
          </div>
          <Link to="/dashboard/insights" className="hidden text-xs font-semibold text-cyan sm:inline-flex">Open insights</Link>
        </div>
        <div className="divide-y divide-white/[0.055] border-y border-white/[0.055]">
          {intelligenceFeed.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="grid gap-4 py-6 md:grid-cols-[160px_1fr]"
            >
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{item.source}</div>
              <div>
                <h3 className="text-xl leading-8 text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">{item.why}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="premium-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-3xl">Focus Companies</h2>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {source === 'api' ? 'Live API' : 'Local fallback'}
              </span>
              <Link to="/dashboard/companies" className="text-xs font-semibold text-cyan">View dossiers</Link>
            </div>
          </div>
          <div className="space-y-3">
            {companyList.map((company) => (
              <Link key={company.id} to={`/dashboard/companies/${company.id}`} className="flex items-center justify-between border-t border-white/[0.055] pt-3 text-sm hover:text-cyan">
                <span className="flex items-center gap-3">
                  <Building2 size={15} className="text-slate-500" />
                  {company.name}
                </span>
                <span className={company.change > 0 ? 'font-mono text-[#6FAF84]' : 'font-mono text-[#B86A6A]'}>
                  {company.change > 0 ? '+' : ''}{company.change}%
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="premium-panel p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><MessageSquare size={15} className="text-cyan" /> Conversations to Continue</h2>
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <Link key={conversation} to="/dashboard/copilot" className="block border-t border-white/[0.055] pt-3 text-sm leading-6 text-slate-400 hover:text-foreground">
                  {conversation}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <SavedBlock icon={Bookmark} title="Saved Insights" text="4 conviction notes updated this week." />
            <SavedBlock icon={ShieldAlert} title="Risk Watch" text="2 risks moved from monitor to active." />
            <SavedBlock icon={FileText} title="Reports" text="3 unread annual report sections." />
          </div>
        </div>
      </section>
    </div>
  );
};

const SavedBlock = ({ icon: Icon, title, text }: { icon: any; title: string; text: string }) => (
  <div className="premium-panel p-5">
    <Icon size={16} className="mb-3 text-cyan" />
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="mt-2 text-xs leading-6 text-slate-400">{text}</p>
  </div>
);

export default HomeDesk;
