import React from 'react';
import { TrendingUp, Users, BarChart3, Activity, ArrowUpRight, ArrowDownRight, Megaphone, Store } from 'lucide-react';

const PerformanceOverview = ({ campaigns }) => {
  const activeCampaigns = campaigns.filter(c => c.status === 'Active');
  
  // Only show if there are active campaigns
  if (activeCampaigns.length === 0) return null;

  // Mock Data for demonstration - in a real app these would come from props or API
  const metrics = [
    {
      label: 'Active Campaigns',
      value: activeCampaigns.length,
      sub: 'Currently running',
      trend: '+2',
      trendDir: 'up',
      icon: <Megaphone size={16} className="text-gray-400"/>
    },
    {
      label: 'Total Retailers',
      value: '1,248',
      sub: 'Participating retailers',
      trend: '+156',
      trendDir: 'up',
      icon: <Store size={16} className="text-gray-400"/>
    },
    {
      label: 'Total Reach',
      value: '2.4M',
      sub: 'Across all channels',
      trend: '+18%',
      trendDir: 'up',
      icon: <Users size={16} className="text-gray-400"/>
    },
    {
      label: 'Total Engagement',
      value: '185K',
      sub: 'Likes, shares, comments',
      trend: '+12%',
      trendDir: 'up',
      icon: <Activity size={16} className="text-gray-400"/>
    },
    {
      label: 'Avg. Engagement Rate',
      value: '4.2%',
      sub: 'Per campaign average',
      trend: '-0.5%',
      trendDir: 'down',
      icon: <BarChart3 size={16} className="text-gray-400"/>
    },
    {
      label: 'Participation Rate',
      value: '68%',
      sub: 'Retailer opt-in rate',
      trend: '+5%',
      trendDir: 'up',
      icon: <TrendingUp size={16} className="text-gray-400"/>
    }
  ];

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-lg font-bold text-gray-900">Performance Overview</h2>
         <div className="flex bg-gray-100 p-1 rounded-lg">
            <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded-md text-black">Overview Numbers</button>
            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-black transition">Trend Visualization</button>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition duration-300 group">
             <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-gray-500">{metric.label}</span>
                {metric.icon}
             </div>
             <div className="flex items-end justify-between">
                <div>
                   <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                   <div className="text-xs text-gray-400">{metric.sub}</div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${metric.trendDir === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                   {metric.trendDir === 'up' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                   {metric.trend}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOverview;
