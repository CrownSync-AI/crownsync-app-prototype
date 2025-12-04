import React, { useState, useRef } from 'react';
import { Instagram, MessageCircle, Video, Mail, Smartphone, Download, Users, TrendingUp, Eye, MousePointer, FileText, Image as ImageIcon, BarChart3, AlertCircle, ChevronDown } from 'lucide-react';

const PerformanceTab = ({ campaign, retailers }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePlatform, setActivePlatform] = useState('instagram');
  
  const socialRef = useRef(null);
  const emailRef = useRef(null);
  const assetsRef = useRef(null);

  // Empty State for Draft
  if (campaign.status === 'Draft') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <BarChart3 size={32} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No Performance Data Yet</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Analytics and retailer activity will appear here once you publish this campaign and retailers start interacting with it.
        </p>
        <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm max-w-lg mx-auto border border-blue-100 flex gap-3 text-left">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold mb-1">Ready to launch?</div>
            <div>Go to the Overview tab to complete your checklist and publish this campaign.</div>
          </div>
        </div>
      </div>
    );
  }

  // Mock data
  const aggregatedData = {
    totalReach: 2450000,
    totalInteractions: 45600,
    reachGrowth: 12.5,
    interactionsGrowth: 18.3
  };

  const socialData = {
    instagram: {
      totalShares: 1250,
      avgEngagement: 4.8,
      topPosts: [
        { id: 1, title: 'Summer Collection Launch', shares: 450, likes: 12500, comments: 890, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400' },
        { id: 2, title: 'Behind the Scenes', shares: 380, likes: 9800, comments: 650, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400' },
        { id: 3, title: 'New Arrivals Teaser', shares: 320, likes: 8200, comments: 520, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400' }
      ]
    },
    wechat: {
      totalShares: 980,
      avgEngagement: 6.2,
      topPosts: [
        { id: 1, title: '夏季新品发布', shares: 420, views: 45000, reads: 32000 },
        { id: 2, title: '品牌故事', shares: 310, views: 38000, reads: 28000 },
        { id: 3, title: '独家优惠', shares: 250, views: 29000, reads: 21000 }
      ]
    },
    tiktok: {
      totalShares: 2100,
      avgEngagement: 7.5,
      topPosts: [
        { id: 1, title: 'Collection Reveal', shares: 850, views: 125000, likes: 18900 },
        { id: 2, title: 'Style Guide', shares: 690, views: 98000, likes: 14200 },
        { id: 3, title: 'Product Showcase', shares: 560, views: 76000, likes: 11100 }
      ]
    }
  };

  const emailData = {
    sent: 1000,
    opened: 450,
    clicked: 120,
    templates: [
      { subject: 'Exclusive: New Summer Collection Inside', openRate: 52, clickRate: 15 },
      { subject: 'Limited Time: Premium Access to Latest Arrivals', openRate: 48, clickRate: 12 },
      { subject: 'Your Personalized Style Guide Awaits', openRate: 41, clickRate: 9 }
    ]
  };

  const assetData = {
    totalDownloads: 3420,
    uniqueDownloaders: 142,
    topAssets: [
      { name: 'Summer_Lookbook_2024.pdf', downloads: 845, size: '12.4 MB', type: 'PDF' },
      { name: 'Product_Catalog_HighRes.pdf', downloads: 672, size: '28.1 MB', type: 'PDF' },
      { name: 'Brand_Assets_Package.zip', downloads: 523, size: '156 MB', type: 'ZIP' },
      { name: 'Social_Media_Templates.psd', downloads: 418, size: '45.2 MB', type: 'PSD' },
      { name: 'Email_Banner_Set.zip', downloads: 392, size: '8.7 MB', type: 'ZIP' }
    ]
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    switch(filter) {
      case 'social':
        scrollToSection(socialRef);
        break;
      case 'email':
        scrollToSection(emailRef);
        break;
      case 'downloads':
        scrollToSection(assetsRef);
        break;
      default:
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPlatform = socialData[activePlatform];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Aggregated Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium opacity-90">Total Estimated Reach</div>
            <Users size={20} className="opacity-75" />
          </div>
          <div className="text-4xl font-bold mb-2">{aggregatedData.totalReach.toLocaleString()}</div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp size={14} />
            <span>+{aggregatedData.reachGrowth}% vs last campaign</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium opacity-90">Total Interactions</div>
            <MousePointer size={20} className="opacity-75" />
          </div>
          <div className="text-4xl font-bold mb-2">{aggregatedData.totalInteractions.toLocaleString()}</div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp size={14} />
            <span>+{aggregatedData.interactionsGrowth}% vs last campaign</span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 p-4">
          <span className="text-sm font-medium text-gray-500 mr-2">Filter by:</span>
          {[
            { id: 'all', label: 'All Content', icon: BarChart3 },
            { id: 'social', label: 'Social', icon: Instagram },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'downloads', label: 'Downloads', icon: Download }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
                activeFilter === filter.id
                  ? 'bg-black text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <filter.icon size={16} />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Section A: Social Impact */}
      <div ref={socialRef} className="scroll-mt-20">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Instagram size={24} className="text-pink-500" />
              Social Impact
            </h2>
            
            {/* Total Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-medium mb-1">Total Shares</div>
                <div className="text-2xl font-bold text-gray-900">
                  {Object.values(socialData).reduce((sum, platform) => sum + platform.totalShares, 0).toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-medium mb-1">Avg. Engagement</div>
                <div className="text-2xl font-bold text-gray-900">
                  {(Object.values(socialData).reduce((sum, platform) => sum + platform.avgEngagement, 0) / 3).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Platform Toggle */}
            <div className="flex gap-2">
              {[
                { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-500' },
                { id: 'wechat', label: 'WeChat', icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
                { id: 'tiktok', label: 'TikTok', icon: Video, color: 'from-gray-900 to-gray-700' }
              ].map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setActivePlatform(platform.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    activePlatform === platform.id
                      ? `bg-gradient-to-r ${platform.color} text-white shadow-md`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <platform.icon size={16} />
                  {platform.label}
                </button>
              ))}
            </div>
          </div>

          {/* Platform-Specific Content */}
          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Top Performing Posts</h3>
            <div className="space-y-4">
              {currentPlatform.topPosts.map((post, idx) => (
                <div key={post.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                    #{idx + 1}
                  </div>
                  
                  {post.image && (
                    <img src={post.image} alt={post.title} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{post.title}</div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      {post.shares && <span>{post.shares} Shares</span>}
                      {post.likes && <span>{post.likes.toLocaleString()} Likes</span>}
                      {post.comments && <span>{post.comments} Comments</span>}
                      {post.views && <span>{post.views.toLocaleString()} Views</span>}
                      {post.reads && <span>{post.reads.toLocaleString()} Reads</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{post.shares}</div>
                    <div className="text-xs text-gray-500">Shares</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Section B: Direct Outreach */}
      <div ref={emailRef} className="scroll-mt-20">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Mail size={24} className="text-blue-500" />
              Direct Outreach (Email & SMS)
            </h2>

            {/* Funnel Visualization */}
            <div className="bg-white rounded-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">Campaign Funnel</h3>
              <div className="flex items-center justify-between gap-4">
                {/* Sent */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center shadow-lg">
                    <div className="text-3xl font-bold mb-1">{emailData.sent}</div>
                    <div className="text-sm opacity-90">Sent</div>
                  </div>
                </div>

                <ChevronDown size={24} className="text-gray-300 rotate-[-90deg]" />

                {/* Opened */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-6 text-white text-center shadow-lg">
                    <div className="text-3xl font-bold mb-1">{emailData.opened}</div>
                    <div className="text-sm opacity-90">Opened</div>
                    <div className="text-xs mt-1 opacity-75">{((emailData.opened / emailData.sent) * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <ChevronDown size={24} className="text-gray-300 rotate-[-90deg]" />

                {/* Clicked */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-6 text-white text-center shadow-lg">
                    <div className="text-3xl font-bold mb-1">{emailData.clicked}</div>
                    <div className="text-sm opacity-90">Clicked</div>
                    <div className="text-xs mt-1 opacity-75">{((emailData.clicked / emailData.sent) * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Performance */}
          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Subject Line Performance</h3>
            <div className="space-y-3">
              {emailData.templates.map((template, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-sm transition">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{template.subject}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{template.openRate}%</div>
                      <div className="text-xs text-gray-500">Open Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">{template.clickRate}%</div>
                      <div className="text-xs text-gray-500">Click Rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Section C: Asset Utility */}
      <div ref={assetsRef} className="scroll-mt-20">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Download size={24} className="text-purple-500" />
              Asset Utility
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-medium mb-1">Total Downloads</div>
                <div className="text-2xl font-bold text-gray-900">{assetData.totalDownloads.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-medium mb-1">Unique Downloaders</div>
                <div className="text-2xl font-bold text-gray-900">{assetData.uniqueDownloaders}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Most Downloaded Assets</h3>
            <div className="space-y-3">
              {assetData.topAssets.map((asset, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {asset.type === 'PDF' ? <FileText size={20} className="text-red-500" /> :
                     asset.type === 'ZIP' ? <Download size={20} className="text-gray-500" /> :
                     <ImageIcon size={20} className="text-blue-500" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{asset.name}</div>
                    <div className="text-xs text-gray-500">{asset.size} • {asset.type}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{asset.downloads}</div>
                    <div className="text-xs text-gray-500">Downloads</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
