import React, { useState } from 'react';
import { Star, Plus, MoreVertical, Bell, Trash2, ArrowUpRight, ArrowDownRight, Sparkles, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { companies } from '../data/mock';
import { formatCurrency, cn } from '../lib/utils';
import { useApiResource } from '../hooks/useApiResource';
import { api } from '../services/api';

const Watchlist = () => {
  const [activeTab, setActiveTab] = useState('My Core');
  const { data: companyList } = useApiResource(api.companies, companies, []);
  const { data: watchlists } = useApiResource(api.watchlists, [
    { id: 'core', name: 'My Core', company_ids: ['reliance', 'tcs', 'hdfcbank'] },
    { id: 'tech', name: 'Tech Stocks', company_ids: ['tcs', 'infosys'] },
    { id: 'dividend', name: 'Dividend Growth', company_ids: ['reliance', 'hdfcbank'] },
  ], []);
  
  const activeList = watchlists.find((watchlist) => watchlist.name === activeTab) || watchlists[0];
  const watchlistItems = companyList.filter((company) => activeList?.company_ids.includes(company.id));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
          <p className="text-slate-400 mt-1">Track and monitor your favorite Indian stocks.</p>
        </div>
        <Button variant="saffron" className="gap-2">
          <Plus size={18} /> Create New List
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-900">
        {watchlists.map(({ name: tab }) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 text-sm font-bold transition-all relative",
              activeTab === tab ? "text-accent-gold" : "text-slate-500 hover:text-slate-300"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-4">
          {watchlistItems.map((company, i) => (
            <Card key={company.id} className="hover:border-accent-gold/45 transition-colors group">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-background-alt flex items-center justify-center text-accent-gold font-bold border border-border">
                    {company.ticker[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{company.name}</h3>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{company.ticker}</div>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                   <div className="text-right">
                      <div className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Price</div>
                      <div className="font-bold text-sm text-foreground">{formatCurrency(company.price)}</div>
                   </div>
                   <div className="text-right w-20">
                      <div className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Change</div>
                      <div className={cn(
                        "font-bold text-sm flex items-center justify-end",
                        company.change > 0 ? "text-success" : "text-danger"
                      )}>
                        {company.change > 0 ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
                        {Math.abs(company.change)}%
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card-border/50 rounded-xl transition-all"><Bell size={16} /></button>
                     <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card-border/50 rounded-xl transition-all"><MessageSquare size={16} /></button>
                     <button className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
           <Card className="border-accent-gold/15 shadow-glow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                  <Sparkles size={16} className="text-accent-gold" /> AI Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-2xl bg-background border border-border space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-accent-gold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" /> Corporate Action
                  </div>
                  <p className="text-xs text-muted-foreground">Reliance announced 1:1 bonus issue. Analysis suggests 5% EPS dilution but positive retail sentiment.</p>
                  <div className="text-[10px] text-muted-foreground/60">2 hours ago</div>
                </div>
                <div className="p-3 rounded-2xl bg-background border border-border space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-accent-saarthi uppercase">
                     Inside News
                  </div>
                  <p className="text-xs text-muted-foreground">TCS deal pipeline increased by $2.5B in Europe segment based on latest vendor disclosures.</p>
                  <div className="text-[10px] text-muted-foreground/60">6 hours ago</div>
                </div>
              </CardContent>
           </Card>

           <Card>
              <CardHeader>
                <CardTitle className="text-sm text-foreground">Quick Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea 
                  placeholder="Capture your thoughts..."
                  className="w-full bg-background border border-border rounded-xl p-3 text-xs min-h-[120px] focus:outline-none focus:ring-1 focus:ring-accent-gold text-foreground placeholder:text-muted-foreground resize-none"
                />
                <Button variant="navy" size="sm" className="w-full mt-3 rounded-xl text-[10px] h-8">Save Note</Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
