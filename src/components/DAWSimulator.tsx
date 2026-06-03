import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Square, Volume2, Send, Sparkles, Music, 
  Layers, ChevronRight, Activity, Grid as GridIcon, Check, RefreshCw
} from 'lucide-react';
import { AICommand, TrackData } from '../types';

export function DAWSimulator() {
  // Global DAW State
  const [isPlaying, setIsPlaying] = useState(true);
  const [bpm, setBpm] = useState(124);
  const [activeAction, setActiveAction] = useState<string>('idle');
  const [customPrompt, setCustomPrompt] = useState('');
  
  // Track State
  const [tracks, setTracks] = useState<TrackData[]>([
    {
      name: 'Synth Chords',
      type: 'midi',
      color: 'bg-cyan-500',
      active: true,
      volume: 78,
      pan: 'C',
      clips: [{ name: 'Chords_Pattern_1', duration: 4, notesActive: true, quantized: false }]
    },
    {
      name: 'Sub Bassline',
      type: 'midi',
      color: 'bg-purple-500',
      active: true,
      volume: 85,
      pan: 'L12',
      clips: [{ name: 'Deep_Bass_Line', duration: 4, notesActive: true, hasEffectWave: false }]
    },
    {
      name: 'Vocal Haze',
      type: 'audio',
      color: 'bg-cyan-400',
      active: true,
      volume: 68,
      pan: 'R18',
      clips: [{ name: 'Ambient_Vox_Spells', duration: 8, hasEffectWave: false }]
    },
    {
      name: 'Techno Groove',
      type: 'audio',
      color: 'bg-purple-400',
      active: true,
      volume: 90,
      pan: 'C',
      clips: [{ name: 'Percuv_Loop_124', duration: 4, hasEffectWave: false }]
    }
  ]);

  // Audio Peak Meters Simulation
  const [meters, setMeters] = useState<number[]>([70, 65, 50, 80]);
  useEffect(() => {
    if (!isPlaying) {
      setMeters([0, 0, 0, 0]);
      return;
    }
    const interval = setInterval(() => {
      setMeters(prev => prev.map((val, idx) => {
        const base = tracks[idx].active ? tracks[idx].volume * 0.8 : 0;
        const noise = (Math.random() - 0.5) * 15;
        return Math.max(0, Math.min(100, Math.floor(base + noise)));
      }));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying, tracks]);

  // ALAN Plugin Chat State
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'alan'; text: string; time: string; type?: 'system' | 'success' }[]>([
    { sender: 'alan', text: "A.L.A.N. Virtual Assistant online // Audio Engine Bound.", time: "00:01", type: "system" },
    { sender: 'alan', text: "Greetings, Producer. Select a physical presets block below, or instruct me via live text telemetry command.", time: "00:01" }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLog.length > 2 || isAiTyping) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [chatLog, isAiTyping]);

  // Preset Commands Base Catalog
  const PRESETS: AICommand[] = [
    {
      id: 'cmd-quantize',
      label: 'Quantize Synth MIDI',
      promptText: 'Quantize MIDI clips on Track 1 to absolute 1/16 grid at 100% strength',
      category: 'MIDI',
      responses: [
        "Analyzing midi event matrix on Track 1 [Synth Chords]...",
        "Calculated 32 note coordinates with average onset deviance of +14.2ms.",
        "Applying rigid 1/16 subdivision quantization... Grid align calculations completed.",
        "Modified MIDI note parameters successfully. Jitter locked to 0.00ms."
      ],
      actionType: 'quantize',
      targetTrackIndex: 0
    },
    {
      id: 'cmd-sidechain',
      label: 'Setup Sidechain Pump',
      promptText: 'Apply rhythmic sidechain pumping effect to my bass track mapped from the Kick',
      category: 'Automation',
      responses: [
        "Routing sidechain control link from Track 4 [Techno Groove] transient spikes...",
        "Instantiating sidechain modulator core on Track 2 [Sub Bassline]...",
        "Configured Autopan ducking curve. Phase: 360°, Frequency: 1/4 Note, Depth: 85%.",
        "Pumping motion active synchronized with kick drum transients."
      ],
      actionType: 'sidechain',
      targetTrackIndex: 1
    },
    {
      id: 'cmd-reverb',
      label: 'Atmospheric Vocal Space',
      promptText: 'Widen Track 3 Vocal and inject a huge ethereal room reverb tail',
      category: 'FX',
      responses: [
        "Scanning audio channel spectral data on Track 3 [Vocal Haze]...",
        "Inserting 'Neural Space Diffuser' spatial effector VST link on track insert 2...",
        "Parameters applied -> Space Size: 140, Blend: 68% wet, Color profile: Dark / Ethereal.",
        "Active. 7.6-second immersive harmonic tail successfully embedded."
      ],
      actionType: 'reverb',
      targetTrackIndex: 2
    },
    {
      id: 'cmd-bpm',
      label: 'Set Tempo to 138 BPM',
      promptText: 'Let\'s kick this project into overdrive, speed up to 138 BPM',
      category: 'Arrangement',
      responses: [
        "Recalculating master digital master clock...",
        "Scaling 4 warped audio layers & stretch engine parameters to preserve pitch envelopes...",
        "Synchronizing DAW transport master cycle rate...",
        "Global project tempo accelerated from 124 BPM to 138 BPM."
      ],
      actionType: 'bpm',
      targetTrackIndex: 3
    },
    {
      id: 'cmd-melody',
      label: 'Generate F-Minor Melody',
      promptText: 'Generate a futuristic cascading synth lead patterns in F-Minor on track 1',
      category: 'MIDI',
      responses: [
        "Booting AI Melody Core framework...",
        "Selecting key signature constraints: F-Minor Aeolian (F, G, Ab, Bb, C, Db, Eb).",
        "Calculating 8-bar rhythmic motif featuring triplets and ascending filter-opens...",
        "Injecting 16 new MIDI note sequences directly into Chords_Pattern_1!"
      ],
      actionType: 'generate_melody',
      targetTrackIndex: 0
    }
  ];

  const handleCommandPress = async (cmd: AICommand) => {
    if (isAiTyping) return;
    
    // Add user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setChatLog(prev => [...prev, { sender: 'user', text: cmd.promptText, time: timestamp }]);
    
    setIsAiTyping(true);
    setActiveAction(cmd.actionType);

    // Dynamic state transformations based on action
    if (cmd.actionType === 'bpm') {
      // Shift BPM gradually
      let currentBpm = bpm;
      const targetBpm = 138;
      const bpmInterval = setInterval(() => {
        if (currentBpm < targetBpm) {
          currentBpm += 2;
          setBpm(Math.min(targetBpm, currentBpm));
        } else {
          clearInterval(bpmInterval);
        }
      }, 100);
    }

    // Step-by-step typing animation for ALAN response
    for (let i = 0; i < cmd.responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 800 : 1200));
      setChatLog(prev => [
        ...prev, 
        { 
          sender: 'alan', 
          text: cmd.responses[i], 
          time: timestamp,
          type: i === cmd.responses.length - 1 ? 'success' : undefined
        }
      ]);
    }

    setIsAiTyping(false);

    // Mutate the visual properties of tracks inside the DAW simulator to prove real-time reaction!
    setTracks(prev => prev.map((track, idx) => {
      if (idx === cmd.targetTrackIndex) {
        const clonedClips = [...track.clips];
        if (cmd.actionType === 'quantize') {
          clonedClips[0] = { ...clonedClips[0], quantized: true };
        } else if (cmd.actionType === 'sidechain') {
          clonedClips[0] = { ...clonedClips[0], hasEffectWave: true, effectWaveType: 'sidechain' };
        } else if (cmd.actionType === 'reverb') {
          clonedClips[0] = { ...clonedClips[0], hasEffectWave: true, effectWaveType: 'reverb' };
        } else if (cmd.actionType === 'generate_melody') {
          clonedClips[0] = { ...clonedClips[0], name: 'AI_Melodic_Sequence_FMin', notesActive: true };
        }
        return { ...track, clips: clonedClips };
      }
      return track;
    }));
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim() || isAiTyping) return;

    const text = customPrompt;
    setCustomPrompt('');
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Add User message
    setChatLog(prev => [...prev, { sender: 'user', text: text, time: timestamp }]);
    setIsAiTyping(true);

    // Generate responsive reply based on tags inside user typed prompt
    setTimeout(async () => {
      let matchingReply: AICommand | null = null;
      const cleanText = text.toLowerCase();

      if (cleanText.includes('quantize') || cleanText.includes('align') || cleanText.includes('grid')) {
        matchingReply = PRESETS[0];
      } else if (cleanText.includes('sidechain') || cleanText.includes('pump') || cleanText.includes('duck')) {
        matchingReply = PRESETS[1];
      } else if (cleanText.includes('reverb') || cleanText.includes('space') || cleanText.includes('vocal')) {
        matchingReply = PRESETS[2];
      } else if (cleanText.includes('bpm') || cleanText.includes('tempo') || cleanText.includes('speed')) {
        matchingReply = PRESETS[3];
      } else if (cleanText.includes('generate') || cleanText.includes('melody') || cleanText.includes('notes')) {
        matchingReply = PRESETS[4];
      }

      if (matchingReply) {
        setActiveAction(matchingReply.actionType);
        if (matchingReply.actionType === 'bpm') {
          // Accelerate BPM
          let currentBpm = bpm;
          const targetBpm = 138;
          const bpmInterval = setInterval(() => {
            if (currentBpm < targetBpm) {
              currentBpm += 2;
              setBpm(Math.min(targetBpm, currentBpm));
            } else {
              clearInterval(bpmInterval);
            }
          }, 100);
        }

        for (let i = 0; i < matchingReply.responses.length; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 0 ? 600 : 1000));
          setChatLog(prev => [
            ...prev,
            { 
              sender: 'alan', 
              text: matchingReply!.responses[i], 
              time: timestamp,
              type: i === matchingReply!.responses.length - 1 ? 'success' : undefined
            }
          ]);
        }

        // Apply visual updates on tracks
        const act = matchingReply.actionType;
        const targetIdx = matchingReply.targetTrackIndex;
        setTracks(prev => prev.map((track, idx) => {
          if (idx === targetIdx) {
            const clonedClips = [...track.clips];
            if (act === 'quantize') clonedClips[0] = { ...clonedClips[0], quantized: true };
            if (act === 'sidechain') clonedClips[0] = { ...clonedClips[0], hasEffectWave: true, effectWaveType: 'sidechain' };
            if (act === 'reverb') clonedClips[0] = { ...clonedClips[0], hasEffectWave: true, effectWaveType: 'reverb' };
            if (act === 'generate_melody') clonedClips[0] = { ...clonedClips[0], name: 'AI_Melodic_Sequence_FMin', notesActive: true };
            return { ...track, clips: clonedClips };
          }
          return track;
        }));

      } else {
        // Fallback natural language assistant responses
        const randomAnswers = [
          "Parsing inputs... Custom digital mapping detected.",
          "Linking parameter indices via internal Live Hook... Value updated.",
          "Calculations computed perfectly. Modified Ableton Live audio matrix telemetry."
        ];
        setActiveAction('custom');
        for (let i = 0; i < randomAnswers.length; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 800));
          setChatLog(prev => [...prev, { sender: 'alan', text: randomAnswers[i], time: timestamp }]);
        }
      }
      setIsAiTyping(false);
    }, 500);
  };

  const handleReset = () => {
    setBpm(124);
    setActiveAction('idle');
    setTracks([
      {
        name: 'Synth Chords',
        type: 'midi',
        color: 'bg-cyan-500',
        active: true,
        volume: 78,
        pan: 'C',
        clips: [{ name: 'Chords_Pattern_1', duration: 4, notesActive: true, quantized: false }]
      },
      {
        name: 'Sub Bassline',
        type: 'midi',
        color: 'bg-purple-500',
        active: true,
        volume: 85,
        pan: 'L12',
        clips: [{ name: 'Deep_Bass_Line', duration: 4, notesActive: true, hasEffectWave: false }]
      },
      {
        name: 'Vocal Haze',
        type: 'audio',
        color: 'bg-cyan-400',
        active: true,
        volume: 68,
        pan: 'R18',
        clips: [{ name: 'Ambient_Vox_Spells', duration: 8, hasEffectWave: false }]
      },
      {
        name: 'Techno Groove',
        type: 'audio',
        color: 'bg-purple-400',
        active: true,
        volume: 90,
        pan: 'C',
        clips: [{ name: 'Percuv_Loop_124', duration: 4, hasEffectWave: false }]
      }
    ]);
    setChatLog(prev => [
      ...prev,
      { sender: 'alan', text: 'Telemetry states restarted. All tracks returned to base configurations.', time: 'System', type: 'system' }
    ]);
  };

  return (
    <div id="simulation-anchor" className="w-full rounded-2xl border border-obsidian-border bg-[#0e1017] shadow-2xl overflow-hidden text-zinc-300">
      
      {/* DAW Simulator Outer Top Control Bar (BPM, Transport, Quantization, CPU) */}
      <div className="flex h-12 w-full items-center justify-between border-b border-obsidian-border bg-[#141722] px-4 select-none">
        
        {/* Left Side: BPM and Global Transport Controls */}
        <div className="flex items-center space-x-4">
          
          {/* BPM display with flash animations */}
          <div className="flex items-center space-x-1.5 rounded-sm bg-[#111] px-2.5 py-1 border border-white/5 font-mono text-xs">
            <span className="text-zinc-500 text-[10px] tracking-wider font-semibold">TAP</span>
            <div className="relative">
              <span className={`font-bold tabular-nums tracking-normal text-cyan-400 text-sm ${activeAction === 'bpm' ? 'animate-pulse text-purple-400' : ''}`}>
                {bpm.toFixed(2)}
              </span>
            </div>
            <span className="text-zinc-500 font-semibold text-[10px]">BPM</span>
          </div>

          {/* Time Signature */}
          <div className="hidden sm:flex items-center space-x-1 rounded-sm bg-[#1a1e2d] px-2 py-1 text-[11px] font-mono border border-zinc-800 text-zinc-400">
            <span className="font-bold text-zinc-200">4 / 4</span>
          </div>

          {/* Master Play controls */}
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setIsPlaying(true)}
              className={`flex h-7 w-8 items-center justify-center rounded-sm transition-colors border ${
                isPlaying 
                  ? 'bg-cyan-500 text-black border-cyan-400' 
                  : 'bg-[#111] hover:bg-zinc-900 border-white/5'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
            </button>
            <button 
              onClick={() => setIsPlaying(false)}
              className={`flex h-7 w-8 items-center justify-center rounded-sm transition-colors border ${
                !isPlaying 
                  ? 'bg-purple-500 text-white border-purple-400' 
                  : 'bg-[#111] hover:bg-zinc-900 border-white/5'
              }`}
            >
              <Square className="h-3 w-3 fill-current" />
            </button>
          </div>
        </div>

        {/* Center Title Banner: Simulation Mode indicator */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="relative flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-cyan-450">DAW ENGINE ONLINE (ACTIVE INTEGRATION)</span>
          </div>
        </div>

        {/* Right Side Info Panel */}
        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <div className="hidden lg:flex items-center space-x-1.5 text-zinc-500">
            <span>KEY:</span>
            <span className="text-zinc-300 font-semibold bg-[#1c2132] px-1.5 py-0.5 rounded border border-zinc-800">F minor</span>
          </div>
          <div className="flex items-center space-x-1 bg-[#111] px-2 py-0.5 border border-white/5 rounded">
            <span className="text-zinc-500">CPU</span>
            <span className="text-cyan-400 font-bold tabular-nums w-7 text-right">3.8%</span>
          </div>
          <button 
            onClick={handleReset}
            title="Reset Simulator Settings"
            className="flex items-center justify-center p-1 rounded-sm bg-[#1a1e2d] hover:bg-zinc-800 transition-colors border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:white cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* Main Container: DAW Screen split with internal ALAN float-widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] w-full bg-[#0a0b0e]">
        
        {/* LEFTSIDE: Ableton Tracks Grid - 7 Columns */}
        <div className="lg:col-span-8 flex flex-col p-4 border-b lg:border-b-0 lg:border-r border-white/5 select-none">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-wider font-semibold text-zinc-400">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>ABLETON ARRANGEMENT TIMELINE</span>
            </div>
            {/* Cycle info */}
            <span className="font-mono text-[10px] text-zinc-500">CYCLE RASTER: 1 BAR</span>
          </div>

          {/* Ableton Tracks Space */}
          <div className="flex flex-col space-y-2.5 flex-grow">
            {tracks.map((track, trackIdx) => {
              const peakMeter = meters[trackIdx];
              const isSynthTrack = trackIdx === 0;
              const isBassTrack = trackIdx === 1;
              const isVocalTrack = trackIdx === 2;

              return (
                <div 
                  key={track.name}
                  className={`relative flex flex-col sm:flex-row items-stretch rounded bg-[#11141e] border border-zinc-850 overflow-hidden transition-all ${
                    track.active ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {/* Track Header Details (Left pane of each track slider) */}
                  <div className="w-full sm:w-48 bg-[#171b29] border-b sm:border-b-0 sm:border-r border-zinc-800 p-2.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-zinc-500 text-[10px] font-bold">0{trackIdx + 1}</span>
                        <div className={`h-2.5 w-2.5 rounded-sm ${track.color}`} />
                        <span className="font-sans font-semibold text-xs text-white max-w-[110px] truncate">{track.name}</span>
                      </div>
                      <span className="font-mono text-[9px] text-cyan-400 font-semibold bg-cyan-950/20 px-1 border border-cyan-900/40 rounded">
                        {track.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-[10px] font-mono">
                      {/* Volume display */}
                      <div className="flex items-center space-x-1 text-zinc-400">
                        <Volume2 className="h-3 w-3 text-zinc-500" />
                        <span className="font-medium text-zinc-300">{track.volume}%</span>
                      </div>
                      {/* Pan indicator */}
                      <div className="text-zinc-500 text-[9px]">PAN: <span className="text-zinc-300 font-semibold">{track.pan}</span></div>
                    </div>
                  </div>

                  {/* Dynamic Visual Timeline Grid Representation (Clip Slot, Automation, Wave curve) */}
                  <div className="flex-grow p-3 flex items-center justify-between relative bg-[#0b0c10]/70 min-h-[64px]">
                    <div className="absolute inset-y-0 left-0 right-0 bg-grid-cyber pointer-events-none opacity-40"></div>
                    
                    {/* Floating Playhead line */}
                    {isPlaying && (
                      <motion.div 
                        initial={{ x: '0%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-y-0 w-0.5 bg-cyan-400 opacity-60 z-10 shadow-[0_0_8px_#06b6d4]"
                      />
                    )}

                    {/* Interactive stateful visual indicators */}
                    <div className="relative w-full flex items-center h-full z-0 px-2 overflow-hidden">
                      {isSynthTrack ? (
                        /* MIDI Grid showing quantized/unquantized notes blocks */
                        <div className="w-full flex justify-between items-center bg-[#131722]/60 p-1.5 rounded border border-zinc-800">
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-zinc-300 flex items-center space-x-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                              <span>{track.clips[0].name}</span>
                            </span>
                            <span className="font-mono text-[9px] text-zinc-500 mt-0.5 font-medium">MIDI GRID RASTER (ACTIVE)</span>
                          </div>

                          {/* Midi Notes Visual Block Representation */}
                          <div className="flex space-x-1 items-center bg-[#07080b]/90 p-1 rounded-sm border border-zinc-900 pr-3">
                            {Array.from({ length: 6 }).map((_, nIdx) => {
                              const isQuantized = track.clips[0].quantized;
                              return (
                                <motion.div
                                  key={nIdx}
                                  initial={{ y: 0 }}
                                  animate={isPlaying ? { 
                                    y: [0, -4, 2, -2, 0],
                                    backgroundColor: isQuantized 
                                      ? ['#06b6d4', '#a855f7', '#06b6d4'] 
                                      : ['#06b6d4', '#6b7280', '#06b6d4']
                                  } : {}}
                                  transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    delay: nIdx * 0.15,
                                    ease: 'easeInOut' 
                                  }}
                                  className={`h-2.5 rounded-sm shrink-0 transition-all ${
                                    isQuantized 
                                      ? 'w-4 translate-x-0 border-r border-[#06b6d4]' 
                                      : `w-3.5 ${nIdx % 2 === 0 ? 'translate-x-[3px]' : 'translate-x-[-1px]'} border-r border-zinc-500`
                                  } bg-cyan-500`}
                                />
                              );
                            })}
                            
                            {/* Glow badge for quantized */}
                            {track.clips[0].quantized && (
                              <span className="ml-2 font-mono text-[8px] text-cyan-400 font-bold border border-[#06b6d4]/35 bg-cyan-950/20 px-1 rounded uppercase tracking-wider animate-pulse">
                                QUANTIZED
                              </span>
                            )}
                          </div>
                        </div>
                      ) : isBassTrack ? (
                         /* Bass Wave Generator interface */
                         <div className="w-full flex justify-between items-center bg-[#131722]/60 p-1.5 rounded border border-zinc-800">
                           <div className="flex flex-col">
                             <span className="font-mono text-[10px] text-zinc-300 flex items-center space-x-1.5">
                               <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                               <span>{track.clips[0].name}</span>
                             </span>
                             <span className="font-mono text-[9px] text-zinc-500 mt-0.5 font-medium">BASS AUTOMATION BLOCK</span>
                           </div>

                           {/* Render automation curve overlay */}
                           <div className="flex items-center relative h-6 w-32 bg-[#07080b]/90 rounded-sm border border-zinc-900 pr-2">
                             {/* AutoPan Sidechain Sine wave representation */}
                             {track.clips[0].hasEffectWave ? (
                               <svg className="w-full h-full stroke-cyan-400 fill-none pl-1 transition-all" viewBox="0 0 100 24">
                                 <path d="M0 20 Q12.5 0, 25 20 T50 20 T75 20 T100 20" strokeWidth="2" strokeDasharray={isPlaying ? 'none' : 'none'} />
                               </svg>
                             ) : (
                               <svg className="w-full h-full stroke-zinc-700 fill-none pl-1" viewBox="0 0 100 24">
                                 <line x1="0" y1="12" x2="100" y2="12" strokeWidth="1.5" />
                               </svg>
                             )}
                             {track.clips[0].hasEffectWave ? (
                               <span className="absolute right-1 text-[8px] text-cyan-400 font-mono font-bold animate-pulse">SIDECHAIN</span>
                             ) : (
                               <span className="absolute right-1 text-[8px] text-zinc-600 font-mono">BYPASS</span>
                             )}
                           </div>
                         </div>
                      ) : isVocalTrack ? (
                        /* Audio clip with optional cosmic reverb tail hase */
                        <div className="w-full flex justify-between items-center bg-[#131722]/60 p-1.5 rounded border border-zinc-800">
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-zinc-300 flex items-center space-x-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping"></span>
                              <span>{track.clips[0].name}</span>
                            </span>
                            <span className="font-mono text-[9px] text-zinc-500 mt-0.5 font-medium">WAV FILE BUFFER DISPLAY</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Reverb active visual aura */}
                            {track.clips[0].hasEffectWave && (
                              <div className="px-2 py-0.5 font-mono text-[8px] text-purple-400 bg-purple-950/20 border border-purple-500/20 rounded font-bold animate-pulse">
                                DIFFUSER 68%
                              </div>
                            )}
                            
                            {/* Audio file waveform */}
                            <div className="flex space-x-[2px] items-center h-5 w-24 bg-[#07080b]/90 p-1.5 rounded-sm border border-zinc-900">
                              {[6, 12, 18, 10, 16, 8, 4, 15, 20, 10, 6, 8].map((h, i) => (
                                <div 
                                  key={i} 
                                  style={{ height: `${isPlaying ? Math.max(2, h + (Math.sin(Date.now() / 200 + i) * 3)) : h}%` }}
                                  className={`w-[6px] rounded-sm transition-all ${
                                    track.clips[0].hasEffectWave ? 'bg-purple-400' : 'bg-zinc-600'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Standard Audio Loop (Drums) */
                        <div className="w-full flex justify-between items-center bg-[#131722]/60 p-1.5 rounded border border-zinc-800">
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-zinc-300 flex items-center space-x-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                              <span>{track.clips[0].name}</span>
                            </span>
                            <span className="font-mono text-[9px] text-zinc-500 mt-0.5 font-medium">AUDIO BEAT SYNC WRAPPING</span>
                          </div>

                          <div className="flex space-x-[3px] items-center h-5 w-24 bg-[#07080b]/90 p-1 rounded-sm border border-zinc-900 overflow-hidden pr-3">
                            {Array.from({ length: 16 }).map((_, sIdx) => {
                              const drumSpeed = activeAction === 'bpm' ? 0.08 : 0.15;
                              return (
                                <motion.div
                                  key={sIdx}
                                  animate={isPlaying ? {
                                    scaleY: [1, 2.5, 1, 1.8, 1]
                                  } : {}}
                                  transition={{
                                    duration: drumSpeed * 5,
                                    repeat: Infinity,
                                    delay: sIdx * drumSpeed,
                                    ease: 'easeInOut'
                                  }}
                                  className="h-2 w-[4px] bg-amber-500 rounded-xs"
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Peak VU Meter strip (extreme right side of track layout) */}
                    <div className="relative w-4 h-full bg-zinc-900 border border-zinc-950 flex flex-col justify-end p-0.5 rounded-sm overflow-hidden z-10 shrink-0">
                      <div 
                        style={{ height: `${peakMeter}%` }}
                        className={`w-full rounded-xs transition-all duration-100 ${
                          peakMeter > 85 
                            ? 'bg-gradient-to-t from-purple-500 via-pink-400 to-cyan-400' 
                            : 'bg-cyan-400'
                        }`} 
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Quick Info Block under Ableton Grid */}
          <div className="mt-4 p-3 rounded-lg border border-obsidian-border bg-[#141722]/40 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500 font-mono">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              <span>HOST SIGNAL: <span className="text-zinc-300">ONLINE</span></span>
              <span className="text-zinc-650">|</span>
              <span>latency: <span className="text-zinc-300">0.82ms</span></span>
            </div>
            <div>
              <span>CONNECTED VIA: <span className="text-cyan-400 font-semibold">ALAN BRIDGE VST v1.4</span></span>
            </div>
          </div>

        </div>

        {/* RIGHTSIDE: Floating Transparent ALAN AI Plugin - 5 Columns */}
        <div className="lg:col-span-4 flex flex-col p-4 bg-[#0a0b0e] border-t lg:border-t-0 border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-wider font-semibold text-white">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>ALAN AI PLUGIN WINDOW</span>
            </div>
            {/* VST Status Marker */}
            <span className="font-mono text-[9px] text-cyan-400 font-bold bg-zinc-900/40 border border-cyan-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
              VST CONNECTED
            </span>
          </div>

          {/* Chat Window Container */}
          <div className="flex flex-col h-[340px] rounded-xl border border-obsidian-border bg-[#11141e]/50 backdrop-blur-sm shadow-inner p-4.5 overflow-y-auto mb-3 text-xs font-mono scrollbar-thin">
            
            <div className="space-y-4">
              {chatLog.map((log, index) => {
                const isUser = log.sender === 'user';
                const isSystem = log.type === 'system';
                const isSuccess = log.type === 'success';

                if (isSystem) {
                  return (
                    <div key={index} className="p-2 border-y border-zinc-850 bg-zinc-900/20 text-[10px] text-cyan-400 text-center tracking-wide font-medium rounded-xs">
                      {log.text}
                    </div>
                  );
                }

                return (
                  <div 
                    key={index} 
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* Message Header (Sender name + time) */}
                    <div className="flex items-center space-x-1.5 text-[9px] text-zinc-500 mb-1 px-1">
                      <span>{isUser ? 'PRODUCER' : 'ALAN // AI'}</span>
                      <span>•</span>
                      <span>{log.time}</span>
                    </div>

                    {/* Message Body bubble */}
                    <div className={`p-3 rounded-lg max-w-[90%] leading-relaxed ${
                      isUser 
                        ? 'bg-zinc-800 text-zinc-100 rounded-tr-none border border-zinc-700' 
                        : isSuccess
                           ? 'bg-cyan-950/20 text-cyan-300 rounded-tl-none border border-cyan-500/20'
                           : 'bg-[#181b29] text-zinc-300 rounded-tl-none border border-zinc-800'
                    }`}>
                      {isSuccess && <Check className="h-3 w-3 inline mr-1 text-cyan-400 stroke-[3px]" />}
                      {log.text}
                    </div>
                  </div>
                );
              })}

              {/* Typing loader anim */}
              {isAiTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-1.5 text-[9px] text-zinc-500 mb-1 px-1">
                    <span>ALAN // AI</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-bold">ANALYZING MASTER TRACK MATRIX...</span>
                  </div>
                  <div className="p-3 bg-[#181b29] border border-zinc-800 text-zinc-300 rounded-lg rounded-tl-none flex items-center space-x-2 w-[70px] justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

          </div>

          {/* Suggested quick VST presets controls */}
          <div className="mb-3.5 flex flex-col">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">TELEMETRY PRESETS SHORTCUTS</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((cmd) => (
                <button
                  key={cmd.id}
                  disabled={isAiTyping}
                  onClick={() => handleCommandPress(cmd)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 bg-[#141722] hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700/85 text-zinc-300 text-[10px] rounded-lg cursor-pointer transition-all hover:text-white disabled:opacity-40"
                >
                  <Music className="h-3 w-3 text-cyan-400" />
                  <span>{cmd.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Telemetry Text Dispatch Input */}
          <form onSubmit={handleCustomSubmit} className="relative mt-auto">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Apply vocal reverb tail..."
              disabled={isAiTyping}
              className="w-full bg-[#11141e] hover:bg-[#151927] focus:bg-[#151927] border border-zinc-850 focus:border-cyan-500 rounded-xl py-3 pl-4 pr-12 text-xs font-mono text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:ring-1 focus:ring-cyan-500/35"
            />
            {/* Submit Arrow button */}
            <button
              type="submit"
              disabled={isAiTyping || !customPrompt.trim()}
              className="absolute right-2 top-2 h-8 w-8 rounded-lg flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-black disabled:bg-zinc-800 disabled:text-zinc-500 transition-all cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
