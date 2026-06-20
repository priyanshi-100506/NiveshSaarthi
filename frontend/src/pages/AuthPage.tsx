import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => setMode(mode === 'login' ? 'signup' : 'login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <Link to="/" className="mb-10 flex items-baseline gap-1 group">
        <span className="font-display text-4xl leading-none text-foreground">Nivesh</span>
        <span className="text-lg font-semibold tracking-wide text-cyan transition-colors group-hover:text-slate-200">Saarthi</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-card-border bg-card/65 backdrop-blur-2xl shadow-2xl">
          <CardContent className="p-10">
            <div className="text-center mb-10">
               <h1 className="text-3xl font-bold mb-2">
                 {mode === 'login' ? 'Welcome Back' : 'Create Account'}
               </h1>
               <p className="text-muted-foreground text-sm">
                 {mode === 'login' 
                   ? 'Enter your credentials to access your dashboard' 
                   : 'Join institutional grade research platform for India'
                 }
               </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Arjun Sharma"
                    className="w-full bg-background border border-border text-foreground rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-background border border-border text-foreground rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between pl-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Password</label>
                  {mode === 'login' && (
                    <a href="#" className="text-[10px] font-bold text-accent-gold hover:underline">Forgot password?</a>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full bg-background border border-border text-foreground rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button variant="saffron" className="w-full h-12 rounded-xl text-base font-bold group" type="submit">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </form>

            <div className="mt-8 relative text-center">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-border" />
              <span className="relative inline-block px-4 bg-card text-xs font-bold text-muted-foreground uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-border h-12 rounded-xl text-xs flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-border h-12 rounded-xl text-xs flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </Button>
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button onClick={toggleMode} className="text-accent-gold font-bold hover:underline">
                {mode === 'login' ? 'Sign up for free' : 'Sign in here'}
              </button>
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-[10px] text-muted-foreground space-x-4 uppercase font-bold tracking-widest">
           <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
           <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
