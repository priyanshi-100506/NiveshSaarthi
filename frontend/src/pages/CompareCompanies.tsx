import React, { useState } from 'react';
import { Plus, X, BarChart3, TrendingUp, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { companies } from '../data/mock';
import { formatCurrency, formatCompactNumber, cn } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CompareCompanies = () => {
  const [selectedIds, setSelectedIds] = useState(['reliance', 'tcs']);
  
  const selectedCompanies = companies.filter(c => selectedIds.includes(c.id));

  const removeCompany = (id: string) => {
    if (selectedIds.length <= 1) return;
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const addCompany = (id: string) => {
    if (selectedIds.length >= 3) return;
    if (selectedIds.includes(id)) return;
    setSelectedIds(prev => [...prev, id]);
  };

  const comparisonData = [
    { name: 'Revenue (₹k Cr)', ...selectedCompanies.reduce((acc, c) => ({ ...acc, [c.ticker]: Math.random() * 800 + 100 }), {}) },
    { name: 'Profit (₹k Cr)', ...selectedCompanies.reduce((acc, c) => ({ ...acc, [c.ticker]: Math.random() * 150 + 20 }), {}) },
    { name: 'P/E Ratio', ...selectedCompanies.reduce((acc, c) => ({ ...acc, [c.ticker]: c.pe }), {}) },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compare Companies</h1>
          <p className="text-muted-foreground mt-1">Side-by-side fundamental and AI-powered comparative analysis.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{selectedIds.length}/3 Selected</span>
        </div>
      </div>

      {/* Selection Bar */}
      <div className="flex flex-wrap gap-4 p-4 rounded-3xl bg-card border border-card-border shadow-sm">
        {selectedCompanies.map(company => (
          <div key={company.id} className="flex items-center gap-3 bg-background rounded-2xl py-2 pl-3 pr-2 border border-border">
            <div className="w-8 h-8 rounded-xl bg-background-alt border border-border flex items-center justify-center text-foreground font-bold text-xs">
              {company.ticker[0]}
            </div>
            <div>
              <div className="text-xs font-bold leading-none mb-0.5">{company.ticker}</div>
              <div className="text-[10px] text-muted-foreground">{company.name.split(' ')[0]}</div>
            </div>
            <button 
              onClick={() => removeCompany(company.id)}
              className="p-1 hover:bg-background-alt rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {selectedIds.length < 3 && (
          <div className="relative group">
            <Button variant="outline" className="h-12 rounded-2xl border-dashed border-border hover:border-accent-gold/50 hover:bg-accent-gold/5 text-muted-foreground hover:text-foreground group" onClick={() => addCompany('hdfcbank')}>
               <Plus size={18} className="mr-2 text-muted-foreground group-hover:text-accent-gold" /> Add Company
            </Button>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Metrics Labels */}
        <div className="hidden lg:block pt-[124px] space-y-12">
           {['Current Price', 'Market Cap', 'P/E Ratio', 'Sector', '5Y CAGR'].map(label => (
             <div key={label} className="text-xs font-bold text-muted-foreground uppercase tracking-widest h-12 flex items-center">{label}</div>
           ))}
        </div>

        {/* Company Columns */}
        {selectedCompanies.map(company => (
           <div key={company.id} className="space-y-8">
              <Card className="text-center p-6 hover:border-accent-gold transition-colors">
                 <div className="w-16 h-16 rounded-2xl bg-background-alt border border-border mx-auto flex items-center justify-center text-foreground font-bold text-2xl shadow-sm mb-4">
                    {company.ticker[0]}
                 </div>
                 <h3 className="font-bold text-lg mb-1">{company.ticker}</h3>
                 <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{company.sector}</p>
              </Card>

              <div className="space-y-4">
                 <MetricRow value={formatCurrency(company.price)} />
                 <MetricRow value={`₹${company.marketCap}`} />
                 <MetricRow value={company.pe.toString()} />
                 <MetricRow value={company.sector.split(' ')[0]} />
                 <MetricRow value="14.2%" highlight />
              </div>
           </div>
        ))}
        
        {/* Empty placeholder */}
        {selectedIds.length < 3 && (
          <div className="space-y-8 opacity-40 grayscale pointer-events-none">
             <Card className="text-center p-6 border-dashed border-border flex flex-col items-center justify-center h-44">
                <Plus size={32} className="text-muted-foreground/30 mb-2" />
                <p className="text-xs font-bold text-muted-foreground/30 tracking-widest uppercase">Compare</p>
             </Card>
          </div>
        )}
      </div>

      {/* Visual Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Fundamental Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                    labelStyle={{ color: 'var(--accent-gold)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  {selectedCompanies.map((c, i) => (
                    <Bar key={c.ticker} dataKey={c.ticker} fill={i === 0 ? '#B8C0FF' : i === 1 ? '#8FD7EA' : '#A7C7E7'} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-accent-gold/15 bg-card/65 shadow-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="text-accent-gold/25" />
            </div>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <Sparkles size={18} className="text-accent-gold" /> AI Comparative Summary
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="p-4 rounded-2xl bg-background border border-border space-y-3">
                  <h4 className="text-xs font-bold text-accent-gold uppercase tracking-widest">Efficiency Winner</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCompanies[0]?.name} demonstrates superior operational efficiency with a higher ROE and better asset turnover compared to {selectedCompanies[1]?.name}.
                  </p>
               </div>
               <div className="p-4 rounded-2xl bg-background border border-border space-y-3">
                  <h4 className="text-xs font-bold text-accent-saarthi uppercase tracking-widest">valuation Insight</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    While {selectedCompanies[1]?.ticker} trades at a premium P/E, its historical growth rates justify the valuation when compared to the broader sector.
                  </p>
               </div>
               <Button variant="saffron" className="w-full rounded-2xl group">
                 Generate SWOT Comparison <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

const MetricRow = ({ value, highlight }: { value: string, highlight?: boolean }) => (
  <div className={cn(
    "h-12 flex items-center justify-center p-2 rounded-xl text-sm font-bold border transition-all",
    highlight ? "bg-accent-gold/15 border-accent-gold/30 text-accent-gold" : "bg-card border-card-border text-foreground shadow-sm"
  )}>
    {value}
  </div>
);

export default CompareCompanies;
