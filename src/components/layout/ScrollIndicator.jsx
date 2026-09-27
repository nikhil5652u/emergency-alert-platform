import { useAlert } from '../../context/useAlert';
export default function ScrollIndicator() {
  const { scrollProgress, activeScenario } = useAlert();
  const pct = Math.round(scrollProgress * 100);
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 40, pointerEvents: 'none' }}>
      <div style={{ padding: '12px 18px', background: 'rgba(15,23,42,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: `3px solid ${activeScenario.accentColor}`, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>STAGE 01</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: activeScenario.accentColor, display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#f8fafc', letterSpacing: '0.04em' }}>EMERGENCY GENESIS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: activeScenario.accentColor, transition: 'width 0.1s linear' }} />
          </div>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{pct}%</span>
        </div>
      </div>
    </div>
  );
}