import React from 'react';
import { User, Bell, Shield, CreditCard, Database, Sparkles, Zap, Globe, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';
import { usePerformance } from '../context/PerformanceContext';

const Settings = () => {
  const { performanceMode, setPerformanceMode } = usePerformance();

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account preferences and subscription.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1">
          <SettingsNav label="Profile" icon={User} active />
          <SettingsNav label="Notifications" icon={Bell} />
          <SettingsNav label="Security" icon={Shield} />
          <SettingsNav label="Subscription" icon={CreditCard} />
          <SettingsNav label="Data Sources" icon={Database} />
        </div>

        <div className="md:col-span-3 space-y-8">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>This information will be displayed on your generated reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-background-alt border border-border flex items-center justify-center text-accent-gold text-2xl font-black">
                  AS
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-[10px] rounded-lg">Change Avatar</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] rounded-lg text-red-500">Remove</Button>
                  </div>
                  <p className="text-[10px] text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">First Name</label>
                  <input type="text" defaultValue="Arjun" className="w-full bg-background border border-border text-foreground rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Last Name</label>
                  <input type="text" defaultValue="Sharma" className="w-full bg-background border border-border text-foreground rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Email</label>
                <input type="email" defaultValue="arjun@investsaarthi.in" className="w-full bg-background border border-border text-foreground rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold" />
              </div>
              <Button variant="saffron" className="rounded-xl h-10 px-8">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Performance Selector Section */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Fidelity</CardTitle>
              <CardDescription>Intelligently scale visual richness and animations based on your device capability.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Full Experience */}
                  <div 
                    onClick={() => setPerformanceMode('full')}
                    className={cn(
                      "p-4 rounded-2xl border-2 flex flex-col gap-3 group cursor-pointer transition-all bg-secondary/20",
                      performanceMode === 'full' 
                        ? "border-cyan bg-secondary/40 shadow-lg shadow-cyan/5" 
                        : "border-border hover:border-cyan/30"
                    )}
                  >
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground flex items-center gap-2">
                           <Sparkles size={14} className="text-cyan animate-pulse"/> Full
                        </span>
                        {performanceMode === 'full' ? (
                          <div className="w-4 h-4 rounded-full bg-cyan flex items-center justify-center">
                            <Check size={10} className="text-[#020617]"/>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-border" />
                        )}
                     </div>
                     <p className="text-[10px] text-blue-300/60 leading-normal">
                        Optimized for modern GPUs & high-performance environments.
                     </p>
                     <ul className="text-[9px] text-blue-300/40 space-y-1 mt-auto border-t border-border/30 pt-2 font-mono">
                        <li>• Ambient Lights: Active</li>
                        <li>• Glassmorphism: 24px Blur</li>
                        <li>• Stagger Reveals: 40ms</li>
                        <li>• Streaming: Char-level</li>
                     </ul>
                  </div>

                  {/* Balanced Experience */}
                  <div 
                    onClick={() => setPerformanceMode('balanced')}
                    className={cn(
                      "p-4 rounded-2xl border-2 flex flex-col gap-3 group cursor-pointer transition-all bg-secondary/20",
                      performanceMode === 'balanced' 
                        ? "border-cyan bg-secondary/40 shadow-lg shadow-cyan/5" 
                        : "border-border hover:border-cyan/30"
                    )}
                  >
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground flex items-center gap-2">
                           <Zap size={14} className="text-blue-300"/> Balanced
                        </span>
                        {performanceMode === 'balanced' ? (
                          <div className="w-4 h-4 rounded-full bg-cyan flex items-center justify-center">
                            <Check size={10} className="text-[#020617]"/>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-border" />
                        )}
                     </div>
                     <p className="text-[10px] text-blue-300/60 leading-normal">
                        Designed for standard mobile devices and mid-range systems.
                     </p>
                     <ul className="text-[9px] text-blue-300/40 space-y-1 mt-auto border-t border-border/30 pt-2 font-mono">
                        <li>• Ambient Lights: Soft</li>
                        <li>• Glassmorphism: 12px Blur</li>
                        <li>• Stagger Reveals: 25ms</li>
                        <li>• Streaming: Chunk-level</li>
                     </ul>
                  </div>

                  {/* Essential Experience */}
                  <div 
                    onClick={() => setPerformanceMode('essential')}
                    className={cn(
                      "p-4 rounded-2xl border-2 flex flex-col gap-3 group cursor-pointer transition-all bg-secondary/20",
                      performanceMode === 'essential' 
                        ? "border-cyan bg-secondary/40 shadow-lg shadow-cyan/5" 
                        : "border-border hover:border-cyan/30"
                    )}
                  >
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground flex items-center gap-2">
                           <Shield size={14} className="text-blue-300"/> Essential
                        </span>
                        {performanceMode === 'essential' ? (
                          <div className="w-4 h-4 rounded-full bg-cyan flex items-center justify-center">
                            <Check size={10} className="text-[#020617]"/>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-border" />
                        )}
                     </div>
                     <p className="text-[10px] text-blue-300/60 leading-normal">
                        Optimized for low-power environments or reduced motion preference.
                     </p>
                     <ul className="text-[9px] text-blue-300/40 space-y-1 mt-auto border-t border-border/30 pt-2 font-mono">
                        <li>• Ambient Lights: Off</li>
                        <li>• Glassmorphism: 0px</li>
                        <li>• Stagger Reveals: None</li>
                        <li>• Streaming: Instantly</li>
                     </ul>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Subscription Section */}
          <Card className="border-cyan/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
               <CreditCard size={40} className="text-cyan/20" />
            </div>
            <CardHeader>
               <CardTitle>Saarthi Premium</CardTitle>
               <CardDescription>You are currently on the Free Tier</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl bg-secondary/30 border border-border">
                   <div className="flex-1">
                      <h4 className="font-bold mb-2 text-foreground">Upgrade for unlimited insights</h4>
                      <p className="text-xs text-blue-300/60 leading-relaxed">Institutional grade data, prioritized AI responses, and advanced document analysis features starting from ₹999/month.</p>
                   </div>
                   <Button variant="saffron" className="rounded-xl px-10 shrink-0">View Plans <ArrowRight size={16} className="ml-2"/></Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SettingsNav = ({ label, icon: Icon, active }: { label: string, icon: any, active?: boolean }) => (
  <button className={cn(
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
    active ? "bg-accent-gold/15 text-accent-gold border border-border shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
  )}>
    <Icon size={18} />
    {label}
  </button>
);

export default Settings;
