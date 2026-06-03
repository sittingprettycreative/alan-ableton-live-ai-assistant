import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Layers, Terminal, BookOpen, Cpu, Download, 
  ArrowRight, ShieldCheck, ChevronDown, Check, Zap, HelpCircle
} from 'lucide-react';
import { Navigation } from './components/Navigation';
import { DAWSimulator } from './components/DAWSimulator';
import { DocsSection } from './components/DocsSection';
import { AboutSection } from './components/AboutSection';
import { SupportSection } from './components/SupportSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('alan');
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Monitor real-time scroll position to drive visual coordinates and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight - windowHeight;
      
      // Calculate depth percentage
      if (totalHeight > 0) {
        setScrollPercentage(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }

      // Scroll Spy matching ID anchors
      const sections = ['alan', 'docs', 'about', 'support'];
      let currentActive = 'alan';

      for (const sectionId of sections) {
        const el = document.getElementById(`section-${sectionId}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is near the middle of screen
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.2) {
            currentActive = sectionId;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run to capture state on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Compute glowing color shifts based on active sections
  const getAmbientGlowClass = () => {
    if (activeSection === 'docs') return 'from-purple-500/10 via-cyan-500/5 to-transparent';
    if (activeSection === 'about') return 'from-cyan-500/10 via-purple-500/5 to-transparent';
    if (activeSection === 'support') return 'from-purple-500/10 via-pink-505/5 to-transparent';
    return 'from-cyan-500/15 via-[#a855f7]/5 to-transparent';
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-200 selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* Absolute cybernetic ambient glowing elements that translate with scroll */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Futuristic background grid lines */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30"></div>
        
        {/* Rotating ambient radial gradients */}
        <div className={`absolute top-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-radial transition-all duration-1000 blur-[130px] opacity-40 ${getAmbientGlowClass()}`}></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-emerald-500/5 via-transparent to-transparent blur-[120px] opacity-30"></div>
        
        {/* Floating Code Telemetry Stream overlaying right margin */}
        <div className="hidden xl:flex absolute top-24 right-6 flex-col items-end font-mono text-[9px] text-zinc-650 opacity-60 tracking-wider space-y-2 uppercase select-none">
          <div className="flex items-center space-x-1.5">
            <span className="text-zinc-500">SYS_SECTOR:</span>
            <span className="text-cyan-400 font-bold">{activeSection.toUpperCase()}</span>
          </div>
          <div>CYBER_DEPTH_COORD : {scrollPercentage.toFixed(1)}%</div>
          <div>MASTER_CLK_RATE : 124.00HZ</div>
          <div className="w-16 h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div 
              style={{ width: `${scrollPercentage}%` }} 
              className="h-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] transition-all duration-150"
            />
          </div>
        </div>

        {/* Floating Socials or Quick Indicators on the left margin */}
        <div className="hidden xl:flex absolute bottom-8 left-8 flex-col space-y-3 font-mono text-[9px] text-zinc-500 select-none">
          <div>ALAN ABLETON VST PLUGIN</div>
          <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
        </div>

      </div>

      {/* Futuristic Floating top navbar */}
      <Navigation 
        activeSection={activeSection} 
        onNavigate={handleScrollToSection} 
      />

      {/* Main Layout Wrap */}
      <main className="relative z-10 mx-auto max-w-[1800px] w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-16">
        
        {/* =========================================
            SECTION 1: ALAN (HERO SCREEN & DAW SIMULATOR)
            ========================================= */}
        <section 
          id="section-alan" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-10 lg:py-16 border-b border-obsidian-border"
        >
          {/* Header visual introduction badges */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hand: High-end display typography claims */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center space-x-2 rounded-full border border-white/5 bg-white/[0.03] px-3.5 py-1 text-[10px] select-none">
                <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono uppercase tracking-widest font-medium text-cyan-300">VST HOST CONNECTOR v1.4.2</span>
              </div>

              <h1 className="font-sans text-4xl sm:text-5.5xl font-light tracking-tight text-white leading-[1.1]">
                An intelligent assistant inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 font-light text-glow-cyan">Ableton Live.</span>
              </h1>

              <p className="text-zinc-400 text-[14px] leading-relaxed font-light max-w-md">
                ALAN is a modular AI integration plug-in designed to live natively on your channels. Refine progressions, orchestrate automations, and sculpt spectral spaces through refined conversational commands.
              </p>

              {/* Unique feature checklist highlighting product values */}
              <div className="space-y-4 pt-4 border-t border-white/5 max-w-md">
                <div className="flex items-start space-x-3 text-xs">
                  <div className="h-4.5 w-4.5 rounded-full border border-cyan-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-2.5 w-2.5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-medium text-zinc-200">Conversational Channel Automations</span>
                    <p className="text-zinc-500 text-[11px] mt-0.5 font-light">Direct stock parameters and complex rack macros dynamically using intuitive command signals.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <div className="h-4.5 w-4.5 rounded-full border border-cyan-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-2.5 w-2.5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-medium text-zinc-200">Generative Musical Geometry</span>
                    <p className="text-zinc-500 text-[11px] mt-0.5 font-light">Orchestrate chords, shape swing coefficients, and align grids directly with custom scale matrices.</p>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <button
                  onClick={() => {
                    const el = document.getElementById('simulation-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex items-center justify-center space-x-2 rounded-full bg-white hover:bg-zinc-100 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
                >
                  <span>LAUNCH SIMULATOR</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                  onClick={() => handleScrollToSection('docs')}
                  className="flex items-center justify-center space-x-1.5 rounded-full border border-white/10 hover:border-white/20 bg-transparent hover:bg-white/[0.03] px-6 py-3 font-mono text-[10px] font-medium tracking-widest text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <span>TELEMETRY API</span>
                </button>
              </div>

            </div>

            {/* Right Hand: Interactive Ableton + ALAN Simulation workspace */}
            <div className="lg:col-span-7 w-full">
              <DAWSimulator />
            </div>

          </div>

          {/* Scrolling interactive guide indicators */}
          <div className="hidden md:flex flex-col items-center justify-center mt-12 py-4 select-none animate-bounce">
            <span className="font-mono text-[9px] text-zinc-500 tracking-[0.15em] uppercase pl-1">SCROLL THROUGH CONTINUUMS FOR DOCUMENTATION</span>
            <ChevronDown className="h-4 w-4 text-cyan-400 mt-1" />
          </div>

        </section>

        {/* =========================================
            SECTION 2: DOCS
            ========================================= */}
        <section 
          id="section-docs" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 md:py-24 border-b border-obsidian-border"
        >
          <DocsSection />
        </section>

        {/* =========================================
            SECTION 3: ABOUT (ENGINE STACK)
            ========================================= */}
        <section 
          id="section-about" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 md:py-24 border-b border-obsidian-border"
        >
          <AboutSection />
        </section>

        {/* =========================================
            SECTION 4: SUPPORT (CONTACT CONSOLE)
            ========================================= */}
        <section 
          id="section-support" 
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 md:py-24 pb-20"
        >
          <SupportSection />
        </section>

      </main>

      {/* Cyber Footer */}
      <footer className="w-full border-t border-white/5 bg-[#050505]/95 backdrop-blur shadow-2xl py-8 mt-12">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-xs font-mono">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-950 border border-[#06b6d4]/35">
              <Sparkles className="h-3 w-3 text-cyan-400" />
            </div>
            <span className="font-bold tracking-wider text-zinc-400">ALAN AI SYSTEM // ABLETON PLUGIN</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => handleScrollToSection('alan')}>Home</span>
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => handleScrollToSection('docs')}>Docs</span>
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => handleScrollToSection('about')}>Engine</span>
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => handleScrollToSection('support')}>Support Portal</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
