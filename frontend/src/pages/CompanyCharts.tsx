import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BarChart3, LineChart } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { api, type FinancialMetric } from '../services/api';
import { useApiResource } from '../hooks/useApiResource';
import { formatCompactNumber } from '../lib/utils';

const fallbackMetrics: FinancialMetric[] = [
  { year: 'FY20', revenue: 147068, net_profit: 26257, deposits: 1147502, advances: 993703, net_interest_margin: 4.3, gross_npa: 1.26, net_npa: 0.36 },
  { year: 'FY21', revenue: 155885, net_profit: 31833, deposits: 1335060, advances: 1132840, net_interest_margin: 4.2, gross_npa: 1.32, net_npa: 0.4 },
  { year: 'FY22', revenue: 167695, net_profit: 36961, deposits: 1559217, advances: 1369000, net_interest_margin: 4.0, gross_npa: 1.17, net_npa: 0.32 },
  { year: 'FY23', revenue: 192800, net_profit: 44109, deposits: 1883400, advances: 1600500, net_interest_margin: 4.1, gross_npa: 1.12, net_npa: 0.27 },
  { year: 'FY24', revenue: 307580, net_profit: 64060, deposits: 2379800, advances: 2486900, net_interest_margin: 3.5, gross_npa: 1.24, net_npa: 0.33 },
];

const CompanyCharts = () => {
  const { id = 'hdfcbank' } = useParams();
  const { data: metrics, source } = useApiResource(() => api.companyMetrics(id), fallbackMetrics, [id]);

  return (
    <div className="pb-16 text-foreground">
      <Link to={`/dashboard/companies/${id}`} className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 hover:text-foreground">
        <ArrowLeft size={13} /> Back to dossier
      </Link>

      <section className="ambient-stage mb-10 border-b border-white/[0.055] pb-10">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-cyan">HDFC Bank charts</div>
        <h1 className="font-display text-5xl leading-tight md:text-6xl">Financial trends with thesis context.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
          A compact chart page for the HDFC vertical slice: growth, margin, deposits, advances, and asset-quality indicators.
        </p>
        <div className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {source === 'api' ? 'Backend metrics' : 'Local fallback metrics'}
        </div>
      </section>

      <div className="grid gap-6">
        <ChartPanel icon={BarChart3} title="Revenue and profit" detail="Income growth versus bottom-line conversion.">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={metrics}>
              <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
              <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCompactNumber} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#7AA2FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net_profit" name="Net profit" fill="#6FAF84" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartPanel icon={LineChart} title="Deposits vs advances" detail="Balance-sheet scale and funding pressure.">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="depositFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7AA2FF" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#7AA2FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCompactNumber} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="deposits" name="Deposits" stroke="#7AA2FF" fill="url(#depositFill)" strokeWidth={2} />
                <Area type="monotone" dataKey="advances" name="Advances" stroke="#CBD5E1" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartPanel>

          <ChartPanel icon={LineChart} title="Margins and asset quality" detail="NIM pressure against GNPA and NNPA.">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={metrics}>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="net_interest_margin" name="NIM %" stroke="#7AA2FF" fill="#7AA2FF22" strokeWidth={2} />
                <Area type="monotone" dataKey="gross_npa" name="Gross NPA %" stroke="#B86A6A" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="net_npa" name="Net NPA %" stroke="#6FAF84" fill="transparent" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>
      </div>
    </div>
  );
};

const ChartPanel = ({ icon: Icon, title, detail, children }: { icon: any; title: string; detail: string; children: React.ReactNode }) => (
  <section className="premium-panel p-6">
    <div className="mb-6 flex items-start gap-3 border-b border-white/[0.055] pb-4">
      <Icon size={18} className="mt-1 text-cyan" />
      <div>
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </div>
    </div>
    {children}
  </section>
);

export default CompanyCharts;
