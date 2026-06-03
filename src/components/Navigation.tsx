import React from 'react';
import { Sparkles, Download, Terminal, Settings } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'alan', label: 'ALAN AI' },
    { id: 'docs', label: 'Documentation' },
    { id: 'about', label: 'About Engine' },
    { id: 'support', label: 'Producer Support' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Logo Section */}
        <div 
          onClick={() => onNavigate('alan')}
          className="flex cursor-pointer items-center space-x-3 group"
        >
          <div className="relative flex h-7 w-7 items-center justify-center rounded-sm bg-gradient-to-tr from-cyan-450 to-purple-400 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <span className="text-black font-medium text-[10px] font-mono">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-white uppercase">ALAN<span className="text-cyan-400">.</span></span>
            <span className="font-mono text-[8px] text-zinc-650 tracking-wider">LIVE INTEGRATION 1.4</span>
          </div>
        </div>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3.5 py-1.5 font-mono text-[10px] font-medium tracking-widest uppercase transition-all rounded-full ${
                  isActive 
                    ? 'text-cyan-400 font-semibold bg-white/[0.02]' 
                    : 'text-zinc-500 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              const el = document.getElementById('support-form-anchor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:flex items-center space-x-1 font-mono text-[9px] tracking-wider text-zinc-500 hover:text-zinc-300"
          >
            <Settings className="h-3 w-3 animate-spin-slow text-purple-400" />
            <span>CONNECT HOST</span>
          </button>
          
          <button 
            onClick={() => alert("Downloading ALAN VST plugin package for Ableton Live Suite (v11/v12).")}
            className="flex items-center space-x-1.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:bg-zinc-150 transition-all duration-300 px-4 py-1.5 cursor-pointer shadow-sm"
          >
            <Download className="h-2.5 w-2.5 inline text-black" />
            <span>INSTALL</span>
          </button>
        </div>
      </div>
    </header>
  );
}
