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

import { ToastProvider } from './brand/context/ToastContext';
import { campaignData } from './data/mockStore/campaignStore'; // Import Centralized Store

const App = () => {
  // State lifting for persistence across views
  const [files, setFiles] = useState(INITIAL_FILES);
  const [campaigns, setCampaigns] = useState(campaignData.campaigns); // Initialize from Store
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [catalogs, setCatalogs] = useState(INITIAL_CATALOGS);
  const [retailers] = useState(INITIAL_RETAILERS);
  
  // Dev Tools State
  const [showEmptyState, setShowEmptyState] = useState(false);

  return (
    <ToastProvider>
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
    </ToastProvider>
  );
};

export default App;
