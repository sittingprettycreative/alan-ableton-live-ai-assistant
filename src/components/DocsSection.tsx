import React, { useState } from 'react';
import { Terminal, Copy, Check, BookOpen, Layers, Settings, ChevronRight } from 'lucide-react';

interface DocsTopic {
  id: string;
  category: string;
  title: string;
  description: string;
  syntax: string;
  examplePrompt: string;
  parsedOutput: string;
}

export function DocsSection() {
  const [activeTopicId, setActiveTopicId] = useState('getting-started');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const DOCS_TOPICS: DocsTopic[] = [
    {
      id: 'getting-started',
      category: 'Overview',
      title: 'Getting Started with ALAN',
      description: 'ALAN hooks directly into the Ableton Live Master Process via a custom MaxForLive bridge VST. Once loaded on any channel or global returns, ALAN reads the DAW midi event pool, tracks index, and device matrices. To instruct ALAN, simply write natural English expressions or trigger global hotkeys.',
      syntax: 'alan [command_keywords] [track_indicator] [modifiers]',
      examplePrompt: 'alan setup sidechain on tracks 2 mapped to track 4 kick link',
      parsedOutput: `{
  "action": "ROUTE_SIDECHAIN",
  "source_channel_idx": 3,
  "destination_channel_idx": 1,
  "parameters": {
    "device": "Autopan",
    "frequency": '1/4',
    "depth_percent": 85,
    "phase_degree": 360
  }
}`
    },
    {
      id: 'midi-alignment',
      category: 'MIDI Rules',
      title: 'MIDI Quantization & Alignment',
      description: 'Align and shift MIDI notes on your grid instantly. You can target specific bar divisions like 1/16, 1/8, or triplets, adjust velocity dynamics, or randomized deviations to keep a human feel.',
      syntax: 'quantize [midi_clips_selection] [grid_fraction] [strength_percent]',
      examplePrompt: 'quantize Lead MIDI track clips to 1/16 with 80% grid stiffness',
      parsedOutput: `{
  "action": "QUANTIZE_MIDI",
  "target_track": "Lead Synth",
  "target_clip_idx": 0,
  "grid_division": "1/16",
  "quantization_strength": 0.8,
  "humanize_randomness_ms": 0.0
}`
    },
    {
      id: 'parameter-automation',
      category: 'Automation',
      title: 'Macro Controls & Parameter Automation',
      description: 'Automate any device knob inside Ableton. Map complex filter ramps, LFO multipliers, panning, or volume curves directly. You can describe visual shapes like linear ramp, logarithmic fade, or step envelopes.',
      syntax: 'automate [device_parameter] on [track_selector] with [shape_envelope_profile] over [bars_count]',
      examplePrompt: 'create dynamic linear filter cutoff ramp from 100Hz to 12kHz over 8 bars on bass lead',
      parsedOutput: `{
  "action": "AUTOMATE_PARAMETER",
  "target_device": "AutoFilter",
  "target_knob": "Frequency",
  "envelope_shape": "LINEAR_UP",
  "range_min_hz": 100,
  "range_max_hz": 12000,
  "duration_bars": 8
}`
    },
    {
      id: 'vst-api',
      category: 'Advanced Settings',
      title: 'Neural Synthesizer Engine & Device Insertion',
      description: 'Quickly insert any stock VST or third-party synth (like Serum, FabFilter, or Native Instruments) and formulate presets from scratch. Describe parameters using emotional sonic words ("ambient", "distorted", "creamy", "aggressive").',
      syntax: 'insert [VST_name] on [track_selector] and load [preset_style_descriptor] style',
      examplePrompt: 'insert reverb on vocal track and make it sound like a dark massive concrete cave insert',
      parsedOutput: `{
  "action": "INSERT_VST",
  "plugin_name": "Reverb",
  "target_track": "Vocal Haze",
  "subsystems": {
    "decay_time_seconds": 7.4,
    "room_size": 120,
    "dry_wet_mix": 0.68,
    "eq_high_pass_hz": 200
  }
}`
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const currentTopic = DOCS_TOPICS.find(t => t.id === activeTopicId) || DOCS_TOPICS[0];

  return (
    <div className="w-full text-zinc-300">
      
      {/* Visual Header Grid Accent */}
      <div className="flex items-center space-x-3 mb-10">
        <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-zinc-950 border border-white/5">
          <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] font-medium tracking-[0.3em] text-cyan-400 uppercase">Telemetry Library</span>
          <h2 className="font-sans text-2xl font-light tracking-tight text-white">System Documentation</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Topic Sidebar (Cols: 4) */}
        <div className="md:col-span-4 flex flex-col space-y-3">
          <span className="font-mono text-[9px] text-zinc-650 font-semibold uppercase tracking-widest pl-1">DOCS TOPICS INDEX</span>
          
          <div className="flex flex-col space-y-1 bg-transparent border border-white/5 rounded-xl p-2 md:sticky md:top-24">
            {DOCS_TOPICS.map((topic) => {
              const isActive = topic.id === activeTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white/[0.02] border border-cyan-500/20 text-cyan-400 font-medium' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-600 font-normal uppercase tracking-widest">{topic.category}</span>
                    <span className="mt-0.5 tracking-wide">{topic.title}</span>
                  </div>
                  <ChevronRight className={`h-3 w-3 transition-transform ${isActive ? 'rotate-90 text-cyan-400' : 'text-zinc-655'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Topic Content details (Cols: 8) */}
        <div className="md:col-span-8 flex flex-col space-y-6">
          <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-transparent backdrop-blur-sm flex flex-col space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-cyan-400 font-medium uppercase tracking-widest bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-sm">
                {currentTopic.category}
              </span>
              <span className="font-mono text-[9px] text-zinc-600 uppercase">SYS_INDEX: {currentTopic.id}</span>
            </div>

            <h3 className="font-sans text-xl font-light tracking-tight text-white">{currentTopic.title}</h3>
            
            <p className="text-zinc-400 leading-relaxed font-light text-[13px]">{currentTopic.description}</p>

            {/* Syntax block */}
            <div className="pt-2">
              <span className="font-mono text-[9px] text-zinc-550 font-bold uppercase tracking-widest block mb-2.5">TELEMETRY SYNTAX TEMPLATE</span>
              <div className="p-3 bg-zinc-950 border border-white/5 rounded-lg text-[11px] font-mono text-cyan-300 overflow-x-auto text-center font-light">
                {currentTopic.syntax}
              </div>
            </div>

            {/* Prompt Example & Copy card */}
            <div className="space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-zinc-550 font-bold uppercase tracking-widest">EXAMPLE PRODUCER PROMPT</span>
                <button
                  onClick={() => handleCopy(currentTopic.examplePrompt)}
                  className="flex items-center space-x-1.5 font-mono text-[9px] text-zinc-500 hover:text-cyan-400 transition-colors bg-transparent border border-white/5 rounded-full px-3 py-1 cursor-pointer"
                >
                  {copiedText === currentTopic.examplePrompt ? (
                    <>
                      <Check className="h-2.5 w-2.5 text-cyan-400" />
                      <span className="text-cyan-400 uppercase tracking-widest">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-2.5 w-2.5" />
                      <span className="uppercase tracking-widest">COPY PROMPT</span>
                    </>
                  )}
                </button>
              </div>

              {/* Editable looking grey box */}
              <div 
                onClick={() => {
                  const simInputEl = document.querySelector('input[placeholder*="Apply vocal reverb"]') as HTMLInputElement;
                  if (simInputEl) {
                    simInputEl.value = currentTopic.examplePrompt;
                    const ev = new Event('input', { bubbles: true });
                    simInputEl.dispatchEvent(ev);
                    const el = document.getElementById('simulation-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative cursor-pointer p-4.5 rounded-xl border border-white/5 bg-zinc-950 hover:border-cyan-500/20 font-mono text-xs hover:shadow-[0_0_15px_rgba(6,182,212,0.02)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] text-cyan-500/80 font-medium flex items-center space-x-1 uppercase tracking-widest">
                    <Terminal className="h-3 w-3 inline text-cyan-400 animate-pulse" />
                    <span>CLICK MODULE TO FLY IT TO SIMULATOR</span>
                  </span>
                  <span className="text-[8px] text-zinc-650 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase font-medium">LAUNCH SIGNAL</span>
                </div>
                <div className="text-zinc-300 italic font-light">"{currentTopic.examplePrompt}"</div>
              </div>
            </div>

            {/* Raw JSON Parsing View */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-zinc-550 font-bold uppercase tracking-widest">ALAN PLUG-IN JSON ROUTING ARRAY</span>
              <pre className="p-4 bg-zinc-950 border border-white/5 rounded-xl text-[11px] font-mono text-cyan-300/90 overflow-x-auto font-light">
                <code>{currentTopic.parsedOutput}</code>
              </pre>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
