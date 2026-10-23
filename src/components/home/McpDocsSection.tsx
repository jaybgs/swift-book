import React, { useState } from 'react';
import { Terminal, Copy, Check, Cpu, Server, Code, ArrowUpRight } from 'lucide-react';
import { useSwiftBook } from '../../context/SwiftBookContext';

export const McpDocsSection: React.FC = () => {
  const { activeSite, terminology } = useSwiftBook();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const curlExample = `curl -X POST https://swift-book.base44.app/functions/ingestSiteEvent \\
  -H "Authorization: Bearer ${activeSite.apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event": "booking_confirmed",
    "client": {
      "name": "David K. Sterling",
      "email": "david@sterlingrealty.com",
      "phone": "+1 (310) 902-1184"
    },
    "booking": {
      "package": "Executive Estate Property Walkthrough",
      "date": "2026-11-04",
      "time": "2:00 PM",
      "price": 350,
      "deposit": 350
    }
  }'`;

  const mcpConfig = `{
  "mcpServers": {
    "swiftbook": {
      "url": "https://swift-book.base44.app/api/mcp",
      "headers": {
        "Authorization": "Bearer ${activeSite.apiKey}"
      }
    }
  }
}`;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="bento-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black text-white border-zinc-800">
        
        {/* Ambient background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f35921]/15 blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-mono font-medium">
              <Cpu className="w-3.5 h-3.5" /> MCP SERVER & WEBHOOK INGEST
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Connect via MCP or{' '}
              <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
                Direct Webhooks.
              </span>
            </h2>
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              SwiftBook exposes native tools to AI agents via the Model Context Protocol at <code className="text-orange-400 font-mono text-xs">/api/mcp</code>. Your agent can query available slots, quote rate cards, and record client bookings autonomously.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>agentSites — Inspect active connected sites</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>agentRatecard — Query rates & package structures</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ingestSiteEvent — Post bookings & deposit confirmations</span>
              </div>
            </div>
          </div>

          {/* Right Code Panels (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* cURL Card */}
            <div className="rounded-2xl bg-black/60 border border-zinc-800 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2 mb-3">
                <span className="flex items-center gap-2 text-zinc-200">
                  <Terminal className="w-3.5 h-3.5 text-[#f35921]" /> Ingest Webhook (cURL)
                </span>
                <button
                  onClick={() => handleCopy(curlExample, 1)}
                  className="flex items-center gap-1 text-[#f35921] hover:underline"
                >
                  {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedIndex === 1 ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
                {curlExample}
              </pre>
            </div>

            {/* MCP Config Card */}
            <div className="rounded-2xl bg-black/60 border border-zinc-800 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2 mb-3">
                <span className="flex items-center gap-2 text-zinc-200">
                  <Server className="w-3.5 h-3.5 text-blue-400" /> Claude / Cursor / Antigravity MCP Config
                </span>
                <button
                  onClick={() => handleCopy(mcpConfig, 2)}
                  className="flex items-center gap-1 text-blue-400 hover:underline"
                >
                  {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedIndex === 2 ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
                {mcpConfig}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
