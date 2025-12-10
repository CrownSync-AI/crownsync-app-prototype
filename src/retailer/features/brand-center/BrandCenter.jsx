import React, { useState } from 'react';
import { Filter, Clock, Download, Pin, FolderOpen } from 'lucide-react';
import AllCampaigns from './AllCampaigns';
import Overview from './Overview';
import PartnerBrands from './PartnerBrands';

import { brands } from '../../../data/mockStore/brandStore';

// --- Mock Data for Retailer View ---
// MOCK_BRANDS removed, using imported brands


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

import RetailerBrandDetail from './RetailerBrandDetail';

// ... (imports)

const BrandCenter = ({ campaigns, catalogs, templates, files }) => {
  const [view, setView] = useState('overview'); // Default to overview
  const [selectedBrandId] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleNavigate = (targetView) => {
    setView(targetView);
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setView('brand-detail');
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
            className={`py-4 text-sm font-medium border-b-2 transition ${view === 'brands' || view === 'brand-detail' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
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
                 brands={brands} 
                 templates={templates} 
                 files={files} 
                 onNavigate={handleNavigate} 
               />
             </div>
           )}
           {view === 'brands' && (
             <div className="h-full overflow-auto">
               <PartnerBrands 
                 brands={brands} 
                 onSelectBrand={handleSelectBrand} 
               />
             </div>
           )}
           {view === 'brand-detail' && selectedBrand && (
              <div className="h-full overflow-auto">
                 <RetailerBrandDetail 
                    brand={selectedBrand}
                    onBack={() => setView('brands')}
                 />
              </div>
           )}
           {view === 'campaigns' && (
              <AllCampaigns 
                key={selectedBrandId} // Force re-render when brand changes
                campaigns={campaigns} 
                brands={brands} 
                templates={templates}
                files={files}
                initialBrandId={selectedBrandId}
              />
           )}
           {view === 'catalogs' && <div className="p-6 overflow-auto h-full"><AllCatalogs catalogs={catalogs} brands={brands} /></div>}
       </div>
    </div>
  );
};

export default BrandCenter;
