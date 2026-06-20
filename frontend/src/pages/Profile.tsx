import React from 'react';
import { Bell, CreditCard, Shield, User } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Profile = () => {
  return (
    <div className="mx-auto max-w-4xl pb-16">
      <div className="mb-10 border-b border-border pb-8">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">Profile</div>
        <h1 className="font-display text-5xl">Arjun Sharma</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
          Manage preferences, sources, alerts, and the investment context Copilot should remember.
        </p>
      </div>

      <section className="grid gap-5 md:grid-cols-2">
        <Panel icon={User} title="Investor profile" text="Long-term Indian equities, quality franchises, conservative risk." />
        <Panel icon={Bell} title="Attention rules" text="Alert on management tone changes, risk escalations, and saved company updates." />
        <Panel icon={Shield} title="Trust & citations" text="Require sources for every material claim in Copilot briefs." />
        <Panel icon={CreditCard} title="Plan" text="Saarthi Premium · investment memos and unlimited report analysis." />
      </section>

      <div className="mt-8 border border-border bg-[#111827] p-6">
        <h2 className="mb-4 text-lg font-semibold">Daily brief preferences</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Focus companies', 'Management signals', 'Risk evolution'].map((item) => (
            <label key={item} className="flex items-center gap-3 border border-border bg-background p-3 text-sm text-slate-300">
              <input type="checkbox" defaultChecked className="accent-[#7AA2FF]" />
              {item}
            </label>
          ))}
        </div>
        <Button variant="saffron" className="mt-6">Save Preferences</Button>
      </div>
    </div>
  );
};

const Panel = ({ icon: Icon, title, text }: { icon: any; title: string; text: string }) => (
  <article className="border border-border bg-[#111827] p-6">
    <Icon size={18} className="mb-5 text-cyan" />
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
  </article>
);

export default Profile;
