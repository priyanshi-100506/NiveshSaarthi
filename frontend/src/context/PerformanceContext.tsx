import React, { createContext, useContext, useState, useEffect } from 'react';

export type PerformanceMode = 'full' | 'balanced' | 'essential';

interface PerformanceContextType {
  performanceMode: PerformanceMode;
  setPerformanceMode: (mode: PerformanceMode) => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [performanceMode, setPerformanceModeState] = useState<PerformanceMode>(() => {
    const saved = localStorage.getItem('performance-mode') as PerformanceMode | null;
    if (saved === 'full' || saved === 'balanced' || saved === 'essential') {
      return saved;
    }
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4);
    
    if (reducedMotion) return 'essential';
    if (lowPower) return 'balanced';
    return 'full';
  });

  const setPerformanceMode = (mode: PerformanceMode) => {
    setPerformanceModeState(mode);
    localStorage.setItem('performance-mode', mode);
    document.documentElement.setAttribute('data-perf', mode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-perf', performanceMode);
  }, [performanceMode]);

  return (
    <PerformanceContext.Provider value={{ performanceMode, setPerformanceMode }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
