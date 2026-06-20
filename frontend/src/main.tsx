import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { PerformanceProvider } from './context/PerformanceContext'


// Initialize performance mode early from localStorage or capabilities to prevent flash
const savedPerf = localStorage.getItem('performance-mode');
let initialPerf = savedPerf;
if (!initialPerf) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPower = 
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4);
  initialPerf = reducedMotion ? 'essential' : (lowPower ? 'balanced' : 'full');
  localStorage.setItem('performance-mode', initialPerf);
}
document.documentElement.setAttribute('data-perf', initialPerf);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerformanceProvider>
      <App />
    </PerformanceProvider>
  </StrictMode>,
)

