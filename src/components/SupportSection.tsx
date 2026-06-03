import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import { SupportTicket } from '../types';

export function SupportSection() {
  const [ticket, setTicket] = useState<SupportTicket>({
    name: '',
    email: '',
    issueType: 'plugin_bug',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SUPPORT GATEWAY // TERMINAL INITIALIZATION COMPLETED.",
    "No active ticket packet queued. Ready to parse telemetry payload..."
  ]);

  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket.name || !ticket.email || !ticket.message) {
      alert("Please provide name, email, and description of your issue first.");
      return;
    }

    setIsSubmitting(true);
    setTerminalLogs(prev => [
      ...prev,
      `Incoming Support Signal Detected from node: ${ticket.email}...`,
      "Starting Secure Packet Packing...",
    ]);

    // Simulate stepping through terminal transmission segments
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    await delay(1000);
    setTerminalLogs(prev => [
      ...prev,
      `[TICKET] Sender Signature: ${ticket.name}`,
      `[TICKET] Class Routing: ${ticket.issueType.toUpperCase()}`,
      `[TICKET] Size: ${ticket.message.length} characters`
    ]);

    await delay(1200);
    setTerminalLogs(prev => [
      ...prev,
      "Establishing link to ALAN neural support cluster...",
      "Encrypting transmission payload (RSA 4096-bit)..."
    ]);

    await delay(1000);
    const rndTicketId = "AL-TKT-" + Math.floor(100000 + Math.random() * 900000);
    setTerminalLogs(prev => [
      ...prev,
      `[SUCCESS] Ticket payload securely deployed. TKTID: ${rndTicketId}`,
      "A neural support drone has been assigned in queue.",
      "SMTP server dispatch of auto-acknowledgements... OK"
    ]);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setTicket({
      name: '',
      email: '',
      issueType: 'plugin_bug',
      message: ''
    });
    setIsSubmitted(false);
    setTerminalLogs([
      "SUPPORT GATEWAY // FLUSHED PREVIOUS TICKET CACHE.",
      "Ready to parse new telemetry payload..."
    ]);
  };

  return (
    <div id="support-form-anchor" className="w-full text-zinc-300">
      
      {/* Title block */}
      <div className="flex items-center space-x-3 mb-10">
        <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-zinc-950 border border-white/5">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] font-medium tracking-[0.3em] text-cyan-400 uppercase">SUPPORT HUB</span>
          <h2 className="font-sans text-2xl font-light tracking-tight text-white">Producer Support Console</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: Glassmorphic interactive form - 6 Columns */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-transparent shadow-xl">
            
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="flex flex-col">
                  <h3 className="font-sans text-xl font-light text-white mb-2">Open a Support Telemetry Node</h3>
                  <p className="text-zinc-500 text-xs font-light leading-relaxed">
                    Need help setting up the VST, licensing, or mapping macros in Ableton? Submit a feedback ticket and our neural tech drone team will contact you back immediately.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[8px] text-zinc-650 font-bold uppercase tracking-widest pl-1">PRODUCER NAME</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={ticket.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Mike Shinoda"
                      disabled={isSubmitting}
                      className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-500/50 rounded-lg py-2.5 px-3.5 text-[11px] font-mono text-zinc-100 placeholder-zinc-700 outline-none transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[8px] text-zinc-650 font-bold uppercase tracking-widest pl-1">EMAIL SIGNAL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={ticket.email}
                      onChange={handleInputChange}
                      placeholder="e.g. mike@linkinpark.com"
                      disabled={isSubmitting}
                      className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-500/50 rounded-lg py-2.5 px-3.5 text-[11px] font-mono text-zinc-100 placeholder-zinc-700 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Issue Type */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] text-zinc-650 font-bold uppercase tracking-widest pl-1">DIAGNOSTIC CLASS CATEGORY</label>
                  <select
                    name="issueType"
                    value={ticket.issueType}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-500/50 rounded-lg py-2.5 px-3.5 text-[11px] font-mono text-zinc-300 outline-none transition-all cursor-pointer"
                  >
                    <option value="plugin_bug">VST Plugin Bug Exception</option>
                    <option value="api_key">AI API Credentials / Licensing Setup</option>
                    <option value="feature_request">Telemetry Command Suggestion</option>
                    <option value="general">Generic Ableton Mapping Assistance</option>
                  </select>
                </div>

                {/* Message Body Input */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] text-zinc-650 font-bold uppercase tracking-widest pl-1">EXPLANATION TELEMETRY PAYLOAD</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={ticket.message}
                    onChange={handleInputChange}
                    placeholder="Describe specific crashes, environment setups, or mapping issues you're facing..."
                    disabled={isSubmitting}
                    className="w-full bg-zinc-950 border border-white/5 focus:border-cyan-500/50 rounded-lg py-2.5 px-3.5 text-[11px] font-mono text-zinc-100 placeholder-zinc-700 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative flex items-center justify-center space-x-2 rounded-full bg-white hover:bg-zinc-100 py-3 px-6 font-mono text-[10px] font-bold uppercase tracking-widest text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-2.5 w-2.5 inline text-black" />
                  <span>TRANSMIT TICKET PAYLOAD</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center space-y-4">
                <div className="h-14 w-14 rounded-full border border-cyan-500/30 bg-zinc-950 text-cyan-400 flex items-center justify-center animate-pulse">
                  <CheckCircle className="h-6 w-6 stroke-[1.5px]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-xl font-light text-white">Transmission Successful</h3>
                  <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
                    Producer ticket sent successfully. A confirmation code has been generated and printed on your local terminal console log. Our developer support team will send an email back to <span className="text-cyan-400 font-mono font-medium">{ticket.email}</span> within 24 standard earth cycles.
                  </p>
                </div>
                <button
                  onClick={handleResetForm}
                  className="rounded-full bg-transparent border border-white/5 hover:border-white/10 hover:text-white px-5 py-2 font-mono text-[10px] tracking-widest uppercase text-zinc-500 cursor-pointer transition-all"
                >
                  Create Another Ticket
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Right Hand: Interactive live terminal viewer - 5 Columns */}
        <div className="lg:col-span-5 flex flex-col h-full lg:sticky lg:top-24">
          <span className="font-mono text-[8px] text-zinc-650 font-bold uppercase tracking-widest pl-2 mb-2.5">LIVE TERMINAL TELEMETRY LOGGER</span>
          
          <div className="flex-grow flex flex-col rounded-2xl border border-white/5 bg-zinc-950 backdrop-blur-sm overflow-hidden shadow-2xl min-h-[300px] max-h-[420px]">
            {/* Terminal Header */}
            <div className="flex h-9 w-full items-center justify-between bg-zinc-950/80 px-4 border-b border-white/5 select-none">
              <div className="flex items-center space-x-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-800"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-800"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-800"></div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-650 pl-2">bash - support_uplink.sh</span>
              </div>
              <Cpu className="h-3 w-3 text-zinc-700" />
            </div>

            {/* Terminal screen content scrolling */}
            <div className="flex-grow p-4.5 overflow-y-auto font-mono text-[9px] text-zinc-500 space-y-2.5 scrollbar-thin select-text font-light">
              {terminalLogs.map((log, idx) => {
                const isErr = log.toLowerCase().includes('err');
                const isSuccess = log.toLowerCase().includes('success');
                const isIntro = idx === 0;

                return (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-zinc-700 pr-2">producer@vst_client:~$</span>
                    <span className={
                      isIntro 
                        ? 'text-zinc-600 font-normal' 
                        : isSuccess
                          ? 'text-cyan-400 font-medium'
                          : isErr
                            ? 'text-red-400 font-normal'
                            : 'text-zinc-400'
                    }>
                      {log}
                    </span>
                  </div>
                );
              })}
              
              {isSubmitting && (
                <div className="flex items-center space-x-1">
                  <span className="text-zinc-700 pr-2">producer@vst_client:~$</span>
                  <span className="text-cyan-400 animate-pulse font-medium uppercase tracking-wider">UPLINK TRANSMITTING IN PROGRESS...</span>
                </div>
              )}

              <div ref={terminalBottomRef} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
