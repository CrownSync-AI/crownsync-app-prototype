import React, { useState, useRef } from 'react';
import { 
  Instagram, Facebook, Twitter, MessageCircle, Video, Mail, Smartphone, 
  Download, Users, TrendingUp, Eye, MousePointer, FileText, Image as ImageIcon, 
  BarChart3, AlertCircle, RefreshCw, ChevronDown, ChevronRight, Info 
} from 'lucide-react';

const PerformanceTab = ({ campaign }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Today, 10:45 AM');

  const socialRef = useRef(null);
  const emailRef = useRef(null);
  const assetsRef = useRef(null);

  // --- Mock Data Generation ---
  
  // Social Content: Heterogeneous posts (some have IG+FB, some have TikTok, etc.)
  const socialContent = [
    {
      id: 'post-1',
      title: 'Summer Collection Launch',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop',
      platforms: ['instagram', 'facebook'],
      totalShares: 120,
      estReach: 45000,
      avgEngagement: 4.8,
      details: [
        { platform: 'instagram', shares: 85, likes: 3200, comments: 145 },
        { platform: 'facebook', shares: 35, reactions: 850, comments: 42 }
      ]
    },
    {
      id: 'post-2',
      title: 'Behind the Scenes Video',
      thumbnail: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=100&h=100&fit=crop',
      platforms: ['tiktok', 'instagram'],
      totalShares: 280,
      estReach: 125000,
      avgEngagement: 7.2,
      details: [
        { platform: 'tiktok', shares: 190, views: 85000, likes: 12400 },
        { platform: 'instagram', shares: 90, views: 32000, likes: 4500 }
      ]
    },
    {
      id: 'post-3',
      title: 'Limited Time Offer',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop',
      platforms: ['wechat'],
      totalShares: 45,
      estReach: 12000,
      avgEngagement: 3.5,
      details: [
        { platform: 'wechat', shares: 45, reads: 8500, wow: 320 }
      ]
    }
  ];

  // Email Content
  const emailContent = [
    { id: 'email-1', subject: 'VIP Invite: Summer Preview', sent: 450, openRate: 45, clickRate: 12, usageCount: 15 },
    { id: 'email-2', subject: 'Last Chance for Early Access', sent: 320, openRate: 38, clickRate: 8, usageCount: 10 },
    { id: 'email-3', subject: 'New Arrivals are Here', sent: 580, openRate: 25, clickRate: 4, usageCount: 22 }
  ];

  // SMS Content
  const smsData = {
    sent: 1200,
    deliveryRate: 98.5,
    clickRate: 18.2
  };

  // Asset Content
  const assetContent = [
    { id: 'asset-1', name: 'Lookbook_Q3_2024.pdf', type: 'PDF', size: '15 MB', downloads: 145, coverage: 80, lastActivity: '2h ago' },
    { id: 'asset-2', name: 'Campaign_Video_Main.mp4', type: 'Video', size: '45 MB', downloads: 89, coverage: 65, lastActivity: '5h ago' },
    { id: 'asset-3', name: 'Social_Assets_Pack.zip', type: 'ZIP', size: '128 MB', downloads: 210, coverage: 92, lastActivity: '10m ago' },
    { id: 'asset-4', name: 'Product_Shot_01.jpg', type: 'Image', size: '2.4 MB', downloads: 56, coverage: 40, lastActivity: '1d ago' },
    { id: 'asset-5', name: 'Product_Shot_02.jpg', type: 'Image', size: '2.2 MB', downloads: 48, coverage: 35, lastActivity: '1d ago' }
  ];

  // Counts for filters
  const counts = {
    all: socialContent.length + emailContent.length + 1 + assetContent.length, // +1 for SMS
    social: socialContent.length,
    email: emailContent.length,
    sms: 1,
    downloads: assetContent.length
  };

  // --- Actions ---

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastUpdated(`Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`);
    }, 1500);
  };

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const scrollToSection = (ref) => {
    const offset = 180; // Adjust for sticky header height
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    switch(filter) {
      case 'social': scrollToSection(socialRef); break;
      case 'email': scrollToSection(emailRef); break;
      case 'sms': scrollToSection(emailRef); break; // Grouped with Email
      case 'downloads': scrollToSection(assetsRef); break;
      default: window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to get platform icon
  const getPlatformIcon = (platform, size = 14) => {
    switch(platform) {
      case 'instagram': return <Instagram size={size} className="text-pink-600" />;
      case 'facebook': return <Facebook size={size} className="text-blue-600" />;
      case 'twitter': return <Twitter size={size} className="text-sky-500" />;
      case 'tiktok': return <Video size={size} className="text-black" />;
      case 'wechat': return <MessageCircle size={size} className="text-emerald-600" />;
      default: return null;
    }
  };

  // Helper to get file icon
  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return <FileText size={20} className="text-red-500" />;
      case 'Video': return <Video size={20} className="text-purple-500" />;
      case 'ZIP': return <Download size={20} className="text-gray-500" />;
      case 'Image': return <ImageIcon size={20} className="text-blue-500" />;
      default: return <FileText size={20} className="text-gray-400" />;
    }
  };

  // Empty State for Draft
  if (campaign.status === 'Draft') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <BarChart3 size={32} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No Performance Data Yet</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Analytics and retailer activity will appear here once you publish this campaign and retailers start interacting with it.
        </p>
        <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm max-w-lg mx-auto border border-blue-100 flex gap-3 text-left">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold mb-1">Ready to launch?</div>
            <div>Go to the Overview tab to complete your checklist and publish this campaign.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- Sticky Header: Data Status & Filters --- */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm -mx-6 px-6 py-4">
        <div className="flex flex-col gap-4 max-w-5xl mx-auto">
          
          {/* Data Refresh Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Last updated: {lastUpdated} • Auto-refreshes every 1 hour</span>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-black transition disabled:opacity-50"
            >
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
            </button>
          </div>

          {/* Smart Content Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Content', count: counts.all },
              { id: 'social', label: 'Social', count: counts.social },
              { id: 'email', label: 'Email', count: counts.email },
              { id: 'sms', label: 'SMS', count: counts.sms },
              { id: 'downloads', label: 'Downloads', count: counts.downloads },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-black text-white shadow-md transform scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === filter.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* --- Section 1: Social Media Performance --- */}
        <div ref={socialRef} className="scroll-mt-40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Instagram size={24} className="text-pink-500" />
              Social Media Performance
            </h2>
            <div className="flex gap-4">
               <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-xs text-gray-500 uppercase font-bold">Total Shares</div>
                  <div className="text-lg font-bold text-gray-900">445</div>
               </div>
               <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-xs text-gray-500 uppercase font-bold">Top Platform</div>
                  <div className="text-lg font-bold text-gray-900 flex items-center gap-1">
                    <Instagram size={14} /> Instagram
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Content Name</div>
              <div className="col-span-2 text-right">Total Shares</div>
              <div className="col-span-2 text-right">Est. Reach</div>
              <div className="col-span-2 text-right">Engagement</div>
              <div className="col-span-1 text-center">Details</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {socialContent.map((post) => (
                <div key={post.id} className="group bg-white transition hover:bg-gray-50/50">
                  {/* Master Row */}
                  <div 
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer"
                    onClick={() => toggleRow(post.id)}
                  >
                    <div className="col-span-5 flex items-center gap-4">
                      <img src={post.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100" />
                      <div>
                        <div className="font-bold text-gray-900 text-sm mb-1">{post.title}</div>
                        <div className="flex gap-1">
                          {post.platforms.map(p => (
                            <div key={p} className="p-1 bg-gray-100 rounded-md">
                              {getPlatformIcon(p, 12)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-bold text-gray-900">{post.totalShares}</div>
                    <div className="col-span-2 text-right text-gray-500 text-sm">{post.estReach.toLocaleString()}</div>
                    <div className="col-span-2 text-right">
                      <div className="flex items-center justify-end gap-1 font-medium text-emerald-600">
                        {post.avgEngagement}% <TrendingUp size={12} />
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button className={`p-1 rounded-full transition ${expandedRows.has(post.id) ? 'bg-gray-200 rotate-180' : 'hover:bg-gray-100'}`}>
                        <ChevronDown size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Detail Row (Expandable) */}
                  {expandedRows.has(post.id) && (
                    <div className="bg-gray-50/80 border-t border-gray-100 px-6 py-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="space-y-2 pl-[64px]"> {/* Indent to align with text */}
                        {post.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 w-24 font-medium text-gray-700">
                              {getPlatformIcon(detail.platform)}
                              <span className="capitalize">{detail.platform}</span>
                            </div>
                            <div className="flex gap-6 text-gray-600">
                              <span><span className="font-medium text-gray-900">{detail.shares}</span> Shares</span>
                              {detail.likes && <span><span className="font-medium text-gray-900">{detail.likes.toLocaleString()}</span> Likes</span>}
                              {detail.comments && <span><span className="font-medium text-gray-900">{detail.comments}</span> Comments</span>}
                              {detail.views && <span><span className="font-medium text-gray-900">{detail.views.toLocaleString()}</span> Views</span>}
                              {detail.reads && <span><span className="font-medium text-gray-900">{detail.reads.toLocaleString()}</span> Reads</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Section 2: Direct Outreach --- */}
        <div ref={emailRef} className="scroll-mt-40">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Mail size={24} className="text-blue-500" />
            Direct Outreach
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Email Table */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">Email Templates</h3>
                <span className="text-xs text-gray-500">Sorted by Open Rate</span>
              </div>
              <div className="divide-y divide-gray-100">
                {emailContent.map((email) => (
                  <div key={email.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900 text-sm">{email.subject}</div>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        Used by {email.usageCount} retailers
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">Sent</div>
                        <div className="text-sm font-bold text-gray-900">{email.sent}</div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Open Rate</span>
                          <span className="font-bold text-gray-900">{email.openRate}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${email.openRate}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">Click Rate</div>
                        <div className="text-sm font-bold text-gray-900">{email.clickRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Block */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Smartphone size={20} className="text-emerald-400" />
                  <h3 className="font-bold text-lg">SMS Performance</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Total Sent</div>
                    <div className="text-3xl font-bold">{smsData.sent.toLocaleString()}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Delivery Rate</div>
                      <div className="text-xl font-bold text-emerald-400">{smsData.deliveryRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Click Rate</div>
                      <div className="text-xl font-bold text-blue-400">{smsData.clickRate}%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700/50 text-xs text-slate-500 flex items-center gap-1">
                <Info size={12} />
                <span>SMS data is aggregated from all carriers</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 3: Downloadable Assets --- */}
        <div ref={assetsRef} className="scroll-mt-40">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Download size={24} className="text-purple-500" />
            Downloadable Assets
          </h2>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">Preview</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Type & Size</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Downloads</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Coverage</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Activity</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assetContent.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50 transition group">
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getFileIcon(asset.type)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-sm truncate max-w-[200px]" title={asset.name}>
                        {asset.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {asset.type} • {asset.size}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">{asset.downloads}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${asset.coverage}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-500">{asset.coverage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {asset.lastActivity}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline opacity-0 group-hover:opacity-100 transition">
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Load More / Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <button className="text-sm font-medium text-gray-600 hover:text-black transition">
                View All 15 Assets
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerformanceTab;
