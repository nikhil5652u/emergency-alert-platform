import { ShieldAlert, Eye, EyeOff, Zap } from 'lucide-react';
import { useAlert } from '../../context/useAlert';

export default function Navbar() {
  const { activeScenario, setActiveScenario, scenarios, reducedMotion, setReducedMotion, triggerPulse } = useAlert();
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 24px' }}>
      <nav style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: 'rgba(10,15,30,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} aria-label="Navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}><ShieldAlert size={20} /></div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '0.05em', color: '#f8fafc' }}>AEGIS</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 9999, fontSize: 10, fontFamily: 'var(--font-mono)', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.08em' }}>3D SCROLL NET</span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', margin: 0 }}>ACCESSIBLE EMERGENCY BROADCAST</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {scenarios.map(sc => (
            <button key={sc.id} onClick={() => setActiveScenario(sc)} style={{ padding: '5px 12px', background: activeScenario.id === sc.id ? `${sc.accentColor}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${activeScenario.id === sc.id ? sc.accentColor : 'rgba(255,255,255,0.08)'}`, borderRadius: 8, color: activeScenario.id === sc.id ? '#fff' : 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: sc.accentColor, display: 'inline-block' }} />
              {sc.name.split(' ')[0]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={triggerPulse} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-mono)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }} title="Trigger pulse"><Zap size={14} /><span>PULSE</span></button>
          <button onClick={() => setReducedMotion(!reducedMotion)} style={{ background: reducedMotion ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${reducedMotion ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.1)'}`, color: reducedMotion ? '#fbbf24' : 'var(--text-muted)', padding: '6px 10px', borderRadius: 8, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)' }} aria-label="Toggle reduced motion">{reducedMotion ? <EyeOff size={14} /> : <Eye size={14} />}{reducedMotion ? 'MOTION OFF' : 'MOTION ON'}</button>
        </div>
      </nav>
    </header>
  );
}