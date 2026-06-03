import React from 'react';
import { Cpu, Music, Pocket, Network, Terminal, CheckCircle } from 'lucide-react';

export function AboutSection() {
  const ENGINE_PILOTS = [
    {
      icon: Cpu,
      title: 'Neural-to-Live Translation Bridge',
      desc: 'Written in low-level Rust and C++ with MaxForLive bindings. It reads and writes parameter envelopes of any device or Track Object inside Ableton Live with absolute native zero-latency control.',
      metrics: 'Latency < 1.2ms'
    },
    {
      icon: Network,
      title: 'Advanced Music Parsing Algorithm',
      desc: 'Fine-tuned LLM transformer designed especially for musical geometry, MIDI syntax patterns, and producer-specific jargon. Understands dynamic colloquial commands like "heavy dark space" or "clean tight mix".',
      metrics: '99.4% Parsing Rigidity'
    },
    {
      icon: Music,
      title: 'Generative MIDI Logic engine',
      desc: 'Build cascading chord voicings, arpeggiated step grids, swing groove offsets, and micro-tonal variations in over 200 modal scales, instantly exported to standard MIDI Clip formats.',
      metrics: '200+ Scales Modal Library'
    },
    {
      icon: Terminal,
      title: 'Dynamic FX Insert Patching',
      desc: 'Intelligent parametric equalization sweeps, multi-band compression profiles, distortion saturation chains, and sidechain envelope mapping. Auto-creates return lines on the master strip when needed.',
      metrics: 'Auto DSP Device Routing'
    }
  ];

  return (
    <div className="w-full text-zinc-300">
      
      {/* Title block */}
      <div className="flex items-center space-x-3 mb-10">
        <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-zinc-950 border border-white/5">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] font-medium tracking-[0.3em] text-cyan-400 uppercase">THE ENGINE</span>
          <h2 className="font-sans text-2xl font-light tracking-tight text-white">How ALAN Re-imagines the DAW</h2>
        </div>
      </div>

      {/* Intro visual paragraph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-sans text-xl font-light text-white tracking-wide leading-relaxed">
            The first LLM-driven assistant built with zero-latency Max For Live system hooks.
          </h3>
          <p className="text-zinc-400 text-[13px] leading-relaxed font-light">
            By avoiding cloud API queues for primary MIDI rendering tasks, ALAN ensures that your local workspace responds cleanly at native DAW sample rates. Sound design triggers, automation envelopes, and clips quantization are calculated instantly on our low-footprint virtual engine, then written to the track array immediately.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="p-4 bg-transparent border border-white/5 rounded-xl">
              <span className="block font-mono text-[9px] text-zinc-500 mb-1 lg:tracking-wider">COMPATIBILITY</span>
              <span className="block font-sans text-xs text-zinc-300 font-medium">Ableton Suite 11 & 12</span>
            </div>
            <div className="p-4 bg-transparent border border-white/5 rounded-xl">
              <span className="block font-mono text-[9px] text-zinc-500 mb-1 lg:tracking-wider">PLATFORMS MAPPED</span>
              <span className="block font-sans text-xs text-zinc-300 font-medium">macOS (Silicon) & Windows</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-2xl border border-white/5 bg-transparent shadow-xl flex flex-col space-y-4">
          <span className="font-mono text-[8px] tracking-widest text-cyan-400 font-medium uppercase bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded w-max">
            SYSTEM COMPILER LOGS
          </span>
          <div className="font-mono text-[10px] space-y-2.5 text-zinc-500 overflow-x-auto select-none bg-zinc-950 p-4 rounded-lg border border-white/5 h-[180px] font-light">
            <div><span className="text-zinc-600">// Booting engine subsystems</span></div>
            <div>[OK] MaxAPI Live Module linked to VST socket 3000</div>
            <div>[OK] Transcribed vocal_envelope matrix variables ... OK</div>
            <div>[OK] Sidechain link matrix initialized. ratio=4.0</div>
            <div className="text-cyan-400 font-medium">[SUCCESS] Active thread listening for incoming telemetry hooks...</div>
            <div><span className="text-zinc-650">// Device status checks</span></div>
            <div>- Device 'AutoPan' parameter mapped to Slot 1</div>
            <div>- MIDI Generator matrix loaded. scale=F_MINOR</div>
          </div>
        </div>
      </div>

      {/* Bento-grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ENGINE_PILOTS.map((pilot, idx) => {
          const Icon = pilot.icon;
          return (
            <div 
              key={idx}
              className="p-6.5 rounded-2xl bg-transparent border border-white/5 hover:border-cyan-500/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.02)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-zinc-950 border border-white/5">
                    <Icon className="h-4.5 w-4.5 text-cyan-400" />
                  </div>
                  <span className="font-mono text-[8px] tracking-widest text-zinc-500 bg-zinc-950 px-2.5 py-1 border border-white/5 rounded-full uppercase">
                    {pilot.metrics}
                  </span>
                </div>
                <h4 className="font-sans text-base font-medium text-white tracking-wide">{pilot.title}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">{pilot.desc}</p>
              </div>

              {/* Status checks indicators */}
              <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                <CheckCircle className="h-3 w-3 text-cyan-450" />
                <span>Neural Subsystem Verified</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
