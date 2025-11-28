import React, { useState } from 'react';
import { Filter, Clock, Download, Pin, FolderOpen } from 'lucide-react';
import AllCampaigns from './AllCampaigns';
import Overview from './Overview';
import PartnerBrands from './PartnerBrands';

// --- Mock Data for Retailer View ---
const MOCK_BRANDS = [
  { id: 'b1', name: 'Chanel', logo: 'bg-black text-white', campaigns: 12, catalogs: 4, heroImage: 'bg-gradient-to-r from-gray-900 to-black', engagement: 95, unreadCampaigns: 3, expiringCampaigns: 0, newResources: 2 },
  { id: 'b2', name: 'Gucci', logo: 'bg-green-700 text-white', campaigns: 8, catalogs: 2, heroImage: 'bg-gradient-to-r from-green-800 to-red-800', engagement: 88, unreadCampaigns: 1, expiringCampaigns: 1, newResources: 5 },
  { id: 'b3', name: 'Louis Vuitton', logo: 'bg-amber-800 text-white', campaigns: 15, catalogs: 6, heroImage: 'bg-gradient-to-r from-amber-900 to-yellow-700', engagement: 92, unreadCampaigns: 4, expiringCampaigns: 0, newResources: 1 },
  { id: 'b4', name: 'Dior', logo: 'bg-gray-200 text-black', campaigns: 10, catalogs: 3, heroImage: 'bg-gradient-to-r from-gray-100 to-gray-300', engagement: 85, unreadCampaigns: 2, expiringCampaigns: 1, newResources: 0 },
  { id: 'b5', name: 'Hermès', logo: 'bg-orange-600 text-white', campaigns: 6, catalogs: 2, heroImage: 'bg-gradient-to-r from-orange-500 to-orange-700', engagement: 78, unreadCampaigns: 0, expiringCampaigns: 0, newResources: 3 },
  { id: 'b6', name: 'Prada', logo: 'bg-black text-white', campaigns: 9, catalogs: 3, heroImage: 'bg-gradient-to-r from-slate-900 to-slate-800', engagement: 82, unreadCampaigns: 1, expiringCampaigns: 0, newResources: 0 },
  { id: 'b7', name: 'Tiffany & Co.', logo: 'bg-teal-300 text-black', campaigns: 7, catalogs: 2, heroImage: 'bg-gradient-to-r from-teal-200 to-teal-400', engagement: 90, unreadCampaigns: 2, expiringCampaigns: 0, newResources: 1 },
  { id: 'b8', name: 'Cartier', logo: 'bg-red-700 text-white', campaigns: 5, catalogs: 1, heroImage: 'bg-gradient-to-r from-red-800 to-red-600', engagement: 75, unreadCampaigns: 0, expiringCampaigns: 0, newResources: 0 },
  { id: 'b9', name: 'Rolex', logo: 'bg-emerald-800 text-white', campaigns: 4, catalogs: 1, heroImage: 'bg-gradient-to-r from-emerald-900 to-green-800', engagement: 70, unreadCampaigns: 0, expiringCampaigns: 0, newResources: 0 },
  { id: 'b10', name: 'Burberry', logo: 'bg-amber-100 text-black', campaigns: 11, catalogs: 4, heroImage: 'bg-gradient-to-r from-amber-100 to-orange-100', engagement: 80, unreadCampaigns: 1, expiringCampaigns: 1, newResources: 2 },
];

const AllCatalogs = ({ catalogs, brands }) => {
  const [filterBrand, setFilterBrand] = useState('all');
  
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-3 pb-2">
          <Filter size={16} className="text-gray-400"/>
          <select 
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-black focus:border-black block w-full md:w-64 p-2.5"
          >
            <option value="all">All Brands</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalogs.map(cat => (
             <div key={cat.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                   <div className={`w-12 h-12 rounded ${cat.cover} flex items-center justify-center`}>
                      <FolderOpen size={20} className="text-gray-700"/>
                   </div>
                   <button className="text-gray-400 hover:text-black"><Download size={18}/></button>
                </div>
                <h3 className="font-medium truncate mb-1">{cat.name}</h3>
                <div className="text-xs text-gray-500 mb-3">Updated {cat.updated}</div>
                <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-fit">
                   {brands.find(b => b.id === 'b1')?.name}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const BrandCenter = ({ campaigns, catalogs, templates, files }) => {
  const [view, setView] = useState('overview'); // Default to overview
  const [selectedBrandId, setSelectedBrandId] = useState('all');

  const handleNavigate = (targetView) => {
    setView(targetView);
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrandId(brand.id);
    setView('campaigns');
  };

  return (
    <div className="h-full flex flex-col">
       {/* Brand Center Header Tabs */}
       <div className="flex items-center gap-6 border-b border-gray-200 px-6 bg-white sticky top-0 z-10 flex-shrink-0">
          <button 
            onClick={() => setView('overview')}
            className={`py-4 text-sm font-medium border-b-2 transition ${view === 'overview' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setView('brands')}
            className={`py-4 text-sm font-medium border-b-2 transition ${view === 'brands' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Partner Brands
          </button>
          <button 
            onClick={() => setView('campaigns')}
            className={`py-4 text-sm font-medium border-b-2 transition ${view === 'campaigns' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            All Campaigns
          </button>
          <button 
            onClick={() => setView('catalogs')}
            className={`py-4 text-sm font-medium border-b-2 transition ${view === 'catalogs' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Resources
          </button>
       </div>

       <div className="flex-1 overflow-hidden">
          {view === 'overview' && (
            <div className="h-full overflow-auto">
              <Overview 
                campaigns={campaigns} 
                brands={MOCK_BRANDS} 
                templates={templates} 
                files={files} 
                onNavigate={handleNavigate} 
              />
            </div>
          )}
          {view === 'brands' && (
            <div className="h-full overflow-auto">
              <PartnerBrands 
                brands={MOCK_BRANDS} 
                onSelectBrand={handleSelectBrand} 
              />
            </div>
          )}
          {view === 'campaigns' && (
             <AllCampaigns 
               key={selectedBrandId} // Force re-render when brand changes
               campaigns={campaigns} 
               brands={MOCK_BRANDS} 
               templates={templates}
               files={files}
               initialBrandId={selectedBrandId}
             />
          )}
          {view === 'catalogs' && <div className="p-6 overflow-auto h-full"><AllCatalogs catalogs={catalogs} brands={MOCK_BRANDS} /></div>}
       </div>
    </div>
  );
};

export default BrandCenter;
