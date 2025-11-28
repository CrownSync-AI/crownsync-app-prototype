import React, { useState } from 'react';
import { Filter, ChevronRight, LayoutGrid, List, Search, Instagram, Facebook, Mail, Download, MessageSquare, Smartphone, Check, ArrowRight, Flame, ChevronDown } from 'lucide-react';
import CampaignCard from './components/CampaignCard';

const AllCampaigns = ({ campaigns, brands, templates, files, initialBrandId = 'all' }) => {
  const [filterBrand, setFilterBrand] = useState(initialBrandId);
  const [filterAssetTypes, setFilterAssetTypes] = useState([]); // Multi-select
  const [filterUsage, setFilterUsage] = useState('all'); // 'all', 'unused', 'used'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'expiring'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [isAssetTypeDropdownOpen, setIsAssetTypeDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  
  // --- Filtering Logic for Main Grid ---
  const filteredCampaigns = campaigns.filter(c => {
      // Search Filter
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // Brand Filter
      if (filterBrand !== 'all' && c.brandId !== filterBrand) return false;

      // Usage Filter
      const isUsed = c.retailerUsage && Object.values(c.retailerUsage).some(v => v === true);
      if (filterUsage === 'unused' && isUsed) return false;
      if (filterUsage === 'used' && !isUsed) return false;

      // Asset Type Filter (Multi-select OR logic)
      if (filterAssetTypes.length > 0) {
          const linkedTemplates = templates.filter(t => c.templates?.includes(t.id));
          const linkedAssets = files.filter(f => c.assets?.includes(f.id));
          
          const hasSocial = linkedTemplates.some(t => t.type === 'social');
          const hasEmail = linkedTemplates.some(t => t.type === 'email');
          const hasSMS = linkedTemplates.some(t => t.type === 'sms');
          const hasFiles = linkedAssets.length > 0;

          const matches = filterAssetTypes.some(type => {
              if (type === 'social') return hasSocial;
              if (type === 'email') return hasEmail;
              if (type === 'sms') return hasSMS;
              if (type === 'files') return hasFiles;
              return false;
          });
          if (!matches) return false;
      }

      return true;
  }).sort((a, b) => {
      if (sortBy === 'expiring') {
          const dateA = a.endDate === 'Permanent' ? new Date('2099-12-31') : new Date(a.endDate);
          const dateB = b.endDate === 'Permanent' ? new Date('2099-12-31') : new Date(b.endDate);
          return dateA - dateB;
      }
      // Default Newest (using ID or simulated date if available, here just mock order)
      return 0; 
  });

  const toggleAssetTypeFilter = (type) => {
      setFilterAssetTypes(prev => 
          prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
  };

  const getPlatformIcon = (p) => {
      switch(p) {
          case 'instagram': return <Instagram size={14} className="text-pink-600"/>;
          case 'facebook': return <div className="w-3.5 h-3.5 bg-blue-600 rounded-full flex items-center justify-center text-[9px] text-white font-bold">f</div>;
          case 'x': 
          case 'twitter': return <div className="w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center text-[9px] text-white font-bold">X</div>;
          case 'google': return <div className="w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold">G</div>;
          default: return <Smartphone size={14} className="text-gray-400"/>;
      }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
       {/* 1. Global Filter Bar (Sticky) */}
       <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
             {/* Left: Filters */}
             <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                {/* Brand Filter (Custom Dropdown) */}
                <div className="relative">
                   <button 
                      onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg text-sm font-medium text-gray-900 border-none focus:ring-2 focus:ring-black cursor-pointer min-w-[140px] justify-between"
                   >
                      <div className="flex items-center gap-2">
                         {filterBrand !== 'all' && (
                            <div className={`w-4 h-4 rounded-full ${brands.find(b => b.id === filterBrand)?.logo} flex items-center justify-center text-white text-[6px] font-bold`}>
                               {brands.find(b => b.id === filterBrand)?.name.substring(0,1)}
                            </div>
                         )}
                         <span>{filterBrand === 'all' ? 'All Brands' : brands.find(b => b.id === filterBrand)?.name}</span>
                      </div>
                      <ChevronDown size={14} className="text-gray-500"/>
                   </button>
                   
                   {isBrandDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-40 animate-in fade-in zoom-in-95 max-h-[300px] overflow-y-auto">
                         <button 
                            onClick={() => { setFilterBrand('all'); setIsBrandDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2 ${filterBrand === 'all' ? 'bg-gray-50 font-bold' : 'text-gray-700'}`}
                         >
                            All Brands
                         </button>
                         {brands.map(b => (
                            <button 
                               key={b.id}
                               onClick={() => { setFilterBrand(b.id); setIsBrandDropdownOpen(false); }}
                               className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2 ${filterBrand === b.id ? 'bg-gray-50 font-bold' : 'text-gray-700'}`}
                            >
                               <div className={`w-5 h-5 rounded-full ${b.logo} flex items-center justify-center text-white text-[8px] font-bold`}>
                                  {b.name.substring(0,1)}
                               </div>
                               {b.name}
                            </button>
                         ))}
                      </div>
                   )}
                   {isBrandDropdownOpen && (
                      <div className="fixed inset-0 z-30" onClick={() => setIsBrandDropdownOpen(false)}></div>
                   )}
                </div>

                {/* Asset Type Filter (Multi-select Dropdown) */}
                <div className="relative">
                   <button 
                      onClick={() => setIsAssetTypeDropdownOpen(!isAssetTypeDropdownOpen)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg text-sm font-medium text-gray-900 border-none focus:ring-2 focus:ring-black cursor-pointer whitespace-nowrap"
                   >
                      <span>{filterAssetTypes.length === 0 ? 'All Asset Types' : `${filterAssetTypes.length} Selected`}</span>
                      <ChevronDown size={14} className="text-gray-500"/>
                   </button>
                   
                   {isAssetTypeDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-40 animate-in fade-in zoom-in-95">
                         <div className="px-3 pb-2 mb-2 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">Filter by Type</div>
                         {[
                            { id: 'social', label: 'Social Posts', icon: <Instagram size={14}/> },
                            { id: 'email', label: 'Email Drafts', icon: <Mail size={14}/> },
                            { id: 'sms', label: 'SMS Messages', icon: <MessageSquare size={14}/> },
                            { id: 'files', label: 'Downloads', icon: <Download size={14}/> }
                         ].map(type => (
                            <button 
                               key={type.id}
                               onClick={() => toggleAssetTypeFilter(type.id)}
                               className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center justify-between group"
                            >
                               <div className="flex items-center gap-2 text-gray-700">
                                  {type.icon}
                                  <span>{type.label}</span>
                               </div>
                               {filterAssetTypes.includes(type.id) && <Check size={14} className="text-black"/>}
                            </button>
                         ))}
                      </div>
                   )}
                   {isAssetTypeDropdownOpen && (
                      <div className="fixed inset-0 z-30" onClick={() => setIsAssetTypeDropdownOpen(false)}></div>
                   )}
                </div>

                {/* Usage Filter (Segmented Control) */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                   {[
                      { id: 'all', label: 'All' },
                      { id: 'unused', label: 'Unused' },
                      { id: 'used', label: 'Used' }
                   ].map(opt => (
                      <button 
                         key={opt.id}
                         onClick={() => setFilterUsage(opt.id)}
                         className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${filterUsage === opt.id ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                      >
                         {opt.label}
                      </button>
                   ))}
                </div>
             </div>

             {/* Center: Search */}
             <div className="flex-1 max-w-md relative ml-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
                />
             </div>

             {/* Right: Sort & View */}
             <div className="flex items-center gap-4 flex-1 justify-end min-w-[200px]">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer hover:text-black"
                >
                   <option value="newest">Sort: Newest</option>
                   <option value="expiring">Sort: Expiring Soon</option>
                </select>
                
                <div className="h-4 w-px bg-gray-300"></div>

                <div className="flex bg-gray-100 rounded p-0.5">
                   <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}><LayoutGrid size={14}/></button>
                   <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}><List size={14}/></button>
                </div>
             </div>
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Main Content Flow */}
          <section id="main-content">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-bold text-gray-900">All Campaigns</h2>
             </div>
             
             {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                   {filteredCampaigns.map(campaign => (
                      <div key={campaign.id} className="flex flex-col">
                         <CampaignCard 
                           campaign={campaign} 
                           brand={brands.find(b => b.id === campaign.brandId)}
                           templates={templates}
                           files={files}
                         />
                      </div>
                   ))}
                </div>
             ) : (
                /* List View - Light Data Grid */
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                   {/* Header Row */}
                   <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div className="col-span-4">Campaign Name</div>
                      <div className="col-span-2">Brand</div>
                      <div className="col-span-2">Asset Types</div>
                      <div className="col-span-2">My Usage</div>
                      <div className="col-span-2 text-right">Ends On</div>
                   </div>

                   {/* Data Rows */}
                   <div className="divide-y divide-gray-50">
                      {filteredCampaigns.map(campaign => {
                         const brand = brands.find(b => b.id === campaign.brandId);
                         
                         // Calculate Assets
                         const linkedTemplates = templates.filter(t => campaign.templates?.includes(t.id));
                         const linkedAssets = files.filter(f => campaign.assets?.includes(f.id));
                         const socialTemplates = linkedTemplates.filter(t => t.type === 'social');
                         const platforms = [...new Set(socialTemplates.flatMap(t => t.platforms || []))];
                         const hasEmail = linkedTemplates.some(t => t.type === 'email');
                         const hasSMS = linkedTemplates.some(t => t.type === 'sms');
                         const hasFiles = linkedAssets.length > 0;

                         // Expiration Logic
                         const getExpiration = () => {
                            if (campaign.endDate === 'Permanent') return { label: 'No Expiration', color: 'text-green-600' };
                            const end = new Date(campaign.endDate);
                            const now = new Date('2025-11-26');
                            const diffTime = end - now;
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            
                            if (diffDays <= 1) return { label: 'Ends Today', color: 'text-red-600', icon: <Flame size={12} className="fill-red-600"/> };
                            if (diffDays <= 7) return { label: `${diffDays} Days Left`, color: 'text-amber-600' };
                            return { label: campaign.endDate, color: 'text-gray-500' };
                         };
                         const expiration = getExpiration();

                         // Usage Logic
                         const usage = campaign.retailerUsage || {};
                         const hasUsage = Object.values(usage).some(v => v === true);

                         return (
                            <div key={campaign.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition group cursor-pointer">
                               {/* Campaign Name */}
                               <div className="col-span-4 flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-lg ${campaign.cover} flex-shrink-0`}></div>
                                  <div className="min-w-0">
                                     <h3 className="font-serif font-bold text-gray-900 truncate group-hover:text-indigo-600 transition">{campaign.title}</h3>
                                     <p className="text-xs text-gray-500 truncate max-w-[200px]">{campaign.description}</p>
                                  </div>
                               </div>

                               {/* Brand (Logo Only, Tooltip Name) */}
                               <div className="col-span-2 flex items-center">
                                  <div className={`w-8 h-8 rounded-full ${brand?.logo} flex items-center justify-center text-white text-[10px] font-bold cursor-help group/brand relative`}>
                                     {brand?.name?.substring(0,1)}
                                     {/* Tooltip */}
                                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/brand:opacity-100 transition pointer-events-none whitespace-nowrap z-30">
                                        {brand?.name}
                                     </div>
                                  </div>
                               </div>

                               {/* Asset Types */}
                               <div className="col-span-2 flex items-center gap-1.5">
                                  {platforms.map(p => (
                                     <div key={p} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center" title={p}>
                                        {getPlatformIcon(p)}
                                     </div>
                                  ))}
                                  {hasEmail && <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600" title="Email"><Mail size={12}/></div>}
                                  {hasSMS && <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600" title="SMS"><MessageSquare size={12}/></div>}
                                  {hasFiles && <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600" title="Downloads"><Download size={12}/></div>}
                               </div>

                               {/* My Usage (Only show used icons, subset of Asset Types) */}
                               <div className="col-span-2 flex items-center gap-1.5">
                                  {!hasUsage ? (
                                     <span className="text-gray-300 text-sm">--</span>
                                  ) : (
                                     <>
                                        {/* Social: Check usage AND if social assets exist */}
                                        {usage.social && platforms.length > 0 && platforms.map(p => (
                                           <div key={p} className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center" title={`Used on ${p}`}>
                                              {getPlatformIcon(p)}
                                           </div>
                                        ))}
                                        
                                        {/* Email */}
                                        {usage.email && hasEmail && (
                                           <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600" title="Email Sent">
                                              <Mail size={12}/>
                                           </div>
                                        )}
                                        
                                        {/* SMS */}
                                        {usage.sms && hasSMS && (
                                           <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600" title="SMS Sent">
                                              <MessageSquare size={12}/>
                                           </div>
                                        )}
                                        
                                        {/* Download */}
                                        {usage.download && hasFiles && (
                                           <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600" title="Downloaded">
                                              <Download size={12}/>
                                           </div>
                                        )}
                                     </>
                                  )}
                               </div>

                               {/* Ends On (No Arrow) */}
                               <div className="col-span-2 text-right flex items-center justify-end gap-2">
                                  <div className={`text-sm font-medium ${expiration.color} flex items-center gap-1`}>
                                     {expiration.icon}
                                     {expiration.label}
                                  </div>
                               </div>
                            </div>
                         );
                      })}
                   </div>
                </div>
             )}
          </section>

          {/* Footer: Load More */}
          <div className="flex justify-center pt-8 pb-4">
             <button className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition shadow-sm">
                Load More Campaigns
             </button>
          </div>
       </div>
    </div>
  );
};

export default AllCampaigns;
