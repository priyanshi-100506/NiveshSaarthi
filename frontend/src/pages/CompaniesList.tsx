import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Building2, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { companies } from '../data/mock';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatCurrency, cn } from '../lib/utils';
import { useApiResource } from '../hooks/useApiResource';
import { api } from '../services/api';

const CompaniesList = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: companyList, isLoading, source } = useApiResource(api.companies, companies, []);

  const filteredCompanies = companyList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Market Database</h1>
          <p className="text-muted-foreground mt-1 text-[10px]">
            Track and audit listed Indian equities. {isLoading ? 'Refreshing...' : source === 'api' ? 'Connected to backend API.' : 'Using local fallback data.'}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-background border border-border p-0.5 rounded-xl">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-1.5 transition-colors cursor-pointer rounded-lg", view === 'grid' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-1.5 transition-colors cursor-pointer rounded-lg", view === 'list' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              <List size={16} />
            </button>
          </div>
          <Button variant="outline" className="gap-2 border-border bg-transparent text-foreground hover:bg-card rounded-xl text-[10px] h-8 font-bold">
            <Filter size={12} /> FILTERS
          </Button>
        </div>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input 
          type="text" 
          placeholder="Search company index (e.g. Reliance, TCS)..."
          className="w-full bg-card border border-border py-3.5 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-accent-gold transition-all text-xs text-foreground placeholder:text-muted-foreground rounded-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCompanies.map(company => (
            <Link key={company.id} to={`/dashboard/companies/${company.id}`}>
              <Card className="border border-card-border hover:border-accent-gold bg-card/40 hover:shadow-premium group h-full rounded-3xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 border border-border bg-background rounded-xl flex items-center justify-center text-foreground font-bold text-sm group-hover:border-accent-gold transition-colors">
                      {company.ticker.slice(0, 2)}
                    </div>
                    <div className={cn(
                      "flex items-center text-[9px] font-bold px-1.5 py-0.5 border uppercase tracking-widest rounded-lg",
                      company.change > 0 ? "border-success text-success bg-success/5" : "border-danger text-danger bg-danger/5"
                    )}>
                      {company.change > 0 ? "+" : ""}{company.change}%
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-sm leading-tight truncate text-foreground mb-1">{company.name}</h3>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      {company.ticker} // {company.sector}
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-border text-[10px]">
                    <div>
                      <div className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Price</div>
                      <div className="font-bold text-foreground">{formatCurrency(company.price)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Market Cap</div>
                      <div className="font-bold text-foreground">₹{company.marketCap}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-border bg-card overflow-x-auto rounded-[32px] shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-background-alt text-muted-foreground text-[9px] font-bold uppercase tracking-widest border-b border-border">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Ticker</th>
                <th className="px-6 py-4">Sector</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Market Cap</th>
                <th className="px-6 py-4 text-right">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCompanies.map(company => (
                <tr key={company.id} className="hover:bg-background-alt/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-bold text-foreground tracking-wider">
                    <Link to={`/dashboard/companies/${company.id}`} className="flex items-center gap-3">
                       <span className="w-6 h-6 border border-border bg-background rounded-lg flex items-center justify-center text-[9px] text-accent-gold">{company.ticker[0]}</span>
                       {company.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-[11px]">{company.ticker}</td>
                  <td className="px-6 py-4 text-muted-foreground uppercase tracking-widest text-[9px]">{company.sector}</td>
                  <td className="px-6 py-4 font-bold text-foreground">{formatCurrency(company.price)}</td>
                  <td className="px-6 py-4 text-muted-foreground">₹{company.marketCap}</td>
                  <td className={cn(
                    "px-6 py-4 text-right font-bold uppercase text-[10px]",
                    company.change > 0 ? "text-success" : "text-danger"
                  )}>
                    {company.change > 0 ? '+' : ''}{company.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompaniesList;
