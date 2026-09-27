import { AlertTriangle, Clock, Radio, Users, ChevronDown, Zap, Shield } from 'lucide-react';
import { useAlert } from '../../context/useAlert';

export default function Stage01Emergency() {
  const { activeScenario, setActiveScenario, scenarios, triggerPulse, scrollProgress } = useAlert();
  const ac = activeScenario.accentColor || '#ef4444';
  const card = { background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 12 };
  return (
    <section style={{ position: 'relative', minHeight: '220vh', width: '100%', paddingTop: 120, pointerEvents: 'none' }}>
      <div style={{ position: 'sticky', top: 90, minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', pointerEvents: 'auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(300px,560px) minmax(280px,380px)', gap: 40, alignItems: 'center', justifyContent: 'space-between' }}>
          {/* LEFT — Story Panel */}
          <div style={{ background: 'rgba(15,23,42,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: `4px solid ${ac}`, borderRadius: 16, padding: 36, boxShadow: '0 16px 40px -12px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9999, fontSize: 11, fontFamily: 'var(--font-mono)', color: ac, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: ac, display: 'inline-block', boxShadow: `0 0 6px ${ac}` }} />
                PHASE 01 // EMERGENCY DETECTED
              </span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>LATENCY: 42ms</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', lineHeight: 1.15, fontWeight: 800, color: '#f8fafc', marginBottom: 14, letterSpacing: '-0.02em' }}>
              When disaster strikes, every second is life or death.
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 24 }}>
              Civil sensors trigger automated hazard escalation across vulnerable municipal sectors. Standard systems fail when panic and jargon overwhelm citizens who need simple, immediate guidance.
            </p>
            <div style={{ ...card, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <AlertTriangle size={14} color={ac} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: ac, fontWeight: 700 }}>{activeScenario.severity}</span>
              </div>
              <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#cbd5e1', lineHeight: 1.5 }}>{activeScenario.rawAlert}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
              {[
                { icon: <Clock size={11} />, label: 'IMPACT IN', value: activeScenario.timeToImpact },
                { icon: <Users size={11} />, label: 'AT RISK', value: '142,500' },
                { icon: <Radio size={11} />, label: 'FREQ', value: activeScenario.beaconFreq }
              ].map(({ icon, label, value }) => (
                <div key={label} style={card}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-faint)', fontSize: 10, marginBottom: 4 }}>{icon}<span>{label}</span></div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#f8fafc' }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', display: 'block', marginBottom: 8 }}>SELECT SIMULATION THREAT:</span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {scenarios.map(sc => (
                  <button key={sc.id} onClick={() => setActiveScenario(sc)} style={{ padding: '7px 13px', background: activeScenario.id === sc.id ? `${sc.accentColor}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${activeScenario.id === sc.id ? sc.accentColor : 'rgba(255,255,255,0.08)'}`, borderRadius: 8, color: activeScenario.id === sc.id ? '#fff' : 'var(--text-muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.accentColor, display: 'inline-block' }} />
                    {sc.name}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={triggerPulse} style={{ width: '100%', padding: '12px 18px', background: ac, color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono)', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 0 24px -6px ${ac}` }}>
              <Zap size={16} /><span>PULSE 3D BEACON</span>
            </button>
          </div>
          {/* RIGHT — Telemetry HUD */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'rgba(10,15,30,0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Shield size={14} color="#38bdf8" />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 600 }}>REAL-TIME NETWORK TELEMETRY</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>The 3D canvas is the live civil telemetry grid. Scroll to fly the camera into the signal propagation pathway.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                {[['ACTIVE NODES:', '55 RELAYS', '#f8fafc'], ['CAMERA ZOOM:', `${Math.round(scrollProgress * 100)}% FORWARD`, ac], ['3D PARALLAX:', 'ACTIVE (MOUSE)', '#34d399']].map(([k, v, c]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-faint)' }}><span>{k}</span><span style={{ color: c }}>{v}</span></div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              <ChevronDown size={14} style={{ flexShrink: 0 }} />
              <span>SCROLL DOWN TO ADVANCE 3D CAMERA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}