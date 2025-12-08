import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Users, Download, Activity, AlertCircle, Eye, Bell, Calendar, Filter } from 'lucide-react';
import { networkOverviewData } from '../../../data/mockStore/networkOverviewStore';
import FilterDropdown from '../analytics/components/FilterDropdown';
import TierBadge from './retailers/TierBadge';
import PartnerAttentionDrawer from '../home/components/PartnerAttentionDrawer';
import NudgeModal from './NudgeModal';
import { useToast } from '../../context/ToastContext';

const KpiCard = ({ kpi, onReview }) => {
    const isUp = kpi.trendDirection === 'up';
    const isNeutral = kpi.trendDirection === 'neutral';
    
    return (
        <div className={`p-6 rounded-xl border shadow-sm hover:shadow-md transition relative flex flex-col justify-between h-full ${kpi.isAlert ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
            <div>
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-medium ${kpi.isAlert ? 'text-red-600' : 'text-gray-500'}`}>{kpi.label}</span>
                    {kpi.isAlert ? <AlertCircle size={18} className="text-red-400"/> : <Activity size={18} className="text-gray-300"/>}
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                    <h3 className={`text-3xl font-bold ${kpi.isAlert ? 'text-red-900' : 'text-gray-900'}`}>{kpi.value}</h3>
                    {kpi.total && <span className="text-sm text-gray-400">/ {kpi.total}</span>}
                </div>
                {kpi.trend && (
                    <div className="flex items-center gap-2">
                        <span className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded ${
                            isUp ? 'bg-emerald-50 text-emerald-600' :
                            isNeutral ? 'bg-gray-100 text-gray-600' :
                            'bg-red-50 text-red-600'
                        }`}>
                            {isUp ? <ArrowUpRight size={12} className="mr-1"/> : isNeutral ? <Minus size={12} className="mr-1"/> : <ArrowDownRight size={12} className="mr-1"/>}
                            {kpi.trend}
                        </span>
                        <span className={`text-xs ${kpi.isAlert ? 'text-red-400' : 'text-gray-400'}`}>{kpi.description}</span>
                    </div>
                )}
                {!kpi.trend && <div className="text-xs text-red-400 mt-1">{kpi.description}</div>}
            </div>
            
            {/* Review Button for Alert Card */}
            {kpi.isAlert && (
                <button 
                    onClick={onReview}
                    className="mt-4 w-full py-2 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200 transition"
                >
                    Review Inactive
                </button>
            )}
        </div>
    );
};

// Abstract Zone Map Component - Fixed Responsive
const AbstractMap = ({ data }) => {
    const zones = {
        'Northwest': { col: 1, row: 1 },
        'Midwest': { col: 2, row: 1 },
        'Northeast': { col: 3, row: 1 },
        'West': { col: 1, row: 2 },
        'South Central': { col: 2, row: 2 },
        'Southeast': { col: 3, row: 2 },
    };

    return (
        <div className="relative bg-gray-50/50 rounded-xl border border-gray-100 p-6 flex items-center justify-center min-h-[300px]">
             <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg mx-auto">
                {Object.entries(zones).map(([zoneName, pos]) => {
                    const zoneData = data.find(z => z.zone === zoneName) || { adoption: 0, color: 'bg-gray-200' };
                    return (
                        <div 
                            key={zoneName} 
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 transition cursor-pointer hover:scale-105 shadow-sm border border-white/50 group ${zoneData.color} ${zoneData.adoption > 50 ? 'text-white' : 'text-gray-600'}`}
                            style={{ gridColumn: pos.col, gridRow: pos.row }}
                            title={`${zoneName}: ${zoneData.adoption}% Adoption`}
                        >
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80 mb-1 text-center leading-tight">{zoneName}</span>
                            <span className="text-lg sm:text-2xl font-bold">{zoneData.adoption}%</span>
                        </div>
                    );
                })}
             </div>
             <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
                Data: Adoption Rate
             </div>
        </div>
    );
};

const EngagementTimeline = ({ data }) => (
    <div className="h-[300px] flex items-end gap-3 px-4 pb-2 relative"> {/* Added relative to fix tooltip overflow issues/positioning context if needed, though individual items are relative */}
        {data.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative">
                 {/* Tooltip - Fixed Position */}
                <div className="opacity-0 group-hover:opacity-100 transition absolute -top-10 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap bg-gray-900 text-white px-2 py-1 rounded shadow-lg pointer-events-none mb-2 text-xs font-medium">
                    {item.downloads} Downloads
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
                
                 {/* Bar */}
                <div 
                    className="w-full bg-brand-gold/40 rounded-t-sm relative transition-all group-hover:bg-brand-gold/60" 
                    style={{ height: `${(item.downloads / 500) * 100}%` }}
                >
                    {/* Line Point Mockup (Campaigns) */}
                    <div 
                        className="absolute w-2 h-2 bg-black rounded-full left-1/2 -translate-x-1/2 -top-1 border-2 border-white shadow-sm z-10"
                        style={{ bottom: `${(item.campaigns / 5) * 100}%` }} 
                        title={`${item.campaigns} Campaigns`}
                    ></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{item.month}</span>
            </div>
        ))}
    </div>
);

const PartnerOverview = () => {
    const { kpi, zoneMap, engagementTimeline, topPerformers, atRisk } = networkOverviewData;
    const { addToast } = useToast();
    
    // Filters
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [zone, setZone] = useState('All Zones');
    const [tier, setTier] = useState('All Tiers');

    // Modals
    const [isAttentionDrawerOpen, setIsAttentionDrawerOpen] = useState(false);
    const [nudgeModalState, setNudgeModalState] = useState({ isOpen: false, retailer: null });

    const openNudge = (retailer) => {
        setNudgeModalState({ isOpen: true, retailer });
    };

    const handleSendNudge = (msg) => {
        addToast(`Nudge sent to ${nudgeModalState.retailer.name}: "${msg}"`, 'success');
        // Logic to update state could go here
    };

    return (
        <div className="px-8 py-6 h-full overflow-auto space-y-8 bg-gray-50/30">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Network Overview</h1>
                    <p className="text-gray-500 text-sm">Monitor the performance and adoption health of your B2B partners.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                     <FilterDropdown 
                        value={dateRange} 
                        options={['Last 30 Days', 'This Quarter', 'Year to Date']} 
                        onChange={setDateRange} 
                        icon={Calendar} 
                     />
                     <div className="h-4 w-px bg-gray-200"></div>
                     <FilterDropdown 
                        label="Zone"
                        value={zone} 
                        options={['All Zones', 'Northeast', 'West', 'South', 'Midwest']} 
                        onChange={setZone} 
                        icon={Filter} 
                     />
                     <FilterDropdown 
                        label="Tier"
                        value={tier} 
                        options={['All Tiers', 'Platinum', 'Gold', 'Silver']} 
                        onChange={setTier} 
                        icon={Filter} 
                     />
                </div>
            </div>

            {/* Section A: KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpi.map(item => (
                    <KpiCard 
                        key={item.id} 
                        kpi={item} 
                        onReview={() => setIsAttentionDrawerOpen(true)}
                    />
                ))}
            </div>

            {/* Section B: Visual Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6">Zone Performance</h3>
                    <AbstractMap data={zoneMap} />
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6">Activity Trends</h3>
                    <EngagementTimeline data={engagementTimeline} />
                </div>
            </div>

            {/* Section C: Leaderboards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performers */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Most Engaged Retailers</h3>
                        <button className="text-xs font-medium text-gray-500 hover:text-black">View All</button>
                    </div>
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-xs text-gray-500 uppercase tracking-wider font-semibold sticky top-0">
                                <tr>
                                    <th className="px-6 py-3">Retailer</th>
                                    <th className="px-6 py-3">Active</th>
                                    <th className="px-6 py-3 text-right">Downloads</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {topPerformers.map(r => (
                                    <tr key={r.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3">
                                            <div className="font-medium text-gray-900">{r.name}</div>
                                            <div className="mt-0.5"><TierBadge tier={r.tier} size="xs"/></div>
                                        </td>
                                        <td className="px-6 py-3 text-gray-500">{r.lastActive}</td>
                                        <td className="px-6 py-3 text-right font-medium">{r.downloads}</td>
                                        <td className="px-6 py-3 text-right">
                                             <button className="text-gray-400 hover:text-indigo-600 transition"><ArrowUpRight size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* At Risk */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">At Risk / Inactive</h3>
                        <div className="flex items-center gap-2 text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded">
                            <AlertCircle size={12}/> Needs Attention
                        </div>
                    </div>
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-xs text-gray-500 uppercase tracking-wider font-semibold sticky top-0">
                                <tr>
                                    <th className="px-6 py-3">Retailer</th>
                                    <th className="px-6 py-3">Last Active</th>
                                    <th className="px-6 py-3 text-right">Missed</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {atRisk.map(r => (
                                    <tr key={r.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3">
                                            <div className="font-medium text-gray-900">{r.name}</div>
                                            <div className="text-xs text-gray-400">{r.zone}</div>
                                        </td>
                                        <td className="px-6 py-3 text-red-500 font-medium">{r.lastActive}</td>
                                        <td className="px-6 py-3 text-right font-medium">{r.missingCampaigns}</td>
                                        <td className="px-6 py-3 text-right">
                                             <button 
                                                onClick={() => openNudge(r)}
                                                className="text-gray-500 font-medium hover:text-black text-xs border border-gray-200 hover:border-black px-2 py-1 rounded transition hover:bg-white bg-gray-50"
                                             >
                                                Nudge
                                             </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <PartnerAttentionDrawer 
                isOpen={isAttentionDrawerOpen} 
                onClose={() => setIsAttentionDrawerOpen(false)} 
            />
            
            <NudgeModal 
                isOpen={nudgeModalState.isOpen}
                onClose={() => setNudgeModalState(prev => ({ ...prev, isOpen: false }))}
                retailerName={nudgeModalState.retailer?.name}
                onSend={handleSendNudge}
            />
        </div>
    );
};

export default PartnerOverview;
