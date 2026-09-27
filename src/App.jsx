import { useEffect } from 'react';
import Lenis from 'lenis';
import './App.css';
import { AlertProvider } from './context/AlertProvider';
import { useAlert } from './context/useAlert';
import CanvasScene from './components/canvas/CanvasScene';
import Navbar from './components/layout/Navbar';
import ScrollIndicator from './components/layout/ScrollIndicator';
import Stage01Emergency from './components/sections/Stage01Emergency';
import StageTeaser from './components/sections/StageTeaser';

function AppContent() {
  const { setScrollProgress, reducedMotion } = useAlert();

  useEffect(() => {
    if (reducedMotion) {
      const onScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(total > 0 ? window.scrollY / total : 0);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ({ progress }) => setScrollProgress(progress));
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, [setScrollProgress, reducedMotion]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#030712', color: '#f8fafc', overflowX: 'hidden' }}>
      <CanvasScene />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <Stage01Emergency />
        <StageTeaser />
      </main>
      <ScrollIndicator />
    </div>
  );
}

export default function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}