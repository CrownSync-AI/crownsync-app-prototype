import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Drawer from '../../../../components/Drawer';
import { 
  RefreshCw, TrendingUp, AlertCircle, CheckCircle2, Clock, Search, Filter, 
  ChevronRight, X, Award, MessageSquare, MoreHorizontal, ChevronDown, Check,
  Download, Share2, Mail, Smartphone, FileText, Video, ChevronLeft, User
} from 'lucide-react';

// --- Shared Components ---

// Custom Dropdown Component (Consistent with RetailerList)
const FilterDropdown = ({ label, options, value, onChange, disabled = false, multi = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`px-3 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition ${
          isOpen ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'
        } ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700'}`}
      >
        {label} <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-30 animate-in fade-in zoom-in-95 duration-100">
          <div className="p-1 max-h-60 overflow-y-auto">
            {options.map((option) => {
                const isSelected = multi 
                    ? value.includes(option) 
                    : value === option;
                
                return (
                    <button
                        key={option}
                        onClick={() => {
                            onChange(option);
                            if (!multi) setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between group ${
                            isSelected ? 'bg-gray-50 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {option === 'All' ? `All ${label}s` : option}
                        {isSelected && <Check size={14} className="text-black" />}
                    </button>
                );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1 text-gray-500 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1 text-gray-500 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};


const RetailerNetworkTab = ({ campaign, retailers = [] }) => {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterZone, setFilterZone] = useState('All');
  
  const [showNudgeModal, setShowNudgeModal] = useState(false);
  const [nudgeMessage, setNudgeMessage] = useState('');
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [drawerTab, setDrawerTab] = useState('usage'); // 'usage' | 'timeline'

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('10:45 AM');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Mock Data Generation ---
  // Using useMemo to prevent re-generation on every render and avoid "impure function" lint errors
  const campaignRetailers = useMemo(() => {
    if (!retailers || retailers.length === 0) return [];
    
    // Scenario Simulation based on Campaign ID
    // Scenario 1: camp-0 "Summer Sale" (Campaign 1)
    // 20 invited, 16 participated (80%), 1 Zero-Action, 3 Viewed (Needs Attn: 3 Viewed + 1 Zero = 4 total)
    const isScenarioSummer = campaign?.id === 'camp-0';
    
    // Scenario 2: camp-9 "VIP Event" (Campaign 10)
    // 100% participated
    const isScenarioVIP = campaign?.id === 'camp-9';

    // Filter relevant retailers based on scenario
    let targetRetailers = [...retailers];
    
    // Fallback zones/tiers
    const zones = ['North', 'South', 'East', 'West', 'Central'];
    const tiers = ['Platinum', 'Gold', 'Silver', 'Standard'];

    // --- SCENARIO HANDLING ---
    // Campaign 1: Summer Sale (camp-0) -> Use first 20 retailers
    // Campaign 10: VIP Event (camp-9) -> Use all retailers (up to 50 if avail, but we have 20 now)
    
    if (isScenarioSummer) {
        // We expect at least 20 retailers from App.jsx now. 
        // If not, we just take what we have.
        targetRetailers = targetRetailers.slice(0, 20); 
    } 
    // Date Range Config
    const dateStart = new Date('2025-11-25').getTime();
    const dateEnd = new Date('2025-12-25').getTime();
    const dateRange = dateEnd - dateStart;

    return targetRetailers.map((r, idx) => {
      if (!r || !r.name) return null;

      const zone = r.location?.zone || r.zone || zones[idx % zones.length];
      const tier = r.tier || tiers[idx % tiers.length];

      let status = 'Unopened';
      
      if (isScenarioSummer) {
        // Total 20.
        // Needs: 16 Participated, 4 Needs Attention (1 Zero-Action).
        if (idx < 16) {
          status = 'Participated'; // 16 items
        } else if (idx === 19) {
          status = 'Unopened'; // 1 item (The Zero-Action one)
        } else {
          status = 'Viewed'; // 3 items (Indices 16, 17, 18) -> Participated=No, Viewed=Yes.
        }
      } else if (isScenarioVIP) {
        // 100% Participation
        status = 'Participated';
      } else {
        // Default random logic for others
        const statuses = ['Participated', 'Viewed', 'Unopened'];
        const statusIndex = idx % 10 < 6 ? 0 : idx % 10 < 8 ? 1 : 2; 
        status = statuses[statusIndex];
      }
      
      const adoptionRate = status === 'Participated' ? 40 + (idx * 7) % 61 : 0; 
      const totalActions = status === 'Participated' ? 5 + (idx * 3) % 20 : status === 'Viewed' ? 1 : 0;
      
      const usage = {
        social: status === 'Participated' && idx % 2 === 0,
        email: status === 'Participated' && idx % 3 !== 0,
        downloads: status === 'Participated' ? (idx % 5) + 1 : 0
      };

      // Deterministic pseudo-random date based on index to satisfy "pure render" lint
      const randomOffset = (idx * 1337) % dateRange; 
      const randomDate = new Date(dateStart + randomOffset).toLocaleDateString();

      return {
        ...r,
        tier,
        zone, 
        location: { ...r.location, zone },
        campaignStatus: status,
        adoptionRate,
        totalActions,
        estReach: status === 'Participated' ? (1000 + (idx * 500)) : 0,
        lastActive: status === 'Unopened' ? null : randomDate,
        usage
      };
    }).filter(Boolean);
  }, [retailers, campaign?.id]);

  // --- Derived Metrics ---
  const totalInvited = campaignRetailers.length;
  const participatedCount = campaignRetailers.filter(r => r.campaignStatus === 'Participated').length;
  const adoptionRate = totalInvited > 0 ? Math.round((participatedCount / totalInvited) * 100) : 0;
  
  // Zero-Action: Status is Unopened OR (Viewed with 0 actions)
  // For Camp-0 scenario: 
  // 1 Unopened -> Zero Action.
  // 3 Viewed -> Usually have 1 action (Viewed). So they are NOT Zero-Action, but they are Needs Attention (Viewed but didn't participate).
  // Check PRD/User request: "Zero-Action: 显示1，表述有一个Retailer没有行动". "Needs Attention: 需要mock 4个Retailer". 
  // Needs Attention typically = Unopened + Viewed (but not participated). 1 + 3 = 4. Checks out.
  const zeroActionCount = campaignRetailers.filter(r => r.campaignStatus === 'Unopened' || (r.campaignStatus === 'Viewed' && r.totalActions === 0)).length;
  const totalEstReach = campaignRetailers.reduce((acc, r) => acc + r.estReach, 0);

  // Needs Attention List
  // Logic: Platinum/Gold + Unopened/Viewed. 
  // To meet user request "Needs Attention: mock 4个Retailer", we simply filter all Unopened/Viewed for the demo campaign to ensure they show up, regardless of Tier (or ensure those 4 get high tiers).
  // Let's broaden the logic for the specific scenario to ensure they appear.
  const needsAttentionList = campaignRetailers
    .filter(r => {
        if (campaign?.id === 'camp-0') return r.campaignStatus === 'Unopened' || r.campaignStatus === 'Viewed';
        return (r.tier === 'Platinum' || r.tier === 'Gold') && (r.campaignStatus === 'Unopened' || r.campaignStatus === 'Viewed');
    })
    .sort((a, b) => {
      // Sort by status (Unopened first) then Tier
      if (a.campaignStatus !== b.campaignStatus) return a.campaignStatus === 'Unopened' ? -1 : 1;
      const tierWeight = { 'Platinum': 2, 'Gold': 1, 'Silver': 0, 'Standard': 0 };
      return tierWeight[b.tier] - tierWeight[a.tier];
    });

  // Top Advocates
  const topAdvocatesList = campaignRetailers
    .filter(r => r.campaignStatus === 'Participated')
    .sort((a, b) => b.totalActions - a.totalActions)
    .slice(0, 5);

  // Filtered List for Table
  const filteredList = campaignRetailers.filter(r => {
    const matchesSearch = r.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'All' || r.tier === filterTier;
    const matchesStatus = filterStatus === 'All' || r.campaignStatus === filterStatus;
    const matchesZone = filterZone === 'All' || r.zone === filterZone || r.location?.zone === filterZone;
    
    return matchesSearch && matchesTier && matchesStatus && matchesZone;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // --- Handlers ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
  };

  const handleClearFilters = () => {
    setFilterStatus('All');
    setFilterTier('All');
    setFilterZone('All');
    setSearchTerm('');
    setCurrentPage(1);
  };



  const handleNudgeAll = () => {
    setNudgeMessage(`Hi there! Just a friendly reminder that our new ${campaign.title} campaign is live. We noticed you haven't had a chance to check it out yet.`);
    setShowNudgeModal(true);
  };

  const confirmSendNudge = () => {
    setShowNudgeModal(false);
    alert(`Reminders queued for ${needsAttentionList.length} retailers.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* --- 1. Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-lg font-bold text-gray-900">Adoption Overview</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="group relative flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full shadow-sm cursor-help">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Updated {lastUpdated}</span>
            <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
              Auto-refreshes every 1 hour
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition disabled:opacity-50"
            title="Force Refresh"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* --- 2. Adoption Summary (KPI Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Adoption Rate */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 font-medium mb-1">Adoption Rate</div>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold text-gray-900">{adoptionRate}%</div>
            {adoptionRate > 0 && <div className="mb-1 text-xs font-medium text-emerald-600 flex items-center">
              <TrendingUp size={12} className="mr-0.5" /> +5%
            </div>}
          </div>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
             <div className="h-full bg-black rounded-full" style={{ width: `${adoptionRate}%` }}></div>
          </div>
        </div>

        {/* Active Retailers */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 font-medium mb-1">Active Retailers</div>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold text-gray-900">{participatedCount}</div>
            <div className="mb-1 text-xs text-gray-400">/ {totalInvited} invited</div>
          </div>
        </div>

        {/* Zero-Action (Negative) */}
        <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle size={48} className="text-amber-500" />
          </div>
          <div className="text-sm text-gray-500 font-medium mb-1">Zero-Action</div>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold text-amber-600">{zeroActionCount}</div>
            <div className="mb-1 text-xs text-amber-600 font-medium">{zeroActionCount > 0 ? 'Needs Attention' : 'All Good'}</div>
          </div>
        </div>

        {/* Est. Reach */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 font-medium mb-1">Est. Reach</div>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold text-gray-900">{(totalEstReach / 1000).toFixed(1)}k</div>
          </div>
        </div>
      </div>

      {/* --- 3. Engagement Status (Red/Black Lists) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Needs Attention */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50/50 to-white flex justify-between items-center">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-500" />
              Needs Attention
              {needsAttentionList.length > 0 && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{needsAttentionList.length}</span>}
            </h3>
            {needsAttentionList.length > 0 && (
              <button 
                onClick={handleNudgeAll}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
              >
                Nudge All ({needsAttentionList.length})
              </button>
            )}
          </div>
          <div className="p-4 flex-1">
            {needsAttentionList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm py-8">
                <CheckCircle2 size={32} className="mb-2 text-emerald-100" />
                <p>All key retailers are active!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {needsAttentionList.slice(0, 5).map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${r.logo || 'bg-gray-200'} flex items-center justify-center text-xs font-bold text-white`}>
                        {r.name?.substring(0, 2).toUpperCase() || 'NA'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{r.name}</div>
                        <div className="text-xs text-gray-500">{r.tier}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        r.campaignStatus === 'Unopened' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {r.campaignStatus}
                      </span>
                      <button 
                        onClick={() => {
                            setNudgeMessage(`Hi ${r.contact?.name || 'Partner'}, \n\nJust a friendly reminder that our ${campaign.title} campaign is live. We'd love for you to participate!\n\nBest,\nThe CrownSync Team`);
                            setShowNudgeModal(true);
                        }}
                        className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded hover:bg-amber-200 transition"
                      >
                        Remind
                      </button>
                    </div>
                  </div>
                ))}
                {needsAttentionList.length > 5 && (
                  <div className="text-center pt-2">
                    <button className="text-xs text-gray-500 hover:text-black">View {needsAttentionList.length - 5} more</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Top Advocates */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50/50 to-white flex justify-between items-center">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Award size={18} className="text-emerald-500" />
              Top Advocates
            </h3>
          </div>
          <div className="p-4 flex-1">
            {topAdvocatesList.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm py-8">
                    <p>No activity yet.</p>
                </div>
            ) : (
                <div className="space-y-2">
                {topAdvocatesList.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 text-xs font-bold text-gray-400">#{i + 1}</div>
                        <div className={`w-8 h-8 rounded-full ${r.logo || 'bg-gray-200'} flex items-center justify-center text-xs font-bold text-white`}>
                        {r.name?.substring(0, 2).toUpperCase() || 'NA'}
                        </div>
                        <div>
                        <div className="text-sm font-medium text-gray-900">{r.name}</div>
                        <div className="text-xs text-gray-500">{r.totalActions} Actions</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{(r.estReach / 1000).toFixed(1)}k</div>
                        <div className="text-[10px] text-gray-400 uppercase">Reach</div>
                    </div>
                    </div>
                ))}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* --- 4. Retailer Activity Table --- */}
      <div>
        {/* Section Title moved OUT of the table card [Request 1] */}
        <h3 className="text-lg font-bold text-gray-900 mb-4">All Retailer Activity</h3>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {/* Toolbar - Removed overflow-hidden from parent card, ensured this section isn't clipping dropdowns [Request 2] */}
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center z-20 relative">
              <div className="flex items-center gap-2 w-full md:w-auto overflow-visible">
                 <FilterDropdown 
                    label="Status"
                    options={['All', 'Participated', 'Viewed', 'Unopened']}
                    value={filterStatus}
                    onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}
                 />
                 <FilterDropdown 
                    label="Tier"
                    options={['All', 'Platinum', 'Gold', 'Silver', 'Standard']}
                    value={filterTier}
                    onChange={(val) => { setFilterTier(val); setCurrentPage(1); }}
                 />
                 <FilterDropdown 
                    label="Sales Zone"
                    options={['All', 'North', 'South', 'East', 'West', 'Central']}
                    value={filterZone}
                    onChange={(val) => { setFilterZone(val); setCurrentPage(1); }}
                 />
                 
                 {/* Clear Button */}
                 {(filterStatus !== 'All' || filterTier !== 'All' || filterZone !== 'All' || searchTerm) && (
                    <button 
                        onClick={handleClearFilters}
                        className="text-xs text-red-600 hover:text-red-800 font-medium whitespace-nowrap px-2"
                    >
                        Clear Filters
                    </button>
                 )}
              </div>
              <div className="relative w-full md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search retailer..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-b-xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Retailer</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Zone</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Usage Snapshot</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Impact</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedList.map((r, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${r.logo || 'bg-gray-200'} flex items-center justify-center text-xs font-bold text-white`}>
                            {r.name?.substring(0, 2).toUpperCase() || 'NA'}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{r.name}</div>
                            <div className="text-xs text-gray-500">{r.tier}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {r.zone || r.location?.zone || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          r.campaignStatus === 'Participated' ? 'bg-emerald-50 text-emerald-700' :
                          r.campaignStatus === 'Viewed' ? 'bg-amber-50 text-amber-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            r.campaignStatus === 'Participated' ? 'bg-emerald-500' :
                            r.campaignStatus === 'Viewed' ? 'bg-amber-500' :
                            'bg-gray-400'
                          }`}></span>
                          {r.campaignStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {r.usage?.social && <span className="flex items-center gap-1" title="Social Posted"><Share2 size={12} className="text-blue-500" /> Social</span>}
                          {r.usage?.email && <span className="flex items-center gap-1" title="Email Sent"><Mail size={12} className="text-purple-500" /> Email</span>}
                          {r.usage?.downloads > 0 && <span className="flex items-center gap-1" title="Assets Downloaded"><Download size={12} className="text-gray-600" /> {r.usage.downloads}</span>}
                          {!r.usage?.social && !r.usage?.email && r.usage?.downloads === 0 && <span className="text-gray-300">-</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {r.lastActive || <span className="text-gray-300">Never</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {r.estReach > 0 ? `${(r.estReach / 1000).toFixed(1)}k Reach` : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedRetailer(r)}
                          className="text-xs font-bold text-gray-900 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedList.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No retailers found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
      </div>

      {/* --- 5. Retailer Activity Drawer --- */}
      <Drawer
        isOpen={!!selectedRetailer}
        onClose={() => setSelectedRetailer(null)}
        title={
          selectedRetailer ? (
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${selectedRetailer.logo || 'bg-gray-200'} flex items-center justify-center text-lg font-bold text-white shadow-sm`}>
                {selectedRetailer.name?.substring(0, 2).toUpperCase() || 'NA'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedRetailer.name}</h3>
                <div className="text-sm text-gray-500">{selectedRetailer.contact?.name} • {selectedRetailer.contact?.email}</div>
              </div>
            </div>
          ) : null
        }
        footer={
           <div className="flex gap-3 w-full">
               <button 
                 onClick={() => {
                    setNudgeMessage(`Hi ${selectedRetailer?.contact?.name || 'there'}, just a friendly reminder...`);
                    setShowNudgeModal(true);
                 }}
                 className="flex-1 py-2.5 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
               >
                 <Mail size={16} /> Send Reminder
               </button>
               <button 
                 onClick={() => {
                     alert('Navigate to retailer detail');
                 }}
                 className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
               >
                 <User size={16} /> View Details
               </button>
           </div>
        }
      >
        {selectedRetailer && (
          <div className="space-y-0"> { /* Wrapper to maintain internal structure if needed */ }
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 border-b border-gray-100">
              <div className="p-4 text-center border-r border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-medium">Total Actions</div>
                <div className="text-xl font-bold text-gray-900">{selectedRetailer.totalActions}</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-xs text-gray-500 uppercase font-medium">First Seen</div>
                <div className="text-xl font-bold text-gray-900">{selectedRetailer.lastActive || '-'}</div>
              </div>
            </div>

            {/* Drawer Tabs */}
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setDrawerTab('usage')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${drawerTab === 'usage' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Usage Summary
              </button>
              <button 
                onClick={() => setDrawerTab('timeline')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${drawerTab === 'timeline' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Timeline
              </button>
            </div>

            {/* Content */}
            <div className="p-6">

              {drawerTab === 'usage' ? (
                <div className="space-y-6">
                  {/* Social */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                       <Share2 size={16} /> Social Posts
                    </h4>
                    {selectedRetailer.usage?.social ? (
                       <div className="space-y-3">
                         <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Instagram</span>
                            <span className="text-emerald-600 font-medium flex items-center gap-1"><Check size={14}/> Posted</span>
                         </div>
                         <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Facebook</span>
                            <span className="text-gray-400 italic">Not used</span>
                         </div>
                       </div>
                    ) : (
                       <div className="text-sm text-gray-400 italic">No social activity recorded</div>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                       <Mail size={16} /> Email
                    </h4>
                    {selectedRetailer.usage?.email ? (
                       <div className="text-sm text-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                             <CheckCircle2 size={14} className="text-purple-500" />
                             <span>Spring Collection Blast</span>
                          </div>
                          <div className="text-xs text-gray-400 pl-6">Sent Nov 28, 2025</div>
                       </div>
                    ) : (
                       <div className="text-sm text-gray-400 italic">No emails sent</div>
                    )}
                  </div>

                  {/* Downloads */}
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Download size={16} /> Downloads
                    </h4>
                    {selectedRetailer.usage?.downloads > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <FileText size={14} className="text-red-500" /> Lookbook.pdf
                          </div>
                          <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded">2x</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Video size={14} className="text-purple-500" /> Teaser.mp4
                          </div>
                          <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded">1x</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 italic">No assets downloaded</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 relative pl-4 border-l border-gray-200 ml-2">
                  {/* Mock Timeline */}
                  {selectedRetailer.campaignStatus === 'Participated' && (
                    <>
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                        <div className="text-xs text-gray-400 mb-0.5">Today, 10:15 AM</div>
                        <div className="text-sm font-medium text-gray-900">Downloaded "Lookbook.pdf"</div>
                      </div>
                      <div className="relative pt-4">
                        <div className="absolute -left-[21px] top-5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                        <div className="text-xs text-gray-400 mb-0.5">Today, 10:00 AM</div>
                        <div className="text-sm font-medium text-gray-900">Shared to Instagram</div>
                      </div>
                    </>
                  )}
                  {selectedRetailer.campaignStatus !== 'Unopened' && (
                    <div className="relative pt-4">
                      <div className="absolute -left-[21px] top-5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                      <div className="text-xs text-gray-400 mb-0.5">Yesterday, 4:30 PM</div>
                      <div className="text-sm font-medium text-gray-900">Viewed Campaign</div>
                    </div>
                  )}
                  <div className="relative pt-4">
                    <div className="absolute -left-[21px] top-5 w-3 h-3 bg-gray-300 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                    <div className="text-xs text-gray-400 mb-0.5">Dec 12, 9:00 AM</div>
                    <div className="text-sm font-medium text-gray-900">Invited to Campaign</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* --- Nudge Modal --- */}
      {showNudgeModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setShowNudgeModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <MessageSquare size={20} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">Smart Nudge</h3>
                  <p className="text-sm text-gray-500">Customize your reminder message</p>
                </div>
              </div>
              <button onClick={() => setShowNudgeModal(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                <X size={20}/>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <textarea
                value={nudgeMessage}
                onChange={(e) => setNudgeMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                placeholder="Write a friendly reminder..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNudgeModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendNudge}
                className="px-6 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-lg shadow-sm transition"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default RetailerNetworkTab;
