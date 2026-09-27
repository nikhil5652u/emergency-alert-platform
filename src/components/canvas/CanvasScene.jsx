import { useRef, useEffect } from 'react';
import { EmergencyEngine } from './EmergencyEngine';
import { useAlert } from '../../context/useAlert';

export default function CanvasScene() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const { activeScenario, scrollProgress, reducedMotion, pulseCount } = useAlert();

  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new EmergencyEngine(canvasRef.current, { reducedMotion });
    engineRef.current = engine;
    if (activeScenario?.accentColor) engine.setScenarioColor(activeScenario.accentColor);
    return () => { if (engineRef.current) { engineRef.current.dispose(); engineRef.current = null; } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (engineRef.current && activeScenario?.accentColor) engineRef.current.setScenarioColor(activeScenario.accentColor); }, [activeScenario]);
  useEffect(() => { if (engineRef.current) engineRef.current.setScrollProgress(scrollProgress); }, [scrollProgress]);
  useEffect(() => { if (engineRef.current && pulseCount > 0) engineRef.current.triggerPulse(); }, [pulseCount]);
  useEffect(() => { if (engineRef.current) engineRef.current.reducedMotion = reducedMotion; }, [reducedMotion]);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}