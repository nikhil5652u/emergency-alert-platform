import { CheckCircle2 } from 'lucide-react';
export default function StageTeaser() {
  return (
    <section style={{ minHeight: '80vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: 720, width: '100%', padding: 40, textAlign: 'center', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16 }}>
        <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#f8fafc', marginBottom: 14 }}>Phase 1 — Foundation Running</h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>3D WebGL engine, smooth scroll synchronisation, and the Stage 01 crisis narrative are all operational. Stages 2–8 load next.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, textAlign: 'left' }}>
          {[['WebGL 3D Engine', 'Three.js instanced rendering, 60 FPS, DPR clamped'], ['Lenis Scroll', 'Momentum scroll driver syncing camera spline & telemetry'], ['A11y Safety', 'prefers-reduced-motion, manual toggle, mobile fallbacks']].map(([title, desc]) => (
            <div key={title} style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', marginBottom: 6 }}><CheckCircle2 size={14} /><span style={{ fontWeight: 700, fontSize: 12 }}>{title}</span></div>
              <p style={{ fontSize: 11, color: 'var(--text-faint)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}