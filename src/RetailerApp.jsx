import React, { useState } from 'react';
import RetailerSidebar from './retailer/components/RetailerSidebar';
import BrandCenter from './retailer/features/brand-center/BrandCenter';

const RetailerApp = ({ campaigns, catalogs, templates, files, showEmptyState }) => {
  const [activePage, setActivePage] = useState('dashboard');
  
  const user = {
    name: 'Sarah Jenkins',
    email: 'sarah@nordstrom.com',
    initials: 'SJ'
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900 relative">
      <RetailerSidebar activePage={activePage} setActivePage={setActivePage} user={user} />

      <main className="flex-1 overflow-hidden flex flex-col bg-gray-50">
        {activePage === 'brand-center' ? (
           <BrandCenter campaigns={campaigns} catalogs={catalogs} templates={templates} files={files} />
        ) : (
           <div className="p-12 flex items-center justify-center h-full text-gray-400">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)} View Placeholder
           </div>
        )}
      </main>
    </div>
  );
};

export default RetailerApp;
