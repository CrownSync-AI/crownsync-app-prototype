import React, { useState, useEffect } from 'react';
import BrandCampaignList from './BrandCampaignList';
import CampaignDetail from './campaigns/CampaignDetail';
import CreateCampaignModal from './campaigns/components/CreateCampaignModal';

let uniqueIdCounter = 1000;

const CampaignManager = ({ campaigns: initialCampaigns, setCampaigns: setParentCampaigns, notify, allFiles, setFiles, allTemplates, retailers }) => {
  // Local state if not provided by parent
  const [localCampaigns, setLocalCampaigns] = useState([]);
  const campaigns = initialCampaigns || localCampaigns;
  const setCampaigns = setParentCampaigns || setLocalCampaigns;

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Initialize with robust Mock Data using REAL IMAGES
  useEffect(() => {
    if (campaigns.length === 0 || !campaigns[0].adoptionRate) {
      const statuses = ['Active', 'Active', 'Scheduled', 'Draft', 'Ended', 'Active', 'Scheduled', 'Draft', 'Ended', 'Active', 'Draft', 'Ended', 'Archived', 'Active', 'Scheduled', 'Draft', 'Active', 'Ended'];
      
      const enhancedCampaigns = statuses.map((status, i) => {
        const isDraft = status === 'Draft';
        const isScheduled = status === 'Scheduled';
        const isEnded = status === 'Ended';
        const isActive = status === 'Active';
        const isPermanent = i === 5;

        // Mock Dates
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - (isActive ? 10 : isEnded ? 60 : -5));
        const endDate = isPermanent ? 'Permanent' : new Date(startDate);
        if (!isPermanent) endDate.setDate(startDate.getDate() + 30);

        // Real Unsplash Images (Luxury/Fashion themed)
        const coverImages = [
           'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1000&auto=format&fit=crop', // Luxury Watch/Jewelry
           'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', // Fashion Coat
           'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop', // Handbag
           'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop', // Modern Furniture
           'https://images.unsplash.com/photo-1522335789203-abd652322ed8?q=80&w=1000&auto=format&fit=crop', // Perfume
           'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', // Model
           'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop', // Suit
           'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=1000&auto=format&fit=crop', // Silverware/Home
        ];

        // Content - Mocking IDs that will match our local mock objects
          let assignedAssets = [];
          let assignedTemplates = [];

          if (i === 0) {
             // Campaign 1: ALL Content Types (Social: Insta/FB/X/Google, Email, SMS, File)
             assignedAssets = ['f-1'];
             assignedTemplates = ['t-all-social', 't-2', 't-3'];
          } else if (i === 1) {
             // Campaign 2: X and Google only
             assignedTemplates = ['t-x-google'];
          } else if (!isDraft) {
             // Others: Random mix
             if (i % 2 === 0) assignedAssets = ['f-1'];
             if (i % 3 === 0) assignedTemplates = ['t-1', 't-2']; // Insta/FB + Email
             else assignedTemplates = ['t-3']; // SMS
          }

          return {
            id: `camp-${i}`,
            title: `Campaign ${i + 1}: ${['Summer Sale', 'Holiday Special', 'New Arrival', 'VIP Event', 'Clearance', 'Brand Awareness'][i % 6]}`,
            description: 'A comprehensive campaign focusing on increasing brand engagement and driving sales through targeted social media and email marketing. Includes exclusive assets for premium retailers.',
            status: status,
            cover: ['bg-rose-100', 'bg-blue-100', 'bg-emerald-100', 'bg-amber-100', 'bg-purple-100'][i % 5], // Fallback
            coverImage: coverImages[i % coverImages.length],
            startDate: startDate.toISOString().split('T')[0],
            endDate: isPermanent ? 'Permanent' : endDate.toISOString().split('T')[0],
            audience: isDraft && i % 2 === 0 ? 'Unspecified' : (i % 3 === 0 ? 'All Retailers' : i % 3 === 1 ? '3 Groups' : '25 Retailers'),
            
            // Metrics
            adoptionRate: isDraft || isScheduled ? null : Math.floor(Math.random() * 60) + 20,
            usageCount: isDraft || isScheduled ? null : Math.floor(Math.random() * 1000),
            views: isDraft || isScheduled ? 0 : Math.floor(Math.random() * 5000),
            downloads: isDraft || isScheduled ? 0 : Math.floor(Math.random() * 1200),
            
            isPinned: i === 0,
            updatePending: i === 0,
            
            assets: assignedAssets,
            templates: assignedTemplates,
            
            permissions: 'guided',
            
            // New fields for header
            createdAt: new Date(startDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days before start
            createdBy: {
                name: 'Eleanor Pena',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop'
            }
          };
      });
      setCampaigns(enhancedCampaigns);
    }
  }, []);

  // Mock Objects for List View Icons
  const mockTemplates = [
      { id: 't-1', type: 'social', platforms: ['instagram', 'facebook'] },
      { id: 't-2', type: 'email' },
      { id: 't-3', type: 'sms' },
      { id: 't-x-google', type: 'social', platforms: ['x', 'google'] },
      { id: 't-all-social', type: 'social', platforms: ['instagram', 'facebook', 'x', 'google'] }
  ];
  const mockFiles = [
      { id: 'f-1', name: 'CampaignAssets.zip' }
  ];

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveNewCampaign = (data) => {
     const newCamp = {
        id: `camp-${Date.now()}`,
        title: data.title,
        description: data.description,
        status: 'Draft',
        startDate: data.startDate,
        endDate: data.validityType === 'permanent' ? 'Permanent' : data.endDate,
        cover: 'bg-gray-100', // Fallback
        coverImage: data.coverImage,
        audience: data.audience,
        assets: [],
        templates: [],
        adoptionRate: null,
        usageCount: null,
        views: 0,
        downloads: 0,
        views: 0,
        downloads: 0,
        isPinned: false,
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: {
            name: 'You', // Mock current user
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop'
        }
     };
     setCampaigns([newCamp, ...campaigns]);
     setSelectedCampaign(newCamp);
     notify('New Draft Campaign Created', 'success');
  };

  const handleUpdateCampaign = (updatedCampaign) => {
    setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
    setSelectedCampaign(updatedCampaign);
    notify('Campaign updated', 'success');
  };

  // ... (previous code)
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
      if (selectedCampaign?.id === id) setSelectedCampaign(null);
      notify('Campaign deleted', 'success');
    }
  };

  // Determine which data to pass to the list
  // We must MERGE the props with our local mocks to ensure that:
  // 1. Real campaigns can find real templates (from props)
  // 2. Mock campaigns can find mock templates (from local const)
  const effectiveTemplates = [...(allTemplates || []), ...mockTemplates];
  const effectiveFiles = [...(allFiles || []), ...mockFiles];

  if (selectedCampaign) {
    return (
      <CampaignDetail 
        campaign={selectedCampaign}
        onBack={() => setSelectedCampaign(null)}
        onUpdate={handleUpdateCampaign}
        notify={notify}
        allFiles={effectiveFiles}
        retailers={retailers}
      />
    );
  }

  return (
    <>
      <BrandCampaignList 
        campaigns={campaigns}
        files={effectiveFiles}
        templates={effectiveTemplates}
        onCreate={handleCreate}
        onSelect={setSelectedCampaign}
        onDelete={handleDelete}
        onPin={(id) => {
          const c = campaigns.find(x => x.id === id);
          const updated = {...c, isPinned: !c.isPinned};
          setCampaigns(campaigns.map(x => x.id === id ? updated : x));
          notify(updated.isPinned ? 'Campaign Pinned' : 'Campaign Unpinned', 'success');
        }}
      />
      <CreateCampaignModal 
         isOpen={isCreateModalOpen}
         onClose={() => setIsCreateModalOpen(false)}
         onSave={handleSaveNewCampaign}
         retailersCount={retailers?.length || 180}
      />
    </>
  );
};

export default CampaignManager;
