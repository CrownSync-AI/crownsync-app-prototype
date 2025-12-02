import React, { useState } from 'react';
import Toast from './brand/components/Toast';
import BrandSidebar from './brand/BrandSidebar';
import PartnerOverview from './brand/features/partner/PartnerOverview';
import CampaignManager from './brand/features/partner/CampaignManager';
import ResourcesManager from './brand/features/partner/ResourcesManager';
import AssetLibrary from './brand/features/assets/AssetLibrary';
import TemplateLibrary from './brand/features/assets/TemplateLibrary';
import RetailersManager from './brand/features/partner/retailers/RetailersManager';

const BrandApp = ({ 
  files, setFiles, 
  campaigns, setCampaigns, 
  templates, setTemplates, 
  catalogs, setCatalogs, 
  retailers,
  showEmptyState 
}) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [notification, setNotification] = useState(null);

  const notify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const renderContent = () => {
      switch(activePage) {
          // Dashboard
          case 'dashboard':
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                      <div className="text-6xl">📊</div>
                      <div className="text-xl font-medium">Dashboard Coming Soon</div>
                      <div className="text-sm">Global overview of brand performance.</div>
                  </div>
              );

          // Assets (Global)
          case 'assets-library':
              return <AssetLibrary files={files} setFiles={setFiles} campaigns={campaigns} notify={notify} isEmpty={showEmptyState} />;
          case 'assets-templates':
              return <TemplateLibrary templates={templates} setTemplates={setTemplates} notify={notify} isEmpty={showEmptyState} />;

          // Partner Hub
          case 'partner-overview':
              return <PartnerOverview files={files} campaigns={campaigns} notify={notify} isEmpty={showEmptyState} />;
          case 'partner-campaigns':
              return <CampaignManager campaigns={campaigns} setCampaigns={setCampaigns} notify={notify} allFiles={files} setFiles={setFiles} allTemplates={templates} retailers={retailers} isEmpty={showEmptyState} />;
          case 'partner-resources':
              return <ResourcesManager catalogs={catalogs} setCatalogs={setCatalogs} notify={notify} isEmpty={showEmptyState} files={files} setFiles={setFiles} />;
          case 'partner-tasks':
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                      <div className="text-6xl">✅</div>
                      <div className="text-xl font-medium">Partner Tasks</div>
                      <div className="text-sm">Assign and track tasks for retailers.</div>
                  </div>
              );
          case 'partner-retailers':
              return <RetailersManager notify={notify} />;

          // Direct Marketing
          case 'direct-social':
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                      <div className="text-6xl">📱</div>
                      <div className="text-xl font-medium">Social Posts</div>
                      <div className="text-sm">Manage official brand social media.</div>
                  </div>
              );
          case 'direct-email':
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                      <div className="text-6xl">📧</div>
                      <div className="text-xl font-medium">Email Blasts</div>
                      <div className="text-sm">Send newsletters to customers.</div>
                  </div>
              );
          case 'direct-sms':
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                      <div className="text-6xl">💬</div>
                      <div className="text-xl font-medium">SMS Marketing</div>
                      <div className="text-sm">Send text message campaigns.</div>
                  </div>
              );

          // Analytics
          case 'analytics':
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                      <div className="text-6xl">📈</div>
                      <div className="text-xl font-medium">Analytics</div>
                      <div className="text-sm">Deep dive into data.</div>
                  </div>
              );

          // Settings
          case 'settings':
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                      <div className="text-6xl">⚙️</div>
                      <div className="text-xl font-medium">Settings</div>
                      <div className="text-sm">Configure your brand account.</div>
                  </div>
              );

          default:
              return (
                  <div className="p-12 flex items-center justify-center h-full text-gray-400">
                     Page Not Found
                  </div>
              );
      }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900 relative">
      {notification && <Toast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      <BrandSidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 overflow-hidden flex flex-col bg-gray-50">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden relative">
             {renderContent()}
          </div>
        </div>
      </main>

    </div>
  );
};

export default BrandApp;
