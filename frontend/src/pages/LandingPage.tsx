import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import BrandWordmark from '../components/BrandWordmark';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan/20">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.055] bg-[#0B1020]/82 px-6 py-4 backdrop-blur-2xl md:px-12">
        <BrandWordmark size="lg" />
        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400 md:flex">
          <a href="#product" className="hover:text-foreground">Product</a>
          <a href="#workflow" className="hover:text-foreground">Workflow</a>
          <a href="#sources" className="hover:text-foreground">Sources</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth">
            <Button variant="ghost" className="text-xs">Sign In</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="saffron" className="hidden sm:flex">Open Desk</Button>
          </Link>
        </div>
      </nav>

      <main>
        <section className="ambient-stage mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[1fr_0.78fr] md:px-12">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-border bg-[#111827] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan">
              <BookOpen size={13} /> Investment intelligence for Indian markets
            </div>
            <h1 className="font-display text-5xl leading-[1.02] text-foreground md:text-7xl">
              Ask better questions.
              <br />
              Make better investment decisions.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              NiveshSaarthi turns annual reports, earnings calls, and disclosures into investment intelligence you can actually use.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard">
                <Button size="lg" variant="saffron" className="h-12 px-8">
                  Read Morning Brief <ArrowRight className="ml-2" size={17} />
                </Button>
              </Link>
              <Link to="/dashboard/compare">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Ask A Question
                </Button>
              </Link>
            </div>
          </div>

          <div id="product" className="premium-panel p-6">
            <div className="border-b border-border pb-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Analyst Query</div>
              <p className="mt-2 text-xl leading-8 text-foreground">
                What changed in HDFC Bank's asset quality this quarter?
              </p>
            </div>
            <div className="space-y-6 py-6">
              <BriefStep
                label="Question"
                text="GNPA and slippage movement compared with the previous quarter, with management context."
              />
              <BriefStep
                label="Insight"
                text="Gross NPA improved modestly while commentary points to controlled stress in the retail book."
              />
              <BriefStep
                label="Decision"
                text="Potential reduction in credit risk, but watch unsecured loan commentary before increasing conviction."
              />
            </div>
            <div className="border-t border-border pt-4 text-[11px] leading-6 text-slate-400">
              Sources: Q4 earnings call, exchange filing, annual report note 18.
            </div>
          </div>
        </section>

        <section id="workflow" className="border-y border-white/[0.055] bg-[#111827]/72 px-6 py-16 md:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {[
              ['Raw filings', 'Annual reports, transcripts, presentations, and exchange disclosures are treated as primary evidence.'],
              ['Analyst notes', 'The product extracts changes, risks, management signals, and questions worth asking next.'],
              ['Conviction', 'Every answer is designed to improve understanding before the investor acts.'],
            ].map(([title, text]) => (
              <div key={title} className="border-l border-border pl-6">
                <CheckCircle2 className="mb-4 text-cyan" size={18} />
                <h2 className="font-display text-3xl">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="sources" className="mx-auto max-w-7xl px-6 py-14 md:px-12">
          <div className="flex flex-col justify-between gap-8 border-b border-border pb-12 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-4xl">Built for trust, not theatrics.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                The interface stays quiet so filings, commentary, and analyst reasoning remain the center of attention.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-2xl font-semibold text-slate-500">
              <span>NSE</span>
              <span>BSE</span>
              <span>SEBI</span>
              <span>IR</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const BriefStep = ({ label, text }: { label: string; text: string }) => (
  <div>
    <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-cyan">{label}</div>
    <p className="text-sm leading-7 text-slate-300">{text}</p>
  </div>
);

export default LandingPage;
