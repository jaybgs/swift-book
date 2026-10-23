import React, { useState } from 'react';
import { 
  Globe, 
  Plus, 
  Key, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';
import { SquishSwitch, StatusMark } from '../components/reactbits';

export const SitesPage: React.FC = () => {
  const { sites, activeSiteId, setActiveSiteId, addSite, deleteSite, toggleSiteActive } = useSwiftBook();
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  
  // Add Site Modal State
  const [isAddingSite, setIsAddingSite] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteProfession, setNewSiteProfession] = useState<'photography' | 'real_estate' | 'event_planner' | 'creator'>('photography');
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const [newDepositType, setNewDepositType] = useState<'percent' | 'fixed'>('percent');
  const [newDepositValue, setNewDepositValue] = useState(25);

  const handleCopyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleCreateSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteName) return;

    addSite({
      name: newSiteName,
      profession: newSiteProfession,
      url: newSiteUrl || `${newSiteName.toLowerCase().replace(/\s+/g, '')}.com`,
      timezone: 'America/New_York (EST)',
      depositType: newDepositType,
      depositPercent: newDepositType === 'percent' ? newDepositValue : undefined,
      depositAmount: newDepositType === 'fixed' ? newDepositValue : undefined,
      active: true,
      ratecardEnabled: true,
      activeChannels: ['telegram', 'slack', 'email'],
    });

    setIsAddingSite(false);
    setNewSiteName('');
    setNewSiteUrl('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Sites
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Each site gets its own API key for sending events.
          </p>
        </div>

        <button
          onClick={() => setIsAddingSite(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold shadow-sm hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4" /> Add Site
        </button>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sites.map(site => {
          const isActiveSite = site.id === activeSiteId;
          return (
            <div
              key={site.id}
              className={`rounded-2xl p-6 bg-white dark:bg-[#12141c] border transition-all flex flex-col justify-between space-y-5 ${
                isActiveSite
                  ? 'border-black dark:border-white ring-1 ring-black dark:ring-white shadow-sm'
                  : 'border-black/[0.06] dark:border-white/[0.08]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="font-bold text-base text-zinc-900 dark:text-white">
                      {site.name}
                    </h2>
                    <div className="text-xs text-zinc-400 capitalize">
                      {site.profession.replace('_', ' ')}
                    </div>
                  </div>

                  <SquishSwitch
                    checked={site.active}
                    onChange={() => toggleSiteActive(site.id)}
                    width={38}
                    height={20}
                    trackOnColor="#10b981"
                    trackColor="#94a3b8"
                  />
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#161822] border border-black/5 dark:border-white/5 space-y-1">
                    <div className="flex justify-between text-zinc-500">
                      <span>DEPOSIT:</span>
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {site.depositType === 'percent'
                          ? `${site.depositPercent}% REQUIRED`
                          : `₦${site.depositAmount} FIXED`}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>URL:</span>
                      <span className="text-blue-500">{site.url}</span>
                    </div>
                  </div>

                  {/* API Key Box */}
                  <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>SITE API KEY</span>
                      <button
                        onClick={() => handleCopyKey(site.id, site.apiKey)}
                        className="flex items-center gap-1 text-[#f35921] font-semibold hover:underline"
                      >
                        {copiedKeyId === site.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedKeyId === site.id ? 'COPIED' : 'COPY'}
                      </button>
                    </div>
                    <div className="font-mono text-[11px] truncate text-zinc-800 dark:text-zinc-200">
                      {site.apiKey}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveSiteId(site.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                    isActiveSite
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                  }`}
                >
                  {isActiveSite ? 'Current Site' : 'Select Site'}
                </button>

                {sites.length > 1 && (
                  <button
                    onClick={() => deleteSite(site.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Site Modal */}
      {isAddingSite && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsAddingSite(false)}
        >
          <div 
            className="rounded-2xl max-w-md w-full p-6 space-y-5 bg-white dark:bg-[#151720] border border-black/10 dark:border-white/10 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
              <h2 className="font-bold text-base text-zinc-900 dark:text-white">
                Add New Site
              </h2>
              <button 
                onClick={() => setIsAddingSite(false)}
                className="text-zinc-400 hover:text-zinc-600 text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateSite} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 uppercase font-mono text-[11px]">
                  Site Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Photography"
                  value={newSiteName}
                  onChange={e => setNewSiteName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181a24] text-xs focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 uppercase font-mono text-[11px]">
                  Profession
                </label>
                <select
                  value={newSiteProfession}
                  onChange={e => setNewSiteProfession(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181a24] text-xs focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                >
                  <option value="photography">Photographer / Studio</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="event_planner">Event Planner</option>
                  <option value="creator">Other / General</option>
                </select>
                <p className="text-[11px] text-zinc-400">
                  We'll tailor your dashboard to your field.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 uppercase font-mono text-[11px]">
                  Site URL (optional)
                </label>
                <input
                  type="text"
                  placeholder="https://acmephoto.com"
                  value={newSiteUrl}
                  onChange={e => setNewSiteUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181a24] text-xs focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddingSite(false)}
                  className="px-4 py-2 rounded-xl text-zinc-500 hover:text-zinc-800 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs shadow-sm"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
