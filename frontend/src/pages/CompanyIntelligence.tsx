import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, BookOpen, FileText, MessageSquare, Send, ShieldAlert, TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { companies } from '../data/mock';
import { Button } from '../components/ui/Button';
import { cn, formatCurrency } from '../lib/utils';
import { useApiResource } from '../hooks/useApiResource';
import { api, type CompanyDossier, type RagAnswer } from '../services/api';

const fallbackDossier: CompanyDossier | null = null;

const CompanyIntelligence = () => {
  const { id } = useParams();
  const [ragQuestion, setRagQuestion] = useState("What changed in HDFC Bank's asset quality?");
  const [ragAnswer, setRagAnswer] = useState<RagAnswer | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [ragError, setRagError] = useState<string | null>(null);
  const fallbackCompany = companies.find((item) => item.id === id) || companies[0];
  const { data: company, source } = useApiResource(
    () => id ? api.company(id) : Promise.resolve(fallbackCompany),
    fallbackCompany,
    [id]
  );
  const { data: dossier } = useApiResource(
    () => id ? api.companyDossier(id) : Promise.reject(new Error('No company selected')),
    fallbackDossier,
    [id]
  );

  const metrics = dossier?.metrics.map((item) => ({
    name: item.year,
    revenue: item.revenue,
    profit: item.net_profit,
  })) ?? [
    { name: 'FY20', revenue: 147068, profit: 26257 },
    { name: 'FY21', revenue: 155885, profit: 31833 },
    { name: 'FY22', revenue: 167695, profit: 36961 },
    { name: 'FY23', revenue: 192800, profit: 44109 },
    { name: 'FY24', revenue: 307580, profit: 64060 },
  ];

  const askRag = async () => {
    if (!id || !ragQuestion.trim()) return;
    setIsAsking(true);
    setRagError(null);
    try {
      const answer = await api.askCompanyRag(id, ragQuestion);
      setRagAnswer(answer);
    } catch (error) {
      setRagError(error instanceof Error ? error.message : 'RAG answer unavailable');
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="pb-16 text-foreground">
      <Link to="/dashboard/companies" className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 hover:text-foreground">
        <ArrowLeft size={13} /> Back to companies
      </Link>

      <section className="ambient-stage mb-10 border-b border-white/[0.055] pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">{company.ticker} / {company.sector}</div>
            <h1 className="font-display text-5xl leading-tight md:text-6xl">{company.name}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-300">
              {dossier?.profile.thesis ?? `${company.name} remains a high-quality franchise, though near-term growth and margin signals require close reading.`}
            </p>
            <div className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {source === 'api' ? 'Backend dossier' : 'Local fallback dossier'}
            </div>
          </motion.div>
          <div className="premium-panel grid min-w-[300px] grid-cols-2">
            <Metric label="NSE Price" value={formatCurrency(company.price)} />
            <Metric
              label="Change"
              value={`${company.change > 0 ? '+' : ''}${company.change}%`}
              className={company.change > 0 ? 'text-[#6FAF84]' : 'text-[#B86A6A]'}
            />
          </div>
        </div>
      </section>

      {dossier && (
        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <InfoBlock label="Founded" value={dossier.profile.founded} />
          <InfoBlock label="Headquarters" value={dossier.profile.headquarters} />
          <InfoBlock label="Model" value="Private sector banking franchise" />
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <main className="space-y-8">
          <section className="grid gap-4 md:grid-cols-3">
            <AnalystBlock title="Thesis change" text="Management commentary points to stable operating conditions, with no abrupt deterioration in core business quality." />
            <AnalystBlock title="Bull case" text={(dossier?.profile.key_monitorables.slice(0, 3) ?? company.strengths).join('. ') + '.'} tone="positive" />
            <AnalystBlock title="Bear case" text={(dossier?.risks.map((risk) => risk.title).slice(0, 3) ?? company.risks).join('. ') + '.'} tone="risk" />
          </section>

          {dossier && (
            <section className="premium-panel p-6">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/[0.055] pb-4">
                <div>
                  <h2 className="font-display text-3xl">Company profile</h2>
                  <p className="mt-1 text-xs text-slate-500">The durable thesis, operating model, and monitorables.</p>
                </div>
              </div>
              <p className="max-w-3xl text-base leading-8 text-slate-300">{dossier.profile.business_model}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <ListBlock title="Segments" items={dossier.profile.segments} />
                <ListBlock title="Key monitorables" items={dossier.profile.key_monitorables} />
              </div>
            </section>
          )}

          <section className="premium-panel p-6">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/[0.055] pb-4">
              <div>
                <h2 className="font-display text-3xl">Financial trends</h2>
                <p className="mt-1 text-xs text-slate-500">Revenue and profit direction, 5-year view.</p>
              </div>
              <Link to={`/dashboard/companies/${id}/charts`} className="hidden items-center gap-2 text-xs font-semibold text-cyan sm:flex">
                Full chart page <BarChart3 size={14} />
              </Link>
              <div className="hidden items-center gap-4 text-[10px] uppercase tracking-widest text-slate-500 sm:flex">
                <span className="flex items-center gap-1"><span className="h-2 w-2 bg-cyan" /> Revenue</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 bg-[#6FAF84]" /> Profit</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7AA2FF" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#7AA2FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#7AA2FF" fill="url(#colorRev)" strokeWidth={2} />
                  <Area type="monotone" dataKey="profit" stroke="#6FAF84" fill="transparent" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {dossier && (
            <section className="premium-panel p-6">
              <div className="mb-6 border-b border-white/[0.055] pb-4">
                <h2 className="font-display text-3xl">Ask HDFC corpus</h2>
                <p className="mt-1 text-xs text-slate-500">Retrieves annual-report chunks, asks Ollama locally when available, and returns citations.</p>
              </div>
              <div className="flex gap-2">
                <input
                  value={ragQuestion}
                  onChange={(event) => setRagQuestion(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && askRag()}
                  className="min-w-0 flex-1 border border-white/[0.055] bg-background px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-cyan/40"
                  placeholder="Ask about deposits, NPA, NIM, merger integration..."
                />
                <Button onClick={askRag} disabled={isAsking || !ragQuestion.trim()} className="gap-2">
                  {isAsking ? 'Reading' : 'Ask'} <Send size={14} />
                </Button>
              </div>
              {ragError && <p className="mt-3 text-xs text-[#B86A6A]">{ragError}</p>}
              {ragAnswer && (
                <div className="mt-6 border-t border-white/[0.055] pt-6">
                  <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {ragAnswer.provider} / {ragAnswer.model} / {ragAnswer.confidence}
                  </div>
                  <p className="text-base leading-8 text-slate-300">{ragAnswer.answer}</p>
                  <div className="mt-6 grid gap-3">
                    {ragAnswer.citations.map((citation) => (
                      <div key={citation.chunk_id} className="border border-white/[0.055] bg-background/60 p-4">
                        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-cyan">
                          {citation.source} / {citation.section} / p.{citation.page}
                        </div>
                        <p className="text-xs leading-6 text-slate-400">{citation.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          <section className="premium-panel p-6">
            <h2 className="font-display text-3xl">Questions worth asking</h2>
            <div className="mt-5 space-y-3">
              {[
                'Which segment most changed management tone this quarter?',
                'Are working-capital movements consistent with reported growth?',
                'What risk did management mention more often than last year?',
              ].map((question) => (
                <Link key={question} to="/dashboard/chat" className="flex items-center justify-between border-t border-white/[0.055] pt-3 text-sm text-slate-300 hover:text-foreground">
                  <span>{question}</span>
                  <MessageSquare size={15} className="text-cyan" />
                </Link>
              ))}
            </div>
          </section>
        </main>

        <aside className="space-y-6">
          <div className="premium-panel p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold"><BookOpen size={15} className="text-cyan" /> Thesis note</h2>
            <p className="text-sm leading-7 text-slate-400">{company.summary}</p>
          </div>
          <div className="premium-panel p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><ShieldAlert size={15} className="text-cyan" /> Risk list</h2>
            {(dossier?.risks ?? []).map((risk) => (
              <div key={risk.id} className="border-t border-white/[0.055] py-3">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-200">
                  <span>{risk.title}</span>
                  <span className="text-[10px] uppercase tracking-widest text-cyan">{risk.severity}</span>
                </div>
                <p className="mt-2 text-xs leading-6 text-slate-500">{risk.monitor}</p>
              </div>
            ))}
          </div>
          <div className="premium-panel p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><FileText size={15} className="text-cyan" /> Annual report chunks</h2>
            {(dossier?.chunks ?? []).slice(0, 4).map((chunk) => (
              <div key={chunk.id} className="border-t border-white/[0.055] py-3">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{chunk.section} / p.{chunk.page}</div>
                <p className="mt-2 text-xs leading-6 text-slate-400">{chunk.text}</p>
              </div>
            ))}
          </div>
          <Link to="/dashboard/copilot">
            <Button variant="saffron" className="w-full gap-2">
              Ask about {company.ticker} <MessageSquare size={14} />
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
};

const Metric = ({ label, value, className }: { label: string; value: string; className?: string }) => (
    <div className="border-r border-white/[0.055] p-4 last:border-r-0">
    <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">{label}</div>
    <div className={cn('font-mono text-lg text-foreground', className)}>{value}</div>
  </div>
);

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="premium-panel p-5">
    <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">{label}</div>
    <div className="text-sm leading-7 text-slate-200">{value}</div>
  </div>
);

const ListBlock = ({ title, items }: { title: string; items: string[] }) => (
  <div className="border border-white/[0.055] bg-background/50 p-5">
    <h3 className="mb-3 text-sm font-semibold">{title}</h3>
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="text-sm leading-6 text-slate-400">{item}</div>
      ))}
    </div>
  </div>
);

const AnalystBlock = ({ title, text, tone }: { title: string; text: string; tone?: 'positive' | 'risk' }) => (
  <div className="premium-panel p-5">
    <div className={cn('mb-3 flex items-center gap-2 text-sm font-semibold', tone === 'positive' && 'text-[#6FAF84]', tone === 'risk' && 'text-[#B86A6A]')}>
      {tone === 'risk' ? <ShieldAlert size={15} /> : tone === 'positive' ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
      {title}
    </div>
    <p className="text-sm leading-7 text-slate-400">{text}</p>
  </div>
);

export default CompanyIntelligence;
