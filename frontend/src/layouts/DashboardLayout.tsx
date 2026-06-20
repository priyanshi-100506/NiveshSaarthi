import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Bell, BookOpen, Command, Home, MessageSquare, Search, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';
import BrandWordmark from '../components/BrandWordmark';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: Home, end: true },
  { to: '/dashboard/copilot', label: 'Copilot', icon: MessageSquare },
  { to: '/dashboard/library', label: 'Library', icon: BookOpen },
  { to: '/dashboard/search', label: 'Search', icon: Search },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan/20">
      <header className="sticky top-0 z-50 border-b border-white/[0.055] bg-[#0B1020]/82 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/dashboard" className="group flex items-baseline">
            <BrandWordmark size="md" className="transition-opacity group-hover:opacity-85" />
          </Link>

          <nav className="hidden items-center gap-1 rounded-lg border border-white/[0.055] bg-white/[0.035] p-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:bg-white/[0.035] hover:text-foreground',
                    isActive && 'bg-white/[0.075] text-foreground shadow-sm'
                  )
                }
              >
                <item.icon size={14} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/dashboard/search" className="hidden items-center gap-2 rounded-lg border border-white/[0.055] bg-white/[0.035] px-3 py-2 text-xs text-slate-400 hover:bg-white/[0.055] hover:text-foreground lg:flex">
              <Command size={14} />
              Search
              <span className="font-mono text-[10px] text-slate-600">Ctrl K</span>
            </Link>
            <button className="relative rounded-lg p-2 text-slate-400 hover:bg-white/[0.055] hover:text-foreground" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan" />
            </button>
            <Link to="/dashboard/copilot">
              <Button variant="saffron" className="hidden h-9 gap-2 px-4 sm:inline-flex">
                Copilot
              </Button>
            </Link>
            <button
              className="rounded-lg border border-border px-3 py-2 text-xs text-slate-400 md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
            >
              Menu
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-white/[0.055] bg-[#111827]/95 px-5 py-3 backdrop-blur-xl md:hidden">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-lg border border-white/[0.055] px-3 py-2 text-xs text-slate-400',
                      isActive && 'bg-white/[0.075] text-foreground'
                    )
                  }
                >
                  <item.icon size={14} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
