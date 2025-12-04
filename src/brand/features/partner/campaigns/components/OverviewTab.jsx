import React from 'react';
import { PenLine, ArrowRight, AlertTriangle, Send, FileText, Image as ImageIcon } from 'lucide-react';
import ReadinessChecklist from './ReadinessChecklist';

const OverviewTab = ({ campaign, onUpdate, setActiveTab }) => {
  const isDraft = campaign.status === 'Draft';

  // --- Draft State: Launchpad ---
  if (isDraft) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
        {/* Helper Tip */}
        <div className="flex items-start gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
           <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
              <PenLine size={20} />
           </div>
           <div>
              <h3 className="font-bold text-indigo-900 text-sm mb-1">Let's get this campaign ready for launch</h3>
              <p className="text-sm text-indigo-700 leading-relaxed">
                 Complete the checklist below to ensure your retailers have everything they need. Once all items are checked, you can publish this campaign.
              </p>
           </div>
        </div>

        {/* Readiness Checklist */}
        <ReadinessChecklist 
            campaign={campaign} 
            onGoToContent={() => setActiveTab('content')} 
        />

        {/* Action to Content */}
        <div className="flex justify-center">
            <button 
              onClick={() => setActiveTab('content')}
              className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:border-black text-gray-600 hover:text-black font-medium rounded-full transition shadow-sm hover:shadow-md"
            >
              <PenLine size={18} />
              <span>Manage Campaign Content</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    );
  }

  // --- Active State: Dashboard ---
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Adoption Rate</div>
          <div className="text-3xl font-bold text-gray-900">{campaign.adoptionRate || 0}%</div>
          <div className="text-xs text-emerald-600 mt-1 font-medium">+5% from last week</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Views</div>
          <div className="text-3xl font-bold text-gray-900">{campaign.views?.toLocaleString() || 0}</div>
          <div className="text-xs text-gray-400 mt-1 font-medium">Retailer impressions</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Downloads</div>
          <div className="text-3xl font-bold text-gray-900">{campaign.downloads?.toLocaleString() || 0}</div>
          <div className="text-xs text-gray-400 mt-1 font-medium">Asset downloads</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time Left</div>
          <div className="text-3xl font-bold text-gray-900">
            {campaign.endDate === 'Permanent' ? '∞' : '5 Days'}
          </div>
          <div className="text-xs text-gray-400 mt-1 font-medium">{campaign.endDate === 'Permanent' ? 'No Expiration' : `Ends ${campaign.endDate}`}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Live Engagement Feed</h3>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
            </span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                  {['NM', 'GL', 'SFA', 'LC', 'BG'][i-1]}
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">{['Neiman Marcus', 'Galeries Lafayette', 'Saks Fifth Avenue', 'Lane Crawford', 'Bergdorf Goodman'][i-1]}</span>
                    {' '}
                    {['just sent the Email Campaign.', 'downloaded Lookbook.pdf.', 'published to Instagram.', 'viewed the campaign.', 'shared on Facebook.'][i-1]}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{i * 15} mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           {/* Underperforming Retailers */}
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-gray-900 text-sm">Needs Attention</h3>
                 <AlertTriangle size={16} className="text-amber-500"/>
              </div>
              <div className="space-y-3 mb-4">
                 {['Nordstrom (Seattle)', 'Macy\'s (Herald Sq)', 'Bloomingdale\'s (SoHo)'].map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                       <span className="text-gray-600">{r}</span>
                       <span className="text-red-500 font-medium">{10 + i * 5}%</span>
                    </div>
                 ))}
              </div>
              <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition">
                 <Send size={14}/> Send Reminder
              </button>
           </div>

           {/* Top Content */}
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Top Performing Content</h3>
              <div className="space-y-4">
                 <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                       <ImageIcon size={20}/>
                    </div>
                    <div>
                       <div className="text-xs text-gray-500 uppercase font-medium">Most Shared</div>
                       <div className="text-sm font-bold text-gray-900">Summer_Vibe_Post_01</div>
                    </div>
                 </div>
                 <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                       <FileText size={20}/>
                    </div>
                    <div>
                       <div className="text-xs text-gray-500 uppercase font-medium">Most Downloaded</div>
                       <div className="text-sm font-bold text-gray-900">Lookbook_2025.pdf</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
