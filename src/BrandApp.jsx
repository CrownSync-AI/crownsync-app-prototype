import React, { useState } from 'react';
import Toast from './brand/components/Toast';
import BrandSidebar from './brand/BrandSidebar';
import AssetsOverview from './brand/features/assets/AssetsOverview';
import CampaignManager from './brand/features/assets/CampaignManager';
import AssetLibrary from './brand/features/assets/AssetLibrary';
import TemplateLibrary from './brand/features/assets/TemplateLibrary';
import ResourcesManager from './brand/features/assets/ResourcesManager';

const BrandApp = ({ 
  files, setFiles, 
  campaigns, setCampaigns, 
  templates, setTemplates, 
  catalogs, setCatalogs, 
  retailers,
  showEmptyState 
}) => {
  const [activePage, setActivePage] = useState('assets-overview');
  const [notification, setNotification] = useState(null);

  const notify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900 relative">
      {notification && <Toast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      <BrandSidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 overflow-hidden flex flex-col bg-gray-50">
        {activePage.startsWith('assets-') ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                 {activePage === 'assets-overview' && <AssetsOverview files={files} campaigns={campaigns} notify={notify} isEmpty={showEmptyState} />}
                 {activePage === 'assets-campaigns' && <CampaignManager campaigns={campaigns} setCampaigns={setCampaigns} notify={notify} allFiles={files} setFiles={setFiles} allTemplates={templates} retailers={retailers} isEmpty={showEmptyState} />}
                 {activePage === 'assets-library' && <AssetLibrary files={files} setFiles={setFiles} campaigns={campaigns} notify={notify} isEmpty={showEmptyState} />}
                 {activePage === 'assets-templates' && <TemplateLibrary templates={templates} setTemplates={setTemplates} notify={notify} isEmpty={showEmptyState} />}
                 {activePage === 'assets-resources' && <ResourcesManager catalogs={catalogs} setCatalogs={setCatalogs} notify={notify} isEmpty={showEmptyState} files={files} setFiles={setFiles} />}
              </div>
            </div>
          ) : (
            <div className="p-12 flex items-center justify-center h-full text-gray-400">
               {activePage.charAt(0).toUpperCase() + activePage.slice(1)} View Placeholder
            </div>
          )}
      </main>

    </div>
  );
};

export default BrandApp;
