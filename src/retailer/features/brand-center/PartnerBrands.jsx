import React from 'react';
import { ArrowRight, Bell, AlertTriangle, FileText, TrendingUp } from 'lucide-react';

const PartnerBrands = ({ brands, onSelectBrand }) => {
  return (
    <div className="p-8 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Partner Brands</h1>
        <p className="text-gray-500 mt-1">Manage your relationships and view brand-specific assets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map(brand => (
          <div 
            key={brand.id} 
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            onClick={() => onSelectBrand(brand)}
          >
            {/* Hero Section */}
            <div className={`h-32 ${brand.heroImage || 'bg-gray-100'} relative p-6 flex items-end`}>
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
               
               {/* Logo */}
               <div className={`w-16 h-16 rounded-full ${brand.logo} border-4 border-white shadow-md flex items-center justify-center text-xl font-bold absolute bottom-[-20px] left-6 z-10`}>
                  {brand.name.substring(0,1)}
               </div>
            </div>

            {/* Content Section */}
            <div className="pt-8 px-6 pb-6 flex-1 flex flex-col">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition">{brand.name}</h3>
                     <p className="text-xs text-gray-500">{brand.campaigns} Campaigns • {brand.catalogs} Catalogs</p>
                  </div>
                  {/* Engagement Score */}
                  <div className="flex flex-col items-end">
                     <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp size={12} />
                        {brand.engagement}%
                     </div>
                     <span className="text-[10px] text-gray-400 mt-1">Engagement</span>
                  </div>
               </div>

               {/* Status Indicators */}
               <div className="space-y-2 mb-6 flex-1">
                  {brand.unreadCampaigns > 0 && (
                     <div className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        {brand.unreadCampaigns} New Campaigns
                     </div>
                  )}
                  {brand.expiringCampaigns > 0 && (
                     <div className="flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                        <AlertTriangle size={12} />
                        {brand.expiringCampaigns} Expiring Soon
                     </div>
                  )}
                  {brand.newResources > 0 && (
                     <div className="flex items-center gap-2 text-xs font-medium text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                        <FileText size={12} />
                        {brand.newResources} New Resources
                     </div>
                  )}
                  {brand.unreadCampaigns === 0 && brand.expiringCampaigns === 0 && brand.newResources === 0 && (
                     <div className="text-xs text-gray-400 italic py-2">No new updates</div>
                  )}
               </div>

               {/* CTA */}
               <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition">
                  View Brand Assets
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerBrands;
