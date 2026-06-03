/**
 * Shared types and configurations for ALAN Ableton Live Assistant Website
 */

export interface AICommand {
  id: string;
  label: string;
  promptText: string;
  category: 'MIDI' | 'FX' | 'Automation' | 'Arrangement';
  responses: string[];
  actionType: 'quantize' | 'sidechain' | 'reverb' | 'bpm' | 'generate_melody' | 'reset';
  targetTrackIndex: number; // which track it acts on
}

export interface TrackData {
  name: string;
  type: 'midi' | 'audio' | 'return' | 'master';
  color: string; // Tailwind class
  active: boolean;
  volume: number; // 0-100
  pan: string; // "C", "L15", "R20"
  clips: {
    name: string;
    duration: number; // bar size
    notesActive?: boolean;
    quantized?: boolean;
    hasEffectWave?: boolean;
    effectWaveType?: 'none' | 'sidechain' | 'reverb';
  }[];
}

export interface SupportTicket {
  name: string;
  email: string;
  issueType: 'plugin_bug' | 'api_key' | 'feature_request' | 'general';
  message: string;
  timestamp: string;
}
