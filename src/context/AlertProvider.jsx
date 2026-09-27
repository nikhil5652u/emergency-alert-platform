import { useState, useEffect } from 'react';
import { AlertContext } from './AlertContext';
import { SCENARIOS } from '../utils/alertData';

export function AlertProvider({ children }) {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const triggerPulse = () => setPulseCount((c) => c + 1);

  return (
    <AlertContext.Provider value={{
      activeScenario, setActiveScenario,
      scenarios: SCENARIOS,
      scrollProgress, setScrollProgress,
      reducedMotion, setReducedMotion,
      pulseCount, triggerPulse
    }}>
      {children}
    </AlertContext.Provider>
  );
}
