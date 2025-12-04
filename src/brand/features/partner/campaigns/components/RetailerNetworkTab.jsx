import React, { useState } from 'react';
import { MapPin, TrendingUp, AlertCircle, Send, Search, Filter, ChevronRight, X, Award, MessageSquare } from 'lucide-react';

const RetailerNetworkTab = ({ campaign, retailers = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterZone, setFilterZone] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNudgeModal, setShowNudgeModal] = useState(false);
  const [nudgeMessage, setNudgeMessage] = useState('');
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  // Mock data for regional analysis
  const regions = [
    { name: 'North America', adoptionRate: 85, active: 45, total: 53, color: 'from-amber-600 to-amber-800' },
    { name: 'Europe', adoptionRate: 72, active: 38, total: 53, color: 'from-amber-500 to-amber-700' },
    { name: 'Asia Pacific', adoptionRate: 91, active: 48, total: 53, color: 'from-amber-700 to-amber-900' },
    { name: 'Middle East', adoptionRate: 68, active: 21, total: 31, color: 'from-amber-400 to-amber-600' }
  ];

  // Generate mock retailer data with campaign engagement
  const mockRetailerData = retailers.map((retailer, idx) => ({
    ...retailer,
    status: idx % 5 === 0 ? 'Pending' : idx % 3 === 0 ? 'Viewed' : 'Active',
    lastAction: idx % 5 === 0 ? 'Not opened' : idx % 3 === 0 ? 'Viewed 2 days ago' : 'Downloaded assets 1 day ago',
    engagementScore: 45 + (idx * 7) % 55, // Deterministic score between 45-100
    assetsDownloaded: idx % 5 === 0 ? 0 : (idx * 3) % 15,
    contentShared: idx % 5 === 0 ? 0 : (idx * 2) % 8
  }));

  // Top performers
  const topPerformers = mockRetailerData
    .filter(r => r.status === 'Active')
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, 5);

  // Needs attention
  const needsAttention = mockRetailerData.filter(r => r.status === 'Pending' || r.status === 'Viewed');

  // Filtered retailers
  const filteredRetailers = mockRetailerData.filter(retailer => {
    const matchesSearch = retailer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || retailer.tier === filterTier;
    const matchesZone = filterZone === 'all' || retailer.zone === filterZone;
    const matchesStatus = filterStatus === 'all' || retailer.status === filterStatus;
    return matchesSearch && matchesTier && matchesZone && matchesStatus;
  });

  const handleSendReminder = () => {
    setNudgeMessage(`Hi there! Just a friendly reminder that our new ${campaign.title} campaign is now live. We'd love for you to check it out and share the exciting content with your customers.`);
    setShowNudgeModal(true);
  };

  const confirmSendNudge = () => {
    // Mock send logic
    setShowNudgeModal(false);
    alert(`Reminder sent to ${needsAttention.length} retailers`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Section A: Regional Map Analysis */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin size={20} className="text-amber-500" />
              Regional Adoption Analysis
            </h2>
            <span className="text-xs text-gray-400">Live Data</span>
          </div>
        </div>
        
        {/* Simplified Regional Visualization */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {regions.map((region, idx) => (
              <div 
                key={idx}
                className="group relative bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-amber-500/50 transition cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition rounded-lg" style={{backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`}}></div>
                
                <div className="relative">
                  <div className="text-xs font-medium text-gray-400 mb-2">{region.name}</div>
                  <div className="text-3xl font-bold text-white mb-1">{region.adoptionRate}%</div>
                  <div className="text-xs text-gray-500">
                    {region.active}/{region.total} Active
                  </div>
                  
                  {/* Adoption indicator */}
                  <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${region.color} transition-all duration-500`}
                      style={{ width: `${region.adoptionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section B: Action Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Top Performers */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Award size={18} className="text-emerald-600" />
                Top Performers
              </h3>
              <TrendingUp size={16} className="text-emerald-600" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {topPerformers.map((retailer, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                      #{idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{retailer.name}</div>
                    <div className="text-xs text-gray-500">
                      {retailer.assetsDownloaded} Assets • {retailer.contentShared} Shared
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-600">{retailer.engagementScore}%</div>
                    <div className="text-xs text-gray-400">Engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Needs Attention */}
        <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-600" />
                Needs Attention
              </h3>
              <span className="text-2xl font-bold text-amber-600">{needsAttention.length}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-4">
                {needsAttention.filter(r => r.status === 'Pending').length} retailers haven't opened the campaign yet
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {needsAttention.slice(0, 5).map((retailer, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm p-2 rounded hover:bg-amber-50 transition">
                    <span className="text-gray-700">{retailer.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      retailer.status === 'Pending' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {retailer.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleSendReminder}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Send Smart Reminder
            </button>
          </div>
        </div>
      </div>

      {/* Section C: Retailer List Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">All Retailers</h3>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search retailers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
              >
                <option value="all">All Tiers</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
              </select>
              
              <select
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
              >
                <option value="all">All Zones</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Viewed">Viewed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Retailer</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Action</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRetailers.map((retailer, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{retailer.name}</div>
                    <div className="text-xs text-gray-500">{retailer.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      retailer.tier === 'Premium' 
                        ? 'bg-purple-50 text-purple-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {retailer.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{retailer.zone}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      retailer.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : retailer.status === 'Viewed'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {retailer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{retailer.lastAction}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedRetailer(retailer)}
                      className="text-gray-400 hover:text-black transition"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRetailers.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No retailers found matching your criteria.
          </div>
        )}
      </div>

      {/* Smart Nudge Modal */}
      {showNudgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                Message to {needsAttention.length} retailers
              </label>
              <textarea
                value={nudgeMessage}
                onChange={(e) => setNudgeMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                placeholder="Write a friendly reminder..."
              />
              <div className="mt-2 text-xs text-gray-500">
                Tip: Keep it friendly and personal to encourage engagement
              </div>
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
                className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-lg shadow-sm transition"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Retailer Detail Drawer (simplified) */}
      {selectedRetailer && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedRetailer(null)}></div>
          <div className="relative bg-white w-full max-w-md h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedRetailer.name}</h3>
                  <p className="text-sm text-gray-500">{selectedRetailer.location}</p>
                </div>
                <button onClick={() => setSelectedRetailer(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="text-xs text-gray-500 uppercase font-medium mb-2">Engagement Score</div>
                <div className="text-3xl font-bold text-gray-900">{selectedRetailer.engagementScore}%</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 uppercase font-medium mb-2">Activity</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Assets Downloaded</span>
                    <span className="font-medium text-gray-900">{selectedRetailer.assetsDownloaded}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Content Shared</span>
                    <span className="font-medium text-gray-900">{selectedRetailer.contentShared}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Action</span>
                    <span className="font-medium text-gray-900">{selectedRetailer.lastAction}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 uppercase font-medium mb-2">Status</div>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  selectedRetailer.status === 'Active' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : selectedRetailer.status === 'Viewed'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {selectedRetailer.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailerNetworkTab;
