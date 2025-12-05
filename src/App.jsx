import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BrandApp from './BrandApp';
import RetailerApp from './RetailerApp';
import FloatingDevTools from './FloatingDevTools';

// --- Mock Data ---

const INITIAL_FILES = [
  // Root Files
  { id: 'f1', name: 'Campaign_Hero_Image.jpg', type: 'image', extension: 'JPG', dimensions: '2400x1600', size: 2400000, date: '2023-10-01', parentId: null },
  { id: 'f2', name: 'Lookbook_Spring_24.pdf', type: 'pdf', extension: 'PDF', dimensions: null, size: 15400000, date: '2023-10-02', parentId: null },
  { id: 'f3', name: 'Social_Teaser_Video.mp4', type: 'video', extension: 'MP4', dimensions: '1920x1080', size: 45000000, date: '2023-10-03', parentId: null },
  { id: 'f4', name: 'Product_Shots_Pack.zip', type: 'zip', extension: 'ZIP', dimensions: null, size: 128000000, date: '2023-10-04', parentId: null },
  
  // Folders
  { id: 'fol1', name: 'Social Media Assets', type: 'folder', size: 0, date: '2023-10-01', parentId: null },
  { id: 'fol2', name: 'High Res Images', type: 'folder', size: 0, date: '2023-10-01', parentId: null },
  { id: 'fol3', name: 'Legal Documents', type: 'folder', size: 0, date: '2023-10-01', parentId: null },
  { id: 'fol4', name: 'Videos 4K', type: 'folder', size: 0, date: '2023-10-01', parentId: null },
  // System Folders
  { id: 'sys_campaigns', name: 'Campaign Uploads', type: 'folder', size: 0, date: '2023-01-01', parentId: null, isSystem: true },
  { id: 'sys_resources', name: 'Resource Uploads', type: 'folder', size: 0, date: '2023-01-01', parentId: null, isSystem: true },
  { id: 'sys_dropbox', name: 'Dropbox Import', type: 'folder', size: 0, date: '2023-01-01', parentId: null, isSystem: true, source: 'dropbox' },

  // Folder Contents - Social Media Assets
  { id: 'f5', name: 'Instagram_Story_1.jpg', type: 'image', extension: 'JPG', dimensions: '1080x1920', size: 1200000, date: '2023-10-05', parentId: 'fol1' },
  { id: 'f6', name: 'Facebook_Post_v2.png', type: 'image', extension: 'PNG', dimensions: '1200x630', size: 1800000, date: '2023-10-05', parentId: 'fol1' },
  { id: 'f7', name: 'TikTok_Short.mp4', type: 'video', extension: 'MP4', dimensions: '1080x1920', size: 15000000, date: '2023-10-06', parentId: 'fol1' },

  // Folder Contents - High Res Images
  { id: 'f8', name: 'Model_A_Studio.tiff', type: 'image', extension: 'TIFF', dimensions: '6000x4000', size: 45000000, date: '2023-10-02', parentId: 'fol2' },
  { id: 'f9', name: 'Model_B_Outdoor.tiff', type: 'image', extension: 'TIFF', dimensions: '6000x4000', size: 42000000, date: '2023-10-02', parentId: 'fol2' },
  { id: 'f10', name: 'Product_Detail_Macro.tiff', type: 'image', extension: 'TIFF', dimensions: '6000x4000', size: 55000000, date: '2023-10-02', parentId: 'fol2' },

  // Folder Contents - Legal
  { id: 'f11', name: 'Usage_Rights_2024.pdf', type: 'pdf', extension: 'PDF', dimensions: null, size: 2500000, date: '2023-09-15', parentId: 'fol3' },
  
  // Root Docs
  { id: 'f12', name: 'Press_Release_Final.docx', type: 'doc', extension: 'DOCX', dimensions: null, size: 45000, date: '2023-10-08', parentId: null },

  // Nested Folders (Level 2)
  { id: 'fol_sub1', name: 'Q1 Campaigns', type: 'folder', size: 0, date: '2023-10-10', parentId: 'fol1' },
  { id: 'fol_sub2', name: 'Q2 Campaigns', type: 'folder', size: 0, date: '2023-10-10', parentId: 'fol1' },

  // Nested Files (Level 2)
  { id: 'f_sub1', name: 'Q1_Plan.pdf', type: 'pdf', extension: 'PDF', dimensions: null, size: 1200000, date: '2023-10-11', parentId: 'fol_sub1' },

  // Nested Folders (Level 3 & 4)
  { id: 'fol_sub1_1', name: 'January Content', type: 'folder', size: 0, date: '2023-10-12', parentId: 'fol_sub1' },
  { id: 'fol_sub1_1_1', name: 'Week 1', type: 'folder', size: 0, date: '2023-10-12', parentId: 'fol_sub1_1' },
];

const INITIAL_TEMPLATES = [
  { id: 't1', name: 'Summer Launch Story', type: 'social', platforms: ['instagram', 'facebook'], thumb: 'Story', date: '2023-10-05', usage: 12 },
  { id: 't2', name: 'Product Spotlight Post', type: 'social', platforms: ['instagram', 'x', 'google'], thumb: 'Post', date: '2023-10-06', usage: 8 },
  { id: 't3', name: 'VIP Event Invite', type: 'email', thumb: 'Email', date: '2023-10-08', usage: 5 },
  { id: 't4', name: 'Flash Sale Alert', type: 'sms', thumb: 'SMS', date: '2023-10-10', usage: 20 },
  { id: 't5', name: 'Viral Video Cut', type: 'social', platforms: ['instagram', 'facebook'], thumb: 'Video', date: '2025-10-01', usage: 45 },
  { id: 't6', name: 'Corporate Update', type: 'social', platforms: ['x', 'google'], thumb: 'Post', date: '2025-10-02', usage: 3 },
  { id: 't7', name: 'Moodboard', type: 'social', platforms: ['instagram'], thumb: 'Pin', date: '2025-10-03', usage: 15 },
];

const INITIAL_CAMPAIGNS = [
  { 
    id: 'c1', 
    title: 'Spring Collection 2026', 
    status: 'Shared', 
    views: 1240, 
    downloads: 356, 
    startDate: '2025-11-01',
    endDate: 'Permanent', 
    cover: 'bg-gradient-to-r from-pink-500 to-rose-500',
    isPinned: true,
    assets: ['f1', 'f2', 'f3', 'f4', 'fol1', 'fol2', 'fol3', 'fol4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13'],
    templates: ['t1', 't2', 't5'],
    sharedWith: 'all',
    brandId: 'b1', // Chanel
    description: 'The official launch materials for the SS26 collection. Live for all retailers.',
    retailerUsage: {
       social: true,
       email: true,
       sms: true,
       download: true,
       lastAction: '2025-11-25'
    },
    lastUpdated: '2025-11-25T10:00:00' // Blue Dot (Pinned)
  },
  { 
    id: 'c2', 
    title: 'Holiday Gift Guide 2025', 
    status: 'Shared', 
    views: 850, 
    downloads: 120, 
    startDate: '2025-10-15',
    endDate: '2025-12-31', 
    cover: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    isPinned: false,
    assets: [],
    templates: ['t3', 't4', 't7'],
    brandId: 'b1', // Chanel
    description: 'Materials for the upcoming holiday season.',
    retailerUsage: {
       social: true,
       email: false,
       sms: false,
       download: false,
       lastAction: '2025-11-20'
    },
    lastUpdated: '2025-11-26T09:30:00' // Blue Dot
  },
  { 
    id: 'c3', 
    title: 'Fall Preview 2025', 
    status: 'Draft', 
    views: 0, 
    downloads: 0, 
    startDate: '2025-11-28', // Future
    endDate: '2025-11-30', 
    cover: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    isPinned: false,
    assets: ['f1'],
    templates: [],
    brandId: 'b1', // Chanel
    description: 'Internal draft. Not yet shared.',
    lastUpdated: '2025-11-25T14:00:00' // Blue Dot
  },
  { 
    id: 'c4', 
    title: 'Flash Sale: Accessories', 
    status: 'Shared', 
    views: 450, 
    downloads: 89, 
    startDate: '2025-11-20',
    endDate: '2025-12-05', // Extended to be active
    cover: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    isPinned: false,
    assets: ['f2'],
    templates: ['t4'],
    brandId: 'b2', // Gucci
    description: "Limited time offer assets. This is a very long description to test the two-line truncation functionality. It should wrap to a second line and then show an ellipsis if it exceeds the available space. We need to ensure that the layout handles this correctly without breaking alignment.",
    retailerUsage: {
       social: false,
       email: true,
       sms: false,
       download: true,
       lastAction: '2025-11-22'
    },
    lastUpdated: '2025-11-22T10:00:00'
  },
  { 
    id: 'c5', 
    title: 'Sustainability Report', 
    status: 'Shared', 
    views: 120, 
    downloads: 45, 
    startDate: '2025-01-01',
    endDate: 'Permanent', 
    cover: 'bg-gradient-to-r from-green-500 to-emerald-600',
    isPinned: true,
    assets: ['f11'],
    templates: [],
    brandId: 'b2', // Gucci
    description: 'Annual sustainability report and assets.',
    lastUpdated: '2025-01-05'
  },
  { 
    id: 'c6', 
    title: 'Influencer Collab: Summer', 
    status: 'Maintenance', 
    views: 300, 
    downloads: 10, 
    startDate: '2025-06-01',
    endDate: '2025-08-31', 
    cover: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    isPinned: false,
    assets: ['f3', 'f5'],
    templates: ['t1'],
    brandId: 'b3', // Louis Vuitton
    description: 'Assets for the summer influencer campaign.',
    lastUpdated: '2025-06-05'
  },
  { 
    id: 'c7', 
    title: 'Digital Exclusive: Cyber Week', 
    status: 'Shared', 
    views: 2000, 
    downloads: 500, 
    startDate: '2025-11-24',
    endDate: '2025-12-01', 
    cover: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    isPinned: false,
    assets: ['f6'],
    templates: ['t2', 't6'],
    brandId: 'b3', // Louis Vuitton
    description: 'Digital exclusive deals.',
    lastUpdated: '2025-11-25' // Within 48h of Nov 26
  },
  { 
    id: 'c8', 
    title: 'New Year 2026 Teaser', 
    status: 'Shared', 
    views: 10, 
    downloads: 2, 
    startDate: '2025-11-24', // Just outside 48h window (Nov 26 - 2 = Nov 24) - Let's make it Nov 25 to be safe New
    endDate: '2026-01-15', 
    cover: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    isPinned: false,
    assets: ['f7'],
    templates: ['t1', 't5'],
    brandId: 'b4', // Dior
    description: 'Teaser content for the new year.',
    lastUpdated: '2025-11-20'
  },
  { 
    id: 'c9', 
    title: 'Valentine 2026 Early Access', 
    status: 'Shared', 
    views: 5, 
    downloads: 0, 
    startDate: '2025-11-26', // New Arrival (Today)
    endDate: '2026-02-14', 
    cover: 'bg-gradient-to-r from-pink-300 to-red-300',
    isPinned: false,
    assets: [],
    templates: ['t7'],
    brandId: 'b2', // Gucci
    description: 'Early access assets for Valentine.',
    retailerUsage: {
       social: true,
       email: false,
       sms: false,
       download: false,
       lastAction: '2025-11-26'
    },
    lastUpdated: '2025-11-26'
  },
  { 
    id: 'c10', 
    title: 'Last Chance: Autumn Vibes', 
    status: 'Shared', 
    views: 500, 
    downloads: 100, 
    startDate: '2025-09-01',
    endDate: '2025-11-27', // Expiring Tomorrow
    cover: 'bg-gradient-to-r from-orange-700 to-brown-700',
    isPinned: false,
    assets: ['f1'],
    templates: ['t1'],
    brandId: 'b4', // Dior
    description: 'Ending soon.',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'c11',
    title: 'Heritage Collection',
    status: 'Shared',
    views: 800,
    downloads: 200,
    startDate: '2025-10-01',
    endDate: 'Permanent',
    cover: 'bg-gradient-to-r from-amber-700 to-orange-900',
    isPinned: true,
    assets: [],
    templates: [],
    brandId: 'b5', // Hermes
    description: 'Timeless classics.',
    lastUpdated: '2025-10-05'
  },
  {
    id: 'c12',
    title: 'Re-Nylon Project',
    status: 'Shared',
    views: 600,
    downloads: 150,
    startDate: '2025-11-15',
    endDate: '2026-03-01',
    cover: 'bg-black',
    isPinned: false,
    assets: [],
    templates: [],
    brandId: 'b6', // Prada
    description: 'Sustainable fashion initiative.',
    lastUpdated: '2025-11-15'
  },
  {
    id: 'c13',
    title: 'Summer Essentials',
    status: 'Shared',
    views: 450,
    downloads: 120,
    startDate: '2025-06-15',
    endDate: '2025-09-15',
    cover: 'bg-gradient-to-r from-yellow-200 to-orange-300',
    isPinned: false,
    assets: ['f1', 'f2'],
    templates: ['t1'],
    brandId: 'b1', // Rolex
    description: 'Summer collection highlights.',
    lastUpdated: '2025-06-20'
  },
  {
    id: 'c14',
    title: 'Winter Wonderland',
    status: 'Shared',
    views: 900,
    downloads: 300,
    startDate: '2025-12-01',
    endDate: '2026-02-28',
    cover: 'bg-gradient-to-r from-blue-200 to-cyan-300',
    isPinned: false,
    assets: ['f3', 'f4'],
    templates: ['t2', 't3'],
    brandId: 'b2', // Gucci
    description: 'Winter seasonal campaign.',
    lastUpdated: '2025-12-05'
  },
  {
    id: 'c15',
    title: 'Spring Awakening',
    status: 'Shared',
    views: 600,
    downloads: 180,
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    cover: 'bg-gradient-to-r from-green-200 to-emerald-300',
    isPinned: false,
    assets: ['f5'],
    templates: ['t4'],
    brandId: 'b3', // Louis Vuitton
    description: 'Spring collection launch.',
    lastUpdated: '2026-03-05'
  },
  {
    id: 'c16',
    title: 'Black Friday Special',
    status: 'Shared',
    views: 1500,
    downloads: 600,
    startDate: '2025-11-20',
    endDate: '2025-11-30',
    cover: 'bg-gradient-to-r from-gray-800 to-black',
    isPinned: false,
    assets: ['f6', 'f7'],
    templates: ['t5'],
    brandId: 'b4', // Dior
    description: 'Exclusive Black Friday deals.',
    lastUpdated: '2025-11-25' // Updated recently
  },
  {
    id: 'c17',
    title: 'Holiday Gift Guide',
    status: 'Shared',
    views: 1200,
    downloads: 400,
    startDate: '2025-12-01',
    endDate: '2025-12-25',
    cover: 'bg-gradient-to-r from-red-500 to-green-500',
    isPinned: false,
    assets: ['f8'],
    templates: ['t6'],
    brandId: 'b5', // Hermes
    description: 'Curated gift selection.',
    lastUpdated: '2025-12-05'
  },
  {
    id: 'c18',
    title: 'New Year Resolution',
    status: 'Shared',
    views: 700,
    downloads: 250,
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    cover: 'bg-gradient-to-r from-purple-400 to-pink-400',
    isPinned: false,
    assets: ['f9'],
    templates: ['t7'],
    brandId: 'b6', // Prada
    description: 'Start the year with style.',
    lastUpdated: '2026-01-05'
  },
  {
    id: 'c19',
    title: 'Resort Collection',
    status: 'Shared',
    views: 550,
    downloads: 160,
    startDate: '2025-05-01',
    endDate: '2025-07-31',
    cover: 'bg-gradient-to-r from-teal-200 to-blue-300',
    isPinned: false,
    assets: ['f10'],
    templates: ['t1'],
    brandId: 'b1', // Rolex
    description: 'Luxury resort wear.',
    lastUpdated: '2025-05-05'
  },
  {
    id: 'c20',
    title: 'Back to School',
    status: 'Shared',
    views: 850,
    downloads: 280,
    startDate: '2025-08-01',
    endDate: '2025-09-30',
    cover: 'bg-gradient-to-r from-indigo-300 to-purple-400',
    isPinned: false,
    assets: ['f11'],
    templates: ['t2'],
    brandId: 'b2', // Gucci
    description: 'Stylish back to school gear.',
    lastUpdated: '2025-08-05'
  },
  {
    id: 'c21',
    title: 'Fall Fashion',
    status: 'Shared',
    views: 950,
    downloads: 320,
    startDate: '2025-09-01',
    endDate: '2025-11-30',
    cover: 'bg-gradient-to-r from-orange-400 to-red-500',
    isPinned: false,
    assets: ['f12'],
    templates: ['t3'],
    brandId: 'b3', // Louis Vuitton
    description: 'Autumn trends.',
    lastUpdated: '2025-09-05'
  },
  {
    id: 'c22',
    title: 'Cyber Monday',
    status: 'Shared',
    views: 1800,
    downloads: 700,
    startDate: '2025-12-01',
    endDate: '2025-12-02',
    cover: 'bg-gradient-to-r from-blue-600 to-indigo-700',
    isPinned: false,
    assets: ['f13'],
    templates: ['t4'],
    brandId: 'b4', // Dior
    description: 'Online exclusive offers.',
    lastUpdated: '2025-12-01'
  }
];

const INITIAL_CATALOGS = [
  { 
    id: 'cat1', 
    name: 'Brand Identity', 
    items: 12, 
    cover: 'bg-slate-800', 
    updated: '2 days ago',
    downloads: 120,
    status: 'Published',
    structure: [
      { id: 's1', name: 'Logos', type: 'folder', count: 4 },
      { id: 's2', name: 'Fonts', type: 'folder', count: 2 },
      { id: 's3', name: 'Tone of Voice.pdf', type: 'file', size: '2.4 MB' }
    ]
  },
  { 
    id: 'cat2', 
    name: 'Product Lines 2024', 
    items: 45, 
    cover: 'bg-blue-100', 
    updated: '1 week ago',
    downloads: 450,
    status: 'Published',
    structure: [
       { id: 's4', name: 'Ready to Wear', type: 'folder', count: 20 },
       { id: 's5', name: 'Accessories', type: 'folder', count: 25 },
    ]
  },
  { 
    id: 'cat3', 
    name: 'Store Visual Merchandising', 
    items: 8, 
    cover: 'bg-purple-100', 
    updated: '3 weeks ago',
    downloads: 34,
    status: 'Draft',
    structure: []
  },
];

const INITIAL_RETAILERS = [
  { id: 'r1', name: 'Luxury Boutique Paris', email: 'contact@lbparis.com', status: 'Active', tier: 'Platinum', zone: 'Europe' },
  { id: 'r2', name: 'Fifth Avenue Fashion', email: 'buyer@fifthave.com', status: 'Active', tier: 'Platinum', zone: 'North America' },
  { id: 'r3', name: 'Tokyo Trends', email: 'info@tokyotrends.jp', status: 'Pending', tier: 'Gold', zone: 'Asia' },
  { id: 'r4', name: 'Milano Style', email: 'ciao@milanostyle.it', status: 'Active', tier: 'Gold', zone: 'Europe' },
  { id: 'r5', name: 'Nordic Design House', email: 'hello@nordicdesign.se', status: 'Active', tier: 'Silver', zone: 'Europe' },
  { id: 'r6', name: 'Seoul Streetwear', email: 'contact@seoulstreet.kr', status: 'Active', tier: 'Silver', zone: 'Asia' },
  { id: 'r7', name: 'Bond Street Collective', email: 'info@bondstreet.co.uk', status: 'Active', tier: 'Platinum', zone: 'Europe' },
  { id: 'r8', name: 'Dubai Luxury Edit', email: 'vip@dubailuxury.ae', status: 'Active', tier: 'Gold', zone: 'Middle East' },
  { id: 'r9', name: 'Sydney Harbour Fashion', email: 'buy@shfashion.com.au', status: 'Pending', tier: 'Silver', zone: 'Oceania' },
  { id: 'r10', name: 'Toronto Trends', email: 'hello@torontotrends.ca', status: 'Active', tier: 'Standard', zone: 'North America' },
  { id: 'r11', name: 'Berlin Modern', email: 'info@berlinmod.de', status: 'Active', tier: 'Gold', zone: 'Europe' },
  { id: 'r12', name: 'Shanghai Chic', email: 'contact@shchic.cn', status: 'Active', tier: 'Platinum', zone: 'Asia' },
  { id: 'r13', name: 'LA Lifestyle', email: 'buyer@lalifestyle.com', status: 'Active', tier: 'Silver', zone: 'North America' },
  { id: 'r14', name: 'Miami Beach Boutique', email: 'sun@miamibb.com', status: 'Inactive', tier: 'Standard', zone: 'North America' },
  { id: 'r15', name: 'São Paulo Select', email: 'info@spselect.br', status: 'Active', tier: 'Gold', zone: 'South America' },
  { id: 'r16', name: 'Mumbai Market', email: 'contact@mumbaimkt.in', status: 'Pending', tier: 'Standard', zone: 'Asia' },
  { id: 'r17', name: 'Cape Town Couture', email: 'hello@ctcouture.za', status: 'Active', tier: 'Silver', zone: 'Africa' },
  { id: 'r18', name: 'Singapore Silk', email: 'buy@sgsilk.sg', status: 'Active', tier: 'Gold', zone: 'Asia' },
  { id: 'r19', name: 'Mexico City Moda', email: 'hola@mcmoda.mx', status: 'Active', tier: 'Silver', zone: 'North America' },
  { id: 'r20', name: 'Chicago Classics', email: 'info@chicagoclassics.com', status: 'Active', tier: 'Platinum', zone: 'North America' },
];

const App = () => {
  // State lifting for persistence across views
  const [files, setFiles] = useState(INITIAL_FILES);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [catalogs, setCatalogs] = useState(INITIAL_CATALOGS);
  const [retailers] = useState(INITIAL_RETAILERS);
  
  // Dev Tools State
  const [showEmptyState, setShowEmptyState] = useState(false);

  return (
    <BrowserRouter>
      <FloatingDevTools 
        showEmptyState={showEmptyState} 
        setShowEmptyState={setShowEmptyState} 
      />
      <Routes>
        <Route path="/" element={
          <BrandApp 
            files={files} 
            setFiles={setFiles}
            campaigns={campaigns} 
            setCampaigns={setCampaigns}
            templates={templates} 
            setTemplates={setTemplates}
            catalogs={catalogs} 
            setCatalogs={setCatalogs}
            retailers={retailers}
            showEmptyState={showEmptyState}
          />
        } />
        <Route path="/retailer" element={
          <RetailerApp 
            campaigns={campaigns} 
            catalogs={catalogs}
            templates={templates}
            files={files}
            retailerId="r1" 
            showEmptyState={showEmptyState}
          />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
